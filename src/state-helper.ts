import * as core from '@actions/core'

export const IsPost = !!core.getState('isPost')

if (!IsPost) {
    core.saveState('isPost', 'true')
}