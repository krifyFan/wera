<template>
    <div>
        <Modal class="alarmAccess-wrap" v-model="modalState" title="报警接入" @on-ok="submit" @on-cancel="cancel" width="40%" :mask-closable="false" :closable="false">
            <div class="title">
                <span>标题: </span>
                <Input v-model="title" placeholder="请输入标题" class="input" />
            </div>
            <div class="alarmPerson">
                <span>报警人: </span>
                <Input v-model="alarmPerson" placeholder="请输入报警人" class="input" />
            </div>
            <div class="alarmPhone">
                <span>报警电话: </span>
                <Input v-model="alarmPhone" placeholder="请输入报警人" class="input" />
            </div>
            <div class="service-item service-item-taste">
                <div class="service-item-content service-item-taste-content">
                    <!-- <div class="taste-content">
                        <button class="taste-button ready-button" id="taste_button">开始转写</button>
                    </div> -->
                    <span class="desc">描述: </span>
                    <div class="start-taste flex-display-1">
                        <div class="start-taste-left">
                            <div class="time-box">
                                <span class="start-taste-line">
                                    <hr class="hr hr1">
                                    <hr class="hr hr2">
                                    <hr class="hr hr3">
                                    <hr class="hr hr4">
                                    <hr class="hr hr5">
                                    <hr class="hr hr6">
                                    <hr class="hr hr7">
                                    <hr class="hr hr8">
                                    <hr class="hr hr9">
                                    <hr class="hr hr10">
                                </span>
                                <span class="total-time"><span class="used-time">00: 00</span></span></span>
                            </div>
                            <div class="start-taste-button">
                                <button class="taste-button start-button">开始转写</button>
                            </div>
                        </div>
                        <div class="output-box" id="result_output"></div>
                    </div>
                </div>
            </div>
        </Modal>

    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Watch,
        Prop
    } from 'vue-property-decorator'
    import {
        addRecord
    } from '@/api/receivePoliceRecord'

    @Component({})
    export default class extends Vue {

        @Prop({  
            required: true
        })
        modalState!: boolean

        title: string = ''
        alarmPerson: string = ''
        alarmPhone: string = ''

        // get modalState() {
        //     return this.$store.getters.alarmAccessModalState
        // }
        // set modalState(val) {
        //     this.$store.getters.alarmAccessModalState
        // }

        mounted() {

            this.asyncLoaded('/js/index.js')
        }

        asyncLoaded(url: string) {
            var script: any = document.createElement('script');
            script.type = 'text/javascript';

            script.src = url;
            document.body.appendChild(script)
        }

        submit() {
            this.$store.commit('Set_ModalState', false)
            let desc = (document.querySelector('#result_output') as any).innerHTML

            let parm = {
                title: this.title,
                receive_time: +new Date(), // 当前时间
                caller_name: this.alarmPerson,
                caller_phone: this.alarmPhone,
                description: desc
            }

            addRecord(parm).then((res: any) => {
                let {
                    code
                } = res.data
                if (code === 200) {
                    this.$emit('refresh')
                }
            })
        }
        cancel() {
            this.$store.commit('Set_ModalState', false)
        }
    }
</script>


<style lang="less">
    .alarmAccess-wrap {
        width: 100%;

        .title,
        .alarmPerson,
        .alarmPhone {
            margin: 1%;

            >span {
                font-weight: bold;
                display: inline-block;
                width: 10%;
            }

            .input {
                width: 25%;
            }
        }


        .service-item-taste button {
            cursor: pointer;
        }

        .service-item-taste .service-item-content {
            position: relative;
        }

        .service-item-taste .taste-button {
            background: #00449b;
            border: 1px solid;
            border-color: #478eea;
            color: #fff;
            text-align: center;
            border-radius: 10px;
        }

        .service-item-taste .taste-header .dialect-select {
            margin-left: 20px;
            height: 26px;
        }

        .service-item-taste .taste-header .dialect {
            margin-left: 20px;
            height: 26px;
            line-height: 26px;
            display: none;
        }

        .service-item-taste .taste-header a {
            border: none;
            border-radius: 4px;
            color: #fff;
            height: 26px;
            width: 100px;
            float: right;
            text-align: center;
            line-height: 26px;
        }

        .service-item-taste .taste-content {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            margin-top: 100px;
        }

        .service-item-taste .desc {
            font-weight: bold;
            margin-left: .165rem;
            position: absolute;
        }

        .service-item-taste .start-taste {
            margin-top: 20px;
            display: none;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }

        .service-item-taste .start-taste .start-taste-left {
            width: 40%;
            margin-left: 30px;
        }

        .service-item-taste .start-taste .start-taste-left .time-box {
            margin-top: 40px;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-pack: center;
            justify-content: center;
            display: none;
        }

        .service-item-taste .start-taste .start-taste-left .time-box .total-time {
            margin-left: 20px;
        }

        .service-item-taste .start-taste .start-taste-left .time-box .start-taste-line {
            display: inline-block;
            margin-right: 20px;
        }

        .service-item-taste .start-taste .start-taste-left .time-box .start-taste-line hr {
            background-color: #187cff;
            width: 3px;
            height: 10px;
            margin: 0 5px;
            display: inline-block;
            border: none;
        }

        .service-item-taste .start-taste .start-taste-left .start-taste-button {
            display: -ms-flexbox;
            display: flex;
            margin-top: 90px;
        }

        .service-item-taste .start-taste .output-box {
            height: 350px;
            overflow: auto;
            background: #f0f0f0;
            width: 89%;
            line-height: 1.5;
            padding: 10px;
            margin-left: 11%;
        }

        .flex-display-1 {
            display: -ms-flexbox !important;
            display: flex !important;
            flex-direction: row-reverse;
        }

        .hr {
            animation: note 0.2s ease-in-out;
            animation-iteration-count: infinite;
            animation-direction: alternate;
        }

        .hr1 {
            animation-delay: -1s;
        }

        .hr2 {
            animation-delay: -0.9s;
        }

        .hr3 {
            animation-delay: -0.8s;
        }

        .hr4 {
            animation-delay: -0.7s;
        }

        .hr5 {
            animation-delay: -0.6s;
        }

        .hr6 {
            animation-delay: -0.5s;
        }

        .hr7 {
            animation-delay: -0.4s;
        }

        .hr8 {
            animation-delay: -0.3s;
        }

        .hr9 {
            animation-delay: -0.2s;
        }

        .hr10 {
            animation-delay: -0.1s;
        }

        @keyframes note {
            from {
                transform: scaleY(1);
            }

            to {
                transform: scaleY(4);
            }
        }

        .ready-button,
        .start-button {
            margin: 0 auto;
            height: 40px;
            width: 160px;
            font-size: 16px;
            letter-spacing: 6px;
        }

        .taste-button:hover {
            background: #0b99ff;
        }
    }

    .ivu-btn-primary {
        background: #00449b;
    }

    .ivu-btn-text {
        background: #3a77b5;
        color: #fff;

        &&:hover {
            background: #57a3f3;
            color: #fff;
        }
    }
</style>