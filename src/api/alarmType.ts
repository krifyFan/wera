import request from '@/utils/request.ts'


export function listAlarmType(data: any) {
    return request({
        url: '/alarm/listAlarmType',
        method: 'post',
        data
    })
}

