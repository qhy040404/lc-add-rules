import {http_get} from "./net-helper";

export var MAP: Map<number, string> = new Map()

export async function map_init() {
    let orig_map = await http_get(ICON_MAP_URL)
    orig_map
        .split("put(-1, R.drawable.ic_sdk_placeholder)")[1]
        .split("}")[0]
        .split("\n")
        .forEach(function (value, index, array) {
            let p = value
                .replace("put(","")
                .replace(")","")
                .replace("R.drawable.ic_lib_","")
                .split(",")
            MAP.set(parseInt(p[0]), p[1])
        })
}
