import React from 'react';
import Header from '../components/Header/Header';
import AvatarUpload from '../components/AccountPage/AvatarUpload';
import { updateAvatar } from '../services/updateAvatar';

const AccountPage = () => {
  const handleUpload = async (avatar) => {
    try {
      const response = await updateAvatar(avatar);
      console.log(response.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='wrapper'>
        <Header />
        <div className='container'>
            <AvatarUpload onUpload={handleUpload} />
        </div>
    </div>
  )
}

export default AccountPage;
