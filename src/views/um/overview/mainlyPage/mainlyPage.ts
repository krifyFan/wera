import { Component, Vue } from 'vue-property-decorator'
import BriefIntro from '../briefIntro/briefIntro.vue'
import StoreProportion from '../storeProportion/storeProportion.vue'
import OperatSitus from '../operatSitus/operatSitus.vue'
import DataOver from '../dataOver/dataOver.vue'
import InfoTips from '../infoTips/infoTips.vue'
import MaterialResource from '../materialResource/materialResource.vue'

@Component({
    components: { 
        BriefIntro, 
        StoreProportion, 
        OperatSitus, 
        DataOver, 
        InfoTips,
        MaterialResource 
    }
})
export default class About extends Vue {}