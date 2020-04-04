<template>
    <v-row justify="center">
        <v-col
                cols="10"
                sm="10"
                md="10"
                lg="8"
                class="mt-4"
        >
            <v-row>
                <v-col
                    cols="12"
                >
                    <h1>Как дать денег?</h1>
                    <p>У меня для вас есть несколько вариантов</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                        cols="12"
                        xs="12"
                        sm="12"
                        md="12"
                        lg="6"
                >
                    <h2>Яндекс-Деньги</h2>
                    <p>Можно пройти по <a href="https://yasobe.ru/na/biblioteka_zhivi" target="_blank">ссылке</a></p>
                    <p>Можно просто скинуть деньги на Яндекс-кошелек: <span v-clipboard:copy="41001572304361">41001572304361</span></p>
                </v-col>
                <v-col
                        cols="12"
                        xs="12"
                        sm="12"
                        md="12"
                        lg="6"
                >
                    <h2>Альфа-Банк</h2>
                    <p>Можно сделать перевод на карту <a href="https://money.alfabank.ru/p2p/web/transfer/aaleksandrov8361" target="_blank">здесь</a></p>
                </v-col>
                <v-col cols="12">
                    <h2>Через систему быстрых платежей</h2>
                    <p>Можно сделать перевод через СБП по номеру телефона</p>
                    <p>Переводите на номер <span v-clipboard:copy="+79254710919">+79254710919</span></p>
                    <p>Среди банков выбирайте Альфа-Банк</p>
                </v-col>
            </v-row>



        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Donate"
    }
</script>

<style scoped>

</style>