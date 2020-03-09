<template>
    <v-row justify="center">
        <v-col
                lg="8"
                sm="10"
        >
            <v-row justify="start">
                <v-col lg="4"
                       sm="8">
                    <v-text-field
                            v-model="localTitle"
                            label="Искать книгу по названию"
                            single-line
                            hide-details
                            @keyup.enter="findByTitle"
                    >

                    </v-text-field>
                </v-col>
                <v-col lg="2" sm="4">
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
        data () {
            return {
                localTitle: ""
            }
        },
        methods: {
            findByTitle() {
                this.$router.push(`/find/books/${this.localTitle}/1`)
            },
        }
    }
</script>

<style scoped>

</style>