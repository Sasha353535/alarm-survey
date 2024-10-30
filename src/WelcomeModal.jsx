// src/WelcomeModal.jsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Backdrop,
} from '@mui/material';
import { styled } from '@mui/system';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

// Inject global keyframes for animations
const GlobalStyles = styled('style')({
  '@global': {
    '@keyframes glitch-anim': {
      '0%': { clip: 'rect(42px, 9999px, 44px, 0)', transform: 'translate(0)' },
      '10%': { clip: 'rect(12px, 9999px, 54px, 0)', transform: 'translate(-5px, -5px)' },
      '20%': { clip: 'rect(85px, 9999px, 96px, 0)', transform: 'translate(5px, 5px)' },
      '30%': { clip: 'rect(45px, 9999px, 100px, 0)', transform: 'translate(-5px, 5px)' },
      '40%': { clip: 'rect(10px, 9999px, 80px, 0)', transform: 'translate(5px, -5px)' },
      '50%': { clip: 'rect(70px, 9999px, 90px, 0)', transform: 'translate(-5px, -5px)' },
      '60%': { clip: 'rect(20px, 9999px, 60px, 0)', transform: 'translate(5px, 5px)' },
      '70%': { clip: 'rect(50px, 9999px, 70px, 0)', transform: 'translate(-5px, 5px)' },
      '80%': { clip: 'rect(30px, 9999px, 90px, 0)', transform: 'translate(5px, -5px)' },
      '90%': { clip: 'rect(60px, 9999px, 80px, 0)', transform: 'translate(-5px, -5px)' },
      '100%': { clip: 'rect(42px, 9999px, 44px, 0)', transform: 'translate(0)' },
    },
    '@keyframes laser': {
      '0%': { opacity: 0, transform: 'scale(1)' },
      '50%': { opacity: 1, transform: 'scale(1.05)' },
      '100%': { opacity: 0, transform: 'scale(1)' },
    },
    '@keyframes shimmer': {
      '0%': {
        'background-position': '-1000px 0',
      },
      '100%': {
        'background-position': '1000px 0',
      },
    },
    '@keyframes pulse': {
      '0%': {
        transform: 'scale(1)',
        boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
      },
      '50%': {
        transform: 'scale(1.05)',
        boxShadow: '0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff',
      },
      '100%': {
        transform: 'scale(1)',
        boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
      },
    },
    '@keyframes glow': {
      '0%': {
        opacity: 0.5,
      },
      '50%': {
        opacity: 1,
      },
      '100%': {
        opacity: 0.5,
      },
    },
  },
});

// Custom Motion Backdrop with Shimmer Effect
const MotionBackdrop = (props) => {
  const { children, ...other } = props;

  return (
    <Backdrop {...other} sx={{ zIndex: 1200 }}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(/background_welcomeload.svg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '200% 100%',
            animation: 'shimmer 5s linear infinite',
            pointerEvents: 'none', // Ensure it doesn't block interactions
            zIndex: 1, // Place shimmer above background image
          },
        }}
      />
      {children}
    </Backdrop>
  );
};

// Styled MotionBox with Enhanced Cyberpunk Effects
const MotionBox = motion(Box);

// Single Styled Container for the Modal
const StyledModalBox = styled(MotionBox)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', // Dark gradient background
  borderRadius: '12px',
  border: '2px solid rgba(144, 202, 249, 0.7)', // Neon border
  boxShadow: '0 0 20px rgba(144, 202, 249, 0.5), 0 0 40px rgba(144, 202, 249, 0.3)',
  padding: theme.spacing(4),
  maxWidth: '600px',
  width: '90%',
  textAlign: 'left', // Left alignment
  color: '#ffffff',
  overflow: 'hidden',
  position: 'relative', // Relative positioning for pseudo-elements
  zIndex: 1300, // Ensures it's above the backdrop

  // Glitch Effect using ::before
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'inherit',
    opacity: 0.8,
    mixBlendMode: 'overlay',
    animation: 'glitch-anim 2s infinite',
  },

  // Laser Borders using ::after
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: '2px solid rgba(0, 255, 255, 0.5)', // Cyan laser border
    borderRadius: '12px',
    boxSizing: 'border-box',
    animation: 'laser 2s infinite',
    pointerEvents: 'none',
    mixBlendMode: 'overlay',
  },

  // Additional Glitch Layers for Enhanced Effect
  '& .glitch-layer': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'inherit',
    mixBlendMode: 'screen',
    animation: 'glitch-anim 3s infinite',
    opacity: 0.5,
  },

  // Responsive Adjustments
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    maxWidth: '90%',
  },
}));

