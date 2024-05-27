import { axiosAsaas } from "@/lib/axiosAsaas";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    const { data } = await axiosAsaas.post(
      "https://sandbox.asaas.com/api/v3/payments",
      body
    );

    return Response.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    return Response.json({});
  }
};
