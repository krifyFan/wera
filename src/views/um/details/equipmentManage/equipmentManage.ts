import { Component, Vue } from 'vue-property-decorator'
import { EquipmentInfo } from '@/types/views/account.interface'
import { Page } from '@/types/views/common.interface'
import { getCategory,getType, getStatus, equipmentDatagrid, deleteEquipment, deleteBatch, addEquipmentBatch } from '@/api/equipment'

@Component({})
export default class About extends Vue {

    conditions = {
        category: null,
        type: null,
        equipmentName: null,
        equipmentSn: null,
        status: null,
        startTime: null,
        endTime: null
    }

    equipmentColumns = [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            type: 'index',
            width: '60',
            align: 'center'
        },
        {
            title: '设备编号',
            key: 'equipmentSn',
            align: 'left'
        },
        {
            title: '设备名称',
            key: 'equipmentName',
            align: 'left'
        },
        {
            title: '所属仓库',
            key: 'areaName',
            align: 'center'
        },
        {
            title: '区域编号',
            key: 'zoneName',
            align: 'center'
        },
        {
            title: '设备类型',
            key: 'typeName',
            align: 'center'
        },
        {
            title: '设备状态',
            key: 'statusName',
            align: 'center'
        },
        {
            title: '投运时间',
            key: 'startTime',
            align: 'center',
            render: (h: any, params: any)=>{
                return h('span', new Date(params.row.startTime).format('yyyy-MM-dd'))
            }
        },
        {
            title: '责任人',
            key: 'ownerPerson',
            align: 'center'
        },
        {
            title: '有效期',
            key: 'validityTerm',
            align: 'center'
        },
        {
            title: '操作',
            align: 'center',
            width: 200,
            render: (h: any, params: any) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px',
                        },
                        on: {
                            click: () => {
                                this.goToModule("Read", params.row.id)
                            }
                        }
                    }, '详情'),
                    h('Button', {
                        props: {
                            type: 'info',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px',
                        },
                        on: {
                            click: () => {
                                this.goToModule("Edit", params.row.id)
                            }
                        }
                    }, '编辑'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.deleteEquipment(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]

    equipmentData: Array<EquipmentInfo> = []

    page: Page = {
        pageTotal: 0,
        pageSize: 10,
        pageNum: 1
    }

    categorys: any[] = []

    types: any[] = []

    status: any[] = []

    ids: Array<number> = []

    mounted() {
        getCategory().then(res =>{
            let { code, data } = res.data
            if (code === 200) {
                this.categorys = data
            }
        })
        this.equipmentDatagrid()


        getStatus().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.status = data
            }
        })
        this.equipmentDatagrid()
    }

    getTypeByChange(id: number){
        getType(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.types = data
            }
        })
    }




    goToModule(type: string, id?: any) {
        this.$router.push({
            name: '添加台账',
            params: {
                type: type,
                id: id
            }
        })
    }
    // 查询
    equipmentDatagrid() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            category: this.conditions.category,
            type: this.conditions.type,
            equipmentName: this.conditions.equipmentName,
            equipmentSn: this.conditions.equipmentSn,
            status: this.conditions.status,
            startTime: this.conditions.startTime,
            endTime: this.conditions.endTime,
            areaId: Number(localStorage.getItem('areaId'))
        }
        equipmentDatagrid(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.equipmentData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.equipmentDatagrid()
    }

    handlePageSize(value: number) {
        this.page.pageSize = value
        this.equipmentDatagrid()
    }

    deleteEquipment(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: '确定要删除这条台账信息吗？',
            onOk: () => {
                deleteEquipment(id).then(res => {
                    let { code } = res.data
                    if (code === 200) {
                        this.equipmentDatagrid()
                        this.$Message.success('删除成功！')
                    } else {
                        this.$Message.error('删除失败！')
                    }
                })
            }
        })
    }

    // 重置condition
    resetConditions() {
        this.conditions.type = null
        this.conditions.equipmentName = null
        this.conditions.equipmentSn = null
        this.conditions.status = null
        this.conditions.startTime = null
        this.conditions.endTime = null
        this.equipmentDatagrid()
    }

    changeSelect(selection: any[]) {
        this.ids = []
        selection.forEach(item => {
            this.ids.push(item.id)
        })
    }
    // 批量删除
    deleteBatch() {
        if (this.ids.length === 0) {
            this.$Message.warning('请勾选所要删除的台账信息！')
        } else {
            this.$Modal.confirm({
                title: '删除',
                content: '确定要批量删除台账信息吗？',
                onOk: () => {
                    deleteBatch(this.ids).then(res => {
                        let { code } = res.data
                        if (code === 200) {
                            this.equipmentDatagrid()
                            this.$Message.success('删除成功！')
                        } else {
                            this.$Message.error('删除失败！')
                        }
                    })
                }
            })
        }
        
    }

    handleSelectedFile (convertedData: any) {
        let arr: any[] = []
        convertedData.body.map((item: any) => {
            console.log(new Date(item[convertedData.header.filter((item: any) => item.includes('startTime'))]))
            let publicTemp = {
                equipmentSn: item[convertedData.header.filter((item: any) => item.includes('equipmentSn'))],
                equipmentName: item[convertedData.header.filter((item: any) => item.includes('equipmentName'))],
                zoneId: Number(item[convertedData.header.filter((item: any) => item.includes('zoneId'))]),
                location: item[convertedData.header.filter((item: any) => item.includes('location'))],
                unit: item[convertedData.header.filter((item: any) => item.includes('unit'))],
                assetNo: item[convertedData.header.filter((item: any) => item.includes('assetNo'))],
                category: Number(item[convertedData.header.filter((item: any) => item.includes('category'))]),
                type: Number(item[convertedData.header.filter((item: any) => item.includes('type'))]),
                status: Number(item[convertedData.header.filter((item: any) => item.includes('status'))]),
                vendors: item[convertedData.header.filter((item: any) => item.includes('vendors'))],
                specification: item[convertedData.header.filter((item: any) => item.includes('specification'))],
                startTime: new Date(item[convertedData.header.filter((item: any) => item.includes('startTime'))]),
                ownerPerson: item[convertedData.header.filter((item: any) => item.includes('ownerPerson'))],
                ownerPhone: item[convertedData.header.filter((item: any) => item.includes('ownerPhone'))],
                validityTerm: Number(item[convertedData.header.filter((item: any) => item.includes('validityTerm'))]),
                description: item[convertedData.header.filter((item: any) => item.includes('description'))],
                isFacilities: Number(item[convertedData.header.filter((item: any) => item.includes('isFacilities'))]),
                isSmart: Number(item[convertedData.header.filter((item: any) => item.includes('isSmart'))]),
                isSpecial: Number(item[convertedData.header.filter((item: any) => item.includes('isSpecial'))]),
                areaId: Number(localStorage.getItem('areaId'))
            }
            let privateParams = {}
            if (Number(publicTemp.isFacilities) === 1) {
                let facilitiesParams = {
                    facilitiesEquipment: {
                        totalCount: Number(item[convertedData.header.filter((item: any) => item.includes('totalCount'))]),
                        remainCount: Number(item[convertedData.header.filter((item: any) => item.includes('remainCount'))])
                    }
                }
                privateParams = Object.assign(privateParams, facilitiesParams)
            }
            if (Number(publicTemp.isSmart) === 1) {
                let smartParams = {
                    smartEquipment: {
                        ipAddress: item[convertedData.header.filter((item: any) => item.includes('ipAddress'))],
                        deviceId: item[convertedData.header.filter((item: any) => item.includes('deviceId'))]
                    }
                }
                privateParams = Object.assign(privateParams, smartParams)
            }
            if (Number(publicTemp.isSpecial) === 1) {
                let specialParams = {
                    specialEquipment: {
                        carNo: item[convertedData.header.filter((item: any) => item.includes('carNo'))],
                        periodDay: Number(item[convertedData.header.filter((item: any) => item.includes('periodDay'))]), 
                        lastMaintainTime: new Date(item[convertedData.header.filter((item: any) => item.includes('lastMaintainTime'))]),
                        nextMaintainTime: new Date(item[convertedData.header.filter((item: any) => item.includes('nextMaintainTime'))]),
                        maintainPerson: item[convertedData.header.filter((item: any) => item.includes('maintainPerson'))],
                        maintainPhone: item[convertedData.header.filter((item: any) => item.includes('maintainPhone'))],
                        budget: Number(item[convertedData.header.filter((item: any) => item.includes('budget'))])
                    }
                }
                privateParams = Object.assign(privateParams, specialParams)
            }
            const params = Object.assign(publicTemp, privateParams)
            arr.push(params)
        })
        addEquipmentBatch(arr).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('批量导入成功！')
                this.equipmentDatagrid()
            } else {
                this.$Message.error('批量导入失败！')
            }
        })
    }
    
}
