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
                            :to="{ name: 'Books'}"
                            tag="span"
                            class="pointer pl-8"
                    >
                        Лепробиблиотека
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
                            class="disable-login-btn"
                    >{{ username }}
                    </v-btn>
                </v-toolbar-items>
                <v-toolbar-items>
                    <v-btn
                            icon
                            @click="logout"
                    ><v-icon>mdi-export</v-icon>
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
            username: {
                get() {
                    return this.$store.getters.user
                },
            },
        },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            },
            setUser() {
                if (this.username === '') {
                    this.$store.dispatch('getMe')
                }
            }
        },
        mounted() {
            this.setUser()
        }
    }
</script>
<style>
    .pointer {
        cursor: pointer;
    }

    .disable-login-btn {
        pointer-events: none;
    }

</style>
