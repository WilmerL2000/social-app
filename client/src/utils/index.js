export const BASE_URL = import.meta.env.VITE_APP_SERVER_URL;

export const fileUpload = async (file) => {
  if (!file) throw new Error('No tenemos ningun archivo a subir');
  const cloudUrl = 'https://api.cloudinary.com/v1_1/wils09/upload';

  /* This code is creating a new instance of the FormData class and appending two key-value pairs to it.
  The first key-value pair is 'upload_preset' with a value of 'react-journal', and the second
  key-value pair is 'file' with a value of the file object passed as a parameter to the function. This
  FormData object is used to send the file and its metadata to the server for uploading. */
  const formData = new FormData();
  formData.append('upload_preset', 'friendify');
  formData.append('file', file);

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if (!resp.ok) throw new Error('No se pudo subir imagen');

    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
};
