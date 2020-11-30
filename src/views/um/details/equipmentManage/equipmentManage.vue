<template>
    <div class="equipmentManage-wrap">
        <Row class="conditions-wrap">
            <Col span="6">
                <div class="condition-label">设备编号</div>
                <div class="query-width">
                    <Input v-model="conditions.equipmentSn" style="width: 100%" placeholder="请输入设备编号"/>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">设备名称</div>
                <div class="query-width">
                    <Input v-model="conditions.equipmentName"  placeholder="请输入设备名称"/>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">设备大类</div>
                <div class="query-width">
                    <Select v-model="conditions.category"  placeholder="请选择设备大类" @on-change="getTypeByChange">
                        <Option value="null">所有</Option>
                        <Option v-for="(item, index) in categorys" :key="index" :value="item.key">
                            {{item.val}}
                        </Option>
                    </Select>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">设备小类</div>
                <div class="query-width">
                    <Select v-model="conditions.type"  placeholder="请选择设备类型">
                        <Option value="null">所有</Option>
                        <Option v-for="(item, index) in types" :key="index" :value="item.key">
                            {{item.val}}
                        </Option>
                    </Select>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">设备状态</div>
                <div class="query-width">
                    <Select v-model="conditions.status"  placeholder="请选择设备状态">
                        <Option value="null">所有</Option>
                        <Option v-for="(item, index) in status" :key="index" :value="item.key">
                            {{item.val}}
                        </Option>
                    </Select>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">开始时间</div>
                <div class="query-width">
                    <DatePicker 
                        style="width: 100%"
                        type="date" 
                        placeholder="请选择开始时间" 
                        v-model="conditions.startTime">
                    </DatePicker>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">结束时间</div>
                <div class="query-width">
                    <DatePicker 
                        style="width: 100%"
                        type="date" 
                        placeholder="请选择结束时间" 
                        v-model="conditions.endTime">
                    </DatePicker>
                </div>
            </Col>
            <Col span="6" align="right">
                <Button type="default" style="margin-right: 5px;" @click="resetConditions()">重置</Button>
                <Button type="primary" @click="equipmentDatagrid()">查询</Button>
            </Col>
        </Row>
        <div class="table-wrap">
            <div class="operation-table-wrap">
                <Button type="success" class="operat-btn" @click="goToModule('Add')">
                    <Icon type="md-add" color="#fff"/>
                    新增台账
                </Button>
                <Button type="primary" class="operat-btn">
                    <Icon type="md-arrow-up" color="#fff"/>
                    <vue-xlsx-table @on-select-file="handleSelectedFile">
                        <span style="color: #fff">批量导入</span></vue-xlsx-table>
                </Button>
                <Button type="error" class="operat-btn" @click="deleteBatch()">
                    <Icon type="ios-trash" color="#fff"/>
                    批量删除
                </Button>
            </div>
            <Table 
                border 
                ref="section" 
                :columns="equipmentColumns" 
                :data="equipmentData"
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

<script lang="ts" src="./equipmentManage.ts"></script>

<style lang="less">
    @import './equipmentManage.less';
</style>

