import { Component, Vue } from 'vue-property-decorator'
// import from "@/components" // 组件
import { getVideo } from '@/api/wzroverview'

@Component({})
export default class About extends Vue {

    videoSrc: string = ''

    mounted() {
        getVideo().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.videoSrc =  data.videoUrl
            }
        })
    }

    // 初始化函数
    init() {
        //
    }
    
}
