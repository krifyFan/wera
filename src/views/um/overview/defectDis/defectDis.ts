import { Component, Vue, Watch } from 'vue-property-decorator'
import PieChartNormal from '@/components/chart/chartComponent/chartComponent.vue'
import { Series, ChartBindData, ChartType } from '@/types/components/chart.interface'
import { getDefect } from '@/api/overview'

@Component({
    components: { PieChartNormal }
})
export default class About extends Vue {

    storeProData: any = {
        id: 'defectDisId',
        type: ChartType.PIECHART_NORMAL,
        data: {
            title: '',
            series: []
        },
        option: {
            legend: {
                right: 10,
                top: 10
            },
            series: [
                {
                    center: ['40%', '50%'],
                    radius: ['50%', '70%'],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                }
            ]
        }
    }

    storeData: any[] = []

    @Watch('storeData')
    watchStoreData(newVal: any[]) {
        this.initStorePieChart()
    }
    
    mounted() {
        this.initDefectData()
    }

    initStorePieChart() {

        let series:Series[] = []

        series.push({
            name: '缺陷分布',
            unit: '个',
            data: this.storeData
        })

        this.storeProData.data = {
            title: '',
            series: series
        }
        
    }

    initDefectData() {
        getDefect().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                data.forEach((ele: { key: string, val: number }) => {
                    let temp = {
                        key: ele.key,
                        value: ele.val
                    }
                    this.storeData.push(temp)
                });
            }
        })
    }
    
}

