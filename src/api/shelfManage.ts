import request from '@/utils/request.ts'

export function addShelfInfo(data: any) {
    return request({
        url: '/shelf/add',
        method: 'post',
        data
    })
}

export function addShelfInfoMulti(data: any) {
    return request({
        url: '/common/shelfs/batch',
        method: 'post',
        data
    })
}

export function getShelfInfoById(id: number) {
    return request({
        url: '/shelf/' + id,
        method: 'get'
    })
}

export function editShelfInfo(data: any) {
    return request({
        url: '/shelf/edit',
        method: 'put',
        data
    })
}

export function listShelfInfoDatagrid(data: any) {
    return request({
        url: '/shelf/page',
        method: 'post',
        data
    })
}

export function listShelfInfo(data: any) {
    return request({
        url: '/shelf/list',
        method: 'post',
        data
    })
}

export function deleteShelf(id: number) {
    return request({
        url: '/shelf/' + id,
        method: 'delete'
    })
}

