import { ActivityLogRecord } from "@/xata";

export type ActivityLogResponseItem = {
    id: string;
    ctaText: string;
    category: string;
    title: string;
    ctaLink: string;
    createdAt: Date;
};
