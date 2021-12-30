import {
  isDevelopment,
  isTokenValid,
  HTTP_OK,
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
} from "../../src/config";
import {
  secretCreationRequest,
  secretCreationResponse,
  secretCreationErrorResponse,
} from "../../src/utils";

/**
 * This is the endpoint that Slack's interactive message actions will POST to
 * The payload to this request has the following signature
 * {
 *  "actions": [
 *    {
 *      "name": "yes",
 *      "value": "lorem ipsum dolor sit amet"
 *    }
 *  ],
 *  "callback_id": "confirm_secret",
 *  "team": {
 *    "id": "T47563693",
 *    "domain": "typeform"
 *  },
 *  "channel": {
 *    "id": "C065W1189",
 *    "name": "stickbug"
 *  },
 *  "user": {
 *    "id": "U045VRZFT",
 *    "name": "pchiwan"
 *  },
 *  "action_ts": "1458170917.164398",
 *  "message_ts": "1458170866.000004",
 *  "attachment_id": "1",
 *  "token": "JDY32wV5GJVJ9fpUQefejZeZ",
 *  "response_url": "https://hooks.slack.com/actions/T47563693/6204672533/x7ZLaiVMoECAW50Gw1ZYAXEM"
 * }
 * Verb: POST
 */
export default async function handler(req, res) {
  const {
    actions,
    response_url: responseUrl,
    token,
  } = JSON.parse(req.body.payload);

  if (!isDevelopment() && !isTokenValid(token)) {
    res.status(HTTP_UNAUTHORIZED);
    res.send("Wrong Slack token: you are not allowed to use this command");
  } else {
    // reply right away to make sure the request doesn't time out
    // and keep interacting with Slack through the response URL
    res.status(HTTP_OK);
    res.send({
      delete_original: true,
      response_type: "ephemeral",
    });

    const [{ value, name }] = actions;
    if (name === "yes") {
      secretCreationRequest(value)
        .then((response) => {
          response.json().then((data) => {
            const { secret_key: secretKey } = data;
            secretCreationResponse(secretKey, responseUrl);
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(HTTP_BAD_REQUEST);
          res.send(secretCreationErrorResponse());
        });
    }
  }
}
