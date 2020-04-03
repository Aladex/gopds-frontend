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
                <v-card
                        v-if="regError !== ''"
                        class="elevation-12"
                        color="warning"
                >
                    <v-card-text>
                    <p>Ошибка: {{ regError }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
            >
                <v-card class="elevation-12 cardColor"
                >
                    <v-toolbar
                            color="custom accent-4"
                            flat
                    >
                        <v-toolbar-title>Регистрация</v-toolbar-title>

                    </v-toolbar>
                    <v-card-text>
                        <v-form
                                v-model="valid"
                                validation
                                ref="form"

                        >
                            <v-text-field
                                    label="Юзернейм"
                                    name="username"
                                    prepend-icon="mdi-account"
                                    type="text"
                                    v-model="username"
                                    :rules="usernameRules"
                                    @keyup.enter="register"
                            />
                            <v-text-field
                                    label="Электронная почта"
                                    name="email"
                                    prepend-icon="mdi-email"
                                    type="text"
                                    v-model="email"
                                    :rules="emailRules"
                                    @keyup.enter="register"
                            />

                            <v-text-field
                                    id="password"
                                    label="Пароль"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="password"
                                    :rules="passwordRules"
                            />
                            <v-text-field
                                    id="invite"
                                    label="Инвайт"
                                    name="invite"
                                    prepend-icon="mdi-help"
                                    type="text"
                                    v-model="invite"
                                    :rules="inviteRules"
                            />

                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                                color="custom accent-4"
                                @click="register"
                                :disabled="!valid"
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
        name: "Registration",
        data() {
            return {
                regError: "",
                username: "",
                email: "",
                password: "",
                invite: "",
                valid: false,
                inviteRules: [
                    v => !!v || 'Обязательное поле',
                ],
                usernameRules: [
                    v => !!v || 'Обязательное поле',
                    v => /^[a-z0-9A-Z]{1,20}$/.test(v) || 'Только латинские символы и цифры'
                ],
                emailRules: [
                    v => !!v || 'Обязательное поле',
                    v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Введи корректный e-mail'
                ],
                passwordRules: [
                    v => !!v || 'Обязательное поле',
                    v => (v.length > 7) || 'Пароль не менее 8 символов',
                ],
                expand: false,
            }
        },

        methods: {
            register() {
                let registerData = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    invite: this.invite
                }
                this.$http({
                    url: process.env.VUE_APP_BACKEND_API_URL + 'api/register',
                    data: registerData,
                    method: 'POST'
                })
                    .then(() => {
                        this.$router.push("/login")
                    })
                    .catch(err => {
                        switch (err.response.data.message) {
                            case "bad invite":
                                this.regError = "Такого инвайта нет. Сходи на лепру."
                                break
                            case "bad form":
                                this.regError = "Что-то не так с формой"
                                break
                            case "user is already exists":
                                this.regError = "Такой пользователь уже есть"
                                break
                            default:
                                this.regError = "Что-то пошло не так"
                        }
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
        background: url('../../assets/devito_back.png');
        background-size: cover;
    }

    .books {
        width: 300px;
        height: 350px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: url('../../assets/books_back.png');
        background-size: cover;
    }


</style>