<template>
    <div class="roleManage-wrap">
        <h1 class="cm-title">用户管理</h1>
        <Row>
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
            <Table :columns="roleColumns" :data="roleData"></Table>
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
            <Form ref="roleForm" :model="roleForm" :label-width="120" :rules="ruleValidate">
                <FormItem label="名称：" prop="name">
                    <Input v-model="roleForm.name" placeholder="请输入角色名称"/>
                </FormItem>
                <FormItem label="描述：">
                    <Input type="textarea" v-model="roleForm.description" placeholder="请输入描述"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" v-show="pageType === 1" @click="addRole('roleForm')">确定</Button>
                <Button type="primary" v-show="pageType === 2" @click="editRoleInfo('roleForm')">确定</Button>
            </div>
        </Modal>
        <Modal
            v-model="isShowPermission"
            title="修改权限"
            width="40vw"
        >
            <div class="role-name-wrap">
                <div class="name">
                    角色名称：
                </div>
                <Input class="name-input" v-model="roleName" readonly></Input>
            </div>
            <div class="role">
                <div v-for="(item, index) in role" :key="index" class="role-menu-wrap">
                    <div class="menu-name">{{item.name}}</div>
                    <div class="check-all-btn">
                        <Checkbox
                            :indeterminate="item.quanxuan.iii"
                            :value="item.quanxuan.value"
                            @on-change="handleCheckAll(item,index)">全选</Checkbox>
                    </div>
                    <CheckBox>
                        <div class="opera-btn">
                            <CheckboxGroup v-model="item.checkbox" @on-change="checkAllGroupChange(index)">    
                                <Checkbox v-for="ele in item.permissionList"  :key="ele.id" :label="ele.id">
                                    {{ele.name}}
                                </Checkbox>
                            </CheckboxGroup>
                        </div>
                    </CheckBox>
                </div>
            </div>
            <div slot="footer">
                <Button type="primary" @click="submitPermission()">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./roleManage.ts"></script>

<style lang="less">
    @import './roleManage.less';
</style>

