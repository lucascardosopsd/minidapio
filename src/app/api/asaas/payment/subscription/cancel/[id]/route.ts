import { axiosAsaas } from "@/lib/axiosAsaas";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data } = await axiosAsaas.delete(`/subscriptions/${params.id}`);

    return Response.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    return Response.json({});
  }
}
