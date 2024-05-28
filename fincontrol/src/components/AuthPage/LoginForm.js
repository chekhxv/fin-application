import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импорт хука useNavigate
import { handleLogin } from '../../services/authHandlers';
import InputField from '../utilits/InputField';
import PasswordField from '../utilits/PasswordField';
import ReCAPTCHA from "react-google-recaptcha";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // Инициализация функции навигации

    const handleCaptchaChange = (value) => setCaptchaValue(value);

    return (
        <form className="login-form" onSubmit={(event) => handleLogin(event, {
            email, password, captchaValue,
            onSuccess: (data) => {
                console.log("Вход выполнен успешно:", data);
                setMessage("Вы успешно вошли в систему!");
                navigate('/dashboard'); // Редирект на страницу Dashboard
            },
            onError: (message) => {
                console.error('Ошибка входа:', message);
                setMessage(message);
            },
            setMessage
        })}>
            <InputField className="login-form__input" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <PasswordField className="login-form__input login-form__input-pass" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
            <ReCAPTCHA sitekey="6LdZzNkpAAAAANQ469Bw0gLF3fOrKLEeY3LZ5ELi" onChange={handleCaptchaChange} />
            <p className="message-text">{message}</p>
            <button className="login-form__btn" type="submit">Войти</button>
        </form>
    );
};

export default LoginForm;
