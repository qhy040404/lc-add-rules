import * as exec from '@actions/exec'

export async function execute(cmd: string): Promise<string[]> {
    let output = ""

    const options: exec.ExecOptions = {}
    options.listeners = {
        stdout: (data: Buffer) => {
            output += data.toString();
        }
    }
    options.silent = true

    await exec.exec(cmd, undefined, options)
    return output.split("\n")
}