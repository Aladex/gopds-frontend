<template>

    <v-container
            class="fill-height"
            fluid
    >
        <div class="devito"></div>
        <div class="books d-none d-lg-block"></div>
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
            >

                <v-expand-transition>
                    <v-card class="elevation-12 cardColor"
                    >
                        <v-toolbar
                                color="custom accent-4"
                                flat
                        >
                            <v-toolbar-title>Авторизация</v-toolbar-title>

                        </v-toolbar>
                        <v-card-text>
                            <v-form
                                    v-model="valid"
                                    validation
                                    ref="form"

                            >
                                <v-text-field
                                        label="Login"
                                        name="login"
                                        prepend-icon="mdi-account"
                                        type="text"
                                        v-model="email"
                                        :rules="emailRules"
                                        @keyup.enter="login"
                                />

                                <v-text-field
                                        id="password"
                                        label="Password"
                                        name="password"
                                        prepend-icon="mdi-lock"
                                        type="password"
                                        v-model="password"
                                        :rules="passwordRules"
                                        @keyup.enter="login"
                                />
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                    color="custom accent-4"
                                    @click="login"
                                    :disabled="!valid"
                            >Войти
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-expand-transition>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email: "",
                password: "",
                valid: false,
                emailRules: [
                    v => !!v || 'Login is required',
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                ],
                expand: false,
            }
        },

        methods: {
            login() {
                let username = this.email
                let password = this.password
                this.$store.dispatch('login', {username, password})
                    .then(() => {
                        this.$store.dispatch('authChangeError', false)
                        this.$router.push('/')
                    })
                    .catch(() => {
                        this.$store.dispatch('authChangeError', true)
                    })
            }
        },
        mounted() {
            this.expand = true
        }

    }
</script>

<style scoped>
    .devito {
        width: 500px;
        height: 350px;
        position: absolute;
        bottom: 0;
        right: 0;
        background: url( '../../assets/devito_back.png');
        background-size: cover;
    }
    .books {
        width: 300px;
        height: 350px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: url( '../../assets/books_back.png');
        background-size: cover;
    }


</style>