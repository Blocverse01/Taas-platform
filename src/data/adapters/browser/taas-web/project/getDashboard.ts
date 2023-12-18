
import { GET_PROJECT_DASHBOARD_ENDPOINT } from "@/resources/constants";
import { ProjectDashboardDetailsResponse } from "@/types/api/Project";

const getProjectDashboardDetails = async (projectId: string) => {
    const queryString = new URLSearchParams({ projectId }).toString();

    const response = await fetch(`${GET_PROJECT_DASHBOARD_ENDPOINT}?${queryString}`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) throw new Error("Fetching data failed");

    const {data} = await response.json() as {
        data: ProjectDashboardDetailsResponse
    };

    return data;
};

export { getProjectDashboardDetails };