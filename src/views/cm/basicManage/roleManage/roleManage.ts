import { Component, Vue } from 'vue-property-decorator'
import { RoleInfo } from '@/types/views/user.interface'
import { Page } from '@/types/views/common.interface'
import { listRoleDatagrid, 
        getRole, 
        deleteRole, 
        addRole, 
        editRole, 
        getMenu, 
        submitPermission, 
        checkName 
    } from '@/api/roleManage'

const checkRoleName = (rule: any, value: string, callback: any):void => {
    if (value !== '' || value !== null) {
        checkName(value).then(res => {
            let { code, data, msg } = res.data
            if (code === 200) {
                if (data === true) {
                    callback(new Error('该角色名称已经存在'))
                } else {
                    callback()
                }
            }
        })
    }
}

@Component({})
export default class About extends Vue {

    roleColumns: any[] = [
        {
            type: 'index',
            width: 80,
            align: 'center'
        },
        {
            title: '名称',
            key: 'name',
            align: 'center'
        },
        {
            title: '描述',
            key: 'description' ,
            align: 'center'
        },
        {
            title: '操作',
            align: 'center',
            render: (h: any, params: any) => {
                return h('div', [
                    h('Button', {
                        props: {
                            size: 'small',
                            type: 'primary'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.editPermission(params.row.id)
                            }
                        }
                    }, '功能权限配置'),
                    h('Button', {
                        props: {
                            size: 'small',
                            type: 'warning'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.editRole(params.row.id)
                            }
                        }
                    }, '编辑'),
                    h('Button', {
                        props: {
                            size: 'small',
                            type: 'error'
                        },
                        on: {
                            click: () => {
                                this.deleteRole(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]

    roleData: RoleInfo[] = []

    page: Page = {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
    }

    pageStyle = {
        textAlign: 'right',
        margin: '10px 10px 15px auto'
    }

    isShow: boolean = false

    title: string = '新增角色'

    pageType: number = 1

    roleForm: RoleInfo = {
        name: null,
        description: null,
        states: 1
    }

    ruleValidate = {
        name: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' },
            { validator: checkRoleName, trigger: 'blur' }
        ]
    }

    id: number = 0

    roleName: string = ''

    role: any[] = []

    isShowPermission: boolean = false

    permissionIds: any[] = []

    mounted() {
        this.listRoleDatagrid()
    }

    listRoleDatagrid() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize
        }
        listRoleDatagrid(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.roleData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    editRole(id: number) {
        this.id = id
        this.isShow = true
        this.title = '修改角色信息',
        this.pageType = 2
        getRole(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.roleForm = data
            }
        })
    }

    deleteRole(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: "<p>确定删除这条角色信息吗?</p>",
            onOk: () => {
                deleteRole(id).then(res => {
                    let { code } = res.data
                    if ( code === 200 ) {
                        this.$Message.success('删除成功！')
                        this.listRoleDatagrid()
                    } else {
                        this.$Message.error('删除失败！')
                    }
                })
            }
        })
    }

    showAddModal() {
        this.isShow = true
        this.title = '新增角色',
        this.pageType = 1
    }

    addRole(name: any) {
        let ref = this.$refs[name] as any
        ref.validate((valid: any) => {
            if (valid) {
                addRole(this.roleForm).then(res => {
                    let { code, data } = res.data
                    if (code === 200) {
                        this.$Message.success('添加成功！')
                        this.isShow = false
                        this.listRoleDatagrid()
                    } else {
                        this.$Message.error('添加失败！')
                    }
                })
            } else {
                this.$Message.error('添加失败！')
            }
        })
    }

    editRoleInfo(name: any) {
        let ref = this.$refs[name] as any
        let params = {
            id: this.id,
            name: this.roleForm.name,
            description: this.roleForm.description
        }
        ref.validate((valid: any) => {
            if (valid) {
                editRole(params).then(res => {
                    let { code, data } = res.data
                    if (code === 200) {
                        this.$Message.success('修改成功！')
                        this.isShow = false
                        this.listRoleDatagrid()
                    } else {
                        this.$Message.error('修改失败！')
                    }
                })
            } else {
                this.$Message.error('修改失败！')
            }
        }) 
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.listRoleDatagrid()
    }

    handlePageSize(value: number) {
        this.page.pageSize = value
        this.listRoleDatagrid()
    }

    getMenu() {
        getMenu().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.role =[]
                data.map((item:any) => {
                    this.role.push({
                        name: item.name,
                        permissionList: item.permissionList,
                        checkbox : [],
                        quanxuan: {
                            iii: false,
                            value: false
                        }
                    })
                })
            }
        })
    }

    editPermission(id: number) {
        this.isShowPermission = true
        this.getMenu()
        this.id = id
        getRole(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.roleName = data.name
                setTimeout(()=> {
                    this.role.map((item, index) => {
                        item.permissionList.map((ele: any, idx: any) => {
                            if (data.permissionIds.indexOf(ele.id) > -1) {
                                item.checkbox.push(ele.id)
                            }
                            this.checkAllGroupChange(index)
                        })
                    })
                }, 500)
            }
        })
    }

    checkAllGroupChange (index: number) {
        this.role[index].quanxuan.iii = this.role[index].checkbox.length > 0 && this.role[index].checkbox.length != 4
        this.role[index].quanxuan.value = this.role[index].checkbox.length == 4
        this.permissionIds = this.permissionIds.concat(this.role[index].checkbox)
    }

    // 全选按钮
    handleCheckAll (item: any, index: number) {
        if (this.indeterminate) {
            this.role[index].quanxuan.value = false;
        } else {
            this.role[index].quanxuan.value = !this.role[index].quanxuan.value
        }

        if (this.role[index].quanxuan.value === true) {
            item.permissionList.map((ele: any) => {
                this.role[index].checkbox.push(ele.id)
            })
        } else {
            this.role[index].checkbox = []
        }
        this.role[index].quanxuan.iii = false;
        this.permissionIds = this.permissionIds.concat(this.role[index].checkbox)
        console.log(' checkAll ', this.role[index].checkbox)
    }

    submitPermission() {
        let ids = [...new Set(this.permissionIds)]
        let params = {
            id: this.id,
            permissionIds: ids
        }
        submitPermission(params).then(res => {
            let { code } = res.data
            if (code === 200) {
                this.$Message.success('权限修改成功！')
                this.isShowPermission = !this.isShowPermission
                this.listRoleDatagrid()
            } else {
                this.$Message.error('权限修改失败！')
            }
        })
    }
    
}
