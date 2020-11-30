export interface UserInfo {
    id?: number | null
    account?: string | null
    password?: string | null
    name?: string | null
    areaId?: number | null
    roleId?: number | null
}

export interface UserState {
    token?: string | null,
    name?: string | null,
    permissionList?: any,
    queueName?: string,
    userId?: number,
    msg?: string | null
}

export interface RouteInfo {
    routers: any,
    addRouters: any
}

export interface RoleInfo {
    id?: number | null
    name?: string | null
    description?: string | null
    createTime?: Date | null
    states?: number | null
}