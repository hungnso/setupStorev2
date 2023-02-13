import axios from "../axios/config";

export const createProduct = async (product, authtoken) =>
  await axios.post(`/product`, product, {
    headers: {
      authtoken,
    },
  });

export const getProductsByLimit = async (limit) =>
  await axios.get(`/products/${limit}`);

export const getProduct = async (slug) => await axios.get(`/product/${slug}`);

export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

export const getProducts = async (sort, order, page, perPage = 4) =>
  await axios.post(`/products`, {
    sort,
    order,
    page,
    perPage,
  });

export const getProductsCount = async () => await axios.get(`/products/total`);

export const getRelated = async (productId) =>
  await axios.get(`/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`/search/filters`, arg);

export const productStar = async (productId, star, authtoken) =>
  await axios.put(
    `/product/star/${productId}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  );
