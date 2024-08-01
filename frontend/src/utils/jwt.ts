import { Buffer } from "buffer";
export const parseJwt = (token: string) => {
    try {
      const base64Payload = token.split('.')[1];
      console.log({base64Payload})
      const payload = Buffer.from(base64Payload, 'base64');
      console.log({payload});
      return JSON.parse(payload.toString());
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  };
  