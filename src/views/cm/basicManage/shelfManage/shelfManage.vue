<template>
    <div class="shelfManage-wrap">
        <h1 class="cm-title">货架管理</h1>
        <Row>
            <Col span="6">
                所属大区：
                <Select v-model="conditions.warehouseId" class="search-width">
                    <Option v-for="(item, index) in warehouses" :key="index" :value="item.id">{{item.warehouseName}}</Option>
                </Select>
            </Col>
            <Col span="6">
                货架名称：
                <Input v-model="conditions.shelfName" class="search-width"/>
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
                v-model="areaInfo.isShow"
                :title="areaInfo.title"
                class="white-modal"
        >
            <Form :model="areaInfoForm" :label-width="110">
                <FormItem label="所属大区：">
                    <Select v-model="areaInfoForm.warehouseId">
                        <Option v-for="(item, index) in warehouses" :key="index" :value="item.id">{{item.warehouseName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="货架名称：">
                    <Input v-model="areaInfoForm.shelfName" placeholder="请输入货架名称"/>
                </FormItem>
                <FormItem label="货架容量：">
                    <Input v-model="areaInfoForm.capacity" placeholder="请输入货架容量"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" v-show="areaInfo.type === 1" @click="addAreaInfo()">确定</Button>
                <Button type="primary" v-show="areaInfo.type === 2" @click="editInfo()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./shelfManage.ts"></script>

<style lang="less">
    @import './shelfManage.less';
</style>

