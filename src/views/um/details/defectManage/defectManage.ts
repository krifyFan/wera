import { Component, Vue } from 'vue-property-decorator'
import { Defect } from '@/types/views/patrol.interface'
import { Page } from '@/types/views/common.interface'
import { listDefectDatagrid, defectLevel, defectStatus, deleteDefect } from '@/api/defectManage'

@Component({})
export default class About extends Vue {

    conditions: any = {
        defectLevel: null,
        defectStatus: null
    }

    levelOptions: Array<{ key: number, val: string }> = []

    statusOptions: Array<{ key: number, val: string }> = []

    page: Page = {
        pageTotal: 0,
        pageSize: 10,
        pageNum: 1
    }

    defectColumns: any[] = [
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
            title: '提交人',
            key: 'staffName',
            align: 'center'
        },
        {
            title: '缺陷名称',
            key: 'defectName',
            align: 'center'
        },
        {
            title: '缺陷等级',
            key: 'defectLevelName',
            align: 'center'
        },
        {
            title: '状态',
            key: 'defectStatusName',
            align: 'center'
        },
        {
            title: '所属区域',
            align: 'left',
            render: (h: any, params: any) => {
                let temp = params.row.areaName + '——' + params.row.zoneName
                return h('div', temp)
            }
        },
        {
            title: '维修人',
            key: 'maintainPerson',
            align: 'center'
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
                                this.goToModule('缺陷详情',"Read", params.row.id)
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
                                this.goToModule('修改缺陷', "Edit", params.row.id)
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
                                this.deleteDefect(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]

    defectData: Defect[] = []

    ids: number[] = []

    mounted() {
        this.defectLevel()
        this.defectStatus()
        this.listDefectDatagrid()
    }

    defectLevel() {
        defectLevel().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.levelOptions = data
            }
        })
    }

    defectStatus() {
        defectStatus().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.statusOptions = data
            }
        })
    }

    listDefectDatagrid() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            defectLevel: this.conditions.defectLevel,
            defectStatus: this.conditions.defectStatus
        }
        listDefectDatagrid(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.defectData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    resetConditions() {
        this.conditions.defectStatus = null
        this.conditions.defectLevel = null
        this.listDefectDatagrid()
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.listDefectDatagrid()
    }

    changeSelect(selection: any[]) {
        this.ids = []
        selection.forEach(item => {
            this.ids.push(item.id)
        })
    }

    deleteBatch() {}

    deleteDefect(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: '确定要删除这条缺陷信息吗？',
            onOk: () => {
                deleteDefect(id).then(res => {
                    let { code, data, msg } = res.data
                    if (code === 200 && data !== false) {
                        this.listDefectDatagrid()
                        this.$Message.success('删除成功！')
                    } else {
                        this.$Message.error(msg)
                    }
                })
            }
        })
    }
    
}
