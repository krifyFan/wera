<template>
    <div class="overview-wrap">
        <div class="left-wrap">
            <div class="brief-intro-warp">
                <BriefIntro />
            </div>
            <div class="store-proportion-wrap">
                <EquipType />    
            </div> 
            <div class="operat-situa-wrap">
                <DefectDis />
            </div>
        </div>
        <div class="center-wrap">
            <div class="data-overview-wrap">
                <DataOverview />
            </div>
            <div class="material-resources-wrap">
                <EquipArea />
            </div>
        </div>
        <div class="right-wrap">
            <div class="video-wrap">
                <VideoPlay />
            </div>
            
            <div class="info-tips">
                <InfoTips />
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./overview.ts"></script>

<style lang="less">
    @import './overview.less';
</style>

