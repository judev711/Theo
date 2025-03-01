import React from "react";

const BackgroundVideo: React.FC = () => {
  return (
    <div className="relative h-screen w-screen">
      {/* Vidéo en arrière-plan */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="./src/assets/video1.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo.
      </video>

      {/* Contenu par-dessus la vidéo */}
      <div className="relative z-10 text-white text-center flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Bienvenue sur notre site</h1>
      </div>
    </div>
  );
};

export default BackgroundVideo;
