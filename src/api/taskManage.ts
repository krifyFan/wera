import request from '@/utils/request'

export function listTaskDatagrid(data: any) {
    return request({
        url: '/patrol-task/page',
        method: 'post',
        data: data
    })
}

export function listTask(data: any) {
    return request({
        url: '/patrol-task/list',
        method: 'post',
        data: data
    })
}

export function getTaskInfo(id: number) {
    return request({
        url: '/patrol-task/' + id,
        method: 'get'
    })
}

export function statusEnums() {
    return request({
        url: '/patrol-task/status-enums',
        method: 'get'
    })
}

export function deleteTask(id: number) {
    return request({
        url: '/patrol-task/' + id,
        method: 'delete'
    })
}

export function editTaskInfo(data: any) {
    return request({
        url: '/patrol-task/edit',
        method: 'put',
        data: data
    })
}