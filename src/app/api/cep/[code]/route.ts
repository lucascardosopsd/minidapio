import cep from "cep-promise";

export const GET = async (
  req: Request,
  { params }: { params: { code: string } }
) => {
  try {
    const data = await cep(Number(params.code));

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
