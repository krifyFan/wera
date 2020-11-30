import request from '@/utils/request.ts'

export function listDefectDatagrid(data: any) {
    return request({
        url: '/defect/page',
        method: 'post',
        data: data
    })
}

export function getDefectInfo(id: number) {
    return request({
        url: '/defect/' + id,
        method: 'get'
    })
}

export function editDefect(data: any) {
    return request({
        url: '/defect/edit',
        method: 'put',
        data: data
    })
}

export function deleteDefect(id: number) {
    return request({
        url: '/defect/' + id,
        method: 'delete'
    })
}

export function addDefect(data: any) {
    return request({
        url: '/defect/add',
        method: 'post',
        data: data
    })
}

export function defectLevel() {
    return request({
        url: '/defect/level-enums',
        method: 'get'
    })
}

export function defectStatus() {
    return request({
        url: '/defect/status-enums',
        method: 'get'
    })
}