<template>
    <div class="maintenanceManage-wrap">
        <Row class="conditions-wrap">
            <Col span="6">
                <div class="condition-label">设备编号</div>
                <div class="query-width">
                    <Input v-model="conditions.equipmentSn" style="width: 100%" placeholder="请输入设备编号"/>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">维保结果</div>
                <div class="query-width">
                    <Select v-model="conditions.status">
                        <Option value="null">所有</Option>
                        <Option v-for="item in status" :key="item.val" :value="item.val">{{item.key}}</Option>
                    </Select>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">是否完成</div>
                <div class="query-width">
                    <Select v-model="conditions.isFinish">
                        <Option value="null">所有</Option>
                        <Option v-for="item in isFinish" :key="item.val" :value="item.val">{{item.key}}</Option>
                    </Select>
                </div>
            </Col>
            <Col span="6" align="right">
                <Button type="default" style="margin-right: 5px;" @click="resetConditions()">重置</Button>
                <Button type="primary" @click="listRecord()">查询</Button>
            </Col>
        </Row>
        <div class="table-wrap">
            <div class="operation-table-wrap">
                <Button type="success" class="operat-btn" @click="goToModule('Add')">
                    <Icon type="md-add" color="#fff"/>
                    新增
                </Button>
                <Button type="error" class="operat-btn" @click="deleteBatch()">
                    <Icon type="ios-trash" color="#fff"/>
                    删除
                </Button>
            </div>
            <Table 
                border 
                ref="section" 
                :columns="maintenanceRecordColumns" 
                :data="maintenanceRecordData"
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

<script lang="ts" src="./maintenanceManage.ts"></script>

<style lang="less">
    @import './maintenanceManage.less';
</style>

