import {DEFAULT_PREVIEW_PICTURE} from './constants.js';

export const saveUserOffer = (formData) => {
  let userData = [];
  userData[0] = getOfferFromFormData(formData);
  return userData;
}

const getOfferFromFormData = (formData) => {
  let userOffer = {'author': {}, 'location': {}, 'offer': {}};

  if (formData.get('avatar').size <= 0) {
    userOffer['author']['avatar'] = DEFAULT_PREVIEW_PICTURE;
  } else {
    userOffer['author']['avatar'] = URL.createObjectURL(formData.get('avatar'));
  }

  const location = formData.get('address').split(', ');
  userOffer['location']['lat'] = location[0];
  userOffer['location']['lng'] = location[1];

  userOffer['offer']['address'] = formData.get('address');
  userOffer['offer']['checkin'] = formData.get('timein');
  userOffer['offer']['checkout'] = formData.get('timeout');
  userOffer['offer']['description'] = formData.get('description');
  userOffer['offer']['features'] = formData.getAll('features');
  userOffer['offer']['guests'] = formData.get('capacity');
  userOffer['offer']['price'] = formData.get('price');
  userOffer['offer']['rooms'] = formData.get('rooms');
  userOffer['offer']['title'] = formData.get('title');
  userOffer['offer']['type'] = formData.get('type');

  const userPhotoFiles = formData.getAll('images');
  if (userPhotoFiles[0].name !== '') {
    userOffer['offer']['photos'] = userPhotoFiles.map((file) => {
      return URL.createObjectURL(file);
    });
  }

  return userOffer;
}
