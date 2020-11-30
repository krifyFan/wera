import request from '@/utils/request.ts'

export function getType(id: number) {
    return request({
        url: '/equipment/type/' + id,
        method:'get'
    }) 
}

export function getStatus() {
    return request({
        url: '/equipment/status-enums',
        method:'get'
    })
}

export function getZones(data: any) {
    return request({
        url: '/zone/list',
        method: 'post',
        data: data
    })
}

export function getObjTypes() {
    return request({
        url: '/obitype/list',
        method: 'post'
    })
}

export function getCategory() {
    return request({
        url: 'equipment/category',
        method: 'get'
    })
}

export function getEquipmentInfo(id: number) {
    return request({
        url: '/equipment/' + id,
        method: 'get'
    })
}

export function addEquipment(data: any) {
    return request({
        url: '/equipment/add',
        method: 'post',
        data: data
    })
}

export function addEquipmentBatch(data: any) {
    return request({
        url: '/equipment/batch',
        method: 'post',
        data: data
    })
}

export function editEquipment(data: any) {
    return request({
        url: '/equipment/edit',
        method: 'put',
        data: data    
    })
}

export function deleteEquipment(id: number) {
    return request({
        url: '/equipment/' + id,
        method: 'delete'
    })
}

export function deleteBatch(list: any) {
    return request({
        url: '/equipment/batch',
        method: 'delete',
        data: list
    })
}

export function equipmentList() {
    return request({
        url: '/equipment/list',
        method: 'post'
    })
}

export function equipmentDatagrid(data: any) {
    return request({
        url: '/equipment/page',
        method: 'post',
        data: data
    })
}

export function specialEquipDatagrid(data: any) {
    return request({
        url: '/equipment/specialPage',
        method: 'post',
        data: data
    })
}
