export const validate = (name, prior) => {
  let isError = false;
  const errors = {
    title: '',
    priority: '',
  };
  if (name === '' || !/[A-Za-z0-9\s]/.test(name)) {
    errors.title = 'Please enter valid title';
    isError = true;
  }
  if (prior === '') {
    errors.priority = 'Please enter valid priority';
    isError = true;
  }
  return {
    isError,
    errors,
  };
};

const fileTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/x-icon',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp'
];

export const validateFile = (file) => {
  let isError = false;
  const errors = {
    fileType: '',
    fileSize: '',
  };

  if (!(fileTypes.includes(file.type))) {
    errors.fileType = 'Please choose only image file';
    isError = true;
  }

  if (file.size > 204800) {
    errors.fileSize = 'Max acceptable size of file is 200 kB';
    isError = true;
  }

  return {
    isError,
    errors,
  };
};
