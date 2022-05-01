<template lang="pug">
div.MainFrame
    div.name
        span Ваше имя: {{profileName}}
    div.item
        span Заказано
    div(v-for="(item, index) in arrayObj.orderList" :key="index")
        span {{item.name}}
        button(@click="countEdit(item.name, -1)") -
        span {{item.count}}
        button(@click="countEdit(item.name, 1)") +
        span {{item.price}}
        button(@click="delItem(item.name)") Удалить
    div.number
        span Номер телефона
        input.inputStyle(v-model="this.mobilenumber")
    div.address
        span Адрес
        input.inputStyle(v-model="this.adress")
    div.de
    button(@click="postOrder()") Заказать
</template>

<script>
import { mapState } from "vuex";
export default {
    data(){
        return{
            adress: "",
            mobilenumber: ""
        }
    },
  methods: {
      countEdit(itemName, Number){
        const ArraySize = this.arrayObj.orderList.length 
        for(let i = 0; i < ArraySize; i++){
            if(this.arrayObj.orderList[i].name == itemName){
                if(this.arrayObj.orderList[i].count == 1 && Number == -1){
                    this.$store.commit('order/plusPrice', this.arrayObj.orderList[i].price*Number)
                    this.arrayObj.orderList.splice(i,1)
                    continue
                }
                this.arrayObj.orderList[i].price = this.arrayObj.orderList[i].price + (this.arrayObj.orderList[i].price/this.arrayObj.orderList[i].count)*Number
                this.arrayObj.orderList[i].count = this.arrayObj.orderList[i].count + Number
                let price = (this.arrayObj.orderList[i].price/this.arrayObj.orderList[i].count)*Number
                this.$store.commit('order/plusPrice', price)
            }
        }
        this.$store.commit('order/addOrderList', this.arrayObj.orderList)
      },
      delItem(itemName){
        const ArraySize = this.arrayObj.orderList.length
        const delFlag = -1
        for(let i = 0; i < ArraySize; i++){
            if(this.arrayObj.orderList[i].name == itemName){
                this.$store.commit('order/plusPrice', this.arrayObj.orderList[i].price*delFlag)
                this.arrayObj.orderList.splice(i,1)
                break
            }
        }
        this.$store.commit('order/addOrderList', this.arrayObj.orderList)
      },
      async postOrder(){
          try{
              const response = await fetch("auth/addorders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.token}`
                },
                body: JSON.stringify({
                    username: this.profileName,
                    adress: this.adress,
                    mobileNumber: this.mobilenumber,
                    items: this.arrayObj.orderList
                }),        
              });
              const resJson = await response.json()
              alert(resJson.message)
          }catch(e){
              alert(e)
          }
        }
  },
  computed: {
    ...mapState({
      profileName: (state) => state.auth.profileName,
      arrayObj: (state) => state.order.arrayObj,
      totalPrice: (state) => state.order.totalPrice,
      token: state => state.auth.token,
    }),
  },
};
</script>

<style></style>
