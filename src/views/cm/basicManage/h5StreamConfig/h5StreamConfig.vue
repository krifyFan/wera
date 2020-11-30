<template>
    <div class="h5StreamConfig-wrap">
        <h1 style="margin: 10px 0px 0px 20px;text-align: center;">H5Stream配置</h1>
        <Row style="margin:20px;">
            <Col span="6">
            <span>ID：</span>
            <Input placeholder="请输入ID" v-model="h5StreamConditions.id" class="inputWidth"></Input>
            </Col>
            <Col span="6">
            <span>供应商：</span>
            <Input placeholder="请输入供应商" v-model="h5StreamConditions.venderId" class="inputWidth"></Input>
            </Col>
            <Col span="12" style="font-size: 1.6vmin">
            <Button type="success" @click="showTable()">查询</Button>
            <vue-xlsx-table @on-select-file="getInsertData" style="margin-left: 20px">插入H5Stream配置文件</vue-xlsx-table>
            <vue-xlsx-table @on-select-file="getData" style="margin-left: 20px">重新选择H5Stream配置文件</vue-xlsx-table>
            <ExportCSV style="margin-left: 20px" :header="H5StreamConfigHeader" :data="H5StreamConfigCSV" :fileName="H5StreamConfigFileName">
            </ExportCSV>
            <Checkbox v-model="isOnvif" v-show="saveFlag|insertFlag" style="margin-left: 20px">是否为Onvif</Checkbox>
            <Button type="error" v-on:click="save" style="margin-left: 20px" v-show="saveFlag">重选保存</Button>
            <Button type="error" v-on:click="insert" style="margin-left: 20px" v-show="insertFlag">插入保存</Button>
            </Col>
        </Row>
        <div style="margin:20px;">
            <Table :columns="columnsTable" :data="tableData" v-show="isTable" height="640"></Table>
            <Table stripe border :columns="columns" :data="videoConfig" v-show="isAdd"  height="640"></Table>
            <Table stripe border :columns="columns" :data="insertVideoConfig" v-show="isInsert"  height="640"></Table>
            <Page :total="page.pageTotal" :current="page.pageNum" :page-size="page.pageSize" show-total show sizer
                placement="top" @on-change="handlePage" @on-page-size-change="handlePageSize" show-elevator
                :style="pageStyle"></Page>
        </div>
        <Modal v-model="isEdit" title="修改H5Stream配置">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="IP" prop="ip">
                    <Input v-model="formValidate.ip" class="inputWidth"></Input>
                </FormItem>
                <FormItem label="端口" prop="port">
                    <Input v-model="formValidate.port" class="inputWidth"></Input>
                </FormItem>
                <FormItem label="用户名" prop="userName">
                    <Input v-model="formValidate.userName" class="inputWidth"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="formValidate.password" class="inputWidth"></Input>
                </FormItem>
                <FormItem label="供应商" prop="venderId">
                    <Input v-model="formValidate.venderId" class="inputWidth"></Input>
                </FormItem>
                <FormItem label="频道" prop="channelNo">
                    <Input v-model="formValidate.channelNo" class="inputWidth"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" v-on:click="submitEdit('formValidate')">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./h5StreamConfig.ts"></script>

<style lang="less">
    @import './h5StreamConfig.less';
</style>

