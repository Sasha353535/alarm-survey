// src/App.js
import React, { useState } from 'react';
import Survey from './Survey';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import WelcomeModal from './WelcomeModal';

// Стилизация основного контейнера с фоном и параллакс-эффектом
const ParallaxBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundImage: `url(${process.env.PUBLIC_URL}/background.webp)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  /* Плавная анимация фона */
  animation: 'moveBackground 20s linear infinite',
  '@keyframes moveBackground': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(18, 18, 18, 0.7)', // Темный оверлей для улучшения читаемости
  zIndex: 1,
}));

// Новый компонент для обертки Survey без параллакс-эффекта
const SurveyWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  zIndex: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const App = () => {
  const [modalOpen, setModalOpen] = useState(true);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <WelcomeModal open={modalOpen} handleClose={handleCloseModal} />
      {!modalOpen && (
        <ParallaxBackground>
          <Overlay />
          <SurveyWrapper>
            <Survey />
          </SurveyWrapper>
        </ParallaxBackground>
      )}
    </>
  );
};

export default App;
