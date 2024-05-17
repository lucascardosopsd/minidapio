import { createRouteHandler } from "uploadthing/next";

import { uploadThingCore } from "./core";

export const { GET, POST } = createRouteHandler({
  router: uploadThingCore,
});
