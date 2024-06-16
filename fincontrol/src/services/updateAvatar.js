export const updateAvatar = async (avatar) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:3000/api/user/avatar', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar })
    });
    if (!response.ok) {
      throw new Error('Failed to update avatar');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
};
