import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import MyCalendar from '../components/Dashboard/Calendar';
import Statistics from '../components/Dashboard/Statistics';
import Categories from '../components/Dashboard/Categories';
import TransactionsTable from '../components/Dashboard/TransactionsTable';
import '../styles/Dashboard.scss';

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [activeFilterButton, setActiveFilterButton] = useState('expense');
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  const handleCategoryClick = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const handleFilterTypeClick = (type) => {
    if (filterType === type) {
      setFilterType('all');
    } else {
      setFilterType(type);
    }
    setActiveFilterButton(type);
  };

  useEffect(() => {
    setActiveFilterButton('expense');
  }, []);

  const handleAddCategoryClick = () => {
    setShowAddCategoryForm(!showAddCategoryForm);
  };

  return (
    <div className="dashboard-page">
      <Header />
      <main className='container'>
        <div className='flex-container'>
          <div className='calendar-wrapper'>
            <div className="calendar-wrapper__header">
              <h2 className="title__second">Статистика</h2>
              <button className='calendar__btn-clear'>Очистить</button>
            </div>
            <MyCalendar />
          </div>

          <Statistics />
          <div className='categories-container'>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${activeFilterButton === 'expense' ? 'active' : ''}`} 
                onClick={() => handleFilterTypeClick('expense')}
              >
                Расходы
              </button>
              <button 
                className={`filter-btn ${activeFilterButton === 'income' ? 'active' : ''}`} 
                onClick={() => handleFilterTypeClick('income')}
              >
                Доходы
              </button>
            </div>
            <div className="categories-container__header">
              <h3 className='title__third'>Категории</h3>
              <button className='categories__btn' onClick={handleAddCategoryClick}>+</button>
            </div>
            <Categories 
              setSelectedCategory={handleCategoryClick} 
              showAddCategoryForm={showAddCategoryForm} 
              onCategoryAdded={() => setShowAddCategoryForm(false)}
            />
          </div>
        </div>
        <TransactionsTable selectedCategory={selectedCategory} filterType={filterType} />
      </main>
    </div>
  );
};

export default Dashboard;
