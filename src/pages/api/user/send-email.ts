import { NextApiHandler, NextApiResponse } from "next";
import { INTERNAL_SERVER_ERROR } from "@/resources/constants";
import { validateAuthInApiHandler } from "@/data/adapters/browser/auth";
import MailService from "@/resources/utils/email";
import Yup from "yup";

type ApiResponse = {
    message?: string;
    data?: boolean;
};

const mailOptionSchema = Yup.object({
    body: Yup.string().required(),
    subject: Yup.string().required(),
    to: Yup.string().required(),
    html: Yup.string().required(),
    from: Yup.string(),
})

const handler: NextApiHandler = async (req, res: NextApiResponse<ApiResponse>) => {
    try {
        await validateAuthInApiHandler(req, res);

        const mailOptions = await mailOptionSchema.validate(req.body);

        (await MailService.getTransporter()).sendMail(mailOptions, (error) => {
            if (error) {
                throw new Error("An Error occurred\nNo email sent!");
            }
        });

        res.status(200).json({ data: true });
    } catch (error: any) {
        return res
            .status(error?.status ?? error?.response?.status ?? INTERNAL_SERVER_ERROR)
            .json({ message: error.message });
    }
}

export default handler;