<template>
    <v-container
            fluid
    >

        <v-row
                justify="center"
        >
            <v-col
                    cols="12"
                    xs="10"
                    sm="10"
                    md="10"
                    lg="8"
            >
                <h1>Список пользователей</h1>
                <v-data-table
                        :headers="headers"
                        :items="users"
                        :options.sync="options"
                        class="elevation-1"
                        hide-default-footer
                        :items-per-page="itemsPerPage"
                >
                    <template v-slot:item.is_superuser="{ item }">
                        <v-icon>{{ viewSU(item) }}</v-icon>
                    </template>
                    <template v-slot:item.last_login="{ item }">
                        {{ toHumanDate(item.last_login) }}
                    </template>
                    <template v-slot:item.date_joined="{ item }">
                        {{ toHumanDate(item.date_joined) }}
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
        <div
                class="text-center"
        >
            <v-pagination
                    v-model="pageLocal"
                    :length="pagesLength"
                    :total-visible="6"
                    @input="toPage(pageLocal)"

            ></v-pagination>
        </div>
    </v-container>
</template>

<script>
    export default {
        name: "Admin",
        data() {
            return {
                itemsPerPage: 50,
                pagesLength: 1,
                options: {},
                users: [],
                headers: [
                    {
                        text: 'ID',
                        align: 'start',
                        sortable: false,
                        value: 'id',
                    },
                    { text: 'Пользователь', value: 'username', sortable: false },
                    { text: 'Суперпользователь', value: 'is_superuser', sortable: false },
                    { text: 'E-Mail', value: 'email', sortable: false },
                    { text: 'Последний логин', value: 'last_login' },
                    { text: 'Дата регистрации', value: 'date_joined' },
                ],
            }
        },
        computed: {
            pageLocal: {
                get() {
                    return this.$store.getters.myPage
                },
                set(page) {
                    this.$store.dispatch('setPage', page)
                }
            },
        },
        methods: {
            viewSU(value) {
                if (value.is_superuser) {
                    return 'mdi-checkbox-marked-circle-outline'
                }
                return 'mdi-checkbox-blank-circle-outline'
            },
            toHumanDate(value) {
                return new Date(value).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                })
            },
            getUsers() {
                let numberedPage = Number.parseInt(this.pageLocal, 10)
                let offset = numberedPage > 1 ? (numberedPage - 1) * 50 : 0


                let requestBody = {
                    limit: 50,
                    offset: offset,
                    order: this.options.sortBy[0],
                    desc: this.options.sortDesc[0]
                }

                this.$http
                    .post(`${process.env.VUE_APP_BACKEND_API_URL}api/admin/users`, requestBody)
                    .then(response => {
                        this.users = response.data.users
                        this.pagesLength = response.data.length
                    })
                    .catch(err => {
                        switch (err.response.status) {
                            case 401:
                                this.logout()
                                break
                            case 404:
                                this.$router.push("/404")
                                break
                        }
                    })
                window.scrollTo(0, 0)
            },
            toPage(page) {
                this.$store.dispatch('setPage', page)

            },
        },
        mounted() {
            this.pageLocal = 1
            this.getUsers()
        },
        watch: {
            pageLocal() {
                this.getUsers()
            },
            options() {
                this.getUsers()
            }
        }
    }
</script>

<style scoped>

</style>