
export const getConcatenatedId = (firstPartOfId: string, secondPartOfId: string) => {
    return `${firstPartOfId}-${secondPartOfId}`
}

export const derivePageTitle = (routerPath: string, projectId: string) => {
    const projectsSplit = routerPath.split(projectId);
    const projectRouteSplit = projectsSplit[1].split("/");

    if (projectRouteSplit.length === 1) return "dashboard";

    if (projectRouteSplit.length >= 2) return projectRouteSplit[1];

    return "";
};
