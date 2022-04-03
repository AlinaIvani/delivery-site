<template lang="pug">
div.menuGroup1 
div.MainFrame
button.btnMainLogo Sakura
button.btnMain Доставка
button.btnMain О нас
button.btnMain Акции
button.btnSignUp Войти
.line
div.menuGroup2
button.btnMenu Роллы
button.btnMenu Суши
button.btnMenu Наборы
button.btnMenu WOK
button.btnMenu Салаты
button.btnMenu Десерты
button.btnMenu Добавки
.line

</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.line{
margin: 20px 0px 20px 0px;
border-bottom: 1px solid #FE785B;  
}
.btnMainLogo{
border: none;
background: none;
color: #FE785B;
font-size: 27px;
font-family: 'Inter Regular';
font-style: normal;
font-weight: 600;
}
.btnMain{
margin: 0px 17px 0px 17px;
border: none;
background: none;
color: #000000;
font-size: 27px;
font-family: 'Inter Regular';
font-style: normal;
font-weight: 600;
}
.btnSignUp{
margin: 0px 17px 0px 17px;
border: none;
padding: 0.7vw;
padding-left: 1vw;
padding-right: 1vw;
border-radius: 10px;
background: #FE785B;
color: white;
font-size: 27px;
font-family: 'Inter Regular';
font-style: normal;
font-weight: 600;
}
.btnMenu{
margin: 0px 24px 0px 24px;
border: none;
background: none;
color: #000;
font-size: 30px;
font-family: 'Inter Regular';
font-style: normal;
font-weight: 600;
}
.menuGroup1{
display: flex;
gap: 1vw
}
.menuGroup2{
display: flex;
gap: 1vw
}
.MainFrame{
display: flex;
justify-content: space-between;
margin: 1vw;
}
</style>