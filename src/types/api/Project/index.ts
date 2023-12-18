import { ActivityLogResponseItem } from "../ActivityLog"

export type ProjectDashboardResponse = {
    message?: string,
    data?: {
        assets: {
            volume: number,
            weeklyTrend: number,
        },
        treasuryBalance: {
            volume: number,
            weeklyTrend: number,
        },
        recentActivities: Array<ActivityLogResponseItem>
    }
}

export type ProjectDashboardDetailsResponse = Required<ProjectDashboardResponse>['data']

