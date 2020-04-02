<template>
    <v-row justify="center">
        <v-col
                cols="12"
                sm="10"
                md="10"
                lg="8"
                class="mt-4"
        >
            <v-card>
            <v-card-text>
            <v-row justify="start">

                <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="3"
                >
                    <v-select
                            v-model="selectedSearch"
                            :items="selects"
                            :item-text="itemText"
                            label="Категория поиска"
                            return-object
                    ></v-select>
                </v-col>
                <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="3"
                >

                    <v-text-field
                            v-model="searchItem"
                            label="Что ищем?"
                            single-line
                            hide-details
                            :clearable="(selectedSearch.name === 'authorsBook')"
                            @keyup.enter="findByTitle"
                            @click:clear="authorsBook = ''"
                    >
                    </v-text-field>
                </v-col>
                <v-col
                        cols="6"
                        sm="6"
                        md="6"
                        lg="3"
                >
                    <v-btn
                            class="search-btn"
                            @click="findByTitle"
                    >
                        Искать
                    </v-btn>
                </v-col>
                <v-col
                        cols="6"
                        sm="6"
                        md="6"
                        lg="3"
                >
                    <v-row
                        justify="end"
                    >
                        <v-col
                                cols="8"
                                sm="8"
                                md="8"
                                lg="8"
                        >
                            <v-select
                                    class="lang-selector"
                                    prepend-icon="mdi-web"
                                    v-model="lang"
                                    :items="langs"
                                    :item-text="langText"
                                    flat
                                    label="Язык"
                                    return-object
                            ></v-select>
                        </v-col>

                    </v-row>

                </v-col>

            </v-row>
            </v-card-text>
        </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "BookFind",
        props: ["author"],
        data() {
            return {
                openSelect: false,
                selects: [],
            }
        },
        computed: {
            myPath: function() {return this.$route.name},
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
            selectedSearch: {
                get() {
                    return this.$store.getters.selectedSearch
                },
                set(value) {
                    this.$store.dispatch("searchSet", value)
                }
            },
            searchItem: {
                get() {
                    return this.$store.getters.searchItem
                },
                set(value) {
                    this.$store.dispatch("searchItem", value)
                }
            },
            searchVariants: {
                set(value) {
                    this.$store.dispatch("searchVariants", value)
                },
                get() {
                    return this.$store.getters.searchVariants
                },
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
            langText: item => item.language,
            itemText: item => item.title,
            findByTitle() {
                this.$store.dispatch('setPage', 1)
                switch (this.selectedSearch.name) {
                    case "book":
                        this.$router.push(`/find/books/${this.searchItem}/1`).catch(() => {
                        })
                        break;
                    case "author":
                        this.$router.push(`/authors/${this.searchItem}/1`).catch(() => {
                        })
                        break;
                    case "authorsBook":
                        this.authorsBook = this.searchItem
                        this.$router.push(`/find/author/${this.$route.params.author}/1`).catch(() => {
                        })
                        break;
                }
            },
            makeSelects(path) {
                if (path === "findByAuthor") {
                    this.searchItem = ""
                    this.authorsBook = ""
                    this.selects = this.searchVariants.slice()
                    this.selects.push({name: "authorsBook", title: "Поиск книги у автора"})
                    this.selectedSearch = this.selects[2]
                } else {
                    this.selects = this.searchVariants.slice()
                    if (!this.selects.includes(this.selectedSearch)) {
                        this.selectedSearch = this.searchVariants[0]
                    }

                }
            },
        },
        watch: {
            myPath(path) {
                this.makeSelects(path)
            },
        },
        mounted() {
            this.makeSelects(this.myPath)
        }
    }
</script>

<style scoped>
    .search-btn {
        position: relative;
        top: 12px;
    }
    .lang-selector {
        position: relative;
        bottom: 12px;
    }
</style>