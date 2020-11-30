<template>
<div :id="id" class="ProgressBarChart-wrap" ref="element"></div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

    @Component({})
    export default class About extends Vue {
    // prop
    @Prop({ required: true, default: '1' }) id!: string
    @Prop({ required: true }) data!: any

    options: any = {}
    myChart: any = {}

    @Watch('data', { deep: true })
    onDataChanged(val: any, oldVal: any) {
        this.drawProgressBar()
    }

    mounted() {
        this.drawProgressBar()
        this.resizeChart()
    }

    drawProgressBar() {
        this.myChart = (this as any).$echarts.init(document.getElementById(this.id) as HTMLCanvasElement)
        this.options = {
            title: {
                text: this.data.title,
                left: 'center',
                textStyle: {
                    color: this.data.titleColor ? this.data.titleColor : '#05d1ff',
                    fontSize: this.getFontSize('8%'),
                    align: 'center'
                }
            },
            grid: {
                height: '80%',
                bottom: '2%',
                width: '60%'
            },
            xAxis: {
                show: false
            },
            yAxis: [
                {
                    show: true,
                    data: [],
                    inverse: true,
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#fff',
                        fontSize: this.getFontSize('6%')
                    }
                },
                {
                    show: true,
                    inverse: true,
                    data: this.data.yAxis.nameData,
                    axisLabel: {
                        textStyle: {
                            fontSize: this.getFontSize('5%'),
                            color: '#fff'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            series: [
            {
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                data: this.data.series.data,
                barWidth: 20,
                itemStyle: {
                normal: {
                    barBorderRadius: 15,
                    color: new (this as any).$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: '#11c0ff'
                    },
                    {
                        offset: 1,
                        color: '#9bedff'
                    }
                    ])
                }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{c}%',
                        fontSize: this.getFontSize('5%')
                    }
                }
            },
            {
                name: '框',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: this.data.series.borderData,
                barWidth: 20,
                itemStyle: {
                    normal: {
                        color: 'none',
                        borderColor: '#00c1de',
                        borderWidth: 2,
                        barBorderRadius: 10
                    }
                }
            }
            ]
        };
        (this as any).myChart.setOption(this.options)
        if (this.data.option) {
            this.myChart.setOption(this.data.option)
        }
    }

    resizeChart() {
        window.addEventListener('resize', () => {
            this.drawProgressBar()
            this.myChart.resize()
        })
    }

    getFontSize(val: number | string) {
        if (typeof val === 'number') return val
        if (typeof val === 'string') {
            if (val.indexOf('%') > 0) {
                let tmp = parseFloat(val.replace('%', '')) / 100
                let height = (this.$refs.element as HTMLElement).offsetHeight
                return Math.round(height * tmp)
            }
        }
        return 0
    }
    }
</script>

<style lang="less">
.ProgressBarChart-wrap {
width: 100%;
height: 100%;
}
</style>

