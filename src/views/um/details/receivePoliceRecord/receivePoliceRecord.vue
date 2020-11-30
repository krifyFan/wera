<template>
    <div class="maintainTask-wrap">
        <Row class="conditions-wrap">
            <Col span="6">
                <div class="condition-label">处理状态</div>
                <div class="query-width">
                    <Select v-model="conditions.recordStatus">
                        <Option value="null">所有</Option>
                        <Option v-for="item in recordStatus" :key="item.key" :value="item.val">
                            {{item.key}}
                        </Option>
                    </Select>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">开始时间</div>
                <div class="query-width">
                     <DatePicker type="datetime" v-model="conditions.startTime" placeholder="请选择时间" style="width: 100%"></DatePicker>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">结束时间</div>
                <div class="query-width">
                    <DatePicker type="datetime" v-model="conditions.endTime" placeholder="请选择时间" style="width: 100%"></DatePicker>     
                </div>
            </Col>
            <Col span="6" align="right">
                <Button type="default" style="margin-right: 5px;" @click="resetConditions()">重置</Button>
                <Button type="primary" @click="recordPage()">查询</Button>
            </Col>
        </Row>
        <div class="table-wrap">
            <div class="operation-table-wrap">
                <!-- <Button type="primary" ghost class="operat-btn" @click="showAddMoudle()">
                    <Icon type="md-add" color="#0078DB"/>
                    新增报警记录
                </Button> -->
                <!-- <Button type="primary" ghost class="operat-btn" @click="deleteBatch()">
                    <Icon type="ios-trash" color="#0078DB"/>
                    批量删除
                </Button> -->
            </div>
            <Table 
                border 
                ref="section" 
                :columns="recevicePoliceRecordColumns" 
                :data="recevicePoliceRecordData"
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

            
            <!-- 详情弹框  -->
            <Modal v-model="isInfoShow" title="报警记录详情"  width="1200"  draggable>
                <Form :model="recordInfo" :label-width="120">
                    <Row>
                        <Col span="8">
                            <FormItem label="记录id：" >
                                <Input v-model="recordInfo.id"  :readonly="modalType==='Read'" />
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="报警人：" >
                                <Input v-model="recordInfo.callerName"  :readonly="modalType==='Read'" />
                            </FormItem>
                        </Col>
                         <Col span="8">
                            <FormItem label="报警人联系方式：" >
                                <Input v-model="recordInfo.callerPhone"  :readonly="modalType==='Read'" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem label="标题：" >
                                <Input v-model="recordInfo.title"  :readonly="modalType==='Read'" />
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="地点：" >
                                <Input v-model="recordInfo.place"  :readonly="modalType==='Read'" />
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="时间：" >
                                <DatePicker 
                                    type="datetime" 
                                    style="width: 100%" 
                                    v-model="recordInfo.receiveTime" 
                                    :readonly="modalType==='Read'"
                                ></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <FormItem label="描述：" >
                                <Input 
                                    v-model="recordInfo.description" 
                                    type="textarea" 
                                    :readonly="modalType==='Read'"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row style="margin-top:20px">
                        <Col span="8">
                            <FormItem label="接警人：" >
                                <Input v-model="recordInfo.staffId" v-show="false"/>
                                <Input v-model="staffName" @on-keyup="searchStaff" :readonly="modalType==='Read'"/>
                                <ul class="dounce-info-wrap" v-show="isShow">
                                    <li
                                        v-for="(item, index) in staffs" 
                                        :key="index" 
                                        :value="item.id"
                                        @click="choosedStaffName(item.id, item.name)"
                                    >{{item.name}}</li>
                                </ul>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="出警人：" >
                                <Input v-model="recordInfo.outerName"  :readonly="modalType==='Read'"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="出警人联系方式：" >
                                <Input v-model="recordInfo.outerPhone"  :readonly="modalType==='Read'"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem label="状态：" >
                                <Select v-model="recordInfo.recordStatus" :disabled="modalType==='Read'">
                                    <Option v-for="item in recordStatus" :key="item.key" :value="item.val">
                                        {{item.key}}
                                    </Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="结果类型：" >
                                <Select v-model="recordInfo.resultType" :disabled="modalType==='Read'">
                                    <Option v-for="item in resultType" :key="item.key" :value="item.val">{{item.key}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="处理完成时间：" >
                                <DatePicker 
                                    type="datetime" 
                                    v-model="recordInfo.dealTime" 
                                    placeholder="请选择时间" 
                                    style="width: 100%" 
                                    :readonly="modalType==='Read'"
                                ></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                     <Row>
                        <Col span="24">
                            <FormItem label="处理结果备注：" >
                                <Input 
                                    v-model="recordInfo.resultMark" 
                                    type="textarea" 
                                    :readonly="modalType==='Read'" 
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer" style="text-align: center">
                    <Button size="small" type="success" @click="infoBack()" v-show="modalType==='Read'">返回</Button>
                    <Button size="small" type="success" @click="submitEdit()" v-show="modalType==='Edit'">提交</Button>
                </div>
            </Modal>
            
            <!-- 编辑弹框  -->
            <!-- <Modal v-model="isEditShow" title="报警记录详情"  width="1200"  draggable>
                <Form :model="recordInfo" :label-width="120">
                    <Row>
                        <Col span="7">
                            <FormItem label="记录id：" >
                                <Input v-model="recordInfo.id"  readonly/>
                            </FormItem>
                        </Col>
                         <Col span="7">
                            <FormItem label="报警人：" >
                                <Input v-model="recordInfo.callerName"  />
                            </FormItem>
                        </Col>
                         <Col span="7">
                            <FormItem label="报警人联系方式：" >
                                <Input v-model="recordInfo.callerPhone"  />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="7">
                            <FormItem label="标题：" >
                                <Input v-model="recordInfo.title"  />
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem label="地点：" >
                                <Input v-model="recordInfo.place"  />
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem label="时间：" >
                                <DatePicker type="datetime" v-model="recordInfo.receiveTime" placeholder="请选择时间" style="width: 100%"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="描述：" >
                                <Input v-model="recordInfo.description" type="textarea" />
                            </FormItem>
                        </Col>
                    </Row>
                    <hr></hr>
                    <Row style="marginTop:20px">
                        <Col span="7">
                            <FormItem label="接警人：" >
                                <Input v-model="recordInfo.staffName" readonly />
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem label="出警人：" >
                                <Input v-model="recordInfo.outerName"  />
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem label="出警人联系方式：" >
                                <Input v-model="recordInfo.outerPhone"  />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="7">
                            
                        </Col>
                        <Col span="7">
                            
                        </Col>
                        <Col span="7">
                            <FormItem label="处理完成时间：" >
                                <DatePicker type="datetime" v-model="recordInfo.dealTime" placeholder="请选择时间" style="width: 100%" ></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                     <Row>
                        <Col>
                            <FormItem label="处理结果备注：" >
                                <Input v-model="recordInfo.resultMark" type="textarea" />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer" style="text-align: center">
                    <Button size="small" type="success" @click="submitEdit()">提交</Button>
                </div>
            </Modal> -->

            <alarmAccessModal @refresh="recordPage" :modalState="modalState" />
        </div>
    </div>
</template>

<script lang="ts" src="./receivePoliceRecord.ts"></script>

<style lang="less">
    @import './receivePoliceRecord.less';
</style>

