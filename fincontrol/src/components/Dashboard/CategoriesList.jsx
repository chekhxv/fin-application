import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../styles/CategoriesList.scss';
import AddCategoryForm from './AddCategoryForm';

const CategoriesList = ({ categories, setSelectedCategory, showMore, onCategoryAdded, showAddCategoryForm }) => {
  const displayedCategories = showMore ? categories : categories.slice(0, 4);

  return (
    <TransitionGroup component="ul" className="categories-list">
      {showAddCategoryForm && (
        <CSSTransition key="add-category-form" timeout={500} classNames="fade">
          <li className='categories-list__item'>
            <AddCategoryForm className='category-form' onCategoryAdded={onCategoryAdded} />
          </li>
        </CSSTransition>
      )}
      {displayedCategories.map((category, index) => (
        <CSSTransition key={index} timeout={500} classNames="fade">
          <li className='categories-list__item' onClick={() => setSelectedCategory(category.name)}>
            <span className='category-color' style={{ backgroundColor: category.color }}></span>
            {category.name}
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default CategoriesList;
