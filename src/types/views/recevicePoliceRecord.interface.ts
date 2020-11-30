
export interface recevicePoliceRecord{

    id?:number | null,
    title: string | null, 
    receiveTime?: Date | null | number,
    place?: string | null,
    description?: string | null,
    callerName?: string | null,
    callerPhone?: string | null,
    staffId?:number,
    recordStatus?:number,
    outerName?: string | null,
    outerPhone?: string | null,
    resultType?:number,
    resultMark?: string | null,
    dealTime?: Date | null | number,
    staffName?: string
}