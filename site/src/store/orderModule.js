
export const orderModule = {
    state: () => ({
        arrayObj: {
            orderList: [
    
            ]
          },
          totalPrice: 0,
    }),
    mutations: {
        addOrderList(state, exit){
            state.arrayObj.orderList = exit
        },
        plusPrice(state,exit){
            state.totalPrice += exit
        },
    },
    getters: {
    },
    namespaced: true
}