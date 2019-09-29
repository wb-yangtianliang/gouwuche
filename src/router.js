import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({

    routes: [{
            path: "/",
            component: () =>
                import ('./views/home')
        },
        {
            path: "/gou",
            component: () =>
                import ('./views/gou')
        },
        {
            path: "/que",
            component: () =>
                import ('./views/que')
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})