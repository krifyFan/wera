import { Component, Vue } from 'vue-property-decorator'
import { Condition, VideoInfo } from '@/types/views/videoManage.interface'
import { Page } from '@/types/views/common.interface'
import { listArea } from '@/api/areaManage'
import { addVideoInfo, getVideoInfoById, editVideoInfo, listVideoInfoDatagrid, deleteVideo } from '@/api/videoManage'

@Component({})
export default class About extends Vue {


    conditions: Condition = {
        areaId: null,
        videoName: null
    }

    areaColumns: any[] = [
        {
            type: 'index',
            width: 80,
            align: 'center'
        },
        {
            title: '所属大区',
            key: 'areaId',
            align: 'center',
            render: (h: any, params: any) => {
                return h('span', params.row.area.areaName)
            }
        },
        {
            title: '视频名称',
            key: 'videoName',
            align: 'center'
        },
        {
            title: '视频Url',
            key: 'videoUrl',
            align: 'center'
        },
        {
            title: '操作',
            align: 'center',
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
                                this.getVideoInfoById(params.row.id)
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
                                this.deleteVideo(params.row.id)
                            }
                        }
                    }, '删除')
                ])
            }
        }
    ]

    areaData: any[] = []

    page: Page = {
        pageNum: 1,
        pageSize: 10,
        pageTotal: 0
    }

    pageStyle = {
        textAlign: 'right',
        margin: '10px 10px 15px auto'
    }

    infoForm: VideoInfo = {
        id: -1,
        areaId: -1,
        videoName: '',
    }

    videoInfo = {
        isShow: false,
        title: '添加视频信息',
        type: 1
    }

    areas: any[] = []

    mounted() {
        this.listTunnelInfo()
        this.listInfoDatagrid()
    }

    listInfoDatagrid() {
        let params = {
            videoName: this.conditions.videoName,
            areaId: this.conditions.areaId,
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize
        }
        listVideoInfoDatagrid(params).then(res => {
            let { code, data, msg } = res.data
            if (code === 200) {
                this.areaData = data.list
                this.page.pageTotal = data.total
            }
        })
    }

    listTunnelInfo() {
        let params = {
            tunnel: true
        }
        listArea(params).then(res => {
            let { code, data, msg } = res.data
            if (code === 200) {
                this.areas = data
            } else {
                this.$Message.error('查询大区信息失败！')
            }
        })
    }

    showAddModal() {
        this.videoInfo.isShow = true
        this.videoInfo.title = '添加视频'
        this.videoInfo.type = 1
    }

    addVideoInfo() {
        addVideoInfo(this.infoForm).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('添加成功！')
                this.videoInfo.isShow = false
                this.listInfoDatagrid()
            } else {
                this.$Message.error('添加失败！')
            }
        })
    }

    getVideoInfoById(id: number) {
        this.videoInfo.isShow = true
        this.videoInfo.type = 2
        this.videoInfo.title = '修改视频信息'
        getVideoInfoById(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.infoForm = data
            }
        })
    }

    editVideoInfo() {
        editVideoInfo(this.infoForm).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('修改成功！')
                this.videoInfo.isShow = false
                this.listInfoDatagrid()
            } else {
                this.$Message.error('修改失败！')
            }
        })
    }

    handlePage(value: number) {
        this.page.pageNum = value
        this.listInfoDatagrid()
    }

    handlePageSize(value: number) {
        this.page.pageSize = value
        this.listInfoDatagrid()
    }

    deleteVideo(id: number) {
        this.$Modal.confirm({
            title: '删除',
            content: '确定要删除这条视频信息吗？',
            onOk: () => {
                deleteVideo(id).then(res => {
                    let { code, data, msg } = res.data
                    if (code === 200) {
                        this.$Message.success('删除成功！')
                        this.listInfoDatagrid()
                    } else {
                        this.$Message.error('删除失败！')
                    }
                })
            }
        })
    }

}
