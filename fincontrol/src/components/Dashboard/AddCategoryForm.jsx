import React, { useState } from 'react';
import { addCategory } from '../../services/api';

const AddCategoryForm = ({ onCategoryAdded }) => {
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
    <div className="add-category-form">
      <input
        className='category-form__input'
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Название категории"
      />
      <button className='category-form__btn' onClick={handleAddCategory}>Добавить</button>
    </div>
  );
};

export default AddCategoryForm;
