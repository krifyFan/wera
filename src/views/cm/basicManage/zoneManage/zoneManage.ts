import { Component, Vue } from 'vue-property-decorator'
import { Condition, ZoneInfo } from '@/types/views/zoneManage.interface'
import { Page } from '@/types/views/common.interface'
import { listArea } from '@/api/areaManage'
import { addZoneInfo, getZoneInfoById, editZoneInfo, listZoneInfoDatagrid, deleteZone, addZoneInfoMulti } from '@/api/zoneManage'

@Component({})
export default class About extends Vue {

    conditions: Condition = {
        areaId: null,
        zoneName: null
    }

    areaColumns: any[] = [
        {
            type: 'index',
            width: 80,
            align: 'center'
        },
        {
            title: '所属大区',
            key: 'areaId',
            align: 'center',
            render: (h: any, params: any) => {
                return h('span', params.row.area.areaName)
            }
        },
        {
            title: '小区名称',
            key: 'zoneName',
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

    infoForm: ZoneInfo = {
        id: -1,
        zoneId: -1,
        zoneName: '',
    }

    info = {
        isShow: false,
        title: '添加小区信息',
        type: 1
    }

    areas: any[] = []

    mounted() {
        this.listAreaInfo()
        this.listInfoDatagrid()
    }

    listInfoDatagrid() {
        let params = {
            zoneName: this.conditions.zoneName,
            areaId: this.conditions.areaId,
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize
        }
        listZoneInfoDatagrid(params).then(res => {
            let { code, data, msg } = res.data
            if (code === 200) {
                this.areaData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    listAreaInfo() {
        let params = {
            tunnel: true
        }
        listArea(params).then(res => {
            let { code, data, msg } = res.data
            if (code === 200) {
                this.areas = data
            } else {
                this.$Message.error('查询大区信息失败！')
            }
        })
    }

    showAddModal() {
        this.info.isShow = true
        this.info.title = '添加小区'
        this.infoForm.zoneId = null
        this.infoForm.zoneName = null
    }

    addInfo() {
        addZoneInfo(this.infoForm).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('添加成功！')
                this.info.isShow = false
                this.listInfoDatagrid()
            } else {
                this.$Message.error('添加失败！')
            }
        })
    }

    getInfoById(id: number) {
        this.info.isShow = true
        this.info.type = 2
        this.info.title = '修改小区信息'
        getZoneInfoById(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.infoForm = data
            }
        })
    }

    editInfo() {
        editZoneInfo(this.infoForm).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('修改成功！')
                this.info.isShow = false
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
            content: '确定要删除这条小区信息吗？',
            onOk: () => {
                deleteZone(id).then(res => {
                    let { code, data, msg } = res.data
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
