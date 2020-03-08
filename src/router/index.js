import Vue from 'vue'
import VueRouter from 'vue-router'
import Books from '../components/Books.vue'
import Login from '../components/auth/Login.vue'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Books',
    component: Books,
    props: {page: 1},
    meta: {
      requiresAuth: true,
      title: "Новые книги"
    }
  },
  {
    path: '/page/:page',
    name: 'page',
    component: Books,
    props: (route) => {
      const page = Number.parseInt(route.params.page, 10)
      if (Number.isNaN(page)) {
        return 1
      }
      return { page }
    },
    meta: {
      requiresAuth: true,
      title: "Новые книги"
    }
  },
  {
    path: '/find/books/:title/:page',
    name: 'findBook',
    component: Books,
    props: (route) => {
      const page = Number.parseInt(route.params.page, 10)
      if (Number.isNaN(page)) {
        return 1
      }
      return { page, title: route.params.title }
    },
    meta: {
      requiresAuth: true,
      title: "Поиск книги: "
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {checkAuth: true}
  },
  {
    path: '/logout',
    name: 'logout',
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to) => {
  let bookSearch = ""
  if (to.params.title) {
    bookSearch = to.params.title
  }
  document.title = to.meta.title + bookSearch || 'Библиотека'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    let token = localStorage.getItem('token')
    if (token == null) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {

      axios.defaults.headers.common['Authorization'] = token
      next()
    }
  } else if (to.matched.some(record => record.meta.checkAuth)) {
    let token = localStorage.getItem('token')
    if (token == null) {
      next()
    } else {

      axios.defaults.headers.common['Authorization'] = token
      next({name: 'Books'})

    }
  } else {
    next()
  }
})


export default router
