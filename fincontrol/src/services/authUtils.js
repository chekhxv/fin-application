export const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/protected', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return false;
    }
  };
  