import request from '@/utils/request.ts'

export function planDatagrid(data: any) {
    return request({
        url: '/patrol-plan/page',
        method: 'post',
        data: data
    })
}

export function planList() {
    return request({
        url: 'patrol-plan/list',
        method: 'post'
    })
}

export function planType() {
    return request({
        url: '/patrol-plan/type-enums',
        method: 'get'
    })
}

export function planStatus() {
    return request({
        url: '/patrol-plan/status-enums',
        method: 'get'
    })
}

export function getPlanInfo(id: number) {
    return request({
        url: 'patrol-plan/' + id,
        method: 'get'
    })
}

export function deletePlan(id: number) {
    return request({
        url: 'patrol-plan/' + id,
        method: 'delete'
    })
}

export function editPlan(data: any) {
    return request({
        url: '/patrol-plan/edit',
        method: 'put',
        data: data
    })
}

export function addPlan(data: any) {
    return request({
        url: 'patrol-plan/add',
        method: 'post',
        data: data
    })
}