// Styled Button with Neon and Pulsing Effects
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  paddingX: theme.spacing(4), // Increased horizontal padding
  paddingY: theme.spacing(2), // Increased vertical padding
  borderRadius: '8px',
  boxShadow: '0px 0px 10px #00ffff, 0px 0px 20px #00ffff, 0px 0px 30px #00ffff',
  transition: 'transform 0.3s, box-shadow 0.3s, background-color 0.3s',
  backgroundColor: '#00ffff', // Neon cyan background
  color: '#ffffff',
  fontFamily: 'Roboto Mono, monospace',
  fontSize: '1.2rem', // Increased font size
  position: 'relative',
  overflow: 'hidden',
  animation: 'pulse 2s infinite',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'rotate(45deg)',
    animation: 'glow 4s linear infinite',
  },

  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 0px 20px #00ffff, 0px 0px 30px #00ffff, 0px 0px 40px #00ffff',
    backgroundColor: '#00e6e6',
  },
}));

// Child Component: Greeting
const Greeting = ({ onComplete }) => {
  const word = 'Привет!';
  const typeSpeed = 60; // ms per character
  const delaySpeed = 1000; // 1 second delay after typing

  const [text] = useTypewriter({
    words: [word],
    loop: 1, // Type once
    typeSpeed: typeSpeed,
    deleteSpeed: 0, // No deletion
    delaySpeed: delaySpeed,
  });

  useEffect(() => {
    if (text === word) {
      // Вычисляем общее время: набор текста + задержка
      const totalTime = (word.length * typeSpeed) + delaySpeed;
      const timeout = setTimeout(() => {
        onComplete();
      }, totalTime);
      return () => clearTimeout(timeout);
    }
  }, [text, word, typeSpeed, delaySpeed, onComplete]);

  return (
    <Typography
      variant="h5"
      gutterBottom
      sx={{
        whiteSpace: 'pre-wrap', // Preserve line breaks
        wordBreak: 'break-word',
        fontFamily: 'Roboto Mono, monospace',
        textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
        zIndex: 1, // Ensure text is above pseudo-elements
        fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.5rem' }, // Responsive font sizes
      }}
    >
      {text}
      <Cursor cursorStyle="|" />
    </Typography>
  );
};

const MainText = ({ onComplete }) => {
  const word = '- Представь: ты просыпаешься под звук, идеально синхронизированный с твоими биоритмами, мягко вытаскивающий тебя из сна. Никакого стресса. Только чистая энергия нового дня.';
  const typeSpeed = 60; // Скорость набора текста
  const delaySpeed = 0; // Убираем задержку при наборе

  const [text] = useTypewriter({
    words: [word],
    loop: 1,
    typeSpeed: typeSpeed,
    deleteSpeed: 0,
    delaySpeed: delaySpeed,
  });

  useEffect(() => {
    if (text === word) {
      // Минимальная задержка перед вызовом onComplete
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000); // Задержка 300 мс

      return () => clearTimeout(timeout);
    }
  }, [text, word, onComplete]);

  return (
    <Typography
      variant="h5"
      gutterBottom
      sx={{
        whiteSpace: 'pre-wrap', // Preserve line breaks
        wordBreak: 'break-word',
        fontFamily: 'Roboto Mono, monospace',
        textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
        zIndex: 1, // Ensure text is above pseudo-elements
        fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.5rem' }, // Responsive font sizes
        marginTop: 2,
      }}
    >
      {text}
      <Cursor cursorStyle="|" />
    </Typography>
  );
};

