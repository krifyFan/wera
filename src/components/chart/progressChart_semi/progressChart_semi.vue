<template>
    <div class="semiCircleProgressBarChart-wrap" :id="id" ref="element">
        <canvas id="semi-canvas" style="width: 100%;height: 100%"></canvas>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from "vue-property-decorator"

    @Component({})
    export default class About extends Vue {
        // prop
        @Prop({
            required: false,
            default: ''
        }) data!: any

        @Prop({
            required: false,
            default: ''
        }) id!: string

        monthTask: number = 0
        allTask: number = 0
        title:string = ''

        @Watch('data', {
            deep: true
        })
        onDataChanged(val: any, oldVal: any) {
            this.monthTask = val.series.data[1].monthTask
            this.allTask = val.series.data[0].allTask
            this.title = val.title
            this.initSemiCircle()
        }

        width: number = 0
        height: number = 0

        baseColor: string[] = ['#363A67', '#395867', '#3D6569', '#395867', '#363A67']
        activeColor: string[] = ['#4738F8', '#51D4F2', '#54F9F1', '#51D4F2', '#4738F8']

        mounted() {
            this.getWH()
            this.initSemiCircle()
        }

        getWH() {
            this.width = (this.$refs.element as HTMLElement).offsetWidth;
            this.height = (this.$refs.element as HTMLElement).offsetHeight;
        }

        initSemiCircle() {
            let canvas: HTMLCanvasElement = document.getElementById('semi-canvas') as HTMLCanvasElement
            canvas.width = this.width
            canvas.height = this.height    
            let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            let x = this.width / 2
            let y = this.height / 2
            let r = this.height / 2.5
            let lineWidth = this.height / 15
            let startAngle = Math.PI / 4 * 3
            let endAngle = startAngle + (Math.PI + (Math.PI - startAngle) * 2)
            // 背景灰色半圆
            this.drawSemiCircle(ctx, x, y, r, lineWidth, startAngle, endAngle, this.baseColor)
            let percent = this.monthTask / this.allTask
            let finA = startAngle + ((Math.PI + (Math.PI - startAngle) * 2) * percent)
            // 进度条半圆
            this.drawSemiCircle(ctx, x, y, r, lineWidth, startAngle, finA, this.activeColor)
            let textNum = percent * 100 + '%'
            // 百分比
            this.drewText(ctx, "600 46px Arial", textNum, x, y)
            // title
            this.drewText(ctx, '500 20px Arial', this.title, x, y + this.height / 7)
        }

        // 画半圆
        drawSemiCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, lineWidth: number, startAngle: number, endAngle: number, colorList: string[]) {   
            ctx.beginPath()
            ctx.arc(x, y, r, startAngle, endAngle, false)
            ctx.lineWidth = lineWidth
            let linGrad = ctx.createLinearGradient(
                x - r - lineWidth, y, x + r + lineWidth, y
            );
            colorList.forEach((item, index) => {
                linGrad.addColorStop(0.25*index, item)
            })
            ctx.strokeStyle = linGrad;
            //圆弧两端的样式
            ctx.lineCap = 'round';
            ctx.stroke()
            ctx.closePath()
        }

        // 文字说明
        drewText(ctx: CanvasRenderingContext2D, font: string, text: string, x: number, y: number) {
            ctx.font = font
            ctx.fillStyle = '#E0E4E7'
            ctx.textAlign = 'center'
            ctx.fillText(text, x, y)
        }

        resizeChart() {
            let _this = this;
            window.addEventListener("resize", () => {
                _this.getWH()
                _this.initSemiCircle()
            });
        }

    }
</script>

<style lang="less">
    .semiCircleProgressBarChart-wrap {
        width: 100%;
        height: 100%;
    }
</style>

