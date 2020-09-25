<template>
    <v-main
            fluid
    >
        <router-view></router-view>
    </v-main>
</template>

<script>

    export default {
        name: "Books",
    }
</script>

<style scoped>
    .open-long {
        cursor: pointer;
        text-decoration: underline;
    }

    .poster {
        border-radius: 6px;
    }

    .info-link {
        text-decoration: none;
    }
</style>