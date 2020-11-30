import {Component, Vue} from 'vue-property-decorator'
import {allMeasobjType} from '@/api/measobjType.ts'
// import {
//     listTunnel,
//     listArea,
//     listStoreKv
// } from '@/api/commonModule.ts'
import {
    batchDeleteMeasObjs,
    batchPostMeasObjs,
    batchUpdateMeasObjs,
    getAllMeasObjs,
    measObjDataGrid,
    updateMeasObjsActived
} from '@/api/measObj'
// import ExportCSV from "@/components/cm/exportCSV.vue"
import MeasObjModule from '@/components/cm/measObjModule.vue'
// import MeasObjMultiModule from '@/components/cm/measObjMultiModule.vue'
// import storeChoose from '@/components/cm/storeChoose.vue'
// import areaChoose from '@/components/cm/areaChoose.vue'

@Component({
    components: {
        MeasObjModule,
        // MeasObjMultiModule,
        // storeChoose,
        // areaChoose,
        // ExportCSV
    }
})
export default class About extends Vue {

    lists: any = {
        objtypes: [],
        // tunnels: [],
        // areas: []
    }
    isFinishEnums: any = [{
        val: 0,
        key: "否"
    }, {
        val: 1,
        key: "是"
    }]
    researchInfo: any = {
        name: null,
        id: null,
        objtypeIds: null,
        datatypeId: null,
        tunnelId: null,
        storeName: null,
        storeId: null,
        areaId: null,
        areaName: null
    }
    measObjDataColumns: Array<object> = [
        {
            type: "selection",
            width: 60,
            align: "center"
        },
        {
            type: "index",
            width: 60,
            align: "center"
        },
        {
            title: "监测对象名称",
            key: "name",
            align: "center"
        },
        {
            title: "监测对象ID",
            key: "id",
            align: "center"
        },
        {
            title: "监测对象类型",
            key: "measobjTypeName",
            align: "center",
            // render: (h: any, params: any) => {
            //     let measobjType = params.row.measobjType
            //     return h('span', measobjType && measobjType.name ? measobjType.name : '')
            // }
        },
        {
            title: "数据类型",
            key: "dataTypeName",
            align: "center"
        },
        {
            title: "设备",
            key: "equipmentName",
            align: "center"
        },
        // {
        //     title: '关联预案',
        //     key: 'plansName',
        //     align: 'center',
        //     render: (h: any, params: any) => {
        //         let temp = params.row.plansName
        //         if (temp.length == 0) {
        //             temp = null
        //         }
        //         return h('span', temp)
        //     }
        // },
        // {
        //     title: "位置",
        //     key: "location",
        //     align: "center"
        // },
        // {
        //     title: "描述",
        //     key: "description",
        //     align: "center"
        // },
        {
            title: "是否激活",
            key: "actived",
            align: "center",
            render: (h: any, params: any) => {
                let isActived = null
                if (params.row.isActive == true) {
                    isActived = '是'
                } else {
                    isActived = '否'
                }
                return h('div', isActived)
            }
        },
        {
            title: "操作",
            key: "action",
            width: 100,
            align: "center",
            render: (h: any, params: any) => {
                return h("div", [
                    h(
                        "Button", {
                            props: {
                                type: "primary",
                                size: "small"
                            },
                            style: {
                                marginLeft: "5px"
                            },
                            on: {
                                click: () => {
                                    this.edit(params.row.id);
                                }
                            }
                        },
                        "修改"
                    )
                ]);
            }
        }
    ]
    measObjDatas: Array<any> = []
    page: any = {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
    }
    deleteShow: boolean = false
    deleteSelect: Array<any> = []
    measObjModule: any = {
        show: {
            state: false
        },
        type: null,
        id: null
    }
    measObjMultiModule: any = {
        show: {
            state: false
        },
        type: 1
    }
    objtypeIds: Array<any> = []
    objsHeader: Array<any> = [{
        label: '接入设备名称',
        prop: 'name'
    },
        {
            label: '设备编号',
            prop: 'id'
        },
        {
            label: '设备安装位置',
            prop: 'description'
        }
    ]
    objsDataCSV: Array<any> = []
    objsFileName: string = '监测对象'
    editActivedModal: any = {
        isShow: false,
        title: '批量修改检测对象激活',
        info: {
            tunnelId: 0,
            areaId: 0,
            storeId: 0,
            actived: false
        },
        tunnels: [{
            id: 0,
            name: "全部"
        }],
        areas: [{
            id: 0,
            name: "全部"
        }],
        stores: [{
            id: 0,
            name: "全部"
        }]
    }

