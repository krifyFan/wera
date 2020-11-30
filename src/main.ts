import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'view-design/dist/styles/iview.css';
import iview from '@/iview/index.ts';
import { Message, Modal } from 'view-design';
import '@/assets/less/common.less';
import '@/assets/less/custom.less';
import '@/utils/common.ts'
import echarts from 'echarts';
const serve = require('../public/serverconfig.json')
import vueXlsxTable from 'vue-xlsx-table'
import '@/utils/mq'
import { MQ } from '@/utils/mq'
import 'lib-flexible/flexible'
Vue.use(vueXlsxTable, {
    rABS: false
});

Vue.config.productionTip = false;

Vue.use(iview)
Vue.prototype.$echarts = echarts;
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal
Vue.prototype.serve = serve
Vue.prototype.back = () => router.back()
Vue.prototype.goToModule = (name: string, pageType: string, id?: any) => {
    router.push({
        name: name,
        params: {
            type: pageType,
            id: id
        }
    })
}

async function main_init() {
    try {
        let request = (await import("@/utils/config")).default;
        await request();
        let permission = (await import("@/utils/permission")).permission;
        await permission();

        // let mq: MQ = new MQ()
        // mq.openMQ()
        
        return "success"

    } catch (error) {
        throw new Error(error)
    }
}

main_init().then(res => {
    new Vue({
        router,
        store,
        render: (h) => h(App)
    }).$mount('#app');

    // 窗口关闭前断掉MQ连接
    window.onbeforeunload = function(){
        let MQ = Vue.prototype.MQ;
        MQ.closeMQ();
    }

}).catch(err => {
    console.log("初始化异常", err)
})
