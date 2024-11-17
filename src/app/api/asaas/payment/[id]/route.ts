import { axiosAsaas } from "@/lib/axiosAsaas";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const { data } = await axiosAsaas.post(`/payments/${id}`);

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
