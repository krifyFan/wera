import { Component, Vue } from 'vue-property-decorator'
import { Task } from '@/types/views/patrol.interface'
import { Page } from '@/types/views/common.interface'
import { listTaskDatagrid, statusEnums, deleteTask } from '@/api/taskManage'

@Component({})
export default class About extends Vue {

    conditions: any = {
        planSn: null,
        taskStatus: null
    }

    taskStatus: any[] = []

    page: Page = {
        pageTotal: 0,
        pageSize: 10,
        pageNum: 1
    }

    taskColumns: any[] = [
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
            title: '所属计划',
            align: 'left',
            render: (h: any, params: any) => {
                let temp = `${params.row.planSn} —— ${params.row.planName}`
                return h('div', temp)
            }
        },
        {
            title: '巡检人',
            key: 'responsible',
            align: 'align'
        },
        {
            title: '开始时间',
            key: 'startTime',
            align: 'center',
            render: (h: any, params: any) => {
                return h('div', new Date(params.row.startTime).format('yyyy-MM-dd hh:mm:ss'))
            }
        },
        {
            title: '结束时间',
            key: 'endTime',
            align: 'center',
            render: (h: any, params: any) => {
                return h('div', new Date(params.row.endTime).format('yyyy-MM-dd hh:mm:ss'))
            }
        },
        {
            title: '任务状态',
            key: 'taskStatusName',
            // width: 70,
            align: 'center',
            // render: (h: any, params: any) => {
            //     let temp = params.row.isFinished
            //     if (temp === 0) {
            //         temp = '否'
            //     } else {
            //         temp = '是'
            //     }
            //     return h('div', temp)
            // }
        },
        {
            title: '描述',
            key: 'description',
            align: 'left',
            render: (h: any, params: any) => {
                let str:string = ''
                if (params.row.description.length > 20) {
                    str = params.row.description.substring(0, 19) + '...'
                } else {
                    str = params.row.description
                }
                return h('div',str)
            }
        },
        {
            title: '操作',
            align: 'cenetr',
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
                                this.goToModule('巡检任务详情',"Read", params.row.id)
                            }
                        }
                    }, '详情'),
                    h('Button', {
                        props: {
                            type: 'info',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.goToModule('修改巡检任务', "Edit", params.row.id)
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
                                this.deleteTask(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]

    taskData: Task[] = []


    mounted() {
        this.statusEnums()
        this.listTaskDatagrid()
    }

    listTaskDatagrid() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            planSn: this.conditions.planSn,
            taskStatus: this.conditions.taskStatus
        }
        listTaskDatagrid(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.taskData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.listTaskDatagrid()
    }

    statusEnums() {
        statusEnums().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.taskStatus = data
            }
        })
    }

    resetConditions() {
        this.conditions.planSn = null
        this.conditions.taskStatus = null
        this.listTaskDatagrid()
    }
    
    deleteTask(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: '确定要删除这条巡检任务吗？',
            onOk: () => {
                deleteTask(id).then(res => {
                    let { code, data, msg } = res.data
                    if (code === 200 && data !== false) {
                        this.listTaskDatagrid()
                        this.$Message.success('删除成功！')
                    } else {
                        this.$Message.error(msg)
                    }
                })
            }
        })
    }
}
