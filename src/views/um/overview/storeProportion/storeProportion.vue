<template>
    <div class="storeProportion-wrap">
        <div class="over-title">不同仓位占比</div>
        <div class="pie-chart-wrap">
            <PieChartNormal :bindData="storeProData"/>
        </div>
    </div>
</template>

<script lang="ts" src="./storeProportion.ts"></script>

<style lang="less">
    @import './storeProportion.less';
</style>

