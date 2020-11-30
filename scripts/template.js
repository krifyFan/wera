/*
 * @Description: 页面快速生成脚本
 * @Date: 2018-12-06 10:28:08
 * @LastEditTime: 2018-12-12 17:02:36
 */
const fs = require('fs')
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const dirParentName = process.argv[2]
const dirSecondParentName = process.argv[3]
const dirName = process.argv[4]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1)

if (!dirName) {
    console.log('文件夹名称不能为空！')
    console.log('示例：npm run tep ${capPirName}')
    process.exit(0)
}

/**
 * @msg: vue页面模版
 */
const VueTep = `<template>
    <div class="${dirName}-wrap">
        
    </div>
</template>

<script lang="ts" src="./${dirName}.ts"></script>

<style lang="less">
    @import './${dirName}.less';
</style>

`

// ts 模版
const tsTep = `import { Component, Vue } from 'vue-property-decorator'
// import from "@/components" // 组件
// import {  } from '@/api/${dirName}.ts'

@Component({})
export default class About extends Vue {

    // data

    mounted() {
        //
    }

    // 初始化函数
    init() {
        //
    }
    
}
`

// less 模版
const lessTep = `
.${dirName}-wrap {
    width: 100%;
}
`

// vuex 模版
const vuexTep = `import { ${capPirName}State } from '@/types/views/${dirName}.interface'
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import * as ${capPirName}Api from '@/api/${dirName}.ts'

const state: ${capPirName}State = {
    author: '三毛'
}

// 强制使用getter获取state
const getters: GetterTree<${capPirName}State, any> = {
    author: (state: ${capPirName}State) => state.author
}

// 更改state
const mutations: MutationTree<${capPirName}State> = {
  // 更新state都用该方法
    UPDATE_STATE(state: ${capPirName}State, data: ${capPirName}State) {
        function isValidKey(key: string, obj: {}): key is keyof typeof obj {
            return key in obj;
        }
        for (const key in data) {
            if (isValidKey(key, data))  {
                state[key] = data[key]
            }
        }
        // if (!data.hasOwnProperty(key)) { return }
        // state[key] = data[key]
    }
}

const actions: ActionTree<${capPirName}State, any> = {
    UPDATE_STATE_ASYN({ commit, state: ${capPirName}State }, data: ${capPirName}State) {
        commit('UPDATE_STATE', data)
    },
    GET_DATA_ASYN({ commit, state: ${capPirName}State }) {
        ${capPirName}Api.getData()
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}

`



// api 接口模版
const apiTep = `import request from '@/utils/request.ts'

export function test(data: any) {
    return request({
        url: '',
        method: 'post',
        data
    })
}

`


// 递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
mkdirsSync(`${basePath}/views/${dirParentName}/${dirSecondParentName}/${dirName}`,() => {
    // mkdirsSync(`${basePath}/views/${dirParentName}/${dirName}`,() => {
    console.log('done');
})

process.chdir(`${basePath}/views/${dirParentName}/${dirSecondParentName}/${dirName}`) // cd dirName
// process.chdir(`${basePath}/views/${dirParentName}/${dirName}`) // cd dirName
fs.writeFileSync(`${dirName}.vue`, VueTep) // vue 
fs.writeFileSync(`${dirName}.ts`, tsTep) // ts
fs.writeFileSync(`${dirName}.less`, lessTep) // less

// process.chdir(`${basePath}/store/module`); // cd store
// fs.writeFileSync(`${dirName}.ts`, vuexTep) // vuex

// process.chdir(`${basePath}/api`); // cd api
// 
// fs.writeFileSync(`${dirName}.ts`, apiTep) // api

process.exit(0)