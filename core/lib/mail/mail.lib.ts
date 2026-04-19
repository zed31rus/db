import BaseLib from "#core/base/lib.base.js";
import nodemailer from "nodemailer";

interface SmtpConfig {
    user: string;
    key: string;
    host: string;
    name: string;
    email: string;
    port?: number;
}

export default class Mail extends BaseLib {
    private transporter: nodemailer.Transporter;
    private readonly from: string;

    constructor(config: SmtpConfig) {
        super();
        if (!config.user || !config.key || !config.host) {
            throw new Error('SMTP config is missing required fields');
        }

        this.from = `"${config.name}" <${config.email}>`;
        
        this.transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port || 465,
            secure: (config.port || 465) === 465,
            auth: {
                user: config.user,
                pass: config.key
            }
        });
    }

    async sendMail(to: string, subject: string, html: string, text?: string) {
        try {
            return await this.transporter.sendMail({
                from: this.from,
                to,
                subject,
                text: text || "Это письмо требует поддержки html",
                html
            });
        } catch (error) {
            console.error(`[MailService Error]: Failed to send email to ${to}`, error);
            throw error; 
        }
    }
}