import fetch from "node-fetch";
import { URLSearchParams } from "url";

import { CREATE_SECRET_URL, SECRET_URL } from "./config";

export const secretCreationConfirmation = (secret) => {
  return {
    response_type: "ephemeral",
    text: "Please confirm you want to create a secret",
    attachments: [
      {
        text: "",
        callback_id: "confirm_secret",
        actions: [
          {
            name: "yes",
            text: "Yes",
            value: secret,
            type: "button",
            style: "primary",
          },
          {
            name: "no",
            text: "No",
            value: "no",
            type: "button",
            style: "danger",
          },
        ],
      },
    ],
  };
};

export const secretCreationRequest = (secret) => {
  return fetch(`${CREATE_SECRET_URL}${secret}`, {
    method: "POST",
  });
};

export const secretCreationResponse = (secretKey, responseUrl) => {
  fetch(responseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      delete_original: true,
      response_type: "in_channel",
      text: `${SECRET_URL}${secretKey}`,
    }),
  }).catch((err) => console.error(err));
};

export const secretCreationErrorResponse = () => {
  return {
    delete_original: true,
    response_type: "ephemeral",
    text: `Sorry! Something went wrong and I couldn't create your secret :(`,
  };
};

export const jsonToFormParams = (data) => {
  const params = new URLSearchParams();
  Object.keys(data).map((key) => params.append(key, data[key]));
  return params;
};
