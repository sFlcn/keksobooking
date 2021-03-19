const isPropertyFitsFilter = (objectProperty, filterElement, unassignedFilterValue) => {
  return filterElement.value === objectProperty || filterElement.value === unassignedFilterValue;
}

const getFilteredObjects = (objectsArray, check, maxLength) => {
  const filteredArray = [];
  for (let i = 0; (i < objectsArray.length) && (filteredArray.length < maxLength); i++) {
    if (check(objectsArray[i])) {
      filteredArray.push(objectsArray[i]);
    }
  }
  return filteredArray;
}

export {isPropertyFitsFilter, getFilteredObjects};
