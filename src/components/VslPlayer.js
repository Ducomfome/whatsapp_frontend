// src/components/VslPlayer.js

import React, { useState, useRef } from 'react';
import './VslPlayer.css'; // Vamos criar este arquivo a seguir

// ===== ATENÇÃO AQUI =====
// 1. Troque pela URL do seu vídeo (hospedado no Cloudflare R2, Bunny, etc.)
const VIDEO_URL = "URL_DO_SEU_VIDEO_NO_R2_OU_S3.mp4";

// 2. (Opcional) Troque pelo seu GIF de "Play" ou "Ativar Som"
const OVERLAY_GIF_URL = "https://i.gifer.com/origin/76/7618f08139553757a41c2c366603b57e_w200.gif";
// ==========================

function VslPlayer() {
  // O 'useState' controla se o overlay (capa) de "desmutar" está visível
  const [showOverlay, setShowOverlay] = useState(true);
  
  // O 'useRef' é o jeito do React de "segurar" o elemento <video>
  const videoRef = useRef(null);

  const handleUnmute = () => {
    // Pega o vídeo "real"
    const videoElement = videoRef.current;

    if (videoElement) {
      // 1. Tira o mudo
      videoElement.muted = false;
      
      // 2. Garante que ele toque (caso o navegador tenha pausado)
      videoElement.play();
      
      // 3. Esconde o overlay
      setShowOverlay(false);
    }
  };

  return (
    <div className="vsl-container">
      
      <video
        ref={videoRef}
        src={VIDEO_URL}
        className="vsl-video"
        autoPlay    // Tenta começar sozinho
        muted       // OBRIGATÓRIO para o autoplay funcionar
        loop        // Opcional: se o VSL deve repetir
        playsInline // OBRIGATÓRIO para iPhone
      />

      {/* Isso é um 'if' em React. 
        "Se 'showOverlay' for true, mostre a div do overlay"
      */}
      {showOverlay && (
        <div className="vsl-unmute-overlay" onClick={handleUnmute}>
          <img src={OVERLAY_GIF_URL} alt="Clique para ativar o som" />
        </div>
      )}

    </div>
  );
}

export default VslPlayer;
