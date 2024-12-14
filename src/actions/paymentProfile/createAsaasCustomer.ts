import { AsaasCustomerObj, AsaasCustomerResProps } from "@/types/asaasCustomer";
import axios from "axios";

interface ProfileDataProps {
  name: string;
  email: string;
  cpfCnpj: string;
  postalCode: string;
  addressNumber: string;
  addressComplement: string | null;
  mobilePhone: string;
  address: string;
}

export const createAsaasCustomer = async ({
  data,
}: {
  data: ProfileDataProps;
}): Promise<AsaasCustomerObj> => {
  try {
    const {
      data: { customer },
    } = await axios.post<AsaasCustomerResProps>("/api/asaas/customer", data);

    return customer;
  } catch (error) {
    throw new Error("Error when create payment account");
  }
};
