<template lang="pug">
div.MainFrame 
    div.menuGroup1
        div
            button.btnMainLogo Sakura
        div.buttonGroup
            button.btnMain Доставка
            button.btnMain О нас
            button.btnMain Акции
            div.buttonGroup
                span.btnMain 0
                img(src="@/assets/cart.svg").cartStyle
            button.btnSignUp Войти
    div.line
    div.menuGroup2
        button.btnMenu Роллы
        button.btnMenu Суши
        button.btnMenu Наборы
        button.btnMenu WOK
        button.btnMenu Салаты
        button.btnMenu Десерты
        button.btnMenu Добавки
    div.line
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.cartStyle{
    width: clamp(38px, 2vw, 98px);
}
.buttonGroup{
        display: flex;
    align-items: center;
}
.line {
  margin: 20px 0px 20px 0px;
  border-bottom: 1px solid #fe785b;
}
.btnMainLogo {
  border: none;
  background: none;
  color: #fe785b;
  font-size: 27px;
  font-family: "Inter Regular";
  font-style: normal;
  font-weight: 600;
}
.btnMain {
  margin: 0px 17px 0px 17px;
  border: none;
  background: none;
  color: #000000;
  font-size: clamp(14px, 1vw, 98px);
  font-family: "Inter Regular";
  font-style: normal;
  font-weight: 600;
}
.btnSignUp {
  margin: 0px 17px 0px 17px;
  border: none;
  padding: 0.8vw;
  padding-left: 1vw;
  padding-right: 1vw;
  border-radius: 10px;
  background: #fe785b;
  color: white;
  font-size: clamp(14px, 1vw, 98px);
  font-family: "Inter Regular";
  font-style: normal;
  font-weight: 600;
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
.menuGroup1 {
  display: flex;
  gap: 1vw;
  justify-content: space-around;
  align-items: center;
}
.menuGroup2 {
  display: flex;
  gap: 1vw;
  justify-content: center;
  align-items: center;
}
.MainFrame {
  display: flex;
  justify-content: space-between;
  margin: 1vw;
  flex-direction: column;
}
</style>
