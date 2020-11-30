import request from '@/utils/request.ts'

export function getEquipType() {
    return request({
        url: '/overview/equipment/typeCount',
        method: 'get'
    })
}

export function getEquipArea() {
    return request({
        url: '/overview/equipment/areaCount',
        method: 'get'
    })
}
export function getOverData() {
    return request({
        url: '/overview/data?projectId=1',
        method: 'get'
    })
}

export function getDefect() {
    return request({
        url: '/overview/defect?projectId=1',
        method: 'get'
    })
}

export function getAlarm() {
    return request({
        url: '/overview/alarm?projectId=1',
        method: 'get'
    })
}

export function getTask() {
    return request({
        url: '/overview/task?projectId=1',
        method: 'get'
    })
}