import request from '@/utils/request.ts'

export function getMsgList(id: number) {
    return request({
        url: 'common/message/' + id,
        method: 'get'
    })
}