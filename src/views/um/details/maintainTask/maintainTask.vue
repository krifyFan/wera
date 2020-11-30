<template>
    <div class="maintainTask-wrap">
        <Row class="conditions-wrap">
            <Col span="6">
                <div class="condition-label">设备编号</div>
                <div class="query-width">
                    <Input v-model="conditions.equipmentSn" style="width: 100%" placeholder="请输入设备编号"/>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">责任人</div>
                <div class="query-width">
                    <Input v-model="conditions.liablePerson" style="width: 100%" placeholder="请输入设备编号"/>
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
                <Button type="primary" @click="listTask()">查询</Button>
            </Col>
        </Row>
        <div class="table-wrap">
            <div class="operation-table-wrap">
                <!-- <Button type="primary" ghost class="operat-btn" @click="goToModule('Add')">
                    <Icon type="md-add" color="#0078DB"/>
                    新增维保任务
                </Button> -->
                <Button type="error" class="operat-btn" @click="deleteBatch()">
                    <Icon type="ios-trash" color="#fff"/>
                    删除
                </Button>
            </div>
            <Table 
                border 
                ref="section" 
                :columns="maintainTaskColumns" 
                :data="maintainTaskData"
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

<script lang="ts" src="./maintainTask.ts"></script>

<style lang="less">
    @import './maintainTask.less';
</style>

