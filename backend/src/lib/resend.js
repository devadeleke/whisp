import { Resend } from "resend";
import { ENV } from "./env.js";

if (!ENV.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
}

if (!ENV.EMAIL_FROM || !ENV.EMAIL_FROM_NAME) {
    throw new Error('EMAIL_FROM and EMAIL_FROM_NAME must be configured');
}

export const resendClient = new Resend(ENV.RESEND_API_KEY);

export const Sender = {
    email: ENV.EMAIL_FROM,
    name: ENV.EMAIL_FROM_NAME
};