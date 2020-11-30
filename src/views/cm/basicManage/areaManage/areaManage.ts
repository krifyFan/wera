import {Component, Vue} from "vue-property-decorator"
import {AreaInfo, Conditions} from '@/types/views/areaManage.interface'
import {addArea, deleteArea, editArea, getAreaInfoById, listAreaDatagrid, listAreaTypeEnums} from '@/api/areaManage'
import {Page} from '@/types/views/common.interface'
import {Upload} from 'view-design'

@Component({})
export default class About extends Vue {

    conditions: Conditions = {
        name: null,
        constructId: null,
        operationId: null,
        type: null,
        direction: null
    }
    types: any[] = []

    columns: any[] = [
        {
            type: 'index',
            width: 30,
            align: 'center'
        },
        {
            title: '大区名称',
            key: 'areaName',
            align: 'center'
        },
        {
            title: '大区类型',
            key: 'type',
            align: 'center',
            render(h: any, params: any) {
                return h('span', params.row.areaTypeDto.val)
            }
        },
        {
            title: '底图预览',
            key: 'iconFile',
            align: 'center'
        },
        {
            title: '简介',
            key: 'introduction',
            align: 'center'
        },
        {
            width: 140,
            render: (h: any, params: any) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.getInfoById(params.row.id)
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.delete(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]

    data: any[] = []

    page: Page = {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
    }

    // 图片上传
    action?: string = '//jsonplaceholder.typicode.com/posts/'
    defaultList = [
        // {
        //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
        //     'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        // },
    ]
    imgUrl = ''
    visible = false
    uploadList: any[] = []
    imgUrlData = []

    pageStyle = {
        textAlign: 'right',
        margin: '10px 10px 15px auto'
    }

    infoForm: AreaInfo = {
        id: -1,
        areaName: '',
        address: '',
        introduction: '',
        information: '',
        iconFile: '',
        selectIconFile: '',
        type: -1,
        capacity: -1,
        baseMapFile: '',
        ownerPerson: '',
        ownerPhone: '',
    }

    info = {
        isShow: false,
        title: '添加大区信息',
    }

    mounted() {
        this.action = '//jsonplaceholder.typicode.com/posts/'
        let refs = this.$refs.upload as Upload
        this.uploadList = refs.fileList;
        this.listTunnelStatus()
        this.listAreaDatagrid()
    }

    //图片上传
    handleView(name: string) {
        this.imgUrl = name;
        this.visible = true;
    }

    handleRemove(file: any) {
        this.$Modal.confirm({
            title: '删除巡检图片',
            content: '<p>确定要删除这张巡检图片吗</p>',
            onOk: () => {
                let refs = this.$refs.upload as Upload
                const fileList = refs.fileList;
                refs.fileList.splice(fileList.indexOf(file), 1);
            },
            onCancel: () => {
                console.log("delete")
            }
        })
    }

    handleSuccess(res: any, file: any) {
        file.url = this.ApiUrl + "/" + res.data.url
        file.name = res.data.name
        this.$Message.success('图片上传成功')
    }

    handleFormatError(file: any) {
        this.$Notice.warning({
            title: '图片格式错误',
            desc: file.name + '的格式错误，请选择jpg，jpeg，png，gif格式的图片'
        });
    }

    handleMaxSize(file: any) {
        this.$Notice.warning({
            title: '图片超出最大限制',
            desc: file.name + '太大了，图片最大不能超过2M'
        });
    }

    listAreaDatagrid() {
        let params = {
            name: this.conditions.name,
            operationId: this.conditions.operationId,
            constructId: this.conditions.constructId,
            type: this.conditions.type,
            direction: this.conditions.direction,
            pageSize: this.page.pageSize,
            pageNum: this.page.pageNum
        }
        listAreaDatagrid(params).then(res => {
            let {code, data, msg} = res.data
            if (code === 200) {
                this.data = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    getInfoById(id: number) {
        this.info.isShow = true
        this.info.title = '修改大区信息'
        getAreaInfoById(id).then(res => {
            let {code, data, msg} = res.data
            if (code === 200) {
                this.infoForm = data
            }
        })
    }

    delete(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: '<p>确定要删除这条大区信息吗？</p>',
            onOk: () => {
                deleteArea(id).then(res => {
                    let {code, data, msg} = res.data
                    if (code === 200) {
                        this.$Message.success('删除成功！')
                        this.listAreaDatagrid()
                    } else {
                        this.$Message.error('删除失败！')
                    }
                })
            }
        })
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.listAreaDatagrid()
    }

    handlePageSize(value: number) {
        this.page.pageSize = value
        this.listAreaDatagrid()
    }

    // 获取大区类型
    listTunnelStatus() {
        listAreaTypeEnums().then(res => {
            let {code, data, msg} = res.data
            if (code === 200) {
                this.types = data
            } else {
                this.$Message.error('获取大区类型失败！!!!')
            }
        })
    }

    showAddModal() {
        this.info.isShow = true
        this.info.title = '添加大区信息'
        this.infoForm.areaName = null
        this.infoForm.introduction = null
        this.infoForm.information = null
        this.infoForm.iconFile = ""
        this.infoForm.selectIconFile = ""
        this.infoForm.type = null
        this.infoForm.capacity = null
        this.infoForm.baseMapFile = null
        this.infoForm.ownerPerson = null
        this.infoForm.ownerPhone = null
    }

    saveInfo(data: AreaInfo) {
        if (data.id && data.id > 0) {
            this.editInfo(data)
        } else {
            this.addInfo(data)
        }
    }

    addInfo(data: AreaInfo) {
        let params = {
            areaName: data.areaName,
            address: data.address,
            introduction: data.introduction,
            information: data.information,
            iconFile: data.iconFile,
            selectIconFile: data.selectIconFile,
            type: data.type,
            capacity: data.capacity,
            baseMapFile: data.baseMapFile,
            ownerPerson: data.ownerPerson,
            ownerPhone: data.ownerPhone,
        }
        addArea(params).then(res => {
            let {code, data, msg} = res.data
            if (code === 200) {
                this.$Message.success('添加成功！')
                this.info.isShow = false
                this.listAreaDatagrid()
            } else {
                this.$Message.error('添加失败！')
            }
        })
    }

    editInfo(data: any) {
        editArea(data).then(res => {
            let {code, data, msg} = res.data
            if (code === 200) {
                this.$Message.success('修改成功！')
                this.info.isShow = false
                this.listAreaDatagrid()
            }
        })
    }
}
