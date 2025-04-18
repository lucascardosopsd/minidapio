"use server";
import Axios from "axios";

export const axiosStripe = Axios.create({
  headers: {
    "Authorization": `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  baseURL: "https://api.stripe.com/v1",
}); 