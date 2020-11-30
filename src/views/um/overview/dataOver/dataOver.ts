import { Component, Vue } from 'vue-property-decorator'
import GaugeChartNormal from '@/components/chart/chartComponent/chartComponent.vue'
import { Series, ChartBindData, ChartType } from '@/types/components/chart.interface'
import { getDataOvervide } from '@/api/wzroverview'

@Component({
    components: { GaugeChartNormal }
})
export default class About extends Vue {

    safeNum:number = 10

    currentIndex: number = 0

    // items: any[] = [
    //     { name: '当前' },
    //     { name: '近一周' },
    //     { name: '近一月' }
    // ]

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

    InclinationData: any = {
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

    tempRateData: any = {
        id: 'tempRateId',
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

    humidityData: any = {
        id: 'hudimityId',
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

    avaiableBG: string = require('@/assets/images/available-bg.png')

    unavailableBG: string = require('@/assets/images/unavailable-bg.png')

    availableNum:number = 0

    alarmNum: number = 0

    onlineNum: number = 0

    offlineNum: number = 0

    mounted() {
        this.initVitalityIndex(99)
        getDataOvervide(Number(localStorage.getItem('areaId'))).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                data.map((item: any) =>{
                    switch(item.key) {
                        case 'failureRate': 
                            this.initFailureRateData(item.val)
                            this.initTemp(item.val)
                            this.initHudimity(item.val)
                            break;
                        case 'linkEqu':
                            this.availableNum = item.val
                            break;
                        case 'noLinkEqu':
                            this.unavailableNum = item.val
                            break;
                    }
                })
            }
        })
    }

    choosedCurrent(index: number) {
        this.currentIndex = index
    }

    initFailureRateData(val: number) {
        let _series:any = []
        let _data = []
        _data.push({
            value: val,
            name: '物理资源故障率'
        })

        _series = {
            unit: '%',
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
            name: '倾斜度'
        })

        _series = {
            unit: '',
            data: _data
        }

        this.InclinationData.data = {
            title: '',
            series: _series
        }
    }

    initTemp(val: number) {
        let _series:any = []
        let _data = []
        _data.push({
            value: val,
            name: '温度'
        })

        _series = {
            unit: '',
            data: _data
        }

        this.tempRateData.data = {
            title: '',
            series: _series
        }
    }

    initHudimity(val: number) {
        let _series:any = []
        let _data = []
        _data.push({
            value: val,
            name: '湿度'
        })

        _series = {
            unit: '',
            data: _data
        }

        this.humidityData.data = {
            title: '',
            series: _series
        }
    }
    
}

