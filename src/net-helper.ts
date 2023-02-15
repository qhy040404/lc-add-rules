import * as http from '@actions/http-client'
import * as core from '@actions/core'

const client = new http.HttpClient('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36')

export async function http_get(url:string): Promise<string> {
    const r = await client.get(
        url
    )
    if (r.message.statusCode != 200) {
        core.debug(await r.readBody())
        core.setFailed("Didn't get a 200 status code")
    }
    return r.readBody()
}