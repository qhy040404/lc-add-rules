import {ICON_MAP_URL} from "./consts";
import {http_get} from "./net-helper";
import * as os from "os";

export var MAP: Map<string, number> = new Map()

export async function map_init() {
    let orig_map = await http_get(ICON_MAP_URL)
    orig_map
        .split("put(-1, R.drawable.ic_sdk_placeholder)")[1]
        .split("}")[0]
        .split(os.EOL)
        .forEach((value, index, array) => {
            let p = value
                .replace("put(", "")
                .replace(")", "")
                .replace("R.drawable.ic_lib_", "")
                .split(", ")
            MAP.set(p[1], parseInt(p[0]))
        })
}

export function get_icon_res(team: string): number {
    let res = -1
    if (MAP.has(team)) {
        // @ts-ignore
        res = MAP.get(team)
    }
    return res
}
