<template>
    <div class="defectDis-wrap">
        <div class="over-title">缺陷分布</div>
        <div class="pie-chart-wrap">
            <PieChartNormal :bindData="storeProData"/>
        </div>
    </div>
</template>

<script lang="ts" src="./defectDis.ts"></script>

<style lang="less">
    @import './defectDis.less';
</style>

