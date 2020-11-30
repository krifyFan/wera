import { Component, Vue, Watch } from 'vue-property-decorator'
import { EquipmentInfo } from '@/types/views/account.interface'
import { getType, getStatus, addEquipment, getZones, getCategory, getEquipmentInfo, editEquipment } from '@/api/equipment'
import { getNavBarItem } from '@/api/ummain.ts'

@Component({})
export default class About extends Vue {

    pageType:string = 'Read'

    pageTitle:string = '设备台账详情'

    id: number = 0

    equipmentInfo: EquipmentInfo = {
        id: -1,
        equipmentSn: '',
        equipmentName: '',
        unit: '',
        areaId: -1,
        zoneId: -1,
        location: '',
        category: -1,
        type: -1,
        status: -1,
        vendors: '',
        specification: '',
        assetNo: '',
        startTime: null,
        ownerPerson: '',
        ownerPhone: '',
        description: '',
        isSmart: 0,
        isSpecial: 0,
        isFacilities: 0,
        validityTerm: 0 ,
        // 设施
        facilitiesEquipment: {
            totalCount: 0,
            remainCount: 0
        },
        // 智能设备
        smartEquipment: {
            ipAddress: '',
            deviceId: ''
        },
        // // 特种设备
        specialEquipment: {
            carNo: '',
            periodDay: 0, 
            lastMaintainTime: null,
            nextMaintainTime: null,
            maintainPerson: '',
            maintainPhone: '',
            budget: 0,
        }
    }

    area: Array<any> = []

    zones:Array<any> = []

    types:Array<any> = []

    status:Array<any> = []

    categories: Array<any> = []

    @Watch('equipmentInfo.areaId')
    watchZone(newVal: number) {
        // 获取设备类型
        if (!!newVal) {
            let params ={
                areaId: newVal
            }
            getZones(params).then(res => {
                let { code, data } = res.data
                if (code === 200) {
                    this.zones = data
                }
            })
        }
    }

    @Watch('equipmentInfo.category')
    watchType(newVal: number) {
        // 获取设备类型
        if (!!newVal) {
            getType(newVal).then(res => {
                let { code, data } = res.data
                if (code === 200) {
                    this.types = data
                }
            })
        }
    }

    @Watch('pageType')
    watchPageType(newVal: string) {
        if (newVal === 'Read') {
            this.pageTitle = '设备台账详情'
        } else if (newVal === 'Edit') {
            this.pageTitle = '修改设备台账'
        } else {
            this.pageTitle = '添加设备台账'
        }
    }

    created() {
        this.pageType = this.$route.params.type
        if (!!this.$route.params.id) {
            this.id = Number(this.$route.params.id)
            this.getEquipmentInfo()
        }   
    }

