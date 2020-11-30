<template>
    <div class="unity3d-wrap">
        <Unity3DWebPlayer
            v-if="brower == 'IE'"
            :modelName="modelName"
            ref="child"
        ></Unity3DWebPlayer>
        <Unity3DWebGL v-else :modelName="modelName" ref="child"></Unity3DWebGL>
    </div>
</template>

<script lang="ts" src="./unity3d.ts"></script>

<style lang="less">
    @import './unity3d.less';
</style>

