import request from '@/utils/request.ts'

export function getRole(id: number) {
    return request({
        url: '/role/' + id,
        method: 'get'
    })
}

export function addRole(data: any) {
    return request({
        url: '/role/add',
        method: 'post',
        data: data
    })
}

export function editRole(data: any) {
    return request({
        url: '/role/edit',
        method: 'put',
        data: data
    })
}

export function deleteRole(id: number) {
    return request({
        url: '/role/' + id, 
        method: 'delete'
    })
}

export function listRole() {
    return request({
        url: '/role/list',
        method: 'post'
    })
}

export function listRoleDatagrid(data: any) {
    return request({
        url: '/role/page',
        method: 'post',
        data: data
    })
}

export function getMenu() {
    return request({
        url: '/menu/info',
        method: 'get'
    })
}

export  function  submitPermission(data: any) {
    return request({
        url: '/role/permission',
        method: 'post',
        data: data
    })
}

export function checkName(name: string) {
    return request({
        url: '/role/check/' + name,
        method: 'get'
    })
}