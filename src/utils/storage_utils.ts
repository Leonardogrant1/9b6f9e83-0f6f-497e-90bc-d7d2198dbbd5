export const setLocalItem = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error: any) {
    alert(error.message);
  }
};

export const getLocalItem = (key: string) => {
  try {
    const item = window.localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  } catch (error: any) {
    alert(error.message);
  }
};
