import { axiosAsaas } from "@/lib/axiosAsaas";

export const GET = async (
  req: Request,
  { params }: { params: { paymentId: string } }
) => {
  try {
    const { data } = await axiosAsaas.get(
      `/payments/${params.paymentId}/pixQrCode`
    );

    return Response.json({ ...data, status: 201 });
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
