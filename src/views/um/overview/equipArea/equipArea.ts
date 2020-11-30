import { Component, Vue, Watch } from 'vue-property-decorator'
import BarChartNormal from '@/components/chart/chartComponent/chartComponent.vue'
import { Series, ChartBindData, ChartType } from '@/types/components/chart.interface'
import { getEquipArea } from '@/api/overview'

@Component({
    components: {
        BarChartNormal
    }
})
export default class About extends Vue {

    materialResourcesData:any = {
        id: 'equipAreaId',
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
                    color: '#00449B'
                }
            }]
        }
    }

    equipmentAreaData: Array<{ key: string, val: number }> = []

    @Watch('equipmentAreaData')
    watchData(newVal: any[]) {
        this.initMaterial()
    }

    mounted() {
        getEquipArea().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.equipmentAreaData = data
            }
        })
    }

    initMaterial() {
        let _series:any = []

        _series = {
            unit: '个',
            data: this.equipmentAreaData
        }

        this.materialResourcesData.data = {
            title: '',
            series: _series
        }

    }
    
}

