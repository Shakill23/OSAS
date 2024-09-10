<template>
    <div id="box">
        <div v-if="activeUser" v-bind:key="activeUser.userID" id="user">
            <div>
                <img :src="activeUser.profileURL" :alt="activeUser.username" class="img-fluid rounded-5 shadow" height="300" width="300">
            </div>
            <div id="userCol" class="container-fluid fw-bold">
                <div class="text-start">
                    <span id="text">User name:</span>
                    {{ activeUser.username }}
                </div>
                <div class="text-start">
                    <span id="text">Email address:</span>
                    {{ activeUser.emailAdd }}
                </div>
            </div>
        </div>
        <div v-else>
            <p>No active user found.</p>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        activeUser() {
            let users = JSON.parse(localStorage.getItem("activeUser")) || null;
            return users ? users[0] : null;
        }
    }
}
</script>

<style scoped>
    #box{
        display: flex;
        justify-content: center;
    }

    #user{
        display: flex;
        flex-direction: row;
    }

    #userCol{
        display: flex;
        flex-direction: column;
        justify-content: center;
        
    }

    #overflow{
        max-width: 390px;
        overflow-x: scroll;
    }

    #text{

        text-align: justify;
    }
</style>