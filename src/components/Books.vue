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
                <v-col
                        cols="12"
                        xs="10"
                        sm="10"
                        md="10"
                        lg="8"
                >
                    <v-row
                        justify="left"
                    >
                        <v-col
                            cols="12"
                            xs="6"
                            sm="6"
                            md="6"
                            lg="3"
                        >
                    <v-select
                            v-model="lang"
                            :items="langs"
                            :item-text="itemText"
                            flat
                            dense
                            label="Язык"
                            return-object
                    ></v-select>
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
                                                    @click="lang = b.lang"
                                                    class="pointer"
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
                                                     :to="`/find/series/${s.id}/1`"
                                             >{{ s.ser }}
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
                                                    :href="`${opdsURL}/opds/download/${b.id}/1/`"
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
                                                    :href="`${opdsURL}/opds/convert/${b.id}/epub/`"
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
                                                    :href="`${opdsURL}/opds/convert/${b.id}/mobi/`"
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
                    :total-visible="7"
                    @input="toPage(pageLocal)"

            ></v-pagination>
        </div>
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
                lang: "",
                langs: [],
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
                let requestBody = {
                    book_id: book.id,
                    format: type,
                }
                let filename = book.title.toLowerCase().split(" ").join("_")
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
                })
            },
            getBooks() {
                this.loading = true
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
    .pointer {
        cursor: pointer;
    }
</style>