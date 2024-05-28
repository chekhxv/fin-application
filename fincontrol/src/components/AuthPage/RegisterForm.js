import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../utilits/InputField';
import PasswordField from '../utilits/PasswordField';
import ReCAPTCHA from "react-google-recaptcha";
import { handleSubmit } from '../../services/formHandlers'; // Предполагается, что ваша логика отправки данных на сервер вынесена сюда

const RegistrationForm = () => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const [message, setMessage] = useState(''); // Состояние для сообщений

    const navigate = useNavigate(); // Получаем функцию navigate

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value); // Сохраняем токен reCAPTCHA
    };

    return (
        <form className="registration-form" onSubmit={(event) => handleSubmit(event, {
            fullName, email, phone, password, confirmPassword, captchaValue,
            onSuccess: (data) => navigate('/dashboard'),
            onError: (error) => console.error('Registration error:', error),
            setMessage
        })}>
            <InputField className="registration-form__input" inputMode="cyrillic" type="text" placeholder={"Ф.И.О"} value={fullName} onChange={e => setFullName(e.target.value)} />
            <InputField className="registration-form__input" placeholder={"Email"} type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <InputField className="registration-form__input" placeholder={"Номер телефона"} pattern="[0-9]*" maxLength="15" inputMode="numeric" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
            <PasswordField className="registration-form__input registration-form__input-pass" placeholder={"Пароль"} value={password} onChange={e => setPassword(e.target.value)} />
            <PasswordField className="registration-form__input registration-form__input-pass" placeholder={"Подтверждение пароля"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <ReCAPTCHA
                sitekey="6LdZzNkpAAAAANQ469Bw0gLF3fOrKLEeY3LZ5ELi"
                onChange={handleCaptchaChange}
            />
            <p className="confirm-text mb-16px">Кликнув на кнопку «Регистрация», <br/> вы даете согласие на обработку личных данных.</p>
            <p className="message-text">{message}</p>
            <button className="registration-form__btn" type="submit">Зарегистрироваться</button>
        </form>
    );
};

export default RegistrationForm;
