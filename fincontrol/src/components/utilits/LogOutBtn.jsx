import React from 'react';
import { handleLogout } from '../../services/logOut';
import LogOutIcon from '../../img/logout.svg';
const LogOutBtn = ({ onLogout }) => {
  const logout = () => {
    handleLogout(
      (data) => {
        console.log(data.message);
        window.location.href = '/login'; // Перенаправляем на страницу логина
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  };

  return (
    <button onClick={logout} className="logout-btn">
      <img src={LogOutIcon} alt="Logout" className="logout-btn__icon" />
    </button>
  );
};

export default LogOutBtn;
