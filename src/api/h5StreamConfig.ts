import request from '@/utils/request.ts'

export function addH5StreamConfig(data: any) {
    return request({
        url: '/mam/h5/api/addsrc',
        method: 'post',
        data
    })
}

export function downloadData() {
    return request({
        url: '/mam/h5/api/src',
        method: 'get'
    })
}

export function h5Data(data: any) {
    return request({
        url: '/mam/h5/api/src/datagrid',
        method: 'post',
        data
    })
}
/**
 * 插入上传H5配置文件
 * @param data 
 */
export function insertH5StreamConfig(data: any) {
    return request({
        url: '/mam/h5/api/add',
        method: 'post',
        data
    })
}
/**
 * 插入上传H5配置文件
 * @param data 
 */
export function insertH5StreamRTSPConfig(data: any) {
    return request({
        url: '/mam/h5/api/addrtsp',
        method: 'post',
        data
    })
}
/**
 * 获取详情
 * @param id  视屏id
 */
export function getInfo(id: string) {
    return request({
        url: `/mam/videos/${id}`,
        method: 'get',
    })
}
/**
 * 提交修改
 * @param data  修改数据
 */
export function submitEdit(data: any) {
    return request({
        url: '/mam/h5/api/update',
        method: 'put',
        data
    })
}

