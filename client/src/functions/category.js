import axios from "../axios/config";

export const getCategories = async () => await axios.get(`/categories`);

export const getCategory = async (slug) => await axios.get(`/category/${slug}`);

export const removeCategory = async (slug, authtoken) =>
  await axios.delete(`/category/${slug}`, {
    headers: {

      authtoken,
    },
  });

export const updateCategory = async (slug, category, authtoken) =>
  await axios.put(`/category/${slug}`, category, {
    headers: {
      authtoken,
    },
  });

export const createCategory = async (category, authtoken) =>
  await axios.post(`/category`, category, {
    headers: {
      authtoken,
    },
  });

export const getCategorySubs = async (_id) =>
  await axios.get(`/category/subs/${_id}`);
