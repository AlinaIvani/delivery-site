import store from "."

export const orderModule = {
    state: () => ({
      orderList: [
         
      ]
    }),
    mutations: {
        addOrderList(state, exit){
            state.orderList = exit
        },
    },
    getters: {
    },
    namespaced: true
}