<template>
    <div>
        <div class="conditions">
            <Row>
                <Col span="8">
                    <div>
                        <span>区域名称：</span>
                        <Input v-model="researchInfo.name" placeholder="支持模糊查询" class="inputWidth"/>
                    </div>
                </Col>
                <Col span="8">
                    <div>
                        <span>所属管廊：</span>
                        <Select v-model="researchInfo.tunnelId" placeholder="请选择所属管廊" class="inputWidth">
                            <Option value="null">不限</Option>
                            <Option v-for="item in warehouses" :value="item.id" :key="item.id">{{item.warehouseName}}
                            </Option>
                        </Select>
                    </div>
                </Col>
                <Col span="8">
                    <Button type="primary" size="small" icon="ios-search" @click="research()">查询</Button>
                </Col>
            </Row>
        </div>
        <div class="list">
            <Row>
                <Table border ref="selection" :columns="columns7" :data="data6"></Table>
                <Page :total="page.pageTotal" :current="page.pageNum" :page-size="page.pageSize" show-total
                      placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize' show-elevator
                      style="text-align: right;margin-top: 20px;"></Page>
            </Row>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator"
    import {Page, TableColumn} from '@/types/views/common.interface'
    import {listArea} from '@/api/areaManage'
    import {listZoneInfoDatagrid} from '@/api/zoneManage'

    @Component({})
    export default class AreaChoose extends Vue {
        @Prop() tunnelId ?: number

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
                            'on-change': (val: boolean) => {
                                this.data6.map((item: any) => {
                                    item.checkBox = false
                                })
                                this.data6[params.index].checkBox = val;
                                this.sendMsg(params.index);
                            }
                        }
                    })
                ])
            }
        },
            {
                title: '区域名称',
                key: 'name',
                align: 'center'
            },
            {
                title: '所属监测点',
                key: 'tunnelName',
                align: 'center'
            }
        ]
        data6: any[] = []
        types: any[] = []
        warehouses: any[] = []
        researchInfo: any = {
            name: null,
            tunnelId: null
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
                tunnelId: this.tunnelId ? this.tunnelId : this.researchInfo.tunnelId
            }
        }

        mounted() {
            this.init();
            this.showTable();
        }

        init() {
            let _this = this
            listArea({}).then(
                (result: any) => {
                    let {code, data} = result.data
                    if (code === 200) {
                        this.warehouses = data
                    }
                },
                (error: string) => {
                    _this.Log.info(error)
                })
        }

        showTable() {
            let _this = this
            listZoneInfoDatagrid(this.params).then(
                (result: any) => {
                    let {code, data} = result.data
                    if (code === 200) {
                        data.list.map((item: any) => {
                            this.data6.push({
                                id: item.id,
                                name: item.name,
                                tunnelId: item.tunnel ? item.tunnel.id : null,
                                tunnelName: item.tunnel ? item.tunnel.name : null,
                                checkBox: false
                            })
                        })
                        this.page.pageTotal = data.total;
                    }
                },
                (error: string) => {
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
                this.$emit("listenToAreaChoose", this.data6[index]);
            } else {
                this.$emit("listenToAreaChoose", '');
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
