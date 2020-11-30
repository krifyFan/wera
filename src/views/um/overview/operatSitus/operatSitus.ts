import { Component, Vue } from 'vue-property-decorator'
import BinaryTree from '@/components/common/binaryTree.vue'

@Component({
    components: { BinaryTree }
})
export default class About extends Vue {

    operatSitusData: any = {
        name: '叉车（沪A98222)',
        children: [{
                No: 1,
                explain: '维护',
                regular: '年检每年一次'
            },
            {
                No: 2,
                explain: '保养',
                regular: '保养每月一次'
            },
            {
                No: 4,
                explain: '巡检',
                regular: '巡检每周一次'
            }
        ],
        option: {
            line: {
                height: 10
            },
            rectangle1: {
                paddingTB: 20, // padding 上下
                paddingLR: 10 // padding 左右
            },
            rectangle2: {
                paddingLR: 10, // padding 左右
                background: '#0d6f42'
            },
        }
    }

    treeColor:string = '#0d6f42'
}
