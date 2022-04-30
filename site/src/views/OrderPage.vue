<template lang="pug">
div.MainFrame
    div.name
        span Ваше имя: {{profileName}}
    div.item
        span Заказано
    div(v-for="(item, index) in orderList" :key="index")
        span {{item}}
    div.number
        span Номер телефона
        input.inputStyle
    div.address
        span Адрес
        input.inputStyle
    div.de
</template>

<script>
import {mapState} from "vuex"
export default {

computed: {
    ...mapState({
            profileName: state => state.auth.profileName,
            orderList: state => state.order.orderList
    })
}
}
</script>

<style>

</style>