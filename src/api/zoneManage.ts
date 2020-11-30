import request from '@/utils/request.ts'

export function addZoneInfo(data: any) {
    return request({
        url: '/zone/add',
        method: 'post',
        data
    })
}

export function addZoneInfoMulti(data: any) {
    return request({
        url: '/zone/batch',
        method: 'post',
        data
    })
}

export function getZoneInfoById(id: number) {
    return request({
        url: '/zone/' + id,
        method: 'get'
    })
}

export function editZoneInfo(data: any) {
    return request({
        url: '/zone',
        method: 'put',
        data
    })
}

export function listZoneInfoDatagrid(data: any) {
    return request({
        url: '/zone/page',
        method: 'post',
        data
    })
}

export function listZoneInfo(data: any) {
    return request({
        url: '/zone/conditions',
        method: 'post',
        data
    })
}

export function deleteZone(id: number) {
    return request({
        url: '/zone/' + id,
        method: 'delete'
    })
}

