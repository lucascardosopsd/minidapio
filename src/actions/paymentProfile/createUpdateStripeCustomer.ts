import { updateUser } from "../user/updateUser";
import { User } from "@prisma/client";
import { StripeCustomer } from "@/types/stripe";
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

export const createUpdateStripeCustomer = async ({
  user,
  data,
}: {
  user: User;
  data: ProfileDataProps;
}): Promise<StripeCustomer> => {
  try {
    // if customer, update info
    if (user.customerId) {
      const {
        data: { customer },
      } = await axios.put(
        `/api/stripe/customer/${user.customerId}`,
        data
      );

      return customer;
    }

    const {
      data: { customer },
    } = await axios.post("/api/stripe/customer", data);

    console.log(customer);

    await updateUser({
      id: user.id,
      data: {
        customerId: customer.id,
      },
    });

    return customer;
  } catch (error) {
    throw new Error("Error when create payment account");
  }
}; 