<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Расскажи о себе, {{ user.username }}</span>
                    </v-card-title>
                    <v-card-text
                            class="pointer"
                            @click="willChange = !willChange"
                    >
                        <small
                                v-if="!willChange"
                        >Поменять пароль</small>
                        <small
                                v-if="willChange"
                        >Скрыть форму пароля</small>
                    </v-card-text>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12"
                                       v-if="willChange">
                                    <v-text-field
                                            v-model="password"
                                            label="Пароль"
                                            type="password"
                                            :error-messages="errorsText"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12"
                                       v-if="willChange">
                                    <v-text-field
                                            v-model="newPassword"
                                            label="Новый пароль"
                                            type="password"
                                            :disabled="this.password === ''"
                                            :error-messages="errorsNPText"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model="user.first_name"
                                            label="Имя"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model="user.last_name"
                                            label="Фамилия"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="onClose(false)">Закрыть</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="userChange(user)">Изменить</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

    </div>
</template>

<script>
    export default {
        props: ["user", "dialog"],
        name: "SelfUserEditForm",
        data() {
            return {
                willChange: false,
                errorsText: "",
                errorsNPText: "",
                password: "",
                newPassword: "",
                valid: true,
            }
        },
        methods: {
            newPasswordErrorText(np) {
                if (this.password !== "" && np === "") {
                    this.errorsNPText = "Обязательное поле"
                } else if (this.password === this.newPassword && this.password !== "") {
                    this.errorsNPText = "Новый пароль должен отличаться от старого"
                } else if (this.password !== "" && np.length < 8) {
                    this.errorsNPText = "Пароль должен быть больше 8 символов"
                } else {
                    this.errorsNPText = ""
                }
            },
            onClose(dialog) {
                this.willChange = false
                this.$emit('closed', dialog)
            },
            userChange(user) {
                user.new_password = this.newPassword
                user.password = this.password


                this.$http({
                    url: process.env.VUE_APP_BACKEND_API_URL + 'api/books/change-me',
                    data: user,
                    method: 'POST'
                })
                    .then(() => {
                        this.$store.dispatch('getMe')
                        this.onClose(false)
                    })
                    .catch(err => {
                        switch (err.response.status) {
                            case 400:
                                this.errorsNPText = "Пароль должен быть больше 8 символов"
                                break
                            case 403:
                                this.errorsText = "Неправильный пароль"
                                break
                        }
                    })

            }

        },
        watch: {
            willChange() {
                this.password = ""
                this.newPassword = ""
                this.errorsText = ""
            },
            newPassword(value) {
                this.newPasswordErrorText(value)
            }
        }
    }
</script>

<style scoped>

</style>