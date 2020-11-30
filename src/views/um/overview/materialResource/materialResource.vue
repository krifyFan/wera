<template>
    <div class="materialResource-wrap">
        <div class="over-title">不同区域物力资源情况</div>
        <BarChartNormal class="bar-chart-warp" :bindData="materialResourcesData" />
    </div>
</template>

<script lang="ts" src="./materialResource.ts"></script>

<style lang="less">
    @import './materialResource.less';
</style>

