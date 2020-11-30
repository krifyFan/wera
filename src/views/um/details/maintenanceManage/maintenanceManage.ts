import { Component, Vue } from 'vue-property-decorator'
import { Page } from '@/types/views/common.interface'
import { recordInfo } from '@/types/views/maintenance.interface'
import { listRecord, deleteRecord, deleteRecordBatch } from '@/api/maintenanceManage'

@Component({})
export default class About extends Vue {

    conditions = {
        equipmentSn: null,
        status: null,
        isFinish: null
    }

    page: Page = {
        pageTotal: 0,
        pageSize: 10,
        pageNum: 1
    }

    status: Array<any> = [
        { key: '正常', val: 1 },
        { key: '待维修', val: 2 },
        { key: '损坏', val: 3 }
    ]

    isFinish: Array<any> = [
        { key: '否', val: 0 },
        { key: '是', val: 1 }
    ]

    ids: Array<number> = []

    maintenanceRecordColumns = [
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
            title: '维保时间',
            key: 'maintainTime',
            align: 'center',
            render: (h: any, params: any) => {
                let temp = ''
                if (params.row.maintainTime === null) {
                    temp = '未完成'
                } else {
                    temp = new Date(params.row.maintainTime).format('yyyy-MM-dd')
                }
                return h('div', temp)
            }
        },
        {
            title: '维保结果',
            key: 'status',
            align: 'center'
        },
        {
            title: '维保责任人',
            key: 'liablePerson',
            align: 'left'
        },
        {
            title: '维保厂商',
            key: 'maintainFirm',
            align: 'left'
        },
        {
            title: '维保人',
            key: 'maintainPerson',
            align: 'left'
        },
        {
            title: '维保人联系方式',
            key: 'maintainPhone',
            align: 'center'
        },
        {
            title: '是否完成',
            key: 'isFinish',
            align: 'center'
        },
        {
            title: '完成时间',
            key: 'finishTime',
            align: 'center',
            render: (h: any, params: any) => {
                let temp = ''
                if (params.row.finishTime === null) {
                    temp = '未完成'
                } else {
                    temp = new Date(params.row.finishTime).format('yyyy-MM-dd')
                }
                return h('div', temp)
            }
        },
        {
            title: '描述',
            key: 'description',
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
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.goToModule("Read", params.row.id)
                            }
                        }
                    }, '详情'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.deleteRecord(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]

    maintenanceRecordData: Array<recordInfo> = []

    mounted() {
        this.listRecord()
    }
    
    listRecord() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            equipmentSn: this.conditions.equipmentSn,
            status: this.conditions.status,
            isFinish: this.conditions.isFinish,
            areaId: Number(localStorage.getItem('areaId'))
        }
        listRecord(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.maintenanceRecordData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    goToModule(type: string, id?: any) {
        this.$router.push({
            name: '添加维保记录',
            params: {
                type: type,
                id: id,
                from: 'record'
            }
        })
    }
    // 单独删除
    deleteRecord(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: '确定要删除这条维保记录吗？',
            onOk: () => {
                deleteRecord(id).then(res => {
                    let { code } = res.data
                    if (code === 200) {
                        this.listRecord()
                        this.$Message.success('删除成功！')
                    } else {
                        this.$Message.error('删除失败！')
                    }
                })
            }
        })
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
            this.$Message.warning('请勾选所要删除的维保记录！')
        } else {
            this.$Modal.confirm({
                title: '删除',
                content: '确定要批量删除维保记录吗？',
                onOk: () => {
                    deleteRecordBatch(this.ids).then(res => {
                        let { code } = res.data
                        if (code === 200) {
                            this.listRecord()
                            this.$Message.success('删除成功！')
                        } else {
                            this.$Message.error('删除失败！')
                        }
                    })
                }
            })
        }
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.listRecord()
    }

    handlePageSize(value: number) {
        this.page.pageSize = value
        this.listRecord()
    }
    // 重置查询条件
    resetConditions() {
        this.conditions.equipmentSn = null
        this.conditions.status = null
        this.conditions.isFinish = null
        this.listRecord()
    }
    
}
