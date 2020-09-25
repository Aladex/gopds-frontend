<template>
    <v-app id="app">
        <v-system-bar color="red"
                      v-if="(this.$store.state.authError && myPath === 'Login')"
        >
            <span><b>Неправильный логин или пароль</b></span>
        </v-system-bar>
        <v-card
                color="grey lighten-4"
                flat
                height="50px"
                tile
                v-if="isLoggedIn"
        >
            <v-app-bar
                    color="primary"
                    dark
                    fixed
                    short
            >
                <router-link
                        :to="{ name: 'Books.BooksView'}"
                >
                    <v-img
                            class="d-none d-sm-block logo"
                            contain
                            max-height="36"
                            max-width="36"
                            src="@/assets/logo.png"
                    ></v-img>
                </router-link>
                <v-toolbar-title class="d-none d-lg-block">
                    <router-link
                            :to="{ name: 'Books.BooksView'}"
                            class="pointer pl-8"
                            tag="span"
                    >
                        Библиотека
                    </router-link>
                </v-toolbar-title>
                <span>
                <v-tabs
                        background-color="primary"
                        class="d-flex d-sm-none"
                ><v-tabs-slider></v-tabs-slider>
                    <v-tab
                            :key="m.name"
                            :to="{ name: m.name }"
                            v-for="m in menu"
                    >
                        <v-img
                                contain
                                max-height="36"
                                max-width="36"
                                src="@/assets/logo.png"
                                v-if="m.logo"
                        ></v-img>
                        <v-icon>{{ m.icon }}</v-icon>
                    </v-tab>
                </v-tabs></span>
                <v-spacer></v-spacer>
                <span>
                <v-tabs
                        background-color="primary"
                        class="d-none d-sm-block"
                        right
                ><v-tabs-slider></v-tabs-slider>
                    <v-tab
                            :key="m.name"
                            :to="{ name: m.name}"
                            v-for="m in menu"
                    >{{ m.title }}</v-tab>
                </v-tabs>
                </span>

                <v-toolbar-items>
                    <v-btn
                            @click="openEdit = true"
                            class="d-none d-sm-block"
                            text
                    >{{ user.username }}
                    </v-btn>
                    <v-btn
                            @click="openEdit = true"
                            class="d-flex d-sm-none"
                            icon
                    >
                        <v-icon>mdi-account</v-icon>
                    </v-btn>

                    <v-btn
                            @click="logout"
                            icon
                    >
                        <v-icon>mdi-export</v-icon>
                    </v-btn>
                </v-toolbar-items>


            </v-app-bar>
        </v-card>

        <v-main>

            <router-view></router-view>
        </v-main>
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
        data() {
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
                    {name: 'Books.BooksView', title: "Книги", logo: "../assets/logo.png"},
                    {name: 'Donate', title: "Донат", icon: "mdi-pirate"},

                ];
                if (this.user.is_superuser) {
                    menu.push({name: 'Admin', title: "Админ", icon: "mdi-tune"})
                }
                return menu
            }
        },
        methods: {
            closedDialog(value) {
                this.openEdit = value;
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
            if (this.isLoggedIn) {
                this.setUser()
            }
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
