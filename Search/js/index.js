/**
 * Created by Administrator on 2015/10/25.
 */
var keyword = 'saber', page = 0,
    url = 'https://api.pixivic.com',flag=false,
    contentDom = document.querySelector('.content'),
    wtf = null;
if (window.opener) {
    if (window.opener.document.getElementById("searchbox").value) {
        keyword = window.opener.document.getElementById("searchbox").value;
        document.getElementById("search-box").value = keyword;
    }
}
ajax("get", url + "/s", "keyword=" + keyword + "&page=" + page, true)
showList();
getTags();

function showList() {
    contentDom.innerHTML = '';
    wtf = new WaterFull('.content', {
        urlField: 'url'
    });
}

function ajax(method, url, data, flag) {
    var dataArr = null;
    var xhr = null,
        method = method.toUpperCase();
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    if (method == "GET") {
        xhr.open(method, url + '?' + data, flag);
        xhr.send();
    } else if (method == "POST") {
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                dataArr = JSON.parse(xhr.responseText);
                dataArr = dataArr.illusts;
                wtf.create(dataArr);
                page++;
            }
        }
    }
}
function ajax2(method, url, data, flag) {
    var dataArr = null;
    var xhr = null,
        method = method.toUpperCase();
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    if (method == "GET") {
        xhr.open(method, url + '?' + data, flag);
        xhr.send();
    } else if (method == "POST") {
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
               showtags(xhr.responseText);


            }
        }
    }
}



function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

window.addEventListener('scroll', choke(add, 100));

function add() {
    if (getScrollTop() + getClientHeight() >= getScrollHeight() - 200) {
        if(!flag){
         flag = true;
        ajax("get", url + "/s", "keyword=" + keyword + "&page=" + page, true);}
    }
}

function choke(func, wait) {
    var lastTime = 0;
    return function () {
        var _self = this,
            _arg = arguments;
        var nowTime = Date.now();
        if (nowTime - lastTime > wait) {
            func.apply(_self, _arg);
            lastTime = nowTime;
        }
    }
}
function restart() {
    page = 0;
    document.getElementById('wf-container').innerHTML = '';
    var info = document.getElementById('info');
    info.innerHTML = '';
    document.getElementById('loader').style.top = "0px";
    flag=false;
}
function search(){
    var ev = window.event;
    if(ev.keyCode == 13) {
        keyword=document.getElementById('search-box').value;
        // console.log(document.getElementById('Search-value').value)
        restart();
        ajax("get", url + "/s", "keyword=" + keyword + "&page=" + page, true);
        getTags();
    }
}
function getTags() {
    ajax2("get",  url+"/t", "keyword=" + keyword, showtags, true);
}

function showtags(data) {
    var data = JSON.parse(data);
    var str = '';
    for (var i = 0, len = data.length; i < len; i++) {
        str += '<div class="slide-item"> <div class="title" onclick="research(this)">' + data[i].tag + '</div><div class="des">' + data[i].tag_translation + '</div></div>';
    }
    document.getElementById('tags').innerHTML = str;
}
function research(tag) {
    keyword = tag.innerHTML;
    document.getElementById('search-box').value= keyword;
    restart();
    ajax("get", url + "/s", "keyword=" + keyword + "&page=" + page, true);
    getTags();
}



