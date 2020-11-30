import { Component, Vue, Watch } from "vue-property-decorator"
import { CMMainPageData } from '@/types/views/cmmainPage.interface'

@Component({})
export default class About extends Vue {

    // data
    data: CMMainPageData = {
        pageName: 'CMMainPage',
        isCollapsed: false,
        screenWidth: 1200,
        title: '后台管理平台'
    }

    leftTree: any[] = [
        {
            id: 1,
            name: '基础管理',  //一级菜单
            typeName: 'ios-stats',
            childNode: [
                {
                    id: 11,
                    name: '大区管理',  //二级菜单
                    url: '/cm/areaManage'
                },
                {
                    id: 12,
                    name: '小区管理',
                    url: '/cm/zoneManage'
                },
                // {
                //     id: 13,
                //     name: '货架管理',
                //     url: '/cm/shelfManage'
                // },
                {
                    id: 14,
                    name: '视频管理',
                    url: '/cm/videoManage'
                },
                {
                    id: 15,
                    name: '设备大类',
                    url: '/cm/categroy'
                },
                {
                    id: 16,
                    name: '设备小类',
                    url: '/cm/equipmentModel'
                },
                {
                    id: 17,
                    name: '监测对象类型',
                    url: '/cm/measobjType'
                },
                {
                    id: 18,
                    name: '监测对象',
                    url: '/cm/measobj'
                }
            ]
        },
        {
            id: 2,
            name: '系统管理',
            typeName: 'md-settings',
            childNode: [
                {
                    id: 21,
                    name: '用户管理',
                    url: '/cm/accountManage'
                },
                {
                    id: 22,
                    name: '角色管理',
                    url: '/cm/roleManage'
                }
            ]
        }
    ]

    isOpen: boolean = false
    currentIndex: number = -1
    currentChild: number = -1

    @Watch('currentIndex')
    watchCurrentIndex(newVal: number) {
        if (newVal) {
            this.isOpen = true
        }
    }

    goToMoudle(path: string, idx: number) {
        this.currentChild = idx
        this.$router.push(path)
    }

    backToMain() {
        this.$router.push('/UMMain')
    }

    handleOpen(index: number) {
        this.currentIndex = index
        this.isOpen = !this.isOpen
    }
}
