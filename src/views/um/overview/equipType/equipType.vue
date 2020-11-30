<template>
    <div class="equipType-wrap">
        <div class="over-title">各类设备</div>
        <div class="pie-chart-wrap">
            <PieChartNormal :bindData="equipmentTypeChartData"/>
        </div>
    </div>
</template>

<script lang="ts" src="./equipType.ts"></script>

<style lang="less">
    @import './equipType.less';
</style>

