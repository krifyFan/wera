<template>
    <div class="SelectTemp-wrap" :type="data.type">
        <div class="select-wrap" :class="[data.type === 'solid' ? 'solid-select' : data.type === 'border' ? 'border-select' : 'label-selct']">
            <div class="label-wrap" v-show="data.type === 'label'">{{data.labelTxt}}</div>
            <div class="value-wrap">
                <input class="choosed-li" v-model="value" readonly @click="isShowUL = !isShowUL"/>
                <transition name="draw">
                    <ul class="ul-box" v-if="isShowUL">
                        <li class="li-box" v-for="(item, index) in data.selectOption" :key="index" @click="choosedLi(item)">{{item.name}}</li>
                    </ul>
                </transition>
            </div>
            <div class="icon" @click="this.isShowUL = !this.isShowUL">
                <div class="triangle"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Emit, Watch } from "vue-property-decorator";
    // import { SelectData } from '@/types/components/selectTemp.interface'

    @Component({})
    export default class About extends Vue {
        // prop
        @Prop({
            required: false,
            default: {}
        }) data!: any

        isShowUL: boolean = false

        value: any = ''

        choosedItem: any = ''

        @Watch('data.selectOption')
        watchData(newVal: any, oldVal: any) {
            if (newVal.length !== 0) {
                if ((this.data as any).defaultValue !== undefined) {
                    newVal.forEach((item: any) => {
                        if(item.id === this.data.defaultValue){
                            this.choosedLi(item)
                        }
                    })
                }
            }
        }
        @Watch('data.defaultValue')
        watchDefault(){
            this.init()
        }

        @Emit('on-change')
        send(choosedItem: any) {}

        mounted() {
            this.init()
        }

        init(){
            if (this.data.defaultValue !== undefined) {
                this.data.selectOption.forEach((option: any) => {
                    if (option.id === this.data.defaultValue) {
                        this.choosedLi(option)
                    }
                })
            }
            document.body.addEventListener('click', (e) => {
                if ((e.target as any).className !== 'choosed-li' && 
                    (e.target as any).className !== 'triangle' &&
                    (e.target as any).className !== 'icon'
                ) {
                    this.isShowUL = false
                }
            })
        }

        chooedValue() {
            this.isShowUL = !this.isShowUL
        }

        choosedLi(item: any) {
            this.isShowUL = false
            this.value = item.name
            this.choosedItem = item
            this.send(this.choosedItem)
        }
    }
</script>

<style lang="less">
    .SelectTemp-wrap {
        // position: absolute;
        z-index: 9;
        // height: 32px;
        .select-wrap {
            .choosed-li,
            .icon {
                display: inline-block;
                vertical-align: top;

                :hover {
                    cursor: pointer;
                }
            }
            .value-wrap {
                display: inline-block;
                vertical-align: top;
            }

            .choosed-li {
                min-width: 150px;
                background-color: #474747;
                outline: none;
                padding: 4px 7px;
                border-radius: 0;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                border: none;
                height: 20px;
                color: @page-title-color;
                width: 150px;
                text-align: center;
            }
            .choosed-li:hover {
                border: none;
                cursor: pointer;
            }
            .choosed-li:focus {
                outline: none;
                border: none;
                box-shadow: 0 0 0 2px transparent;
            }

            .icon {
                width: 20px;
                height: 20px;
                background: #474747;
                margin-left: 5px;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                display: inline-block;

                .triangle {
                    width: 0;
                    height: 0;
                    border-width: 7px;
                    border-color: @page-title-color transparent transparent transparent;
                    border-style: solid dashed dashed dashed;
                    border-radius: 4px;
                    margin-top: 6px;
                    margin-left: 2px;
                }
            }

            .ul-box {
                position: absolute;
                z-index: 999999;
                background: #474747;
                margin-top: 3px;
                width: fit-content;
                border-radius: 4px;
                max-height: 150px;
                overflow-y: auto;
                color: @page-title-color;
                width: 150px;
                .li-box {
                    line-height: 1.5;
                    padding: 2px 7px;
                    cursor: pointer;
                }
            }

            .draw-enter-active, .draw-leave-active {
                transition: max-height .4s ease;
            }
            .draw-enter, .draw-leave-to {
                max-height: 0;
            }

            .ul-box::-webkit-scrollbar {
                width: 4px;
                height: 4px;
                overflow-x: hidden;
                overflow-y: auto;
            }

            .ul-box::-webkit-scrollbar-thumb {
                border-radius: 5px;
                box-shadow: inset 0 0 5px @main-color;
                background: @main-color
            }

            .ul-box::-webkit-scrollbar-track {
                border-radius: 4px;
                box-shadow: inset 0 0 5px rgb(235, 227, 235);
                background: @main-color;
            }
        }

        .border-select.select-wrap {
            .choosed-li {
                border: 1px solid #797979;
            }
            .icon {
                border: 1px solid #797979;
            }
        }

        .label-selct.select-wrap {
            .label-wrap {
                background: @main-color;
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
                display: inline-block;
                padding: 6px 14px;
                margin-right: 5px;
                color: @page-title-color;
            }
            .choosed-li {
                border-radius: 0;
                background-color: @main-color;
                height: 32px;
            }

            .icon {
                background-color: @main-color;
                height: 32px;
                width: 32px;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;

                .triangle {
                    border-width: 8px;
                    border-color: @page-title-color transparent transparent transparent;
                    border-style: solid dashed dashed dashed;
                    border-radius: 4px;
                    margin-top: 13px;
                    margin-left: 8px;
                }
            }

            .ul-box {
                background-color: @main-color;
            }
        }
    }
</style>