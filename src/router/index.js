import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/auth/Login.vue'
import NotFound from '../components/errors/NotFound.vue'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Books',
    component: () => import(/* webpackChunkName: "books" */ '../components/Books.vue'),
    props: {
      page: 1,
      searchBar: true
    },
    meta: {
      requiresAuth: true,
      title: "Новые книги",
    }
  },
  {
    path: '/page/:page',
    name: 'page',
    component: () => import(/* webpackChunkName: "books" */ '../components/Books.vue'),
    props: (route) => {
      const page = Number.parseInt(route.params.page, 10)
      if (Number.isNaN(page)) {
        return 1
      }
      return { page, searchBar: true }
    },
    meta: {
      requiresAuth: true,
      title: "Новые книги",
    }
  },
  {
    path: '/find/books/:title/:page',
    name: 'findBook',
    component: () => import(/* webpackChunkName: "books" */ '../components/Books.vue'),
    props: (route) => {
      const page = Number.parseInt(route.params.page, 10)
      if (Number.isNaN(page)) {
        return 1
      }
      return { page, title: route.params.title, searchBar: true }
    },
    meta: {
      requiresAuth: true,
      title: "Поиск книги: ",
    }
  },
  {
    path: '/find/author/:author/:page',
    name: 'findByAuthor',
    component: () => import(/* webpackChunkName: "books" */ '../components/Books.vue'),
    props: (route) => {
      const page = Number.parseInt(route.params.page, 10)
      if (Number.isNaN(page)) {
        return 1
      }
      return { page, author: route.params.author, searchBar: true }
    },
    meta: {
      requiresAuth: true,
      title: "Книги по автору",
    }
  },
  {
    path: '/find/series/:series/:page',
    name: 'findBySeries',
    component: () => import(/* webpackChunkName: "books" */ '../components/Books.vue'),
    props: (route) => {
      const page = Number.parseInt(route.params.page, 10)
      if (Number.isNaN(page)) {
        return 1
      }
      return { page, series: route.params.series, searchBar: true }
    },
    meta: {
      requiresAuth: true,
      title: "Книги по серии",
    }
  },
  {
    path: '/authors/:title/:page',
    name: 'findAuthor',
    component: () => import(/* webpackChunkName: "authors" */ '../components/Authors.vue'),
    props: (route) => {
      const page = Number.parseInt(route.params.page, 10)
      if (Number.isNaN(page)) {
        return 1
      }
      return { page, author: route.params.title, searchBar: true }
    },
    meta: {
      requiresAuth: true,
      title: "Поиск автора: ",
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { checkAuth: true, title: "Вход в библиотеку" }
  },
  {
    path: '/logout',
    name: 'logout',
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: "Страница не найдена" }
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
