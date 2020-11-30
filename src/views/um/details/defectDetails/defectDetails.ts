import { Component, Vue, Watch } from 'vue-property-decorator'
import { Defect } from '@/types/views/patrol.interface'
import { getDefectInfo,defectLevel, defectStatus, addDefect, editDefect } from '@/api/defectManage'
import { listArea } from '@/api/areaManage'
import { getZones } from '@/api/equipment'

@Component({})
export default class About extends Vue {

    pageTitle: string = '新增缺陷'

    pageType:string = 'Add'

    id: number = 0

    levelOptions: Array<{ key: number, val: string }> = []

    statusOptions: Array<{ key: number, val: string }> = []

    areas: any[] = []

    zones: any[] = []

    defectInfo: Defect = {
        taskId: null,
        staffId: null,
        defectName: null,
        defectLevel: null,
        description: null,
        areaId: null,
        zoneId: null,
        equipmentId: null,
        maintainPerson: null,
        defectStatus: null
    }

    staffName: string | null = null

    @Watch('defectInfo.areaId')
    watchArea(newVal: number) {
        this.$nextTick(()=> {
            let params = {
                areaId: newVal
            }
            getZones(params).then(res => {
                let { code, data } = res.data
                if (code === 200) {
                    this.zones = data
                }
            })
        })
    }

    created() {
        this.pageType = this.$route.params.type
        if (this.pageType==='Read') {
            this.pageTitle = '缺陷详情'
            this.id = Number(this.$route.params.id)
        } else if (this.pageType==='Edit') {
            this.pageTitle = '编辑缺陷'
            this.id = Number(this.$route.params.id)
        } else {
            this.pageTitle = '新增缺陷'
        }
    }

    mounted() {
        this.defectLevel()
        this.defectStatus()
        this.listArea()
        if (this.pageType !== 'Add') {
            getDefectInfo(this.id).then(res => {
                let { code, data } = res.data
                if (code === 200) {
                    this.defectInfo = data
                    this.staffName = data.staffName
                }
            })
        } else {
            this.defectInfo.staffId = Number(localStorage.getItem('userId'))
            this.staffName = this.$store.getters.name
        }
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

    listArea() {
        let params = {}
        listArea(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.areas = data
            }
        })
    }

    addDefect() {
        addDefect(this.defectInfo).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('添加成功！')
                this.back()
            } else {
                this.$Message.error('添加失败！')
            }
        })
    }

    editDefect() {
        console.log(111)
        let param = {
            id: this.id
        }
        let params = Object.assign(param, this.defectInfo)

        editDefect(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('修改成功！')
                this.back()
            } else {
                this.$Message.error('修改失败！')
            }
        })
    }
    
}
