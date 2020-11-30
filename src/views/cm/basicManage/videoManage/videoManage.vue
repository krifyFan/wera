<template>
    <div class="videoManage-wrap">
        <h1 class="cm-title">视频管理</h1>
        <Row>
            <Col span="6">
                所属大区：
                <Select v-model="conditions.areaId" class="search-width">
                    <Option v-for="(item, index) in areas" :key="index" :value="item.id">{{item.areaName}}</Option>
                </Select>
            </Col>
            <Col span="6">
                视频名称：
                <Input v-model="conditions.videoName" class="search-width"/>
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
                v-model="videoInfo.isShow"
                :title="videoInfo.title"
                class="white-modal"
        >
            <Form :model="infoForm" :label-width="110">
                <FormItem label="所属大区：">
                    <Select v-model="infoForm.areaId">
                        <Option v-for="(item, index) in areas" :key="index" :value="item.id">{{item.areaName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="视频名称：">
                    <Input v-model="infoForm.videoName" placeholder="请输入视频名称"/>
                </FormItem>
                <FormItem label="视频Url：">
                    <Input v-model="infoForm.videoUrl" placeholder="请输入视频Url"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" v-show="videoInfo.type === 1" @click="addVideoInfo()">确定</Button>
                <Button type="primary" v-show="videoInfo.type === 2" @click="editVideoInfo()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./videoManage.ts"></script>

<style lang="less">
    @import './videoManage.less';
</style>

