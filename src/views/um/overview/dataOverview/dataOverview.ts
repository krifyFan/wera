import { Component, Vue } from 'vue-property-decorator'
import GaugeChartNormal from '@/components/chart/chartComponent/chartComponent.vue'
import { Series, ChartBindData, ChartType } from '@/types/components/chart.interface'
import { getOverData } from '@/api/overview'

@Component({
    components: { GaugeChartNormal }
})
export default class About extends Vue {

    safeNum:number = 0

    failureRateData:any = {
        id: 'failureRateId',
        type: ChartType.GAUGECHART_NORMAL,
        data: {},
        option: {
            series: [{
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                title: {
                    offsetCenter: ['0%', '100%'],
                    color: '#7D8084',
                    fontWeight: 'bold',
                    fontSize: 24
                },
                detail: {
                    backgroundColor: '#429DF6',
                    color: '#ffffff'
                }
            }]
        }
    }

    vitalityIndexData: any = {
        id: 'vitalityIndexId',
        type: ChartType.GAUGECHART_NORMAL,
        data: {},
        option: {
            series: [{
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 10
                    }
                },
                title: {
                    offsetCenter: ['0%', '100%'],
                    color: '#7D8084',
                    fontWeight: 'bold',
                    fontSize: 24
                },
                detail: {
                    backgroundColor: '#429DF6',
                    color: '#ffffff'
                }
            }]
        } 
    }

    objBG: string = require('@/assets/images/available-bg.png')

    patrolTaskBG: string = require('@/assets/images/unavailable-bg.png')

    alarmBG: string = require('@/assets/images/orange.png')

    maintainBG: string = require('@/assets/images/sky-blue.png')

    alarmNum:number = 0

    measobjNum: number = 0

    patrolTaskNum: number = 0

    maintainTaskNum: number = 0

    mounted() {
        getOverData().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                data.forEach((ele: any) => {
                    if (ele.key === 'alarmCount') {
                        this.alarmNum = ele.val
                    } else if (ele.key === 'measobjCount') {
                        this.measobjNum = ele.val
                    } else if (ele.key === 'patrolTaskCount') {
                        this.patrolTaskNum = ele.val
                    } else if (ele.key === 'maintainTaskCount') {
                        this.maintainTaskNum = ele.val
                    } else if (ele.key === 'safeDay') {
                        this.safeNum = ele.val
                    } else if (ele.key === 'deviceFaultRate') {
                        this.initFailureRateData(ele.val)
                    } else if (ele.key === 'measobjOfflineRate') {
                        this.initVitalityIndex(ele.val)
                    }
                });
            }
        })
    }

    initFailureRateData(val: number) {
        let _series:any = []
        let _data = []
        _data.push({
            value: val,
            name: '故障率'
        })

        _series = {
            unit: '',
            data: _data
        }

        this.failureRateData.data = {
            title: '',
            series: _series
        }

    }

    initVitalityIndex(val: number) {
        let _series:any = []
        let _data = []
        _data.push({
            value: val,
            name: '离线率'
        })

        _series = {
            unit: '',
            data: _data
        }

        this.vitalityIndexData.data = {
            title: '',
            series: _series
        }
    }
    
}
