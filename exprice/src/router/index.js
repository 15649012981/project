import Vue from 'vue'
import Router from 'vue-router'
import PageIndex from '@/pages/PageIndex.vue'
import PageGameView from '@/pages/PageGameView.vue'
import PageParticles from '@/pages/PageParticles.vue'
import PageUiView from '@/pages/PageUiView.vue'
import PageThressView from '@/pages/PageThressView.vue'
import PageCanvas from '@/pages/PageCanvas.vue'
import PageProblemSlove from '@/pages/PageProblemSlove.vue'
import PageNavTab from '@/pages/PageNavTab.vue'
import PageMyself from '@/pages/PageMyself.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageIndex',
      component: PageIndex
    },
    {
      path: '/game',
      name: 'PageGameView',
      component: PageGameView
    },
    {
      path: '/particles',
      name: 'PageParticles',
      component: PageParticles
    },
    {
      path: '/ui/element',
      name: 'PageUiView',
      component: PageUiView
    },
    {
      path: '/three/view',
      name: 'PageThressView',
      component: PageThressView
    },
    {
      path: '/canvas/view',
      name: 'PageCanvas',
      component: PageCanvas
    },
    {
      path: '/problem/view',
      name: 'PageProblemSlove',
      component: PageProblemSlove
    },
    {
      path: '/animate/nav',
      name: 'PageNavTab',
      component: PageNavTab
    },
    {
      path: '/myself',
      name: 'PageMyself',
      component: PageMyself
    }

  ]
})
