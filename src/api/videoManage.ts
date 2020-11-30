import request from '@/utils/request.ts'

export function addVideoInfo(data: any) {
    return request({
        url: '/video/add',
        method: 'post',
        data
    })
}

export function addVideoInfoMulti(data: any) {
    return request({
        url: '/video/batch',
        method: 'post',
        data
    })
}

export function getVideoInfoById(id: number) {
    return request({
        url: '/video/' + id,
        method: 'get'
    })
}

export function editVideoInfo(data: any) {
    return request({
        url: '/video/edit',
        method: 'put',
        data
    })
}

export function listVideoInfoDatagrid(data: any) {
    return request({
        url: '/video/page',
        method: 'post',
        data
    })
}

export function deleteVideo(id: number) {
    return request({
        url: '/video/' + id,
        method: 'delete'
    })
}

