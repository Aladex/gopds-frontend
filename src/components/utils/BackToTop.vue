<template>
    <transition name="back-to-top-fade">
        <div
                class="vue-back-to-top"
                :style="`bottom:${this.bottom};right:${this.right};`"
                v-show="visible"
                @click="backToTop">

                    <v-btn
                            color="warning"
                            icon
                            dark
                            x-small
                            fab
                    ><v-icon dark>mdi-arrow-up</v-icon></v-btn>

        </div>
    </transition>
</template>

<script>

    export default {
        name: 'BackToTop',
        props: {
            visibleoffset: {
                type: [String, Number],
                default: 600,
            },
            visibleoffsetbottom: {
                type: [String, Number],
                default: 0,
            },
            right: {
                type: String,
                default: '10px',
            },
            bottom: {
                type: String,
                default: '60px',
            },
        },
        data () {
            return {
                visible: false
            }
        },
        mounted () {
            window.smoothscroll = () => {
                let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
                if (currentScroll > 0) {
                    window.requestAnimationFrame(window.smoothscroll)
                    window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
                }
            }
            window.addEventListener('scroll', this.catchScroll)
        },
        methods: {
            /**
             * Catch window scroll event
             * @return {void}
             */
            catchScroll () {
                const pastTopOffset = window.pageYOffset > parseInt(this.visibleoffset)
                const pastBottomOffset = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - parseInt(this.visibleoffsetbottom)
                this.visible = parseInt(this.visibleoffsetbottom) > 0 ? pastTopOffset && !pastBottomOffset : pastTopOffset
            },
            /**
             * The function who make the magics
             * @return {void}
             */
            backToTop () {
                window.smoothscroll()
                this.$emit('scrolled')
            }
        },
    }
</script>
<style src="./styles/btt.css"></style>