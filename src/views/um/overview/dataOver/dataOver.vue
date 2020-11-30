<template>
    <div class="dataOver-wrap">
        <div class="over-title">数据总览</div>
        <div class="safe-opera">
            安全运营<span class="safe-num">{{safeNum}}&nbsp;&nbsp;&nbsp;&nbsp;</span>天
        </div>
        <div class="bottom-wrap">
            <div class="dash-board">
                <div class="left-dash-board-wrap">
                    <GaugeChartNormal :bindData="failureRateData"/>
                </div>
                <div class="right-dash-board-wrap">
                    <GaugeChartNormal :bindData="InclinationData"/>
                </div>
                <div class="temperature-wrap">
                    <GaugeChartNormal :bindData="tempRateData"/>
                </div>
                <div class="humidity-wrap">
                    <GaugeChartNormal :bindData="humidityData"/>
                </div>
            </div>
            <div class="equip-num-wrap">
                <div class="available-num" 
                    :style="{backgroundImage: 'url(' + avaiableBG + ')', backgroundSize: 'contain', backgroundRepeat: 'round' }">
                    <div>{{availableNum}}</div>
                    <div>可用物联设备总数</div>
                </div>
                <!-- <div class="unavailable-num" 
                    :style="{backgroundImage: 'url(' + unavailableBG + ')', backgroundSize: 'contain', backgroundRepeat: 'round' }">
                    <div>{{unavailableNum}}</div>
                    <div>不可用物联设备总数</div>
                </div> -->
                <div class="online-num" 
                    :style="{backgroundImage: 'url(' + unavailableBG + ')', backgroundSize: 'contain', backgroundRepeat: 'round' }">
                    <div>{{onlineNum}}</div>
                    <div>可物联设备在线数</div>
                </div>
                <div class="offline-num" 
                    :style="{backgroundImage: 'url(' + avaiableBG + ')', backgroundSize: 'contain', backgroundRepeat: 'round' }">
                    <div class="redColor">{{offlineNum}}</div>
                    <div>可物联设备离线数</div>
                </div>
                <div class="alarm-num" 
                    :style="{backgroundImage: 'url(' + unavailableBG + ')', backgroundSize: 'contain', backgroundRepeat: 'round' }">
                    <div class="redColor">{{alarmNum}}</div>
                    <div>告警数量</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./dataOver.ts"></script>

<style lang="less">
    @import './dataOver.less';
</style>



