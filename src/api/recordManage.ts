import request from '@/utils/request.ts'

export function recordStatus() {
    return request({
        url: '/patrol-record/status-enums',
        method: 'get'
    })
}

export function listRecordDatagrid(data: any) {
    return request({
        url: '/patrol-record/page',
        method: 'post',
        data: data
    })
}

export function getRecordInfo(id: number) {
    return request({
        url: '/patrol-record/' + id,
        method: 'get'
    })
}

export function editRecord(data: any) {
    return request({
        url: '/patrol-record/edit',
        method: 'put',
        data: data
    })
}

export function recordResult() {
    return request({
        url: '/patrol-record/result-enums',
        method: 'get'
    })
}

