import React, { useState } from 'react';

const AvatarUpload = ({ onUpload }) => {
  const [avatar, setAvatar] = useState(null);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= MAX_FILE_SIZE) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        onUpload(reader.result);
      };
      reader.readAsDataURL(file);
    } else if (file.size > MAX_FILE_SIZE) {
      alert('The file size exceeds the limit of 10MB.');
    } else {
      alert('Please select a valid image file.');
    }
  };

  return (
    <div className="avatar-upload">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {avatar && (
        <div className="avatar-preview">
          <img src={avatar} alt="Avatar Preview" />
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
