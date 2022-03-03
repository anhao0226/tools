const template = `
<div class="tools-container">
    <div class="tools-content">
        <div class="tools-text">
            <span>{{text}}</span>
        </div>
        <div class="tools-action _action">
            <span>
                <svg @click="handleMark" class="qt_icon" width="20" height="20" viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg" data-v-042ca774="">
                    <path v-if="iconState" fill="#f7ba2a"
                        d="M283.84 867.84L512 747.776l228.16 119.936a6.4 6.4 0 009.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 00-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 00-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 00-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 009.28 6.72z">
                    </path>
                    <path v-else fill="#909399"
                        d="M512 747.84l228.16 119.936a6.4 6.4 0 009.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 00-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 00-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 00-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 009.28 6.72L512 747.84zM313.6 924.48a70.4 70.4 0 01-102.144-74.24l37.888-220.928L88.96 472.96A70.4 70.4 0 01128 352.896l221.76-32.256 99.2-200.96a70.4 70.4 0 01126.208 0l99.2 200.96 221.824 32.256a70.4 70.4 0 0139.04 120.064L774.72 629.376l37.888 220.928a70.4 70.4 0 01-102.144 74.24L512 820.096l-198.4 104.32z">
                    </path>
                </svg>
            </span>
            <span>
                <svg v-if="copied" @click="copyText" class="icon" width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774="">
                    <path fill="#f7ba2a" d="M768 832a128 128 0 01-128 128H192A128 128 0 0164 832V384a128 128 0 01128-128v64a64 64 0 00-64 64v448a64 64 0 0064 64h448a64 64 0 0064-64h64z">
                    </path>
                    <path fill="#f7ba2a" d="M384 128a64 64 0 00-64 64v448a64 64 0 0064 64h448a64 64 0 0064-64V192a64 64 0 00-64-64H384zm0-64h448a128 128 0 01128 128v448a128 128 0 01-128 128H384a128 128 0 01-128-128V192A128 128 0 01384 64z">
                    </path>
                </svg>
                <svg v-else @click="copyText" class="icon" width="20" height="20" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774="">
                    <path fill="#909399" d="M768 832a128 128 0 01-128 128H192A128 128 0 0164 832V384a128 128 0 01128-128v64a64 64 0 00-64 64v448a64 64 0 0064 64h448a64 64 0 0064-64h64z">
                    </path>
                    <path fill="#909399" d="M384 128a64 64 0 00-64 64v448a64 64 0 0064 64h448a64 64 0 0064-64V192a64 64 0 00-64-64H384zm0-64h448a128 128 0 01128 128v448a128 128 0 01-128 128H384a128 128 0 01-128-128V192A128 128 0 01384 64z">
                    </path>
                </svg>
            </span>
            
        </div>
    </div>
    <div class="tools-content">
        <div class="tools-text tools-result">
            <span>{{result}}</span>
        </div>
        <div class="tools-action">
            <el-select style="width:100%" @change="changeLanguage" v-model="currToLanguage" class="m-2"
                placeholder="Select" size="small">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>
</div>`;



class _Node {

    root = null;
    top = 0;
    left = 0;

    constructor(el) {
        this.root = document.createElement("div");
        this.root.setAttribute("id", el);
    }

    move(x, y) {
        this.top = y;
        this.left = x;
        this.root.style.top = `${y}px`;
        this.root.style.left = `${x}px`;
    }

    show(state) {
        this.root.style.display = state ? "block" : "none";
    }
}

const rootNode = new _Node("qt_wrap");

function handleText(text) {
    return text.trim();
}


