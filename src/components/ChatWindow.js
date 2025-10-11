// client/src/components/ChatWindow.js

import React from 'react';
import './ChatWindow.css';
import Message from './Message'; // 1. Importe o componente da bolha

// 2. Receba a lista de 'messages' que o App.js enviou
function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {/* 3. Percorra a lista e crie um componente <Message> para cada item */}
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
}

export default ChatWindow;