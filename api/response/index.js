import { HTTP_OK } from "../../src/config";

/**
 * I'll use this endpoint to locally test the action response workflow
 * so that instead of posting to the response_url provided by Slack I'll post here
 * Verb: POST
 */
export default async function handler(req, res) {
  console.log(`Delayed response: ${req.body.text}`);
  res.status(HTTP_OK);
  res.send();
}
