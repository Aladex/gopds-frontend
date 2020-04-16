<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    md="4"
                    sm="8"
            >
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
                                ref="form"
                                v-model="valid"
                                validation

                        >
                            <v-text-field
                                    :rules="passwordRules"
                                    @keyup.enter="setNewPassword"
                                    id="password"
                                    label="Пароль"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="password"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <router-link
                                :to="{ name: 'ForgetForm'}"
                        >
                            <v-icon
                                    class="pointer"
                            >mdi-help
                            </v-icon>
                        </router-link>
                        <v-spacer/>
                        <v-btn
                                :disabled="!valid"
                                @click="setNewPassword"
                                color="custom accent-4"
                        >Войти
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        props: ["token", "isRegister"],
        data() {
            return {
                valid: false,
                message: "",
                password: "",
                passwordRules: [
                    v => !!v || 'Обязательное поле',
                    v => (v.length > 7) || 'Пароль не менее 8 символов',
                ],
            }
        },
        name: "Reset",
        methods: {
            setNewPassword() {
                this.$http({
                    url: process.env.VUE_APP_BACKEND_API_URL + 'api/change-password',
                    data: {
                        password: this.password,
                        token: this.token
                    },
                    method: 'POST'
                }).then(() => {
                    this.message = "Отлично, учетная запись активирована"
                }).catch(() => {
                    // this.$router.push("/404")
                })
            }
        },
    }
</script>

<style scoped>

</style>