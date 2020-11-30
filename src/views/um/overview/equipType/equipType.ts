import { Component, Vue, Watch } from 'vue-property-decorator'
import PieChartNormal from '@/components/chart/chartComponent/chartComponent.vue'
import { Series, ChartBindData, ChartType } from '@/types/components/chart.interface'
import { getEquipType } from '@/api/overview'

@Component({
    components: { PieChartNormal }
})
export default class About extends Vue {

    equipmentTypeChartData: any = {
        id: 'equipTypeId',
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
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [
                {
                    roseType: 'radius',
                    center: ['40%', '50%'],
                    label: {
                        color: 'black'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'black'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx: any) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
    }

    equipmentTypeData: any[] = []

    @Watch('equipmentTypeData')
    watchEquipmentTypeData(newVal: any[]) {
        this.initEquipTypePieChart()
    }
    
    mounted() {
        this.initEquipTypeData()
    }

    initEquipTypePieChart() {

        let series:Series[] = []

        series.push({
            name: '各类设备',
            unit: '个',
            data: this.equipmentTypeData
        })

        this.equipmentTypeChartData.data = {
            title: '',
            series: series
        }
        
    }

    initEquipTypeData() {
        getEquipType().then(res => {
            let { code, data } =  res.data
            if (code === 200) {
                this.equipmentTypeData = data
            }
        })
        // this.storeData = [
        //     { key: 'A区', value: 80 },
        //     { key: 'B区', value: 65 },
        //     { key: 'C区', value: 69 },
        //     { key: 'D区', value: 48 },
        //     { key: '0区', value: 76 },
        //     { key: '1区', value: 32 }
        // ]
        this.equipmentTypeData.sort(function (a, b) { return a.value - b.value; })
    }
    
}
