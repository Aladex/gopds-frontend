<template>
    <v-container
            fluid
    >
        <book-find
                v-if="searchBar"
        ></book-find>

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
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="10"
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
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="2"
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
    import BookFind from "@/components/utils/BookFind";

    export default {
        name: "Books",
        props: ["page", "title", "searchBar"],
        components: {
            BookFind
        },
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
            },
            thisPath: {
                get() {
                    return this.$router.currentRoute
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
                let dhd = new Date(value).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
                if (dhd === "Invalid Date") {
                    return "Дата документа неизвестна"
                }
                return dhd
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
            page() {
                this.setThisPage(this.page)
                this.getBooks()
            },
            title() {
                this.setThisPage(this.page)
                this.getBooks()
            },
        }
    }
</script>

<style scoped>

</style>