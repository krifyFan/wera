import { Component, Vue } from 'vue-property-decorator'
import { Page } from '@/types/views/common.interface'
import { maintainTask } from '@/types/views/maintenance.interface'
import { listTask, deteleTaskBatch, deleteTask } from '@/api/maintainTask'

@Component({})
export default class About extends Vue {

    conditions = {
        equipmentSn: null,
        liablePerson: null,
        isFinish: null
    }

    isFinish: Array<any> = [
        { key: '否', val: 0 },
        { key: '是', val: 1 }
    ]

    maintainTaskColumns = [
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
            align: 'center'
        },
        {
            title: '设备名称',
            key: 'equipmentName',
            align: 'center'
        },
        {
            title: '维保时间',
            key: 'maintainTime',
            align: 'cenetr',
            render: (h: any, params: any) => {
                return h('div', new Date(params.row.maintainTime).format('yyyy-MM-dd'))
            }
        },
        {
            title: '责任人',
            key: 'liablePerson',
            align: 'center'
        },
        {
            title: '联系方式',
            key: 'liablePersonPhone',
            align: 'center'
        },
        {
            title: '是否完成',
            key: 'isFinish',
            align: 'center',
            render: (h: any, params: any) => {
                let temp = ''
                if (params.row.isFinish === true) {
                    temp = '是'
                } else {
                    temp = '否'
                }
                return h('div', temp)
            }
        },
        {
            title: '完成时间',
            key: 'finishTime',
            align: 'center',
            render: (h: any, params: any) => {
                let temp = params.row.finishTime
                if (temp===null) {
                    temp = '任务未完成'
                } else {
                    temp = new Date(params.row.finishTime).format('yyyy-MM-dd')
                }
                return h('div', temp)
            }
        },
        {
            title: '操作',
            align: 'center',
            width: 200,
            render: (h: any, params: any) => {
                if (params.row.isFinish === true) {
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
                        }, '查看维保记录')
                    ])
                } else {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'info',
                                size: 'small',
                                show: 'false',
                            },
                            on: {
                                click: () => {
                                    this.goToModule("Edit", params.row.id)
                                }
                            }
                        }, '完成任务')
                    ])
                }
            }
        }
    ]

    maintainTaskData: maintainTask[] = []

    page: Page = {
        pageTotal: 0,
        pageSize: 10,
        pageNum: 1
    }

    ids: Array<number> = []

    // tableH: @tableHeight

    mounted() {
        this.listTask()
    }

    listTask() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            equipmentSn: this.conditions.equipmentSn,
            liablePerson: this.conditions.liablePerson,
            isFinish: this.conditions.isFinish,
            areaId: Number(localStorage.getItem('areaId'))
        }
        listTask(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.maintainTaskData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.listTask()
    }

    handlePageSize(value: number) {
        this.page.pageSize = value
        this.listTask()
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
                    deteleTaskBatch(this.ids).then(res => {
                        let { code } = res.data
                        if (code === 200) {
                            this.listTask()
                            this.$Message.success('删除成功！')
                        } else {
                            this.$Message.error('删除失败！')
                        }
                    })
                }
            })
        }
    }

    goToModule(type: string, id?: any) {
        this.$router.push({
            name: '添加维保记录',
            params: {
                type: type,
                id: id,
                from: 'task'
            }
        })
    }
    // 单独删除
    deleteTask(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: '确定要删除这条维保任务吗？',
            onOk: () => {
                deleteTask(id).then(res => {
                    let { code } = res.data
                    if (code === 200) {
                        this.listTask()
                        this.$Message.success('删除成功！')
                    } else {
                        this.$Message.error('删除失败！')
                    }
                })
            }
        })
    }
    resetConditions() {
        this.conditions.equipmentSn = null
        this.conditions.liablePerson = null
        this.conditions.isFinish = null
        this.listTask()
    }
    
}

