import {AreaInfo} from './areaManage.interface'

export interface Condition {
    areaId: number | null,
    zoneName: string | null
}

export interface ZoneInfo {
    id?: number,
    zoneId?: number | null,
    area?: AreaInfo | null,
    zoneName?: string | null,
}



