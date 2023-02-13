import axios from "../axios/config";

export const createPaymentIntent = (authtoken, coupon) =>
  axios.post(
    `/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
