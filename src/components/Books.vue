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
                    cols="12"
                    xs="10"
                    sm="10"
                    md="10"
                    lg="8"
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
                                    <p><b>Дата добавления:</b> <i>{{ toHumanDate(b.registerdate) }}</i></p>
                                    <p><b>Дата документа:</b> <i>{{ docDatetoHumanDate(b.docdate) }}</i></p>
                                    <div class="my-4 subtitle-1"><b>Авторы:</b>
                                        <p>
                                         <span
                                                v-for="a in b.authors"
                                                :key="a.id"
                                        >
                                            &#8195;&#8226;&#8195;
                                             <router-link
                                                    :to="`/find/author/${a.id}/1`"
                                            >{{a.full_name }}
                                            </router-link>
                                        </span></p>
                                    </div>


                                    <div class="my-4 subtitle-1"><b>Описание:</b></div>
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
        props: ["page", "title", "searchBar", "author"],
        components: {
            BookFind,
        },
        data() {
            return {
                pagesLength: 1,
                loading: true,
                books: [],
                localTitle: '',
                searchSelect: "book",
                searchSelects: ["book", "author"]
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
                } else if (thisPath.name === 'findByAuthor') {
                    this.$router.push(`/find/author/${thisPath.params.author}/${page}`)
                }
                else {
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
                        this.pagesLength = response.data.length
                        this.loading = false
                    })
                    .catch(err => {
                        switch (err.response.status) {
                            case 403:
                                this.logout()
                                break
                            case 404:
                                this.$router.push("/404")
                                break
                        }
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
            author() {
                this.setThisPage(this.page)
                this.getBooks()
            },
        }
    }
</script>

<style scoped>

</style>