    $refs!: {
        measObjModule: Vue
    }

    get researches() {
        let param = {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            name: this.researchInfo.name,
            id: this.researchInfo.id,
            measobjTypeIds: this.objtypeIds.length === 0 ? null : this.objtypeIds,
            datatypeId: this.researchInfo.datatypeId,
            tunnelId: this.researchInfo.tunnelId,
            storeId: this.researchInfo.storeId,
            areaId: this.researchInfo.areaId
        };
        return Object.assign({}, param)
    }

    mounted() {
        this.init()
        this.search()
        // this.setWidth()
    }

    init() {
        allMeasobjType().then((res: any) => {
            let {
                code,
                data
            } = res.data
            if (code === 200) {
                this.lists.objtypes = data
            }
        }, (err: any) => {
            this.Log.warn(err)
        })

        let params = {
            tunnel: true
        }
        // listArea(params).then((res: any) => {
        //     let {
        //         code,
        //         data
        //     } = res.data
        //     if (code === 200) {
        //         this.lists.tunnels = data
        //         this.editActivedModal.tunnels = [{
        //             id: null,
        //             areaName: "全部"
        //         }]
        //         this.editActivedModal.tunnels.push(...transformData(data))
        //     }
        // }, (err: any) => {
        //     this.Log.warn(err)
        // })

        // getAllMeasObjs().then(
        //     (result: any) => {
        //         let {
        //             code,
        //             data
        //         } = result.data
        //         if (code === 200) {
        //             this.objsDataCSV = data
        //         }
        //     },
        //     (error: string) => {
        //         this.Log.info(error)
        //     }
        // )
    }

    setWidth() {
        this.$nextTick(() => {
            let width = (document.getElementById("objtype") as any).offsetWidth;
            (document.getElementById("store") as any).style.width = width + "px";
            (document.getElementById("area") as any).style.width = width + "px";
        })
        window.onresize = function () {
            let width = (document.getElementById("objtype") as any).offsetWidth;
            (document.getElementById("store") as any).style.width = width + "px";
            (document.getElementById("area") as any).style.width = width + "px";
        };
    }

    search() {
        measObjDataGrid(this.researches).then((result: any) => {
                let {code, data} = result.data
                if (code === 200) {
                    this.page.pageTotal = data.total
                    this.measObjDatas = []
                    this.measObjDatas = data.list
                    // this.measObjDatas.forEach((measobj: any) => {
                    //     if (measobj.section != null) {
                    //         measobj.location = measobj.tunnel.name + measobj.section.name
                    //     }
                    // });
                }
            },
            (error: any) => {
                this.Log.info(error)
            }
        );
    }

    resetAndSearch() {
        this.page.pageNum = 1
        this.search()
    }

    editActivedModalTunnelChange(tunnelId: number) {
        if (tunnelId === 0) {
            this.editActivedModal.stores = [{
                id: null,
                name: "全部"
            }]
            this.editActivedModal.areas = [{
                id: null,
                name: "全部"
            }]
            return
        }
        if (tunnelId != null && tunnelId != undefined) {
            // listStoreKv(tunnelId).then((res: any) => {
            //     let {
            //         code,
            //         data
            //     } = res.data
            //     if (code === 200) {
            //         this.editActivedModal.stores = [{
            //             id: 0,
            //             name: "全部"
            //         }]
            //         this.editActivedModal.stores.push(...transformData(data))
            //     }
            //
            // }, (error: any) => {
            //     this.Log.info(error)
            // })
            // listArea(tunnelId).then((res: any) => {
            //     let {
            //         code,
            //         data
            //     } = res.data
            //     if (code === 200) {
            //         this.editActivedModal.areas = [{
            //             id: 0,
            //             name: "全部"
            //         }]
            //         this.editActivedModal.areas.push(...transformData(data))
            //     }
            // }, (error: any) => {
            //     this.Log.info(error)
            // })
        }

    }

