import request from '@/utils/request.ts'

export function getAlarmById(id: number) {
    return request({
        url: '/alarm/' + id,
        method: 'get'
    })
}

export function listAlarmDatagrid(data: any) {
    return request({
        url: '/alarm/page',
        method: 'post',
        data: data
    })
}

export function editAlarm(data: any) {
    return request({
        url: '/alarm/edit',
        method: 'put',
        data: data
    })
}

export function getAlramCount() {
    return request({
        url: '/alarm/noClear',
        method: 'get'
    })
}

//人工清除告警
export function clearAlram(id: number) {
    return request({
        url: '/alarm/clear/' + id,
        method: 'put'
    })
}

//人工确认告警
export function ackedAlram(data: any) {
    return request({
        url: '/alarm/acked',
        method: 'put',
        data: data
    })
}