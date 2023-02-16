import {map_init} from "./icon-map-helper";
import * as core from "@actions/core"
import {IsPost} from "./state-helper";
import {db_init, db_release} from "./database-helper";
import {execute} from "./exec-helper";
import {GIT_LOG} from "./consts";

async function run() {
    // inputs
    let db_path = process.env.GITHUB_WORKSPACE + "/" + core.getInput("db_path")
    let info_path = process.env.GITHUB_WORKSPACE + "/" + core.getInput("info_path")

    // init
    await map_init()
    db_init(db_path)

    // main
    let changelist = await execute(GIT_LOG)
    let regex = /^.*-libs\/.*\.json$/
    let list = changelist.filter((value, index, array) => regex.exec(value) != null)
}

async function cleanup() {
    db_release()
}

if (!IsPost) {
    // noinspection JSIgnoredPromiseFromCall
    run()
} else {
    // noinspection JSIgnoredPromiseFromCall
    cleanup()
}