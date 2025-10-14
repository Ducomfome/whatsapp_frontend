// client/src/components/GroupChat.js - DIÁLOGO COMPLETO DO GRUPO

import React, { useState, useEffect } from 'react';
import Message from './Message';
import './GroupChat.css';

const GroupChat = ({ city, onEnterGroup }) => {
  const [groupMessages, setGroupMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showJoinButton, setShowJoinButton] = useState(false);

  // Função para obter DDD baseado na cidade (exemplo simplificado)
  const getDDD = () => {
    const dddMap = {
      'São Paulo': '11',
      'Rio de Janeiro': '21', 
      'Belo Horizonte': '31',
      'Porto Alegre': '51',
      'Curitiba': '41',
      'Salvador': '71',
      'Fortaleza': '85',
      'Recife': '81',
      'Manaus': '92',
      // Adicione mais cidades conforme necessário
    };
    return dddMap[city] || '11'; // Default para SP se não encontrar
  };

  // Diálogo do grupo - SEQUÊNCIA EXATA QUE VOCÊ PEDIU
  const groupDialogue = [
    // Mensagem 1 - Primeira mulher
    {
      id: 1,
      sender: 'bot',
      type: 'text',
      content: `Meu corninho nao para de me ligar gente, afff`,
      profilePic: 'https://midia.jdfnu287h7dujn2jndjsifd.com/IMG-20230920-204325646464.webp',
      phoneNumber: `+55 ${getDDD()} 94238-9726`
    },
    
    // Mensagem 2 - Primeira mulher (com foto)
    {
      id: 2,
      sender: 'bot', 
      type: 'image',
      content: 'https://midia.jdfnu287h7dujn2jndjsifd.com/IMG-20240925-211627.webp',
      profilePic: 'https://midia.jdfnu287h7dujn2jndjsifd.com/IMG-20230920-204325646464.webp',
      phoneNumber: `+55 ${getDDD()} 94238-9726`,
      caption: 'Vou fazer ele esperar, olha como eu to agora gente'
    },

    // Mensagem 3 - Segunda mulher
    {
      id: 3,
      sender: 'bot',
      type: 'text', 
      content: 'O meu ja adestrei, pica nova todo dia kkk',
      profilePic: 'https://midia.jdfnu287h7dujn2jndjsifd.com/1718211968653.webp',
      phoneNumber: `+55 ${getDDD()} 92450-9675`
    },

    // Mensagem 4 - Terceira mulher  
    {
      id: 4,
      sender: 'bot',
      type: 'text',
      content: 'Genteee, o Paulo que entrou ontem me comeu tao bem',
      profilePic: 'https://midia.jdfnu287h7dujn2jndjsifd.com/1641853871190.webp',
      phoneNumber: `+55 ${getDDD()} 94096-7607`
    }
  ];

  // Simula o envio das mensagens em sequência
  useEffect(() => {
    if (currentStep < groupDialogue.length) {
      const timer = setTimeout(() => {
        setGroupMessages(prev => [...prev, groupDialogue[currentStep]]);
        setCurrentStep(prev => prev + 1);
      }, 2000); // 2 segundos entre cada mensagem

      return () => clearTimeout(timer);
    } else {
      // Após todas as mensagens, mostra o botão de entrar no grupo
      setTimeout(() => {
        setShowJoinButton(true);
      }, 1500);
    }
  }, [currentStep]);

  return (
    <div className="group-chat-container">
      {/* Área de mensagens do grupo */}
      <div className="group-messages">
        {groupMessages.map(message => (
          <Message 
            key={message.id} 
            message={{
              ...message,
              // Passa informações extras para o componente Message
              isGroup: true,
              phoneNumber: message.phoneNumber
            }} 
          />
        ))}
      </div>

      {/* Botão de entrar no grupo (aparece após o diálogo) */}
      {showJoinButton && (
        <div className="group-join-section">
          <div className="group-join-card">
            <div className="group-info">
              <img 
                src="https://midia.jdfnu287h7dujn2jndjsifd.com/IMG-20240711-00350743535.webp" 
                alt="Grupo" 
                className="group-avatar"
              />
              <div className="group-details">
                <div className="group-name">🔞 GRUPO SECRETO - {city.toUpperCase()}</div>
                <div className="group-members">2 usuários · +600 membros</div>
              </div>
            </div>
            <button 
              className="join-group-btn"
              onClick={onEnterGroup}
            >
              ENTRAR NO GRUPO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupChat;
