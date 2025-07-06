import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./uploadthing/core";


export const { GET, POST } = createRouteHandler({router: ourFileRouter});
