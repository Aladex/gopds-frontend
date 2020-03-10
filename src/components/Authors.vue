<template>
    <v-container
            fluid
    >
        <book-find
                v-if="searchBar"
        ></book-find>
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
                <v-list subheader>
                    <v-subheader>Найденные авторы</v-subheader>

                    <v-list-item
                            v-for="author in authors"
                            :key="author.id"
                            @click="toAuthorPage(author.id)"
                    >
                        <v-list-item-content>
                            <v-list-item-title v-text="author.full_name"></v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
                </v-list>
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

        props: ["page", "title", "searchBar", "author"],
        name: "Authors",
        data() {
            return {
                pagesLength: 1,
                authors: []
            }
        },
        components: {
            BookFind,
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
            toAuthorPage(authorID) {
                this.$router.push(`/find/author/${authorID}/1`)
            },
            toPage(page) {
                this.$store.dispatch('setPage', page)
                let thisPath = this.$router.currentRoute
                this.$router.push(`/authors/${thisPath.params.author}/${page}`)
            },
            getAuthors() {
                this.loading = true
                let numberedPage = Number.parseInt(this.pageLocal, 10)
                let offset = numberedPage > 1 ? (numberedPage - 1) * process.env.VUE_APP_ONPAGE : 0
                let requestBody = {
                    limit: process.env.VUE_APP_ONPAGE,
                    offset: offset,
                    author: this.author
                }

                this.$http
                    .get(`${process.env.VUE_APP_BACKEND_API_URL}api/books/authors`, {params: requestBody})
                    .then(response => {
                        this.authors = response.data.authors
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
            setThisPage(page) {
                this.$store.dispatch('setPage', page)
            },
        },
        mounted() {
            this.getAuthors()
        },
        watch: {
            page() {
                this.setThisPage(this.page)
                this.getAuthors()
            },
            author() {
                this.setThisPage(this.page)
                this.getAuthors()
            },
        }

    }
</script>

<style scoped>

</style>