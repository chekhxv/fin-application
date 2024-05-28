import React, { useState } from 'react';
import ToggleButton from './ToggleButton';

const PasswordField = ({ placeholder, className ,value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className='password-field registration-form__input-wrapper'>
            <input
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={className}
            />
            <ToggleButton className="password-field__btn"  showPassword={showPassword} onClick={toggleShowPassword} />
        </div>
    )
}

export default PasswordField;
