<template>
    <div class="measobjType-wrap">
        <h1 class="cm-title">监测对象类型管理</h1>
        <Row>
            <!--            <Col span="6">-->
            <!--                监测类型：-->
            <!--                <Select v-model="conditions.measobjTypeName" class="search-width">-->
            <!--                    <Option key="-1" :value="-1">所有</Option>-->
            <!--                    <Option v-for="(item, index) in dataTypeList" :key="index" :value="item.key">{{item.val}}</Option>-->
            <!--                </Select>-->
            <!--            </Col>-->
            <Col span="6">
                名称：
                <Input v-model="conditions.measobjTypeName" class="search-width"/>
            </Col>
            <Col span="6">
                <Button type="primary" @click="listMeasobjType()" style="margin-right: 5px;">
                    <Icon type="md-search"/>
                    确定
                </Button>
                <Button type="success" @click="showAddModal()">
                    <Icon type="md-add"/>
                    添加
                </Button>
            </Col>
        </Row>
        <section class="table-wrap">
            <Table :columns="measobjTypeColumns" :data="measobjTypeData"></Table>
            <Page
                    :total="page.pageTotal"
                    :current="page.pageNum"
                    :page-size="page.pageSize"
                    show-sizer
                    show-total
                    placement="top"
                    @on-change="handlePage"
                    @on-page-size-change="handlePageSize"
                    :style="pageStyle"
                    show-elevator/>
        </section>
        <Modal
                v-model="cvInfo.isShow"
                :title="cvInfo.title"
                @on-ok="cvInfoOk"
                @on-cancel="cvInfoCancel">
            <Form :model="cvInfoForm" :label-width="110">
                <FormItem label="CV值：">
                    <Input v-model="cvInfoForm.cv"/>
                </FormItem>
                <FormItem label="显示文本：">
                    <Input v-model="cvInfoForm.value"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="alarmTriggerInfo.isShow"
                :title="alarmTriggerInfo.title"
                @on-ok="alarmTriggerInfoOk"
                @on-cancel="alarmTriggerInfoCancel">
            <Form :model="alarmTriggerInfoForm" :label-width="110">
                <FormItem label="属性：">
                    <Input value="CV" disabled/>
                </FormItem>
                <FormItem label="告警类型：">
                    <Select v-model="alarmTriggerInfoForm.alarmTypeId">
                        <Option v-for="(item, index) in alarmTypes" :key="index" :value="item.id">{{item.alarmTypeName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="触发值：">
                    关系
                    <Select v-model="alarmTriggerInfoForm.operation">
                        <Option v-for="(item, index) in operations" :key="index" :value="item.key">{{item.sign}}</Option>
                    </Select>
                    数值
                    <Input v-model="alarmTriggerInfoForm.triggerValue"/>
                </FormItem>
                <FormItem label="释放值：">
                    关系
                    <Input v-model="alarmTriggerInfoForm.operation2" disabled/>
                    数值
                    <Input v-model="alarmTriggerInfoForm.releaseValue"/>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                :title="measobjTypeInfo.title"
                v-model="measobjTypeInfo.isShow"
                class="white-modal"
                :width="1000"
        >
            <Row type="flex" justify="center" align="middle">
                <Col span="12">
                    <Form :model="measobjTypeInfoForm" :label-width="110">
                        <!--                        <FormItem label="监测类型：">-->
                        <!--                            <Select v-model="measobjTypeInfoForm.dataType">-->
                        <!--                                <Option v-for="(item, index) in dataTypeList" :key="index" :value="item.key">-->
                        <!--                                    {{item.val}}-->
                        <!--                                </Option>-->
                        <!--                            </Select>-->
                        <!--                        </FormItem>-->
                        <FormItem label="名称：">
                            <Input v-model="measobjTypeInfoForm.measobjTypeName"/>
                        </FormItem>
                        <!--                        <FormItem label="单位：">-->
                        <!--                            <Input v-model="measobjTypeInfoForm.unit"/>-->
                        <!--                        </FormItem>-->
                        <!--                        <FormItem label="是否可控：">-->
                        <!--                            <Checkbox v-model="measobjTypeInfoForm.isControl"></Checkbox>-->
                        <!--                        </FormItem>-->
                        <!--                        <FormItem label="是否可重置：">-->
                        <!--                            <Checkbox v-model="measobjTypeInfoForm.isReset"></Checkbox>-->
                        <!--                        </FormItem>-->
                        <!--                        <FormItem label="正常最小值：">-->
                        <!--                            <Input v-model="measobjTypeInfoForm.nationalMin"/>-->
                        <!--                        </FormItem>-->
                        <!--                        <FormItem label="正常最大值：">-->
                        <!--                            <Input v-model="measobjTypeInfoForm.nationalMax"/>-->
                        <!--                        </FormItem>-->
                        <!--                        <FormItem label="极限最小值：">-->
                        <!--                            <Input v-model="measobjTypeInfoForm.normalMin"/>-->
                        <!--                        </FormItem>-->
                        <!--                        <FormItem label="极限最大值：">-->
                        <!--                            <Input v-model="measobjTypeInfoForm.normalMax"/>-->
                        <!--                        </FormItem>-->
                    </Form>
                </Col>
                <!--                <Col span="12">-->
                <!--                    <Row type="flex" justify="center" align="middle">-->
                <!--                        <Col span="21" style="height: 300px;">-->
                <!--                            <Table height="300" :highlight-row="true" style="margin-left: 10px;" :columns="cvColumns"-->
                <!--                                   :data="cvData" @on-current-change="cvDataSelect"></Table>-->
                <!--                        </Col>-->
                <!--                        <Col span="3">-->
                <!--                            <Button type="primary" @click="addCV()">添加-->
                <!--                            </Button>-->
                <!--                            <Button type="primary" @click="editCV()">编辑-->
                <!--                            </Button>-->
                <!--                            <Button type="primary" @click="deleteCV()">删除-->
                <!--                            </Button>-->
                <!--                        </Col>-->
                <!--                    </Row>-->
                <!--                </Col>-->
                <Col span="12">
                    <Row type="flex" justify="center" align="middle">
                        <Card style="width:350px">
                            <p slot="title">
                                <Icon type="ios-alarm"></Icon>
                                触发
                            </p>
                            <Col span="24" style="height: 300px;">
                                <Table height="300" :highlight-row="true" style="margin-left: 10px;"
                                       :columns="alarmTriggerColumns"
                                       :data="alarmTriggerData" @on-current-change="alarmTriggerDataSelect"></Table>
                            </Col>
                            <Col span="24">
                                <Button type="primary" @click="addAlarmTrigger()">添加
                                </Button>
                                <Button type="primary" @click="editAlarmTrigger()">编辑
                                </Button>
                                <Button type="primary" @click="deleteAlarmTrigger()">删除
                                </Button>
                            </Col>
                        </Card>
                    </Row>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="primary" @click="addMeasobjType()" v-show="measobjTypeInfo.type === 1">确定</Button>
                <Button type="primary" @click="editMeasobjType()" v-show="measobjTypeInfo.type === 2">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./measobjType.ts"></script>

<style lang="less">
    @import './measobjType.less';
</style>

