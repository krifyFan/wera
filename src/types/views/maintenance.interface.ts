export interface recordInfo {
    id?: number | null
    equipmentId: number | null
    maintainTime: Date | null | number
    status: number | null
    liablePerson: string | null
    maintainPerson: string | null
    maintainFirm: string | null
    maintainPhone: number | null
    isFinish: number | null
    description: string | null
    maintainFile: string | null
    finishTime: Date | null | number
}

export interface maintainTask {
    id?: number | null
    equipmentId?: number | null
    equipmentSn: string | null
    equipmentName: string | null
    maintainTime: Date | null
    liablePerson: string | null
    liablePersonPhone: string | null
    isFinish: number | null
    finishTime: Date | null | number
}