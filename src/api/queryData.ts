import request from '@/utils/request.ts'

export function monitorType() {
    return request({
        url: '/mam/measobj-types/kv',
        method: 'get'
    })
}

export function listDataType() {
    return request({
        url: '/common/datatype-enums',
        method: 'get'
    })
}

export function measObjDataGrid(data: any) {
    return request({
        url: '',
        method: 'post',
        data
    })
}

export function listMonitorData(data: any) {
    return request({
        url: '/mam/data-analysis/measobj/datagrid',
        method: 'post',
        data
    })
}


export function historyChartData(data: any) {
    return request({
        url: '/mam/data-analysis/measvalue/history/diagram',
        method: 'post',
        data
    })
}

export function historyTableData(data: any) {
    return request({
        url: `/mam/measvalue-ai/conditions`,
        method: 'post',
        data
    })
}

export function measobjDetails(id: string) {
    return request({
        url: `/mam/measobjs/${id}`,
        method: 'get'
    })
}

export function downLoadData(data: any){
    return request({
        url: '',
        method: 'post',
        data
    })
}

export function listAlarmData(data: any){
    return request({
        url: '',
        method: 'post',
        data
    })
}

export function clearAlarms(data: any){
    return request({
        url: '',
        method: 'post',
        data
    })
}

export function alarmDetail(data: any){
    return request({
        url: '',
        method: 'post',
        data
    })
}

export function listAlarmLevel(){
    return request({
        url: '',
        method: 'get'
    })
}