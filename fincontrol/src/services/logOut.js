export const handleLogout = async (onSuccess, onError) => {
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
  
      const data = await response.json();
      localStorage.removeItem('token'); // Удаляем токен
      onSuccess(data);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      onError(error.message || "Произошла ошибка при выходе из системы!");
    }
  };
  