import request from '@/utils/request'

export function listInCompanies() {
    return request({
        url: '/common/in-companies/conditions',
        method: 'post'
    })
}

export function listOutCompanies() {
    return request({
        url: '/common/companies/conditions',
        method: 'post'
    })
}

export function deleteTunnel(id: number) {
    return request({
        url: '/common/tunnels/' + id,
        method: 'delete'

    })
}

export function listTunnelDirection() {
    return request({
        url: '/common/tunneldirection-enums',
        method: 'get'
    })
}

export function addTunnelInfo(data: any) {
    return request({
        url: '/common/tunnels',
        method: 'post',
        data
    })
}

export function listTunnelInfoDatagrid(data: any) {
    return request({
        url: '/common/tunnels/datagrid',
        method: 'post',
        data
    })
}

export function getTunnelInfoById(id: number) {
    return request({
        url: '/common/tunnels/' + id,
        method: 'get'
    })
}

export function editTunnelInfo(data: any) {
    return request({
        url: '/common/tunnels',
        method: 'put',
        data
    })
}

export function listTunnelInfo(data: any) {
    return request({
        url: '/common/tunnels/conditions',
        method: 'post',
        data
    })
}

export function getflyRouteList(id: any) {
	return request({
		url: `common/vm-tunnel/tunnels/${id}/flies`,
        method: 'get'
	})
}

export function getAutoCal(id: number) {
    return request({
        url: '/common/tunnels/' + id + '/auto-cal-area-section'
    })
}
