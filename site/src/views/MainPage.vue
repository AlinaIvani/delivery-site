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
div.MainFrame
  div
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Роллы'")
        span {{item.name}}
        span {{item.amount}}
        span {{item.weight}}
        span {{item.price}}
        span {{item.discription}}
  div
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Теплые роллы'")
        span {{item.name}}
        span {{item.amount}}
        span {{item.weight}}
        span {{item.price}}
        span {{item.discription}}
  div
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Суши'")
        span {{item.name}}
        span {{item.amount}}
        span {{item.weight}}
        span {{item.price}}
        span {{item.discription}}
  div
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Сашими'")
        span {{item.name}}
        span {{item.amount}}
        span {{item.weight}}
        span {{item.price}}
        span {{item.discription}}
  div
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Салаты'")
        span {{item.name}}
        span {{item.amount}}
        span {{item.weight}}
        span {{item.price}}
        span {{item.discription}}
  div
    div(v-for="(item, index) in responseData" :key="index")
      div(v-if="item.category == 'Десерты'")
        span {{item.name}}
        span {{item.amount}}
        span {{item.weight}}
        span {{item.price}}
        span {{item.discription}}
</template>
<script>
export default {
  data() {
    return {
      item: {
        name: "",
        amount: "",
        weight: "",
        category: "",
        price: "",
        discription: "",
      },
      responseData: "",
    };
  },
  methods: {
    async getItems() {
      try {
        const response = await fetch("auth/getitems", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resJson = await response.json();
        this.responseData = resJson;
      } catch (e) {
        alert(e);
      }
    },
  },
  mounted() {
    this.getItems()
  }
};
</script>

<style lang="scss" scoped>
.line {
  margin: 20px 0px 20px 0px;
  border-bottom: 1px solid #fe785b;
}
.menuGroup {
  display: flex;
  gap: 1vw;
  justify-content: center;
  align-items: center;

  
}
.menuGroup1 {
  border: none;
  background: none;
  color: #000;
  font-size: clamp(18px, 1.2vw, 98px);
  font-family: "Inter Regular";
  font-style: normal;
  font-weight: 600;
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
}
</style>
