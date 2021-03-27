import {PICTURES_MIME_TYPES} from './constants.js';

const DEFAULT_IMAGE_PROPERTIES = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
}

const isImage = (file) => {
  return PICTURES_MIME_TYPES.some((imageType) => {return file.type === imageType});
}

const readImageFileAndSetSrc = (file, imageElement) => {
  if (isImage(file)) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imageElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
}

const setPreviewFromFileChooser = (fileChooser, imageElement) => {
  readImageFileAndSetSrc(fileChooser.files[0], imageElement);
}

const resetPreview = (previewElement, defaultImage = '') => {
  previewElement.src = defaultImage;
}

const setImageProperties = (imageElement, altText, objectFit = DEFAULT_IMAGE_PROPERTIES.objectFit, width = DEFAULT_IMAGE_PROPERTIES.width, height = DEFAULT_IMAGE_PROPERTIES.height) => {
  imageElement.alt = altText;
  imageElement.style.objectFit = objectFit;
  imageElement.style.width = width;
  imageElement.style.height = height;
}

const getPreviewsFragment = (filesArray, previewTemplate) => {
  const fragment = document.createDocumentFragment();
  for (let file of filesArray) {
    const previewElement = previewTemplate.cloneNode(true);
    const imageElement = previewElement.querySelector('img');
    setImageProperties(imageElement, file.name);
    readImageFileAndSetSrc(file, imageElement);
    fragment.appendChild(previewElement);
  }
  return fragment;
}

const generatePreviewElements = (fileChooser, previewsContainer, previewTemplate) => {
  const fragment = getPreviewsFragment(fileChooser.files, previewTemplate);
  deletePreviewElements(previewsContainer, previewTemplate);
  previewsContainer.appendChild(fragment);
}

const deletePreviewElements = (previewsContainer, previewTemplate) => {
  const previews = previewsContainer.querySelectorAll(`.${previewTemplate.className}`);
  for (let preview of previews) {
    preview.remove();
  }
}

const resetPreviewElements = (previewsContainer, previewTemplate) => {
  deletePreviewElements(previewsContainer, previewTemplate);
  previewsContainer.appendChild(previewTemplate.cloneNode());
}

export {setPreviewFromFileChooser, resetPreview, generatePreviewElements, resetPreviewElements};
