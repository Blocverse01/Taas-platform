
export const createActivityLogTitle = (subcategory: string, category: string, name?: string): string => {
    return `${subcategory} on ${category} ${name ? category + "name" : ""}`
}