import { Component, Vue, Watch } from 'vue-property-decorator'
import { maintainTask } from '@/types/views/maintenance.interface'
import { getTaskInfo } from '@/api/maintainTask'

@Component({})
export default class About extends Vue {

    pageTitle:string = '维保任务详情'

    id:number = 0

    taskInfo: maintainTask = {
        equipmentSn: null,
        equipmentName: null,
        maintainTime: null,
        liablePerson: null,
        liablePersonPhone:  null,
        isFinish: null,
        finishTime: null,
    }

    @Watch('pageType')
    watchPageType(newVal: string) {
        if (newVal === 'Read') {
            this.pageTitle = '维保任务详情'
        } else if(newVal === 'Edit') {
            this.pageTitle = '提交维保任务'
        }
    }

    created() {
        this.pageType = this.$route.params.pageType
        if (!!this.$route.params.id) {
            this.id = Number(this.$route.params.id)
            this.getTaskInfo(this.id)
        }
    }

    mounted() {
        //
    }
    
    getTaskInfo(id: number) {
        getTaskInfo(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.taskInfo = data
            }
        })
    }
    
}

