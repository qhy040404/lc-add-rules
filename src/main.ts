import * as core from "@actions/core"

import * as fs from "fs-extra";

import {GIT_LOG} from "./consts";
import {db_init, db_release, exists, insert} from "./database-helper";
import {execute} from "./exec-helper";
import {get_icon_res, map_init} from "./icon-map-helper";
import {info_serialize, info_write} from "./info-helper";
import {get_type} from "./lib-type-helper";
import {serialize_path} from "./path-helper";

async function run() {
    // inputs
    let db_path = serialize_path(core.getInput("db_path"))
    let info_path = serialize_path(core.getInput("info_path"))

    // init
    await map_init()
    db_init(db_path)

    let info = info_serialize(info_path)
    let new_count = 0;

    // main
    let changelist = await execute(GIT_LOG)
    let regex = /^.*-libs\/.*\.json$/
    let list = changelist
        .filter((value, index, array) => regex.exec(value) != null)
        .filter((value, index, array) => !value.includes("regex"))

    list.forEach((value, index, array) => {
        let t = value.split("-libs/")
        let name = t[1].split(".json")[0]

        if (!exists(name)) {
            let type = get_type(t[0])
            let data = JSON.parse(fs.readFileSync(serialize_path(value), 'utf8'))
            core.info(
                `
               new id: ${insert(name, data.label, type, get_icon_res(name))}
               name:${name}
               `
            )
            new_count++
        }
    })

    info_write(info_path, info[0], info[1] + new_count)

    // exit
    db_release()
}

// noinspection JSIgnoredPromiseFromCall
run()