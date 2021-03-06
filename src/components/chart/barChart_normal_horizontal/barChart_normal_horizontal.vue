<template>
    <div class="barChart_normal_horizontal-wrap" :id="id" ref="element"></div>
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
            this.drawChart()
        }

        mounted() {
            this.initData()
            this.drawChart()
            this.resizeChart()
        }

        initData() {
            this.myChart = (this as any).$echarts.init(document.getElementById(this.id))
            // 初始化的样式
            let theme = (this as any).EChartsTheme
            let constFontSize: string = '6%'
            let legendFontSize: string = '5%'
            let initOption: EChartOption = {
                title: {
                    textStyle: {
                        color: theme.titleColor,
                        fontSize: this.getFontSize('10%')
                    },
                    left: 'center'
                },
                legend: {
                    left: 'right',
                    top: '12%',
                    textStyle: {
                        color: theme.titleColor,
                        fontSize: this.getFontSize(legendFontSize)
                    },
                    itemGap: 2,
                    itemWidth: this.getFontSize(legendFontSize) * 2,
                    itemHeight: this.getFontSize(legendFontSize),
                },
                grid: {
                    top: '25%',
                    left: '10%',
                    right: '15%',
                    bottom: '15%',
                    borderColor: theme.borderColor
                },
                xAxis: {
                    type: "value",
                    nameTextStyle: {
                        color: theme.borderColor,
                        fontSize: this.getFontSize(constFontSize)
                    },
                    axisLine: {
                        lineStyle: {
                            color: theme.borderColor
                        }
                    },
                    axisLabel: {
                        color: theme.borderColor,
                        fontSize: this.getFontSize(constFontSize),
                        formatter: function (value: number, index: number): any {
                            let res: string = ''

                            if (value >= 10000) {
                                res = (value / 10000).toString() + '万'
                            } else if (value >= 1000) {
                                res = (value / 1000).toString() + '千'
                            } else {
                                res = value.toString()
                            }

                            return res
                        }
                    },
                },
                yAxis: {
                    type: "category",
                    nameTextStyle: {
                        color: theme.borderColor
                    },
                    axisLine: {
                        lineStyle: {
                            color: theme.borderColor
                        }
                    },
                    axisLabel: {
                        color: theme.borderColor,
                        fontSize: this.getFontSize(constFontSize)
                    },
                    data: []
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                series: [{
                    type: 'bar',
                    barMaxWidth: this.getSizeByWidth('7%'),
                    itemStyle: {
                        barBorderRadius: [0, 8, 8, 0]
                    },
                    data: []
                }],
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

            // 整理x轴
            let _xAxisData: string[] = []
            series.data.forEach(datum => {
                _xAxisData.push(datum.key)
            })

            // 整理series数据
            let _series: EChartOption.SeriesBar[] = []
            let _legends: string[] = []
            let _unit: string = ''

            let _yAxisData: number[] = []
            series.data.forEach(datum => {
                _yAxisData.push(datum.value)
            })
            _series.push({
                type: 'bar',
                name: series.name,
                data: _yAxisData
            })
            series.name && _legends.push(series.name)
            if (series.unit) _unit = '单位(' + series.unit + ')'


            // 获得最终option
            let _option: EChartOption = {
                title: {
                    show: this.data.title.length > 0,
                    text: this.data.title
                },
                legend: {
                    data: _legends
                },
                xAxis: {
                    name: _unit
                },
                yAxis: {
                    data: _xAxisData
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
    .barChart_normal_horizontal-wrap {
        height: 100%;
        width: 100%;
    }
</style>