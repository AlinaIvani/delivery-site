<template lang="pug">
div.MainFrame
    div.name
        span Ваше имя: {{profileName}}
    div.item
        span Заказано:
    div.items
        div(v-for="(item, index) in arrayObj.orderList" :key="index")
            div.order
                div.name
                    span {{item.name}}
                div.count
                    button.btt(@click="countEdit(item.name, -1)") -
                    span {{item.count}}
                    button.btt(@click="countEdit(item.name, 1)") +
                div.price
                    span {{item.price}} руб.
                div.del
                    button.btt(@click="delItem(item.name)") Удалить
    div.number
        span Номер телефона:
        input.inputStyle(v-model="this.mobilenumber")
    div.address
        span Адрес:
        input.inputStyle(v-model="this.adress")
    div.totalPrice
        span Общая сумма заказа: {{totalPrice}} руб.
    div.info.de
        span Оплата наличными при получении заказа!
    div.info2.de
        span Особенности доставки уточняйте у оператора
    div.mas.de
        span.spanERR(v-show="validation.dataErr == true") Ошибка оформления
        span.spanOK(v-show="validation.dataOk == true") Заказ успешно оформлен
    div.de
        button.bt(@click="postOrder()") Оформить заказ
</template>

<script>
import { mapState } from "vuex";
export default {
    data(){
        return{
            adress: "",
            mobilenumber: "",
        validation: {
            dataErr: false,
            dataOk: false
        }

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
                    items: this.arrayObj.orderList,
                    totalprice: this.totalPrice,
                }),       
              });
        if(response.status == 400){
        this.validation.dataErr = true
    }
        else{
        this.validation.dataOk = true
        }
    },
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

<style>
.spanERR{
  color: red;
  font-size: clamp(15px, 1vw, 20px);
}
.spanOK{
  color: rgb(86, 255, 94);
  font-size: clamp(15px, 1vw, 20px);
}
.inputStyle{
  margin: 5px 10px 5px 10px;
  grid-template-columns: 9% 30%;
  justify-content: center;
  gap: 1vw;
  align-items: center;
  font-family: "Inter Regular";
  font-size: 1vw;
}
.de{
  text-align: center;
}
.bt{
  margin: 10px 10px 10px 10px;
  border: none;
  padding: 0.8vw;
  padding-left: 1vw;
  padding-right: 1vw;
  border-radius: 10px;
  background: #fe785b;
  color: white;
  font-size: clamp(19px, 1.2vw, 98px);
  font-family: "Inter Regular";
  font-style: normal;
  font-weight: 600;
}
.btt{
  margin: 10px 10px 10px 10px;
  text-align: center;
  border: none;
  padding: 0.5vw;
  padding-left: 0.5vw;
  padding-right: 0.5vw;
  border-radius: 10px;
  background: #fe785b;;
  color: white ;
  font-size: clamp(10px, 1.2vw, 98px);
  font-family: "Inter Regular";
  font-style: normal;
  font-weight: 600;
}
.MainFrame{
  font-family: "Inter Regular";
  margin: 1vw;
  font-size: 1.2vw
}
.items{
  display: flex;
  margin: 1vw;
  gap: 1vw;
  align-items: center;
  text-align: center;
}
.order{
  margin: 0px 10px 0px 10px;
  border: solid;
  padding: 0.8vw;
  border-color: #fe785b;
  border-width: 1px;
  padding-left: 1vw;
  padding-right: 1vw;
  border-radius: 10px;
  font-family: "Inter Regular";
  font-size: 1.2vw;
  font-style: normal;

}
</style>