const Question = ({ onComplete }) => {
  const word = 'Хочешь такое будущее?';
  const typeSpeed = 60; // ms per character
  const delaySpeed = 1000; // 1 second delay after typing

  const [text] = useTypewriter({
    words: [word],
    loop: 1, // Type once
    typeSpeed: typeSpeed,
    deleteSpeed: 0, // No deletion
    delaySpeed: delaySpeed,
  });

  const [showCursor, setShowCursor] = useState(true); // Управляем отображением курсора

  useEffect(() => {
    if (text === word) {
      // После завершения текста скрываем курсор и вызываем onComplete
      const totalTime = (word.length * typeSpeed) + delaySpeed;
      const timeout = setTimeout(() => {
        setShowCursor(false); // Скрываем курсор
        onComplete();
      }, totalTime);
      return () => clearTimeout(timeout);
    }
  }, [text, word, typeSpeed, delaySpeed, onComplete]);

  return (
    <Typography
      variant="h5"
      gutterBottom
      sx={{
        whiteSpace: 'pre-wrap', // Preserve line breaks
        wordBreak: 'break-word',
        fontFamily: 'Roboto Mono, monospace',
        textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff',
        zIndex: 1, // Ensure text is above pseudo-elements
        fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.5rem' }, // Responsive font sizes
        marginTop: 2,
      }}
    >
      {text}
      {showCursor && <Cursor cursorStyle="|" />} {/* Курсор отображается только, если showCursor === true */}
    </Typography>
  );
};

// Parent Component: WelcomeModal
const WelcomeModal = ({ open, handleClose }) => {
  const [currentStep, setCurrentStep] = useState(1); // Manage steps
  const [showLastSentence, setShowLastSentence] = useState(false); // Show last sentence

  // Handler когда Greeting завершено
  const handleGreetingComplete = () => {
    setCurrentStep(2);
  };

  // Handler когда MainText завершено
  const handleMainTextComplete = () => {
    setCurrentStep(3);
  };

  // Handler когда Question завершено
  const handleQuestionComplete = () => {
    setShowLastSentence(true);
  };

  return (
    <>
      <GlobalStyles />
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
            // Не закрывать модалку при клике на backdrop или нажатии Escape
            return;
          }
          handleClose();
        }}
        closeAfterTransition
        BackdropComponent={MotionBackdrop} // Использовать кастомный MotionBackdrop
        BackdropProps={{
          timeout: 700,
        }}
        aria-labelledby="welcome-modal-title"
        aria-describedby="welcome-modal-description"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Полная высота окна
            position: 'relative',
            zIndex: 1300, // Выше MotionBackdrop
          }}
        >
          <StyledModalBox
            initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }} // Замедленная анимация
          >
            {/* Дополнительные слои глитча */}
            <Box className="glitch-layer" />
            <Box className="glitch-layer" style={{ left: '2px', top: '2px' }} />
            <Box className="glitch-layer" style={{ left: '-2px', top: '-2px' }} />

            {/* Шаг 1: Greeting */}
            {currentStep === 1 && <Greeting onComplete={handleGreetingComplete} />}

            {/* Шаг 2: MainText */}
            {currentStep === 2 && <MainText onComplete={handleMainTextComplete} />}

            {/* Шаг 3: Question */}
            {currentStep === 3 && <Question onComplete={handleQuestionComplete} />}

            {/* Шаг 4: LastSentence */}
            {showLastSentence && (
              <>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    whiteSpace: 'pre-wrap', // Preserve line breaks
                    wordBreak: 'break-word',
                    fontFamily: 'Roboto Mono, monospace',
                    marginTop: 2,
                    textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #00ffff',
                    zIndex: 1, // Ensure text is above pseudo-elements
                    fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.5rem' }, // Responsive font sizes
                  }}
                >
                  Пройди опрос и стань его частью.
                </Typography>
                {/* Styled "Пройти" Button */}
                <StyledButton variant="contained" onClick={handleClose}>
                  Пройти
                </StyledButton>
              </>
            )}
          </StyledModalBox>
        </Box>
      </Modal>
    </>
  );
};

export default WelcomeModal;
