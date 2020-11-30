import request from '@/utils/request.ts'

//根据id 查询
export function getRecordInfoById(id: number) {
    return request({
        url: '/police/' + id,
        method: 'get'
    })
}

//分页查询
export function listRecordPage(data: any) {
    return request({
        url: '/police/page',
        method: 'post',
        data: data
    })
}

//新增记录
export function addRecord(data: any) {
    return request({
        url: '/police/add',
        method: 'post',
        data: data
    })
}

//编辑记录
export function editRecord(data: any) {
    return request({
        url: '/police/edit',
        method: 'put',
        data: data
    })
}

//删除
export function delRecord(id: number) {
    return request({
        url: '/police/' + id,
        method: 'delete'
    })
}

//获得所有的员工
export function staffList() {
    let data:any = {}
    return request({
        url: '/staff/list',
        method: 'post',
        data: data
    })
}

