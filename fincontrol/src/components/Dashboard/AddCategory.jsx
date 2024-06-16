// src/components/Dashboard/AddCategory.jsx

import React, { useState } from 'react';
import { addCategory } from '../../services/api';

const AddCategory = ({ onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = async () => {
    if (categoryName.trim() === '') {
      alert('Название категории не может быть пустым');
      return;
    }

    try {
      const newCategory = await addCategory(categoryName);
      onCategoryAdded(newCategory);
      setCategoryName('');
    } catch (error) {
      console.error('Ошибка при добавлении категории:', error);
    }
  };

  return (
    <div className="add-category">
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Название категории"
      />
      <button onClick={handleAddCategory}>Добавить категорию</button>
    </div>
  );
};

export default AddCategory;
