<template>
    <div class="historyData-wrap">
        <div class="echarts-wrap">
            <LineChartMultiple :bindData="historyLineData"/>
        </div>
        <div class="time-wrap">
            <div class="time-define-wrap">
                <div class="time-select">
                    <Select @on-change="choosedTime" v-model="choosedTimeType">
                        <Option v-for="item in times" :key="item.id" :value="item.id">{{item.name}}</Option>
                    </Select>
                </div>
                <div class="time-start-wrap">
                    <span style="padding-right: 5px">开始时间</span>
                    <DatePicker 
                        type="datetime" 
                        format="yyyy-MM-dd HH:mm:ss" 
                        placeholder="请选择开始时间" 
                        style="width: 220px"
                        v-model="startTime"
                        :readonly="choosedTimeType === 1 || choosedTimeType === 2"
                    ></DatePicker>
                </div>
                <div class="time-end-wrap">
                    <span style="padding-right: 5px">结束时间</span>
                    <DatePicker 
                        type="datetime" 
                        format="yyyy-MM-dd HH:mm:ss" 
                        placeholder="请选择结束时间" 
                        style="width: 220px"
                        v-model="endTime"
                        :readonly="choosedTimeType === 1 || choosedTimeType === 2"
                    ></DatePicker>
                </div>
                <div class="search-icon">
                    <Icon type="md-search" size="26" @click="initData()"/>
                </div>
                <div class="btn-wrap">
                    <div class="btn back-btn" @click="back()">返回</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./historyData.ts"></script>

<style lang="less">
    @import './historyData.less';
</style>

