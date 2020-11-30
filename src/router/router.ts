/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */

import mainPage from '@/views/um/ummain/mainPage/mainPage.vue'
import cmmainPage from '@/views/cm/cmmain/cmmainPage/cmmainPage.vue'

export const constantRoutes: any[] = [
    {
        path: '/login',
        name: 'login',
        component: (resolve: any) => require(['@/views/um/login/login.vue'], resolve)
    },
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: '/cm',
        name: '后台管理',
        component: cmmainPage,
        redirect: '/cm/accountManage',
        children: [
            {
                path: 'areaManage',
                name: '大区管理',
                component: (resolve: any) => require(["@/views/cm/basicManage/areaManage/areaManage.vue"], resolve)
            },
            {
                path: 'zoneManage',
                name: '小区管理',
                component: (resolve: any) => require(["@/views/cm/basicManage/zoneManage/zoneManage.vue"], resolve)
            },
            // {
            //     path: 'shelfManage',
            //     name: '货架管理',
            //     component: (resolve: any) => require(["@/views/cm/basicManage/shelfManage/shelfManage.vue"], resolve)
            // },
            {
                path: 'videoManage',
                name: '视频管理',
                component: (resolve: any) => require(["@/views/cm/basicManage/videoManage/videoManage.vue"], resolve)
            },
            {
                path: 'accountManage',
                name: '用户管理',
                component: (resolve: any) => require(["@/views/cm/basicManage/accountManage/accountManage.vue"], resolve)
            },
            {
                path: 'roleManage',
                name: '角色管理',
                component: (resolve: any) => require(["@/views/cm/basicManage/roleManage/roleManage.vue"], resolve)
            },
            {
                path: 'categroy',
                name: '设备大类',
                component: (resolve: any) => require(["@/views/cm/basicManage/equipmentType/equipmentType.vue"], resolve)
            },
            {
                path: 'equipmentModel',
                name: '设备小类',
                component: (resolve: any) => require(["@/views/cm/basicManage/equipmentModel/equipmentModel.vue"], resolve)
            },
            {
                path: 'measobjType',
                name: '监测对象类型',
                component: (resolve: any) => require(["@/views/cm/basicManage/measobjType/measobjType.vue"], resolve)
            },
            {
                path: 'measobj',
                name: '监测对象',
                component: (resolve: any) => require(["@/views/cm/basicManage/measObj/measObj.vue"], resolve)
            }
        ]
    },
    {
        path: '/msg',
        name: '消息列表',
        component: mainPage,
        children: [
            {
                path: 'query',
                name: '我的消息',
                component: (resolve: any) => require(["@/views/um/msgManage/msgManage.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            }
        ]
    }

]

export const asyncRoutes: any[] = [
    {
        path: '/um',
        name: 'mainPage',
        component: mainPage,
        redirect: '/um/overview',
        children: [
            {
                path: 'overview/info',
                name: '总览',
                component: (resolve: any) => require(["@/views/um/overview/main/overview.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'maintainRecord/add',
                name: '添加维保记录',
                component: (resolve: any) => require(["@/views/um/details/maintenanceRecord/maintenanceRecord.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'maintainRecord/update',
                name: '修改维保记录',
                component: (resolve: any) => require(["@/views/um/details/maintenanceRecord/maintenanceRecord.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'maintainRecord/info',
                name: '详情维保记录',
                component: (resolve: any) => require(["@/views/um/details/maintenanceRecord/maintenanceRecord.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'maintainRecord/list',
                name: '维保管理',
                component: (resolve: any) => require(["@/views/um/details/maintenanceManage/maintenanceManage.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'video',
                name: '视频管理',
                component: (resolve: any) => require(["@/views/um/details/videoManageAll/videoManageAll.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'equipment/list',
                name: '台账查询',
                component: (resolve: any) => require(["@/views/um/details/equipmentManage/equipmentManage.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'equipment/add',
                name: '添加台账',
                component: (resolve: any) => require(["@/views/um/details/equipmentDetails/equipmentDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'equipment/info',
                name: '台账详情',
                component: (resolve: any) => require(["@/views/um/details/equipmentDetails/equipmentDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'equipment/update',
                name: '修改台账信息',
                component: (resolve: any) => require(["@/views/um/details/equipmentDetails/equipmentDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'diffarea',
                name: '分区展示',
                component: (resolve: any) => require(["@/views/um/details/diffArea/diffArea.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'alarm/list',
                name: '告警管理',
                component: (resolve: any) => require(["@/views/um/details/alarmManage/alarmManage.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'maintainTask/list',
                name: '维保任务',
                component: (resolve: any) => require(["@/views/um/details/maintainTask/maintainTask.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'maintainTask/info',
                name: '维保任务详情',
                component: (resolve: any) => require(["@/views/um/details/maintainTaskDetails/maintainTaskDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'maintainTask/update',
                name: '修改维保任务',
                component: (resolve: any) => require(["@/views/um/details/maintainTaskDetails/maintainTaskDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'patrolPlan/list',
                name: '巡检管理',
                component: (resolve: any) => require(["@/views/um/details/patrolManage/patrolManage.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'patrolPlan/add',
                name: '添加巡检计划',
                component: (resolve: any) => require(["@/views/um/details/addPatrol/addPatrol.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'patrolPlan/update',
                name: '修改巡检计划',
                component: (resolve: any) => require(["@/views/um/details/addPatrol/addPatrol.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'patrolPlan/info',
                name: '巡检计划详情',
                component: (resolve: any) => require(["@/views/um/details/addPatrol/addPatrol.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'queryData',
                name: '数据查询',
                component: (resolve: any) => require(["@/views/um/details/dataManage/dataManage.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'history',
                name: '历史数据',
                component: (resolve: any) => require(["@/views/um/details/historyData/historyData.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'patrolTask/list',
                name: '任务查询',
                component: (resolve: any) => require(["@/views/um/details/taskManage/taskManage.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'patrolTask/info',
                name: '巡检任务详情',
                component: (resolve: any) => require(["@/views/um/details/taskDetails/taskDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'patrolTask/update',
                name: '修改巡检任务',
                component: (resolve: any) => require(["@/views/um/details/taskDetails/taskDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'patrolTask/add',
                name: '添加巡检任务',
                component: (resolve: any) => require(["@/views/um/details/taskDetails/taskDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'patrolRecord/list',
                name: '查询巡检记录',
                component: (resolve: any) => require(["@/views/um/details/recordManage/recordManage.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'patrolRecord/info',
                name: '巡检记录详情',
                component: (resolve: any) => require(["@/views/um/details/recordDetails/recordDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'patrolRecord/add',
                name: '添加巡检记录',
                component: (resolve: any) => require(["@/views/um/details/recordDetails/recordDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'patrolRecord/update',
                name: '修改巡检记录',
                component: (resolve: any) => require(["@/views/um/details/recordDetails/recordDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'defect/list',
                name: '缺陷查询',
                component: (resolve: any) => require(["@/views/um/details/defectManage/defectManage.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'defect/info',
                name: '缺陷详情',
                component: (resolve: any) => require(["@/views/um/details/defectDetails/defectDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'defect/add',
                name: '添加缺陷',
                component: (resolve: any) => require(["@/views/um/details/defectDetails/defectDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: 'defect/update',
                name: '修改缺陷',
                component: (resolve: any) => require(["@/views/um/details/defectDetails/defectDetails.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            {
                path: '3d',
                name: 'unity3D',
                component: (resolve: any) => require(["@/views/um/details/unity3d/unity3d.vue"], resolve)
            },
            {
                path: 'receivePolice/list/:modalState?',
                name: '报警记录查询',
                component: (resolve: any) => require(["@/views/um/details/receivePoliceRecord/receivePoliceRecord.vue"], resolve),
                meta: {
                    requireAuth: true
                }
            },
            // {
            //     path: 'receivePolice/info',
            //     name: '报警记录详情',
            //     component: (resolve: any) => require(["@/views/um/details/receivePoliceRecordInfo/receivePoliceRecordInfo.vue"], resolve),
            //     meta: {
            //         requireAuth: true
            //     }
            // }
        ]
    }
]
