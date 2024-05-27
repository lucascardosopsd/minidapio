import { axiosAsaas } from "@/lib/axiosAsaas";

export const GET = async (
  req: Request,
  { params }: { params: { paymentId: string } }
) => {
  try {
    const { data } = await axiosAsaas.get(
      `https://sandbox.asaas.com/api/v3/payments/${params.paymentId}/pixQrCode`
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
