
import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../services/api';
import CategoriesList from './CategoriesList';
import ShowMoreIcon from '../../img/showmore__btn.svg';

const Categories = ({ setSelectedCategory, showAddCategoryForm, onCategoryAdded }) => {
  const [categories, setCategories] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  const handleCategoryAdded = (newCategory) => {
    setCategories([newCategory, ...categories]);
    onCategoryAdded(); // Скрываем форму после добавления
  };

  return (
    <div className="categories">
      <CategoriesList 
        categories={categories} 
        setSelectedCategory={setSelectedCategory} 
        showMore={showMore} 
        onCategoryAdded={handleCategoryAdded} 
        showAddCategoryForm={showAddCategoryForm} 
      />
      {categories.length > 4 && (
          <button className="categories-list__btn-show" onClick={() => setShowMore(!showMore)}>
          <img className='categories-list__btn-icon' src={ShowMoreIcon} alt="Show More Icon" />
            {showMore ? 'Скрыть' : 'Показать больше'}
          </button>
      )}
    </div>
  );
};

export default Categories;

