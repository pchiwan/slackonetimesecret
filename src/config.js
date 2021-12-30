export const PORT = process.env.PORT || 4000
export const ENVIRONMENT = process.env.NODE_ENV
export const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID
export const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET
export const SLACK_AUTH_REDIRECT_URI = process.env.SLACK_AUTH_REDIRECT_URI
export const SLACK_VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN

export const isDevelopment = () => {
  return ENVIRONMENT === 'development'
}

export const isTokenValid = (token) => {
  return SLACK_VERIFICATION_TOKEN === token
}

export const CREATE_SECRET_URL = 'https://onetimesecret.com/api/v1/share?secret='
export const SECRET_URL = 'https://onetimesecret.com/secret/'

export const HTTP_OK = 200
export const HTTP_BAD_REQUEST = 400
export const HTTP_UNAUTHORIZED = 401
