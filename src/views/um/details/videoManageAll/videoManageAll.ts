import { Component, Vue } from 'vue-property-decorator'
import SelectTemp from '@/components/common/selectTemp.vue'
import PTZControl from '@/components/common/ptzControl.vue'

@Component({
    components: {
        SelectTemp,
        PTZControl
    }
})
export default class About extends Vue {

    selectVideo: any = {
        labelText: '摄像机',
        options: [
            { id: 0, name: '所有' },
            { id: 1, name: '220110010' },
            { id: 2, name: '7232323' }
        ],
        defaultValue: 0
    }

    videos: any[] = [] 

    cameraName:string = '红外摄像机 220071981'

    cameraLoc:string = '古城大街 20区 污水仓进风口 古城大街 20区 污水仓进风口'

    cameraPresetPos: Array<any> = [
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' },
        { presetPosName: '预置位' }
    ]

    mounted() {
        this.initVideo()
    }

    // 初始化函数
    initVideo() {
        this.videos = [
            { name: '无视频' },
            { name: '无视频' },
            { name: '无视频' },
            { name: '无视频' }
        ] 
    }
    
}
