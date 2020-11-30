import request from '@/utils/request.ts'

export function measobjDatagrid(data: any) {
    return request({
        url: '/measobj/page',
        method: 'post',
        data: data
    })
}

export function getObjType() {
    return request({
        url: '/measobjtype/list',
        method: 'post'
    })
}

export function getAreas() {
    return request({
        url: '/area/list',
        method: 'post'
    })
}

export function getHisData(data: any) {
    return request({
        url: '/measobj/history',
        method: 'post',
        data: data
    })
}