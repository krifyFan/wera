import request from '@/utils/request.ts'

export function listTunnelStatus() {
    return request({
        url: '/common/tunnel-status/statistics',
        method: 'get',
    })
}

export function getRunMessage() {
    return request({
        url: '/common/tunnels/run-message',
        method: 'get'
    })
}

export function getCables() {
    return request({
        url: 'oam/cable-type/cables/total',
        method: 'get'
    })
}

export function tunnelStatus() {
    return request({
        url: '/common/tunnel-status/statistics',
        method: 'get',
    })
}

export function listTunnel(){
    return request({
        url: '/common/tunnels/kv',
        method: 'get',
    })
}
export function listAreaByTunnelId(tunnelId: number){ 
    return request({
        url: '/common/tunnels/'+ tunnelId +'/areas/kv',
        method: 'post'
    })
}

export function listStore(data: any){
    return request({
        url: '/oam/common/stores',
        method: 'post',
        data
    })
}

export function listStoreKv(tunnelId: number){ 
    return request({
        url: '/common/tunnels/'+ tunnelId +'/stores/kv',
        method: 'post'
    })
}

export function allTunnel(){ 
    return request({
        url: '/common/tunnels/all',
        method: 'get'
    })
}