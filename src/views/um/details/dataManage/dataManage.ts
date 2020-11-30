import { Component, Vue } from 'vue-property-decorator'
import { Page } from '@/types/views/common.interface'
import { measobjDatagrid, getObjType, getAreas } from '@/api/dataManage'

@Component({})
export default class About extends Vue {

    conditions: any = {
        areaId: null,
        objSn: null,
        measobjTypeId: null
    }

    page: Page = {
        pageTotal: 0,
        pageSize: 10,
        pageNum: 1
    }

    areas: any[] = []
    objTypes: any[] = []

    dataMColumns: any[] = [
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
            title: '监测区域',
            key: 'monitorArea',
            align: 'left'
        },
        {
            title: '监测位置',
            key: 'monitorPosition',
            align: 'left'
        },
        {
            title: '设备名称',
            key: 'equipmentName',
            align: 'left'
        },
        {
            title: '对象编号',
            key: 'id',
            align: 'left'
        },
        {
            title: '对象名称',
            key: 'name',
            align: 'left'
        },
        {
            title: '对象类型',
            key: 'measobjTypeName',
            align: 'left'
        },
        {
            title: '数据',
            key: 'cv',
            align: 'left'
        },
        {
            title: '采集时间',
            key: 'refreshTime',
            align: 'center',
            render: (h: any, params: any) => {
                return h('div', new Date(params.row.refreshTime).format('yyyy-MM-dd hh:mm:ss'))
            }
        }
    ]

    dataMData: any[] = []

    ids: Array<number> = []

    hisDataIcon:string = require('@/assets/images/brokenLineIcon2.png')

    mounted() {
        this.getObjType()
        this.getAreas()
        this.measobjDatagrid()
    }

    measobjDatagrid() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            areaId: this.conditions.areaId,
            id: this.conditions.objSn,
            measobjTypeId: this.conditions.measobjTypeId
        }
        measobjDatagrid(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.dataMData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    getObjType() {
        getObjType().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.objTypes = data
            }
        })
    }

    getAreas() {
        getAreas().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.areas = data
            }
        })
    }

    changeSelect(selection: any[]) {
        this.ids = []
        selection.forEach(item => {
            this.ids.push(item.id)
        })
    }

    searchHisData() {
        if (this.ids.length === 0) {
            this.$Message.warning('请选择所要查看的设备')
        } else {
            this.$router.push({
                name: '历史数据',
                params: {
                    ids: this.ids.toString()
                }
            })
        }
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.measobjDatagrid()
    }

    handlePageSize(value: number) {
        this.page.pageSize = value
        this.measobjDatagrid()
    }

    resetConditions() {
        this.conditions.areaId = null
        this.conditions.objSn  = null
        this.conditions.measobjTypeId = null
        this.measobjDatagrid()
    }
    
}
