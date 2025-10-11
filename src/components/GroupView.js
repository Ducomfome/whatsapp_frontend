// client/src/components/GroupView.js

import React from 'react';

const groupPageStyle = {
  border: 'none',
  width: '100%',
  height: '100vh',
  overflow: 'hidden', // Para não ter barras de rolagem
};

function GroupView() {
  return (
    <iframe 
      src="https://typebot.co/het-19-90-kfjsgwg" 
      style={groupPageStyle}
      title="Grupo Final"
    ></iframe>
  );
}

export default GroupView;