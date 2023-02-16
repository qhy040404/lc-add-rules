import * as fs from 'fs-extra'

export function info_serialize(path:string): number[] {
    let data = fs.readFileSync(path, 'utf8')
    let json = JSON.parse(data)
    return [json.version, json.count]
}

export function info_write(path:string, version:number, count:number) {
    let json = {
        "version": version,
        "count": count
    }
    fs.writeFileSync(path, JSON.stringify(json), 'utf8')
}