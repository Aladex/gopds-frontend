<template>
    <v-container
            fluid
    >
        <v-row justify="center">
            <v-col
                    lg="8"
                    sm="10"
            >
                <v-row justify="start">
                    <v-col lg="4"
                           sm="8">
                        <v-text-field
                                v-model="localTitle"
                                label="Искать книгу по названию"
                                single-line
                                hide-details
                                @keyup.enter="findByTitle"
                        >

                        </v-text-field>
                    </v-col>
                    <v-col lg="2" sm="4">
                        <v-btn
                                @click="findByTitle"
                        >
                            Искать
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row
                v-for="b in books"
                justify="center"
                :key="b.id"
        >
            <v-col
                    lg="8"
                    sm="10"
            >
                <v-skeleton-loader
                        :loading="loading"
                        height="94"
                        type="list-item-two-line"
                >
                    <v-card
                            class="mx-auto"
                    >
                        <v-row class="mr-4">
                            <v-col
                                    lg="10"
                                    sm="12"
                            >
                                <v-card-title>{{ b.title }}</v-card-title>
                                <v-card-text>
                                    <p>Дата добавления: <i>{{ toHumanDate(b.registerdate) }}</i></p>
                                    <p>Дата документа: <i>{{ docDatetoHumanDate(b.docdate) }}</i></p>
                                    <div v-if="b.authors !== null">Авторы: {{ authorsJoin(b.authors) }}</div>
                                    <div class="my-4 subtitle-1">Описание:</div>
                                    <div>{{ b.annotation }}</div>
                                    <div v-if="b.annotation === ''">Описание отсутствует</div>
                                </v-card-text>
                            </v-col>
                            <v-col
                                    lg="2"
                                    sm="12"
                                    class="mt-4"
                            >
                                <v-btn
                                        class="secondary ma-2"
                                        min-width="100px"
                                        :href="`${opdsURL}/opds/download/${b.id}/0/`"
                                >FB2
                                </v-btn>
                                <v-btn
                                        class="secondary ma-2"
                                        min-width="100px"
                                        :href="`${opdsURL}/opds/download/${b.id}/1/`"
                                >FB2+ZIP
                                </v-btn>
                                <v-btn
                                        class="secondary ma-2"
                                        min-width="100px"
                                        :href="`${opdsURL}/opds/convert/${b.id}/epub/`"
                                >EPUB
                                </v-btn>
                                <v-btn
                                        class="secondary ma-2"
                                        min-width="100px"
                                        :href="`${opdsURL}/opds/convert/${b.id}/mobi/`"
                                >MOBI
                                </v-btn>

                            </v-col>
                        </v-row>
                    </v-card>
                </v-skeleton-loader>
            </v-col>

        </v-row>
        <div class="text-center">
            <v-pagination
                    v-model="pageLocal"
                    :length="pagesLength"
                    :total-visible="7"
                    @input="toPage(pageLocal)"

            ></v-pagination>
        </div>
    </v-container>
</template>

<script>
    export default {
        name: "Books",
        props: ["page", "title"],
        data() {
            return {
                pagesLength: 1,
                loading: true,
                books: [],
                localTitle: ''
            }
        },
        computed: {
            opdsURL: {
                get() {
                    return process.env.VUE_APP_OPDS
                }
            },
            pageLocal: {
                get() {
                    return this.$store.getters.myPage
                },
                set(page) {
                    this.$store.dispatch('setPage', page)
                }
            }
        },
        methods: {
            setThisPage(page) {
                this.$store.dispatch('setPage', page)
            },
            toPage(page) {
                this.$store.dispatch('setPage', page)
                let thisPath = this.$router.currentRoute
                if (thisPath.name === 'findBook') {
                    this.$router.push(`/find/books/${thisPath.params.title}/${page}`)
                } else {
                    this.$router.push(`/page/${page}`)
                }
            },
            findByTitle() {
                this.$router.push(`/find/books/${this.localTitle}/1`)
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
            docDatetoHumanDate(value) {
                return new Date(value).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
            },
            authorsJoin(authors) {
                return authors.map(e => e.full_name).join(", ");
            },
            getBooks() {
                this.loading = true
                let numberedPage = Number.parseInt(this.pageLocal, 10)
                let offset = numberedPage > 1 ? (numberedPage - 1) * process.env.VUE_APP_ONPAGE : 0
                let requestBody = {
                    limit: process.env.VUE_APP_ONPAGE,
                    offset: offset,
                    title: this.title,
                    author: this.author
                }

                this.$http
                    .get(`${process.env.VUE_APP_BACKEND_API_URL}api/books/list`, {params: requestBody})
                    .then(response => {
                        this.books = response.data.books
                        this.pagesLength = response.data.lenght
                        this.loading = false
                    })
                    .catch(() => {
                        this.logout()
                    })
                window.scrollTo(0, 0)
            },
            logout() {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')
                    })
            },
        },
        mounted() {
            this.setThisPage(this.page)
            this.getBooks()

        },
        watch: {
            pageLocal() {
                this.setThisPage(this.page)
                this.getBooks()
            },
            title() {
                this.setThisPage(this.page)
                this.getBooks()
            }
        }
    }
</script>

<style scoped>

</style>