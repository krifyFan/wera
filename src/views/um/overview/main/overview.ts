import { Component, Vue } from 'vue-property-decorator'
import BriefIntro from '../briefIntro/briefIntro.vue'
// import StoreProportion from '../storeProportion/storeProportion.vue'
import EquipType from '../equipType/equipType.vue'
import DefectDis from '../defectDis/defectDis.vue'
// import OperatSitus from '../operatSitus/operatSitus.vue'
import DataOverview from '../dataOverview/dataOverview.vue'
import InfoTips from '../infoTips/infoTips.vue'
import VideoPlay from '../videoPlay/videoPlay.vue'
// import MaterialResource from '../materialResource/materialResource.vue'
import EquipArea from '../equipArea/equipArea.vue'

@Component({
    components: { 
        BriefIntro, 
        EquipType, 
        DefectDis,
        // OperatSitus, 
        DataOverview, 
        InfoTips,
        VideoPlay,
        // MaterialResource 
        EquipArea
    }
})
export default class About extends Vue {}
