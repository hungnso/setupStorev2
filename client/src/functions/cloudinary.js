import axios from "../axios/config";

export const uploadImage = async (uri, authtoken) =>
  await axios.post(
    `/uploadimages`,
    { image: uri },
    {
      headers: {
        authtoken,
      },
    }
  );
export const removeImage = async (public_id, authtoken) =>
  await axios.post(
    `/removeimage`,
    { public_id },
    {
      headers: {
        authtoken,
      },
    }
  );
