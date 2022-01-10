import request from "../../utils/request.js"
const state = {
	indexData:{},
	cardList:[]
}
const mutations = {
	SET_INDEXDATA(state,indexData){
		state.indexData = indexData
	},
	SET_CARDLIST(state,cardList){
		state.cardList = cardList
	}
}
const actions = {
	async getIndexData({commit}){
		const result = await request('/getIndexData')
		// console.log(result)
		commit('SET_INDEXDATA',result)
	},
	async getCardList({commit}){
		const result = await request('/getIndexCateList')
		// console.log(result)
		commit('SET_CARDLIST',result)
	}
}
const getters = {
	navList(state){
		return (state.indexData.kingKongModule||{}).kingKongList || []
	},
	iconList(state){
		return state.indexData.policyDescList || []
	},
	floorList(state){
		return state.indexData.categoryModule || []
	}
}
export default {
	state,
	mutations,
	actions,
	getters
}