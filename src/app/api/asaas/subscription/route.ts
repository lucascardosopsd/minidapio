import { axiosAsaas } from "@/lib/axiosAsaas";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data } = await axiosAsaas.post("/subscriptions", body);

    return Response.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
    } else {
      console.log("An unknown error occurred");
    }

    // @ts-ignore
    return Response.json({ error: error.response.data, status: 500 });
  }
}
