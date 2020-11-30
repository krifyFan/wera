import request from '@/utils/request'

export function deleteAlarmTrigger(id: number) {
    return request({
        url: '/alarm/trigger/' + id,
        method: 'delete'
    })
}

export function addAlarmTrigger(data: any) {
    return request({
        url: '/alarm/trigger/add',
        method: 'post',
        data
    })
}

export function listAlarmTriggerDatagrid(data: any) {
    return request({
        url: '/alarm/trigger/page',
        method: 'post',
        data
    })
}

export function getAlarmTriggerInfoById(id: number) {
    return request({
        url: '/alarm/trigger/' + id,
        method: 'get'
    })
}

export function editAlarmTrigger(data: any) {
    return request({
        url: '/alarm/trigger/edit',
        method: 'put',
        data
    })
}

export function listAlarmTrigger(data: any) {
    return request({
        url: '/alarm/trigger/list',
        method: 'post',
        data
    })
}
