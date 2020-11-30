import {Component, Vue} from 'vue-property-decorator'
import {
    listEquipModel,
    listEquipType,
    delModelCascade,
    addModelCascade,
    getModelCascadesInfo,
    editModelCascade
} from '@/api/equipmentManage'

@Component({})
export default class About extends Vue {

    equipmentModelColumns: any[] = [
        {
            type: 'index',
            width: 60,
            align: 'center'
        },
        {
            title: '名称',
            key: 'name',
            align: 'center'
        },
        {
            title: '所属大类',
            key: 'categoryId',
            align: 'center',
            render: (h: any, params: any) => {
                return h('span', params.row.equipmentCategory.name)
            }
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
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.getModelInfoById(params.row.id)
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
                                this.deleteModel(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]

    equipmentModelData: any[] = []

    types: any[] = []

    modelForm: any = {
        id: -1,
        name: '',
        categoryId: null
    }

    rulesModel = {
        name: [
            {required: true, message: '型号名称不能为空', trigger: 'blur'}
        ],
        categoryId: [
            {type: 'number', required: true, message: '所属大类不能为空', trigger: 'change'}
        ]
    }

    isShow: boolean = false
    title: string = '新增设备型号'

    mounted() {
        this.listEquipModel()
        this.listEquipType()
    }

    listEquipModel() {
        listEquipModel().then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.equipmentModelData = data
            } else {
                this.$Message.error('设备型号查询失败！')
            }
        })
    }

    listEquipType() {
        listEquipType().then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.types = data
            }
        })
    }

    showAddModal() {
        this.isShow = !this.isShow
        this.title = '新增设备型号'
    }

    submitAddForm(name: any) {
        let params = {
            name: this.modelForm.name,
            categoryId: this.modelForm.categoryId
        }
        let ref = this.$refs[name] as any
        ref.validate((valid: any) => {
            if (valid) {
                addModelCascade(params).then(res => {
                    let {code, data, msg} = res.data
                    if (code === 200) {
                        this.listEquipModel()
                        this.isShow = !this.isShow
                        this.$Message.success('添加成功！')
                    }
                })
            } else {
                this.$Message.error('请输入正确的信息！')
            }
        })
    }

    getModelInfoById(id: number) {
        this.isShow = !this.isShow
        this.title = '修改设备型号'
        getModelCascadesInfo(id).then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.modelForm = data
            }
        })
    }

    submitEditForm(name: any) {
        let params = {
            id: this.modelForm.id,
            name: this.modelForm.name,
            categoryId: this.modelForm.categoryId
        }
        let ref = this.$refs[name] as any
        ref.validate((valid: any) => {
            if (valid) {
                editModelCascade(params).then(res => {
                    let {code, data, msg} = res.data
                    if (code === 200) {
                        this.listEquipModel()
                        this.isShow = !this.isShow
                        this.$Message.success('修改成功！')
                    }
                })
            } else {
                this.$Message.error('请输入正确的信息！')
            }
        })
    }

    deleteModel(id: number) {
        this.$Modal.confirm({
            title: "删除",
            content: "<p>确定删除这条设备型号信息吗?</p>",
            onOk: () => {
                delModelCascade(id).then(res => {
                    let {code} = res.data
                    if (code === 200) {
                        this.listEquipModel()
                        this.$Message.success('删除成功！')
                    } else {
                        this.$Message.error('删除失败！')
                    }
                })
            }
        })
    }

    handleResert(name: any) {
        let ref = this.$refs[name] as any
        ref.resetFields()
        this.isShow = false
    }

}