function initVue(name) {
    const App = {
        template: template,
        data() {
            return {
                text: "Text",
                result: "Result",
                currToLanguage: "zh",
                loading: true,
                copied: false,
                iconState: false,
                keys: {},
                scrollTop: 0,
                collectedWords: null,
                options: [
                    {
                        label: "中文",
                        value: "zh"
                    },
                    {
                        label: "日文",
                        value: "jp"
                    },
                    {
                        label: "繁体中文",
                        value: "cht"
                    },
                    {
                        label: "韩语",
                        value: "kor"
                    }
                ]
            }
        },

        methods: {

            hasOwn(o, key) {
                return o && Object.prototype.hasOwnProperty.call(o, key);
            },

            LoadCache() {
                // 本地 网络
                chrome.storage.sync.get({ "qt_words": [] }, (item) => {
                    const words = item.qt_words;
                    console.log(words);
                    words.forEach(_item => {
                        this.keys[_item.content] = _item.state;
                    });
                    this.collectedWords = words;
                    console.log(this.collectedWords);
                })
            },

            copyText(e) {
                navigator.clipboard.writeText(this.text).then(() => {
                    this.copied = true;
                })
            },

            handleMark() {
                if (!this.hasOwn(this.keys, this.text)) {
                    this.iconState = true;
                    this.collectedWords.push({
                        result: this.result,
                        timestamp: Date.now(),
                        state: true,
                        content: this.text
                    });
                    this.keys[this.text] = true;
                    chrome.storage.sync.set({ "qt_words": [...this.collectedWords] }, () => {
                        console.log("save");
                    })

                    const url = "http://123.57.239.39/api/user/collect"
                    const type = "mark";
                    const data = {
                        user: "ace8ae33-3e43-11ec-81cd-0242ac110002",
                        content: this.text,
                        timestamp: Date.now(),
                        text: this.result,
                    }
                    chrome.runtime.sendMessage({ url, type, data });
                }
            },

            fetchTranslateResult(text, callback) {
                const sendData = {
                    type: "words",
                    method: "GET",
                    params: { from: "en", to: this.currToLanguage, q: text }
                }
                chrome.runtime.sendMessage(sendData, (res) => {
                    console.log()
                });
                chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                    const result = request.trans_result[0].dst;
                    callback(result);
                    sendResponse("0");
                });
            },

            changeLanguage(value) {
                this.currToLanguage = value;
                this.fetchTranslateResult(this.text.toLowerCase(), (result) => {
                    this.result = result;
                })
            },

            extractWords(text) {
                text = text + "%";
                textLen = text.length;
                const words = [];
                let start = 0;
                for (let i = 0; i < textLen; i++) {
                    if ((text[i] < 'a' || text[i] > 'z')
                        && (text[i] < 'A' || text[i] > 'Z')) {
                        if (i - start > 0) {
                            words.push(text.substring(start, i));
                        }
                        start = i + 1;
                    }
                }
                return words;
            }
        },

        mounted() {
            this.LoadCache();
            rootNode.root.addEventListener("click", (e) => {
                e.stopPropagation();
            })

            document.addEventListener("scroll", () => {
                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                rootNode.move(rootNode.left, rootNode.top - scrollTop + this.scrollTop);
                this.scrollTop = scrollTop;
            })

            document.body.addEventListener("click", (e) => {
                this.iconState = false;
                this.copied = false;
                if (window.getSelection) {
                    const textObj = window.getSelection();
                    this.text = handleText(textObj.toString())

                    if (this.hasOwn(this.keys, this.text)) {
                        this.iconState = true;
                    }

                    const words = this.extractWords(this.text);
                    if (words.length > 0) {
                        const textInfo = textObj.getRangeAt(0).getBoundingClientRect();
                        const x = textInfo.x;
                        const y = textInfo.y;
                        const h = textInfo.height;
                        rootNode.show(true);
                        rootNode.move(x, y + h + 10);
                        this.fetchTranslateResult(words.join(" ").toLowerCase(), (result) => {
                            this.result = result;
                        })
                    } else {
                        rootNode.show(false);
                    }
                }
            });
        },
    }

    const app = Vue.createApp(App);
    app.use(ElementPlus, { zIndex: 10001 });
    app.mount(`#${name}`);
}


document.body.appendChild(rootNode.root);
initVue("qt_wrap");






