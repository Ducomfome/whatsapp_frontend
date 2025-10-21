// client/src/components/PaymentPage.js - VERSÃO ORIGINAL

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentPage.css';

function PaymentPage() {
  const location = useLocation();
  const { qrCode, copiaECola } = location.state || {};
  const [buttonText, setButtonText] = useState('Copiar Código PIX');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(copiaECola);
    setButtonText('Copiado!');
    setTimeout(() => {
      setButtonText('Copiar Código PIX');
    }, 2000);
  };

  if (!qrCode || !copiaECola) {
    return <div>Erro: Dados de pagamento não encontrados.</div>;
  }

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>Falta pouco!</h2>
        <p>Para liberar seu acesso, faça o pagamento via PIX.</p>
        <img src={`data:image/png;base64,${qrCode}`} alt="PIX QR Code" className="qr-code" />
        <p>Ou use o código abaixo:</p>
        <div className="copia-e-cola-box">
          <input type="text" value={copiaECola} readOnly />
          <button onClick={copyToClipboard}>{buttonText}</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
