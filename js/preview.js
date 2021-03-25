import {PICTURES_MIME_TYPES} from './constants.js';

const isImage = (file) => {
  return PICTURES_MIME_TYPES.some((imageType) => {return file.type === imageType});
}

const readImageFileAndSetSrc = (file, imageElement) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
    imageElement.src = reader.result;
  });
  reader.readAsDataURL(file);
}

const setPreview = (fileChooser, previewElement) => {
  const file = fileChooser.files[0];
  if (isImage(file)) {
    readImageFileAndSetSrc(file, previewElement);
  }
}

const resetPreview = (previewElement, defaultImage = '') => {
  previewElement.src = defaultImage;
}

const generatePreviewElements = (fileChooser, previewsContainer, previewTemplate) => {
  const fragment = document.createDocumentFragment();
  for (let file of fileChooser.files) {
    const previewElement = previewTemplate.cloneNode(true);
    const imageElement = previewElement.querySelector('img');
    imageElement.style.width = '100%';
    imageElement.style.height = '100%';
    imageElement.style.objectFit = 'contain';
    imageElement.alt = file.name;
    if (isImage(file)) {
      readImageFileAndSetSrc(file, imageElement);
    }
    fragment.appendChild(previewElement);
  }
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

export {setPreview, resetPreview, generatePreviewElements, resetPreviewElements};
