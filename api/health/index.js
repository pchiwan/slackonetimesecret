import { HTTP_OK } from "../../src/config";

/**
 * Healthcheck
 * Verb: GET
 */
export default async function handler(_, res) {
  res.status(HTTP_OK);
  res.send(`Hello! I'm alive 👋`);
}
