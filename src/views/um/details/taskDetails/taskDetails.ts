import { Component, Vue } from 'vue-property-decorator'
import { Task } from '@/types/views/patrol.interface'
import { getTaskInfo, editTaskInfo } from '@/api/taskManage'

@Component({})
export default class About extends Vue {

    pageTitle: string = '新增巡检任务'

    pageType:string = 'Add'

    id: number = 0

    mergeOptions: Array<{ key: string, val: number }> = [
        { key: '是', val: 1 },
        { key: '否', val: 0 }
    ]

    taskInfo:Task = {
        planName: null,
        responsibleId: null,
        startTime: null,
        endTime: null, 
        description: null,
        isMerge: null
    }

    responsible:string = ''

    created() {
        this.pageType = this.$route.params.type
        if (this.pageType==='Read') {
            this.pageTitle = '巡检任务详情'
            this.id = Number(this.$route.params.id)
        } else if (this.pageType==='Edit') {
            this.pageTitle = '编辑巡检任务'
            this.id = Number(this.$route.params.id)
        } else {
            this.pageTitle = '新增巡检任务'
        }
    }

    mounted() {
        if (this.pageType !== 'Add') {
            this.getTaskInfo(this.id)
        }
    }

    getTaskInfo(id: number) {
        getTaskInfo(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.taskInfo = data
                this.responsible = data.responsible
                if (data.isMerge === false) {
                    this.taskInfo.isMerge = 0
                } else {
                    this.taskInfo.isMerge = 1
                }
            }
        })
    }

    editTask() {
        let param = {
            id: this.id
        }
        this.taskInfo.startTime = new Date(this.taskInfo.startTime as Date).getTime()
        this.taskInfo.endTime = new Date(this.taskInfo.endTime as Date).getTime()
        let params = Object.assign(param, this.taskInfo)
        editTaskInfo(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('修改成功！')
                this.back()
            } else {
                this.$Message.error('修改失败！')
            }
        })
    }

    addTask() {
        
    }
    
}
