import { useEffect, useState } from 'react';

const fetchUserData = (setUser) => {
  const token = localStorage.getItem('token');
  fetch('http://localhost:3000/api/user', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Fetched user data:', data); // Добавьте эту строку для отладки
      setUser(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      setUser(null);
    });
};

const useFetchUserData = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserData(setUser);
  }, []);

  return user;
};

export default useFetchUserData;
