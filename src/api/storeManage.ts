import request from '@/utils/request.ts'

export function addStoreInfo(data: any) {
    return request({
        url: '/common/stores',
        method: 'post',
        data
    })
}

export function addStoreInfoMulti(data: any) {
    return request({
        url: '/common/stores/batch',
        method: 'post',
        data
    })
}

export function listStoreInfoDatagrid(data: any) {
    return request({
        url: '/common/stores/datagrid',
        method: 'post',
        data
    })
}

export function listStoreInfo(data: any) {
    return request({
        url: '/common/stores/conditions',
        method: 'post',
        data
    })
}
  
export function getStoreInfoById(id: number) {
    return request({
        url: '/common/stores/' + id,
        method: 'get'
    })
}

export function editStoreInfo(data: any) {
    return request({
        url: '/common/stores',
        method: 'put',
        data
    })
}

export function deleteStore(id: number) {
    return request({
        url: '/common/stores/' + id,
        method: 'delete'
    })
}

export function deleteStoreMulti(data: any) {
    return request({
        url: '/common/stores',
        method: 'delete',
        data
    })
}

