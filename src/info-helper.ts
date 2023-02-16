import * as fs from 'fs-extra'

import {information} from "./json-obj";

export function info_serialize(path: string): number[] {
    let data = fs.readFileSync(path, 'utf8')
    let json:information = JSON.parse(data)
    return [json.version, json.count]
}

export function info_write(path: string, version: number, count: number) {
    let json = {
        "version": version,
        "count": count
    }
    fs.writeFileSync(path, JSON.stringify(json), 'utf8')
}