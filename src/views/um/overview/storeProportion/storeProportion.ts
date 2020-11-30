import { Component, Vue, Watch } from 'vue-property-decorator'
import PieChartNormal from '@/components/chart/chartComponent/chartComponent.vue'
import { Series, ChartBindData, ChartType } from '@/types/components/chart.interface'
import { getStoreProportion } from '@/api/wzroverview'

@Component({
    components: { PieChartNormal }
})
export default class About extends Vue {

    storeProData: any = {
        id: 'storeProId',
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
            series: [{
                center: ['40%', '50%']
            }]
        }
    }

    storeData: any[] = []

    @Watch('storeData')
    watchStoreData(newVal: any[]) {
        this.initStorePieChart()
    }
    
    mounted() {
        this.initStoreProData()
    }

    initStorePieChart() {

        let series:Series[] = []

        series.push({
            name: '不同仓位占比',
            unit: '个',
            data: this.storeData
        })

        this.storeProData.data = {
            title: '',
            series: series
        }
        
    }

    initStoreProData() {
        getStoreProportion().then(res => {
            let { code, data } =  res.data
            if (code === 200) {
                this.storeData = data
            }
        })
    }
    
}
