<template lang="pug">
div.MainFrame
    div(v-show="loginIN == true").authStyle
      div.MainFrameAuth
        div.AuthBack(v-show="b")
          div.titleAuth
            button(@click="loginIN = !loginIN").btnAuthBack ✖
          div.spanTitle
            span Авторизация
          div.inputAuth
            span Логин
            input.inputStyle(v-model="auth.login" :class="{inpStyleERR: validation.dataErr}")
          div.inputAuth
            span Пароль
            input(type="password" v-model="auth.password" :class="{inpStyleERR: validation.dataErr}").inputStyle
          div.spanTitle
            span.spanERR(v-show="validation.dataErr == true") Неправильный пароль или логин
          div.spanTitle
            button.authBtn(@click='authMethod()') Войти
          div.regspanTitle
            button.regBtn(@click='changeMethod()') Регистрация
        div.Reg(v-show="a").AuthBack
          div.titleReg.titleAuth
            button.btnRegBack.btnAuthBack(@click='changeMethod()') ❮
          div.spanTitle2.spanTitle
            span Регистрация
          div.inputReg.inputAuth
            span Имя
            input(type="name" v-model="reg.name").inputStyle
          div.inputReg.inputAuth
            span Фамилия
            input(type="surname" v-model="reg.surname").inputStyle
          div.inputReg.inputAuth
            span Логин
            input(type="username" v-model="reg.login1").inputStyle
          div.inputReg.inputAuth
            span Пароль
            input(type="password1" v-model="reg.password1").inputStyle
          div.spanTitle
            span.spanERR(v-show="validation.dataErr1 == true") Ошибка регистрации
            span.spanOK(v-show="validation.dataOk == true") Регистрация успешна
          div.spanTitle2.spanTitle.buttonReg
            button.RegisBtn.authBtn(@click='regMethod()') Зарегистрироваться
    div.menuGroup1
        div
            button.btnMainLogo(@click="this.$router.push('/')") Sakura
        div.buttonGroup
            button.btnMain Доставка
            button.btnMain О нас
            button.btnMain(@click="this.$router.push('/admin')") Администратор
            div.buttonGroup
                span.btnMain 0
                img(src="@/assets/cart.svg" @click="this.$router.push('/cart')").cartStyle
            button.btnSignUp(@click="loginIN = !loginIN" v-show="authed == false") Войти
            div.lkOutDiv
              span(v-show="authed == true").lkStyle {{profileName}}
              button.lkOut(@click="exitMethod()") Выход

</template>
<script>
import { vShow } from '@vue/runtime-dom';
import {mapState} from "vuex"
export default {
  data(){
    return {
      validation: {
        dataErr: false,
        dataErr1: false,
        dataOk: false,
      },
      auth: {
        login: "",
        password: ""
      },
      loginIN: false,
      reg: {
        name: "",
        surname: "",
        login1: "",
        password1: ""
      },
      a: false,
      b: true
    }
  },
  components: {
  },
  methods: {
    async regMethod(){
      const response = await fetch("auth/registration", {
        method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({
           name: this.reg.name,
           surname: this.reg.surname,
           username: this.reg.login1,
           password: this.reg.password1
      }),        
    })
    if(response.status == 491 || response.status == 492 || response.status == 490){
      this.validation.dataErr1 = true
    }
    else{
          this.validation.dataOk = true
        }
    },
    async authMethod(){
        const response = await fetch("auth/login", {
         method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({
            username: this.auth.login,
            password: this.auth.password
         }),
       })
       if(response.status == 400){
         this.validation.dataErr = true
       }
       else{
       const resJson = await response.json();
          const token = resJson.token    
          const profileName = resJson.profile.profileName
          this.$store.commit('auth/newToken', token)
          this.$store.commit('auth/authExit', true)
          this.$store.commit('auth/updateName', profileName)
          this.loginIN = !this.loginIN
       }
    },
    exitMethod(){
      const token = ""
      const profileName = ""
      this.$store.commit('auth/newToken', token)
      this.$store.commit('auth/authExit', false)
      this.$store.commit('auth/updateName', profileName)
    },
    changeMethod(){
     this.a = !this.a
     this.b = !this.b
    }

  },
  computed: {
    ...mapState({
            token: state => state.auth.token,
            authed: state => state.auth.authed,
            profileName: state => state.auth.profileName
    }),
  },
};
</script>
<style lang="scss" scoped>
.buttonReg{
  margin-bottom: 2vw;
}
.lkOutDiv{
  display: flex;
  flex-direction: column;
  position: relative;
}
.lkOut{
    display: none;
    position: absolute;
    top: 100%;
    left: 1vw;
    font-size: 0.8vw;
    border: none;
    background:#fe785b;
    color: white;
    font-family: 'Inter Regular';
}
.lkStyle{
  font-size: 1vw;
  margin: 0 0 0 1vw;
  font-family: 'Inter Regular';
  color: #fe785b;
  font-weight: 500;
}
.lkOutDiv:hover > .lkOut{
  display: inherit;
}
.inpStyleERR{
  border: 3vw;
  border: red;
  background: rgba(232, 115, 115, 0.28);
  box-shadow:  0px 0px 0.08vw 0.08vw #f46a6a;
}

.spanERR{
  color: red;
  font-size: clamp(15px, 1vw, 20px);
}
.spanOK{
    color: rgb(86, 255, 94);
  font-size: clamp(15px, 1vw, 20px);
}

.regspanTitle{
  display: flex;
  justify-content: center;
  margin-bottom: 2vw;
}
.authBtn{
  font-size: 1.5vw;
  border: none;
  padding: 0.8vw;
  padding-left: 1vw;
  padding-right: 1vw;
  border-radius: 10px;
  background: #fe785b;
  color: white;
}
.regBtn{
  border: none;
  background: none;
  font-family: "Inter Regular";
  font-size: 1.2vw;
}
.regBtn:hover{
  cursor: pointer;
}
.inputStyle{
  font-size: 1.2vw;
  padding: 0.4vw 0  0.4vw;
}
.btnAuthBack{
  border: none;
  font-size: 1.4vw;
  background: transparent;
  margin: 0.5vw 1vw 0 0;
}
.inputAuth{
  display: grid;
  grid-template-columns: 9% 30%;
  justify-content: center;
  gap: 1vw;
  align-items: center;
  font-family: "Inter Regular";
  font-size: 0.9vw;
  text-align: end;
  
}
.spanTitle{
  display: flex;
  justify-content: center;
  font-size: 2vw;
  font-family: "Inter Regular";
}
.titleAuth{
  display: flex;
  justify-content: flex-end;
}
.MainFrameAuth{
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
.AuthBack{
    background: white;
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 50%;
    border-radius: 1vw;
    justify-content: space-between;
  }
.authStyle{
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
  font-size: 2vw;
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
.menuGroup1 {
  display: flex;
  gap: 1vw;
  justify-content: space-around;
  align-items: center;
}
.MainFrame {
  display: flex;
  justify-content: space-between;
  margin: 1vw;
  flex-direction: column;
}
</style>
