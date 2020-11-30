<template>
    <div class="navBar-wrap">
        <div class="pro-title">
            <!-- 智慧消防综合监控平台 -->
            <img :src="sysTitle" />
        </div>
        <div class="nav-bar">
            <div v-for="(item, index) in filterNvaBar" :key="index" class="bar-item">
                <div @mouseover="toggle(item)">
                    <div class="menu-wrap" ref="barItem" @click="item.url && toFirstPage(item)" :style="{backgroundImage: 'url('+ menuBG +')', backgroundSize: '100% 100%' }">{{item.menu}}</div>
                    <div class="bar-child" v-if="item.children && item.isShow">
                        <ul @mouseleave="mouserleave(item)">
                            <li v-for="ele in item.children" :key="ele.url" @click="toPath(item, ele)">
                                {{ele.menu}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="icon-wrap">
            <div class="alarmEntry" @click="showAlramAccessModal">
                <img :src="alarmEntryIcon" />
            </div>
            <Badge :count="alarmCount" overflow-count="99">
                <a href="#" class="demo-badge"></a>
                <Icon class="alarm-icon" type="md-notifications" color="#CCE4F7" :size="20" style="margin-right: 10px" @click="showMesList()" />
            </Badge>
            <Icon type="md-contact" color="#CCE4F7" style="margin-right: 10px" :size="20" />
            <div class="exit" @click="logout()">
                <div>
                    <img :src="exitIcon" alt="退出">
                    <span>安全退出</span>
                </div>
            </div>
            <!-- <div class="user-icon"> -->
            <!-- <transition name="draw">
                        <ul class="message-list" v-show="isShow">
                            <li @click="goToModule()">我的消息</li>
                        </ul>
                </transition> -->
            <!-- </div> -->
        </div>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue
    } from "vue-property-decorator"
    import {
        getNavBarItem
    } from '@/api/ummain.ts'
    import {
        getAlramCount
    } from '@/api/alarmManage'
    import store from '@/store'
    @Component({})
    export default class About extends Vue {

        navBarItem: any[] = [{
                menu: '总览',
                url: '/um/overview/info'
            },
            {
                menu: '巡检管理',
                isShow: false,
                children: [{
                        menu: '巡检计划',
                        url: '/um/patrolPlan/list'
                    },
                    {
                        menu: '巡检任务',
                        url: '/um/patrolTask/list'
                    },
                    {
                        menu: '巡检记录',
                        url: '/um/patrolRecord/list'
                    },
                    {
                        menu: '缺陷管理',
                        url: '/um/defect/list'
                    }
                ]
            },
            // {
            //     menu: '维保管理',
            //     isShow: false,
            //     children: [{
            //             menu: '保养任务',
            //             url: '/um/maintainTask/list'
            //         },
            //         {
            //             menu: '保养记录',
            //             url: '/um/maintainRecord/list'
            //         },
            //         {
            //             menu: '维修记录',
            //             url: ''
            //         }
            //     ]
            // },
            {
                menu: '维保管理',
                isShow: false,
                children: [{
                        menu: '维保任务',
                        url: '/um/maintainTask/list'
                    },
                    {
                        menu: '维保记录',
                        url: '/um/maintainRecord/list'
                    }
                ]
            },
            {
                menu: '台账管理',
                url: '/um/equipment/list'
            },
            {
                menu: '综合监控',
                isShow: false,
                children: [{
                        menu: '视频管理',
                        url: '/um/video'
                    },
                    {
                        menu: '告警管理',
                        url: '/um/alarm/list'
                    },
                    {
                        menu: '数据查询',
                        url: '/um/queryData'
                    }
                ]
            },
            {
                menu: '3D',
                url: '/um/3d'
            },
            {
                menu: '接警记录',
                url: '/um/receivePolice/list'
            }
        ]

        filterNvaBar: any[] = []

        exitIcon: string = require('@/assets/images/exit.png')

        menuBG: string = require('@/assets/images/menu-bg.png')

        alarmEntryIcon: string = require('@/assets/images/alarmEntry.png')

        sysTitle: string = require('@/assets/images/sys-title.png')

        alarmCount: number = 1

        breadcrumb: any[] = []

        mounted() {
            this.startListenMQ()
            this.getAlramCount()
            this.getPermissionMenu()

            document.addEventListener('keydown', (e) => {
                if (e.altKey && e.keyCode == 83) {
                    this.showAlramAccessModal()
                }
            })
        }

        getAlramCount() {
            getAlramCount().then(res => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.alarmCount = data
                }
            })
        }

        showMesList() {
            this.$router.push({
                name: '我的消息'
            })
        }

        toFirstPage(item: any) {
            this.$router.push(item.url)
            this.breadcrumb = []
            this.breadcrumb.push(item.menu)
            this.$emit('curCrumb', this.breadcrumb)
            localStorage.removeItem('curCrumb')
            let str = this.breadcrumb.join(',')
            localStorage.setItem('curCrumb', str)
        }

        toggle(item: any) {
            this.navBarItem.map((menuItem: any) => {
                if (menuItem.isShow) {
                    menuItem.isShow = false
                }
            })
            item.isShow = true
        }

        mouserleave(item: any) {
            item.isShow = false
        }

        toPath(item: any, ele: any) {
            item.isShow = false
            this.$router.push(ele.url)
            this.breadcrumb = []
            this.breadcrumb.unshift(item.menu)
            this.breadcrumb.push(ele.menu)
            this.$emit('curCrumb', this.breadcrumb)
            localStorage.removeItem('curCrumb')
            let str = this.breadcrumb.join(',')
            localStorage.setItem('curCrumb', str)
        }

        startListenMQ() {
            console.log("添加监听器到MQ")
            this.TransferStation.addListener("alarm", this.callback);
        }

        stopListenMQ() {
            console.log("移除监听器")
            this.TransferStation.deleteListener("tasks");
        }

        // 连接成功回调函数
        callback(respond: any) {
            let result = JSON.parse(respond);
            this.getAlramCount()
        }

        // 退出
        logout() {
            this.$store.dispatch('logout').then(res => {
                this.$router.push('/login')
            })
        }

        getPermissionMenu() {
            // 获取用户信息
            try {
                this.filterNvaBar = []
                const data = this.$store.getters.routelist
                const account = this.$store.getters.name
                const dataRouters: any[] = []
                data.forEach((ele: any) => {
                    dataRouters.push(ele.replace(":", "/"))
                });

                if (account === 'admin') {
                    this.filterNvaBar = this.navBarItem
                } else {
                    this.filterNvaBar = this.matchMenu(this.navBarItem, dataRouters)
                    this.filterNvaBar = this.filterNvaBar.reduce((perArr: any[], curVal: any) => {
                        if (curVal.children && curVal.children.length !== 0) {
                            return perArr
                        }
                    })
                }
            } catch (error) {

            }
        }
        matchMenu(permissionRouter: any, data: any) {
            let o: any[] = []
            permissionRouter.forEach((ele: any) => {
                if (ele.children) {
                    ele.children = this.matchMenu(ele.children, data)
                    o.push(ele)
                } else {
                    data.forEach((item: any) => {
                        if (ele.url.slice(4) === item) {
                            o.push(ele)
                        }
                    })
                }
            })
            return o
        }
        showAlramAccessModal() {
            let {
                path
            } = this.$route

            if (path.indexOf('um/receivePolice') === -1) {
                this.$router.push(`/um/receivePolice/list/true`)
            }
            localStorage.removeItem('curCrumb')
            localStorage.setItem('curCrumb', '接警记录')
            
            this.$store.commit('Set_ModalState', true)
        }
    }
