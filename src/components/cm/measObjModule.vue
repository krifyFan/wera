<template>
    <div class="measObjModule">
        <Modal v-model="show.state" :title="title" width="600">
            <Form ref="formValidate" :model="formValidate" :rules="type === 1 ? addrule : editrule" :label-width="140">
                <FormItem label="监测对象名称：" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入监测对象名称" class="InputWidth" />
                </FormItem>
                <FormItem label="监测对象ID：" prop="id">
                    <Input v-model="formValidate.id" placeholder="请输入监测对象ID" :disabled="type==2" class="InputWidth" />
                </FormItem>
                <FormItem label="监测对象类型：" prop="measobjTypeId">
                    <Select v-model="formValidate.measobjTypeId" placeholder="请选择监测对象类型" class="InputWidth">
                        <Option v-for="item in measobjTypes" :value="item.id + ''" :key="item.id">{{item.measobjTypeName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="设备：" prop="equipmentId">
                    <Select v-model="formValidate.equipmentId" placeholder="请选择设备" class="InputWidth">
                        <Option v-for="item in equipments" :value="item.id + ''" :key="item.id">{{item.equipmentName+"("+item.equipmentSn+")"}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否激活：">
                    <Select v-model="formValidate.actived" placeholder="请选择是否激活" class="InputWidth">
                        <Option v-for="item in isActived" :value="item.val" :key="item.key">{{item.key}}</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" size="large" v-show="type==1" v-on:click="sendMsg('formValidate')">保存</Button>
                <Button type="primary" size="large" v-show="type==2" v-on:click="updateMeasobj('formValidate')">更新</Button>
            </div>
        </Modal>
        <!-- <showVideo :videoInfo="videoInfo" v-on:childByValue="childByValue"></showVideo> -->
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue,
        Prop,
        Watch
    } from "vue-property-decorator"
    import {
        MeasObj
    } from '@/types/views/measobjType.interface'
    import {
        allMeasobjType
    } from '@/api/measobjType.ts'
    import {
        equipmentList
    } from '@/api/equipment'
    import {
        planTypes,
        addMeasObj,
        updateMeasObj,
        getSectionVideos,
        getObjById,
        checkObjId
    } from '@/api/measObj'
    import {
        monitorType
    } from '@/api/queryData.ts'
    import {
        listTunnel,
        listStoreKv
    } from '@/api/commonModule.ts'
    import { transformData } from '@/utils/common'

    const validateInt = (rule: any, value: any, callback: Function) => {
        if (value === "") {
            callback(new Error("不能为空"));
        } else {
            if (isNaN(value) || value % 1 !== 0) {
                callback(new Error("请输入整数"));
            } else {
                checkObjId(value).then((res: any) => {
                    let {
                        code,
                        data
                    } = res.data
                    if (code === 200) {
                        if (!data) {
                            callback(new Error("ID重复，请输入其他ID"));
                        } else {
                            callback();
                        }
                    }

                });
            }
        }
    }
    const checkString = (rule: any, value: any, callback: Function) => {
        if (value === "") {
            callback(new Error("不能为空"));
        } else {
            let regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
            let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
            if (regEn.test(value) || regCn.test(value)) {
                callback(new Error("输入了非法字符，请重新输入"));
            } else {
                callback();
            }
        }
    }

    @Component({})
    export default class MeasObjModule extends Vue {
        formValidate: any = {
            name: '',
            id: 0,
            measobjTypeId: 0,
            equipmentId: 0,
            description: '',
            actived: 0,
            tunnelId: null,
            storeId: null,
            areaId: null,
            planIds: ''
        }

        addrule: any = {
            name: [{
                    required: true,
                    message: "监测对象名称不能为空",
                    trigger: "blur"
                },
                {
                    validator: checkString,
                    trigger: "blur"
                }
            ],
            id: [{
                    required: true,
                    message: "监测对象ID不能为空",
                    trigger: "blur"
                },
                {
                    validator: validateInt,
                    trigger: "blur"
                }
            ],
            measobjTypeId: [{
                required: true,
                message: "监测对象类型不能为空",
                trigger: "change"
            }]
        }

        editrule: any = {
            name: [{
                    required: true,
                    message: "监测对象名称不能为空",
                    trigger: "blur"
                },
                {
                    validator: checkString,
                    trigger: "blur"
                }
            ],
            id: [{
                    required: true,
                    message: "监测对象ID不能为空",
                    trigger: "blur"
                }
            ],
            measobjTypeId: [{
                required: true,
                message: "监测对象类型不能为空",
                trigger: "change"
            }]
        }
        measobjTypes: any[] = []
        equipments: any[] = []
        tunnels: any[] = []
        areas: any[] = []
        stores: any[] = []
        isActived: any[] = [{
            val: 0,
            key: "否"
        }, {
            val: 1,
            key: "是"
        }]
        title: string = "新增监测对象"
        planIds: number[] = []
        videos: any[] = []
        videoInfo: any = {
            isShowVideo: false,
            videoData: []
        }
        readonlyVideo: boolean = false
        relaPrePlan: any[] = []
        initFlag: boolean = true

        @Prop({
            default: () => {
                return {
                    state: false
                }
            }
        })
        show!: any
        @Prop()
        type!: any
        @Prop()
        id!: any

        @Watch('show.state')
        stateChange(newValue: boolean, oldValue: boolean) {
            if (this.type == 1) {
                this.cleanFormValidate();
                this.relaPrePlan = [];
                this.title = "新增监测对象";
            } else {
                this.cleanFormValidate();
                this.title = "编辑监测对象";
                this.getMeasObjInfo();
            }
        }
        // @Watch('formValidate.tunnelId')
        // tunnelIdChange(newVal: number) {
        //     if (newVal != null || newVal != undefined) {
        //         this.getArea(newVal);
        //         this.getStore(newVal);
        //     }
        // }

        mounted() {
            this.init();
        }

        init() {
            let _this = this;
            allMeasobjType().then((res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    _this.measobjTypes = data
                }
                },
                (error: string) => {
                    _this.Log.info(error);
                }
            );
            equipmentList().then((res: any) => {
                    let {
                        code,
                        data
                    } = res.data
                    if (code === 200) {
                        _this.equipments = data
                    }
                },
                (error: string) => {
                    _this.Log.info(error);
                }
            );
            // listTunnel().then((res: any) => {
            //     let {
            //         code,
            //         data
            //     } = res.data
            //     if (code === 200) {
            //         _this.tunnels = transformData(data);
            //     }
            //     },
            //     (error: string) => {
            //         _this.Log.info(error);
            //     }
            // );
            // planTypes().then((res: any) => {
            //     let {
            //         code,
            //         data
            //     } = res.data
            //     if (code === 200) {
            //         _this.planIds = data
            //     }
            //     },
            //     (error: string) => {
            //         _this.Log.info(error);
            //     }
            // );
        }
        //add
        sendMsg(name: string) {
            (this.$refs[name] as any).validate((valid: boolean) => {
                if (valid) {
                    if (this.formValidate.actived == 1) {
                        this.formValidate.isActive = true;
                    } else {
                        this.formValidate.isActive = false;
                    }
                    addMeasObj(this.formValidate).then(
                        (result: any) => {
                            this.$emit("addMeasObj", result);
                        },
                        (error: string) => {
                            this.Log.info(error);
                        }
                    );
                } else {
                    this.$Message.error("添加失败，请稍后重试");
                }
            });
        }
        //edit
        updateMeasobj(name: string) {
            (this.$refs[name] as any).validate((valid: boolean) => {
                if (valid) {
                    if (this.formValidate.actived == 1) {
                        this.formValidate.isActive = true;
                    } else {
                        this.formValidate.isActive = false;
                    }
                    updateMeasObj(this.formValidate).then(
                        result => {
                            this.$emit("ListenUpdateMeasObj", result);
                        },
                        error => {
                            this.Log.info(error);
                        }
                    );
                } else {
                    this.$Message.error("更新失败，请重新操作");
                }
            });
        }
        // getArea(tunnelId: number) {
        //     listArea(tunnelId).then(
        //         (result: any) => {
        //             let {code, data} = result.data
        //             if(code === 200){
        //                 this.stores = data
        //             }
        //         },
        //         (error: string) => {
        //             this.Log.info(error);
        //         }
        //     );
        // }
        // getStore(tunnelId: number) {
        //     listStoreKv(tunnelId).then(
        //         (result: any) => {
        //             let {code, data} = result.data
        //             if(code === 200){
        //                 this.areas = data
        //             }
        //         },
        //         (error: string) => {
        //             this.Log.info(error);
        //         }
        //     );
        // }
        clearStoreAndArea() {
            if (this.type == 2 && !this.initFlag) {
                this.formValidate.areaId = null;
                this.formValidate.storeId = null;
            }
            this.initFlag = false
        }
        cleanFormValidate() {
            for (let item in this.formValidate) {
                this.formValidate[item] = null;
            }
        }
        childByValue(childValue: any) {
            this.videoInfo.isShowVideo = false;
        }
        getTypeOf() {
            this.formValidate.planIds = this.relaPrePlan.toString();
        }
        getMeasObjInfo(id ? : number) {
            typeof id === "number" && getObjById(id).then(
                (result: any) => {
                    let {code, data} = result.data
                    if(code === 200){
                        this.formValidate = data;
                        this.formValidate.measobjTypeId =
                            this.formValidate.measobjTypeId + "";
                        this.formValidate.id = this.formValidate.id + ""
                        this.formValidate.equipmentId = this.formValidate.equipmentId + ""
                        if (data.isActive == true) {
                            this.formValidate.actived = 1;
                        } else {
                            this.formValidate.actived = 0;
                        }
                        if (this.formValidate.planIds != null) {
                            this.relaPrePlan = this.formValidate.planIds.split(",");
                            this.formValidate.planIds.split(",").forEach((item: any) => {
                                this.relaPrePlan.push(Number(item));
                            });
                        } else {
                            this.relaPrePlan = [];
                        }
                    }
                },
                error => {
                    this.Log.info(error);
                }
            );
        }


    }
</script>

<style lang="less">
    .measObjModule {
        .InputWidth {
            width: 85%;
        }

        .location {
            .ivu-form-item-label {
                :before {
                    content: "*";
                    display: inline-block;
                    margin-right: 4px;
                    line-height: 1;
                    font-family: SimSun;
                    font-size: 12px;
                    color: #ed3f14;
                }
            }
        }
    }
</style>
