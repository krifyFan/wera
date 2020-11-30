<template>
    <div class="zoneManage-wrap">
        <h1 class="cm-title">小区管理</h1>
        <Row>
            <Col span="6">
                所属大区：
                <Select v-model="conditions.areaId" class="search-width">
                    <Option v-for="(item, index) in areas" :key="index" :value="item.id">{{item.areaName}}</Option>
                </Select>
            </Col>
            <Col span="6">
                小区名称：
                <Input v-model="conditions.zoneName" class="search-width"/>
            </Col>
            <Col span="6">
                <Button type="primary" style="margin-right: 5px" @click="listInfoDatagrid()">
                    <Icon type="md-search"/>
                    查询
                </Button>
                <Button type="success" @click="showAddModal()" style="margin-right: 5px">
                    <Icon type="md-add"/>
                    添加
                </Button>
            </Col>
        </Row>
        <section class="table-wrap">
            <Table height="700" :columns="areaColumns" :data="areaData"></Table>
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
        <!-- 单独添加 -->
        <Modal
                v-model="info.isShow"
                :title="info.title"
                class="white-modal"
        >
            <Form :model="infoForm" :label-width="110">
                <FormItem label="所属大区：">
                    <Select v-model="infoForm.areaId">
                        <Option v-for="(item, index) in areas" :key="index" :value="item.id">{{item.areaName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="小区名称：">
                    <Input v-model="infoForm.zoneName" placeholder="请输入小区名称"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" v-show="info.type === 1" @click="addInfo()">确定</Button>
                <Button type="primary" v-show="info.type === 2" @click="editInfo()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./zoneManage.ts"></script>

<style lang="less">
    @import './zoneManage.less';
</style>

