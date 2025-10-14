// client/src/App.js - VERSÃO COM FLUXO GRUPO + PIX

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import GroupChat from './components/GroupChat';
import GroupHeader from './components/GroupHeader';
import PaymentModal from './components/PaymentModal';

const socket = io('https://whatsapp-backend-vott.onrender.com'); 

function App() {
  const [chatMode, setChatMode] = useState('individual'); // 'individual' | 'group'
  const [messages, setMessages] = useState([
    { id: 0, text: 'Esta é uma conta comercial', sender: 'system' }
  ]);
  const [uiSettings, setUiSettings] = useState({ inputEnabled: false, buttons: [] });
  const [botStatus, setBotStatus] = useState('online');
  const [userCity, setUserCity] = useState('São Paulo');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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

    // Nova função para detectar cidade do usuário
    socket.on('userCityDetected', (data) => {
      if (data.city) {
        setUserCity(data.city);
      }
    });

    return () => {
      socket.off('botMessage');
      socket.off('setUI');
      socket.off('botStatus');
      socket.off('userCityDetected');
      socket.off('connect');
    };
  }, []);

  const handleSendMessage = async (data) => {
    // Se for o botão final do chat individual
    if (data.text === "QUERO ENTRAR ❤️" || data.action === "ENTER_GROUP") {
      setChatMode('group');
      return;
    }

    if (data.action === 'REDIRECT' && data.url) {
      setBotStatus('redirecionando...');
      window.open(data.url, '_blank');
      setBotStatus('online');
      return;
    }
    
    const newMessage = { id: Date.now(), text: data.text, sender: 'me' };
    setMessages(currentMessages => [...currentMessages, newMessage]);
    socket.emit('userMessage', data);
  };

  const handleEnterGroup = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Aqui você pode liberar acesso completo ao grupo
    alert('Pagamento confirmado! Acesso liberado!');
  };

  // Renderiza o chat baseado no modo
  const renderChat = () => {
    if (chatMode === 'individual') {
      return (
        <div className="chat-screen">
          <Header status={botStatus} />
          <ChatWindow messages={messages} />
          <MessageInput
            onSendMessage={handleSendMessage}
            inputEnabled={uiSettings.inputEnabled}
            buttons={uiSettings.buttons}
          />
        </div>
      );
    } else {
      return (
        <div className="chat-screen">
          <GroupHeader city={userCity} />
          <GroupChat 
            city={userCity}
            onEnterGroup={handleEnterGroup}
          />
        </div>
      );
    }
  };

  return (
    <div className="app-container">
      {renderChat()}
      
      {/* Modal de Pagamento */}
      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
        city={userCity}
      />
    </div>
  );
}

export default App;
