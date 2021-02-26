<template>
    <v-row justify="center">
        <v-col
                class="mt-4"
                cols="10"
                lg="6"
                md="10"
                sm="10"
        >
            <v-row>
                <v-col
                        class="text-center"
                        cols="12"

                >
                    <h1>Хочется дать денег на развитие проекта?</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                        cols="12"
                >
                    <iframe allowtransparency="true"
                            frameborder="0" height="307" scrolling="no"
                            src="https://yoomoney.ru/quickpay/shop-widget?writer=seller&targets=%D0%9C%D0%BD%D0%B5%20%D0%BE%D1%87%D0%B5%D0%BD%D1%8C%20%D0%BD%D1%80%D0%B0%D0%B2%D0%B8%D1%82%D1%81%D1%8F%20%D1%82%D0%BE%2C%20%D1%87%D1%82%D0%BE%20%D1%82%D1%8B%20%D0%B4%D0%B5%D0%BB%D0%B0%D0%B5%D1%88%D1%8C!&targets-hint=&default-sum=&button-text=13&payment-type-choice=on&comment=on&hint=&successURL=&quickpay=shop&account=41001572304361"
                            width="100%"></iframe>
                </v-col>
                <v-col
                        cols="12"
                >
                    <h3>Какие расходы требуются для содержания библиотеки?</h3>
                    <ol>
                        <li>12 евро раз в три месяца на оплату VDS</li>
                        <li>Оплата интернет</li>
                        <li>Иногда я кушаю</li>
                        <li>Очень хочется добавить в библиотеку SSD на 1TB</li>
                        <li>Было бы супер, если бы мы скинулись на новое железо</li>
                    </ol>
                    <p>Больше расходов и нет.</p>
                </v-col>
                <v-col
                        class="text-center"
                        cols="12"
                >
                    <p>Есть предложения по улучшению? Напиши мне в telegram:</p>
                    <v-icon>mdi-telegram</v-icon>
                    <a href="tg://resolve?domain=aladex">@aladex</a>
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