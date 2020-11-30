<template>
    <div>
        <Modal v-model="show.state" :title="title" width=950>
            <Form :label-width="160">
                <Row>
                    <Col span="6">
                    <FormItem label="管廊编号起始：">
                        <Input v-model="spellRule.tunnel.start" class="InputWidth" />
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="区域编号起始：">
                        <Input v-model="spellRule.area.start" class="InputWidth" />
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="管仓编号起始：">
                        <Input v-model="spellRule.storeType.start" class="InputWidth" />
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="设备类型编号起始：">
                        <Input v-model="spellRule.objtype.start" class="InputWidth" />
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="管廊编号长度：">
                        <Input v-model="spellRule.tunnel.length" class="InputWidth" />
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="区域编号长度：">
                        <Input v-model="spellRule.area.length" class="InputWidth" />
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="管仓编号长度：">
                        <Input v-model="spellRule.storeType.length" class="InputWidth" />
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="设备类型长度：">
                        <Input v-model="spellRule.objtype.length" class="InputWidth" />
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <hr>
            <div class="vueXlsxBox">
                <!-- <vue-xlsx-table @on-select-file="equipmentMatchesSelectedFile">选择设备类型文件</vue-xlsx-table> -->
            </div>
            <Row>
                <Col span="8" v-for="match in equipmentMatches" :key="match.sn" style="height: 50px;">
                <div>
                    <div class="sn">{{match.sn}}</div>
                    <div class="name">{{match.name}}</div>
                    <Select v-model="match.measobjTypeId" style="width: 50%;">
                        <Option v-for="type in objtypes" :key="type.val" :value="type.val">{{type.key}}</Option>
                    </Select>
                </div>
                </Col>
            </Row>
            <hr>
            <div class="vueXlsxBox">
                <vue-xlsx-table @on-select-file="measObjsSelectedFile" v-show="type== 1">选择添加的监测对象</vue-xlsx-table>
                <vue-xlsx-table @on-select-file="measObjsSelectedFile" v-show="type==2">批量修改监测对象</vue-xlsx-table>
            </div>
            <Table stripe border :columns="columns7" :data="page.data"></Table>
            <div style="text-align: right;margin-top: 10px;">
                <Page :total="page.pageTotal" :current="page.pageNum" :page-size="page.pageSize" show-sizer show-total placement="top" @on-change="onChange" show-elevator></Page>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" v-on:click="sendMsg" v-show="type==1">保存</Button>
                <Button type="primary" size="large" v-on:click="sendMsgForEidt" v-show="type==2">保存</Button>
            </div>
        </Modal>
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
        TableColumn
    } from '@/types/views/measobjType.interface'
    import {
        monitorType
    } from '@/api/queryData.ts'
    import {
        getTunnelParam,
        getEquParam,
    } from '@/api/measObj'
    import { allTunnel } from '@/api/commonModule'

    @Component({})
    export default class MeasObjMutiModule extends Vue {

        @Prop({
            default: {
                state: false
            }
        }) show: any

        @Prop({
            default: 'add'
        }) type: any

        columns7: TableColumn[] = [{
                title: "设备ID",
                key: "id",
                align: 'center'
            },
            {
                title: "名称",
                key: "name",
                align: 'center'
            },
            {
                title: "管廊",
                align: 'center',
                key: 'tunnelName'
            },
            {
                title: "区域",
                key: "areaName",
                align: 'center'
            },
            {
                title: '仓段',
                key: 'storeName',
                align: 'center'
            },
            {
                title: "设备类型",
                key: "objtypeName",
                align: 'center'
            },
            {
                title: '设备安装位置',
                key: 'description',
                align: 'center'
            }
        ]
        spellRule: any = {
            tunnel: {
                start: null,
                length: null
            },
            area: {
                start: null,
                length: null
            },
            storeType: {
                start: null,
                length: null
            },
            objtype: {
                start: null,
                length: null
            }
        }
        tunnels: any[] = []
        equipmentMatches: any[] = []
        importMeasObjs: any = [{
                id: "0203010104",
                name: "红外摄像机"
            },
            {
                id: "0203022401",
                name: "温度仪"
            }
        ]
        objtypes: any[] = []
        page: any = {
            data: [],
            totalList: [],
            pageNum: 1,
            pageSize: 10,
            pageTotal: 0
        }
        title: string = '批量添加监测对象'

        mounted() {
            if (this.type == 1) {
                this.title = '批量添加监测对象'
            } else {
                this.title = '批量修改监测对象'
            }
            this.init();
        }

        init() {
            var _this = this;
            monitorType().then(
                (result: any) => {
                    let {code, data} = result.data
                    if(code === 200){
                        _this.objtypes = data
                    }

                    getTunnelParam().then(
                        (result: any) => {
                            let data = result.data
                            this.spellRule.tunnel.start = data[0].name
                            this.spellRule.tunnel.length = data[1].name
                            this.spellRule.area.start = data[2].name
                            this.spellRule.area.length = data[3].name
                            this.spellRule.storeType.start = data[4].name
                            this.spellRule.storeType.length = data[5].name
                            this.spellRule.objtype.start = data[6].name
                            this.spellRule.objtype.length = data[7].name
                        },
                        (error: string) => {
                            _this.Log.info(error)
                        }
                    )
                    getEquParam().then((result: any) => {
                        let {code, data} = result.data
                        if(code === 200){
                            this.equipmentMatches = data
                        }
                    })
                },
                (error: string) => {
                    _this.Log.info(error);
                }
            );
            allTunnel().then(
                (result: any) => {
                    let {code, data} = result.data
                    if(code === 200){
                        this.tunnels = data
                    }
                },
                (error: string) => {
                    _this.Log.info(error)
                }
            )
        }
        equipmentMatchesSelectedFile(data: any) {
            this.equipmentMatches = [];
            data.body.forEach((element: any) => {
                let tmp = {
                    name: element[data.header[1]],
                    sn: element[data.header[0]],
                    objtype: 0
                }
                if (data.header.length > 2)
                    tmp.objtype = parseInt(element[data.header[2]]);
                this.equipmentMatches.push(tmp);
            });
        }
        //添加监测对象
        measObjsSelectedFile(data: any) {
            this.importMeasObjs = [];
            this.page.pageTotal = data.body.length
            data.body.forEach((element: any) => {
                let tmp = {
                    name: element[data.header[0]],
                    id: element[data.header[1]],
                    description: element[data.header[2]]
                };
                this.importMeasObjs.push(tmp)
                if (data.body.length <= this.page.pageSize) {
                    this.page.data.push(tmp)
                }

            });
            this.onChange(1)
            this.translate()
        }
        //分页
        onChange(curPage: number) {
            this.page.data.slice(0, this.page.data)
            this.page.data = []
            for (var i = 10 * (curPage - 1) + 1; i <= ((this.page.pageTotal > 10 * curPage) ? (10 * curPage) : (this
                    .page.pageTotal)); i++) {
                this.page.data.push(this.importMeasObjs[i - 1]);
            }
        }
        //转换
        translate() {
            this.importMeasObjs.forEach((element: any) => {
                var tunnel_sn = element.id.substr(
                    this.spellRule.tunnel.start,
                    this.spellRule.tunnel.length
                );
                var area_sn = element.id.substr(
                    this.spellRule.area.start,
                    this.spellRule.area.length
                );
                var store_sn = element.id.substr(
                    this.spellRule.storeType.start,
                    this.spellRule.storeType.length
                );
                var type_sn = element.id.substr(
                    this.spellRule.objtype.start,
                    this.spellRule.objtype.length
                );

                var tunnel = this.tunnels.find((a: any) => a.sn == tunnel_sn);
                var area = tunnel.areas.find((a: any) => a.sn == area_sn);
                var store = tunnel.stores.find((a: any) => a.sn == store_sn);
                var objtype = this.equipmentMatches.find((a: any) => a.sn == type_sn)

                element.tunnelId = tunnel.id;
                element.tunnelName = tunnel.name
                element.areaId = area.id;
                element.areaName = area.name;
                element.storeId = store.id;
                element.storeName = store.name
                element.measobjTypeId = objtype.measobjTypeId;
                element.objtypeName = objtype.name
            });
        }
        sendMsg() {
            this.$emit("saveMulti", this.importMeasObjs);
            this.show.state = false
        }
        sendMsgForEidt() {
            this.$emit("editSaveMulti", this.importMeasObjs);
            this.show.state = false
        }
    }
</script>

<style lang="less">
    .sn,
    .name {
        display: inline-block
    }

    .sn {
        width: 30px;
    }

    .name {
        width: 80px;
    }

    .vueXlsxBox {
        margin: 20px 0px;
    }
</style>