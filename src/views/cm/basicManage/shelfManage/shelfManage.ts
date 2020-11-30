import {Component, Vue} from 'vue-property-decorator'
import {Condition, ShelfInfo} from '@/types/views/shelfManage.interface'
import {Page} from '@/types/views/common.interface'
import {listArea} from '@/api/areaManage'
import {
    addShelfInfo,
    getShelfInfoById,
    editShelfInfo,
    listShelfInfoDatagrid,
    deleteShelf,
} from '@/api/shelfManage'

@Component({})
export default class About extends Vue {


    conditions: Condition = {
        warehouseId: null,
        shelfName: null,
    }

    areaColumns: any[] = [
        {
            type: 'index',
            width: 80,
            align: 'center'
        },
        {
            title: '所属大区',
            key: 'warehouseId',
            align: 'center',
            render: (h: any, params: any) => {
                return h('span', params.row.warehouse.warehouseName)
            }
        },
        {
            title: '货架名称',
            key: 'shelfName',
            align: 'center'
        },
        {
            title: '货架名称',
            key: 'capacity',
            align: 'center'
        },
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
                                this.getInfoById(params.row.id)
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
                                this.delete(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]

    areaData: any[] = []

    page: Page = {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
    }

    pageStyle = {
        textAlign: 'right',
        margin: '10px 10px 15px auto'
    }

    areaInfoForm: ShelfInfo = {
        id: -1,
        warehouseId: -1,
        shelfName: '',
        capacity: 0,
    }

    areaInfo = {
        isShow: false,
        title: '添加货架信息',
        type: 1
    }

    warehouses: any[] = []

    mounted() {
        this.listTunnelInfo()
        this.listInfoDatagrid()
    }

    listInfoDatagrid() {
        let params = {
            shelfName: this.conditions.shelfName,
            warehouseId: this.conditions.warehouseId,
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize
        }
        listShelfInfoDatagrid(params).then(res => {
            let {code, data, msg} = res.data
            if (code === 200) {
                this.areaData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    listTunnelInfo() {
        let params = {
            tunnel: true
        }
        listArea(params).then(res => {
            let {code, data, msg} = res.data
            if (code === 200) {
                this.warehouses = data
            } else {
                this.$Message.error('查询大区信息失败！')
            }
        })
    }

    showAddModal() {
        this.areaInfo.isShow = true
        this.areaInfo.title = '添加货架'
        this.areaInfo.type = 1
    }

    addAreaInfo() {
        addShelfInfo(this.areaInfoForm).then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.$Message.success('添加成功！')
                this.areaInfo.isShow = false
                this.listInfoDatagrid()
            } else {
                this.$Message.error('添加失败！')
            }
        })
    }

    getInfoById(id: number) {
        this.areaInfo.isShow = true
        this.areaInfo.type = 2
        this.areaInfo.title = '修改货架信息'
        getShelfInfoById(id).then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.areaInfoForm = data
            }
        })
    }

    editInfo() {
        editShelfInfo(this.areaInfoForm).then(res => {
            let {code, data} = res.data
            if (code === 200) {
                this.$Message.success('修改成功！')
                this.areaInfo.isShow = false
                this.listInfoDatagrid()
            } else {
                this.$Message.error('修改失败！')
            }
        })
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.listInfoDatagrid()
    }

    handlePageSize(value: number) {
        this.page.pageSize = value
        this.listInfoDatagrid()
    }

    delete(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: '确定要删除这条管仓信息吗？',
            onOk: () => {
                deleteShelf(id).then(res => {
                    let {code, data, msg} = res.data
                    if (code === 200) {
                        this.$Message.success('删除成功！')
                        this.listInfoDatagrid()
                    } else {
                        this.$Message.error('删除失败！')
                    }
                })
            }
        })
    }

}