</script>
<style lang="less">
    .navBar-wrap {
        height: 100%;
        background-color: @main-color;
        color: @title-color;
        display: flex;
        background-image: linear-gradient(45deg, #0f49aa, #041751);

        .pro-title,
        .nav-bar,
        .icon-wrap,
        .bar-item {
            // display: inline-block;
            // vertical-align: middle;
            flex: 1;
        }

        .logo-img {
            vertical-align: middle;
            margin-left: 20px;
        }

        .pro-title {
            font-size: 34px;
            margin-left: 30px;
            font-weight: bold;

            img {
                vertical-align: middle;
                height: 100%;
            }
        }

        .nav-bar {
            position: relative;
            margin-left: 20px;
            display: flex;
            align-items: center;
            flex: 3;

            .bar-item {
                margin-left: 20px;

                .menu-wrap {
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                    line-height: 40px;
                    width: 130px;
                    text-align: center;
                }
            }

            .bar-child {
                position: absolute;
                z-index: 999;
                width: 130px;
                background: @main-color;

                ul {
                    list-style: none;

                    li {
                        border: 1px solid;
                        line-height: 32px;
                        text-align: center;
                        cursor: pointer;
                    }
                }
            }
        }

        .icon-wrap {
            // position: absolute;
            position: relative;
            padding-right: 20px;
            line-height: 5vh;
            margin-top: 1vh;
            text-align: right;

            .ivu-icon {
                vertical-align: middle;
                cursor: pointer;
            }

            .ivu-badge-count {
                top: -6px;
                transform: none;
                cursor: pointer;
                left: 15px;
            }

            .exit {
                display: inline-block;
                vertical-align: top;
                cursor: pointer;
                border-left: 0.013333rem solid #fff;
                padding-left: 10px;
                border-left: 1px solid #fff;

                img {
                    width: 25px;
                    vertical-align: middle;
                }
            }

            .alarmEntry {
                width: 25px;
                height: 25px;
                display: inline-block;
                vertical-align: middle;
                margin-right: 10px;
                cursor: pointer;

                img {
                    width: 100%;
                    height: 100%;
                    vertical-align: top;
                }
            }

            // .alarm-icon, .user-icon {
            //     display: inline-block;
            // }
            // .user-icon {
            //     position: relative;
            //     .message-list {
            //         position: absolute;
            //         background: @main-color;
            //         width: 90px;
            //         z-index: 99;
            //         right: -30px;
            //         top: 50px;
            //         text-align: center;
            //         border: 1px solid white;
            //         list-style: none;
            //         li{
            //             line-height: 35px;
            //             cursor: pointer;
            //         }
            //     }
            //     .draw-enter-active, .draw-leave-active {
            //         transition: max-height .4s ease;
            //     }
            //     .draw-enter, .draw-leave-to {
            //         max-height: 0;
            //     }
            // }
        }

        @media screen and (min-width: 1440px) {
            .icon-wrap {
                .ivu-badge-count {
                    top: 10px;
                }
            }
        }
    }
</style>