<template>
    <div class="pie3DChart-wrap" ref="element">
        <canvas :id="id"></canvas>
    </div>
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

    @Component({})
    export default class About extends Vue {

        @Prop({
            required: true,
            default: '1'
        }) id!: string

        @Prop({
            required: true
        }) data!: ChartData


        topPiecolor: string[] = ["#D274F4", "#FED072", "#00FF00"]
        bottomPiecolor: string[] = ["#9567F5", "#F67565", "#98FF00"]
        linecolor: string[] = ["#BC8EF2", "#F78367", "#98FFEE"]

        width: number = 0
        height: number = 0

        @Watch('data', {
            deep: true
        })
        onDataChanged(val: any, oldVal: any) {
            this.drawPie3D()
        }

        mounted() {
            this.getWH()
            this.drawPie3D()
        }

        getWH() {
            this.width = (this.$refs.element as HTMLElement).offsetWidth
            this.height = (this.$refs.element as HTMLElement).offsetHeight
        }

        drawPie3D() {
            let canvas: HTMLCanvasElement = document.getElementById(this.id) as HTMLCanvasElement
            canvas.width = this.width
            canvas.height = this.height
            let centerX: number = this.width / 2 - 50
            let centerY: number = this.height / 2
            /** 参数方程 x = a*cos(θ) */
            let a: number = this.width / 4
            /** 参数方程 y = b*cos(θ) */
            let b: number = this.height / 4
            let ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D

            // 整合数据
            let _series: Series = this.data.series as Series
            // 所有的数值之和
            let sum: number = 0
            _series.data.forEach(datum => {
                sum += datum.value
            })

            // 如果没数据，直接跳过
            if (!ctx.ellipse || _series.data.length === 0) return


            // ********************************** 底部饼图 ********************************** 
            /** 起点角度，初始为0 */
            let startPoint: number = 0
            for (let i = 0; i < _series.data.length; i++) {

                ctx.beginPath()
                let grad: CanvasGradient = ctx.createLinearGradient(0, 0, a * 2, 0)
                grad.addColorStop(0, this.topPiecolor[i])
                grad.addColorStop(1, this.bottomPiecolor[i])
                ctx.fillStyle = grad
                ctx.strokeStyle = this.linecolor[i]
                ctx.moveTo(centerX, centerY)
                ctx.ellipse(
                    centerX + 2,
                    centerY + 8,
                    a,
                    b,
                    0,
                    startPoint,
                    startPoint + Math.PI * 2 * (_series.data[i].value / sum),
                    false
                )
                ctx.fill()
                ctx.stroke()

                startPoint += Math.PI * 2 * (_series.data[i].value / sum)
            }


            // ********************************** 叠加上部饼图 **********************************
            startPoint = 0
            for (let i = 0; i < _series.data.length; i++) {

                ctx.beginPath()
                let grad: CanvasGradient = ctx.createLinearGradient(0, 0, a * 2, 0)
                grad.addColorStop(0, this.topPiecolor[i])
                grad.addColorStop(1, this.bottomPiecolor[i])
                ctx.fillStyle = grad
                ctx.strokeStyle = this.linecolor[i]
                ctx.moveTo(centerX, centerY)
                ctx.ellipse(
                    centerX,
                    centerY,
                    a,
                    b,
                    0,
                    startPoint,
                    startPoint + Math.PI * 2 * (_series.data[i].value / sum)
                )
                ctx.fill()
                ctx.stroke()
                ctx.closePath()
                startPoint += Math.PI * 2 * (_series.data[i].value / sum)
            }

            // ********************************** 说明线 **********************************
            startPoint = 0
            for (let i = 0; i < _series.data.length; i++) {

                /** 说明线起点和中心点连线的角度 */
                let s1: number = startPoint + Math.PI * (_series.data[i].value / sum)
                /** 说明线和椭圆的交点 */
                let x: number = centerX + a * Math.cos(s1),
                    y: number = centerY + b * Math.sin(s1)
                /** 说明线3个点的坐标 */
                let x1: number = (centerX + x) / 2,
                    y1: number = (centerY + y) / 2,
                    x2: number = x + (x - centerX) / 3,
                    y2: number = y + (y - centerY) / 3,
                    x3: number = x > centerX ? x2 + a / 5 : x2 - a / 5,
                    y3: number = y2

                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x2, y2)
                ctx.lineTo(x3, y3)
                ctx.lineWidth = 2
                ctx.strokeStyle = this.linecolor[i]
                ctx.stroke()
                ctx.font = "bold 12px Arial"
                let lineExplain: string = _series.data[i].key + "：" + _series.data[i].value
                ctx.fillStyle = this.linecolor[i]
                ctx.fillText(lineExplain, x3, y3)
                ctx.closePath()

                startPoint += Math.PI * 2 * (_series.data[i].value / sum)
            }

            // ********************************** 图例 **********************************
            let legendWidth = 30,
                legendHeight = 20,
                legendLeft = this.width - 100,
                legendTop = legendHeight,
                legendGap = 10
            for (let i = 0; i < _series.data.length; i++) {

                ctx.beginPath()
                let grad: CanvasGradient = ctx.createLinearGradient(
                    this.width - 100,
                    27 * (i + 1),
                    this.width - 60,
                    27 * (i + 1)
                )
                grad.addColorStop(0, this.topPiecolor[i])
                grad.addColorStop(1, this.bottomPiecolor[i])
                ctx.fillStyle = grad
                ctx.fillRect(legendLeft, legendTop + (legendHeight + legendGap) * i, legendWidth, legendHeight)
                ctx.fill()
                ctx.font = "bold 14px Arial"
                let percent: string = _series.data[i].key
                ctx.fillText(percent, legendLeft + legendWidth + legendGap, legendTop + (legendHeight + legendGap) *
                    i + legendHeight)
                ctx.closePath()
            }

        }
    }
</script>

<style lang="less">
    .pie3DChart-wrap {
        width: 100%;
        height: 100%;
    }
</style>