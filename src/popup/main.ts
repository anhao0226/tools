import { Component, createApp } from 'vue';
import App from './components/App.vue';
import { ElButton, ElInput, ElScrollbar, ElTabPane, ElTabs, ElForm } from 'element-plus';
import { CollectionTag, Setting, Operation, Switch, RefreshRight, ArrowDown } from '@element-plus/icons-vue'
import 'element-plus/dist/index.css';
import '@/styles/index.css';


const app = createApp(App);


[
    Setting,
    CollectionTag,
    Operation,
    Switch,
    RefreshRight,
    ArrowDown
].forEach(element => {
    app.component(`tools${element.name}`, element);
});

[
    ElTabs,
    ElTabPane,
    ElScrollbar,
    ElButton,
    ElInput,
    ElInput,
    ElForm,
].forEach((element: any) => {

    app.use(element);

});

app.mount('#app')