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
                <router-link
                        :to="{ name: 'Books'}"
                >
                <v-img
                        class="d-none d-sm-block logo"
                        src="@/assets/logo.png"
                        max-height="36"
                        max-width="36"
                        contain
                ></v-img></router-link>
                <v-toolbar-title class="d-none d-lg-block">
                    <router-link
                            :to="{ name: 'Books'}"
                            tag="span"
                            class="pointer pl-8"
                    >
                        Лепробиблиотека
                    </router-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <span>
                <v-tabs
                        class="d-none d-sm-block"
                        background-color="primary"
                        right
                >
                    <v-tab
                            :to="{ name: 'Books'}"
                    >Книги</v-tab>
                    <v-tab
                            :to="{ name: 'Donate'}"
                    >Донат</v-tab>
                </v-tabs></span>
                <v-tabs
                        class="d-flex d-sm-none"
                        centered

                >
                    <v-tab
                            :to="{ name: 'Books'}"

                    ><v-img
                            src="@/assets/logo.png"
                            max-height="36"
                            max-width="36"
                            contain
                    ></v-img></v-tab>
                    <v-tab
                            :to="{ name: 'Donate'}"
                    ><v-icon>mdi-currency-usd</v-icon></v-tab>
                </v-tabs>
                <v-toolbar-items>


                    <v-btn
                            text
                            class="disable-login-btn"
                    >{{ username }}
                    </v-btn>

                    <v-btn
                            icon
                            @click="logout"
                    >
                        <v-icon>mdi-export</v-icon>
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
    .logo {
        cursor: pointer;
        position: relative;
        left: 25px;
        bottom: 2px;
    }

</style>