    mounted() {
        // 获取设备状态
        getStatus().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.status = data
            }
        })
        // 获取仓库
        getNavBarItem().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.area = data
            }
        })
        // 获取所属大类
        getCategory().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.categories = data
            }
        })
        // 获取区域编号
        this.getZones()
    }
    // 添加设备台账
    addEquipment() {
        let publicParams = {
            equipmentSn: this.equipmentInfo.equipmentSn,
            equipmentName: this.equipmentInfo.equipmentName,
            unit: this.equipmentInfo.unit,
            areaId: this.equipmentInfo.areaId,
            zoneId: this.equipmentInfo.zoneId,
            location: this.equipmentInfo.location,
            category: this.equipmentInfo.category,
            type: this.equipmentInfo.type,
            status: this.equipmentInfo.status,
            vendors: this.equipmentInfo.vendors,
            specification: this.equipmentInfo.specification,
            assetNo: this.equipmentInfo.assetNo,
            startTime: new Date(this.equipmentInfo.startTime as Date).getTime(),
            ownerPerson: this.equipmentInfo.ownerPerson,
            ownerPhone: this.equipmentInfo.ownerPhone,
            description: this.equipmentInfo.description,
            validityTerm: this.equipmentInfo.validityTerm,
            isSmart: this.equipmentInfo.isSmart,
            isSpecial: this.equipmentInfo.isSpecial,
            isFacilities: this.equipmentInfo.isFacilities,
        }
        let privateParams = {}
        if (this.equipmentInfo.isSmart === 1) {
            let smartParams = {
                smartEquipment: {
                    ipAddress: (this.equipmentInfo as any).smartEquipment.ipAddress,
                    deviceId: (this.equipmentInfo as any).smartEquipment.deviceId,
                }
            }
            privateParams = Object.assign(privateParams, smartParams)
        } 

        if (this.equipmentInfo.isSpecial === 1) {
            let specialParams = {
                specialEquipment: {
                    carNo: (this.equipmentInfo as any).specialEquipment.carNo,
                    periodDay: (this.equipmentInfo as any).specialEquipment.periodDay, 
                    lastMaintainTime: (this.equipmentInfo as any).specialEquipment.lastMaintainTime,
                    nextMaintainTime: (this.equipmentInfo as any).specialEquipment.nextMaintainTime,
                    maintainPerson: (this.equipmentInfo as any).specialEquipment.maintainPerson,
                    maintainPhone: (this.equipmentInfo as any).specialEquipment.maintainPhone,
                    budget: (this.equipmentInfo as any).specialEquipment.budget
                }
            }
            privateParams = Object.assign(privateParams, specialParams)
        }

        if (this.equipmentInfo.isFacilities === 1) {
            let facilitiesParams = {
                facilitiesEquipment: {
                    totalCount: (this.equipmentInfo as any).facilitiesEquipment.totalCount,
                    remainCount: (this.equipmentInfo as any).facilitiesEquipment.remainCount
                }
            }
            privateParams = Object.assign(privateParams, facilitiesParams)
        }

        const params = Object.assign(publicParams, privateParams)

        addEquipment(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('添加成功！')
                this.$router.push({
                    name: '台账查询'
                })
            } else {
                this.$Message.error('添加失败！')
            }
        })
    }

    getEquipmentInfo() {
        getEquipmentInfo(this.id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.equipmentInfo.id = data.id
                this.equipmentInfo.equipmentSn = data.equipmentSn
                this.equipmentInfo.equipmentName = data.equipmentName
                this.equipmentInfo.unit = data.unit
                this.equipmentInfo.areaId = data.areaId
                this.equipmentInfo.zoneId = data.zoneId
                this.equipmentInfo.location = data.location
                this.equipmentInfo.category = data.category
                this.equipmentInfo.type = data.type
                this.equipmentInfo.status = data.status
                this.equipmentInfo.vendors = data.vendors
                this.equipmentInfo.specification = data.specification
                this.equipmentInfo.assetNo = data.assetNo
                this.equipmentInfo.startTime = data.startTime
                this.equipmentInfo.ownerPerson = data.ownerPerson
                this.equipmentInfo.ownerPhone = data.ownerPhone
                this.equipmentInfo.description = data.description
                this.equipmentInfo.validityTerm = data.validityTerm

                if (data.isFacilities === true) {
                    this.equipmentInfo.isFacilities = 1
                    this.equipmentInfo.facilitiesEquipment = data.facilitiesEquipment
                } else {
                    this.equipmentInfo.isFacilities = 0
                }

                if (data.isSmart === true) {
                    this.equipmentInfo.isSmart = 1
                    this.equipmentInfo.smartEquipment = data.smartEquipment
                } else {
                    this.equipmentInfo.isSmart = 0
                }

                if (data.isSpecial === true) {
                    this.equipmentInfo.isSpecial = 1
                    this.equipmentInfo.specialEquipment = data.specialEquipment
                } else {
                    this.equipmentInfo.isSpecial = 0
                }
            }
        })
    }

    editEquipment() {
        let publicParams = {
            id: this.equipmentInfo.id,
            equipmentSn: this.equipmentInfo.equipmentSn,
            equipmentName: this.equipmentInfo.equipmentName,
            unit: this.equipmentInfo.unit,
            areaId: this.equipmentInfo.areaId,
            zoneId: this.equipmentInfo.zoneId,
            location: this.equipmentInfo.location,
            category: this.equipmentInfo.category,
            type: this.equipmentInfo.type,
            status: this.equipmentInfo.status,
            vendors: this.equipmentInfo.vendors,
            specification: this.equipmentInfo.specification,
            assetNo: this.equipmentInfo.assetNo,
            startTime: new Date(this.equipmentInfo.startTime as Date).getTime(),
            ownerPerson: this.equipmentInfo.ownerPerson,
            ownerPhone: this.equipmentInfo.ownerPhone,
            description: this.equipmentInfo.description,
            validityTerm: this.equipmentInfo.validityTerm,
            isSmart: this.equipmentInfo.isSmart,
            isSpecial: this.equipmentInfo.isSpecial,
            isFacilities: this.equipmentInfo.isFacilities,
        }
        let privateParams = {}
        if (this.equipmentInfo.isSmart === 1) {
            let smartParams = {
                smartEquipment: {
                    ipAddress: (this.equipmentInfo as any).smartEquipment.ipAddress,
                    deviceId: (this.equipmentInfo as any).smartEquipment.deviceId,
                }
            }
            privateParams = Object.assign(privateParams, smartParams)
        } 

        if (this.equipmentInfo.isSpecial === 1) {
            let specialParams = {
                specialEquipment: {
                    carNo: (this.equipmentInfo as any).specialEquipment.carNo,
                    periodDay: (this.equipmentInfo as any).specialEquipment.periodDay, 
                    lastMaintainTime: (this.equipmentInfo as any).specialEquipment.lastMaintainTime,
                    nextMaintainTime: (this.equipmentInfo as any).specialEquipment.nextMaintainTime,
                    maintainPerson: (this.equipmentInfo as any).specialEquipment.maintainPerson,
                    maintainPhone: (this.equipmentInfo as any).specialEquipment.maintainPhone,
                    budget: (this.equipmentInfo as any).specialEquipment.budget
                }
            }
            privateParams = Object.assign(privateParams, specialParams)
        }

        if (this.equipmentInfo.isFacilities === 1) {
            let facilitiesParams = {
                facilitiesEquipment: {
                    totalCount: (this.equipmentInfo as any).facilitiesEquipment.totalCount,
                    remainCount: (this.equipmentInfo as any).facilitiesEquipment.remainCount
                }
            }
            privateParams = Object.assign(privateParams, facilitiesParams)
        }

        const params = Object.assign(publicParams, privateParams)

        editEquipment(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('修改成功！')
                this.$router.push({
                    name: '台账查询'
                })
            } else {
                this.$Message.error('修改失败！')
            }
        })
    }

    getZones() {
        this.zones = []
        let params = {
            areaId: Number(localStorage.getItem('areaId'))
        }
        getZones(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.zones = data
            }
        })
    }

}
