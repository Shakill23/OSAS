<template>
    <div class="profile-container">
        <div v-for="user in getLoggedUser()" :key="user.id" class="profile-card">
            <div class="profile-image">
                <img :src="user.userImg" :alt="user.username" class="img-fluid profile-pic">
            </div>
            <div class="profile-details">
                <div class="detail-item">
                    <span class="detail-label">Username:</span>
                    <span>{{ user.username }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email address:</span>
                    <span>{{ user.userEmail }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        getLoggedUser() {
            let users = JSON.parse(localStorage.getItem("activeUser")) || [];
            return users;
        }
    },
    mounted() {
        this.getLoggedUser();
    }
}
</script>
<style scoped>
/* Updated styling for a cleaner look */
.profile-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease;
}

.profile-card:hover {
    transform: translateY(-5px);
}

.profile-image {
    margin-right: 20px;
}

.profile-pic {
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    height: 150px;
    width: 150px;
}

.profile-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-weight: bold;
    color: #343a40;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 10px;
}

.detail-label {
    font-weight: 600;
    color: #495057;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.profile-card {
    animation: fadeIn 0.5s ease-in-out;
}
</style>
