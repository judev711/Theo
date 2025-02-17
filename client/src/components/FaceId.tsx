import { useEffect, useRef, useState } from "react";
import { FaceId } from "@face-auth/face-id";
import toast from "react-hot-toast";

// ✅ Définition des interfaces TypeScript
interface IdentifyResponse {
  success: boolean;
  data?: {
    found: boolean;
    faceId?: string;
  } | null; // ✅ Ajout de null pour éviter l'erreur
}

interface RegisterResponse {
  success: boolean;
  data?: {
    faceId: string;
  } | null;
}

const domain = "4demo.face-auth.me";
const clientToken = "6f08e5f7-c72c-44fe-9361-e3234164754b";
const faceId = new FaceId(domain, clientToken);

export default function FaceAuth() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    startVideo();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480 } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          console.log("✅ Caméra activée !");
        }
      })
      .catch((err) => {
        console.error("❌ Erreur accès caméra :", err);
        toast.error("Erreur d'accès à la caméra !");
      });
  };

  const captureFace = async (mode: "register" | "identify") => {
    if (!videoRef.current || !canvasRef.current) return;
    setLoading(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      toast.error("Erreur de capture");
      setLoading(false);
      return;
    }

    // ✅ Capture et affiche la simulation
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/png");
    setCapturedImage(imageDataUrl);

    // ✅ Convertir en base64
    const base64Image = imageDataUrl.split(",")[1];

    try {
      let response: IdentifyResponse | RegisterResponse;

      if (mode === "register") {
        const faceIdentifier = "face_id_123"; // ID unique
        response = await faceId.register(faceIdentifier, base64Image, "image/png") as RegisterResponse;

        if (response.success && response.data?.faceId) {
          toast.success("Visage enregistré avec succès !");
          console.log("✅ Identifiant enregistré :", response.data.faceId);
        } else {
          toast.error("Échec de l'enregistrement !");
        }
      } else {
        response = await faceId.identify(base64Image, "image/png") as IdentifyResponse;

        if (response.success && response.data?.found) { 
          toast.success(`Visage reconnu : ${response.data.faceId || "Inconnu"}`);
          console.log("✅ Identifiant trouvé :", response.data.faceId);
        } else {
          toast.error("Aucun visage reconnu !");
        }
      }
    } catch (error) {
      console.error("❌ Erreur FaceID :", error);
      toast.error("Erreur lors du traitement du visage !");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <video ref={videoRef} autoPlay className="w-full max-w-md rounded-lg" />
      <canvas ref={canvasRef} className="hidden" />

      {capturedImage && (
        <img src={capturedImage} alt="Capture" className="mt-4 w-40 rounded-lg shadow-lg" />
      )}

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => captureFace("register")}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Enregistrement..." : "Enregistrer Visage"}
        </button>

        <button
          onClick={() => captureFace("identify")}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Identification..." : "Identifier Visage"}
        </button>
      </div>
    </div>
  );
}
