import React, { useState, useEffect } from 'react';
import RegisterImage from '../img/register-image.png';
import Logo from '../img/logo.svg';
import { Link } from 'react-router-dom';
import RegisterForm from "../components/AuthPage/RegisterForm";
import { CSSTransition } from 'react-transition-group';

const  RegisterPage = () => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);  // Активируем анимацию появления при загрузке компонента
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
            <h2 className='title__second mb-9px'>Создать аккаунт</h2>
            <p className="mb-32px">Уже есть аккаунт ? <Link className='sign-in__link' to="/login" onClick={() => setInProp(false)}>Войти</Link></p>
            <CSSTransition in={inProp} timeout={500} classNames="fade" unmountOnExit>
              <RegisterForm />
            </CSSTransition> 
          </div>
        </div>
    </div>
  )
}

export default RegisterPage;
