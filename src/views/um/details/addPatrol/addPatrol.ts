import { Component, Vue, Watch } from 'vue-property-decorator'
import { Patrol } from '@/types/views/patrol.interface'
import { listStaff } from '@/api/user'
import _ from 'lodash'
import { listArea } from '@/api/areaManage'
import { getZones } from '@/api/equipment'
import { listEquipModel } from '@/api/equipmentManage'
import { addPlan, getPlanInfo, editPlan } from '@/api/patrolPlan'
import CheckboxPrivate from '@/components/common/checkbox.vue'

@Component({
    components: { CheckboxPrivate }
})
export default class About extends Vue {

    pageTitle:string = '新增巡检计划'

    pageType:string = 'Add'

    id:number = 0

    liablePersonNames: any[] = []
    liablePersonName:string | null = null
    isShow: boolean = false
    searchLiableNames: any

    week: any[] = [
        { key: '周一', val: 1 },
        { key: '周二', val: 2 },
        { key: '周三', val: 3 },
        { key: '周四', val: 4 },
        { key: '周五', val: 5 },
        { key: '周六', val: 6 },
        { key: '周日', val: 7 },
    ]

    planTypes: any[] = [
        { id: 1, name: '当天完成' },
        { id: 2, name: '一周内完成' },
        { id: 3, name: '当月完成' },
    ]

    patrolInfo:Patrol = {
        planSn: null,
        planName: null,
        description: null,
        staffId: Number(localStorage.getItem('userId')),
        responsibleId: null,
        planType: 1,
        execuPeriod: null,
        areaIds: null,
        zoneIds: '',
        equipmentTypeIds: null,
        startTime: null,
        endTime: null,
        dayOfWeek: '',
        spacing: 0,
        isMerge: false,
        immedGenerate: false,
        planStatus: 1
    }

    isShowPoptip: boolean = false

	groups: any[] = []

	zones: any[] = []

	checkAreas: number[] = []
    checkZones: number[] = []

    execuPeriod:any[] = []

    staffName: string = this.$store.getters.name

    equipmentTypeIds: any[] = []
    objs: any[] = []

    curMonthDays: Array<Number> = []

    count:number = 0

    firstDay:number = 0
    lastDay:number = 0
    // 当天完成
    DWeek:number[] = []
    DInterval:number|null = 0
    DOnce:boolean = false

    // 本周内完成
    WInterval:number|null = 0
    WOnce:boolean = false

    //本月完成
    MInterval:number|null = 0
    MOnce:boolean = false

    @Watch('pageType')
    watchPageType(newVal: string) {
        if (newVal === 'Read') {
            this.pageTitle = '巡检计划详情'
        } else if (newVal === 'Edit') {
            this.pageTitle = '修改巡检计划'
        } else {
            this.pageTitle = '新增巡检计划'
        }
    }

    created() {
        this.pageType = this.$route.params.type
        if (!!this.$route.params.id) {
            this.id = Number(this.$route.params.id)
        }
        // 搜索责任人 防抖
        let self = this
        this.searchLiableNames = _.debounce(function(){
            self.isShow = true
            let params = {
                name: self.liablePersonName
            }
            listStaff(params).then(res => {
                let { code, data } = res.data
                if (code === 200) {
                    self.liablePersonNames = data
                }
            })
        }, 200)
    }

