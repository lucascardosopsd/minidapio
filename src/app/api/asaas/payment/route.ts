import { axiosAsaas } from "@/lib/axiosAsaas";
import moment from "moment";

export const POST = async (req: Request) => {
  const body = await req.json();

  try {
    const { data } = await axiosAsaas.post("/payments", {
      billingType: body.billingType,
      customer: body.customer,
      value: body.value,
      dueDate: moment().format("YYYY-MM-DD"),
      description: "Assinatura Minidapio",
    });

    return Response.json({ ...data });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    // @ts-ignore
    return Response.json({});
  }
};
