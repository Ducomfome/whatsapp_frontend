// client/src/App.js - VERSÃO COMPLETA E CORRIGIDA

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

  // ===================================
  // HOOK useEffect ATUALIZADO
  // ===================================
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
    });

    socket.on('setUI', (settings) => {
      setUiSettings(settings);
    });

    socket.on('botStatus', (data) => setBotStatus(data.status));
    
    // AQUI ESTÁ A MUDANÇA: Ouve o comando do servidor para abrir o WhatsApp
    socket.on('redirectToURL', (data) => {
      if (data.url) {
        console.log(`🔗 Redirecionando para: ${data.url}`);
        setBotStatus('redirecionando...');
        window.open(data.url, '_blank'); // Abre o link em uma nova aba
      }
    });

    return () => {
      socket.off('botMessage');
      socket.off('setUI');
      socket.off('botStatus');
      socket.off('connect');
      socket.off('redirectToURL'); // Limpa o novo ouvinte ao desmontar o componente
    };
  }, []);

  const handleSendMessage = async (data) => {
    // ESTA PARTE DO SEU CÓDIGO ORIGINAL ESTÁ OBSOLETA E FOI REMOVIDA.
    // A LÓGICA DE REDIRECIONAMENTO AGORA ESTÁ NO useEffect.
    // if (data.action === 'REDIRECT' && data.url) {
    //   setBotStatus('redirecionando...');
    //   window.open(data.url, '_blank');
    //   setBotStatus('online');
    //   return;
    // }
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
