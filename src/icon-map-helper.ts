import {ICON_MAP_URL} from "./consts";
import {http_get} from "./net-helper";

export var MAP: Map<string, number> = new Map()

export async function map_init() {
    let orig_map = await http_get(ICON_MAP_URL)
    orig_map
        .split("put(-1, R.drawable.ic_sdk_placeholder)")[1]
        .split("}")[0]
        .split("\n")
        .forEach((value, index, array) => {
            let p = value
                .replace("put(", "")
                .replace(")", "")
                .replace("R.drawable.ic_lib_", "")
                .split(",")
            MAP.set(p[1], parseInt(p[0]))
        })
}

export function get_icon_res(name: string): number {
    name.split(".").forEach((value, index, array) => {
        if (MAP.has(value)) return MAP.get(value)
    })
    return -1
}
