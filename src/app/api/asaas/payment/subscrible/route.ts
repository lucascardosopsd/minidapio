import { axiosAsaas } from "@/lib/axiosAsaas";

export async function POST() {
  try {
    const { data } = await axiosAsaas.post("/subscriptions");

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
