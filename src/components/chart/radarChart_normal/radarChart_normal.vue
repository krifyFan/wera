<template>
    <div class="radarChart_normal-wrap" :id="id" ref="element"></div>
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
        Series,
        RadarData,
        RadarIndicator
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
            this.drawChart()
        }

        mounted() {
            this.resizeChart()
            this.initData()
            this.drawChart()
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
                tooltip: {
                    trigger: 'axis'
                },
                radar: [
                    {
                        center: ['50%', '55%'],
                        radius: this.getSizeByHeight('30%')
                    }
                ],
                series: [
                    {
                        type: 'radar',
                        itemStyle: {
                            normal: {
                                areaStyle: {type: 'default'}
                            },
                            color: theme.titleColor
                        }
                    }
                ],
                textStyle: {
                    color: theme.textColor
                },
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
            let series: Series = this.data.series as Series
            if (!series) return

            // 整理数据
            let data: RadarData[] = []
            let seriesData: number[] = []
            let _radar: RadarIndicator [] = []
            let maxValue!: number
            series.data.forEach(element => {
                seriesData.push(element.value)
                maxValue = seriesData.sort((a, b) => b-a)[0]
                _radar.push({
                    text: element.key,
                    max: maxValue + 10
                })
            })
            data.push({
                name: (series.name as string),
                value: seriesData,
            })
            // 获得最终option
            let _option: any = {
                title: {
                    show: this.data.title.length > 0,
                    text: this.data.title
                },
                radar: [
                    {
                        // center: ['50%', '55%'],
                        // radius: this.getSizeByHeight('30%'),
                        indicator: _radar
                    }
                ],
                series: [
                    {
                        name: series.name,
                        data: data,
                        tooltip: {
                            trigger: 'item'
                        }
                    }
                ],

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
    .radarChart_normal-wrap {
        width: 100%;
        height: 100%;
    }
</style>

