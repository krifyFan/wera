<template>
    <div class="infoTips-wrap">
        <div class="over-title">待处理消息</div>
        <div class="pending-info-wrap">
            <div class="info-parent-wrap">
                <div class="pending-alarm-wrap scrollbar">
                    <div class="info-wrap" v-for="item in alarmInfo" :key="item.id">
                        <div class="info-type">告警</div>
                        <div class="info-container">{{item.equipmentName}}—{{item.objName}}—{{item.alarmTypeName}}</div>
                        <div class="info-opera">
                            <Button type="default" size="small" @click="toClearedAlarm(item.id)">清除</Button>
                            <Button type="primary" size="small" style="margin-left: 5px" @click="checkAlarm(item.id)">确认</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info-parent-wrap">
                <div class="pending-task-wrap scrollbar">
                    <div class="info-wrap" v-for="item in taskInfo" :key="item.id">
                        <div class="info-type">任务</div>
                        <div class="info-container">{{item.equipmentSn}}-{{item.equipmentName}}</div>
                        <div class="info-opera">
                            <Button type="primary" size="small" @click="goToModule(item.id)">处理</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 确认弹框  -->
        <Modal v-model="isAckedShow" title="确认告警"  draggable>
            <Form :model="alarmForm" :label-width="100">
                <Row class="table-wrap">
                    <Col >
                        <FormItem label="确认告警类型：" >
                            <Select v-model="alarmForm.ackResult">
                                <Option v-for="item in ackResultOption" :key="item.val" :value="item.val">{{item.key}}</Option>
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
            <div slot="footer">
                <Button size="large" type="primary" @click="submitAckedAlarm()">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./infoTips.ts"></script>

<style lang="less">
    @import './infoTips.less';
</style>

