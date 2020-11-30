import request from '@/utils/request.ts'

export function visualList(data: any){
    return request({
        url: '/zone/visualList',
        method: 'post',
        data: data
    })
}