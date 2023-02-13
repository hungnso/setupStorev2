import axios from "../axios/config";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    `/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
