<template>
    <div class="pieChart_normal-wrap" :id="id" ref="element"></div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
        Watch
    } from "vue-property-decorator"
    import {
        ChartData,
        Series
    } from "@/types/components/chart.interface"
    import {
        EChartOption,
        ECharts
    } from 'echarts'

    @Component({})
    export default class About extends Vue {

        @Prop({
            required: true,
            default: '1'
        }) id!: string

        @Prop({
            required: true
        }) data!: ChartData

        @Prop({
            required: false,
            default: null
        }) option!: EChartOption

        myChart!: ECharts

        @Watch('data', {
            deep: true
        })
        onDataChanged(val: ChartData, oldVal: ChartData) {
            this.initData()
            this.drawChart()
        }

        mounted() {
            if ((this.data.series as any).length !== 0) {
                console.log('data', this.data)
                this.initData()
                this.drawChart()
                this.resizeChart()

            }
        }

        initData() {
            this.myChart = (this as any).$echarts.init(document.getElementById(this.id))
            // 初始化的样式
            let theme = (this as any).EChartsTheme
            let constFontSize: string = '9%'
            let legendFontSize: string = '7%'
            let initOption: EChartOption = {
                title: {
                    textStyle: {
                        color: theme.titleColor,
                        fontSize: this.getFontSize('9%')
                    },
                    left: 'center'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
					itemGap: 2,
					itemWidth: this.getFontSize(legendFontSize) * 2,
					itemHeight: this.getFontSize(legendFontSize),
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [{
                    type: 'pie',
                    radius: '50%',
                    data: []
                }],
                color: theme.color
            }
            this.myChart.setOption(initOption)

            // 将外部传来的样式导入
            if (this.option != null) {
                this.myChart.setOption(this.option)
            }
        }

        drawChart() {
            this.myChart.showLoading()
            // 整合数据
            let series: Series[] = this.data.series as Series[]
            if (!series) return
            if (series[0].data.length === 0) return

            // 整理数据
            let _series: EChartOption.SeriesPie[] = []
            let data: EChartOption.SeriesPie.DataObject[] = []
            let _legends: string[] = []
            series[0].data.forEach(element => {
                data.push({
                    name: element.key,
                    value: element.value
                })
                _legends.push(element.key)
            })
            _series.push({
                name: series[0].name,
                type: 'pie',
                data: data
            })


            // 获得最终option
            let _option: EChartOption = {
                title: {
                    show: this.data.title.length > 0,
                    text: this.data.title
                },
                legend: {
                    data: _legends
                },
                series: _series
            }

            this.myChart.setOption(_option)
            if (this.option) this.myChart.setOption(this.option)
            this.myChart.hideLoading()
        }

        resizeChart() {
            let _this = this;
            window.addEventListener("resize", () => {
                _this.myChart.resize();
                _this.drawChart();
            });
        }

        /**
         * 获取字体大小
         */
        getFontSize(val: number | string): number {
            return Math.min(this.getSizeByWidth(val), this.getSizeByHeight(val))
        }

        /**
         * 根据element的宽度获取百分比
         */
        getSizeByWidth(val: number | string): number {
            if (typeof val === "number") return val;
            if (typeof val === "string") {
                if (val.indexOf("%") > 0) {
                    let tmp = parseFloat(val.replace("%", "")) / 100;
                    let height = (this.$refs.element as HTMLElement).offsetWidth;
                    return Math.round(height * tmp);
                }
            }
            return 0;
        }

        /**
         * 根据element的高度度获取百分比
         */
        getSizeByHeight(val: number | string): number {
            if (typeof val === "number") return val;
            if (typeof val === "string") {
                if (val.indexOf("%") > 0) {
                    let tmp = parseFloat(val.replace("%", "")) / 100;
                    let height = (this.$refs.element as HTMLElement).offsetHeight;
                    return Math.round(height * tmp);
                }
            }
            return 0;
        }

    }
</script>

<style lang="less">
    .pieChart_normal-wrap {
        height: 100%;
        width: 100%;
    }
</style>

