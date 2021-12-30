import {
  isDevelopment,
  isTokenValid,
  HTTP_OK,
  HTTP_UNAUTHORIZED,
} from "../../src/config";
import { secretCreationConfirmation } from "../../src/utils";

/**
 * This is the endpoint that the Slack command /secret will POST to
 * The payload to this request has the following signature
 * {
 *   "token": "JDY32wV5GJVJ9fpUQefejZeZ"
 *   "team_id": "T0001"
 *   "team_domain": "example"
 *   "channel_id": "C2147483705"
 *   "channel_name": "test"
 *   "user_id": "U2147483697"
 *   "user_name": "Silvia"
 *   "command": "/secret"
 *   "text": "lorem ipsum dolor sit amet"
 *   "response_url": "https://hooks.slack.com/commands/1234/5678"
 * }
 * Verb: POST
 */
export default async function handler(req, res) {
  const { text, token } = req.body;
  if (!isDevelopment() && !isTokenValid(token)) {
    res.status(HTTP_UNAUTHORIZED);
    res.send("Wrong Slack token: you are not allowed to use this command");
  } else {
    res.status(HTTP_OK);
    res.send(secretCreationConfirmation(text));
  }
}
