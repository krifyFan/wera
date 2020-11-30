import { Component, Vue, Watch } from 'vue-property-decorator'
import SelectTemp from '@/components/common/selectTemp.vue'
import { getType, getCategory } from '@/api/equipment'
import { visualList } from '@/api/diffArea'

@Component({
    components: {
        SelectTemp
    }
})
export default class About extends Vue {

    selectCategories: any = {
        type: 'label',
        labelTxt: '所属大类',
        selectOption: [
            { id: null, name: '所有' }
        ],
        defaultValue: null
    }
    choosedCate: number = -1

    selectType: any = {
        type: 'label',
        labelTxt: '设备类型',
        selectOption: [
            { id: null, name: '所有' }
        ],
        defaultValue: null,
    }
    choosedType:number| null = -1

    // imgSrc:string =  require('../../../../../assets/images/available-bg.png')


    areaBottom: any[] = [
        { id: 1, normalImg: require('@/assets/images/area1.gif'), choosedImg: require('@/assets/images/area2.jpg') },
        { id: 2, normalImg: require('@/assets/images/area1.gif'), choosedImg: require('@/assets/images/area2.jpg') },
        { id: 3, normalImg: require('@/assets/images/area1.gif'), choosedImg: require('@/assets/images/area2.jpg') },
        { id: 4, normalImg: require('@/assets/images/area1.gif'), choosedImg: require('@/assets/images/area2.jpg') },
        { id: 5, normalImg: require('@/assets/images/area1.gif'), choosedImg: require('@/assets/images/area2.jpg') },
        { id: 6, normalImg: require('@/assets/images/area1.gif'), choosedImg: require('@/assets/images/area2.jpg') },
        { id: 7, normalImg: require('@/assets/images/area1.gif'), choosedImg: require('@/assets/images/area2.jpg') },
        { id: 8, normalImg: require('@/assets/images/area1.gif'), choosedImg: require('@/assets/images/area2.jpg') },
        { id: 9, normalImg: require('@/assets/images/area1.gif'), choosedImg: require('@/assets/images/area2.jpg') },
        { id: 10, normalImg: require('@/assets/images/area1.gif'), choosedImg: require('@/assets/images/area2.jpg') },
        { id: 11, normalImg: require('@/assets/images/area1.gif'), choosedImg: require('@/assets/images/area2.jpg') },
        { id: 12, normalImg: require('@/assets/images/area1.gif'), choosedImg: require('@/assets/images/area2.jpg') }
    ]

    currentIndex:number = -1

    isShow: boolean = false

    equipInfo: any[] = [
        { id: 1, equipName: '电瓶叉车（沪A92311）', equipSn: '1', status: '使用中', alarmStatus: '正常', hasEquip: false},
        { id: 2, equipName: '电瓶叉车（沪A92311）', equipSn: '1', status: '使用中', alarmStatus: '正常', hasEquip: false},
        { id: 3, equipName: '柴油叉车（沪A92311）', equipSn: '1', status: '使用中', alarmStatus: '正常', hasEquip: false},
        { id: 4, equipName: '柴油叉车（沪A92311）', equipSn: '1', status: '使用中', alarmStatus: '正常', hasEquip: false},
        { id: 5, equipName: '电动液压车', equipSn: '1', status: '使用中', alarmStatus: '正常', hasEquip: false},
        { id: 6, equipName: '推垛机（沪A92311）', equipSn: '1', status: '使用中', alarmStatus: '正常', hasEquip: false}
    ]

    // list: any[] = []

    @Watch('choosedCate')
    watchCate(newVal: number) {
        getType(newVal).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                data.map((item: any)=> {
                    let temp = {
                        id: item.key,
                        name: item.val
                    }
                    this.selectType.selectOption.push(temp)
                })
            }
        })
    }

    @Watch('choosedType')
    watchType(newVal: any) {
        if (newVal !== null) {
            let visualParams: any = {
                areaId: Number(localStorage.getItem('areaId')),
                category: this.choosedCate,
                type: newVal
            }
            visualList(visualParams).then(res => {
                let { code, data } = res.data
                if (code === 200) {
                    data.map((item: any) => {
                        this.areaBottom.map((ele: any) => {
                            if (ele.id === item.id) {
                                ele.hasEquip = true
                                this.$set(this.areaBottom, ele.hasEquip, false)
                            }
                        })

                    })
                    
                }
            })
        }
    }

    choosedArea(index: number) {
        this.currentIndex = index
        this.isShow = true
        let areas: any = this.$refs.areas
        console.log('areas',areas)
    }

    mounted() {
        // 获取所属大类
        getCategory().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                data.map((item: any)=> {
                    let temp = {
                        id: item.key,
                        name: item.val
                    }
                    this.selectCategories.selectOption.push(temp)
                })
            }
        })
    }

    choosedCategory(choosedItem: any) {
        this.choosedCate = choosedItem.id
        this.isShow = false
    }

    choosedTypes(choosedItem: any) {
        this.choosedType = choosedItem.id
        this.isShow = false
    }
    
}
