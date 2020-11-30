export interface MeasobjType {
    id: number | null,
    // dataType: number,
    measobjTypeName: string,
    measobjTypeImage: string,
    measobjAlarmTypeTriggerDtos: any[],
    // unit: string,
    // isControl: boolean,
    // isReset: boolean,
    // nationalMin: number,
    // nationalMax: number,
    // normalMin: number,
    // normalMax: number,
    // measobjTypeCvDtos: any[]
}

export interface Conditions {
    measobjTypeName: number | null,
    // name: string | null
}

export interface MeasObj {
    name: string | null,
    id: number | null,
    objtypeId: number | string | null,
    description: string | null,
    actived: number | null,
    tunnelId: number | null,
    storeId: number | null,
    areaId: number | null,
    planIds: string | null,
    videoIds: string | null
}

export interface TableColumn {
    title: string,
    key: string,
    align?: string,
    render?: any
}

