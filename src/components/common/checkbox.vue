<template>
    <div class="area-wrap scrollbar">
        <Row class="area-content-wrap">
			<Col span="12" v-for="item in groups" :key="item.id">
				<div>
					<div 
						class="check-box"
						@click="choosed(item)"
						:class="{ hasChecked: item.isAll === true, hasIndeterminate: item.isChecked === true }"
					></div>
					<div class="check-name" @click="showZone(item)">{{item.name}}</div>
				</div>
			</Col>
			<div class="pop-tip-content-wrap" v-show="isShowPoptip">
				<div class="cac_bg"></div><!-- 背景三角 -->
				<div class="cac_bder"></div><!-- 边框三角 -->
				<div class="poptip-content scrollbar">
					<Col span="12" v-for="ele in zones" :key="ele.id" class="zone-col">
						<div 
							class="check-box child-check-box"
							@click="choosedChild(ele)"
							:class="{ hasChecked: ele.isChecked === true }"
						></div>
						<div class="check-name">{{ele.name}}</div>
					</Col>
				</div>
			</div>
			<Button @click="submitCheck()">确定</Button>
		</Row>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"
import { listArea } from '@/api/areaManage'
import { getZones } from '@/api/equipment'
import { takeRightWhile } from 'lodash'
import { listRecordDatagrid } from '@/api/recordManage'
@Component({})
export default class About extends Vue {

	isShowPoptip: boolean = false

	groups: any[] = []

	zones: any[] = []

	checkAreas: number[] = []
	checkZones: number[] = []

    mounted() {
		let _this = this
		_this.listArea()
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

	async zoneById(id: number) {
        let params = {
            areaId: id
        }
        let { data } = await getZones(params)
        return data
	}
	
	listArea() {
		let params = {}
        listArea(params).then(res => {
            let { code, data } = res.data
            if (code === 200) {
                data.forEach((ele: any) => {
                    let temp = {
                        id: ele.id,
                        name: ele.areaName,
                        originChildIds: [],
                        originChildren: [{}],
                        checkChildIds: [],
						isAll: false,
						isChecked: false
                    }
                    this.zoneById(ele.id).then( res => {
                        let { code, data } = res
                        if (code === 200) {
							temp.originChildren = []
							data.forEach((element: any) => {
								let a = {
									id: element.id,
									name: element.zoneName,
									isChecked: false
								}
								temp.originChildren.push(a)
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
</script>
<style lang="less" scoped>
.area-wrap {
	overflow-y: auto;
	padding-left: 10px;
	width: 100%;
	border: 1px solid #ccc;
	height: 100px;
	.pop-tip-content-wrap{
		position: absolute;
		z-index: 999;
		right: 0px;
		top: -100px;
		width: 60%;
		height:80px;
		line-height:40px;
		background:#fff;
		border-radius:4px;
		border:1px solid #ccc;
		padding-left: 10px;
		.poptip-content {
			height: 100%;
			overflow: auto;
		}
	}
	.cac_bder{
		width: 0;
		border-top: 30px solid #ccc;
		border-left: 30px solid transparent;
		border-right: 30px solid transparent;
		position: absolute;
		bottom: -30px;
		left: 100px;
		z-index:1;
	
		}
	.cac_bg{
		width: 0;
		border-top: 29px solid #fff;
		border-left: 29px solid transparent;
		border-right: 29px solid transparent;
		position: absolute;
		left: 101px;
		z-index: 2;
		bottom: -27px;
	}
}
.check-box {
	width: 20px;
	height: 20px;
	border: 1px solid #cccccc;
	margin-right: 10px;
	cursor: pointer;
	position: relative;
	&.hasChecked {
		background: @main-color;
	}
	&.hasChecked::after {
		content: "\2714";
		color: #ffffff;
		position: absolute;
		top: -10px;
		right: 4px;
		left: 1px;
		bottom: 1px;
	}
	&.hasIndeterminate {
		background: @main-color;
	}
	&.hasIndeterminate::after {
		content: "";
		width: 11px;
		height: 2px;
		-webkit-transform: scale(1);
		transform: scale(1);
		position: absolute;
		left: 3px;
		top: 8px;
		background: #fff;
	}
}
.check-box,
.check-name {
	display: inline-block;
	vertical-align: middle;
}
</style>