/*
 * @Description: 组件快速生成脚本
 * @Date: 2018-12-06 10:26:23
 * @LastEditTime: 2018-12-10 09:44:19
 */

const fs = require('fs')
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const dirName = process.argv[2]
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

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator"

    @Component({})
    export default class About extends Vue {
        // prop
        @Prop({
            required: false,
            default: ''
        }) data!: string

    }
</script>

<style lang="less">
    .${dirName}-wrap {
        width: 100%;
    }
</style>

`

fs.mkdirSync(`${basePath}/components/${dirName}`) // mkdir

process.chdir(`${basePath}/components/${dirName}`) // cd views
fs.writeFileSync(`${dirName}.vue`, VueTep) // vue 

process.exit(0)