import { Component, Vue } from 'vue-property-decorator'
import { getBriefIntro } from '@/api/wzroverview'

@Component({
    
})
export default class About extends Vue {

    briefInfo:any = {
        local: '',
        typeName: '',
        runTime: '',
        area: 0,
        total: 0
    }

    mounted() {
        getBriefIntro().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.briefInfo.local = data.address
                this.briefInfo.typeName = data.typeName
                this.briefInfo.area = data.area
                this.briefInfo.total = data.capacity
                this.briefInfo.runTime = new Date(data.operationTime).format('yyyy') + '年'
            }
        })
    }
    
}
