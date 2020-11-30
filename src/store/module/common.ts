import { MutationTree, ActionTree } from 'vuex'

const state:any = {
    alarmAccessModalState: false
}

const mutations: MutationTree<any> = {
    Set_ModalState: (state: any, modalState: boolean) => {
        
        state.alarmAccessModalState = modalState
    }
}

export default {
    state,
    mutations
}
