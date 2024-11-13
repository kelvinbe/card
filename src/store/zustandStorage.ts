const zustandStorage = {
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in localStorage:', error);
    }
  },

  getItem: name => {
    try {
      const value = localStorage.getItem(name);
      return value!== null? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  },

  removeItem: name => {
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
    }
  },
};

export default zustandStorage;
