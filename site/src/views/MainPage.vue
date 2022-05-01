<template lang="pug">
div.MainFrame
    div.line
    div.menuGroup
        button.btnMenu Роллы
        button.btnMenu Теплые роллы
        button.btnMenu Суши
        button.btnMenu Сашими
        button.btnMenu Салаты
        button.btnMenu Десерты
        button.btnMenu Добавки
    div.line
div.MainFrame1
  span.name Роллы
    div.line1
  div.menu
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Роллы'")
        img(:src="require(`@/assets/${item._id}.jpg`)" @click="info = !info")
        div.name
          span {{item.name}}
          span {{item.price}} руб.
        button.add(@click="itemsAddCart(item.name, item.price)") В корзину

  span.name Теплые роллы
    div.line1
  div.menu
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Теплые роллы'")
        img(src="@/assets/tray.jpg" @click="info = !info")
        div.name
          span {{item.name}}
          span {{item.price}} руб.
        button.add(@click="itemsAddCart(item.name, item.price)") В корзину

  span.name Суши
    div.line1
  div.menu
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Суши'")
        img(src="@/assets/tray.jpg" @click="info = !info")
        div.name
          span {{item.name}}
          span {{item.price}} руб.
        button.add(@click="itemsAddCart(item.name, item.price)") В корзину 

  span.name Сашими
    div.line1
  div.menu
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Сашими'")
        img(src="@/assets/tray.jpg" @click="info = !info")
        div.name
          span {{item.name}}
          span {{item.price}} руб.
        button.add(@click="itemsAddCart(item.name, item.price)") В корзину

  span.name Салаты
    div.line1
  div.menu
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Салаты'")
          img(src="@/assets/tray.jpg" @click="info = !info")
          div.name
            span {{item.name}}
            span {{item.price}} руб.
          button.add(@click="itemsAddCart(item.name, item.price)") В корзину

  span.name Десерты
    div.line1
  div.menu
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Десерты'")
        img(src="@/assets/tray.jpg" @click="info = !info")
        div.name
          span {{item.name}}
          span {{item.price}} руб.
        button.add(@click="itemsAddCart(item.name, item.price)") В корзину

  span.name Добавки
    div.line1
  div.menu
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Добавки'")
        img(src="@/assets/tray.jpg" @click="info = !info")
        div.name
          span {{item.name}}
          span {{item.price}} руб.
        button.add(@click="itemsAddCart(item.name, item.price)") В корзину
</template>

<script>
import {mapState} from "vuex"
export default {
  data(){
    return {
      item: {
        name: "",
        amount: "",
        category: "",
        weight: "",
        price: "",
        discription: "",

      },
      responseData: "",
    }
  },
  methods: {
     async itemsAddCart(itema, itemprice){
      const ArraySize = this.arrayObj.orderList.length
      let perem = 0
      for(let i = 0; i < ArraySize; i++){
        if(this.arrayObj.orderList[i].name == itema){
          this.arrayObj.orderList[i].count++
          this.arrayObj.orderList[i].price = this.arrayObj.orderList[i].price + itemprice
          this.$store.commit('order/plusPrice', itemprice)
          perem = perem+1
          }
        }
      if(perem < 1){
          this.arrayObj.orderList.push({name: itema, count: 1, price: itemprice})
          this.$store.commit('order/plusPrice', itemprice)
      }
      this.$store.commit('order/addOrderList', this.arrayObj.orderList)
      },
      async getItems(){
          try{
              const response = await fetch("auth/getitems", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
              });
              const resJson = await response.json()
              this.responseData = resJson
          }catch(e){
              alert(e)
          }
          },
      getImgUrl(itemID){
        console.log(itemID)
          const image = require.context('@/assets/', false, /\.jpg$/)
          const url = `../assets/${itemID}.jpg`
          
      }
      },
      mounted() {
      this.getItems()
      },
      computed: {
    ...mapState({
            arrayObj: state => state.order.arrayObj,
            totalPrice: state => state.order.totalPrice
    })
  },
}
</script>

<style lang="scss" scoped>
.line {
  margin: 20px 0px 20px 0px;
  border-bottom: 1px solid #fe785b;
}
.menu{
  display: flex;
  flex-direction: row;
}
.line1 {
  margin: 10px 0px 10px 0px;
  border-bottom: 1px solid #fe785b;
}
.MainFrame{
  display: flex;
  justify-content: space-between;
  margin: 1vw;
  flex-direction: column
}
.MainFrame1{
  display: flex;
  justify-content: space-between;
  margin: 1vw;
  flex-direction: column;
  gap: 1vw;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.menuGroup {
  gap: 1vw;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.btnMenu {
  margin: 0px 1vw 0px 1vw;
  border: none;
  background: none;
  color: #000;
  font-size: clamp(18px, 1.2vw, 98px);
  font-family: "Inter Regular";
  font-style: normal;
  font-weight: 600;
  text-align: center;
}
.name{
  margin: 0px 1vw 0px 1vw;
  border: none;
  background: none;
  color: #000;
  font-size: clamp(18px, 1.2vw, 98px);
  font-family: "Inter Regular";
  font-style: normal;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  margin: 1vw;
  flex-direction: column;
}
.add{
  margin: 0px 10px 0px 10px;
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
.add:focus{
  transform: translateY(3px);
}
.MainFrameInfo{
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
.infoStyle{
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
    overflow-y: auto; /* добавляем прокрутку по y, когда элемент не помещается на страницу */
}
.info{
    background: white;
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 50%;
    border-radius: 1vw;
    justify-content: space-between;
  }
.btnInfBack{
  border: none;
  font-size: 1.4vw;
  background: transparent;
  margin: 0.5vw 1vw 0 0;
}
.titleInfo{
  display: flex;
  justify-content: flex-end;
}
.nameTitle{
  display: flex;
  justify-content: center;
  font-size: 1.8vw;
  font-family: "Inter Regular";
}
.img{
  margin: 20px 0px 10px 20px;
  display: flex;
  justify-content: center;
}
.Discription{
  margin: 20px 0px 10px 20px;
  text-align: center;
  justify-content: center;
  font-size: 1.3vw;
  font-family: "Inter Regular";
}

</style>