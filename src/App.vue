<template>
    <v-app id="app">
        <v-system-bar color="red"
                      v-if="(this.$store.state.authError && myPath === 'Login')"
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
                    ></v-img>
                </router-link>
                <v-toolbar-title class="d-none d-lg-block">
                    <router-link
                            :to="{ name: 'Books'}"
                            tag="span"
                            class="pointer pl-8"
                    >
                        Библиотека
                    </router-link>
                </v-toolbar-title>
                <span>
                <v-tabs
                        class="d-flex d-sm-none"
                        background-color="primary"
                ><v-tabs-slider></v-tabs-slider>
                    <v-tab
                            v-for="m in menu"
                            :key="m.name"
                            :to="{ name: m.name }"
                    >
                        <v-img
                                v-if="m.logo"
                                src="@/assets/logo.png"
                                max-height="36"
                                max-width="36"
                                contain
                        ></v-img>
                        <v-icon>{{ m.icon }}</v-icon>
                    </v-tab>
                </v-tabs></span>
                <v-spacer></v-spacer>
                <span>
                <v-tabs
                        class="d-none d-sm-block"
                        background-color="primary"
                        right
                ><v-tabs-slider></v-tabs-slider>
                    <v-tab
                            v-for="m in menu"
                            :key="m.name"
                            :to="{ name: m.name}"
                    >{{ m.title }}</v-tab>
                </v-tabs>
                </span>

                <v-toolbar-items>
                    <v-btn
                            text
                            class="d-none d-sm-block"
                            @click="openEdit = true"
                    >{{ user.username }}
                    </v-btn>
                    <v-btn
                            icon
                            class="d-flex d-sm-none"
                            @click="openEdit = true"
                    >
                        <v-icon>mdi-account</v-icon>
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
        <back-to-top
                v-if="isLoggedIn"
        ></back-to-top>
        <self-user-edit-form
                :dialog="openEdit"
                :user="user"
                @closed="closedDialog"
        ></self-user-edit-form>

    </v-app>
</template>
<script>
    import BackToTop from "@/components/utils/BackToTop";
    import SelfUserEditForm from "@/components/utils/SelfUserEditForm";

    export default {
        components: {
            BackToTop,
            SelfUserEditForm
        },
        data () {
            return {
                openEdit: false,
            }
        },
        computed: {
            myPath: function () {
                return this.$route.name
            },
            isLoggedIn() {
                return this.$store.getters.isLoggedIn
            },
            user: {
                get() {
                    return this.$store.getters.user
                },
            },
            menu: function () {
                let menu = [
                    {name: 'Books', title: "Книги", logo: "../assets/logo.png"},
                    {name: 'Donate', title: "Донат", icon: "mdi-currency-usd"},

                ]
                if (this.user.is_superuser) {
                    menu.push({name: 'Admin', title: "Админ", icon: "mdi-tune"})
                }
                return menu
            }
        },
        methods: {
            closedDialog(value) {
                this.openEdit = value
                this.$store.dispatch('getMe')
            },
            logout() {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            },
            setUser() {
                this.$store.dispatch('getMe')
            },
        },
        mounted() {
            this.setUser()
        },

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

    #app {
        background: linear-gradient(to right, rgb(245, 245, 245) 0%, rgb(209, 209, 209) 100%);
    }

    .cardColor {
        background-color: rgba(255, 255, 255, 0.85) !important;
        border-color: white !important;
    }
</style>
