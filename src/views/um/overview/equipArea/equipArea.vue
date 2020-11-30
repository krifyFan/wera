<template>
    <div class="equipArea-wrap">
        <div class="over-title">各区设备</div>
        <div class="equip-area-chart-wrap">
            <BarChartNormal :bindData="materialResourcesData" />
        </div>
    </div>
</template>

<script lang="ts" src="./equipArea.ts"></script>

<style lang="less">
    @import './equipArea.less';
</style>

