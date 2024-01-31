const isExcist = (arr, itemName) => {
  const isInList = arr.filter((item) => item.name === itemName).length > 0;
  return isInList;
};

export default isExcist;
