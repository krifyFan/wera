<template>
    <div class="equipmentModel-wrap">
        <h1 class="cm-title">设备型号管理</h1>
        <Button class="add-btn" type="success" @click="showAddModal()"><Icon type="md-add" />添加</Button>
        <section class="table-wrap">
            <Table height="700" :columns="equipmentModelColumns" :data="equipmentModelData"></Table>
        </section>
        <Modal
            v-model="isShow"
            :title="title"
            class="white-modal"
            :mask-closable="false"
            :closable="false"
            >
            <Form ref="modelForm" :model="modelForm" :rules="rulesModel" :label-width="100">
                <FormItem label="名称：" prop="name">
                    <Input v-model="modelForm.name"></Input>
                </FormItem>
                <FormItem label="所属大类：" prop="parentId">
                    <Select v-model="modelForm.categoryId">
                        <Option v-for="(item, index) in types" :key="index" :value="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer" v-show="title==='新增设备型号'">
                <Button type="default" @click="handleResert('modelForm')" style="margin-right: 5px">取消</Button>
                <Button type="primary" @click="submitAddForm('modelForm')">确定</Button>
            </div>
            <div slot="footer" v-show="title === '修改设备型号'">
                <Button type="default" @click="handleResert('modelForm')" style="margin-right: 5px">取消</Button>
                <Button type="primary" @click="submitEditForm('modelForm')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./equipmentModel.ts"></script>

<style lang="less">
    @import './equipmentModel.less';
</style>

