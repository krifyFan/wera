import request from '@/utils/request.ts'
import Vue from 'vue'

export default async () => {
    let config =
        process.env.NODE_ENV === 'production' ?
        (await request.get('../serverconfig.json')).data //生产环境
        :
        require('../../public/serverconfig.json') //开发环境

    /** 设置ECharts主题 */
    Vue.prototype.EChartsTheme = process.env.NODE_ENV === 'production' ?
        (await request.get('../eChartsTheme/' + config.EChartsTheme + '.project.json')).data.theme //生产环境
        :
        require('../../public/eChartsTheme/' + config.EChartsTheme + '.project.json').theme //开发环境

    Vue.prototype.MQParams = config.MQParams
}