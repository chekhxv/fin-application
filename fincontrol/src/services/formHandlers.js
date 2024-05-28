// services/formHandlers.js
export const handleSubmit = (event, { fullName, email, phone, password, confirmPassword, captchaValue, onSuccess, onError, setMessage }) => {
  event.preventDefault();

  if (!captchaValue) {
      setMessage("Пожалуйста, подтвердите, что вы не робот.");
      return;
  }

  if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage("Все поля должны быть заполнены.");
      return;
  }

  if (password !== confirmPassword) {
      setMessage("Пароли не совпадают.");
      return;
  }

  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullName, email, phone, password, confirmPassword
    })
  })
  .then(response => {
      if (!response.ok) {
          return response.json().then(data => Promise.reject(data));
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      setMessage("Регистрация прошла успешно!");
      localStorage.setItem('token', data.token); // Сохраняем токен
      onSuccess(data);
  })
  .catch(error => {
      console.error('Error:', error);
      setMessage(error.error || "Произошла ошибка при регистрации");
      onError(error);
  });
};


