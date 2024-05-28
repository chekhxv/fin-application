import React, { useState, useEffect } from 'react';
import Logo from '../img/logo.svg';
import { CSSTransition } from 'react-transition-group';
import LoginForm from "../components/AuthPage/LoginForm";
import RegisterImage from '../img/register-image.png';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true); // Активируем анимацию появления при загрузке компонента
  }, []);

  return (
    <div className='registration-container'>
        <img className='img__register' src={RegisterImage} alt="Img" />
        <div className='registration-container__body'>
          <div className='left-column'> 
              <img className='img__logo' src={Logo} alt="Logo" />
              <h1 className='title__first auth-page__title mb-32px'>
                Личный ассистент для грамотного распоряжения вашими средствами
              </h1>
              <div className="hero-text__wrapper">
                <span>Мобильность</span>
                <span>Комфорт</span>
                <span>Экономия времени</span>
              </div>
          </div>
          <div className='right-column'>
            <h2 className='title__second mb-9px'>Вход в аккаунт</h2>
            <p className="mb-32px">Нет аккаунта? ? <Link className='sign-in__link' to="/register" onClick={() => setInProp(false)}>Зарегистрироваться</Link></p>
            <CSSTransition
              in={inProp}
              timeout={500}
              classNames="fade"
              unmountOnExit
            >
              <LoginForm />
            </CSSTransition>
          </div>
        </div>
    </div>
  );
};

export default LoginPage;
