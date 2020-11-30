<template>
    <div class="dataOverview-wrap">
        <div class="over-title">数据总览</div>
        <div class="safe-opera">
            安全运营<span class="safe-num">&nbsp;&nbsp;&nbsp;&nbsp;{{safeNum}}&nbsp;&nbsp;&nbsp;&nbsp;</span>天
        </div>
        <div class="main-data-wrap">
            <div class="dash-board-wrap">
                <div class="num-wrap left-dash-board-wrap">
                    <GaugeChartNormal :bindData="failureRateData"/>
                </div>
                <div class="num-wrap right-dash-board-wrap">
                    <GaugeChartNormal :bindData="vitalityIndexData"/>
                </div>
            </div>
            <div class="alarm-obj-num-wrap">
                <div class="num-wrap alarm-num" 
                    :style="{backgroundImage: 'url(' + alarmBG + ')', backgroundSize: '100% 100%' }">
                    <div>告警</div>
                    <div>{{alarmNum}}</div>
                </div>
                <div class="num-wrap obj-num" 
                    :style="{backgroundImage: 'url(' + objBG + ')', backgroundSize: '100% 100%' }">
                    <div>监测对象</div>
                    <div>{{measobjNum}}</div>
                </div>
            </div>
            <div class="annual-task-num-wrap">
                <div class="num-wrap available-num" 
                    :style="{backgroundImage: 'url(' + patrolTaskBG + ')', backgroundSize: '100% 100%' }">
                    <div>年度巡检任务</div>
                    <div>{{patrolTaskNum}}</div>
                </div>
                <div class="num-wrap unavailable-num" 
                    :style="{backgroundImage: 'url(' + maintainBG + ')', backgroundSize: '100% 100%' }">
                    <div>年度维保任务</div>
                    <div>{{maintainTaskNum}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./dataOverview.ts"></script>

<style lang="less">
    @import './dataOverview.less';
</style>

