import {
    Component,
    Vue
} from 'vue-property-decorator'
import {
    addH5StreamConfig,
    downloadData,
    h5Data,
    insertH5StreamConfig,
    insertH5StreamRTSPConfig,
    getInfo,
    submitEdit
} from '@/api/h5StreamConfig'
import ExportCSV from "@/components/cm/exportCSV.vue"

@Component({
    components: {
        ExportCSV
    }
})
export default class About extends Vue {
    
    h5StreamConditions: any = {
        id: null,
        venderId: null
    }
    page: any = {
        pageTotal: 0,
        pageNum: 1,
        pageSize: 10
    }
    pageStyle: any = {
        position: 'absolute',
        bottom: '35px',
        right: '40px'
    }
    videoConfig: Array < any > = []
    insertVideoConfig: Array < any > = []
    tableData: Array < any > = []
    columns: Array < Object > = [{
            title: 'ID',
            key: 'id',
            align: 'center'
        },
        {
            title: 'IP',
            key: 'ip',
            align: 'center'
        },
        {
            title: '端口',
            key: 'port',
            align: 'center'
        },
        {
            title: '用户名',
            key: 'userName',
            align: 'center'
        },
        {
            title: '供应商',
            key: 'venderId',
            align: 'center'
        },
        {
            title: '频道',
            key: 'channelNo',
            align: 'center'
        }
    ]
    columnsTable: Array < any > = [{
            title: 'ID',
            key: 'id',
            align: 'center'
        },
        {
            title: 'IP',
            key: 'ip',
            align: 'center'
        },
        {
            title: '端口',
            key: 'port',
            align: 'center'
        },
        {
            title: '用户名',
            key: 'userName',
            align: 'center'
        },
        {
            title: '供应商',
            key: 'venderName',
            align: 'center'
        },
        {
            title: '频道',
            key: 'channelNo',
            align: 'center'
        },
        {
            title: '操作',
            align: 'center',
            render: (h: any, params: any) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                console.log(params.row)
                                this.editH5StreamConfig(params.row.id)
                            }
                        }
                    }, '修改')
                ]);
            }
        }
    ]
    saveFlag: boolean = false
    insertFlag: boolean = false
    isOnvif: boolean = true
    H5StreamConfigHeader: Array < any > = [{
            label: 'ID',
            prop: "id"
        },
        {
            label: 'IP',
            prop: 'ip'
        },
        {
            label: '端口',
            prop: 'port'
        },
        {
            label: '用户名',
            prop: 'userName'
        },
        {
            label: '密码',
            prop: 'password'
        },
        {
            label: '供应商',
            prop: 'venderId'
        },
        {
            label: '频道',
            prop: 'channelNo'
        }
    ]
    H5StreamConfigCSV: Array < any > = []
    H5StreamConfigFileName: string = 'H5Stream配置文件'
    isAdd: boolean = false
    isInsert: boolean = false
    isTable: boolean = true
    isEdit: boolean = false
    configInfo: any = null
    formValidate: any = {
        id: null,
        ip: null,
        port: null,
        userName: null,
        password: null,
        venderId: null,
        channelNo: null
    }
    ruleValidate: any = {}

    mounted() {
        this.getDownloadData()
        this.showTable()
    }

    getData(data: any) {
        this.videoConfig = []
        data.body.forEach((config: any) => {
            let temp = < any > {}
            temp.id = parseInt(config[data.header[0]])
                temp.ip = config[data.header[1]]
                temp.port = config[data.header[2]]
                temp.userName = config[data.header[3]]
                temp.password = config[data.header[4]]
                temp.venderId = config[data.header[5]]
                temp.channelNo = config[data.header[6]]
            this.videoConfig.push(temp)
        })
        this.isAdd = true
        this.isInsert = false
        this.isTable = false
        this.saveFlag = true
        this.insertFlag = false
    }
    save() {
        addH5StreamConfig(this.videoConfig).then((res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.$Message.success("添加成功！")
                    this.saveFlag = false
                }

            },
            (error: any) => {
                this.Log.info(error)
            })
    }
    getInsertData(data: any) {
        this.saveFlag = false
        this.insertVideoConfig = []
        data.body.forEach((config: any) => {
            let temp = < any > {}
                temp.id = parseInt(config[data.header[0]])
                temp.ip = config[data.header[1]]
                temp.port = config[data.header[2]]
                temp.userName = config[data.header[3]]
                temp.password = config[data.header[4]]
                temp.venderId = config[data.header[5]]
                temp.channelNo = config[data.header[6]]
            this.insertVideoConfig.push(temp)
        })
        this.isAdd = false
        this.isInsert = true
        this.isTable = false
        this.insertFlag = true
    }
    insert() {
        if (this.isOnvif) {
            insertH5StreamConfig(this.insertVideoConfig).then((result: any) => {
                    this.$Message.success("添加成功！")
                    this.insertFlag = false
                    this.getDownloadData()
                    this.showTable()
                },
                (error: any) => {
                    this.Log.info(error)
                }
            )
        } else {
            insertH5StreamRTSPConfig(this.insertVideoConfig).then((result: any) => {
                    this.$Message.success("添加成功！")
                    this.insertFlag = false
                    this.getDownloadData()
                    this.showTable()
                },
                (error: any) => {
                    this.Log.info(error)
                }
            )
        }
    }
    getDownloadData() {
        downloadData().then((res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.H5StreamConfigCSV = data
                }
            },
            (error: any) => {
                this.Log.info(error)
            }
        )
    }
    showTable() {
        let params = {
            id: this.h5StreamConditions.id,
            venderId: this.h5StreamConditions.venderId,
            pageSize: this.page.pageSize,
            pageNum: this.page.pageNum
        }
        h5Data(params).then((res: any) => {

                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.page.pageTotal = data.total
                    this.tableData = data.list
                    this.isTable = true
                    this.isAdd = false
                    this.isInsert = false
                }

            },
            error => {
                // this.Log.info(error)
                let data =  {
                    total: 10,
                    list: [{
                        id: 1,
                        ip: '1000',
                        port: 80,
                        userName:'ss',
                        venderId: 'dd',
                        channelNo: 'dd'
                
                    }]
                }

                this.page.pageTotal = data.total
                this.tableData = data.list
                this.isTable = true
                this.isAdd = false
                this.isInsert = false
            }
        )
    }
    handlePage(value: number) {
        this.page.pageNum = value
        this.showTable()
    }
    handlePageSize(value: number) {
        this.page.pageSize = value
        this.showTable()
    }
    editH5StreamConfig(id: string) {
        this.isEdit = true
        getInfo(id).then(
            (res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.formValidate = data
                }
            },
            (error: any) => {
                this.Log.info(error)
            }
        )
    }
    submitEdit() {
        submitEdit(this.formValidate).then(
            (res: any) => {
                let {
                    code,
                    data
                } = res.data
                if (code === 200) {
                    this.$Message.success("修改成功！")
                    this.isEdit = false
                    this.showTable()
                }
            },
            error => {
                this.$Message.error("修改失败！")
                this.Log.info(error)
            }
        )
    }
}