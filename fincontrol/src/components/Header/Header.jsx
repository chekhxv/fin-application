import React from 'react';
import '../../styles/Header.scss';
import Logo from '../../img/logo.svg';
import ActionButton from '../Dashboard/ActionButton';
import UserInfo from '../Dashboard/UserInfo';

export default function Header() {
  return (
    <header className="header">
        <nav className='header__navigation'>
            <ul className="menu-list menu-list__left">
                <li className='menu-list__item'>
                    <a className='header__navigation-link' href="/dashboard" title='Финансы'>
                      <img className='header__navigation-logo' src={Logo} alt="Logo" />
                    </a>
                </li>
                <ActionButton className='header__navigation-btn' />
            </ul>
            <ul className='menu-list menu-list__center '>
                <li className="menu-list__item">
                    <a href="/dashboard" title="Финансы" className="menu-list__link">
                        Финансы
                    </a>
                </li>
                <div className="menu-list__item">
                    <a href="/goals" title="Финансы" className="menu-list__link">
                        Цели
                    </a>
                </div>
            </ul>
            <UserInfo />
        </nav>
    </header>
  )
}
