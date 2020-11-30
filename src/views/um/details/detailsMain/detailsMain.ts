import { Component, Vue } from 'vue-property-decorator'


@Component({})
export default class About extends Vue {

    leftMenu: any[] = [
        {
            firstMenu: '可视化展示',
            icon: require('@/assets/images/gw-logo.png'),
            url: '/wzr/details/diffarea'
            // isChildMenu: false,
            // children: [
            //     {
            //         secondMenu: '分类展示',
            //     },
            //     {
            //         secondMenu: '分区展示',
            //         url: '/wzr/details/diffarea'
            //     }
            // ]
        },
        {
            firstMenu: '台账管理',
            icon: require('@/assets/images/gw-logo.png'),
            url: '/wzr/details/queryEquipment'
        },
        {
            firstMenu: '视频管理',
            icon: require('@/assets/images/gw-logo.png'),
            url: '/wzr/details/video'
        },
        {
            firstMenu: '告警管理',
            icon: require('@/assets/images/gw-logo.png'),
            url: '/wzr/details/queryAlarm'
        },
        {
            firstMenu: '维保管理',
            icon: require('@/assets/images/gw-logo.png'),
            isChildMenu: false,
            children: [
                {
                    secondMenu: '维保任务',
                    url: '/wzr/details/queryMaintainTask'
                },
                {
                    secondMenu: '维保记录',
                    url: '/wzr/details/maintenanceManage'
                }
            ]
        },
        {
            firstMenu: '巡检管理',
            icon: require('@/assets/images/gw-logo.png'),
            isChildMenu: false,
            children: [
                {
                    secondMenu: '巡检计划',
                    url: '/wzr/details/queryPatrol'
                },
                {
                    secondMenu: '巡检任务',
                    url: '/wzr/details/queryTask'
                },
                {
                    secondMenu: '巡检记录',
                    url: '/wzr/details/queryRecord'
                },
                {
                    secondMenu: '缺陷管理',
                    url: '/wzr/details/queryDefect'
                }
            ]
        },
        {
            firstMenu: '数据查询',
            icon: require('@/assets/images/gw-logo.png'),
            url: '/wzr/details/queryData'
        }
    ]

    currenIndex: number = 0

    currentSecond: any = ''

    choosedFirstMenu(item: any, index: number) {
        this.currenIndex = index;
        this.leftMenu.forEach(ele => {
            if (ele.isChildMenu) {
                ele.isChildMenu = false
            } 
        })
        if (item.children) {
            item.isChildMenu = !item.isChildMenu
            this.choosedSeondMenu(item.children[0])
        } else {
            this.$router.push({
                path: item.url
            })
        }
    } 
    
    choosedSeondMenu(ele: any) {
        this.currentSecond = ele
        this.$router.push({
            path: ele.url
        })
    }
    
}
