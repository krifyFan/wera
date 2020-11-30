import request from '@/utils/request.ts'

export function addStoreType(data: any) {
    return request({
        url: '/common/store-types',
        method: 'post',
        data
    })
}

export function listStoreTypeDatagrid(data: any) {
    return request({
        url: '/common/store-types/datagrid',
        method: 'post',
        data
    })
}

export function listStoreType() {
    return request({
        url: '/common/store-types/conditions',
        method: 'post'
    })
}
  
export function getStoreTypeById(id: number) {
    return request({
        url: '/common/store-types/' + id,
        method: 'get'
    })
}

export function editStoreType(data: any) {
    return request({
        url: '/common/store-types/',
        method: 'put',
        data
    })
}

export function deleteStoreType(id: number) {
    return request({
        url: '/common/store-types/' + id,
        method: 'delete'
    })
}

