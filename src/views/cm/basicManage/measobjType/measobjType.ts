import {Component, Vue, Watch} from 'vue-property-decorator'
import {Conditions, MeasobjType} from '@/types/views/measobjType.interface'
import {Page} from '@/types/views/common.interface'
import {
    addMeasobjType,
    deleteMeasobjType,
    editMeasobjType,
    getMeasobjTypeById,
    listDataType,
    listMeasobjType,
    listAlarmTriggerEnum
} from '@/api/measobjType'
import {listAlarmType} from '@/api/alarmType'

@Component({})
export default class About extends Vue {

    @Watch('alarmTriggerInfoForm.operation')
    watchAlarmTriggerInfoFormOperation(newVal: any) {
        this.alarmTriggerInfoForm.operation2 = this.getOperation2(newVal)
    }

    //
    // @Watch('alarmTriggerInfoForm.alarmTypeId')
    // watchAlarmTriggerInfoFormAlarmTypeId(newVal: any) {
    //     this.alarmTriggerInfoForm.alarmTypeName =
    // }

    conditions: Conditions = {
        measobjTypeName: null,
        // name: null
    }

    measobjTypeColumns: any = [
        {
            type: 'index',
            width: 80,
            align: 'center'
        },
        // {
        //     title: '监测类型',
        //     key: 'dataTypeName',
        //     align: 'center',
        //     render(h: any, params: any) {
        //         return h('span', params.row.dataTypeDto.val)
        //     }
        // },
        {
            title: '名称',
            key: 'measobjTypeName',
            align: 'center'
        },
        // {
        //     title: '单位',
        //     key: 'unit',
        //     align: 'center'
        // },
        // {
        //     title: '是否可控',
        //     key: 'isControl',
        //     align: 'center',
        //     render: (h: any, params: any) => {
        //         let temp = ''
        //         if (params.row.isControl === true) {
        //             temp = '是'
        //         } else {
        //             temp = '否'
        //         }
        //         return h('span', temp)
        //     }
        // },
        // {
        //     title: '是否可重置',
        //     key: 'isReset',
        //     align: 'center',
        //     render: (h: any, params: any) => {
        //         let temp = ''
        //         if (params.row.isReset === true) {
        //             temp = '是'
        //         } else {
        //             temp = '否'
        //         }
        //         return h('span', temp)
        //     }
        // },
        // {
        //     title: '正常最小值',
        //     key: 'nationalMin',
        //     align: 'center'
        // },
        // {
        //     title: '正常最大值',
        //     key: 'nationalMax',
        //     align: 'center'
        // },
        // {
        //     title: '极限最小值',
        //     key: 'normalMin',
        //     align: 'center'
        // },
        // {
        //     title: '极限最大值',
        //     key: 'normalMax',
        //     align: 'center'
        // },
        {
            title: '操作',
            align: 'center',
            width: 140,
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
                                this.getMeasobjTypeById(params.row.id)
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.deleteMeasobjType(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]

    cvColumns: any = [
        {
            title: 'CV值',
            key: 'cv',
            align: 'center'
        },
        {
            title: '显示文本',
            key: 'value',
            align: 'center'
        },
    ]


    measobjTypeData: any[] = []

    cvData: any[] = []


    page: Page = {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
    }

    pageStyle = {
        marginTop: '10px'
    }

    measobjTypeInfoForm: MeasobjType = {
        id: null,
        // dataType: 1,
        measobjTypeName: '',
        measobjTypeImage: '',
        measobjAlarmTypeTriggerDtos: [],
        // unit: '',
        // isControl: false,
        // isReset: false,
        // nationalMin: 0,
        // nationalMax: 0,
        // normalMin: 0,
        // normalMax: 0,
        // measobjTypeCvDtos: []
    }

    cvInfoForm: any = {
        id: null,
        cv: '',
        value: '',
    }


    cvInfoSelected: any = {
        id: null,
        cv: '',
        value: '',
    }


    measobjTypeInfo = {
        title: '',
        type: 1,
        isShow: false
    }

    cvInfo = {
        title: '',
        type: 1,
        isShow: false,
    }


    dataTypeList: any[] = []

    operations: any[] = []

    mounted() {
        this.listDataType()
        this.listAlarmType()
        this.listAlarmTriggerEnum()
        this.listMeasobjType()
    }


    showAddModal() {
        this.measobjTypeInfo.isShow = true
        this.measobjTypeInfo.type = 1
        this.measobjTypeInfo.title = '添加监测对象类型信息'
        this.measobjTypeInfoForm = {
            id: null,
            measobjTypeName: '',
            measobjTypeImage: '',
            measobjAlarmTypeTriggerDtos: [],
        }
        this.alarmTriggerData = []
    }

    listDataType() {
        listDataType().then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.dataTypeList = data
            }
        })
    }

    listAlarmType() {
        listAlarmType(null).then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.alarmTypes = data
            }
        })
    }

    listAlarmTriggerEnum() {
        listAlarmTriggerEnum().then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.operations = data
            }
        })
    }

    addMeasobjType() {
        this.measobjTypeInfoForm.id = null
        addMeasobjType(this.measobjTypeInfoForm).then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.$Message.success('添加成功！')
                this.measobjTypeInfo.isShow = false
                this.listMeasobjType()
            } else {
                this.$Message.error('添加失败！')
            }
        })
    }

    getOperation(operation: any) {
        return this.operations.find(item=>item.key == operation).sign
    }

    getOperation2(operation: any) {
        return this.operations.find(item=>item.key == operation).relation
    }

    //region CV

    cvInfoOk() {
        if (this.cvInfo.type === 1) {
            if (this.cvData.findIndex(item => item.cv == this.cvInfoForm.cv) > -1) {
                return;
            }
            this.cvData.push({
                id: null,
                measobjTypeId: this.measobjTypeInfoForm.id,
                cv: this.cvInfoForm.cv,
                value: this.cvInfoForm.value
            })
        } else if (this.cvInfo.type === 2) {
            let select = this.cvData.find(item => item.cv == this.cvInfoSelected.cv)
            debugger
            select.cv = this.cvInfoForm.cv
            select.value = this.cvInfoForm.value
        }
    }


    cvInfoCancel() {
    }


    cvDataSelect(currentRow: any) {
        this.cvInfoSelected = currentRow
    }

    addCV() {
        this.cvInfo.isShow = true
        this.cvInfo.title = "添加值映射"
        this.cvInfo.type = 1
        this.cvInfoForm = {
            id: null,
            cv: '',
            value: '',
        }
    }

    editCV() {
        if (!this.cvInfoSelected) {
            this.$Message.info('未选中行！')
            return
        }
        this.cvInfo.isShow = true
        this.cvInfo.title = "编辑值映射"
        this.cvInfo.type = 2
        this.cvInfoForm = {
            id: null,
            cv: this.cvInfoSelected.cv,
            value: this.cvInfoSelected.value,
        }
    }

    deleteCV() {
    }

    //endregion

    //region AlarmTrigger

    alarmTriggerInfo = {
        title: '',
        type: 1,
        isShow: false,
    }

    alarmTriggerInfoSelected: any = {
        id: null,
        alarmTypeId: '',
        operation: 1,
        triggerValue: '',
        releaseValue: '',
    }


    alarmTypes: any[] = []

    alarmTriggerEums: any[] = []

    alarmTriggerColumns: any = [
        {
            title: '属性',
            key: 'property',
            align: 'center',
            render: (h: any, params: any) => {
                return h('span', "CV")
            }
        },
        {
            title: '触发',
            key: 'triggerValue',
            align: 'center',
            render: (h: any, params: any) => {
                let operationValue = this.getOperation(params.row.operation)
                return h('span', operationValue + "" + params.row.triggerValue)
            }
        },
        {
            title: '释放值',
            key: 'releaseValue',
            align: 'center',
            render: (h: any, params: any) => {
                let operation2 = this.getOperation2(params.row.operation)
                return h('span', operation2 + "" + params.row.releaseValue)
            }
        }, {
            title: '告警类型',
            key: 'alarmTypeName',
            align: 'center'
        },
    ]

    alarmTriggerInfoForm: any = {
        id: null,
        alarmTypeId: '',
        alarmTypeName: '',
        operation: 1,
        operation2: '>',
        triggerValue: '',
        releaseValue: '',
    }
    alarmTriggerData: any[] = []

    alarmTriggerInfoOk() {
        if (this.alarmTriggerInfo.type === 1) {
            if (this.alarmTriggerData.findIndex(item => item.alarmTypeId == this.alarmTriggerInfoForm.alarmTypeId) > -1) {
                return;
            }
            let alarmTypeName = this.alarmTypes.find(item => item.id == this.alarmTriggerInfoForm.alarmTypeId).alarmTypeName
            this.alarmTriggerData.push({
                id: null,
                measobjTypeId: this.measobjTypeInfoForm.id,
                alarmTypeId: this.alarmTriggerInfoForm.alarmTypeId,
                alarmTypeName: alarmTypeName,
                operation: this.alarmTriggerInfoForm.operation,
                triggerValue: this.alarmTriggerInfoForm.triggerValue,
                releaseValue: this.alarmTriggerInfoForm.releaseValue,
            })
            debugger
        } else if (this.alarmTriggerInfo.type === 2) {
            let select = this.alarmTriggerData.find(item => item.alarmTypeId == this.alarmTriggerInfoSelected.alarmTypeId)
            select.alarmTypeId = this.alarmTriggerInfoForm.alarmTypeId
            select.operation = this.alarmTriggerInfoForm.operation
            select.triggerValue = this.alarmTriggerInfoForm.triggerValue
            select.releaseValue = this.alarmTriggerInfoForm.releaseValue
        }
    }


    alarmTriggerInfoCancel() {
    }

    alarmTriggerDataSelect(currentRow: any) {
        this.alarmTriggerInfoSelected = currentRow
    }

    addAlarmTrigger() {
        this.alarmTriggerInfo.isShow = true
        this.alarmTriggerInfo.title = "添加触发"
        this.alarmTriggerInfo.type = 1
        this.alarmTriggerInfoForm = {
            id: null,
            alarmTypeId: '',
            operation: 1,
            operation2: '>',
            triggerValue: '',
            releaseValue: '',
        }
    }

    editAlarmTrigger() {
        if (!this.alarmTriggerInfoSelected) {
            this.$Message.info('未选中行！')
            return
        }
        this.alarmTriggerInfo.isShow = true
        this.alarmTriggerInfo.title = "编辑触发"
        this.alarmTriggerInfo.type = 2
        let operation2 = this.getOperation2(this.alarmTriggerInfoSelected.operation)
        this.alarmTriggerInfoForm = {
            id: null,
            alarmTypeId: this.alarmTriggerInfoSelected.alarmTypeId,
            operation: this.alarmTriggerInfoSelected.operation,
            operation2: operation2,
            triggerValue: this.alarmTriggerInfoSelected.triggerValue,
            releaseValue: this.alarmTriggerInfoSelected.releaseValue,
        }
    }

    deleteAlarmTrigger() {
        let selectIndex = this.alarmTriggerData.findIndex(item => item.alarmTypeId == this.alarmTriggerInfoSelected.alarmTypeId)
        if (selectIndex > -1) {
            this.alarmTriggerData.splice(selectIndex, 1)
        }
    }

    //endregion

    getMeasobjTypeById(id: number) {
        this.measobjTypeInfo.isShow = true
        this.measobjTypeInfo.title = '修改监测对象类型'
        this.measobjTypeInfo.type = 2

        this.cvInfo = {
            title: '',
            type: 1,
            isShow: false,
        }
        this.alarmTriggerInfo = {
            title: '',
            type: 1,
            isShow: false,
        }
        this.cvInfoSelected = null
        this.alarmTriggerInfoSelected = null
        this.cvData = []
        this.alarmTriggerData = []
        getMeasobjTypeById(id).then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.measobjTypeInfoForm = data
                // this.cvData = this.measobjTypeInfoForm.measobjTypeCvDtos.map(item => {
                //     item.id = null
                //     return item
                // })
                this.alarmTriggerData = this.measobjTypeInfoForm.measobjAlarmTypeTriggerDtos.map(item => {
                    item.id = null
                    item.alarmTypeName = this.alarmTypes.find(item1 => item1.id == item.alarmTypeId).alarmTypeName
                    return item
                })
            }
        })
    }

    editMeasobjType() {
        // this.measobjTypeInfoForm.measobjTypeCvDtos = this.cvData
        this.measobjTypeInfoForm.measobjAlarmTypeTriggerDtos = this.alarmTriggerData
        editMeasobjType(this.measobjTypeInfoForm).then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.$Message.success('修改成功！')
                this.measobjTypeInfo.isShow = false
                this.listMeasobjType()
            } else {
                this.$Message.error('修改失败！')
            }
        })
    }

    deleteMeasobjType(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: '<p>确定要删除这条监测对象类型信息吗？</p>',
            onOk: () => {
                deleteMeasobjType(id).then(res => {
                    let {code, data, msg} = res.data
                    if (code === 200) {
                        this.$Message.success('删除成功！')
                        this.listMeasobjType()
                    } else {
                        this.$Message.error('删除失败！')
                    }
                })
            }
        })
    }

    listMeasobjType() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            measobjTypeName: this.conditions.measobjTypeName,
        }
        listMeasobjType(params).then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.measobjTypeData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.listMeasobjType()
    }

    handlePageSize(value: number) {
        this.page.pageSize = value
        this.listMeasobjType()
    }

}
