<template>
    <div class="maintainTaskDetails-wrap">
       <div class="page-title">{{pageTitle}}</div>
        <div class="content-wrap">
            <Row>    
                <Form class="details-form" :model="taskInfo" :label-width="150">
                    <Col span="8" offset="4">
                        <FormItem label="设备编号">
                            <Input v-model="taskInfo.equipmentSn" :readonly="pageType==='Read'"/>
                        </FormItem> 
                        
                        <FormItem label="责任人">
                            <Input v-model="taskInfo.equipmentName" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="维保时间">
                            <DatePicker 
                                type="datetime" 
                                format="yyyy-MM-dd HH:mm:ss" 
                                placeholder="请选择维保时间"
                                v-model="taskInfo.maintainTime"
                                style="width: 100%"
                                :readonly="pageType==='Read'"
                            ></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="8" offset="1">
                    <FormItem label="设备名称">
                            <Input v-model="taskInfo.equipmentName" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="联系方式">
                            <Input v-model="taskInfo.equipmentName" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="完成时间">
                            <DatePicker 
                                type="datetime" 
                                format="yyyy-MM-dd HH:mm:ss" 
                                placeholder="请选择维保时间"
                                v-model="taskInfo.finishTime"
                                style="width: 100%"
                                :readonly="pageType==='Read'"
                            ></DatePicker>
                        </FormItem>
                    </Col>
                </Form>
            </Row>
            <div class="btn-wrap">
                <div class="btn submit-btn" @click="addRecord()" v-show="pageType==='Add'">提交</div>
                <div class="btn submit-btn" @click="editRecord()" v-show="pageType==='Edit'">提交</div>
                <div class="btn back-btn" @click="back()">返回</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./maintainTaskDetails.ts"></script>

<style lang="less">
    @import './maintainTaskDetails.less';
</style>

