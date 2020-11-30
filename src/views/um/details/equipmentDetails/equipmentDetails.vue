<template>
    <div class="equipmentDetails-wrap">
        <div class="page-title">{{pageTitle}}</div>
        <div class="content-wrap">
            <Row :gutter="16">
                <Form class="details-form" :model="equipmentInfo" :label-width="150">
                    <Col span="7">
                        <FormItem label="设备编号：" >
                            <Input v-model="equipmentInfo.equipmentSn" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="设备名称：">
                            <Input v-model="equipmentInfo.equipmentName" :readonly="pageType==='Read'"/>
                        </FormItem>
                         <FormItem label="所属大区：">
                            <Select v-model="equipmentInfo.areaId" :disabled="pageType==='Read'">
                                <Option v-for="(item, index) in area" :key="index" :value="item.id">
                                    {{item.areaName}}
                                </Option>
                            </Select> 
                        </FormItem>
                        <FormItem label="区域编号：">
                            <Select v-model="equipmentInfo.zoneId" :disabled="pageType==='Read'">
                                <Option v-for="(item, index) in zones" :key="index" :value="item.id">
                                    {{item.zoneName}}
                                </Option>
                            </Select> 
                        </FormItem>
                        <FormItem label="设备位置：">
                            <Input v-model="equipmentInfo.location" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="数量单位：">
                            <Input v-model="equipmentInfo.unit" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="资产编码：">
                            <Input v-model="equipmentInfo.assetNo" :readonly="pageType==='Read'"/>
                        </FormItem>
                    </Col>
                    <Col span="7" offset="1">
                        <FormItem label="所属大类：">
                            <Select v-model="equipmentInfo.category" :disabled="pageType==='Read'">
                                <Option v-for="(item, index) in categories" :key="index" :value="item.key">
                                    {{item.val}}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="设备类型：">
                            <Select v-model="equipmentInfo.type" :disabled="pageType==='Read'">
                                <Option v-for="(item, index) in types" :key="index" :value="item.key">
                                    {{item.val}}
                                </Option>
                            </Select> 
                        </FormItem>
                        <FormItem label="设备状态：">
                            <Select v-model="equipmentInfo.status" :disabled="pageType==='Read'">
                                <Option v-for="(item, index) in status" :key="index" :value="item.key">
                                    {{item.val}}
                                </Option>
                            </Select> 
                        </FormItem>
                        <FormItem label="供应商：">
                            <Input v-model="equipmentInfo.vendors" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="规格型号：">
                            <Input v-model="equipmentInfo.specification" :readonly="pageType==='Read'"/>
                        </FormItem>
                        
                    </Col>
                    <Col span="7" offset="1">
                        <FormItem label="投运时间：">
                            <!-- <DatePicker type="datetime" 
                                v-model="equipmentInfo.startTime" 
                                placeholder="Select date and time" 
                                style="width: 200px"></DatePicker> -->
                            <DatePicker type="date" v-model="equipmentInfo.startTime" placeholder="请选择预计投运时间" style="width: 100%" :readonly="pageType==='Read'"></DatePicker>
                        </FormItem>
                        <FormItem label="责任人：">
                            <Input v-model="equipmentInfo.ownerPerson" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="联系方式：">
                            <Input v-model="equipmentInfo.ownerPhone" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="有效期：">
                            <Input v-model="equipmentInfo.validityTerm" :readonly="pageType==='Read'"/>
                        </FormItem>
                        <FormItem label="描述：">
                            <Input v-model="equipmentInfo.description" :readonly="pageType==='Read'" type="textarea" placeholder="请输入台账描述..." />
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <Col span="7">
                            <FormItem label="是否基础设施：">
                                <RadioGroup v-model="equipmentInfo.isFacilities">
                                    <Radio :label="1" :disabled="pageType==='Read'">是</Radio>
                                    <Radio :label="0" :disabled="pageType==='Read'">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="7" offset="1">
                            <FormItem label="是否智能：">
                                <RadioGroup v-model="equipmentInfo.isSmart" :disabled="pageType==='Read'">
                                    <Radio :label="1" :disabled="pageType==='Read'">是</Radio>
                                    <Radio :label="0" :disabled="pageType==='Read'">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                        <Col span="7" offset="1">
                            <FormItem label="是否特种：">
                                <RadioGroup v-model="equipmentInfo.isSpecial" :disabled="pageType==='Read'">
                                    <Radio :label="1" :disabled="pageType==='Read'">是</Radio>
                                    <Radio :label="0" :disabled="pageType==='Read'">否</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span="24" v-show="equipmentInfo.isFacilities === 1">
                        <Col span="7">
                            <FormItem label="总数：" >
                                <InputNumber 
                                    class="input-number-width" 
                                    :min="1" 
                                    v-model="equipmentInfo.facilitiesEquipment.totalCount"
                                    :readonly="pageType==='Read'"
                                ></InputNumber>
                            </FormItem>
                        </Col>
                        <Col span="7" offset="1">
                            <FormItem label="剩余数：">
                                <InputNumber 
                                    class="input-number-width" 
                                    :min="1" 
                                    v-model="equipmentInfo.facilitiesEquipment.remainCount"
                                    :readonly="pageType==='Read'"
                                ></InputNumber>
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span="24" v-show="equipmentInfo.isSmart === 1">
                        <Col span="7">
                            <FormItem label="IP地址：">
                                <Input v-model="equipmentInfo.smartEquipment.ipAddress" :readonly="pageType==='Read'"/>
                            </FormItem>
                        </Col>
                        <Col span="7" offset="1">
                            <FormItem label="设备硬件编号：">
                                <Input v-model="equipmentInfo.smartEquipment.deviceId" :readonly="pageType==='Read'"/>
                            </FormItem>
                        </Col>
                    </Col>
                    <Col span="24" v-show="equipmentInfo.isSpecial === 1">
                        <Col span="7">
                            <FormItem label="车牌号：">
                                <Input v-model="equipmentInfo.specialEquipment.carNo" :readonly="pageType==='Read'"/>
                            </FormItem>
                            <FormItem label="维保预算：">
                                <InputNumber class="input-number-width" :readonly="pageType==='Read'" :min="1" v-model="equipmentInfo.specialEquipment.budget"></InputNumber>
                            </FormItem>
                        </Col>
                        <Col span="7" offset="1">
                            <FormItem label="维保负责人：">
                                <Input v-model="equipmentInfo.specialEquipment.maintainPerson" :readonly="pageType==='Read'"/>
                            </FormItem>
                            <FormItem label="联系方式：">
                                <Input v-model="equipmentInfo.specialEquipment.maintainPhone" :readonly="pageType==='Read'"/>
                            </FormItem>
                        </Col>
                        <Col span="7" offset="1">
                            <FormItem label="上次维护时间：">
                                <DatePicker type="date" 
                                    v-model="equipmentInfo.specialEquipment.lastMaintainTime" 
                                    placeholder="请选择下次维护时间" 
                                    style="width: 100%"
                                    :readonly="pageType==='Read'"
                                ></DatePicker>
                            </FormItem>
                            <FormItem label="下次维护时间：">
                                <DatePicker type="date" 
                                    v-model="equipmentInfo.specialEquipment.nextMaintainTime" 
                                    placeholder="请选择下次维护时间" 
                                    style="width: 100%"
                                    :readonly="pageType==='Read'"
                                ></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="7">
                            <FormItem label="维保周期：">
                                <InputNumber :readonly="pageType==='Read'" class="input-number-width" :min="1" v-model="equipmentInfo.specialEquipment.remainCount"></InputNumber>
                            </FormItem>
                        </Col>
                    </Col>
                </Form>
            </Row>
            <div class="btn-wrap">
                <div class="btn submit-btn" @click="addEquipment()" v-if="pageType==='Add'">提交</div>
                <div class="btn submit-btn" @click="editEquipment()" v-if="pageType==='Edit'">提交</div>
                <div class="btn back-btn" @click="back()">返回</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./equipmentDetails.ts"></script>

<style lang="less">
    @import './equipmentDetails.less';
</style>

