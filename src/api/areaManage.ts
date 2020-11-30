import request from '@/utils/request'

export function listInCompanies() {
    return request({
        url: '/common/in-companies/conditions',
        method: 'post'
    })
}

export function listOutCompanies() {
    return request({
        url: '/common/companies/conditions',
        method: 'post'
    })
}

export function deleteArea(id: number) {
    return request({
        url: '/area/' + id,
        method: 'delete'
    })
}

export function listTunnelDirection() {
    return request({
        url: '/common/tunneldirection-enums',
        method: 'get'
    })
}

export function listAreaTypeEnums() {
    return request({
        url: '/area/type-enums',
        method: 'get'
    })
}

export function addArea(data: any) {
    return request({
        url: '/area/add',
        method: 'post',
        data
    })
}

export function listAreaDatagrid(data: any) {
    return request({
        url: '/area/page',
        method: 'post',
        data
    })
}

export function getAreaInfoById(id: number) {
    return request({
        url: '/area/' + id,
        method: 'get'
    })
}

export function editArea(data: any) {
    return request({
        url: '/area/edit',
        method: 'put',
        data
    })
}

export function listArea(data: any) {
    return request({
        url: '/area/list',
        method: 'post',
        data
    })
}
