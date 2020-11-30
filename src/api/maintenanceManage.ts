import request from '@/utils/request.ts'

export function addRecord(data: any) {
    return request({
        url: 'maintain-record/add',
        method: 'post',
        data: data
    })
}

export function listRecord(data: any) {
    return request({
        url: 'maintain-record/page',
        method: 'post',
        data: data
    })
}

export function getReord(id: number) {
    return request({
        url: 'maintain-record/' + id,
        method: 'get'
    })
}

export function editRecord(data: any) {
    return request({
        url: 'maintain-record/edit',
        method: 'put',
        data: data
    })
}

export function deleteRecord(id: number) {
    return request({
        url: 'maintain-record/' + id,
        method: 'delete'
    })
}

export function deleteRecordBatch(data: any) {
    return request({
        url: 'maintain-record/batch',
        method: 'delete',
        data: data
    })
}

export function queryEquipSn(data: any) {
    return request({
        url: 'equipment/listSimple',
        method: 'post',
        data: data
    })
}

export function  deleteBatch(data: any) {
    return request({
        url: '',
        method: 'post',
        data: data
    })
}