    // 编辑激活的确认
    editActivedSave() {
        let {
            tunnelId,
            areaId,
            storeId,
            actived
        } = this.editActivedModal.info

        let param = {
            tunnelId: tunnelId == 0 ? null : tunnelId,
            areaId: areaId == 0 ? null : areaId,
            storeId: storeId == 0 ? null : storeId,
            actived: actived
        }

        updateMeasObjsActived(param).then((res: any) => {
            let {
                code,
            } = res.data
            if (code == 200) {
                this.$Message.success('修改成功')
                this.editActivedModal.isShow = false
                this.editActivedModal.info = {
                    tunnelId: 0,
                    areaId: 0,
                    storeId: 0,
                    actived: false
                }
            }

        }, (error: any) => {
            this.Log.info(error);
        })
    }

    handleReset() {
        this.editActivedModal.isShow = false
        this.editActivedModal.info = {
            tunnelId: 0,
            areaId: 0,
            storeId: 0,
            actived: false
        }
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.search()
    }

    getStore(store: any) {
        this.researchInfo.storeId = store.id
        this.researchInfo.storeName = store ? store.tunnelName + '-' + store.name : ''
    }

    getArea(area: any) {
        this.researchInfo.areaId = area.id
        this.researchInfo.areaName = area ? area.tunnelName + '-' + area.name : ''
    }

    add() {
        this.measObjModule.show.state = !this.measObjModule.show.state
        this.measObjModule.type = 1
    }

    edit(id: number) {
        this.measObjModule.show.state = !this.measObjModule.show.state;
        this.measObjModule.type = 2;
        this.measObjModule.id = id
        this.$refs.measObjModule.getMeasObjInfo(id)
    }

    addMulti() {
        this.measObjMultiModule.show.state = !this.measObjMultiModule.show.state;
        this.measObjMultiModule.type = 1
    }

    editMulti() {
        this.measObjMultiModule.show.state = !this.measObjMultiModule.show.state;
        this.measObjMultiModule.type = 2
    }

    addMeasObj() {
        this.measObjModule.show.state = !this.measObjModule.show.state;
        this.$Message.success('添加成功');
        this.resetAndSearch()
    }

    updateMeasObj() {
        this.measObjModule.show.state = !this.measObjModule.show.state;
        this.$Message.success('修改成功');
        this.resetAndSearch()
    }

    editActived() {
        this.editActivedModal.isShow = true
    }

    saveMultiParent(data: Array<any>) {
        data.forEach((element: any) => {
            element.id = parseInt(element.id);
        });
        batchPostMeasObjs(data).then((res: any) => {
            let {
                code,
            } = res.data
            if (code == 200) {
                this.$Message.info("添加成功")
                this.resetAndSearch()
            }
        }, (error: any) => {
            this.Log.info(error)
        });
    }

    editSaveMulti(data: Array<any>) {
        data.forEach(element => {
            element.id = parseInt(element.id);
        });
        batchUpdateMeasObjs(data).then((res: any) => {
            let {
                code,
            } = res.data
            if (code == 200) {
                this.$Message.info("修改成功")
                this.resetAndSearch()
            }

        }, (error: any) => {
            this.Log.info(error);
        });
    }

    startdelete(selection: any) {
        if (selection.length != 0) {
            this.deleteShow = true;
            this.deleteSelect = selection;
        } else {
            this.deleteShow = false;
        }
    }

    alldelete() {
        this.$Modal.confirm({
            title: "删除确认",
            content: "<p>确认要删除选中的信息吗？</p>",
            onOk: () => {
                let ids: number[] = []
                this.deleteSelect.map((item: any) => {
                    ids.push(item.id)
                })
                batchDeleteMeasObjs(ids).then((res: any) => {
                        let {
                            code,
                        } = res.data
                        if (code == 200) {
                            this.$Message.info("已删除");
                            this.deleteShow = false;
                            this.resetAndSearch();
                        }
                    },
                    (error: any) => {
                        this.Log.info(error);
                    }
                );
            },
            onCancel: () => {
                this.$Message.info("已取消操作");
                this.resetAndSearch();
            },
        });
    }
}
