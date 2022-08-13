import * as functions from "firebase-functions";

export const auth =
  functions.https.onRequest(async (request, response) => {
    try {
      const handlerModule = await import('./auth-endpoints');
      const handler = handlerModule.default;
      await handler(request, response);
    } catch (error) {
      functions.logger.error(error);
    }
  });
