<template>
    <div>
        <div class="conditions">
            <Row>
                <Col span="6">
                <div>
                    <span>管仓名称：</span>
                    <Input v-model="researchInfo.name" placeholder="支持模糊查询" class="inputWidth" />
                </div>
                </Col>
                <Col span="6">
                <div>
                    <span>所属管廊：</span>
                    <Select v-model="researchInfo.tunnelId" placeholder="请选择所属管廊" class="inputWidth">
                        <Option value="null">不限</Option>
                        <Option v-for="item in tunnels" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </div>
                </Col>
                <Col span="6">
                <span>管仓类型：</span>
                <Select v-model="researchInfo.storeTypeId" placeholder="请选择管仓类型" class="inputWidth">
                    <Option value="null">不限</Option>
                    <Option v-for="item in types" :value="item.id" :key="item.id">{{item.name}}</Option>
                </Select>
                </Col>
                <Col span="6">
                <Button type="primary" size="small" icon="ios-search" @click="research()">查询</Button>
                </Col>
            </Row>
        </div>
        <div class="list">
            <Row>
                <Table border ref="selection" :columns="columns7" :data="data6"></Table>
                <Page :total="page.total" :current="page.current" :page-size="page.pageSize" show-total placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize' show-elevator style="text-align: right;margin-top: 20px;"></Page>
            </Row>
        </div>
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
        TableColumn,
        Page
    } from '@/types/views/common.interface'
    import {
        listTunnelInfo
    } from '@/api/tunnelManage'
    import {
        listStoreInfoDatagrid
    } from '@/api/storeManage'
    import {
        listStoreType
    } from '@/api/storeTypeManage'

    @Component({})
    export default class StoreChoose extends Vue {

        @Prop() tunnelId ? : number

        columns7: TableColumn[] = [{
                title: '选择',
                width: 80,
                align: 'center',
                render: (h: any, params: any) => {
                    return h("div", [
                        h("Checkbox", {
                            props: {
                                value: params.row.checkBox
                            },
                            on: {
                                'on-change': (val: any) => {
                                    this.data6.forEach((items) => {
                                        this.$set(items, 'checkBox', false)
                                    });
                                    this.data6[params.index].checkBox = val;
                                    this.sendMsg(params.index);
                                }
                            }
                        })
                    ])
                }
            },
            {
                title: '管仓名称',
                key: 'name',
                align: 'center'
            },
            {
                title: '所属管廊',
                key: 'tunnelName',
                align: 'center'
            },
            {
                title: '管仓类型',
                key: 'storeTypeName',
                align: 'center'
            }
        ]
        data6: any[] = []
        types: any[] = []
        tunnels: any[] = []
        researchInfo: any = {
            name: '',
            tunnelId: null,
            storeTypeId: null
        }
        page: Page = {
            pageNum: 1,
            pageSize: 5,
            pageTotal: 0
        }

        @Watch('tunnelId')
        watchTunnelId(newValue: number) {
            this.researchInfo.tunnelId = newValue
            this.showTable()
        }

        get params() {
            return {
                pageNum: this.page.pageNum,
                pageSize: this.page.pageSize,
                name: this.researchInfo.name,
                tunnelId: this.tunnelId ? this.tunnelId : this.researchInfo.tunnelId,
                storeTypeId: this.researchInfo.storeTypeId,
            }
        }

        mounted() {
            this.gettunnel()
            this.getstoretype()
            this.showTable()
        }

        gettunnel() {
            let _this = this
            listTunnelInfo({}).then(
                (result: any) => {
                    let {code, data} = result.data
                    if(code === 200){
                        this.tunnels = data
                    }
                },
                (error: string) => {
                    _this.Log.info(error)
                })
        }

        getstoretype() {
            let _this = this
            listStoreType().then(
                (result: any) => {
                    let {code, data} = result.data
                    if(code === 200){
                        this.types = data
                    }
                },
                (error: string) => {
                    _this.Log.info(error)
                })
        }

        showTable() {
            let _this = this
            listStoreInfoDatagrid(this.params).then(
                (result: any) => {
                     let {code, data} = result.data
                    if(code === 200){
                        data.list.map((item: any) => {
                            this.data6.push({
                                id: item.id,
                                name: item.name,
                                tunnelId: item.tunnel ? item.tunnel.id : null,
                                tunnelName:  item.tunnel ? item.tunnel.name : null,
                                storeTypeId: item.storeType ? item.storeType.id : null,
                                storeTypeName: item.storeType ? item.storeType.name : null,
                                checkBox: false
                            })
                        })
                    }
                    _this.page.pageTotal = result.total;
                },
                error => {
                    _this.Log.info(error)
                })
        }
        handlePage(value: number) {
            this.page.pageNum = value;
            this.showTable();
        }
        handlePageSize(value: number) {
            this.page.pageSize = value;
            this.showTable();
        }
        sendMsg(index: number) {
            if (this.data6[index].checkBox == true) {
                this.$emit("listenToStoreChoose", this.data6[index]);
            } else {
                this.$emit("listenToStoreChoose", '');
            }
        }
        research() {
            this.showTable();
        }


    }
</script>

<style lang="less">
    .conditions {
        padding: 10px;

        .inputWidth {
            width: 60%;
        }
    }

    .list {
        margin-top: 10px;
    }
</style>
