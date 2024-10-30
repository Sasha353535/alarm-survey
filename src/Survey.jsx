// src/Survey.jsx
import React, { useState } from 'react';
import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Paper,
  Box,
  Fade,
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Анимация киберпанковского фона
const cyberpunkBackground = keyframes`
  0% { transform: translate(0, 0) scale(1); filter: brightness(0.6) hue-rotate(0deg); }
  25% { transform: translate(-10px, -5px) scale(1.02); filter: brightness(0.8) hue-rotate(20deg); }
  50% { transform: translate(0, -10px) scale(1.05); filter: brightness(1) hue-rotate(45deg); }
  75% { transform: translate(10px, 5px) scale(1.02); filter: brightness(0.8) hue-rotate(20deg); }
  100% { transform: translate(0, 0) scale(1); filter: brightness(0.6) hue-rotate(0deg); }
`;

// Новый стиль киберпанковского анимированного фона
const Background = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: 'url(/background.webp)', // Убедитесь, что изображение находится в папке public
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  animation: `${cyberpunkBackground} 12s ease-in-out infinite`, // Анимация параллакса и сияния
  zIndex: -1,
  filter: 'brightness(0.6)', // Легкое затемнение
  boxShadow: `
    0 0 30px rgba(0, 255, 255, 0.5),
    0 0 50px rgba(255, 0, 255, 0.3),
    0 0 80px rgba(0, 255, 255, 0.4)
  `, // Неоновое свечение
}));

// Контейнер без фона, центрирует модальное окно
const ContainerWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  minHeight: '100vh',
}));

// Анимация для появления модального окна
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// StyledPaper с киберпанковскими эффектами
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: 'rgba(10, 10, 10, 0.85)', // Темный полупрозрачный фон
  maxWidth: '700px',
  width: '100%',
  borderRadius: '12px',
  boxShadow: `
    0 0 20px rgba(0, 255, 255, 0.5),
    0 0 30px rgba(0, 255, 255, 0.7)
  `,
  position: 'relative',
  zIndex: 2,
  border: '1px solid #00FFFF', // Неоновая рамка
  animation: `${fadeIn} 0.5s ease-in-out`,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    boxShadow: `
      0 0 5px rgba(0, 255, 255, 0.3),
      0 0 10px rgba(0, 255, 255, 0.5)
    `,
  },
  transition: 'box-shadow 0.3s ease-in-out, background-color 0.3s',
  '&:hover': {
    boxShadow: `
      0 0 10px rgba(0, 255, 255, 0.6),
      0 0 20px rgba(0, 255, 255, 0.8)
    `,
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
  },
}));

// StyledTypography с киберпанковыми цветами и свечением
const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  textAlign: 'center',
  color: '#FFFFFF', // Белый текст
  textShadow: '0 0 5px #00FFFF, 0 0 15px #00FFFF',
  fontFamily: "'Orbitron', sans-serif", // Киберпанковский шрифт
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
  },
}));

// Styled SubmitButton с белым фоном и черным текстом
const SubmitButton = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  borderRadius: '8px',
  backgroundColor: '#FFFFFF', // Белый фон
  color: '#000000', // Черный текст
  boxShadow: '0px 4px 20px rgba(0, 255, 255, 0.4)',
  transition: 'box-shadow 0.3s, background-color 0.3s, transform 0.3s',
  fontFamily: "'Orbitron', sans-serif",
  '&:hover': {
    boxShadow: '0px 6px 25px rgba(0, 255, 255, 0.6)',
    backgroundColor: '#EEEEEE',
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// Styled FormControlLabel с белым текстом и свечением
const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  color: '#FFFFFF', // Белый текст
  textShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF',
  fontFamily: "'Orbitron', sans-serif",
}));

// Добавим стили для Radio Buttons
const StyledRadio = styled(Radio)(({ theme }) => ({
  color: '#00FFFF',
  '&.Mui-checked': {
    color: '#00FFFF',
  },
}));

