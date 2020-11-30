import request from '@/utils/request'

export function getBriefIntro() {
    return request({
        url: '/area/1',
        method: 'get'
    })
}

export function getStoreProportion() {
    return request({
        url: '/shelf/typeCount/1',
        method: 'get'
    })
}

export function getVideo() {
    return request({
        url: 'video/1',
        method: 'get'
    })
}

export function getDataOvervide(id: number) {
    return request({
        url: '/area/overview?areaId='+id,
        method: 'get'
    })
}