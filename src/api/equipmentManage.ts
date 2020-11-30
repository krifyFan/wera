import request from '@/utils/request.ts'

// 设备model、查询
export function listEquipModel() {
    return request({
        url: '/equipment/equipmentType/list',
        method: 'get'
    })
}

// 设备类型/设备型号查询
export function getModelCascadesInfo(id: number) {
    return request({
        url: `/equipment/equipmentType/${id}`,
        method: 'get'
    })
}

// 新增 设备类型/设备型号
export function addModelCascade(data: any) {
    return request({
        url: '/equipment/equipmentType/add',
        method: 'post',
        data
    })
}

// 修改设备类型/设备型号
export function editModelCascade(data: any) {
    return request({
        url: '/equipment/equipmentType/edit',
        method: 'put',
        data
    })
}

// 删除设备类型/设备型号
export function delModelCascade(id: number) {
    return request({
        url: `/equipment/equipmentType/${id}`,
        method: 'delete'
    })
}

// 设备type 查询
export function listEquipType() {
    return request({
        url: '/equipment/equipmentCategory/list',
        method: 'get'
    })
}

// 设备类型/设备型号查询
export function getCascadesInfo(id: number) {
    return request({
        url: `/equipment/equipmentCategory/${id}`,
        method: 'get'
    })
}

// 新增 设备类型/设备型号
export function addCascade(data: any) {
    return request({
        url: '/equipment/equipmentCategory/add',
        method: 'post',
        data
    })
}

// 修改设备类型/设备型号
export function editCascade(data: any) {
    return request({
        url: '/equipment/equipmentCategory/edit',
        method: 'put',
        data
    })
}

// 删除设备类型/设备型号
export function delCascade(id: number) {
    return request({
        url: `/equipment/equipmentCategory/${id}`,
        method: 'delete'
    })
}

// 模糊查询所有设备
export function searchEquipment(data: any) {
    return request({
        url: '/omm/equipments/simpleDataGrid',
        method: 'post',
        data
    })
}

export function getEquipStatistic() {
    return request({
        url: '/omm/equipments/defect-type',
        method: 'get'
    })
}

export function getEquipNumberStatistic() {
    return request({
        url: '/mam/measobjs/equipmentcount',
        method: 'get'
    })
}
