import request from '@/utils/request.ts'

export function login(data: any) {
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}

export function getInfo(){
    return request({
        url: '/login/permission/' + localStorage.getItem('account'),
        method: 'get'
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}

export function getStaffInfo(id: number) {
    return request({
        url: '/staff/' + id,
        method: 'get'
    })
}

export function addStaff(data: any) {
    return request({
        url: '/staff/add',
        method: 'post',
        data: data
    })
}

export function editStaff(data: any) {
    return request({
        url: '/staff/edit',
        method: 'put',
        data: data
    })
}

export function deleteStaff(id: number) {
    return request({
        url: '/staff/' + id, 
        method: 'delete'
    })
}

export function listStaff(data: any) {
    return request({
        url: '/staff/list',
        method: 'post',
        data: data
    })
}

export function listStaffDatagrid(data: any) {
    return request({
        url: '/staff/page',
        method: 'post',
        data: data
    })
}

export function areaList() {
    return request({
        url: 'area/list',
        method: 'post'
    })
}