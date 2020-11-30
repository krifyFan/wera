import {
    Component,
    Vue
} from 'vue-property-decorator'
import NavBar from '@/components/common/navBar.vue'
import {
    Route
} from 'vue-router'


@Component({
    components: {
        NavBar
    }
})
export default class About extends Vue {

    breadCrumbs: string[] = (localStorage.getItem('curCrumb') as string).split(',')

    getBreadCrumb(item: string[]) {
        this.breadCrumbs = item
    }
}