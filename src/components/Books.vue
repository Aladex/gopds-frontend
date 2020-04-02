<template>
    <v-container
            fluid
    >
        <book-find
                v-if="searchBar"
        ></book-find>

        <items-not-found
                v-if="(books.length === 0)"
        ></items-not-found>

        <div v-if="(books.length > 0)">
            <v-row
                    justify="center"
            >
            </v-row>
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
                                        <p
                                                v-if="b.lang"

                                        ><b>Язык: </b>
                                            <v-avatar
                                                    color="primary"
                                                    size="24"
                                                    tile
                                            >
                                                <span class="white--text">{{ b.lang }}</span>
                                            </v-avatar>
                                        </p>
                                        <div class="my-4 subtitle-1"><b>Авторы:</b>
                                            <p>
                                         <span
                                                 v-for="a in b.authors"
                                                 :key="a.id"
                                         >
                                            &#8195;&#8226;&#8195;
                                             <router-link
                                                     class="info-link"
                                                     :to="`/find/author/${a.id}/1`"
                                             >{{ a.full_name }}
                                            </router-link>
                                        </span></p>
                                        </div>

                                        <div class="my-4 subtitle-1"
                                             v-if="b.series !== null"
                                        ><b>Серии:</b>
                                            <p>
                                         <span
                                                 v-for="s in b.series"
                                                 :key="s.id"
                                         >
                                            &#8195;&#8226;&#8195;
                                             <router-link
                                                     class="info-link"
                                                     :to="`/find/series/${s.id}/1`"
                                             >{{ s.ser }}
                                            </router-link>
                                        </span></p>
                                        </div>


                                        <div class="my-4 subtitle-1"><b>Описание:</b></div>
                                        <div
                                                v-if="(b.annotation !== '' && !opened.includes(b))"
                                        >{{ makeShort(b) }}
                                            <span
                                                    v-if="b.annotation !== makeShort(b)"
                                            >...<br><i
                                                    @click="opened.push(b)"
                                                    class="open-long"
                                            >Полное описание</i></span></div>
                                        <div v-if="opened.includes(b)">{{ b.annotation }}</div>
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
                                    <v-row
                                            class="ml-2"
                                    >
                                        <v-col
                                                cols="6"
                                                xs="6"
                                                sm="6"
                                                md="6"
                                                lg="12"
                                        >
                                            <v-btn
                                                    class="secondary"
                                                    width="100%"
                                                    @click="downloadFile(b, 'fb2')"
                                            >FB2
                                            </v-btn>
                                        </v-col>
                                        <v-col
                                                cols="6"
                                                xs="6"
                                                sm="6"
                                                md="6"
                                                lg="12"
                                        >
                                            <v-btn
                                                    class="secondary"
                                                    width="100%"
                                                    @click="downloadFile(b, 'zip')"
                                            >FB2+ZIP
                                            </v-btn>
                                        </v-col>
                                        <v-col
                                                cols="6"
                                                sm="6"
                                                xs="6"
                                                md="6"
                                                lg="12"
                                        >
                                            <v-btn
                                                    class="secondary"
                                                    width="100%"
                                                    @click="downloadFile(b, 'epub')"
                                            >EPUB
                                            </v-btn>
                                        </v-col>
                                        <v-col
                                                cols="6"
                                                xs="6"
                                                sm="6"
                                                md="6"
                                                lg="12"
                                        >
                                            <v-btn
                                                    class="secondary"
                                                    width="100%"
                                                    @click="downloadFile(b, 'mobi')"
                                            >MOBI
                                            </v-btn>
                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-row>
                        </v-card>
                    </v-skeleton-loader>
                </v-col>

            </v-row>
        </div>
        <div
                class="text-center"
                v-if="(books.length > 0)"

        >
            <v-pagination
                    v-model="pageLocal"
                    :length="pagesLength"
                    :total-visible="6"
                    @input="toPage(pageLocal)"

            ></v-pagination>
        </div>
        <v-dialog
                v-model="disabled"
                persistent
                width="300"
        >
            <v-card
                    color="accent"
                    dark
            >
                <v-card-text>
                    Идёт подготовка книги
                    <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import BookFind from "@/components/utils/BookFind";
    import ItemsNotFound from "@/components/errors/ItemsNotFound";

    export default {
        name: "Books",
        props: ["page", "title", "searchBar", "author", "series"],
        components: {
            BookFind,
            ItemsNotFound
        },
        data() {
            return {
                pagesLength: 1,
                loading: true,
                books: Array.from(Array(10).keys()),
                searchSelect: "book",
                searchSelects: ["book", "author"],
                disabledButtons: [],
                disabled: false,
                opened: []
            }
        },
        computed: {
            lang: {
                get() {
                    return this.$store.getters.lang
                },
                set(lang) {
                    this.$store.dispatch('setLang', lang)
                }
            },
            langs: {
                get() {
                    return this.$store.getters.langs
                },
                set(langs) {
                    this.$store.dispatch('setLangs', langs)
                }
            },
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
            makeShort(b) {
                if (b.annotation === undefined) {
                    return ""
                }
                let wordsList = b.annotation.split(" ")
                if (wordsList.length < 40) {
                    return b.annotation
                }
                return wordsList.slice(0, 40).join(" ")
            },
            itemText: item => item.language,
            setThisPage(page) {
                this.$store.dispatch('setPage', page)
            },
            toPage(page) {
                this.$store.dispatch('setPage', page)
                let thisPath = this.$router.currentRoute

                switch (thisPath.name) {
                    case "findBook":
                        this.$router.push(`/find/books/${thisPath.params.title}/${page}`)
                        break
                    case "findByAuthor":
                        this.$router.push(`/find/author/${thisPath.params.author}/${page}`)
                        break
                    case "findBySeries":
                        this.$router.push(`/find/series/${thisPath.params.series}/${page}`)
                        break
                    default:
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
            downloadFile(book, type) {
                this.disabled = true
                let requestBody = {
                    book_id: book.id,
                    format: type,
                }
                let filename = book.title.toLowerCase().replace(/[^A-Za-z0-9а-яА-ЯёЁ]/g, "_")
                this.$http.post(
                    `${process.env.VUE_APP_BACKEND_API_URL}api/books/file`,
                    requestBody,
                    {
                        responseType: 'blob',
                        headers: {'Accept': 'application/octet-stream'},
                    }
                ).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;

                    link.setAttribute('download', `${filename}.${type}`);
                    document.body.appendChild(link);
                    link.click();
                    this.disabled = false
                })
            },
            getBooks() {
                this.loading = true
                this.opened = []
                this.books = Array.from(Array(10).keys())
                let numberedPage = Number.parseInt(this.pageLocal, 10)
                let offset = numberedPage > 1 ? (numberedPage - 1) * process.env.VUE_APP_ONPAGE : 0
                let requestBody = {
                    limit: process.env.VUE_APP_ONPAGE,
                    offset: offset,
                    title: this.title,
                    author: this.author,
                    series: this.series,
                    lang: this.lang.language
                }

                this.$http
                    .get(`${process.env.VUE_APP_BACKEND_API_URL}api/books/list`, {params: requestBody})
                    .then(response => {
                        this.books = response.data.books
                        this.langs = response.data.langs
                        this.pagesLength = response.data.length
                        this.loading = false
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
            series() {
                this.setThisPage(this.page)
                this.getBooks()
            },
            lang() {
                this.toPage(1)
                this.getBooks()
            },
        }
    }
</script>

<style scoped>
    .open-long {
        cursor: pointer;
        text-decoration: underline;
    }

    .info-link {
        text-decoration: none;
    }
</style>