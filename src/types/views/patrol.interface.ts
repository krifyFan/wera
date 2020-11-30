export interface Patrol {
    id?: number
    planSn?: number | null // 计划编号
    planName?: string | null // 计划名称
    description?: string | null  // 计划描述
    staffId?: number | null   // 申请人
    responsibleId?: number | null // 责任人
    responsible?: string | null
    planType?: number | null // 计划类型v
    execuPeriod?: string | null // 执行时间
    areaIds?: string | null
    zoneIds?: string // 巡检区
    equipmentTypeIds?: string | null // 设备大类
    startTime?: Date | null |  number // 开始时间
    endTime?: Date | null | number // 结束时间
    dayOfWeek?: string | null // 计划间隔条件,每逢周几生成任务：1,2,3,4,5
    spacing?: number[] | number | null // 计划间隔,0一次性、1~30搭配类型使用'
    planStatus?: number | null  // 计划状态 1未开始、2执行中、3已完成'
    isMerge?: boolean | null // 是否合并记录
    immedGenerate?: boolean | null
}

export interface Task {
    id?: number
    planName?: string | null
    taskName?: string | null
    responsibleId: number | null
    startTime: Date | null | number // 开始时间
    endTime: Date | null | number // 结束时间
    description: string | null  // 任务描述
    // isFinished:number  | null // 是否完成 0否/1是'
    isMerge: number | null // 是否合并记录
}

export interface Record {
    id?: number | null
    taskId: number | null
    taskName?: string| null
    staffId: number | null
    staffName: string | null
    description: string | null
    // 巡检记录类型：
    // 0 一般巡检记录、 1灭火器巡检记录、 2消防栓巡检记录、3标准库巡检记录、
    // 4自动库巡检记录、5标准库巡检记录'
    equipmentTypeId?: number | null
    equipmentTypeName?: string | null
    imgFile: string | null
    patrolResult?: number | null
    // 记录状态：1正常； 2发现缺陷'
    patrolStatus?: number | null
    patrolStatusName?: string | null
    equipmentName?: string | null
    equipmentSn?: string | null
    child?: any | null
}

// 灭火器
export interface FireExtinguisherRecord {
    id?:number
    parentId: number
    pressure: number // 压力: 0正常、1不正常'
    components: number // 部件：0齐全、1缺少'
    appearanceClean: number // 外观干净：0是、1否',
}
// 消防栓
export interface Hydrant {
    id?:number
    parentId: number
    environmentClean: number // 外观干净：0是、1否',
    boxLock: number // 箱体、按锁：0完好、1损坏'
    glassMark: number //  玻璃、标志：0完好、1损坏'
    squirtGunHoseFall: number // 水枪、水带：0正常、1脱落',
    spray: number // 喷水：0正常、1异常',
    valvesSwitches: number // 阀门、开关正常：0是、1否',
}

// 自动仓库
export interface AutoWarehouse {
    id?: number
    parentId: number
    roomTemperature: number // 配电室温度：0正常、1不正常'
    roomAleak: number // 配电室漏水：0否、1是'
    boxElectroDischarge: number // 配电柜放电：0否、1是
    switchRunning: number //开关运行：0正常、1异常
    distributionIndication: number //配电指示：0正常、1异常
    voltageCurrentBalance: number //三相电压电流平衡：0是、1否
    noAlarmFault: number //无报警故障现场：0是、1否
    cupboardDoorClosed: number //柜门关好：0是、1否
    stackerIndication: number //堆垛机指示正常：0是、1否
    roadwayObstacle:  number //巷道障碍物：0无、1有
    stackerNoise: number //堆垛机运行噪声：0无、1有
    detectionPhotoelectric: number //检测光电：0正常、1异常
    deviceVibrationNoise: number //设备震动噪声：0无、1有
    motorSmellSmoke: number //电机臭味冒烟：0无、1有
    motorTemperature: number //电机温度：0正常、1异常
    cableBreakage: number //电缆破损：0无、1有
    chainSound: number //链条声音：0正常、1异常
    lubrication: number //润滑：0良好、1不好 
    abrasionGood: number //磨损（张紧）：0正常、1异常
    dirtDeposition: number //光电积污松动：0正常、1异常
    shuttleIndication: number //穿梭车指示：0正常、1异常
    guideWheelAbrasion: number //导向轮磨损情况：0正常、1异常
    agvUsage: number //AGV使用情况：0正常、1异常    
    agvBattery: number //AGV电池：0正常、1异常
    pressureHeatDissipation: number //空压机压力及散热：0正常、1异常
}

// 缺陷
export interface Defect {
    id?: number
    taskId: number | null
    staffId: number | null
    defectName: string | null
    defectLevel: number | null // 缺陷级别(1:正常; 2:隐患；3:严重；4:危险)
    description: string | null
    areaId: number | null
    zoneId: number | null
    equipmentId: number | null
    maintainPerson: string | null // 缺陷维修人
    defectStatus: number | null // 缺陷状态（1:未处理；2:处理中; 3:处理完成）
}