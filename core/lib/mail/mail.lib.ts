import BaseLib from "#core/base/lib.base.js";
import { BaseArgs } from "#root/core/base/base.js";
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
    user = this.config.env.SMTP_USER;
    key = this.config.env.SMTP_API_KEY;
    host = this.config.env.SMTP_HOST;
    email = this.config.env.SMTP_EMAIL;
    port = Number(this.config.env.SMTP_PORT);
    name = "zed31rus.ru Auth Service";

    constructor(...baseArgs: BaseArgs) {

        super(...baseArgs);
        if (!this.user || !this.key || !this.host) {
            throw new Error('SMTP config is missing required fields');
        }

        this.from = `"${this.name}" <${this.email}>`;
        
        this.transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port || 465,
            secure: (this.port || 465) === 465,
            auth: {
                user: this.user,
                pass: this.key
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