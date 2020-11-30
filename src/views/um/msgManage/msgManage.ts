import { Component, Vue } from 'vue-property-decorator'
import { Page } from '@/types/views/common.interface'
import { getMsgList } from '@/api/msgManage'
import { Alarm } from '@/types/views/alarm.interface'
import { listAlarmDatagrid, getAlarmById, editAlarm, clearAlram, ackedAlram } from '@/api/alarmManage'

@Component({})
export default class About extends Vue {

    type: any[] = [
        { key: '维保任务', val: 1 },
        { key: '巡检任务', val: 2 },
        { key: '告警消息', val: 3 }
    ]

    msgColumns = [
        {
            type: 'index',
            align: 'center',
            width: '60'
        },
        {
            title: '消息类别',
            key: 'type',
            align: 'center',
            render: (h: any, params: any) => {
                let temp = ''
                if (params.row.type === 1) {
                    temp = '维保任务'
                } else if (params.row.type === 2) {
                    temp = '巡检任务'
                }else if (params.row.type === 3) {
                    temp = '告警消息'
                }
                return h('div', temp)
            }
        },
        {
            title: '设备编号',
            key: 'equipmentSn',
            align: 'center',
            render: (h: any, params: any) => {
                return h('div',params.row.data.equipmentSn)
            }
        },
        {
            title: '设备名称',
            key: 'equipmentName',
            align: 'center',
            render: (h: any, params: any) => {
                return h('div',params.row.data.equipmentName)
            }
        },
        {
            title: '操作',
            align: 'center',
            width: 200,
            render: (h: any, params: any) => {
                if (params.row.type === 1) {
                    return h('div', [
                        h('Button', {
                            props: {
                                size: 'small',
                                type: 'primary'
                            },
                            on: {
                                click: () => {
                                    this.goToModule("Edit", params.row.id, params.row.type)
                                }
                            }
                        }, '任务详情')
                    ])
                } else if (params.row.type === 3) {
                    return h('div', [
                        h('Button', {
                            props: {
                                size: 'small',
                                type: 'primary'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: ()=> {
                                    this.getAlarmInfo(params.row.id)
                                }
                            },
                        }, '详情'),
                        h('Button', {
                            props: {
                                size: 'small',
                                type: 'info'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.showAcked(params.row.id)
                                }
                            }
                        }, '确认'),
                        h('Button', {
                            props: {
                                size: 'small',
                                type: 'error'
                            },
                            on: {
                                click: () => {
                                    this.toClearedAlarm(params.row.id)
                                }
                            }
                        }, '清除')
                    ])
                }
             }
        }
    ]

    msgData: any[] = []

    pageName:string = ''

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
        this.getMsgList()
    }

    getMsgList() {
        let areaId = Number(localStorage.getItem('areaId'))
        getMsgList(areaId).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.msgData = data
            }
        })
    }

    goToModule(pageType: string, id: any, type: any) {
        if (type === 1) {
            this.pageName = '添加维保记录'
        } else if (type === 2) {
            this.pageName = ''
        }
        this.$router.push({
            name: this.pageName,
            params: {
                id: id,
                type: pageType,
                msgType: type,
                from: 'task'
            }
        })
    }

    getAlarmInfo(id: number) {
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
                this.getMsgList()
            } else {
                this.$Message.error('告警确认失败！')
            }
        })
    }
}