<template lang="pug">
div.MainFrame
  div(v-show="delItems == true").addStyle
    div.MainFrameItems
      div.delItems
        div.titleAdd
          button(@click="delItems = !delItems").btnAddBack ✖
        div.spanAdd
          span Удалить позицию меню
        div.inputAdd
          span Название
          input.inputStyle(type="name" v-model="item.name")
        div.spanTitle
          span.spanERR1.spanERR(v-show="validation.dataErr1 == true") Данной позиции нет в меню
          span.spanOK1.spanOK(v-show="validation.dataOk1 == true") Успешно
        div.spanDell.spanAdd
          button.sendBtn(@click='delMethod()') Удалить
  div(v-show="addItems == true").addStyle
    div.MainFrameItems
      div.addItems
        div.titleAdd
          button(@click="addItems = !addItems").btnAddBack ✖
        div.spanAdd
          span Добавить позицию меню
        div.inputAdd
          span Название
          input.inputStyle(type="name" v-model="item.name")
        div.inputAdd
          span Количество
          input.inputStyle(type="amount" v-model="item.amount")
        div.inputAdd
          span Вес(граммы)
          input.inputStyle(type="weight" v-model="item.weight")
        div.selectCategor.inputAdd
          span Выберите категорию
          input.inputStyle(type="category" v-model="item.category")
        div.inputAdd
          span Цена
          input.inputStyle(type="price" v-model="item.price")
        div.inputAdd
          span Состав
          input.inputStyle(type="discription" v-model="item.discription")
        div.spanTitle
          span.spanERR(v-show="validation.dataErr == true") Ошибка 
          span.spanOK(v-show="validation.dataOk == true") Успешно
        div.spanAdd 
          button.sendBtn(@click='addMethod()') Сохранить     
  
  div.orders
    div(v-for="(item, index) in responseData" :key="index")
      div.ordere
        div.name
          span Имя заказчика: {{item.username}}
        div.adress
          span Адресс: {{item.adress}}
        div.numb
          span Номер телефона: {{item.mobileNumber}}
        span Заказ:
        div.items 
          div(v-for="(item, index) in item.items" :key="index")
            div.iteme
              div.name
                span {{item.name}}
              div.count
                span Количество: {{item.count}}
              div.price
                span Цена: {{item.price}} руб.
        div.prices
          span Общая сумма заказа: {{item.totalprice}} руб.

  div.btn
    div.add
      button.addBtn(@click="addItems = !addItems") Добавить новую позицию меню
    div.del
      button.delBtn.addBtn(@click="delItems = !delItems") Удалить позицию меню


</template>
<script>
import {mapState} from "vuex"
export default {
    data() {
    return {
    a: false,
    addItems: false,
    delItems: false,
    selected: "",
    validation: {
        dataErr: false,
        dataOk: false,
        dataErr1: false,
        dataOk1: false,
      },
    item: {
        name: "",
        amount: "",
        weight: "",
        category: "",
        price: "",
        discription: "",
      },
      responseData: "",
      _id: ""

    }
},
methods: {
    async getOrders(){
      try{
          const response = await fetch("auth/getorders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
          });
          const resJson = await response.json()
          this.responseData = resJson
      }catch(e){
          alert(e)
      }
      },
    async addMethod(){
      const response = await fetch("auth/addItems", {
        method: "POST",
         headers: {"Content-Type": "application/json",
                  "Authorization": `Bearer ${this.token}`
                  },
         body: JSON.stringify({
           name: this.item.name,
           amount: this.item.amount,
           weight: this.item.weight,
           category: this.item.category,
           price: this.item.price,
           discription: this.item.discription,
      }),        
    })
    if(response.status == 400){
      this.validation.dataErr = true
    }
    else{
      this.validation.dataOk = true
        }
    },
    async delMethod(){
      const response = await fetch("auth/delItems", {
        method: "POST",
         headers: {"Content-Type": "application/json",
                  "Authorization": `Bearer ${this.token}`
                  },
         body: JSON.stringify({
           name: this.item.name,
      }),        
    })
    if(response.status == 400 || response.status == 404){
      this.validation.dataErr1 = true
    }
    else{
      this.validation.dataOk1 = true
        }
    },
},
mounted() {
      this.getOrders()
      },

computed: {
    ...mapState({
            token: state => state.auth.token
    })
}
}
</script>
<style>
.btn{
  text-align: center;
}
.addBtn{
  margin: 10px 10px 10px 10px;
  text-align: center;
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
.iteme{
  margin: 0px 10px 0px 10px;
  border: none;
  padding: 0.8vw;
  padding-left: 1vw;
  padding-right: 1vw;
  border-radius: 10px;
  background: #fe785b;
  color: white;
  font-family: "Inter Regular";
  font-style: normal;
  font-weight: 600;
}
.items{
  display: flex;
  margin: 1vw;
  gap: 1vw;
  align-items: center;
  text-align: center;
}
.ordere{
  border: solid;
  padding: 0.8vw;
  margin: 10px 10px 10px 10px;
  border-width: 0.5px;
  padding-left: 1vw;
  padding-right: 1vw;
  border-radius: 10px;
  border-color: #fe785b;
}
.orders{
  justify-content: center;
  font-family: "Inter Regular";
  font-size: 1vw;
}
.spanTitle{
  display: flex;
  justify-content: center;
  font-size: 2vw;
  font-family: "Inter Regular";
}
.spanERR{
  color: red;
  font-size: clamp(15px, 1vw, 20px);
}
.spanOK{
    color: rgb(86, 255, 94);
  font-size: clamp(15px, 1vw, 20px);
}
.MainFrame {
  font-family: "Inter Regular";
  display: flex;
  justify-content: space-between;
  margin: 1vw;
  flex-direction: column;
}
.addStyle{
    position: fixed; /* фиксированное положение */
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.5); /* цвет фона */
    z-index: 1050;
    -webkit-transition: opacity 200ms ease-in; 
    -moz-transition: opacity 200ms ease-in;
    transition: opacity 200ms ease-in; /* анимация перехода */
    pointer-events: none; /* элемент невидим для событий мыши */
    margin: 0;
    padding: 0;
    opacity: 1; /* делаем окно видимым */
	  pointer-events: auto; /* элемент видим для событий мыши */
    overflow-y: auto;
}
.MainFrameItems{
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    outline: 0;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
}
.addItems{
    background: white;
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 70%;
    border-radius: 1vw;
    justify-content: space-between;
  }
.delItems{
    background: white;
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 50%;
    border-radius: 1vw;
    justify-content: space-between;
  }
.titleAdd{
  display: flex;
  justify-content: flex-end;
}
.btnAddBack{
  border: none;
  font-size: 1.4vw;
  background: transparent;
  margin: 0.5vw 1vw 0 0;
}
.spanAdd{
  display: flex;
  justify-content: center;
  font-size: 2vw;
  font-family: "Inter Regular";
}
.inputAdd{
  display: grid;
  grid-template-columns: 9% 30%;
  justify-content: center;
  gap: 1vw;
  align-items: center;
  font-family: "Inter Regular";
  font-size: 0.9vw;
}
.inputStyle{
  font-size: 1.2vw;
  padding: 0.4vw 0  0.4vw;
}
.sendBtn{
  margin: 20px 0px 20px 0px;
  font-size: 1.5vw;
  border: none;
  padding: 0.8vw;
  padding-left: 1vw;
  padding-right: 1vw;
  border-radius: 10px;
  background: #fe785b;
  color: white;
}
</style>