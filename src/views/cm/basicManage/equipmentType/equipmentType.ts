import {Component, Vue} from 'vue-property-decorator'
import {listEquipType, delCascade, addCascade, getCascadesInfo, editCascade} from '@/api/equipmentManage'

@Component({})
export default class About extends Vue {

    equipmentTypeColumns: any[] = [
        {
            type: 'index',
            width: 50,
            align: 'center'
        },
        {
            title: '大类名称',
            key: 'name',
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
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.getTypeInfoById(params.row.id)
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
                                this.deleteType(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]

    equipmentTypeData: any[] = []

    isShow: boolean = false

    title: string = '新增大类'

    typeForm = {
        id: -1,
        name: '',
        parentId: 0
    }

    rulesType = {
        name: [
            {required: true, message: '大类名称不能为空', trigger: 'blur'}
        ]
    }

    mounted() {
        this.listEquipType()
    }

    listEquipType() {
        listEquipType().then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.equipmentTypeData = data
            }
        })
    }

    deleteType(id: number) {
        this.$Modal.confirm({
            title: "删除",
            content: "<p>确定删除这条设备大类信息吗?</p>",
            onOk: () => {
                delCascade(id).then(res => {
                    let {code} = res.data
                    if (code === 200) {
                        this.listEquipType()
                        this.$Message.success('删除成功！')
                    } else {
                        this.$Message.error('删除失败！')
                    }
                })
            }
        })
    }

    showAddModal() {
        this.title = '新增大类'
        this.isShow = true
    }

    getTypeInfoById(id: number) {
        this.title = '修改大类'
        this.isShow = !this.isShow
        getCascadesInfo(id).then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.typeForm = data
            }
        })


    }

    submitAddForm(name: any) {
        let params = {
            name: this.typeForm.name,
            parentId: 0
        }
        let ref = this.$refs[name] as any
        ref.validate((valid: any) => {
            if (valid) {
                addCascade(params).then(res => {
                    let {code, data, msg} = res.data
                    if (code === 200) {
                        this.listEquipType()
                        this.isShow = !this.isShow
                        this.$Message.success('添加成功！')
                    }
                })
            } else {
                this.$Message.error('请输入正确的信息！')
            }
        })
    }

    submitEditForm(name: any) {
        let params = {
            id: this.typeForm.id,
            name: this.typeForm.name,
            parentId: 0
        }
        let ref = this.$refs[name] as any
        ref.validate((valid: any) => {
            if (valid) {
                editCascade(params).then(res => {
                    let {code, data, msg} = res.data
                    if (code === 200) {
                        this.listEquipType()
                        this.isShow = !this.isShow
                        this.$Message.success('修改成功！')
                    }
                })
            } else {
                this.$Message.error('请输入正确的信息！')
            }
        })
    }

    handleResert(name: any) {
        let ref = this.$refs[name] as any
        ref.resetFields()
        this.isShow = false
    }

}
