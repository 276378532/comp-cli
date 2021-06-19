import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import hljs from 'highlight.js';
import 'highlight.js/styles/color-brewer.css'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import syqd from '../packages/index'
Vue.use(syqd)

// import './assets/less/index.less'
// 引入demo-block
import DemoBlock from '../examples/components/demoBlock'
Vue.component('demo-block', DemoBlock)
 
router.afterEach(route => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
