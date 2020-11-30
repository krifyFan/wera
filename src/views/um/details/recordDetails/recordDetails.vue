<template>
    <div class="recordDetails-wrap">
        <div class="page-title">{{pageTitle}}</div>
        <div class="content-wrap">
            <Row>    
                <Form class="details-form" :model="recordInfo" :label-width="160">
                    <Col span="8" offset="4">
                        <FormItem label="设备SN">
                            <Input v-model="recordInfo.equipmentSn" :readonly="pageType === 'Read'"/>
                        </FormItem>
                        <FormItem label="设备名称">
                            <Input v-model="recordInfo.equipmentName" :readonly="pageType === 'Read'"/>
                        </FormItem>
                        <FormItem label="记录状态">
                            <Select v-model="recordInfo.patrolResult" :disabled="pageType === 'Read'">
                                <Option v-for="item in result" :key="item.key" :value="item.key">{{item.val}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="描述">
                            <Input type="textarea" v-model="recordInfo.description" :readonly="pageType === 'Read'"/>
                        </FormItem>
                    </Col>
                    <Col span="8" offset="1">
                        <FormItem label="所属任务">
                            <Input v-model="recordInfo.taskName" :readonly="pageType === 'Read'"/>
                        </FormItem>
                        <FormItem label="记录人">
                            <Input v-model="recordInfo.staffName" :readonly="pageType === 'Read'"/>
                        </FormItem>
                        <FormItem label="记录类型">
                            <Select v-model="recordInfo.equipmentTypeId" :disabled="pageType === 'Read'">
                                <Option v-for="item in types" :key="item.key" :value="item.val">{{item.key}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="18" offset="4" v-show="recordInfo.equipmentTypeId === 1">
                        <Col span="8">
                            <FormItem label="压力">
                                <RadioGroup v-model="firExtinguisherRecord.pressure">
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">不正常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="部件">
                                <RadioGroup v-model="firExtinguisherRecord.components">
                                    <Radio :label="0" :disabled="pageType==='Read'">齐全</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">缺少</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="外观干净">
                                <RadioGroup v-model="firExtinguisherRecord.appearanceClean">
                                    <Radio :label="0" :disabled="pageType==='Read'">是</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="封铅">
                                <RadioGroup v-model="firExtinguisherRecord.leadSeal">
                                    <Radio :label="0" :disabled="pageType==='Read'">是</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span="18" offset="4" v-show="recordInfo.equipmentTypeId === 2">
                        <Col span="8">
                            <FormItem label="外观干净">
                                <RadioGroup v-model="fireHydrant.environmentClean">
                                    <Radio :label="0" :disabled="pageType==='Read'">是</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="箱体、按锁">
                                <RadioGroup v-model="fireHydrant.boxLock">
                                    <Radio :label="0" :disabled="pageType==='Read'">完好</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">损坏</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="玻璃、标志">
                                <RadioGroup v-model="fireHydrant.glassMark">
                                    <Radio :label="0" :disabled="pageType==='Read'">完好</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">损坏</Radio>    
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="水枪、水带">
                                <RadioGroup v-model="fireHydrant.squirtgunHoseFall">
                                    <Radio :label="0" :disabled="pageType==='Read'">完好</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">脱落</Radio>    
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="喷水">
                                <RadioGroup v-model="fireHydrant.spray">
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>    
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="阀门、开关">
                                <RadioGroup v-model="fireHydrant.valvesSwitches">
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">不正常</Radio>    
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span="18" offset="4" v-show="recordInfo.equipmentTypeId === 4">
                        <Col span="8">
                            <FormItem label="配电室温度">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">不正常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="配电室漏水">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">否</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">是</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="配电柜放电">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">否</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">是</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="开关运行">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="配电指示">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="三相电压电流平衡">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">是</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="无报警故障现场">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">是</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="柜门关好">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">是</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="堆垛机指示正常">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">是</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="巷道障碍物">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">无</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">有</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="堆垛机运行噪声">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">无</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">有</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="检测光电">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="设备震动噪声">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">无</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">有</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="电机臭味冒烟">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">无</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">有</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="电机温度">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="电缆破损">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">无</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">有</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="链条声音">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="润滑">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">良好</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">不好</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="磨损（张紧）">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="光电积污松动">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="穿梭车指示">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="导向轮磨损情况">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="AGV使用情况">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="AGV电池">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="空压机压力及散热">
                                <RadioGroup>
                                    <Radio :label="0" :disabled="pageType==='Read'">正常</Radio>
                                    <Radio :label="1" :disabled="pageType==='Read'">异常</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Col>
                </Form>
            </Row>
            <div class="btn-wrap">
                <div class="btn submit-btn" v-if="pageType==='Add'">提交</div>
                <div class="btn submit-btn" v-if="pageType==='Edit'" @click="editRecord()">提交</div>
                <div class="btn back-btn" @click="back()">返回</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./recordDetails.ts"></script>

<style lang="less">
    @import './recordDetails.less';
</style>

