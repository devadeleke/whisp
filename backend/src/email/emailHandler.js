import { resendClient, Sender } from '../lib/resend.js';
import { createWelcomeEmailTemplate } from './emailTemplate.js';

export const sendWelcomeEmail = async (email, name, clientUrl) => {
    const { data, error } = await resendClient.emails.send({
        from: `${Sender.name} <${Sender.email}>`,
        to: email,
        subject: 'Welcome to whisp!',
        html: createWelcomeEmailTemplate(email, name, clientUrl),
        category: 'welcome-email'
    });

    if (error) {
        console.error('Error sending welcome email:', error);
        throw new Error('Failed to send welcome email');
    } 
    
    console.log('Welcome email sent successfully:', data);
};