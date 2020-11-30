import request from '@/utils/request.ts'

export function getNavBarItem() {
    return request({
        url: '/area/list',
        method: 'post'
    })
}