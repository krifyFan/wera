import request from '@/utils/request.ts'

export function listDataType() {
    return request({
        url: '/measobj-type/type-enums',
        method: 'get'
    })
}

export function listAlarmTriggerEnum() {
    return request({
        url: '/alarmtrigger-enum',
        method: 'get'
    })
}

export function addMeasobjType(data: any) {
    return request({
        url: '/measobj-type/add',
        method: 'post',
        data
    })
}

export function allMeasobjType() {
    return request({
        url: '/measobj-type/list',
        method: 'post',
    })
}

export function listMeasobjType(data: any) {
    return request({
        url: '/measobj-type/page',
        method: 'post',
        data
    })
}

export function getMeasobjTypeById(id: number) {
    return request({
        url: '/measobj-type/' + id,
        method: 'get'
    })
}

export function editMeasobjType(data: any) {
    return request({
        url: '/measobj-type/edit',
        method: 'put',
        data
    })
}

export function deleteMeasobjType(id: number) {
    return request({
        url: '/measobj-type/' + id,
        method: 'delete'
    })
}

