import { Component, Vue } from 'vue-property-decorator'
import { Page } from '@/types/views/common.interface'
import { Patrol } from '@/types/views/patrol.interface'
import { planDatagrid, planStatus, deletePlan } from '@/api/patrolPlan'
import { listStaff } from '@/api/user'
import _ from 'lodash'

@Component({})
export default class About extends Vue {

    conditions = {
        planSn: null,
        planStatus: null,
        responsibleId: -1
    }
    searchResponsibleId: any

    page: Page = {
        pageTotal: 0,
        pageSize: 10,
        pageNum: 1
    }

    status: any[] = []

    patrolColumns = [
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
            title: '计划编号',
            key: 'planSn',
            align: 'left'
        },
        {
            title: '计划名称',
            key: 'planName',
            align: 'left'
        },
        {
            title: '责任人',
            key: 'responsible',
            align: 'left'
        },
        {
            title: '计划类型',
            key: 'planTypeName',
            align: 'left'
        },
        {
            title: '计划状态',
            key: 'planStatusName',
            align: 'left'
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
                                this.goToModule('巡检计划详情',"Read", params.row.id)
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
                                this.goToModule('修改巡检计划', "Edit", params.row.id)
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
                                this.deletePatrol(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        },
    ]

    patrolData: Patrol[] = []

    ids: Array<number> = []

    responsibleName:string = ''

    names: any[] = []

    isShow: Boolean = false
    created(){
        // 设备编号 防抖
        let self = this
        this.searchResponsibleId = _.debounce(function(){
            self.isShow = true
            let params = {
                name: self.responsibleName
            }
            listStaff(params).then(res => {
                let { code, data } = res.data
                if (code === 200) {
                    self.names = data
                }
            })
        }, 200);
    }
    mounted() {
        this.planStatus()
        this.planDatagrid()
    }

    // 分页查询
    planDatagrid() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            planSn: this.conditions.planSn,
            planStatus: this.conditions.planStatus,
            responsibleId: this.conditions.responsibleId
        }
        planDatagrid(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.patrolData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.planDatagrid()
    }

    // 计划状态
    planStatus() {
        planStatus().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.status = data
            }
        })
    }

    choosedResponsible(id: number, name: string) {
        this.conditions.responsibleId = id
        this.responsibleName = name
        this.isShow = false
    }

    changeSelect(selection: any[]) {
        this.ids = []
        selection.forEach(item => {
            this.ids.push(item.id)
        })
    }

    // 批量删除
    deleteBatch() {}

    // 删除巡检计划
    deletePatrol(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: '确定要删除这条巡检计划信息吗？',
            onOk: () => {
                deletePlan(id).then(res => {
                    let { code, data, msg } = res.data
                    if (code === 200 && data !== false) {
                        this.planDatagrid()
                        this.$Message.success('删除成功！')
                    } else {
                        this.$Message.error(msg)
                    }
                })
            }
        })
    }

    // 重置查询条件
    resetConditions() {
        this.conditions.planSn = null
        this.conditions.planStatus = null
        this.conditions.responsibleId = -1
        this.responsibleName = ''
        this.planDatagrid()
    }
    
}
