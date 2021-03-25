const isPropertyFitsFilter = (objectProperty, filterElement, unassignedFilterValue) => {
  const {value} = filterElement;
  return value === unassignedFilterValue || value === objectProperty;
}

const isNumericPropertyFitsFilter = (objectProperty, filterElement, unassignedFilterValue) => {
  const {value} = filterElement;
  return value === unassignedFilterValue || +value === objectProperty;
}

const isNumericPropertyFitsRangeFilter = (objectProperty, filterElement, rangesObject, unassignedFilterValue) => {
  const {value} = filterElement;
  return value === unassignedFilterValue ||
    objectProperty >= rangesObject[value].from && objectProperty < rangesObject[value].till;
}

const isFeaturesInProperties = (objectFeaturesArray, featuresFiltersElements) => {
  return [...featuresFiltersElements].every((feature) => {
    if (feature.checked) {
      return objectFeaturesArray.includes(feature.value);
    }
    return true;
  });
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

export {isPropertyFitsFilter, isNumericPropertyFitsFilter, isNumericPropertyFitsRangeFilter, isFeaturesInProperties, getFilteredObjects};
