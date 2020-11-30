<template>
    <div class="areaManage-wrap">
        <h1 class="cm-title">大区管理</h1>
        <Row>
            <Col span="6">
                <span>大区名称：</span>
                <Input class="search-width" v-model="conditions.name" placeholder="支持模糊查询"/>
            </Col>
            <Col span="6">
                <span>大区类型：</span>
                <Select v-model="conditions.type" class="search-width">
                    <Option v-for="(item, index) in types" :key="index" :value="item.key">{{item.val}}</Option>
                </Select>
            </Col>
            <Col span="6">
                <Button type="primary" style="margin-right: 5px" @click="listAreaDatagrid()">
                    <Icon type="md-search"/>
                    查询
                </Button>
                <Button type="success" @click="showAddModal()">
                    <Icon type="md-add"/>
                    添加
                </Button>
            </Col>
        </Row>
        <section class="table-wrap">
            <Table height="700" :columns="columns" :data="data"></Table>
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
                v-model="info.isShow"
                :title="info.title"
                :width="1000"
                class="white-modal"
        >
            <!-- <Form :model="tunnelInfo.tunnelInfoForm" :label-width="110" ref="tunnelInfoForm" :rules="ruleValidate"> -->
            <Form :model="infoForm" :label-width="110">
                <Row class="info-card">
                    <Col span="24" class="info-card-title">
                        <span>基础信息：</span>
                    </Col>
                    <Col span="8">
                        <FormItem label="大区名称：" prop="areaName">
                            <Input v-model="infoForm.areaName" placeholder="请输入大区名称"/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="大区类型：" prop="type">
                            <Select v-model="infoForm.type">
                                <Option v-for="(item, index) in types" :key="index" :value="item.key">{{item.val}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="仓库的库位数：" prop="capacity">
                            <Input v-model="infoForm.capacity" placeholder="请输入仓库的库位数"/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="地理位置：" prop="address">
                            <Input v-model="infoForm.address" placeholder="请输入地理位置"/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="仓库提示信息：" prop="information">
                            <Input v-model="infoForm.information" placeholder="请输入仓库提示信息"/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="仓库管理员：" prop="ownerPerson">
                            <Input v-model="infoForm.ownerPerson" placeholder="请输入仓库管理员"/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="联系方式：" prop="ownerPhone">
                            <Input v-model="infoForm.ownerPhone" placeholder="请输入联系方式"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="底图文件名：">
                            <div class="demo-upload-list" v-for="(item, index) in uploadList" :key="index">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <!-- <image-from-url class="imageFromUrl" v-for="(item, index) in imgUrlData" :key="index"
                                :url="item.url"></image-from-url> -->
                            <Upload
                                    v-show="this.$route.params.isFinished!=true"
                                    ref="upload"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList"
                                    :on-success="handleSuccess"
                                    :format="['jpg','jpeg','png','gif']"
                                    :max-size="2048"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    multiple
                                    type="drag"
                                    :action=action
                                    style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="ios-camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <Modal title="View Image" v-model="visible">
                                <img :src="imgUrl" v-if="visible" style="width: 100%">
                            </Modal>
                        </FormItem>
                    </Col>
                </Row>
                <Row class="info-card">
                    <Col span="24" class="info-card-title">
                        <span>其他信息：</span>
                    </Col>
                    <Col span="16">
                        <FormItem label="描述：">
                            <Input v-model="infoForm.introduction" type="textarea" placeholder="请输入描述"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="saveInfo(infoForm)">确定</Button>
            </div>
        </Modal>
        <!-- <div class="left-menu-li choosed-left-menu-li">
            item1
        </div> -->
        <!-- <button class="search-btn">confirm</button> -->
    </div>
</template>

<script lang="ts" src="./areaManage.ts"></script>

<style lang="less">
    @import './areaManage.less';
</style>

