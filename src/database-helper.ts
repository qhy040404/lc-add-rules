const sqlite = require('sqlite-sync');

export function db_init(path: string) {
    sqlite.connect(path)
}

export function db_release() {
    sqlite.close()
}

export function insert(name: string, label: string, type: number, iconIndex: number): number {
    let insStr = `INSERT INTO rules_table (_id, name, label, type, iconIndex, isRegexRule, regexName) VALUES (null, ${name}, ${label}, ${type}, ${iconIndex}, 0, null)`
    return sqlite.run(insStr)
}

export function exists(name: string): boolean {
    let selectStr = `SELECT * FROM rules_table WHERE name='${name}'`
    let rows = sqlite.run(selectStr)
    return rows != null
}
