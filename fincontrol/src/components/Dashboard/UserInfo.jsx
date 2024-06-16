import React from 'react';
import useFetchUserData from '../../services/useFetchUserData';
import LogOutBtn from '../utilits/LogOutBtn';

const UserInfo = () => {
  const user = useFetchUserData();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <a href='/account' className="user-info">
      <img src={user.avatar || './default-avatar.png'} alt="Аватар пользователя" className="user-avatar" />
      <div className="user-info__body">
        <span className="user-name">{user.fullName}</span>
        <span className="user-email">{user.email}</span>
      </div>
      <LogOutBtn />
    </a>
  );
};

export default UserInfo;
