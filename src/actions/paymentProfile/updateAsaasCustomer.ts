import { User } from "@prisma/client";
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

export const updateAsaasCustomer = async ({
  user,
  data,
}: {
  user: User;
  data: ProfileDataProps;
}): Promise<AsaasCustomerObj> => {
  try {
    const {
      data: { customer },
    } = await axios.put<AsaasCustomerResProps>(
      `/api/asaas/customer/${user.customerId}`,
      data
    );

    return customer;
  } catch (error) {
    throw new Error("Error when create payment account");
  }
};
