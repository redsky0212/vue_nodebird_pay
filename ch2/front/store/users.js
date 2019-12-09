export const state = () => ({
  me: null,
  followerList: [
    {nickname:'제로초', email:'zerocho@gmail.com'},
    {nickname:'네로', email:'nero@gmail.com'},
    {nickname:'히어로', email:'hero@gmail.com'},
    {nickname:'레드스카이', email:'redsky@gmail.com'},
  ],
  followingList: [
    {nickname:'제로초2', email:'zerocho@gmail.com'},
    {nickname:'네로2', email:'nero@gmail.com'},
    {nickname:'히어로2', email:'hero@gmail.com'},
    {nickname:'레드스카이2', email:'redsky@gmail.com'},
  ],
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
  removeFollow(state, payload){
    let list = null;
    if( payload.type === 'following' ){
      list = state.followingList;
    }else{
      list = state.followerList;
    }
    const index = list.findIndex(v => v.nickname === payload.nickname);
    list.splice(index, 1);
  }
};

export const actions = {
  signUp({ commit, state }, payload) {
    // 서버에 회원가입 요청을 보내는 부분
    commit('setMe', payload);
  },
  logIn({ commit }, payload) {
    commit('setMe', payload);
  },
  logOut({ commit }, payload) {
    commit('setMe', null);
  },
  changeNickname({ commit }, payload) {
    commit('changeNickname', payload);
  },
  removeFollow({commit}, payload){
    commit('removeFollow', payload);
  }
};