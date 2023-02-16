import * as core from "@actions/core"

import * as fs from "fs-extra";

import {GIT_LOG} from "./consts";
import {db_init, db_release, exists, insert} from "./database-helper";
import {execute} from "./exec-helper";
import {get_icon_res, map_init} from "./icon-map-helper";
import {info_serialize, info_write} from "./info-helper";
import {rule} from "./json-obj";
import {get_type} from "./lib-type-helper";
import {serialize_path} from "./path-helper";

async function run() {
    // inputs
    let db_path = serialize_path(core.getInput("db_path"))
    let info_path = serialize_path(core.getInput("info_path"))
    core.info(`db_path: ${db_path}`)
    core.info(`info_path: ${info_path}`)

    // init
    await map_init()
    db_init(db_path)

    let info = info_serialize(info_path)
    core.info(`info: ${info}`)
    let new_count = 0;

    // main
    let changelist = await execute(GIT_LOG)
    let regex = /^.*-libs\/.*\.json$/
    let list = changelist
        .filter((value, index, array) => regex.exec(value) != null)
        .filter((value, index, array) => !value.includes("regex"))

    core.info(`list.length: ${list.length}`)

    list.forEach((value, index, array) => {
        let t = value.split("-libs/")
        let name = t[1].split(".json")[0]

        if (!exists(name)) {
            let type = get_type(t[0])
            let data: rule = JSON.parse(fs.readFileSync(serialize_path(value), 'utf8'))
            let t_label = data.label
            let label: string
            if (t_label.includes("(")) {
                label = t_label.substring(0, t_label.lastIndexOf("("))
            } else  {
                label = t_label
            }
            core.info(`new id: ${insert(name, label, type, get_icon_res(name))}`)
            core.info(`name: ${name}`)
            new_count++
        }
    })

    core.info(new_count.toString())
    info_write(info_path, info[0], info[1] + new_count)

    // exit
    db_release()
}

// noinspection JSIgnoredPromiseFromCall
run()