import fetch from "node-fetch";

import {
  HTTP_OK,
  HTTP_BAD_REQUEST,
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_AUTH_REDIRECT_URI,
  SLACK_OAUTH_ACCESS_URL,
} from "../../../src/config";
import { jsonToFormParams } from "../../../src/utils";

/*******************************
 * SLACK AUTHORIZATION FLOW
 */

/**
 * Redirect uri for the OAuth token authorization flow
 * Verb: GET
 */
export default async function handler(req, res) {
  const params = jsonToFormParams({
    code: req.query.code,
    client_id: SLACK_CLIENT_ID,
    client_secret: SLACK_CLIENT_SECRET,
    redirect_uri: SLACK_AUTH_REDIRECT_URI,
  });

  fetch(SLACK_OAUTH_ACCESS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        // redirect to Slack team
        res.status(HTTP_OK);
        res.redirect(`https://${data.team_name}.slack.com`);
      } else {
        res.status(HTTP_BAD_REQUEST);
        res.send(data.error);
      }
    })
    .catch((err) => {
      res.status(HTTP_BAD_REQUEST);
      res.send(err);
    });
}
