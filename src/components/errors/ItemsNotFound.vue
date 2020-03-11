<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    xs="10"
                    sm="10"
                    md="10"
                    lg="8"
            >
                <v-card class="elevation-12"
                >
                    <v-card-title>Ничего не найдено</v-card-title>
                    <v-card-text>
                        <p>Не удалось ничего найти</p>
                        <p>Попробуйте изменить параметры поиска или упростить запрос</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
    export default {
        name: "ItemsNotFount"
    }
</script>

<style scoped>

</style>