"use server";
import Axios from "axios";

export const axiosAsaas = Axios.create({
  headers: {
    "access_token": process.env.ASAAS_API_KEY! + "==",
    "accept": "application/json",
    "Content-Type": "application/json",
  },
  baseURL: process.env.ASAAS_BASE_URL!,
});
