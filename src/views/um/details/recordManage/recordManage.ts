import { Component, Vue } from 'vue-property-decorator'
import { Record } from '@/types/views/patrol.interface'
import { Page } from '@/types/views/common.interface'
import { listRecordDatagrid, recordStatus } from '@/api/recordManage'
import _ from 'lodash'
import { listTask } from '@/api/taskManage'

@Component({})
export default class About extends Vue {

    conditions: any = {
        taskId: null,
        status: null
    }

    page: Page = {
        pageTotal: 0,
        pageSize: 10,
        pageNum: 1
    }

    status: any[] = []

    tasks: any[] = []
    isShow: boolean = false
    searchTask?: any
    taskName: string = ''

    recordColumns: any[] = [
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
            title: '设备SN',
            key: 'equipmentSn',
            align: 'center'
        },
        {
            title: '设备名称',
            key: 'equipmentName',
            align: 'center'
        },
        {
            title: '所属任务',
            key: 'taskName',
            align: 'center'
        },
        {
            title: '记录人',
            key: 'staffName',
            align: 'center'
        },
        {
            title: '状态',
            key: 'patrolStatusName',
            align: 'center'
        },
        {
            title: '类型',
            key: 'equipmentTypeName',
            align: 'center'
        },
        {
            title: '操作',
            align: 'center',
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
                                this.goToModule('巡检记录详情',"Read", params.row.id)
                            }
                        }
                    }, '详情'),
                    h('Button', {
                        props: {
                            type: 'info',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.goToModule('修改巡检记录', "Edit", params.row.id)
                            }
                        }
                    }, '编辑')
                ])
            }
        }
    ]

    recordData: Record[] = []

    mounted() {
        this.listRecordDatagrid()
        this.recordStatus()
        // 搜索责任人 防抖
        let self = this
        this.searchTask = _.debounce(function(){
            self.isShow = true
            let params = {
                taskName: self.taskName
            }
            listTask(params).then(res => {
                let { code, data } = res.data
                if (code === 200) {
                    self.tasks = data
                }
            })
        }, 200)
    }

    listRecordDatagrid() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            taskId: this.conditions.taskId,
            patrolStatus: this.conditions.status
        }
        listRecordDatagrid(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.recordData = data.list
                this.page.pageTotal = data.total
            }
        })
    }


    handlePage(value: number) {
        this.page.pageNum = value
        this.listRecordDatagrid()
    }

    changeSelect(selection: any[]) {
        this.ids = []
        selection.forEach(item => {
            this.ids.push(item.id)
        })
    }

    recordStatus() {
        recordStatus().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.status = data
            }
        })
    }

    choosedTaskName(id: number, name: string) {
        this.conditions.taskId = id
        this.taskName = name
        this.isShow = false
    }

    resetConditions() {
        this.conditions.status = null
        this.conditions.taskId = null
        this.taskName = ''
        this.listRecordDatagrid()
    }
    
}
 