import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../../services/api';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../styles/TableAnimations.scss'; 

const TransactionsTable = ({ selectedCategory, filterType }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions();
      setTransactions(data);
    };
    getTransactions();
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    if (filterType !== 'all' && transaction.type !== filterType) {
      return false;
    }
    if (selectedCategory && transaction.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="transactions-table">
      <table className='transactions-table__wrapper'>
        <thead className='transactions-table__header'>
          <tr>
            <th className='transactions-table__title'>Категория</th>
            <th className='transactions-table__title'>Сумма</th>
            <th className='transactions-table__title'>Дата</th>
            <th className='transactions-table__title'>Время</th>
            <th className='transactions-table__title'>Место</th>
            <th className='transactions-table__title'>Остаток</th>
          </tr>
        </thead>
        <TransitionGroup component="tbody" className='transactions-table__body'>
          {filteredTransactions.map(transaction => (
            <CSSTransition key={transaction.id} timeout={500} classNames="fade">
              <tr>
                <td className='transactions-table__info'>{transaction.category}</td>
                <td className='transactions-table__info'>{transaction.amount}</td>
                <td className='transactions-table__info'>{transaction.date}</td>
                <td className='transactions-table__info'>{transaction.time}</td>
                <td className='transactions-table__info'>{transaction.location}</td>
                <td className='transactions-table__info'>{transaction.balance}</td>
              </tr>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </table>
    </div>
  );
};

export default TransactionsTable;
