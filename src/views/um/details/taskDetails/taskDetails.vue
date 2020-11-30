<template>
    <div class="taskDetails-wrap">
        <div class="page-title">{{pageTitle}}</div>
        <div class="content-wrap">
            <Row>    
                <Form class="details-form" :model="taskInfo" :label-width="160">
                    <Col span="8" offset="4">
                        <FormItem label="所属计划">
                            <Input v-model="taskInfo.planName" :readonly="pageType === 'Read'"/>
                        </FormItem>
                        <!-- <FormItem label="是否完成">
                            <Select v-model="taskInfo.isFinished">
                                <Option></Option>
                            </Select>
                        </FormItem> -->
                        <FormItem label="是否合并记录">
                            <Select v-model="taskInfo.isMerge" disabled>
                                <Option v-for="item in mergeOptions" :key="item.val" :value="item.val">{{item.key}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="开始时间">
                            <DatePicker 
                                type="datetime" 
                                placeholder="请选择开始时间" 
                                style="width: 100%"
                                v-model="taskInfo.startTime"
                                :readonly="pageType === 'Read'"
                            ></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="8" offset="1">
                        <FormItem label="任务名称">
                            <Input v-model="taskInfo.taskName" :readonly="pageType === 'Read'"/>
                        </FormItem>
                        <FormItem label="巡检人">
                            <!-- <Input v-model="taskInfo.responsibleId"/> -->
                            <Input v-model="responsible" :readonly="pageType === 'Read'"/>
                        </FormItem>
                        <FormItem label="结束时间">
                            <DatePicker 
                                type="datetime" 
                                placeholder="请选择结束时间" 
                                style="width: 100%"
                                v-model="taskInfo.endTime"
                                :readonly="pageType === 'Read'"
                            ></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="17" offset="4">
                        <FormItem label="描述">
                            <Input type="textarea" v-model="taskInfo.description" :readonly="pageType === 'Read'"/>
                        </FormItem>
                    </Col>
                </Form>
            </Row>
            <div class="btn-wrap">
                <div class="btn submit-btn" v-if="pageType==='Add'" @click="addTask()">提交</div>
                <div class="btn submit-btn" v-if="pageType==='Edit'" @click="editTask()">提交</div>
                <div class="btn back-btn" @click="back()">返回</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./taskDetails.ts"></script>

<style lang="less">
    @import './taskDetails.less';
</style>

