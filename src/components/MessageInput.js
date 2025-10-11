// client/src/components/MessageInput.js

import React, { useState } from 'react';
import './MessageInput.css';

function MessageInput({ onSendMessage, inputEnabled, buttons }) {
  const [text, setText] = useState('');

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      onSendMessage({ text: text });
      setText('');
    }
  };

  // Se o backend mandou botões, mostre-os
  if (buttons && buttons.length > 0) {
    return (
      <div className="button-options-container">
        {buttons.map((button, index) => (
          <button 
            key={index} 
            className="choice-button"
            // MUDANÇA PRINCIPAL AQUI:
            // Agora passamos o objeto 'button' inteiro para o App.js.
            // O App.js vai decidir o que fazer com base na propriedade 'action'.
            onClick={() => onSendMessage(button)} 
          >
            {button.text}
          </button>
        ))}
      </div>
    );
  }

  // Se não, mostre a caixa de texto
  return (
    <form className="message-input" onSubmit={handleTextSubmit}>
      <input
        type="text"
        placeholder={inputEnabled ? "Digite sua mensagem..." : "Aguarde a resposta..."}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!inputEnabled}
      />
      <button type="submit" disabled={!inputEnabled}>➤</button>
    </form>
  );
}

export default MessageInput;