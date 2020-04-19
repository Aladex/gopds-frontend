<template>
    <v-container
            fluid
    >
        <v-data-table
                :headers="headers"
                :items="invites"
                class="elevation-1"
        >
            <template v-slot:item.action="{ item }">
                <v-icon
                        @click="editInvite(item)"
                >
                    mdi-pencil
                </v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    export default {
        name: "Invites",
        data() {
            return {
                headers: [
                    {
                        text: 'ID',
                        align: 'start',
                        sortable: false,
                        value: 'id',
                    },
                    {text: 'Инвайт', value: 'invite', sortable: false},
                    {text: 'Действия', value: 'action', sortable: false, align: 'right'}
                ],
                invites: []
            }
        },
        methods: {
            getInvites() {
                this.$http
                    .get(`${process.env.VUE_APP_BACKEND_API_URL}api/admin/invites`)
                    .then(response => {
                        this.invites = response.data;
                    })
                    .catch(err => {
                        switch (err.response.status) {
                            case 401:
                                this.logout();
                                break;
                            case 404:
                                this.$router.push("/404");
                                break
                        }
                    });
            },
            editInvite() {},
        },
        mounted() {
            this.getInvites()
        }
    }
</script>

<style scoped>

</style>