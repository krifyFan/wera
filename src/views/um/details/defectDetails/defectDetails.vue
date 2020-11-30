<template>
    <div class="defectDetails-wrap">
        <div class="page-title">{{pageTitle}}</div>
        <div class="content-wrap">
            <Row>    
                <Form class="details-form" :model="defectInfo" :label-width="150">
                    <Col span="8" offset="4">
                        <FormItem label="缺陷名称">
                            <Input v-model="defectInfo.defectName" :readonly="pageType === 'Read'"/>
                        </FormItem>
                        <FormItem label="所属区域">
                            <Select v-model="defectInfo.areaId" :disabled="pageType === 'Read'">
                                <Option v-for="item in areas" :key="item.id" :value="item.id">{{item.areaName}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="所属分区">
                            <Select v-model="defectInfo.zoneId" :disabled="pageType === 'Read'">
                                <Option v-for="item in zones" :key="item.id" :value="item.id">{{item.zoneName}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="描述">
                            <Input type="textarea" v-model="defectInfo.description" :readonly="pageType === 'Read'"/>
                        </FormItem>
                    </Col>
                    <Col span="8" offset="1">
                        <FormItem label="提交人">
                            <Input v-model="staffName" readonly/>
                        </FormItem>
                        <FormItem label="维修人">
                            <Input v-model="defectInfo.maintainPerson" :readonly="pageType === 'Read'"/>
                        </FormItem>
                        <FormItem label="缺陷等级">
                            <Select v-model="defectInfo.defectLevel" :disabled="pageType === 'Read'">
                                <Option v-for="item in levelOptions" :key="item.key" :value="item.key">{{item.val}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="缺陷状态">
                            <Select v-model="defectInfo.defectStatus" :disabled="pageType === 'Read'">
                                <Option v-for="item in statusOptions" :key="item.key" :value="item.key">{{item.val}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Form>
            </Row>
            <div class="btn-wrap">
                <div class="btn submit-btn" v-if="pageType==='Add'" @click="addDefect()">提交</div>
                <div class="btn submit-btn" v-if="pageType==='Edit'" @click="editDefect()">提交</div>
                <div class="btn back-btn" @click="back()">返回</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./defectDetails.ts"></script>

<style lang="less">
    @import './defectDetails.less';
</style>

