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
    span {{item.name}}

    
        
</template>
<script>
export default {
  data(){
    return {
      item: {
        name: "",
        amount: "",
        weight: "",
        category: "",
        price: "",
        discription: "",
      }
    }
  },
  methods: {
      async getItems(){
          try{
              const response = await fetch("auth/getitem", {
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
          }
      }

  }
 


      

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