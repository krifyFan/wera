import request from '@/utils/request.ts'

export function measObjDataGrid(data: any) {
    return request({
        url: '/measobj/page',
        method: 'post',
        data
    })
}

export function updateMeasObjsActived(data: any) {
    return request({
        url: '/mam/measobjs/actived',
        method: 'put',
        data
    })
}

export function batchPostMeasObjs(data: any) {
    return request({
        url: '/mam/measobjs/batch',
        method: 'post',
        data
    })
}

export function batchUpdateMeasObjs(data: any) {
    return request({
        url: '/mam/measobjs/batch',
        method: 'put',
        data
    })
}

export function batchDeleteMeasObjs(data: any) {
    return request({
        url: '/mam/measobjs/batch',
        method: 'delete',
        data
    })
}

export function planTypes() {
    return request({
        url: '/plan-enums',
        method: 'get'
    })
}

export function addMeasObj(data: any) {
    return request({
        url: '/measobj/add',
        method: 'post',
        data
    })
}

export function updateMeasObj(data: any) {
    return request({
        url: '/measobj/edit',
        method: 'put',
        data
    })
}

export function getSectionVideos(storeId: number, areaId: number) {
    return request({
        url: 'measobjs/' + storeId + '/' + areaId + '/videos',
        method: 'get'
    })
}

export function getObjById(id: number) {
    return request({
        url: '/measobj/' + id,
        method: 'get'
    })
}

export function getTunnelParam() {
    return request({
        url: '/common/commons/type?type=12',
        method: 'get'
    })
}

export function getEquParam() {
    return request({
        url: '/mam/measobj-type-sns/conditions',
        method: 'post'
    })
}

export function checkObjId(id: number){
    return request({
        url: `/measobj/${id}/ajax`,
        method: 'get'
    })
}

export function getAllMeasObjs(){
    return request({
        url: `/mam/measobjs`,
        method: 'get'
    })
}





