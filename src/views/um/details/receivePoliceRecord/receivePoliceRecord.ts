import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    Page
} from '@/types/views/common.interface'
import {
    recevicePoliceRecord
} from '@/types/views/recevicePoliceRecord.interface'
import {
    getRecordInfoById,
    listRecordPage,
    addRecord,
    editRecord,
    delRecord,
    staffList
} from '@/api/receivePoliceRecord'
import alarmAccessModal from '@/components/common/alarmAccessModal.vue'
import _ from 'lodash'
import {
    listStaff
} from '@/api/user'

@Component({
    components: {
        alarmAccessModal
    }
})
export default class About extends Vue {

    recevicePoliceRecordColumns = [{
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
            title: '记录名称',
            key: 'title',
            align: 'center'
        },
        {
            title: '报警时间',
            key: 'receiveTime',
            align: 'center',
            render: (h: any, params: any) => {
                return h('div', new Date(params.row.receiveTime).format('yyyy-MM-dd hh:mm:ss'))
            }
        },
        {
            title: '地点',
            key: 'place',
            align: 'cenetr'
        },
        {
            title: '报警人',
            key: 'callerName',
            align: 'center'
        },
        {
            title: '报警人联系方式',
            key: 'callerPhone',
            align: 'center'
        },
        {
            title: '是否处理',
            key: 'recordStatus',
            align: 'center',
            render: (h: any, params: any) => {
                let temp = ''
                if (params.row.recordStatus === 0) {
                    temp = '未处理'
                } else if (params.row.recordStatus === 1) {
                    temp = '处理中'
                } else {
                    temp = '已处理'
                }
                return h('div', temp)
            }
        },
        {
            title: '完成时间',
            key: 'dealTime',
            align: 'center',
            render: (h: any, params: any) => {
                let temp = params.row.dealTime
                if (temp === null) {
                    temp = '-'
                } else {
                    temp = new Date(params.row.dealTime).format('yyyy-MM-dd hh:mm:ss')
                }
                return h('div', temp)
            }
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
                            size: 'small',
                        },
                        on: {
                            click: () => {
                                // this.showInfoMoudle(params.row.id)
                                this.showModule(params.row.id, 'Read')
                            }
                        }
                    }, '详情'),
                    h('Button', {
                        props: {
                            type: 'info',
                            size: 'small',
                        },
                        style: {
                            marginLeft: '10px',
                        },
                        on: {
                            click: () => {
                                // this.editModule(params.row.id)
                                this.showModule(params.row.id, 'Edit')
                            }
                        }
                    }, '编辑'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small',
                        },
                        style: {
                            marginLeft: '10px',
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

    recevicePoliceRecordData: recevicePoliceRecord[] = []

    recordInfo: recevicePoliceRecord = {
        id: null,
        title: '',
        receiveTime: null,
        place: '',
        description: '',
        callerName: '',
        callerPhone: '',
        staffId: 0,
        recordStatus: 0,
        outerName: '',
        outerPhone: '',
        resultType: 0,
        resultMark: '',
        dealTime: null
    }

    recordForm: recevicePoliceRecord = {
        id: null,
        title: '',
        receiveTime: null,
        place: '',
        description: '',
        callerName: null,
        callerPhone: null,
        staffId: -1
    }

    page: Page = {
        pageTotal: 0,
        pageSize: 10,
        pageNum: 1
    }

    conditions: any = {
        recordStatus: null,
        startTime: null,
        endTime: null
    }
    ids: Array < number > = []
    isAddShow: boolean = false
    isInfoShow: boolean = false
    isEditShow: boolean = false
    staffs: any[] = []
    modalType: string = 'Read'
    searchStaff: any
    staffName: string = ''
    isShow: boolean = false

    recordStatus: any[] = [{
            key: '未处理',
            val: 0
        },
        {
            key: '处理中',
            val: 1
        },
        {
            key: '已处理',
            val: 2
        }
    ]

    resultType: any[] = [{
            key: '正常报警',
            val: 1
        },
        {
            key: '误报',
            val: 2
        }
    ]

    get modalState() {
        return this.$store.getters.alarmAccessModalState
    }
    set modalState(val) {
        this.$store.getters.alarmAccessModalState
    }

    created() {
        let self = this
        this.searchStaff = _.debounce(function() {
            self.isShow = true
            let params = {
                name: self.staffName
            }
            listStaff(params).then(res => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    self.staffs = data
                }
            })
        }, 200)
    }



    mounted() {
        this.modalState = this.$route.params.modalState ? true : false
        staffList().then(res => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.staffs = data
            }
        })

        this.recordPage()
    }

    recordPage() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            recordStatus: this.conditions.recordStatus,
            startTime: new Date(this.conditions.startTime as Date).getTime(),
            endTime: new Date(this.conditions.endTime as Date).getTime()

        }
        listRecordPage(params).then(res => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.recevicePoliceRecordData = data.list
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

    //显示新增弹框
    showAddMoudle() {
        this.isAddShow = true;
    }

    //提交新增记录
    submitRecord() {
        let param = {
            title: this.recordForm.title,
            receiveTime: new Date().getTime(),
            place: this.recordForm.place,
            description: this.recordForm.description,
            callerName: this.recordForm.callerName,
            callerPhone: this.recordForm.callerPhone,
        }
        addRecord(param).then(res => {
            let {
                code
            } = res.data
            if (code === 200) {
                this.recordPage(),
                    this.$Message.success('添加成功！')
            } else {
                this.$Message.error('添加失败！'),
                    this.recordPage()
            }
        })
    }

    // show -modlue
    showModule(id: number, type: string) {
        getRecordInfoById(id).then(res => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.recordInfo = data
                this.staffName = data.staffName
            }
        })
        this.modalType = type
        this.isInfoShow = true
    }

    choosedStaffName(id: number, name: string) {
        this.recordInfo.staffId = id
        this.staffName = name
        this.isShow = false
    }

    infoBack() {
        this.isInfoShow = false;
    }

    //提交编辑
    submitEdit() {
        console.info("--- 提交编辑 ----");
        this.recordInfo.receiveTime = new Date(this.recordInfo.receiveTime as Date).getTime()
        this.recordInfo.dealTime = new Date(this.recordInfo.dealTime as Date).getTime() 
        editRecord(this.recordInfo).then(res => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.recordPage();
                this.$Message.success('修改成功！');
                this.isInfoShow = false;
            } else {
                this.$Message.success('修改失败！');
            }
        })
    }


    // 单独删除
    deleteRecord(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: '确定要删除这条报警记录吗？',
            onOk: () => {
                delRecord(id).then(res => {
                    let {
                        code
                    } = res.data
                    if (code === 200) {
                        this.recordPage()
                        this.$Message.success('删除成功！')
                    } else {
                        this.$Message.error('删除失败！')
                    }
                })
            }
        })
    }

    resetConditions() {
        this.conditions.recordStatus = null
        this.conditions.startTime = null
        this.conditions.endTime = null
        this.recordPage()
    }

}