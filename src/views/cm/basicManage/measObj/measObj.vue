<template>
    <div class="measObj-wrap">
        <h1 style="text-align:center;margin-bottom:20px;margin-top:10px">监测对象配置</h1>
        <Row style="marginLeft:25px;marginBottom:10px;">
            <Col span="5">
                <span>监测对象名称</span>
                <span>：</span>
                <Input v-model="researchInfo.name" placeholder="请输入监测对象名称" class="inputWidth"/>
            </Col>
            <!--            <Col span="6">-->
            <!--                <span>监测对象ID</span>-->
            <!--                <span>：</span>-->
            <!--                <Input v-model="researchInfo.id" placeholder="请输入监测对象ID" class="inputWidth"/>-->
            <!--            </Col>-->
            <Col span="6">
                <span>监测对象类型</span>
                <span>：</span>
                <Select v-model="objtypeIds" placeholder="请选择监测对象类型" class="inputWidth" multiple id="objtype">
                    <Option v-for="item in lists.objtypes" :value="item.id" :key="item.id">
                        {{item.measobjTypeName}}
                    </Option>
                </Select>
            </Col>
            <Col span="7">
                <Button type="primary" size="small" icon="ios-search" @click="resetAndSearch">查询</Button>
                <Button type="error" size="small" @click="add">新增监测对象</Button>
                <!--                <ExportCSV :header="objsHeader" :data="objsDataCSV" :fileName="objsFileName"></ExportCSV>-->
            </Col>
        </Row>
        <Row style="marginLeft:25px;marginBottom:10px;">
            <!--            <Col span="5">-->
            <!--                <span class="word65">所属大区</span>-->
            <!--                <span>：</span>-->
            <!--                <Select v-model="researchInfo.tunnelId" placeholder="请选择所属监测点" class="inputWidth">-->
            <!--                    <Option value="null">所有</Option>-->
            <!--                    <Option v-for="item in lists.tunnels" :value="item.id" :key="item.id">{{item.warehouseName}}-->
            <!--                    </Option>-->
            <!--                </Select>-->
            <!--            </Col>-->
            <!--            <Col span="6">-->
            <!--            <Poptip placement="bottom" width="1000">-->
            <!--                <span class="word65">所属区域</span>-->
            <!--                <span>：</span>-->
            <!--                <Input v-model="researchInfo.storeName" placeholder="请选择所属管仓" id="store" style="width: 60%" />-->
            <!--                <div class="pop" slot="content">-->
            <!--                    <store-choose v-on:listenToStoreChoose="getStore" v-bind:tunnelId="researchInfo.tunnelId">-->
            <!--                    </store-choose>-->
            <!--                </div>-->
            <!--            </Poptip>-->
            <!--            </Col>-->
            <!--            <Col span="6">-->
            <!--                <Poptip placement="bottom" width="1000">-->
            <!--                    <span class="word64">所属小区</span>-->
            <!--                    <span>：</span>-->
            <!--                    <Input v-model="researchInfo.areaName" placeholder="请选择所属区域" id="area" style="width: 60%"/>-->
            <!--                    <div class="pop" slot="content">-->
            <!--                        <area-choose v-on:listenToAreaChoose="getArea" v-bind:tunnelId="researchInfo.tunnelId">-->
            <!--                        </area-choose>-->
            <!--                    </div>-->
            <!--                </Poptip>-->
            <!--            </Col>-->
            <Col span="7">
                <!--            <Button type="info" size="small" @click="addMulti">批量新增监测对象</Button>-->
                <!--            <Button type="warning" size="small" @click="editMulti">批量修改监测对象</Button>-->
                <!--            <Button v-show="deleteShow" type="error" size="small" @click="alldelete()">批量删除</Button>-->
                <!--            <Button v-show="!deleteShow" disabled type="error" size="small">批量删除</Button>-->
                <!--            <Button type="info" size="small" @click="editActived">批量修改激活</Button>-->
            </Col>
        </Row>

        <div style="margin:20px;">
            <Table border stripe ref="selection" :columns="measObjDataColumns" :data="measObjDatas" @on-selection-change="startdelete">
            </Table>
            <Page :total="page.pageTotal" :current="page.pageNum" show-total placement="top" @on-change="handlePage"
                  show-elevator class="pageStyle"></Page>
        </div>
                <meas-obj-module ref="measObjModule" v-bind="measObjModule" v-on:addMeasObj="addMeasObj"
                                 v-on:ListenUpdateMeasObj="updateMeasObj"></meas-obj-module>
        <!--        <meas-obj-multi-module v-bind="measObjMultiModule" @saveMulti="saveMultiParent" @editSaveMulti="editSaveMulti">-->
        <!--        </meas-obj-multi-module>-->


        <Modal v-model="editActivedModal.isShow" :title="editActivedModal.title" @on-cancel="handleReset()"
               :mask-closable="false">
            <Form ref="unitParam" :model="editActivedModal.info" :label-width="120">
                <FormItem label="是否激活">
                    <Checkbox v-model="editActivedModal.info.actived">激活</Checkbox>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="editActivedSave()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./measObj.ts"></script>

<style lang="less">
    @import './measObj.less';
</style>

