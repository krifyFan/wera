export interface Conditions {
    name: string | null,
    constructId: number | null,
    operationId: number | null,
    type: number | null,
    direction: number | null
}

export interface AreaInfo {
    id?: number | null,
    areaName?: string | null,
    address?: string | null,
    introduction?: string | null,
    information?: string | null,
    iconFile?: string | null,
    selectIconFile?: string | null,
    type?: number | null,
    capacity?: number | null,
    baseMapFile?: string | null,
    ownerPerson?: string | null,
    ownerPhone?: string | null,
}

export interface RuleValidate {
    areaName: any[],
    address: any[],
    introduction: any[],
    information: any[],
    iconFile: any[],
    selectIconFile: any[],
    type: any[],
    capacity: any[],
    baseMapFile: any[],
    ownerPerson: any[],
    ownerPhone: any[],
}

