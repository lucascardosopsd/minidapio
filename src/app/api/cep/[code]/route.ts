import cep from "cep-promise";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ code: string }> }
) => {
  try {
    const { code } = await params;
    const data = await cep(Number(code));

    return Response.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }

    // @ts-ignore
    return Response.json({ error: error.response.data, status: 500 });
  }
};
