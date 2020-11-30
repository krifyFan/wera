import { Component, Vue } from 'vue-property-decorator'
import { Page } from '@/types/views/common.interface'
import { UserInfo } from '@/types/views/user.interface'
import { listStaffDatagrid, getStaffInfo, deleteStaff, addStaff, editStaff, areaList } from '@/api/user'
import { listRole } from '@/api/roleManage'

@Component({})
export default class About extends Vue {

    conditions = {
        name: null,
        account: null,
        // roleId: null
    }

    page: Page = {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
    }

    pageStyle = {
        textAlign: 'right',
        margin: '10px 10px 15px auto'
    }

    pageType: number = 1

    accountColumns: any[] = [
        {
            type: 'index',
            width: 80,
            align: 'center'
        },
        {
            title: '姓名',
            key: 'name',
            align: 'center'
        },
        {
            title: '账号',
            key: 'account',
            align: 'center'
        },
        // {
        //     title: '密码',
        //     key: 'password',
        //     align: 'center'
        // },
        {
            title: '所属大区',
            key: 'areaName',
            align: 'center'
        },
        {
            title: '所属角色',
            key: 'roleName',
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
                            type: 'warning'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.editAccount(params.row.id)
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
                                this.deleteAccount(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]

    accountData: UserInfo[] = []

    isShow: boolean = false
    title:string = '添加用户'

    userId: number  = 0
    accountForm: UserInfo = {
        name: null,
        account: null,
        password: null,
        areaId: null,
        roleId: null
    }

    areas: any[] = []
    roles: any[] = []

    rulesValidate = {
        name: [
            { required: true, message: '账号名称不能为空', trigger: 'blur' }
        ],
        roleId: [
            { required: true, type: 'number', message: '所属角色不能为空', trigger: 'change' }
        ],
        account: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        areaId: [
            { required: true, type: 'number', message: '所属大区不能为空', trigger: 'change' }
        ]
    }

    mounted() {
        this.listStaffDatagrid()
        this.areaList()
        this.listRole()
    }

    areaList() {
        areaList().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.areas = data
            }
        })
    }

    listRole() {
        listRole().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.roles = data
            }
        })
    }

    listStaffDatagrid() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            name: this.conditions.name,
            account: this.conditions.account,
            // roleId: this.conditions.roleId
        }
        listStaffDatagrid(params).then((res: any) => {
            let { code, data } = res.data
            if (code === 200) {
                this.accountData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    editAccount(id: number) {
        this.id = id
        this.pageType = 2
        this.isShow = true
        this.title = '修改用户信息'
        getStaffInfo(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.accountForm = data
            }
        })
    }

    deleteAccount(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: "<p>确定删除这条用户信息吗?</p>",
            onOk: () => {
                deleteStaff(id).then(res => {
                    let { code } = res.data
                    if ( code === 200 ) {
                        this.$Message.success('删除成功！')
                        this.listStaffDatagrid()
                    } else {
                        this.$Message.error('删除失败！')
                    }
                })
            }
        })
    }

    showAddModal() {
        this.pageType = 1
        this.isShow = true
        this.title = '添加用户'
    }

    addUser(name: any) {
        let params = {
            name: this.accountForm.name,
            areaId: this.accountForm.areaId,
            roleId: this.accountForm.roleId
        }
        let ref = this.$refs[name] as any
        ref.validate((valid: any) => {
            if (valid) {
                addStaff(params).then(res => {
                    let { code, data } = res.data
                    if (code === 200) {
                        this.isShow = false
                        this.$Message.success('添加成功！')
                        this.listStaffDatagrid()
                    } else {
                        this.$Message.error('添加失败')
                        this.isShow = false
                    }
                })
            } else {
                this.$Message.error('添加失败')
            }
        })
    }

    editUserInfo() {
        let params = {
            id: this.id,
            name: this.accountForm.name,
            account: this.accountForm.account,
            password: this.accountForm.password,
            areaId: this.accountForm.areaId,
            roleId: this.accountForm.roleId
        }
        editStaff(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.isShow = false
                this.$Message.success('修改成功！')
                this.listStaffDatagrid()
            } else {
                this.$Message.error('修改失败')
                this.isShow = false
            }
        })
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.listStaffDatagrid()
    }

    handlePageSize(value: number) {
        this.page.pageSize = value
        this.listStaffDatagrid()
    }
    
}
