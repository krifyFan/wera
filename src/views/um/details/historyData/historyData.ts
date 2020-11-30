import { Component, Vue, Watch } from 'vue-property-decorator'
import LineChartMultiple from '@/components/chart/chartComponent/chartComponent.vue'
import { Series, ChartBindData, ChartType } from '@/types/components/chart.interface'
import { getHisData } from '@/api/dataManage'

@Component({
    components: { LineChartMultiple }
})
export default class About extends Vue {

    historyLineData: any = {
        id: 'historyLineDataId',
        type: ChartType.LINECHART_MULTIPLE,
        data: {
            title: '',
            series: []
        },
        option: {
            title: {
                textStyle: {
                    fontSize: 30
                }
            },
            grid: {
                top: '10%',
                left: '5%',
                right: '5%',
                bottom: '5%'
            },
            legend: {
                left: 'right',
                top: '2%',
                textStyle: {
                    fontSize: 16
                },
                itemGap: 2,
                itemWidth: 32,
                itemHeight: 16,
            },
            xAxis: {
                axisLabel: {
                    fontSize: 16,
                    color: '#000'
                },
                axisLine: {
                    lineStyle: {
                        color: '#000'
                    }
                },
                splitLine: {
                    show:true,
                    // lineStyle: {
                    //     color: '#000'
                    // }
                }
            },
            yAxis: {
                nameTextStyle: {
                    fontSize: 16,
                    color: '#000'
                },
                axisLabel: {
                    fontSize: 16,
                    color: '#000'
                },
                axisLine: {
                    lineStyle: {
                        color: '#000'
                    }
                },
            }
        }
    }

    lineData = [
        // {
        //     key: '温度',
        //     val: [
        //         { key: '2020-01-10', val: 120 },
        //         { key: '2020-02-10', val: 132 },
        //         { key: '2020-03-10', val: 101 },
        //         { key: '2020-04-10', val: 134 },
        //         { key: '2020-05-10', val: 90 },
        //         { key: '2020-06-10', val: 230 },
        //         { key: '2020-07-10', val: 210 },
        //     ]
        // },
        // {
        //     key: '湿度',
        //     val: [
        //         { key: '2020-01-10', val: 220 },
        //         { key: '2020-02-10', val: 182 },
        //         { key: '2020-03-10', val: 191 },
        //         { key: '2020-04-10', val: 234 },
        //         { key: '2020-05-10', val: 290 },
        //         { key: '2020-06-10', val: 330 },
        //         { key: '2020-07-10', val: 310}
        //     ]
        // }
    ]

    times: any[] = [
        { id: 1, name: '近一天' },
        { id: 2, name: '近一周' },
        { id: 3, name: '自定义' }
    ]

    choosedTimeType: number = 1
    startTime:Date | null = new Date(new Date().getTime()-(1000*60*60*24))
    endTime:Date | null = new Date()

    ids: number[] = []

    created() {
        this.$route.params.ids.split(',').forEach((id: string) => 
            this.ids.push(Number(id))
        )
    }

    @Watch('lineData')
    watchLineData(newVal: any[]) {
        if (newVal.length !== 0) {
            this.initLineMixChart(newVal)
        }
    }

    mounted() {
        this.choosedTime(1)
        this.initData()
    }

    initLineMixChart(data: any[]) {
        console.log("data", data);
        
        if (data.length == 0) return

        let _series: Series[] = []

        data.forEach((element: { key: string, val: Array<{ key: string, val: number }> }) => {
            _series.push({
                name: element.key,
                unit: '个',
                data: []
            })
            element.val.forEach(item1 => {
                _series.forEach(item => {
                    if (element.key === item.name) {
                        item.data.push({
                            key: item1.key,
                            value: item1.val
                        })
                    }
                })
            })
        });

        this.historyLineData.data = {
            title: '历史数据',
            series: _series
        }
    }

    choosedTime(id: number) {
        let day = 1000*60*60*24
        if (id === 1) {
            this.startTime = new Date(new Date().getTime()-day)
            this.endTime = new Date()
        } else if (id === 2) {
            this.startTime = new Date(new Date().getTime()-day*7)
            this.endTime = new Date()
        } else {
            this.startTime = null
            this.endTime = null
        }
        this.choosedTimeType = id
    }

    initData() {
        let params = {
            ids: this.ids,
            startTime: this.startTime,
            endTime: this.endTime
        }
        getHisData(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.lineData = data
            }
        })
    }
}
