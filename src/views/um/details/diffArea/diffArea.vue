<template>
    <div class="diffArea-wrap">
        <Row>
            <Col span="6">
                <SelectTemp :data="selectCategories" @on-change="choosedCategory"></SelectTemp>
            </Col>
            <Col span="6">
                <SelectTemp :data="selectType" @on-change="choosedTypes"></SelectTemp>
            </Col>
        </Row>
        <div class="area-e-wrap">
            <div class="forklift-charging-area area-wrap">
                叉车<br>充电区
            </div>
            <div class="auto-store-area area-wrap">
                自动<br>存储区
            </div>
            <div class="elevator-area area-wrap">
                <div class="elevator-top">
                    <div class="elevator">电梯</div>
                </div>
                <div class="elevator-bottom"></div>
            </div>
            <div class="bottom-area-wrap" ref="areas">
                <div 
                    class="area-wrap area-bottom-warp"
                    v-for="(item, index) in areaBottom"
                    :key="index"
                    :class="[
                        currentIndex === index ? 'area-bottom-active' : 'disabled-fiter',  
                        {'hasSome': item.hasEquip},
                    ]"  
                    @click="choosedArea(index)"
                >
                    <p>
                        <img :src="currentIndex === index ? item.normalImg : item.choosedImg"/>
                    </p>
                </div>
            </div>
            <div class="plane-stacking-area-wrap">
                平面堆放区
            </div>
            <div class="equip-warp scrollbar" v-show="isShow">
                <div class="icon-wrap">
                    <Icon type="md-close" />
                </div>
                <div class="table-header">
                    <div>设备名称</div>
                    <div>设备编号</div>
                    <div>使用状态</div>
                    <div>告警状态</div>
                </div>
                <div class="table-content">
                    <div
                        v-for="item in equipInfo"
                        :key="item.id"
                        class="table-content-tr"
                    >
                        <div>{{item.equipName}}</div>
                        <div>{{item.equipSn}}</div>
                        <div>{{item.status}}</div>
                        <div>{{item.alarmStatus}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./diffArea.ts"></script>

<style lang="less"> 
    @import './diffArea.less';
</style>

