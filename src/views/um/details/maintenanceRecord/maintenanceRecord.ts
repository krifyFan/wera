import { Component, Vue, Watch } from 'vue-property-decorator'
import { recordInfo } from '@/types/views/maintenance.interface'
import { addRecord, queryEquipSn, getReord, editRecord } from '@/api/maintenanceManage'
import pdf from 'vue-pdf'
import { getTaskInfo, editTask } from '@/api/maintainTask'
import _ from 'lodash'

@Component({
    components: { pdf }
})
export default class About extends Vue {

    pageTitle: string = '维保记录详情'

    recordInfo: recordInfo = {
        equipmentId: null,
        maintainTime: null,
        status: null,
        liablePerson: null,
        maintainPerson: null,
        maintainFirm: null,
        maintainPhone: null,
        maintainFile: null,
        description: null,
        isFinish: 0,
        finishTime: null
    }

    equipmentSns: any[] = []

    equipmentSn:string = ''

    equipmentName: string = ''

    isShowEquip: boolean = false

    pageType: string = 'Read'

    id:number = -1

    recordId: number = -1

    status: any[] = [
        { key: '正常', val: 1 },
        { key: '待维修', val: 2 },
        { key: '损坏', val: 3 }
    ]

    addArr: any[] = []

    pdfSrc:string = ''

    file: any = {
        editInit: false,
        uploadParam: null,
        src: null,
        typeFlag: false,
        curPage: 0,
        totalPage: 0
    }

    fromPage:string = 'record'

    @Watch('pageType')
    watchPageType(newVal: string ) {
        if (newVal === 'Read') {
            this.pageTitle = '维保记录详情'
        } else if (newVal === 'Edit' && this.$route.params.from === 'record') {
            this.pageTitle = '修改维保记录'
        } else if (newVal === 'Edit' && this.$route.params.from === 'task') {
            this.pageTitle = '完成维保任务'
        } else {
            this.pageTitle = '添加维保记录'
        }
    }

    created() {
        this.pageType = this.$route.params.type
        if (!!this.$route.params.id && this.$route.params.from === 'task'){
            this.fromPage = this.$route.params.from
            this.id = Number(this.$route.params.id)
            this.getTaskInfo(this.id)
        } else if (!!this.$route.params.id && this.$route.params.from === 'record') {
            this.fromPage = this.$route.params.from
            this.id = Number(this.$route.params.id)
            this.getRecordDetails()
        }
    }

    uploadUrl: string = ''

    timer: any

    searchEquipId: any

    mounted() {
        this.uploadUrl = this.serve.ApiUrl + '/common/upload'
        // 防抖
        let self = this
        this.searchEquipId = _.debounce(function(){
            self.isShowEquip = true
            let params = {
                equipmentSn: self.equipmentSn
            }
            queryEquipSn(params).then(res => {
                let { code, data } = res.data
                if (code === 200) {
                    self.equipmentSns = data
                }
            })
        }, 200)
    }


    choosedEquipId(id: number, Sn: string, name: string) {
        this.recordInfo.equipmentId = id
        this.equipmentSn = Sn
        this.isShowEquip = false
        this.equipmentName = name
    }
    // 添加维保记录
    addRecord() {
        this.recordInfo.maintainTime = new Date((this.recordInfo.maintainTime) as Date).getTime()
        this.recordInfo.finishTime = new Date((this.recordInfo.finishTime) as Date).getTime()
        addRecord(this.recordInfo).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('添加成功！')
                this.$router.push({
                    name: '维保管理'
                })
            } else {
                this.$Message.error('添加失败！')
            }
        })
    }
    // 通过维保记录ID获取记录详情
    getRecordDetails() {
        getReord(this.id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.recordInfo = data
                this.recordId = data.id
                this.equipmentSn = data.equipmentSn
                this.equipmentName = data.equipmentName
                this.pdfSrc = pdf.createLoadingTask(data.maintainFile)
            }
        })
    }
    // 通过维保任务id获取维保记录详情
    getTaskInfo(id: number) {
        getTaskInfo(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                if (data.maintainRecord === null) {
                    this.recordInfo = data
                } else {
                    this.recordInfo = data.maintainRecord
                    this.recordInfo.maintainTime = data.maintainTime
                }
                this.equipmentSn = data.equipmentSn
                this.equipmentName = data.equipmentName
                this.pdfSrc = pdf.createLoadingTask(data.maintainFile)
            }
        })
    }
    // 修改维保记录
    editRecord() {
        let id = {
            id: this.recordId
        }
        this.recordInfo.maintainTime = new Date((this.recordInfo.maintainTime) as Date).getTime()
        this.recordInfo.finishTime = new Date((this.recordInfo.finishTime) as Date).getTime()
        let params = Object.assign(id, this.recordInfo)
        editRecord(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('修改成功！')
                this.$router.push({
                    name: '维保管理'
                })
            } else {
                this.$Message.error('修改失败！')
            }
        })
    }
    // 提交维保任务
    submitTask() {
        let params = {
            taskId: this.id,
            description: this.recordInfo.description,
            equipmentId: this.recordInfo.equipmentId,
            equipmentName: this.equipmentName,
            equipmentSn: this.equipmentSn,
            finishTime: new Date(this.recordInfo.finishTime as Date).getTime(),
            isFinish: true,
            liablePerson: this.recordInfo.liablePerson,
            maintainFirm: this.recordInfo.maintainFirm,
            maintainPerson: this.recordInfo.maintainPerson,
            maintainPhone: this.recordInfo.maintainPhone,
            maintainTime: new Date(this.recordInfo.maintainTime as Date).getTime(),
            status: this.recordInfo.status
        }
        addRecord(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('提交成功！')
                this.$router.push({
                    name: '维保任务'
                })
            } else {
                this.$Message.error('提交失败！')
            }
        })
    }
    // 文件上传成功
    fileSuccess(response: any){
        if (response.code === 200) {
            this.recordInfo.maintainFile = response.data
            this.$Message.success('文件上传成功！')
            let src = this.serve.ApacheUrl + '/maxware/file/' + response.data
            this.pdfSrc = pdf.createLoadingTask(src)
        }
    }
    // 文件上传失败
    fileError(error: any) {
        console.log(error)
        this.$Message.error('文件上传失败！')
    }
    //文件上传
    getFile(event: any){
        let file = event.target.files;
        for(let i = 0;i<file.length;i++){
        //    上传类型判断
            let imgName = file[i].name;
            let idx = imgName.lastIndexOf(".");  
            if (idx != -1){
                let ext = imgName.substr(idx+1).toUpperCase();   
                ext = ext.toLowerCase( ); 
                    if (ext!='pdf' && ext!='doc' && ext!='docx'){
                    
                }else{
                    this.addArr.push(file[i]);
                }   
            }else{

            }
        }
    }
    // pdf翻页
    changePdfPage(val: number) {
        if (val === 0 && this.file.curPage > 1) {
            this.file.curPage--;
        }
        if (val === 1 && this.file.curPage < this.file.totalPage) {
            this.file.curPage++;
        }
    }

    loadPdfHandler(e: any) {
        this.file.curPage = 1;
    }
    
}
