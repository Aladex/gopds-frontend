<template>
    <v-app>
        <v-system-bar color="red"
                      v-if="this.$store.state.authError"
        >
            <span><b>Неправильный логин или пароль</b></span>
        </v-system-bar>
        <v-card
                v-if="isLoggedIn"
                color="grey lighten-4"
                flat
                tile
                height="50px"
        >
            <v-app-bar
                    color="primary"
                    short
                    dark
                    fixed
            >
                <v-toolbar-title class="d-none d-sm-flex">
                    <router-link
                            :to="{ name: 'page', params: { page: 1 }}"
                            tag="span"
                            class="pointer pl-8"
                    >
                        Моя библиотека
                    </router-link>
                </v-toolbar-title>
                <v-btn icon
                       :to="{ name: 'page', params: { page: 1 }}"
                       class="d-flex d-sm-none"
                >
                    <v-icon>mdi-home</v-icon>
                </v-btn>

                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                            text
                            @click="logout"
                    >Выйти
                    </v-btn>
                </v-toolbar-items>


            </v-app-bar>
        </v-card>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>
<script>
    export default {

        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn
            },
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            },
        }
    }
</script>
<style>
    .pointer {
        cursor: pointer;
    }

    .search-btn {
        position: relative;
        top: 12px;
    }
</style>
