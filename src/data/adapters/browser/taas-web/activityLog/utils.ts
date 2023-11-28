
export const createActivityLogTitle = (subcategory: string, category: string, name?: string): string => {
    return `${subcategory} on ${name ? `${category} ${name}` : `${category}`}`
}