export function get_type(name: string): number {
    switch (name) {
        case "native":
            return 0
        case "services" :
            return 1
        case "activities":
            return 2
        case "receivers":
            return 3
        case "providers":
            return 4
        case "static":
            return 6
        default:
            throw Error("Unexpected type")
    }
}