import { Component, Vue } from 'vue-property-decorator'
import BarChartNormal from '@/components/chart/chartComponent/chartComponent.vue'
import { Series, ChartBindData, ChartType } from '@/types/components/chart.interface'

@Component({
    components: {
        BarChartNormal
    }
})
export default class About extends Vue {

    materialResourcesData:any = {
        id: 'materialResourcesId',
        type: ChartType.BARCHART_NORMAL,
        data: {},
        option: {
            grid: {
                top: '15%',
                left: '10%',
                right: '4%',
                bottom: '20%'
            },
            xAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
                axisLabel: {
                    color: '#333'
                }
            },
            yAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
                axisLabel: {
                    color: '#333'
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:false
                }
            },
            series: [{
                itemStyle: {
                    color: '#0d6f42'
                }
            }]
        }
    }

    mounted() {
        this.initMaterial()
    }

    initMaterial() {
        let _series:any = []
        let _data = [
            { key: 'A区', value: 80 },
            { key: 'B区', value: 65 },
            { key: 'C区', value: 69 },
            { key: 'D区', value: 48 },
            { key: '0区', value: 76 },
            { key: '1区', value: 32 }
        ]

        _series = {
            unit: '个',
            data: _data
        }

        this.materialResourcesData.data = {
            title: '',
            series: _series
        }

    }
    
}
