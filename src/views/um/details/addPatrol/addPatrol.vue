<template>
    <div class="addPatrol-wrap content-wrap">
        <div class="page-title">{{pageTitle}}</div>
        <div>
            <Row>    
                <Form class="details-form" :model="patrolInfo" :label-width="150">
                    <Col span="9" offset="2">
                        <FormItem label="计划编号" v-show="pageType !== 'Add'">
                            <Input v-model="patrolInfo.planSn" :readonly="pageType !== 'Add'"/>
                        </FormItem>
                        <FormItem label="计划名称">
                            <Input v-model="patrolInfo.planName" :readonly="pageType === 'Read'"/>
                        </FormItem>
                        <FormItem label="计划描述">
                            <Input type="textarea" v-model="patrolInfo.description" :readonly="pageType === 'Read'"/>
                        </FormItem>
                        <FormItem label="申请人">
                            <Input v-model="staffName" readonly/>
                        </FormItem>
                        <FormItem label="责任人">
                            <Input v-model="patrolInfo.responsibleId" v-show="false" :readonly="pageType === 'Read'"/>
                            <Input v-model="liablePersonName" @on-keyup="searchLiableNames" />
                            <ul class="dounce-info-wrap" v-show="isShow">
                                <li
                                    v-for="(item, index) in liablePersonNames" 
                                    :key="index" 
                                    :value="item.id"
                                    @click="choosedliablePName(item.id, item.name)"
                                >{{item.name}}</li>
                            </ul>
                        </FormItem>
                        <FormItem label="计划类型">
                            <Select v-model="patrolInfo.planType" :disabled="pageType === 'Read'">
                                <Option v-for="item in planTypes" :key="item.id" :value="item.id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="执行时间" v-show="patrolInfo.planType === 2">
                            <CheckboxGroup v-model="execuPeriod" @on-change="getExecuPeriod" :disabled="pageType === 'Read'">
                                <Checkbox v-for="item in week" :key="item.val" :label="item.val">
                                    <span>{{item.key}}</span>
                                </Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        <FormItem label="执行时间" v-show="patrolInfo.planType === 3">
                            <div class="month-wrap">
                                <div 
                                    v-for="item in curMonthDays" 
                                    :key="item"
                                    ref="day"
                                    @click="choosedCurDya(item)"
                                >{{item}}</div>
                            </div>
                        </FormItem>
                    </Col>
                    <Col span="9" offset="1">
                        <div style="position: relative;">
                            <FormItem label="巡检区">
                                <Row class="area-wrap scrollbar" :class="{'area-wrap-width': pageType !== 'Read'}">
                                    <Col span="12" v-for="item in groups" :key="item.id">
                                        <div>
                                            <div 
                                                :disabled="pageType === 'Read'"
                                                class="check-box"
                                                @click="choosed(item)"
                                                :class="{ hasChecked: item.isAll === true, hasIndeterminate: item.isChecked === true }"
                                            ></div>
                                            <div class="check-name" @click="showZone(item)">{{item.name}}</div>
                                        </div>
                                    </Col>
                                </Row>
                                <Button @click="submitCheck()" class="confirm-btn" v-if="pageType !== 'Read'">确定</Button>
                            </FormItem>
                            <div class="pop-tip-content-wrap" v-show="isShowPoptip">
                                <div class="cac_bg"></div><!-- 背景三角 -->
                                <div class="cac_bder"></div><!-- 边框三角 -->
                                <div class="poptip-content scrollbar">
                                    <Col span="12" v-for="ele in zones" :key="ele.id" class="zone-col">
                                        <div 
                                            :disabled="pageType === 'Read'"
                                            class="check-box child-check-box"
                                            @click="choosedChild(ele)"
                                            :class="{ hasChecked: ele.isChecked === true }"
                                        ></div>
                                        <div class="check-name">{{ele.name}}</div>
                                    </Col>
                                </div>
                            </div>
                        </div>
                        <FormItem label="巡检对象">
                            <div class="obj-wrap scrollbar">
                                <CheckboxGroup v-model="equipmentTypeIds" @on-change="getObjs">
                                    <Col span="12" v-for="item in objs" :key="item.id">
                                        <Checkbox :label="item.id">
                                            <span>{{item.name}}</span>
                                        </Checkbox>
                                    </Col>
                                </CheckboxGroup>
                            </div>
                        </FormItem>
                        <FormItem label="开始时间">
                            <DatePicker 
                                type="date" 
                                :disabled="pageType === 'Read'" 
                                v-model="patrolInfo.startTime" 
                                placeholder="请选择开始时间" 
                                style="width: 100%"
                            ></DatePicker>
                        </FormItem>
                        <FormItem label="结束时间">
                            <DatePicker 
                                type="date" 
                                v-model="patrolInfo.endTime" 
                                placeholder="请选择结束时间" 
                                style="width: 100%"
                                :disabled="pageType === 'Read'" 
                            ></DatePicker>
                        </FormItem>
                        <FormItem label="计划间隔" v-show="patrolInfo.planType === 1">
                            <div>
                                <Checkbox v-model="DOnce" :disabled="pageType === 'Read'"  @on-change="choosedDOnce()">一次性计划</Checkbox>
                            </div>
                            <div class="interval-day">
                                <div class="interval-day-block">每逢&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <div class="interval-day-block">
                                    <CheckboxGroup v-model="DWeek" @on-change="choosedDWeek" :disabled="pageType === 'Read'" >
                                        <Checkbox v-for="item in week" :key="item.val" :label="item.val">
                                            <span>{{item.key}}</span>
                                        </Checkbox>
                                    </CheckboxGroup>
                                </div>
                                <div class="interval-day-block">巡检</div>
                            </div>
                            <div>
                                每&nbsp;&nbsp;&nbsp;&nbsp;
                                <InputNumber :min="1" v-model="DInterval" :disabled="pageType === 'Read'"  @on-change="choosedDInterval()"></InputNumber>
                                &nbsp;&nbsp;&nbsp;&nbsp;天巡检一次
                            </div>
                            
                        </FormItem>
                        <FormItem label="计划间隔" v-show="patrolInfo.planType === 2">
                            <div>
                                <Checkbox v-model="WOnce" @on-change="choosedWOnce()" :disabled="pageType === 'Read'" >一次性计划</Checkbox>
                            </div>
                            <div>
                                每&nbsp;&nbsp;&nbsp;&nbsp;
                                <InputNumber :min="1" v-model="WInterval" @on-change="choosedWInterval()" :disabled="pageType === 'Read'" ></InputNumber>
                                &nbsp;&nbsp;&nbsp;&nbsp;周巡检一次
                            </div>
                        </FormItem>
                        <FormItem label="计划间隔" v-show="patrolInfo.planType === 3">
                            <div>
                                <Checkbox v-model="MOnce" @on-change="choosedMOnce()" :disabled="pageType === 'Read'" >一次性计划</Checkbox>
                            </div>
                            <div>
                                每&nbsp;&nbsp;&nbsp;&nbsp;
                                <InputNumber :min="1" v-model="MInterval" @on-change="choosedMInterval()" :disabled="pageType === 'Read'" ></InputNumber>
                                &nbsp;&nbsp;&nbsp;&nbsp;月巡检一次
                            </div>
                        </FormItem>
                    </Col>
                </Form>
            </Row>
            <div class="btn-wrap">
                <div class="btn submit-btn" v-if="pageType==='Add'" @click="addPlanInfo()">提交</div>
                <div class="btn submit-btn" v-if="pageType==='Edit'" @click="editPlanInfo()">提交</div>
                <div class="btn back-btn" @click="back()">返回</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./addPatrol.ts"></script>

<style lang="less">
    @import './addPatrol.less';
</style>

