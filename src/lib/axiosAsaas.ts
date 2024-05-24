"use server";
import Axios from "axios";

export const axiosAsaas = Axios.create({
  headers: {
    "access_token": process.env.ASAAS_API_KEY! + "==",
    "accept": "application/json",
    "Content-Type": "application/json",
  },
  baseURL: "https://sandbox.asaas.com/api/v3",
});
