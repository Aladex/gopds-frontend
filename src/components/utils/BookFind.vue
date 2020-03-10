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
                        lg="4"
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
                        lg="4"
                >

                    <v-text-field
                            v-model="localTitle"
                            label="Что ищем?"
                            single-line
                            hide-details
                            @keyup.enter="findByTitle"
                    >
                    </v-text-field>
                </v-col>
                <v-col
                        cols="12"
                        sm="12"
                        md="12"
                        lg="4"
                >
                    <v-btn
                            class="search-btn"
                            @click="findByTitle"
                    >
                        Искать
                    </v-btn>
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
                selectedSearch: { name: "book", title: "Поиск книги по названию" },
                localTitle: "",
                selects: [
                    { name: "book", title: "Поиск книги по названию" },
                    { name: "author", title: "Поиск автора" },
                ]
            }
        },
        methods: {
            itemText: item => item.title,
            findByTitle() {
                switch (this.selectedSearch.name) {
                    case "book":
                        this.$router.push(`/find/books/${this.localTitle}/1`)
                        break;
                    case "author":
                        this.$router.push(`/authors/${this.localTitle}/1`)
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
</style>