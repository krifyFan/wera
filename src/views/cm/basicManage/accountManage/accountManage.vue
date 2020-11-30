<template>
    <div class="accountManage-wrap">
        <h1 class="cm-title">用户管理</h1>
        <Row>
            <Col span="6">
                姓名：
                <Input v-model="conditions.name" class="search-width"/>
            </Col>
            <Col span="6">
                账号：
                <Input v-model="conditions.account" class="search-width"/>
            </Col>
            <!-- <Col span="6">
                所属角色：
                 <Select v-model="conditions.roleId" class="search-width">
                    <Option value="null">所有</Option>
                    <Option v-for="(item, index) in roles" :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
            </Col> -->
            <Col span="6">
                <Button type="primary" style="margin-right: 5px" @click="listStaffDatagrid()">
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
            <Table :columns="accountColumns" :data="accountData"></Table>
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
            v-model="isShow"
            :title="title"
            >
                <Form ref="accountForm" :model="accountForm" :label-width="120" :rules="rulesValidate">
                    <FormItem label="姓名：" prop="name">
                        <Input v-model="accountForm.name" placeholder="请输入员工姓名"/>
                    </FormItem>
                    <FormItem label="角色：" prop="roleId">
                        <Select v-model="accountForm.roleId">
                            <Option v-for="(item, index) in roles" :key="index" :value="item.id">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="账号：" v-if="pageType === 2" prop="account">
                        <Input v-model="accountForm.account" placeholder="请输入员工账号" @on-blur="checkAccount()"/>
                    </FormItem>
                    <FormItem label="所属大区：" prop="areaId">
                        <Select v-model="accountForm.areaId">
                            <Option v-for="item in areas" :key="item.id" :value="item.id">{{item.areaName}}</Option>
                        </Select>
                    </FormItem>
                </Form>
            <div slot="footer">
                <Button type="primary" v-show="pageType === 1" @click="addUser('accountForm')">确定</Button>
                <Button type="primary" v-show="pageType === 2" @click="editUserInfo('accountForm')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./accountManage.ts"></script>

<style lang="less">
    @import './accountManage.less';
</style>

