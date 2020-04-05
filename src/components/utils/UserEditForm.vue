<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Изменить пользователя</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">ID: {{ user.id }}</v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model="user.username"
                                            label="Имя пользователя"
                                            ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model="newPassword"
                                            label="Пароль"
                                            type="password"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model="user.email"
                                            label="Почта"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model="user.first_name"
                                            label="First Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                            v-model="user.last_name"
                                            label="Last Name"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-checkbox
                                            v-model="user.is_superuser"
                                            label="Админ"
                                            ></v-checkbox>
                                </v-col>

                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
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
        name: "UserEditForm",
        data() {
            return {
                newPassword: ""
            }
        },
        methods: {
            onClose (dialog) {
                this.newPassword = ""
                this.$emit('closed', dialog)
            },
            userChange(user) {
                if (this.newPassword !== "") {
                    user.password = this.newPassword
                }
                let bodyChange = {
                    action: "update",
                    user: user
                }
                this.$http({
                    url: process.env.VUE_APP_BACKEND_API_URL + 'api/admin/user',
                    data: bodyChange,
                    method: 'POST'
                })
                    .then(() => {
                        this.onClose(false)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }
    }
</script>

<style scoped>

</style>