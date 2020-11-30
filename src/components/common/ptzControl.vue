<template>
    <div class="ptz-wrap" ref="ptz" :style="{ 'paddingTop': paddingTop + 'px' }">
        <div class="ptz-left-wrap" :style="{ 'width': ptzSize + 'px', 'height': ptzSize + 'px' }">
            <div class="left-part">
                <div class="toggle-cion left-toggle"></div>
            </div>
            <div class="top-part">
                <div class="toggle-cion top-toggle"></div>
            </div>
            <div class="right-part">
                <div class="toggle-cion right-toggle"></div>
            </div>
            <div class="bottom-part">
                <div class="toggle-cion bottom-toggle"></div>
            </div>
            <div class="circle-part"></div>
            <div class="center-circle-part"></div>
            <div class="center-square"></div>
        </div>
        <div class="go-back-icon" >
            <Icon type="md-add-circle" :size="46" color="#3276D4"/>
            <Icon type="md-remove-circle" :size="46" color="#3276D4"/>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component({})
export default class About extends Vue {
    ptzSize: number = 0

    paddingTop: number = 0

    mounted() {
        this.getPTZWH()
    }

    getPTZWH() {
        let ptz = this.$refs.ptz as any
        let h = ptz.offsetHeight
        let w = ptz.offsetWidth
        if (h > w) {
            this.ptzSize = w * 0.7
        } else {
            this.ptzSize = h * 0.7
        }
        this.paddingTop = Math.round((h - this.ptzSize) / 2)
    }
}
</script>
<style lang="less" scoped>
.ptz-wrap {
    width: 100%;
    height: 100%;
    padding-left: 5%;
    .ptz-left-wrap, .go-back-icon {
        display: inline-block;
        vertical-align: middle;
    }
    .ptz-left-wrap {
        transform: rotate(45deg);
        position: relative;
        .left-part, .top-part, .right-part, .bottom-part {
            width: 50%;
            height: 50%;
            display: inline-block;
            margin: 0;
            padding: 0;
            vertical-align: top;
            cursor: pointer;
            position: relative;
            .toggle-cion {
                width: 13px;
                border-width: 13px;
                border-color: #d4d4d4 transparent transparent transparent;
                border-style: solid dashed dashed dashed;
                border-radius: 0;
            }
        }
        .left-part {
            border-right: 5px solid #79ACF4;
            border-bottom: 5px solid #79ACF4;
            .left-toggle {
                transform: rotate(135deg);
                position: absolute;
                top: 30%;
                left: 30%;
            }
        }
        .top-part {
            border-left: 5px solid #79ACF4;
            border-bottom: 5px solid #79ACF4;
            .top-toggle {
                transform: rotate(-135deg);
                position: absolute;
                top: 30%;
                right: 30%;
            }
        }
        .right-part {
            border-right: 5px solid #79ACF4;
            border-top: 5px solid #79ACF4;
            .right-toggle {
                transform: rotate(45deg);
                position: absolute;
                bottom: 30%;
                right: 30%;
            }
        }
        .bottom-part {
            border-left: 5px solid #79ACF4;
            border-top: 5px solid #79ACF4;
            .bottom-toggle {
                transform: rotate(-45deg);
                position: absolute;
                bottom: 35%;
                left: 35%;
            }
        }
        .circle-part {
            border-radius: 100%;
            background: #3276D4;
            position: absolute;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            z-index: -2;
        }
        .center-circle-part {
            position: absolute;
            border-radius: 100%;
            background: #3276D4;
            top: 30%;
            left: 30%;
            right: 30%;
            bottom: 30%;
            border: 10px solid #365B8E;
        }
        .center-square {
            width: 10%;
            height: 10%;
            background: #E0E4E7;
            border: 1px solid #E0E4E7;
            border-radius: 4px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -5%;
            margin-top: -5%;
            transform: rotate(-45deg);
        }
    }
    .go-back-icon {
        width: 20%;
    }
}
</style>