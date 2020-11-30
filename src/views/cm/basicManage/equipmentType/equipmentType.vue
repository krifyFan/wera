<template>
    <div class="equipmentType-wrap">
        <h1 class="cm-title">设备大类管理</h1>
        <Button class="add-btn" type="success" @click="showAddModal()"><Icon type="md-add" />添加</Button>
        <section class="table-wrap">
            <Table :columns="equipmentTypeColumns" :data="equipmentTypeData"></Table>
        </section>
        <Modal
            v-model="isShow"
            :title="title"
            class="white-modal"
            >
            <Form ref="typeForm" :model="typeForm" :rules="rulesType" :label-width="100">
                <FormItem label="大类名称：" prop="name">
                    <Input v-model="typeForm.name"></Input>
                </FormItem>
            </Form>
            <div slot="footer" v-show="title==='新增大类'">
                <Button type="default" @click="handleResert('typeForm')" style="margin-right: 5px">取消</Button>
                <Button type="primary" @click="submitAddForm('typeForm')">确定</Button>
            </div>
            <div slot="footer" v-show="title === '修改大类'">
                <Button type="default" @click="handleResert('typeForm')" style="margin-right: 5px">取消</Button>
                <Button type="primary" @click="submitEditForm('typeForm')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script lang="ts" src="./equipmentType.ts"></script>

<style lang="less">
    @import './equipmentType.less';
</style>