// Новый стилизованный компонент для ошибок в стиле киберпанк
const CyberpunkError = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: 'rgba(255, 0, 255, 0.2)',
  color: '#FF00FF',
  border: '1px solid #FF00FF',
  borderRadius: '4px',
  fontFamily: "'Orbitron', sans-serif",
  textShadow: '0 0 5px #FF00FF, 0 0 10px #FF00FF',
  animation: `${keyframes`
    0% { opacity: 0; transform: translateX(-10px); }
    50% { opacity: 1; transform: translateX(0); }
    100% { opacity: 0; transform: translateX(10px); }
  `} 1s ease-in-out`,
}));

const Survey = () => {
  const [answers, setAnswers] = useState({
    alarmType: '',
    feeling: '',
    snoozeFrequency: '',
    helpsWakeUp: '',
    changes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });

    // Удаляем ошибку при изменении значения
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: false,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(answers).forEach((key) => {
      if (!answers[key]) {
        newErrors[key] = true;
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Здесь можно отправить данные на сервер
    console.log('Ответы пользователя:', answers);
    setSubmitted(true);
  };

  return (
    <>
      {/* Анимированный фон */}
      <Background />

      <ContainerWrapper>
        <StyledPaper elevation={6}>
          {!submitted ? (
            <form onSubmit={handleSubmit}>  
              <StyledTypography variant="h4" gutterBottom>
                Будильник 2.0: перезапуск утра для максимальной продуктивности 
              </StyledTypography>

              {/* Вопрос 1 */}
              <FormControl
                component="fieldset"
                fullWidth
                sx={{ mb: 3 }}
                error={errors.alarmType}
              >
                <FormLabel component="legend" sx={{ color: '#FFFFFF', fontFamily: "'Orbitron', sans-serif" }}>
                  1. Какой тип будильника вы используете?
                </FormLabel>
                <RadioGroup
                  aria-label="alarmType"
                  name="alarmType"
                  value={answers.alarmType}
                  onChange={handleChange}
                >
                  <StyledFormControlLabel
                    value="Стандартная мелодия телефона"
                    control={<StyledRadio />}
                    label="Стандартная мелодия телефона"
                  />
                  <StyledFormControlLabel
                    value="Своя музыка"
                    control={<StyledRadio />}
                    label="Своя музыка"
                  />
                  <StyledFormControlLabel
                    value="Звуки природы"
                    control={<StyledRadio />}
                    label="Звуки природы"
                  />
                  <StyledFormControlLabel
                    value="Громкий сигнал"
                    control={<StyledRadio />}
                    label="Громкий сигнал"
                  />
                  <StyledFormControlLabel
                    value="Световой будильник"
                    control={<StyledRadio />}
                    label="Световой будильник"
                  />
                  <StyledFormControlLabel
                    value="Другое"
                    control={<StyledRadio />}
                    label="Другое"
                  />
                </RadioGroup>
                {errors.alarmType && (
                  <CyberpunkError>
                    Пожалуйста, выберите один из вариантов.
                  </CyberpunkError>
                )}
              </FormControl>

              {/* Вопрос 2 */}
              <FormControl
                component="fieldset"
                fullWidth
                sx={{ mb: 3 }}
                error={errors.feeling}
              >
                <FormLabel component="legend" sx={{ color: '#FFFFFF', fontFamily: "'Orbitron', sans-serif" }}>
                  2. Как вы себя чувствуете после пробуждения?
                </FormLabel>
                <RadioGroup
                  aria-label="feeling"
                  name="feeling"
                  value={answers.feeling}
                  onChange={handleChange}
                >
                  <StyledFormControlLabel
                    value="Энергично"
                    control={<StyledRadio />}
                    label="Энергично"
                  />
                  <StyledFormControlLabel
                    value="Нейтрально"
                    control={<StyledRadio />}
                    label="Нейтрально"
                  />
                  <StyledFormControlLabel
                    value="Усталость"
                    control={<StyledRadio />}
                    label="Усталость"
                  />
                  <StyledFormControlLabel
                    value="Раздражение"
                    control={<StyledRadio />}
                    label="Раздражение"
                  />
                </RadioGroup>
                {errors.feeling && (
                  <CyberpunkError>
                    Пожалуйста, выберите один из вариантов.
                  </CyberpunkError>
                )}
              </FormControl>

              {/* Вопрос 3 */}
              <FormControl
                component="fieldset"
                fullWidth
                sx={{ mb: 3 }}
                error={errors.snoozeFrequency}
              >
                <FormLabel component="legend" sx={{ color: '#FFFFFF', fontFamily: "'Orbitron', sans-serif" }}>
                  3. Как часто вы откладываете будильник?
                </FormLabel>
                <RadioGroup
                  aria-label="snoozeFrequency"
                  name="snoozeFrequency"
                  value={answers.snoozeFrequency}
                  onChange={handleChange}
                >
                  <StyledFormControlLabel
                    value="Никогда"
                    control={<StyledRadio />}
                    label="Никогда"
                  />
                  <StyledFormControlLabel
                    value="Иногда"
                    control={<StyledRadio />}
                    label="Иногда"
                  />
                  <StyledFormControlLabel
                    value="Почти всегда"
                    control={<StyledRadio />}
                    label="Почти всегда"
                  />
                </RadioGroup>
                {errors.snoozeFrequency && (
                  <CyberpunkError>
                    Пожалуйста, выберите один из вариантов.
                  </CyberpunkError>
                )}
              </FormControl>

              {/* Вопрос 4 */}
              <FormControl
                component="fieldset"
                fullWidth
                sx={{ mb: 3 }}
                error={errors.helpsWakeUp}
              >
                <FormLabel component="legend" sx={{ color: '#FFFFFF', fontFamily: "'Orbitron', sans-serif" }}>
                  4. Помогает ли выбранный будильник легче проснуться?
                </FormLabel>
                <RadioGroup
                  aria-label="helpsWakeUp"
                  name="helpsWakeUp"
                  value={answers.helpsWakeUp}
                  onChange={handleChange}
                >
                  <StyledFormControlLabel
                    value="Да"
                    control={<StyledRadio />}
                    label="Да"
                  />
                  <StyledFormControlLabel
                    value="Частично"
                    control={<StyledRadio />}
                    label="Частично"
                  />
                  <StyledFormControlLabel
                    value="Нет"
                    control={<StyledRadio />}
                    label="Нет"
                  />
                </RadioGroup>
                {errors.helpsWakeUp && (
                  <CyberpunkError>
                    Пожалуйста, выберите один из вариантов.
                  </CyberpunkError>
                )}
              </FormControl>

              {/* Вопрос 5 */}
              <FormControl
                component="fieldset"
                fullWidth
                sx={{ mb: 3 }}
                error={errors.changes}
              >
                <FormLabel component="legend" sx={{ color: '#FFFFFF', fontFamily: "'Orbitron', sans-serif" }}>
                  5. Что бы вы изменили в своем будильнике?
                </FormLabel>
                <RadioGroup
                  aria-label="changes"
                  name="changes"
                  value={answers.changes}
                  onChange={handleChange}
                >
                  <StyledFormControlLabel
                    value="Звук"
                    control={<StyledRadio />}
                    label="Звук"
                  />
                  <StyledFormControlLabel
                    value="Громкость"
                    control={<StyledRadio />}
                    label="Громкость"
                  />
                  <StyledFormControlLabel
                    value="Тип сигнала"
                    control={<StyledRadio />}
                    label="Тип сигнала"
                  />
                  <StyledFormControlLabel
                    value="Ничего"
                    control={<StyledRadio />}
                    label="Ничего"
                  />
                </RadioGroup>
                {errors.changes && (
                  <CyberpunkError>
                    Пожалуйста, выберите один из вариантов.
                  </CyberpunkError>
                )}
              </FormControl>

              <Box display="flex" justifyContent="center">
                <SubmitButton
                  variant="contained"
                  type="submit"
                  size="large"
                >
                  Отправить
                </SubmitButton>
              </Box>
            </form>
          ) : (
            <Fade in={submitted}>
              <Box textAlign="center" py={5}>
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF', textShadow: '0 0 2px #FFFFFF, 0 0 10px #FFFFFF', fontFamily: "'Orbitron', sans-serif" }}>
                  Спасибо за участие в опросе!
                </Typography>
                <Typography variant="body1" sx={{ color: '#FFFFFF', textShadow: '0 0 2px #FFFFFF, 0 0 10px #FFFFFF', fontFamily: "'Orbitron', sans-serif" }}>
                  Ваши ответы были успешно отправлены
                </Typography>
              </Box>
            </Fade>
          )}
        </StyledPaper>
      </ContainerWrapper>
    </>
  );
};

export default Survey;
