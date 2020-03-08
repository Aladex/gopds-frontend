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
                        Новые книги
                    </router-link>
                </v-toolbar-title>
                <v-btn icon
                       :to="{ name: 'page', params: { page: 1 }}"
                       class="d-flex d-sm-none"
                >
                    <v-icon>mdi-home</v-icon>
                </v-btn>

                <v-spacer></v-spacer>
                <v-spacer></v-spacer>

                <v-toolbar-items>
                    <v-btn
                            text
                            @click="logout"
                    >Logout
                    </v-btn>
                </v-toolbar-items>
                <template v-slot:extension >
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="localTitle"
                            label="Искать книгу по названию"
                            single-line
                            hide-details
                            @keyup.enter="toPage"
                    >

                    </v-text-field>
                    <v-btn
                            icon
                            @click="toPage"
                    >
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                </template>



            </v-app-bar>
        </v-card>

        <v-content class="pt-12">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>
<script>
    export default {
        data() {
            return {
                localTitle: ''
            }
        },
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn
            },
        },
        methods: {
            toPage() {
                this.$router.push(`/find/books/${this.localTitle}/1`)
            },
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
</style>
