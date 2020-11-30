import { UserState, UserInfo } from '@/types/views/user.interface'
import { MutationTree, ActionTree } from 'vuex'
import router, { resetRouter } from '@/router'
import { login, getInfo, logout } from '@/api/user'

const state:UserState = {
    token: '',
    name: '',
    permissionList: [],
    queueName: '',
    userId: 0,
    msg: ''
}

// 更改state
const mutations: MutationTree<UserState> = {
    SET_TOKEN: (state: UserState, token: string) => {
        state.token = token
        localStorage.setItem('token', token)
    },
    GET_TOKEN: (state: UserState) => {
        state.token = localStorage.getItem('token')
    },
    REMOVE_TOKEN: (state: UserState) => {
        state.token = ''
        localStorage.removeItem('token')
    },
    SET_NAME: (state: UserState, name: string) => {
        state.name = name
    },
    SET_ROUTELIST: (state: UserState, routeList: any[]) => {
        state.permissionList = routeList
    },
    SET_QUEUENAME: (state: UserState, queueName: any) => {
        state.queueName = queueName
    },
    SET_USERID: (state: UserState, userId: number) => {
        state.userId = userId
    },
    SET_MSG: (state: UserState, msg: string) => {
        state.msg = msg
    }
}

//action
const actions: ActionTree<UserState, any> = {
    login({ commit }, userInfo: UserInfo) {
        const { account, password } = userInfo
        return new Promise((resolve: any, reject: any) => {
            login({ account: account, password: password }).then((response: any) => {
                const { code, data } = response.data;
                if (code === 200 && Object.prototype.toString.call(data) === '[object Object]') {
                    
                    commit('SET_TOKEN', data.token)
                    commit('SET_USERID', data.userId)
                    
                    localStorage.setItem('userId', data.userId)
                    localStorage.setItem('curCrumb', '总览')

                    resolve(data)

                } else {
                    reject(data)
                } 
            }).catch(error => {
                commit('SET_MSG', error)
                reject(error)
            })
        })
    },

    // get user info
    getInfo({ commit }, userInfo: UserInfo) {
        return new Promise((resolve: any, reject: any) => {
            getInfo().then((res: any) => {
                let { code, data } = res.data
                if (code === 200) {
                    const { name, permissionList } = data
                    commit('SET_NAME', name)
                    commit('SET_ROUTELIST', permissionList)
    
                    resolve(data)
                } else {
                    reject(data)
                }
            }).catch((error: any) => {
                reject(error)
            })
        })
    },

    // logout
    logout({ commit }, userInfo: UserInfo) {
        return new Promise((resolve: any, reject: any) => {
            logout().then((res: any) => {
                commit('SET_QUEUENAME', [])
                commit('SET_NAME', '')
                commit('SET_ROUTELIST', [])
                commit('REMOVE_TOKEN')
                commit('SET_USERID', -1)
                commit('SET_MSG', '')
                localStorage.removeItem('token')
                localStorage.removeItem('curCrumb')
                resetRouter()
    
                resolve()
            }).catch((error: any) => {
                reject(error)
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}