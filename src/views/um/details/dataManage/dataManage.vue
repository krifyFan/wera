<template>
    <div class="dataManage-wrap">
        <Row class="conditions-wrap">
            <Col span="6">
                <div class="condition-label">监测区域</div>
                <Select class="query-width" v-model="conditions.areaId">
                    <Option value="null">所有</Option>
                    <Option v-for="item in areas" :key="item.id" :value="item.id">{{item.areaName}}</Option>
                </Select>
            </Col>
            <Col span="6">
                <div class="condition-label">对象编号</div>
                <Input class="query-width" v-model="conditions.objSn"  placeholder="请输入设备名称"/>
            </Col>
            <Col span="6">
                <div class="condition-label">对象类型</div>
                <Select class="query-width" v-model="conditions.measobjTypeId">
                    <Option value="null">所有</Option>
                    <Option v-for="item in objTypes" :key="item.id" :value="item.id">{{item.measobjTypeName}}</Option>
                </Select>
            </Col>
            <Col span="6" align="right">
                <Button type="default" style="margin-right: 5px;" @click="resetConditions()">重置</Button>
                <Button type="primary" @click="measobjDatagrid()">查询</Button>
            </Col>
        </Row>
        <div class="table-wrap">
            <div class="operation-table-wrap">
                <Button type="primary" class="operat-btn" @click="searchHisData()">
                    <img :src="hisDataIcon" style="width: 15px"/>
                    查询历史数据
                </Button>
                <Button type="primary" class="operat-btn">
                    <Icon type="ios-trash" color="#fff"/>
                    批量删除
                </Button>
            </div>
            <Table 
                border 
                ref="section" 
                :columns="dataMColumns" 
                :data="dataMData"
                :max-height="540"
                @on-selection-change="changeSelect"
            ></Table>
            <div class="page">
                <div class="total-page">
                    <span class="total-page-label">总计</span>
                    <span class="total-page-value">
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        ({{page.pageTotal}})
                        &nbsp;&nbsp;&nbsp;&nbsp;条</span>
                </div>
                <Page 
                    ref="page"
                    :total="page.pageTotal" 
                    :current="page.pageNum"
                    :page-size="page.pageSize"
                    @on-change="handlePage"
                    @on-page-size-change="handlePageSize"
                    size="small"
                />
            </div>
            
        </div>
    </div>
</template>

<script lang="ts" src="./dataManage.ts"></script>

<style lang="less">
    @import './dataManage.less';
</style>

