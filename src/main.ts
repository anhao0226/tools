import { createApp } from 'vue';
import App from './App.vue';
import { ElButton, ElInput, ElPageHeader, ElScrollbar, ElTabPane, ElTabs } from 'element-plus';
import 'element-plus/dist/index.css';
import "@/styles/index.css"


const app = createApp(App);

[
    ElTabs,
    ElTabPane,
    ElScrollbar,
    ElButton,
    ElInput,
    ElPageHeader
].forEach(element => {
    app.use(element);
});

app.mount('#app')
