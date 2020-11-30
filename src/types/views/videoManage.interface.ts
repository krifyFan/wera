import {AreaInfo} from './areaManage.interface'

export interface Condition {
    areaId: number | null,
    videoName: string | null
}

export interface VideoInfo {
    id?: number,
    areaId?: number,
    area?: AreaInfo,
    videoName?: string,
    videoUrl?: string,
}



