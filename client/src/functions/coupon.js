import axios from "../axios/config";

export const getCoupons = async () => await axios.get(`/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
  await axios.delete(`/coupon/${couponId}`, {
    headers: {
      authtoken,
    },
  });

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
