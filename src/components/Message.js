// client/src/components/Message.js - VERSÃO ORIGINAL

import React, { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Linkify from 'react-linkify';
import './Message.css';

const PlayIcon = () => <svg viewBox="0 0 34 34" height="34" width="34"><path fill="#8c949c" d="M8.5,8.7c0-1.7,1.2-2.4,2.6-1.5l14.4,8.3c1.4,0.8,1.4,2.2,0,3l-14.4,8.3 c-1.4,0.8-2.6,0.2-2.6-1.5V8.7z"></path></svg>;
const PauseIcon = () => <svg viewBox="0 0 34 34" height="34" width="34"><path fill="#8c949c" d="M9.2,25c0,0.5,0.4,1,0.9,1h3.6c0.5,0,0.9-0.4,0.9-1V9c0-0.5-0.4-0.9-0.9-0.9h-3.6 C9.7,8,9.2,8.4,9.2,9V25z M20.2,8c-0.5,0-1,0.4-1,0.9V25c0,0.5,0.4,1,1,1h3.6c0.5,0,1-0.4,1-1V9c0-0.5-0.4-0.9-1-0.9 C23.8,8,20.2,8,20.2,8z"></path></svg>;
const MicrophoneIcon = ({ color }) => (
    <div className="microphone-icon" style={{ color }}>
        <svg viewBox="0 0 19 26"><path fill="#FFFFFF" d="M9.217,24.401c-1.158,0-2.1-0.941-2.1-2.1v-2.366c-2.646-0.848-4.652-3.146-5.061-5.958L2.004,13.62 l-0.003-0.081c-0.021-0.559,0.182-1.088,0.571-1.492c0.39-0.404,0.939-0.637,1.507-0.637h0.3c0.254,0,0.498,0.044,0.724,0.125v-6.27 C5.103,2.913,7.016,1,9.367,1c2.352,0,4.265,1.913,4.265,4.265v6.271c0.226-0.081,0.469-0.125,0.723-0.125h0.3 c0.564,0,1.112,0.233,1.501,0.64s0.597,0.963,0.571,1.526c0,0.005,0.001,0.124-0.08,0.6c-0.47,2.703-2.459,4.917-5.029,5.748v2.378 c0,1.158-0.942,2.1-2.1,2.1H9.217V24.401z"></path><path fill="currentColor" d="M9.367,15.668c1.527,0,2.765-1.238,2.765-2.765V5.265c0-1.527-1.238-2.765-2.765-2.765 S6.603,3.738,6.603,5.265v7.638C6.603,14.43,7.84,15.668,9.367,15.668z M14.655,12.91h-0.3c-0.33,0-0.614,0.269-0.631,0.598 c0,0,0,0-0.059,0.285c-0.41,1.997-2.182,3.505-4.298,3.505c-2.126,0-3.904-1.521-4.304-3.531C5.008,13.49,5.008,13.49,5.008,13.49 c-0.016-0.319-0.299-0.579-0.629-0.579h-0.3c-0.33,0-0.591,0.258-0.579,0.573c0,0,0,0,0.04,0.278 c0.378,2.599,2.464,4.643,5.076,4.978v3.562c0,0.33,0.27,0.6,0.6,0.6h0.3c0.33,0,0.6-0.27,0.6-0.6V18.73 c2.557-0.33,4.613-2.286,5.051-4.809c0.057-0.328,0.061-0.411,0.061-0.411C15.243,13.18,14.985,12.91,14.655,12.91z"></path></svg>
    </div>
);

function formatTime(seconds) {
  if (isNaN(seconds) || seconds === 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function Message({ message }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState('0:00');
  const [micColor, setMicColor] = useState('#0cd464');

  useEffect(() => {
    if (message.type === 'audio' && waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4c545c',
        progressColor: '#b8c4c7',
        barWidth: 3,
        height: 47,
        responsive: true,
        cursorWidth: 0,
        barRadius: 2,
        url: message.content, 
      });
      wavesurferRef.current = wavesurfer;

      wavesurfer.on('ready', () => setDuration(formatTime(wavesurfer.getDuration())));
      wavesurfer.on('play', () => { setIsPlaying(true); setMicColor('#2cacdc'); });
      wavesurfer.on('pause', () => { setIsPlaying(false); setMicColor('#0cd464'); });
      wavesurfer.on('finish', () => {
        setIsPlaying(false);
        setMicColor('#0cd464');
        wavesurfer.seekTo(0);
      });
      
      return () => wavesurfer.destroy();
    }
  }, [message.content, message.type]);

  const handlePlayPause = () => {
    wavesurferRef.current?.playPause();
  };

  if (message.sender === 'bot') {
    let contentNode;
    switch (message.type) {
      case 'audio':
        contentNode = (
          <div className="audio-bubble-custom">
            <button onClick={handlePlayPause} className="play-pause-btn">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <div ref={waveformRef} className="waveform-container-real"></div>
            <div className="audio-duration">{duration}</div>
            <img src="https://midia.jdfnu287h7dujn2jndjsifd.com/perfil.webp" alt="Avatar no áudio" className="audio-profile-pic" />
            <MicrophoneIcon color={micColor} />
          </div>
        );
        break;
      
      case 'image':
      case 'gif':
        contentNode = <img src={message.content} alt="imagem do bot" className="message-image" />;
        break;

      case 'video':
        contentNode = <video src={message.content} controls autoPlay muted loop className="message-video" />;
        break;
        
      case 'text':
        contentNode = (
          <div className="message-bubble other-message-bubble">
            <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key}>
                {decoratedText}
              </a>
            )}>
              {message.content}
            </Linkify>
          </div>
        );
        break;
        
      default:
        return null;
    }

    return (
      <div className="message-container bot-message">
        <img src="https://midia.jdfnu287h7dujn2jndjsifd.com/perfil.webp" alt="Avatar" className="avatar" />
        {contentNode}
      </div>
    );
  }
  
  if (message.sender === 'system') {
    return (
      <div className="system-message-container">
        <div className="system-message-bubble">{message.text}</div>
      </div>
    );
  }
  
  if (message.sender === 'me') {
    return (
      <div className="message-container my-message-container">
        <div className="message-bubble my-message-bubble">
          <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
            <a target="_blank" rel="noopener noreferrer" href={decoratedHref} key={key}>
              {decoratedText}
            </a>
          )}>
            {message.text}
          </Linkify>
        </div>
      </div>
    );
  }

  return null;
}

export default Message;
