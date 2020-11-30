<template>
    <div class="maintenanceRecord-wrap">
        <div class="page-title">{{pageTitle}}</div>
        <div class="content-wrap">
            <Row>    
                <Form class="details-form" :model="recordInfo" :label-width="150">
                    <Col span="8" offset="4">
                        <FormItem label="设备编号">
                            <Input v-model="recordInfo.equipmentId" v-show="false"/>
                            <Input v-model="equipmentSn" @on-keyup="searchEquipId" :readonly="pageType==='Read' || fromPage === 'task'"/>
                            <ul class="dounce-info-wrap" v-show="isShowEquip">
                                <li 
                                    v-for="(item, index) in equipmentSns" 
                                    :key="index" 
                                    :value="item.id"
                                    @click="choosedEquipId(item.id, item.equipmentSn,item.equipmentName)"
                                >{{item.equipmentSn}}</li>
                            </ul>
                        </FormItem>
                        <FormItem label="设备名称">
                            <Input v-model="equipmentName" readonly />
                        </FormItem>
                        <FormItem label="维保时间">
                            <DatePicker 
                                type="datetime" 
                                format="yyyy-MM-dd HH:mm:ss" 
                                placeholder="请选择维保时间"
                                v-model="recordInfo.maintainTime"
                                style="width: 100%"
                                :disabled="pageType==='Read' || fromPage === 'task'"
                            ></DatePicker>
                        </FormItem>
                        <FormItem label="负责人">
                            <Input v-model="recordInfo.liablePerson" :readonly="pageType==='Read' || fromPage === 'task'"/>
                        </FormItem>
                        <FormItem label="维保结果">
                            <Select v-model="recordInfo.status" :disabled="pageType==='Read'">
                                <Option v-for="item in status" :key="item.val" :value="item.val">{{item.key}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="完成时间">
                            <DatePicker 
                                type="datetime" 
                                format="yyyy-MM-dd HH:mm:ss" 
                                placeholder="请选择维保时间"
                                v-model="recordInfo.finishTime"
                                style="width: 100%"
                                :disabled="pageType==='Read'"
                            ></DatePicker>
                        </FormItem>
                        <FormItem label="维保厂商">
                            <Input v-model="recordInfo.maintainFirm" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="维保人">
                            <Input v-model="recordInfo.maintainPerson" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="联系方式">
                            <Input v-model="recordInfo.maintainPhone" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="备注">
                            <Input type="textarea" :rows="2" placeholder="请输入备注"  v-model="recordInfo.description" :readonly="pageType==='Read'"/>
                        </FormItem>
                    </Col>
                    <Col span="8" offset="1">
                        <FormItem label="维保文件" v-show="pageType!=='Read'">
                            <Upload 
                                :action="uploadUrl"
                                :on-success="fileSuccess"
                                :format="['pdf']"
                            >
                                <Button icon="ios-cloud-upload-outline">请上传PDF格式的文件</Button>
                            </Upload>
                        </FormItem>
                        <FormItem :label="pageType==='Read' ? '维保文件' : '' ">
                            <div class="file-wrap scrollbar">
                                <pdf 
                                    :page="file.curPage"
                                    :src="pdfSrc"
                                    @num-pages="file.totalPage=$event"
                                    @page-loaded="file.curPage=$event"
                                    @loaded="loadPdfHandler"
                                ></pdf>
                            </div>
                            <div class="btn-change-page">
                                <Button
                                    v-show="pdfSrc && file.curPage > 1"
                                    type="primary"
                                    @click="changePdfPage(0)"
                                    size="small"
                                    class="pageTurner"
                                >上一页</Button>
                                <div
                                    class="pageNote"
                                    v-show="pdfSrc && file.totalPage"
                                >{{ file.curPage + "-" + file.totalPage}}</div>
                                <Button
                                    type="primary"
                                    @click="changePdfPage(1)"
                                    size="small"
                                    class="pageTurner"
                                    v-show="pdfSrc && file.curPage < file.totalPage"
                                >下一页</Button>
                            </div>
                        </FormItem>
                    </Col>
                </Form>
            </Row>
            <div class="btn-wrap">
                <div class="btn submit-btn" @click="addRecord()" v-show="pageType==='Add'">提交</div>
                <div class="btn submit-btn" @click="editRecord()" v-show="pageType==='Edit' && fromPage === 'record'">提交</div>
                <div class="btn submit-btn" @click="submitTask()" v-show="pageType==='Edit' && fromPage === 'task'">提交</div>
                <div class="btn back-btn" @click="back()">返回</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./maintenanceRecord.ts"></script>

<style lang="less">
    @import './maintenanceRecord.less';
</style>

