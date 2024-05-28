import React from 'react'

const InputField = ({type, pattern, placeholder, inputMode, value, maxLength, onInput, className, onChange}) => {
  const handleInput = (e) => {
    if (inputMode === 'numeric') {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    } else if (inputMode === 'cyrillic') {
      e.target.value = e.target.value.replace(/[^А-яЁё\s]/g, '');
    }
  };
  return (
    <div className="registration-form__input-wrapper">
        <input 
            className={className} 
            placeholder={placeholder} 
            type={type} 
            value={value} 
            onChange={onChange} 
            pattern={pattern} 
            maxLength={maxLength} 
            onInput={handleInput} // Добавленный обработчик для контроля ввода
        />
    </div>
  )
}

export default InputField;
