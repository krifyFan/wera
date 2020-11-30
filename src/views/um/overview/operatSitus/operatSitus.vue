<template>
    <div class="operatSitus-wrap">
        <div class="over-title">运维情况</div>
        <BinaryTree class="operatSitus-data-wrap" id="binaryTreeId" :data="operatSitusData" :color="treeColor"/>
    </div>
</template>

<script lang="ts" src="./operatSitus.ts"></script>

<style lang="less">
    @import './operatSitus.less';
</style>

