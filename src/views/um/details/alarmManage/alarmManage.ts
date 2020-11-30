import { Component, Vue } from 'vue-property-decorator'
import { Alarm } from '@/types/views/alarm.interface'
import { Page } from '@/types/views/common.interface'
import { listAlarmDatagrid, getAlarmById, editAlarm, clearAlram, ackedAlram } from '@/api/alarmManage'

@Component({})
export default class About extends Vue {

    alarmColumns: any[] = [
        {
            type: 'index',
            align: 'center',
            width: '60'
        },
        {
            title: '设备名称',
            key: 'equipmentName',
            align: 'left'
        },
        {
            title: '报警时间',
            key: 'alarmDatetime',
            align: 'center',
            render: (h: any, param: any) => {
                return h('div', new Date(param.row.alarmDatetime).format('yyyy-MM-dd hh:mm:ss'))
            }
        },
        {
            title: '报警类型',
            key: 'alarmTypeName',
            align: 'center',
            render: (h: any, param: any) => {
                return h('div', param.row.alarmTypeName)
            }
        },
        {
            title: '报警级别',
            key: 'alarmSeverity',
            align: 'center',
            render: (h: any, param: any) => {
                let temp = ''
                switch (param.row.alarmSeverity) {
                    case 0: 
                        temp = '正常'
                        break;
                    case 1: 
                        temp = '提示'
                        break;
                    case 2:
                        temp = '一般'
                        break;
                    case 3:
                        temp = '严重'
                        break;  
                    case 4: 
                        temp = '危急'
                        break;      
                    default: 
                        temp = '失联'
                        break;
                }
                return h('div', temp)

            }
        },
        // {
        //     title: '信息',
        //     key: 'description',
        //     align: 'center'
        // },
        {
            title: '是否清除',
            key: 'cleared',
            align: 'center',
            render: (h: any, param: any) => {
                let temp = ''
                if (param.row.cleared) {
                    temp = '是'
                } else {
                    temp = '否'
                }
                return h('div', temp)
            }
        },
        {
            title: '清除人',
            key: 'clearUser',
            align: 'center'
        },
        {
            title: '清除时间',
            key: 'clearedTime',
            align: 'center',
            render: (h: any, param: any) => {
                let temp = ''
                if (param.row.clearedTime !== null) {
                    temp = new Date(param.row.clearedTime).format('yyyy-MM-dd hh:mm:ss')
                } else {
                    temp = '-'
                }
                return h('div', temp)
            }
        },
        {
            title: '是否确认',
            key: 'acked',
            align: 'center',
            render: (h: any, param: any) => {
                let temp = ''
                if (param.row.acked) {
                    temp = '已确认'
                } else {
                    temp = '未确认'
                }
                return h('div', temp)
            }
        },
        {
            title: '操作',
            align: 'center',
            width: 200,
            render: (h: any, param: any) => {
                return h('div',[
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small',
                            disabled: param.row.cleared === true
                        },
                        on: {
                            click: (event: any) => {
                                event.stopPropagation();
                                this.toClearedAlarm(param.row.id)
                            }
                        }
                    }, '清除'),
                    h('Button', {
                        style: {
                            marginLeft: '10px',
                        },
                        props: {
                            type: 'warning',
                            size: 'small',
                            disabled: param.row.acked === true
                        },
                        on: {
                            click: (event: any) => {
                                event.stopPropagation();
                                this.showAcked(param.row.id);
                            }
                        }
                    }, '确认')
                ])
            }
        }
    ]

    type: any[] = [
        { key: '提示', val: 1 },
        { key: '故障', val: 2 },
        { key: '失联', val: 3 }
    ]

    alarmData: Array<Alarm> = []

    page: Page = {
        pageTotal: 0,
        pageSize: 10,
        pageNum: 1
    }

    isShow: boolean = false
    isAckedShow: boolean = false;

    alarmForm: Alarm = {
        id: null,
        alarmTypeId: -1,
        alarmSeverity: -1,
        alarmTypeName: '',
        objId: -1,
        objName: '',
        objTypeId: -1,
        equipmentId: -1,
        equipmentName: '',
        equipmentSn:'',
        acked: false,
        ackUser: '',
        ackTime: null,
        ackResult: -1,
        ackDesc: '',
        alarmSource: '',
        longitude: null,
        latitude: null,
        cleared: false,
        clearUser: '',
        clearedTime: null,
        alarmDatetime: null,
        description: ''
    }
    

    mounted() {
        this.listAlarmDatagrid()
    }

    listAlarmDatagrid() {
        let params = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            areaId: Number(localStorage.getItem('areaId'))
        }
        listAlarmDatagrid(params).then(res => {
            let { code, data, msg } = res.data
            if (code === 200) {
                this.alarmData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.listAlarmDatagrid()
    }

    handlePageSize(value: number) {
        this.page.pageSize = value
        this.listAlarmDatagrid()
    }

    getAlarmInfo(data: any) {
        var id = data.id;
        getAlarmById(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.alarmForm = data
                let temp = '';
                switch (this.alarmForm.alarmSeverity) {
                    case 0: 
                        temp = '正常'
                        break;
                    case 1: 
                        temp = '提示'
                        break;
                    case 2:
                        temp = '一般'
                        break;
                    case 3:
                        temp = '严重'
                        break;  
                    case 4: 
                        temp = '危急'
                        break;      
                    default: 
                        temp = '失联'
                        break;
                }
                this.alarmForm.alarmSeverity = temp;
            }
        })
        this.isShow = true
    }

    //清除告警
    toClearedAlarm(id: number) {
        clearAlram(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('告警清除成功！')
                this.listAlarmDatagrid()
            } else {
                this.$Message.error('告警清除失败！')
            }
        })
    }

    //显示确认弹框
    showAcked(id: number){
        this.isAckedShow = true;
        this.alarmForm.id = id;
    }

    //提交确认
    submitAckedAlarm() {
        let param = {
            id: this.alarmForm.id,
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
                this.listAlarmDatagrid()
            } else {
                this.$Message.error('告警确认失败！')
            }
        })
    }
   
   // 返回 
   goback(){
      this.isShow = false
   }

  
    
}
