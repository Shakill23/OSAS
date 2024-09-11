<template>
    <div v-for="x of $store.state.user" v-bind:key="x.userID">
        <img :src="x.profileURL" :alt="x.username">
        <h1>{{ x.username }}</h1>
        <h1>{{ x.emailAdd }}</h1>
        <h1>{{ x.userRole }}</h1>
    </div>
</template>
<script>
export default {
    methods : {
        getUser(id){
          this.$store.dispatch('getUser', id)
        }
    }
}
</script>
<style lang="">
    
</style>