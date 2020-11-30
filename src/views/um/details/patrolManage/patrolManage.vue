<template>
    <div class="patrolManage-wrap">
        <Row class="conditions-wrap">
            <Col span="6">
                <div class="condition-label">计划编号</div>
                <div class="query-width">
                    <Input v-model="conditions.planSn" style="width: 100%" placeholder="请输入计划编号"/>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">计划状态</div>
                <div class="query-width">
                    <Select v-model="conditions.planStatus">
                        <Option value="null">所有</Option>
                        <Option v-for="item in status" :key="item.val" :value="item.key">{{item.val}}</Option>
                    </Select>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">责任人</div>
                <div class="query-width">
                    <Input v-model="conditions.responsibleId" v-show="false"/>
                    <Input v-model="responsibleName" @on-keyup="searchResponsibleId" />
                    <ul class="dounce-info-wrap" v-show="isShow">
                        <li 
                            v-for="(item, index) in names" 
                            :key="index" 
                            :value="item.id"
                            @click="choosedResponsible(item.id, item.name)"
                        >{{item.name}}</li>
                    </ul>
                </div>
            </Col>
            <Col span="6" align="right">
                <Button type="default" style="margin-right: 5px;" @click="resetConditions()">重置</Button>
                <Button type="primary" @click="planDatagrid()">查询</Button>
            </Col>
        </Row>
        <div class="table-wrap">
            <div class="operation-table-wrap">
                <Button type="success" class="operat-btn" @click="goToModule('添加巡检计划', 'Add')">
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
                :columns="patrolColumns" 
                :data="patrolData"
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

<script lang="ts" src="./patrolManage.ts"></script>

<style lang="less">
    @import './patrolManage.less';
</style>

