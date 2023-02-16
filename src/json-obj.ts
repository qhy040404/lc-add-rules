export interface information {
    version:number,
    count:number
}

export interface rule {
    label: string,
    team: string,
    iconUrl: string,
    contributors: string[],
    description: string,
    relativeUrl: string
}