import nodemailer from 'nodemailer';

export default class MailService {

    private static instance: MailService;

    private static transporter: nodemailer.Transporter | null = null;

    private constructor() { }

    private static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }

        return MailService.instance;
    }

    private static async createTransporter() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    static async getTransporter() {
        if (!this.transporter) {
            this.getInstance();
            MailService.createTransporter();
        }

        return this.transporter as nodemailer.Transporter;
    }
}