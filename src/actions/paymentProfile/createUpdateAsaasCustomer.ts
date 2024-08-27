import { updateUser } from "../user/updateUser";
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

export const createUpdateAsaasCustomer = async ({
  user,
  data,
}: {
  user: User;
  data: ProfileDataProps;
}): Promise<AsaasCustomerObj> => {
  try {
    // if customer, update info
    if (user.customerId) {
      const {
        data: { customer },
      } = await axios.put<AsaasCustomerResProps>(
        `/api/asaas/customer/${user.customerId}`,
        data
      );

      return customer;
    }

    const {
      data: { customer },
    } = await axios.post<AsaasCustomerResProps>("/api/asaas/customer", data);

    console.log(customer);

    console.log(
      await updateUser({
        id: user.id,
        data: {
          customerId: customer.id,
        },
      })
    );

    return customer;
  } catch (error) {
    throw new Error("Error when create payment account");
  }
};
