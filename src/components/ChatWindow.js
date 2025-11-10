// client/src/components/ChatWindow.js

// --- MUDANÇA: importei useState, useEffect, useRef ---
import React, { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';
import Message from './Message'; 

// 2. Receba a lista de 'messages' que o App.js enviou
function ChatWindow({ messages }) {
  // --- MUDANÇA PARA O SCROLL ---
  // 1. Criei uma referência para o 'div' da janela do chat
  const chatWindowRef = useRef(null);

  // 2. Criei um 'effect' que roda toda vez que a lista de 'messages' muda
  useEffect(() => {
    if (chatWindowRef.current) {
      const chatWindow = chatWindowRef.current;
      // 3. Forcei o scroll a ir para o final
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [messages]); // O 'gatilho' é a lista de mensagens


  // --- MUDANÇA PARA O ÁUDIO ---
  // 1. Criei um estado para saber QUAL áudio está tocando (pelo ID da msg)
  const [playingAudioId, setPlayingAudioId] = useState(null);


  return (
    // --- MUDANÇA PARA O SCROLL ---
    // 2. Conectei a referência ao 'div'
    <div className="chat-window" ref={chatWindowRef}>
      
      {/* 3. Percorra a lista e crie um componente <Message> para cada item */}
      {messages.map((msg) => (
        <Message 
          key={msg.id} 
          message={msg} 
          
          // --- MUDANÇA PARA O ÁUDIO ---
          // 2. Enviei o estado e a função de alterar o estado para CADA bolha de msg
          playingAudioId={playingAudioId}
          setPlayingAudioId={setPlayingAudioId}
        />
      ))}
    </div>
  );
}

export default ChatWindow;
