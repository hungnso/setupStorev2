import axios from "../axios/config";

export const getSubs = async () => await axios.get(`/subs`);

export const getSub = async (slug) => await axios.get(`/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSub = async (sub, authtoken) =>
  await axios.post(`/sub`, sub, {
    headers: {
      authtoken,
    },
  });
