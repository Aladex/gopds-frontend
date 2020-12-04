<template>
    <v-container>
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
                    :key="b.id"
                    justify="center"
                    v-for="b in books"
            >
                <v-col
                        cols="12"
                        lg="8"
                        md="10"
                        sm="10"
                        xs="10"
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
                                        lg="10"
                                        md="12"
                                        sm="12"
                                >
                                    <v-card-title>{{ b.title }}</v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col
                                                    cols="auto">
                                                <v-img
                                                        :src="cover(b)"
                                                        class="elevation-6 poster"
                                                        lazy-src="@/assets/cover-loading.png"
                                                        max-width="200px"
                                                        min-width="200px"
                                                >
                                                    <template v-slot:placeholder>
                                                        <v-row
                                                                align="center"
                                                                class="fill-height ma-0"
                                                                justify="center"
                                                        >
                                                            <v-progress-circular color="grey lighten-5"
                                                                                 indeterminate></v-progress-circular>
                                                        </v-row>
                                                    </template>
                                                </v-img>

                                            </v-col>
                                            <v-col
                                                    cols="auto">
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
                                                 :key="a.id"
                                                 v-for="a in b.authors"
                                         >
                                            &#8195;&#8226;&#8195;
                                             <router-link
                                                     :to="`/books/find/author/${a.id}/1`"
                                                     class="info-link"
                                             >{{ a.full_name }}
                                            </router-link>
                                        </span></p>
                                                </div>

                                                <div class="my-4 subtitle-1"
                                                     v-if="b.series !== null"
                                                ><b>Серии:</b>
                                                    <p>
                                         <span
                                                 :key="s.id"
                                                 v-for="s in b.series"
                                         >
                                            &#8195;&#8226;&#8195;
                                             <router-link
                                                     :to="`/books/find/series/${s.id}/1`"
                                                     class="info-link"
                                             >{{ s.ser }}
                                            </router-link><span v-if="s.ser_no !== 0"> #{{ s.ser_no }}</span>
                                        </span></p>
                                                </div>

                                            </v-col>
                                        </v-row>


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
                                        class="mt-4"
                                        cols="12"
                                        lg="2"
                                        md="12"
                                        sm="12"
                                >
                                    <v-row
                                            class="ml-2"
                                    >
                                        <v-col
                                                cols="6"
                                                lg="12"
                                                md="6"
                                                sm="6"
                                                xs="6"
                                        >
                                            <v-btn
                                                    @click="downloadFile(b, 'fb2')"
                                                    class="secondary"
                                                    width="100%"
                                            >FB2
                                            </v-btn>
                                        </v-col>
                                        <v-col
                                                cols="6"
                                                lg="12"
                                                md="6"
                                                sm="6"
                                                xs="6"
                                        >
                                            <v-btn
                                                    @click="downloadFile(b, 'zip')"
                                                    class="secondary"
                                                    width="100%"
                                            >FB2+ZIP
                                            </v-btn>
                                        </v-col>
                                        <v-col
                                                cols="6"
                                                lg="12"
                                                md="6"
                                                sm="6"
                                                xs="6"
                                        >
                                            <v-btn
                                                    @click="downloadFile(b, 'epub')"
                                                    class="secondary"
                                                    width="100%"
                                            >EPUB
                                            </v-btn>
                                        </v-col>
                                        <v-col
                                                cols="6"
                                                lg="12"
                                                md="6"
                                                sm="6"
                                                xs="6"
                                        >
                                            <v-btn
                                                    @click="downloadFile(b, 'mobi')"
                                                    class="secondary"
                                                    width="100%"
                                            >MOBI
                                            </v-btn>
                                        </v-col>
                                    </v-row>

                                </v-col>
                            </v-row>
                          <v-card-actions><v-spacer></v-spacer>
                            <v-btn
                                icon
                                @click="favBook(b)"
                            >
                            <v-icon v-if="b.fav">mdi-star</v-icon>
                            <v-icon v-else>mdi-star-outline</v-icon>
                          </v-btn></v-card-actions>
                        </v-card>
                    </v-skeleton-loader>
                </v-col>

            </v-row>
        </div>
        <pagination v-if="(books.length > 0)"></pagination>
        <v-dialog
                persistent
                v-model="disabled"
                width="300"
        >
            <v-card
                    color="accent"
                    dark
            >
                <v-card-text>
                    Идёт подготовка книги
                    <v-progress-linear
                            class="mb-0"
                            color="white"
                            indeterminate
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import BookFind from "@/components/utils/BookFind";
    import ItemsNotFound from "@/components/errors/ItemsNotFound";
    import Pagination from "@/components/utils/Pagination";

    export default {
        name: "BooksView",
        props: ["page", "title", "searchBar", "author", "series"],
        components: {
            BookFind,
            ItemsNotFound,
            Pagination
        },
        data() {
            return {
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
            fav: {
              get() {
                return this.$store.getters.fav
              },
              set(fav) {
                this.$store.dispatch('setFav', fav)
              }
            },
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
            pageLocal: {
                get() {
                    return this.$store.getters.myPage
                },
                set(page) {
                    this.$store.dispatch('setPage', page)
                }
            },
            pagesLength: {
                get() {
                    return this.$store.getters.length
                },
                set(length) {
                    this.$store.dispatch('setLength', length)
                }
            },
            thisPath: {
                get() {
                    return this.$router.currentRoute
                }
            },
            authorsBook: {
                set(value) {
                    this.$store.dispatch("authorsBook", value)
                },
                get() {
                    return this.$store.getters.authorsBook
                },
            }

        },
        methods: {
            cover(b) {
                if (b.cover) {
                    let path = b.path.replace(".", '-');
                    let img = b.filename.replace(".", '-');
                    return `/books-posters/${path}/${img}.jpg`
                }
                return "/books-posters/no-cover.png"
            },
            makeShort(b) {
                if (b.annotation === undefined) {
                    return ""
                }
                let wordsList = b.annotation.split(" ");
                if (wordsList.length < 40) {
                    return b.annotation
                }
                return wordsList.slice(0, 40).join(" ")
            },
            itemText: item => item.language,
            setThisPage(page) {
                this.$store.dispatch('setPage', page)
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
                });
                if (dhd === "Invalid Date") {
                    return "Дата документа неизвестна"
                }
                return dhd
            },
          favBook(book) {
            let requestBody = {
              book_id: book.id,
              fav: !book.fav
            }
            for (let i = 0; i < this.books.length; i++) {
              if (this.books[i].id === book.id) {
                this.books[i].fav = !book.fav
              }
            }
            this.$http.post(
                `${process.env.VUE_APP_BACKEND_API_URL}api/books/fav`,
                requestBody,
            )
          },
          downloadFile(book, type) {
                this.disabled = true;
                let requestBody = {
                    book_id: book.id,
                    format: type,
                };
                this.$http.post(
                    `${process.env.VUE_APP_BACKEND_API_URL}api/books/file`,
                    requestBody,
                    {
                        responseType: 'blob',
                    }
                ).then((response) => {
                    let fileName = response.headers["content-disposition"].split("filename=")[1];
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${fileName}`);
                    document.body.appendChild(link);
                    link.click();
                    this.disabled = false
                }).catch(() => {
                    this.disabled = false
                })
            },
            getBooks() {
                this.loading = true;
                this.opened = [];
                this.books = Array.from(Array(10).keys());
                let numberedPage = Number.parseInt(this.pageLocal, 10);
                let offset = numberedPage > 1 ? (numberedPage - 1) * process.env.VUE_APP_ONPAGE : 0;
                let filterTitle = "";
                if (this.$route.name === "findByAuthor") {
                    filterTitle = this.authorsBook
                } else {
                    filterTitle = this.title
                }

                let requestBody = {
                    limit: process.env.VUE_APP_ONPAGE,
                    offset: offset,
                    title: filterTitle,
                    author: this.author,
                    series: this.series,
                    fav: this.fav,
                    lang: this.lang.language
                };
                console.log(requestBody)

                this.$http
                    .get(`${process.env.VUE_APP_BACKEND_API_URL}api/books/list`, {params: requestBody})
                    .then(response => {
                        this.books = response.data.books;
                        this.langs = response.data.langs;
                        this.pagesLength = response.data.length;
                        this.loading = false
                    })
                    .catch(err => {
                        switch (err.response.status) {

                            case 404:
                                this.$router.push("/404");
                                break
                        }
                    });
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
            this.setThisPage(this.page);
            this.getBooks()
        },
        watch: {
            page() {
                this.setThisPage(this.page);
                this.getBooks()
            },
            title() {
                this.setThisPage(this.page);
                this.getBooks()
            },
            authorsBook() {
                this.setThisPage(this.page);
                this.getBooks()
            },
            author() {
                this.setThisPage(this.page);
                this.getBooks()
            },
            fav() {
              this.setThisPage(this.page);
              this.getBooks()
            },
            series() {
                this.setThisPage(this.page);
                this.getBooks()
            },
            lang() {
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

    .poster {
        border-radius: 6px;
    }

    .info-link {
        text-decoration: none;
    }
</style>