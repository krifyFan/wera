import request from '@/utils/request.ts'

export function getTaskInfo(id: number) {
    return request({
        url: '/maintain-task/' + id,
        method: 'get'
    })
}

export function editTask(data:any) {
    return request({
        url: '/maintain-task/edit',
        method: 'put',
        data: data
    })
}

export function deleteTask(id:number) {
    return request({
        url: '/maintain-task/' + id,
        method: 'delete'
    })
}

export function deteleTaskBatch(data: any) {
    return request({
        url: '/maintain-task/batch',
        method: 'delete',
        data: data
    })
}

export function listTask(data:any) {
    return request({
        url: '/maintain-task/page',
        method: 'post',
        data: data
    })
}