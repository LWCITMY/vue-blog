import state from "./state";

const mutations = {
  //全局的一些方法
  SET_TOKEN:(state,token)=>{
    state.token = token
  },
  SET_USERNAME:(state,username)=>{
    state.username = username
  }
}
export default mutations