    mounted() {
        let _this = this
        _this.listArea()
        this.listEquipModel()
        this.getCurMonthDays()
        if (this.pageType !== 'Add') {
            setTimeout( ()=> {
                this.getPlanInfo(this.id)
            }, 1000)
        }
		document.addEventListener('click', function(e) {
            if (
                (e as any).target.className === 'check-name' ||
                (e as any).target.className === 'pop-tip-content-wrap' ||
                (e as any).target.className === 'poptip-content' ||
				(e as any).target.className === 'zone-col ivu-col ivu-col-span-12' ||
				(e as any).target.className === 'check-box child-check-box' ||
				(e as any).target.className === 'check-box child-check-box hasChecked'
            ) {
                _this.isShowPoptip = true
            } else {
                _this.isShowPoptip = false
            }
        })
    }
    // 获取巡检对象
    listEquipModel() {
        listEquipModel().then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.objs = data
            }
        })
    }
    // 选中的巡检对象
    getObjs(data: any) {
        this.patrolInfo.equipmentTypeIds = data.join(',')
    }

    // 提交
    addPlanInfo() {
        this.patrolInfo.startTime = new Date((this.patrolInfo.startTime) as Date).getTime()
        this.patrolInfo.endTime = new Date((this.patrolInfo.endTime) as Date).getTime()
        this.checkAreas = [...new Set(this.checkAreas)]
        this.patrolInfo.areaIds = this.checkAreas.toString()
        this.checkZones = [...new Set(this.checkZones)]
        this.patrolInfo.zoneIds = this.checkZones.toString()
        if (this.patrolInfo.planType === 1) {
            this.patrolInfo.execuPeriod = '1-1'
        }
        addPlan(this.patrolInfo).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('添加成功！')
                this.back();
            } else {
                this.$Message.error('添加失败！')
            }
        })
    }

    // 回显详情
    async getPlanInfo(id: number) {
        getPlanInfo(id).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.patrolInfo = data
                this.liablePersonName = data.responsible
                this.staffName = data.applicant
                // 回显巡检对象
                if (data.equipmentTypeIds === '*') {
                    this.objs.map((ele: any) => {
                        this.equipmentTypeIds.push(ele.id)
                    })
                } else {
                    let arr = data.equipmentTypeIds.split(',')
                    arr.map((item: any) => {
                        this.equipmentTypeIds.push(Number(item))
                    })
                }
                // 回显执行时间--
                let execuPeriodArr = data.execuPeriod.split('-')
                // 当天完成
                if (data.planType === 1) {
                    // 回显计划间隔 -- 周
                    if (data.dayOfWeek !== '' && data.spacing !== -1) {
                        let dayOfWeekArr = data.dayOfWeek.split(',')
                        dayOfWeekArr.map((ele: any) => {
                            this.DWeek.push(Number(ele))
                        })
                    }
                    // 回显计划间隔 -- 一次性
                    else if (data.dayOfWeek === '' && data.spacing === -1) {
                        this.DOnce = true
                    } else if (data.dayOfWeek === '' && data.spacing !== -1) {
                        this.DInterval= data.spacing
                    }
                }
                // 一周内完成
                if (data.planType === 2) {
                    // 计划间隔
                    if (data.spacing === -1) {
                        this.WOnce = true
                    } else {
                        this.WInterval = data.spacing
                    }
                    // 执行时间
                    for(let i = Number(execuPeriodArr[0]); i <= Number(execuPeriodArr[1]); i++) {
                        this.execuPeriod.push(Number(i))
                    }
                }
                // 一个月内完成
                if (data.planType === 3) {
                    // 执行时间
                    this.choosedCurDya(Number(execuPeriodArr[0]))
                    this.choosedCurDya(Number(execuPeriodArr[1]))
                    // 计划间隔
                    if (data.spacing !== -1) {
                        this.MInterval = data.spacing
                    } else {
                        this.MOnce = true
                    }
                }
                // 回显大区 小区
                let areasArr = data.areaIds.split(',')
                areasArr = areasArr.map(Number)
                let zoneArr = data.zoneIds.split(',')
                zoneArr = zoneArr.map(Number)
                
                this.groups.filter((group: any) => {
                    if (areasArr.indexOf(group.id) > -1) {
                        let count:number = 0
                        group.originChildIds.forEach((id: number) => {
                            zoneArr.forEach((zone: any) => {
                                if (id === zone) {
                                    count++
                                }
                            });
                        });
                        if (count === group.originChildren.length) {
                            group.isAll = true
                            group.isChecked = false
                        } else if (count === 0) {
                            group.isAll = false
                            group.isChecked = false
                        } else {
                            group.isAll = false
                            group.isChecked = true
                        }
                        group.originChildren.filter((child: any) => {
                            zoneArr.some((zone: any) => {
                                if (child.id === zone) {
                                    child.isChecked = true
                                }
                            })
                        })
                    }
                })
            }
        })
    }

    //提交修改
    editPlanInfo() {
        this.patrolInfo.startTime = new Date((this.patrolInfo.startTime) as Date).getTime()
        this.patrolInfo.endTime = new Date((this.patrolInfo.endTime) as Date).getTime()
        this.checkAreas = [...new Set(this.checkAreas)]
        this.patrolInfo.areaIds = this.checkAreas.toString()
        this.checkZones = [...new Set(this.checkZones)]
        this.patrolInfo.zoneIds = this.checkZones.toString()
        let param = {
            id: this.id
        }
        let params = Object.assign(this.patrolInfo, param)
        editPlan(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                this.$Message.success('修改成功！')
                this.back();
            } else {
                this.$Message.error('修改失败！')
            }
        })

    }

    getCurDays() {
        let curDate = new Date()
        let curMonth = curDate.getMonth()
        curDate.setMonth(curMonth + 1)
        curDate.setDate(0)
        return curDate.getDate()
    }

    getCurMonthDays() {
        let days = this.getCurDays()
        for (let k = 1; k <= days; k++) {
            this.curMonthDays.push(k)
        }
    }
    // 当月完成
    choosedCurDya(day: number) {
        this.count++
        let domDay = this.$refs.day as any[]
        if (this.count % 2 !== 0) {
            this.firstDay = day
            for(let i=0; i<this.curMonthDays.length-1; i++) {
                domDay[i].removeAttribute('class', 'choosedDayOne')
            }
            domDay[this.firstDay-1].setAttribute('class', 'choosedDay')
        } else {
            this.lastDay = day
            domDay[this.lastDay-1].setAttribute('class', 'choosedDay')
            if (this.firstDay > this.lastDay) {
                let c = this.firstDay
                this.firstDay = this.lastDay
                this.lastDay = c
            }
            for(let i = this.firstDay; i < this.lastDay-1; i++) {
                domDay[i].setAttribute('class', 'choosedDayOne')
            }
        }
        this.patrolInfo.execuPeriod = `${this.firstDay}-${this.lastDay}`
    }
    // 本周内完成
    getExecuPeriod(data: any[]) {
        let maxNum:number = 0
        let minNum:number = 0
        let arr = []
        if (data.length > 1) {
            maxNum = Math.max(...data)
            minNum = Math.min(...data)
            for(let i = minNum; i <= maxNum; i++) {
                arr.push(i)
            }
            this.execuPeriod = arr
        } else if (data.length = 1) {
            maxNum = minNum = data[0]
        }
        this.patrolInfo.execuPeriod = `${minNum}-${maxNum}`
    }

    // 每逢周几--当天完成
    choosedDWeek() {
        this.DInterval = null
        this.DOnce = false
        this.patrolInfo.dayOfWeek = this.DWeek.join(',')
    }

    // 间隔时间--当天完成
    choosedDInterval() {
        this.DWeek = []
        this.DOnce = false
        this.patrolInfo.spacing = this.DInterval
    }
    // 一次性计划--当天完成
    choosedDOnce() {
        this.DWeek  = []
        this.DInterval = null
        this.patrolInfo.spacing = -1
    }

    //间隔时间--本周完成
    choosedWInterval() {
        this.WOnce = false
        this.patrolInfo.spacing = this.WInterval
    }
    // 一次性计划-- 本周内完成
    choosedWOnce() {
        this.WInterval = null
        this.patrolInfo.spacing = -1
    }

    // 间隔时间--本月完成
    choosedMInterval() {
        this.MOnce = false
        this.patrolInfo.spacing = this.MInterval
    }

    // 一次性计划--本月内完成
    choosedMOnce() {
        this.MInterval = null
        this.patrolInfo.spacing = -1
    }

    choosedliablePName(id: number, name: string) {
        this.patrolInfo.responsibleId = id
        this.liablePersonName = name
        this.isShow = false
    }

    // 巡检区部分
    async zoneById(id: number) {
        let params = {
            areaId: id
        }
        let { data } = await getZones(params)
        return data
    }
	
	async listArea() {
		let params = {}
        await listArea(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                data.forEach((ele: any) => {
                    let temp = {
                        id: ele.id,
                        name: ele.areaName,
                        originChildIds: [1],
                        originChildren: [{}],
                        checkChildIds: [],
						isAll: false,
						isChecked: false
                    }
                    let params = {
                        areaId: ele.id
                    }
                    
                    this.zoneById(ele.id).then(async res => {
                        let { code, data } = res
                        if (code === 200) {
                            temp.originChildren = []
                            temp.originChildIds = []
							await data.forEach((element: any) => {
								let a = {
									id: element.id,
									name: element.zoneName,
									isChecked: false
								}
                                temp.originChildren.push(a)
                                temp.originChildIds.push(element.id)
							});
                        }
                    })
					this.groups.push(temp)
                });
            }
        })
	}

	choosed(item: any) {
		item.isAll = !item.isAll
		if (item.isAll === true) {
			item.originChildren.forEach((ele: any) => {
				ele.isChecked = true
				item.originChildIds.push(ele.id)
			});
		} else {
			item.originChildren.forEach((ele: any) => {
				ele.isChecked = false
				item.originChildIds = []
			});
        }
	}

	showZone(item: any) {
		this.isShowPoptip = true
		this.zones = item.originChildren
	}

	choosedChild(item: any) {
		item.isChecked = !item.isChecked	
		this.groups.forEach((group: any) => {
			group.originChildren.filter((ele: any) => {
				if (ele.id === item.id) {
					if (group.originChildren.every((child: any) => child.isChecked === true)) {
						group.isChecked = false
						group.isAll = true
					} else {
						group.isAll = false
						if (group.originChildren.some((child: any) => child.isChecked === true)) {
							group.isChecked = true 
						} else {
							group.isChecked = false
						}
					}
				}
			})
        })
	}

	submitCheck() {
		this.groups.forEach((group: any) => {	
			if (group.isAll === true || group.isChecked === true) {
				this.checkAreas.push(group.id)
				group.originChildren.filter((child: any) => {
					if (child.isChecked === true) {
						this.checkZones.push(child.id)
					}
				})
			}
        })
	}

}
