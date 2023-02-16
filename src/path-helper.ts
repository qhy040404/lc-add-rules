export function serialize_path(path: string): string {
    return process.env.GITHUB_WORKSPACE + "/" + path
}