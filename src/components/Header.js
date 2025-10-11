// client/src/components/Header.js
import React from 'react';
import './Header.css';

function Header({ status }) { // NOVO: Recebe 'status' como prop
  const imageUrl = "https://midia.jdfnu287h7dujn2jndjsifd.com/perfil.webp";

  return (
    <div className="header">
      <img src={imageUrl} alt="Foto de Perfil" className="profile-pic" />
      <div className="chat-info">
        <div className="chat-name-container">
          <span className="chat-name">Thaisinha</span>
          <img
            src="https://i.imgur.com/BwSw5kR.png"
            alt="Selo de Verificado"
            className="verified-badge"
          />
        </div>
        {/* NOVO: Exibe o status dinâmico. Adiciona a classe 'typing' para o efeito de cor */}
        <span className={`chat-status ${status !== 'online' ? 'typing' : ''}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

export default Header;