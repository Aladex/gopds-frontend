<template>
    <v-row justify="center">
        <v-col
                cols="12"
                sm="10"
                md="10"
                lg="8"
                class="mt-4"
        >
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
                            @keyup.enter="findByTitle"
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
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "BookFind",
        data() {
            return {
                openSelect: false,
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
            selects: {
                get() {
                    return this.$store.getters.searchVariants
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
                }
            },
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