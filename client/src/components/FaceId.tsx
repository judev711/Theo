import { useEffect, useRef} from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function FaceRecognition() {
  const videoRef = useRef<HTMLVideoElement | null>(null);


  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

      startVideo();
    };

    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Erreur accès caméra :", err));
  };

  const handleScan = async () => {
    if (!videoRef.current) return;

    const detections = await faceapi.detectSingleFace(
      videoRef.current,
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks().withFaceDescriptor();

    if (!detections) {
      alert("Aucun visage détecté !");
      return;
    }

    const faceData = detections.descriptor; // Données du visage

    // Envoyer les données au backend pour vérification et enregistrement
    await axios.post("http://localhost:4000/api/presence", { faceData });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <video ref={videoRef} autoPlay className="w-full max-w-md rounded-lg" />
      <button
        onClick={handleScan}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
      >
        Scanner & Enregistrer
      </button>
    </div>
  );
}
