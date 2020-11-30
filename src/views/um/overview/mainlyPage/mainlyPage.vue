<template>
    <div class="mainlyPage-wrap">
        <div class="left-wrap">
            <div class="brief-wrap">
                <BriefIntro />
            </div>
            <div class="store-wrap">
                <StoreProportion />
            </div>
            <div class="opera-wrap">
                <OperatSitus />
            </div>
        </div>
        <div class="right-wrap">
            <div class="data-over-wrap">
                <DataOver />
            </div>
            <div class="bottom-wrap">
                <div class="tips-wrap">
                    <InfoTips />
                </div>
                <div class="mater-wrap">
                    <MaterialResource />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./mainlyPage.ts"></script>

<style lang="less">
    @import './mainlyPage.less';
</style>

