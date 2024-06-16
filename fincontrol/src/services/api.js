import axios from 'axios';

export const fetchTransactions = async () => {
  const { data } = await axios.get('http://localhost:3000/api/transactions', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return data;
};

export const addCategory = async (name) => {
  const response = await fetch('http://localhost:3000/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ name })
  });
  return await response.json();
};

export const fetchCategories = async () => {
  const response = await fetch('http://localhost:3000/api/categories', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await response.json();
  return data.map(category => ({
    ...category,
    color: category.color || '#ccc' // Дефолтный цвет, если не указан
  }));
};

export const fetchStatistics = async () => {
  const { data } = await axios.get('http://localhost:3000/api/statistics', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return data;
};
