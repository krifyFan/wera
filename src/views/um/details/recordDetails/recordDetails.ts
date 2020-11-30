import { Component, Vue } from 'vue-property-decorator'
import { Record } from '@/types/views/patrol.interface'
import { getRecordInfo, editRecord, recordResult } from '@/api/recordManage'

@Component({})
export default class About extends Vue {

    pageTitle: string = '新增巡检记录'

    pageType:string = 'Add'

    id: number = 0

    result: Array<{ key: number, val: string }> = []

    types: Array<{ key: string, val: number }> = [
        // { key: '一般巡检记录', val: 0 },
        { key: '灭火器', val: 1 },
        { key: '消防栓', val: 2 },
        // { key: '标准库', val: 3 },
        // { key: '自动库', val: 4 }
    ]

    recordInfo: Record = {
        taskId: null,
        taskName: null,
        staffId: null,
        staffName: null,
        description: null,
        imgFile: null,
        equipmentTypeId: null,
        equipmentTypeName: null,
        patrolResult: null,
        patrolStatus: null,
        patrolStatusName: null,
        equipmentName: null,
        equipmentSn: null,
        child: {
            
        }
    }
    
    firExtinguisherRecord =  {
        pressure: 0,
        components: 0,
        appearanceClean: 0,
        leadSeal: 0
    } 

    fireHydrant = {
        boxLock: 0,
        environmentClean: 0,
        glassMark: 0,
        spray: 0,
        squirtgunHoseFall: 0,
        valvesSwitches: 0,
    }    

    created() {
        this.pageType = this.$route.params.type
        if (this.pageType==='Read') {
            this.pageTitle = '巡检记录详情'
            this.id = Number(this.$route.params.id)
        } else if (this.pageType==='Edit') {
            this.pageTitle = '编辑巡检记录'
            this.id = Number(this.$route.params.id)
        } else {
            this.pageTitle = '新增巡检记录'
        }
    }

    mounted() {
        this.recordResult()
        if ( this.pageType !== 'Add' ) {
            this.getRecordInfo(this.id)
        }
    }

    getRecordInfo(id: number) {
        getRecordInfo(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.recordInfo = data
                if (data.equipmentTypeId === 1) {
                    this.firExtinguisherRecord = data.child
                } else if (data.equipmentTypeId === 2) {
                    this.fireHydrant = data.child
                }
            }
        })
    }

    recordResult() {
        recordResult().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.result = data
            }
        })
    }

    editRecord() {
        let param = {
            id: this.id
        }
        if (this.recordInfo.equipmentTypeId === 1) {
            this.recordInfo.child = this.firExtinguisherRecord
        } else if (this.recordInfo.equipmentTypeId === 2) {
            this.recordInfo.child = this.fireHydrant
        }
        let params = Object.assign(param, this.recordInfo)
        editRecord(params).then(res => {
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
