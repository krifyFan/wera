<template>
    <div class="msgManage-wrap">
        <!-- <Row class="conditions-wrap">
            <Col span="6">
                <div class="condition-label">消息类别</div>
                <div class="query-width">
                    <Select v-model="conditions.type">
                        <Option value="null">所有</Option>
                        <Option v-for="item in type" :key="item.val" :value="item.val">{{item.key}}</Option>
                    </Select>
                </div>
            </Col>
            <Col span="6">
                <div class="condition-label">设备编号</div>
                <div class="query-width">
                    <Input v-model="conditions.equipmentSn" style="width: 100%" placeholder="请输入设备编号"/>
                </div>
            </Col>
            <Col span="6" offset="6" align="right">
                <Button type="default" style="margin-right: 5px;" @click="resetConditions()">重置</Button>
                <Button type="primary" @click="getMsgList()">查询</Button>
            </Col>
         </Row> -->
        <div class="table-wrap">
            <Table 
                border 
                ref="section" 
                :columns="msgColumns" 
                :data="msgData"
            ></Table>
        </div>
        <!-- 详情弹框  -->
        <Modal v-model="isShow" title="告警详情" width="1200" draggable>
            <Form :model="alarmForm" :label-width="100">
                <Row>
                    <Col span="7">
                        <FormItem label="告警编号：" >
                            <Input v-model="alarmForm.id" readonly />
                        </FormItem>
                        </Col>
                        <Col span="7">    
                        <FormItem label="告警类型：">
                            <Input v-model="alarmForm.alarmTypeName" readonly/>
                        </FormItem>
                        </Col>
                        <Col span="7">    
                        <FormItem label="告警级别：">
                            <Input v-model="alarmForm.alarmSeverity" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="7">
                        <FormItem label="对象编号：" >
                            <Input v-model="alarmForm.objId" readonly/>
                        </FormItem>
                        </Col>
                        <Col span="7">    
                        <FormItem label="对象名称：">
                            <Input v-model="alarmForm.objName" readonly/>
                        </FormItem>
                        </Col>
                        <Col span="7">    
                        <FormItem label="告警源：">
                            <Input v-model="alarmForm.alarmSource" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="7">
                        <FormItem label="告警时间：" >
                            <Input v-model="alarmForm.alarmDatetime" readonly/>
                        </FormItem>
                        </Col>
                        <Col span="7">    
                        <FormItem label="设备编号：">
                            <Input v-model="alarmForm.equipmentSn" readonly/>
                        </FormItem>
                        </Col>
                        <Col span="7">    
                        <FormItem label="设备名称：">
                            <Input v-model="alarmForm.equipmentName" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="7">
                        <FormItem label="确认状态：" >
                            <Input v-model="alarmForm.acked" readonly/>
                        </FormItem>
                        </Col>
                        <Col span="7">    
                        <FormItem label="确认人：">
                            <Input v-model="alarmForm.ackUser" readonly/>
                        </FormItem>
                        </Col>
                        <Col span="7">    
                        <FormItem label="确认时间：">
                            <Input v-model="alarmForm.ackTime" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="7">
                        <FormItem label="清除状态：" >
                            <Input v-model="alarmForm.cleared" readonly/>
                        </FormItem>
                        </Col>
                        <Col span="7">    
                        <FormItem label="清除人：">
                            <Input v-model="alarmForm.clearUser" readonly/>
                        </FormItem>
                        </Col>
                        <Col span="7">    
                        <FormItem label="清除时间：">
                            <Input v-model="alarmForm.clearedTime" readonly/>
                        </FormItem>
                    </Col>
                </Row>
                    <Row>
                    <Col span="21">
                        <FormItem label="描述：" >
                            <Input type="textarea" v-model="alarmForm.description" readonly/>
                        </FormItem>
                        </Col>
                </Row>
            </Form>
            <!-- <div slot="footer" style="text-align: center">
                <Button size="large" type="primary" @click="goback()">返回</Button>
            </div> -->
        </Modal>

        <!-- 确认弹框  -->
        <Modal v-model="isAckedShow" title="确认告警"  draggable>
            <Form :model="alarmForm" :label-width="100">
                <Row class="table-wrap">
                    <Col >
                        <FormItem label="确认告警类型：" >
                            <Select v-model="alarmForm.ackResult">
                                <Option value="11">正常告警</Option>
                                <Option value="12">系统误报</Option>
                                <Option value="13">无法确认</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="确认描述：" >
                            <Input v-model="alarmForm.ackDesc" type="textarea" />
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer" style="text-align: right">
                <Button type="primary" @click="submitAckedAlarm()">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./msgManage.ts"></script>

<style lang="less">
    @import './msgManage.less';
</style>