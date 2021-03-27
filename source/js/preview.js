import {PICTURES_MIME_TYPES} from './constants.js';

const DEFAULT_IMAGE_STYLES = {
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

const setImageProperties = (imageElement, altText, {objectFit, width, height}) => {
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
    setImageProperties(imageElement, file.name, DEFAULT_IMAGE_STYLES);
    readImageFileAndSetSrc(file, imageElement);
    fragment.appendChild(previewElement);
  }
  return fragment;
}

const generatePreviewElements = (fileChooser, previewsContainerElement, previewTemplate) => {
  const fragment = getPreviewsFragment(fileChooser.files, previewTemplate);
  deletePreviewElements(previewsContainerElement, previewTemplate);
  previewsContainerElement.appendChild(fragment);
}

const deletePreviewElements = (previewsContainerElement, previewTemplate) => {
  const previews = previewsContainerElement.querySelectorAll(`.${previewTemplate.className}`);
  for (let preview of previews) {
    preview.remove();
  }
}

const resetPreviewElements = (previewsContainerElement, previewTemplate) => {
  deletePreviewElements(previewsContainerElement, previewTemplate);
  previewsContainerElement.appendChild(previewTemplate.cloneNode());
}

export {setPreviewFromFileChooser, resetPreview, generatePreviewElements, resetPreviewElements};
