import {AreaInfo} from './areaManage.interface'

export interface Condition {
    warehouseId: number | null,
    shelfName: string | null
}

export interface ShelfInfo {
    id?: number,
    warehouseId?: number,
    warehouse?: AreaInfo,
    shelfName?: string,
    capacity?: number,
}



