<template lang="pug">
div.MainFrame
    div(v-show="addItems == true").addStyle
        div.MainFrameItems
            div.addItems
                div.titleAdd
                    button(@click="addItems = !addItems").btnAddBack ✖
                div.spanAdd
                    span Добавить заказ
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
                    span.spanOK(v-show="validation.dataOk == true") успешно
                div.spanAdd 
                    button.sendBtn(@click='addMethod()') Сохранить     
    div.add
        button.addBtn(@click="addItems = !addItems") Добавить новую позицию меню

  
</template>
<script>
export default {
    data() {
    return {
    a: false,
    addItems: false,
    selected: "",
    validation: {
        dataErr: false,
        dataOk: false,
      },
    item: {
        name: "",
        amount: "",
        weight: "",
        category: "",
        price: "",
        discription: "",
      },
    }

},
methods: {
    async addMethod(){
      const response = await fetch("auth/addItems", {
        method: "POST",
         headers: {"Content-Type": "application/json"},
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
}
}
</script>
<style>
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
  text-align: end;
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