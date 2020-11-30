import { Component, Vue } from 'vue-property-decorator'
import { getAlarm, getTask } from '@/api/overview'
import { ackedAlram, clearAlram } from '@/api/alarmManage'

@Component({})
export default class About extends Vue {

    alarmInfo: any[] = []

    taskInfo: any[] = []

    ackResultOption: Array<{ key: string, val: number }> = [
        { key: '正常告警', val: 11 },
        { key: '系统误报', val: 12 },
        { key: '无法确认', val: 13 }
    ]

    alarmForm: any = {
        ackResult: null,
        ackDesc: null
    }

    alarmId: number | null = null

    isAckedShow:boolean = false

    mounted() {
        this.initAlarm()
        this.initTask()
    }

    initAlarm() {
        getAlarm().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.alarmInfo = data
            }
        })
    }

    initTask() {
        getTask().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.taskInfo = data
            }
        })
    }

    checkAlarm(id: number) {
        this.isAckedShow = true
        this.alarmId = id
    }

    //提交确认
    submitAckedAlarm() {
        let param = {
            id: this.alarmId,
            acked: true,
            // ackTime: new Date(),
            ackResult: this.alarmForm.ackResult,
            ackDesc: this.alarmForm.ackDesc,
        }
        ackedAlram(param).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('告警确认成功！'),
                this.isAckedShow = false,
                this.initAlarm()
            } else {
                this.$Message.error('告警确认失败！')
            }
        })
    }

    //清除告警
    toClearedAlarm(id: number) {
        clearAlram(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('告警清除成功！')
                this.initAlarm()
            } else {
                this.$Message.error('告警清除失败！')
            }
        })
    }

    //处理保养任务
    goToModule(id: any) {
        this.$router.push({
            name: '添加维保记录',
            params: {
                type: 'Edit',
                id: id,
                from: 'task'
            }
        })
    }
    
}
