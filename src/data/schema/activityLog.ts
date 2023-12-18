import * as Yup from "yup";

const activityLogSchema = Yup.object({
    ctaLink: Yup.string().required(),
    ctaText: Yup.string().required(),    
    title: Yup.string().required(),
    createdAt: Yup.date().required(),
    id: Yup.string().required(),
    category: Yup.string().required()
});

const arrayOfActivityLogsSchema = Yup.array().of(activityLogSchema).required();

type ActivityLog = Yup.InferType<typeof activityLogSchema>;

export {activityLogSchema, arrayOfActivityLogsSchema, type ActivityLog};