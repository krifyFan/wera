export interface FacilitiesEquipment {
    totalCount: number
    remainCount: number
}

export interface SmartEquipment {
    ipAddress: string
    deviceId: string
}

export interface SpecialEquipment {
    carNo: string
    periodDay: number 
    lastMaintainTime: null | Date
    nextMaintainTime: null | Date
    maintainPerson: string
    maintainPhone: string
    budget: number
}

export interface EquipmentInfo {
    id?: number
    equipmentSn: string
    equipmentName: string
    unit: string
    areaId: number
    zoneId: number
    location: string
    category: number
    type: number
    status: number
    vendors: string
    specification: string
    assetNo: string
    startTime: Date | null
    ownerPerson: string
    ownerPhone: string
    description: string
    validityTerm: number
    isSmart: number | boolean
    isSpecial: number | boolean
    isFacilities: number | boolean
    facilitiesEquipment: FacilitiesEquipment | null
    smartEquipment: SmartEquipment | null
    specialEquipment: SpecialEquipment | null
}

// export interface FacilitiesEquipment extends EquipmentInfo {
//     facilitiesEquipment?: Object
// }

// export interface SmartEquipment extends EquipmentInfo {
//     smartEquipment?: Object
// }

// export interface SpecialEquipment extends EquipmentInfo {
//     specialEquipment?: Object
// }
