export const handleLogin = (event, { email, password, captchaValue, onSuccess, onError, setMessage }) => {
    event.preventDefault();
  
    if (!captchaValue) {
        setMessage("Пожалуйста, подтвердите, что вы не робот.");
        return;
    }
  
    if (!email.trim() || !password.trim()) {
        setMessage("Все поля должны быть заполнены.");
        return;
    }
  
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => Promise.reject(data));
        }
        return response.json();
    })
    .then(data => {
        if (data.message === "Вход выполнен успешно") {
            localStorage.setItem('token', data.token); // Сохраняем токен
            onSuccess(data);
        } else {
            onError(data.message);
        }
    })
    .catch(error => {
        console.error('Ошибка при входе:', error);
        setMessage(error.message || "Произошла ошибка при входе в систему!");
        onError(error);
    });
  };