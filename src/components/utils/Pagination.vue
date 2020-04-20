<template>
    <div
            class="text-center"
    >
        <v-pagination
                :length="pagesLength"
                :total-visible="6"
                @input="toPage(pageLocal)"
                v-model="pageLocal"

        ></v-pagination>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        computed: {
            lang: {
                get() {
                    return this.$store.getters.lang
                },
                set(lang) {
                    this.$store.dispatch('setLang', lang)
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
        },
        methods: {
            toPage(page) {
                this.$store.dispatch('setPage', page);
                let thisPath = this.$router.currentRoute;
                switch (thisPath.name) {
                    case "findBook":
                        this.$router.push(`/find/books/${thisPath.params.title}/${page}`);
                        break;
                    case "findAuthor":
                        this.$router.push(`/authors/${thisPath.params.title}/${page}`);
                        break;
                    case "findByAuthor":
                        this.$router.push(`/find/author/${thisPath.params.author}/${page}`);
                        break;
                    case "findBySeries":
                        this.$router.push(`/find/series/${thisPath.params.series}/${page}`);
                        break;
                    case "Admin.Users":
                        break;
                    default:
                        this.$router.push(`/page/${page}`)
                        break;
                }
            },
        },
        watch: {
            lang() {
                this.toPage(1)
            }
        }
    }
</script>

<style scoped>

</style>