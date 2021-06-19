import Input from './comp1/main'
import Button from './comp2/main'

const components = [
    Input,
    Button
]

// 循环注册
const install = function(Vue){
    components.forEach(item => {
        Vue.component(item.name, item)
    })
}

export default {
    install,
    Input,
    Button
}