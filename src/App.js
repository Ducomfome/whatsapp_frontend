// client/src/App.js - VERSÃO COM LEAD + INITIATECHECKOUT PARA PAGAMENTO

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

const socket = io('https://whatsapp-backend-vott.onrender.com');

function App() {
  const [messages, setMessages] = useState([
    { id: 0, text: 'Esta é uma conta comercial', sender: 'system' }
  ]);
  const [uiSettings, setUiSettings] = useState({ inputEnabled: false, buttons: [] });
  const [botStatus, setBotStatus] = useState('online');
  const [leadTracked, setLeadTracked] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Conectado ao servidor de socket!', socket.id);
    });
    
    socket.on('botMessage', (message) => {
      new Audio('/audios/notification.mp3').play().catch(e => {});
      const newMessage = {
        id: Date.now() + Math.random(),
        sender: 'bot',
        type: message.type,
        content: message.content,
      };
      setMessages(currentMessages => [...currentMessages, newMessage]);

      // ✅ LEAD - Primeira mensagem do bot
      if (!leadTracked && window.fbq) {
        window.fbq('track', 'Lead');
        setLeadTracked(true);
        console.log('✅ Lead marcado - Primeira mensagem do bot');
      }
    });

    socket.on('setUI', (settings) => {
      setUiSettings(settings);
    });

    socket.on('botStatus', (data) => setBotStatus(data.status));
    
    socket.on('redirectToURL', (data) => {
      if (data.url) {
        console.log(`🔗 Redirecionando para: ${data.url}`);
        setBotStatus('redirecionando...');
        
        // ✅ INITIATECHECKOUT - Quando vai para o site de pagamento
        if (window.fbq) {
          window.fbq('track', 'InitiateCheckout');
          console.log('✅ InitiateCheckout marcado - Indo para pagamento');
        }
        
        window.open(data.url, '_blank');
      }
    });

    return () => {
      socket.off('botMessage');
      socket.off('setUI');
      socket.off('botStatus');
      socket.off('connect');
      socket.off('redirectToURL');
    };
  }, [leadTracked]);

  const handleSendMessage = async (data) => {
    // Apenas envia mensagem normal
    const newMessage = { id: Date.now(), text: data.text, sender: 'me' };
    setMessages(currentMessages => [...currentMessages, newMessage]);
    socket.emit('userMessage', data);
  };

  return (
    <div className="app-container">
      <div className="chat-screen">
        <Header status={botStatus} />
        <ChatWindow messages={messages} />
        <MessageInput
          onSendMessage={handleSendMessage}
          inputEnabled={uiSettings.inputEnabled}
          buttons={uiSettings.buttons}
        />
      </div>
    </div>
  );
}

export default App;
