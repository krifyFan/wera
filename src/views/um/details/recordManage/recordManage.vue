<template>
    <div class="recordManage-wrap">
        <Row class="conditions-wrap">
            <Col span="6">
                <div class="condition-label">所属任务</div>
                <div class="query-width">
                    <Input style="width: 100%" v-show="false" placeholder="请输入所属任务" v-model="conditions.taskId"/>
                    <Input v-model="taskName" @on-keyup="searchTask" />
                    <ul class="dounce-info-wrap" v-show="isShow">
                        <li
                            v-for="(item, index) in tasks" 
                            :key="index" 
                            :value="item.id"
                            @click="choosedTaskName(item.id, item.taskName)"
                        >{{item.taskName}}</li>
                    </ul>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">状态</div>
                <div class="query-width">
                    <Select v-model="conditions.status">
                        <Option value="null">所有</Option>
                        <Option v-for="item in status" :key="item.val" :value="item.key">{{item.val}}</Option>
                    </Select>
                </div>
            </Col>
            <Col span="6" offset="6" align="right">
                <Button type="default" style="margin-right: 5px;" @click="resetConditions()">重置</Button>
                <Button type="primary" @click="listRecordDatagrid()">查询</Button>
            </Col>
        </Row>
        <div class="table-wrap">
            <!-- <Button type="success" class="operat-btn" @click="goToModule('添加巡检记录', 'Add')">
                <Icon type="md-add" color="#fff"/>
                新增
            </Button> -->
            <Button type="error" class="operat-btn" @click="deleteBatch()">
                <Icon type="ios-trash" color="#fff"/>
                删除
            </Button>
            <Table 
                border 
                ref="section" 
                :columns="recordColumns" 
                :data="recordData"
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
                    size="small"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./recordManage.ts"></script>

<style lang="less">
    @import './recordManage.less';
</style>

