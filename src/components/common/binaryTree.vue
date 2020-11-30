<template>
    <div class="binary-tree-wrap">
        <canvas :id="id"></canvas>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue,
        Prop
    } from "vue-property-decorator"

    interface fontStyle {
        fontColor?: string,
        fontSize?: string,
        baseLine?: string
    }

    interface lineStyle {
        lineWidth?: number,
        lineJoin?: string, // 1.round 扇形 2.bevel 三角形 3.miter 默认
        strokeStyle?: string
    }

    interface rectStyle {
        background?: string
    }

    @Component({})
    export default class About extends Vue {
        @Prop({
            required: true,
            default: '1'
        }) id!: string

        @Prop({
            required: true
        }) data!: any

        @Prop({
            required: false,
            default: '#1D716D'
        }) color!: ''

        h: number = 100

        w: number = 100

        mounted() {
            this.initCanvas()
        }

        initCanvas() {
            let {
                option: {
                    rectangle1,
                    operation,
                    line,
                    rectangle2
                }
            } = this.data
            let box = document.getElementsByClassName('binary-tree-wrap')[0] as HTMLElement
            this.h = box.offsetHeight
            this.w = box.offsetWidth
            let canvas = document.getElementById(this.id) as HTMLCanvasElement;
            canvas.width = this.w
            canvas.height = this.h
            if (canvas.getContext) {
                let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
                // 绘制左侧name 在图层下面 获取字体高度
                let LineH = line.height
                this.roundText(
                    ctx, 
                    this.data.name, 
                    rectangle1.paddingLR, 
                    this.h / 2,
                    {
                       baseLine: 'middle' // 字体基线对其
                    }
                )
                let nameBox = this.getTextWidth(ctx, this.data.name)
                let textHeight = nameBox.height
                let y = Math.round(this.h / 2 - textHeight / 2)
                this.roundedRect(
                    ctx,
                    0,
                    y - rectangle1.paddingTB,
                    nameBox.width + rectangle1.paddingLR * 2,
                    textHeight + rectangle1.paddingTB * 2,
                    10,
                    {}
                )
                // 绘制左侧name
                this.roundText(
                    ctx, 
                    this.data.name, 
                    rectangle1.paddingLR, 
                    this.h / 2,
                    {
                       baseLine: 'middle' // 字体基线对其
                    }
                )

                // // 绘制说明框架
                let circleAreaH = Math.round(this.h / this.data.children.length)
                let regularBoxH = this.h - (circleAreaH - Math.round(circleAreaH / 3) * 2) + 10
                // 绘制圆后长方形说明
                // 获取所有说明中长度最长的一个
                let regularBoxWs: number[] = []
                // 获取所有explain中长度最长的一个
                let explainBoxWs: number[] = []
                this.data.children.forEach((item: any) => {
                    regularBoxWs.push(this.getTextWidth(ctx, item.regular).width)
                    explainBoxWs.push(this.getTextWidth(ctx, item.explain).width)
                });
                let regularBoxW = Math.max(...regularBoxWs)
                let regularX = this.w - (regularBoxW + ( rectangle2.paddingLR * 2 ))
                let explainBoxW = Math.max(...explainBoxWs)
                // 绘制最右侧圆角长方形
                this.roundedRect(
                    ctx,
                    regularX,
                    circleAreaH - Math.round(circleAreaH / 3) * 2 - 20,
                    regularBoxW + ( rectangle2.paddingLR * 2 ),
                    regularBoxH,
                    10,
                    {
                        background: rectangle2.background
                    }
                )
                let nameLineW = this.w / 10
                let circleR = Math.round(circleAreaH / 4)
                // 绘制name横向长条
                this.roundLine(
                    ctx, 
                    nameBox.width + rectangle1.paddingLR * 2,
                    (this.h / 2),
                    nameBox.width + rectangle1.paddingLR * 2 + nameLineW - circleR,
                    (this.h / 2),
                    {
                        lineWidth: 5,
                        strokeStyle: this.color
                    }
                )
                // 绘制圆e3
                let circleX = Math.round(this.w / 2)
                // let circleR = Math.round(circleAreaH / 4)
                for (let i = 0, len = this.data.children.length; i < len; i++) {
                    let circleY = Math.round(circleAreaH / 2 + circleAreaH * i)
                    if(i === 0 || (i === len - 1)){
                        this.roundLine(
                            ctx, 
                            nameBox.width + rectangle1.paddingLR * 2 + nameLineW - circleR,
                            (this.h / 2 - LineH / 2),
                            nameBox.width + rectangle1.paddingLR * 2 + nameLineW - circleR,
                            (this.h - circleAreaH * i) - circleAreaH / 2, // 最高 和 最低点
                            {
                                lineWidth: 5,
                                strokeStyle: this.color
                            }
                        )
                    }

                    // 圆左侧横线
                    this.roundLine(
                        ctx, 
                        nameBox.width + rectangle1.paddingLR * 2 + nameLineW - circleR,
                        (this.h - circleAreaH * i) - circleAreaH / 2,
                        circleX - circleR,
                        (this.h - circleAreaH * i) - circleAreaH / 2, 
                        {
                            lineWidth: 5,
                            strokeStyle: this.color
                        }
                    )

                   // 圆内 regular
                    this.roundText(
                        ctx,
                        this.data.children[i].regular,
                        this.w - (regularBoxW +  rectangle2.paddingLR),
                        circleY + 6,
                        {}
                    )
                    // 圆
                    this.roundArc(
                        ctx,
                        circleX,
                        circleY,
                        circleR
                    )
                     

                    // 圆后 No
                    this.roundText(
                        ctx,
                        this.data.children[i].No,
                        Math.round(this.w / 2 - 5),
                        circleY + 6,
                        {}
                    )
                    // 圆后 explain
                    let spaceX = regularX + 5 - circleX - circleR - explainBoxW
                    let explainX = circleX + spaceX / 2 + circleR
                    this.roundText(
                        ctx,
                        this.data.children[i].explain,
                        explainX,
                        circleY + 6,
                        {
                            fontColor: 'black'
                        }
                    )
                    
                }

            }
        }
        // 获得文字宽度
        getTextWidth(ctx: CanvasRenderingContext2D, text: string) {
            let font = ctx.measureText(text) as any
            return {
                width: Math.round(font.width),
                height: Math.round(font.actualBoundingBoxDescent - font.actualBoundingBoxAscent)
            }
        }
        // text
        roundText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, style: fontStyle ) {
            
            ctx.font = style.fontColor || '18px Microsoft YaHei'; // 字体大小
            ctx.fillStyle = style.fontColor || '#fff'; // 字体颜色
            ctx.textBaseline = style.baseLine || "alphabetic" as any; // 字体对齐方式

            ctx.fillText(text, x, y); // 填充字体
        }
        // 绘制带圆角的长方形
        roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius:
            number, style: rectStyle) {
            ctx.beginPath();
            ctx.moveTo(x, y + radius);
            ctx.lineTo(x, y + height - radius);
            ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
            ctx.lineTo(x + width - radius, y + height);
            ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
            ctx.lineTo(x + width, y + radius);
            ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
            ctx.lineTo(x + radius, y);
            ctx.quadraticCurveTo(x, y, x, y + radius);
            ctx.fillStyle = style.background || this.color
            ctx.fill()

        }
        // 绘制圆
        roundArc(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
            ctx.beginPath();
            ctx.arc(
                x,
                y,
                r,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = this.color;
            ctx.fill()
            ctx.closePath()
        }

        roundLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, style: lineStyle) {
            ctx.beginPath(); // 开始画线
            ctx.moveTo(x1, y1); // 起点
            ctx.lineTo(x2, y2); // 重点

            ctx.strokeStyle = style.strokeStyle || "#1D716D" // 线条颜色
            ctx.lineWidth = style.lineWidth || 2 // 线条宽度
            ctx.lineCap = style.lineJoin || 'square' as any// 线条间接合处的样式

            ctx.stroke(); // 描边
        }

    }
</script>
<style lang="less">
    .binary-tree-wrap {
        height: 100%;
        width: 100%;
    }
</style>