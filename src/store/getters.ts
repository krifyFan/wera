const getters = {
    token: (state: any) => state.user.token,
	name: (state: any) => state.user.name,
	routelist: (state: any) => state.user.permissionList,
	queueName: (state: any) => state.user.queueName,
	userId: (state: any) => state.user.userId,
	msg: (state: any) => state.user.msg,
	alarmAccessModalState: (state: any) => state.common.alarmAccessModalState
}

export default getters