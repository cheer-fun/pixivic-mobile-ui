var date, page = 0 ,flag=false;

function getDay(num, str) {
    var today = new Date();
    var nowTime = today.getTime();
    var ms = 24 * 3600 * 1000 * num;
    today.setTime(parseInt(nowTime + ms));
    var oYear = today.getFullYear();
    var oMoth = (today.getMonth() + 1).toString();
    if (oMoth.length <= 1) oMoth = '0' + oMoth;
    var oDay = today.getDate().toString();
    if (oDay.length <= 1) oDay = '0' + oDay;
    return oYear + str + oMoth + str + oDay;
}

(function () {
    date = getDay(-3, '-');
    console.log(date)
}());
var
    contentDom = document.querySelector('.content'),
    wtf = null;
showList();
ajaxFun("get", "https://api.pixivic.com/d", "date=" + date + "&page=" + page, true)

function showList() {
    contentDom.innerHTML = '';
    wtf = new WaterFull('.content', {
        urlField: 'url'
    });

}

function ajaxFun(method, url, data, flag) {
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
                wtf.create(dataArr);
                page++;
            }
        }
    }
}

function restart() {
    page = 0;
    document.getElementById('wf-container').innerHTML = '';
    var info = document.getElementById('info');
    info.innerHTML = '';
    document.getElementById('loader').style.top = "0px";
    ajaxFun("get", "https://api.pixivic.com/d", "date=" + date + "&page=" + page, true);
    flag=false
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
            flag=true;
        ajaxFun("get", "https://api.pixivic.com/d", "date=" + date + "&page=" + page, true);}
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

var mySchedule = new Schedule({
    el: '#schedule-box',
    //date: '2018-9-20',
    clickCb: function (y, m, d) {
        document.querySelector('#h3Ele').innerHTML = y + '-' + m + '-' + d;
        date = y + '-' + m + '-' + d;
        restart();
    },
    nextMonthCb: function (y, m, d) {
        document.querySelector('#h3Ele').innerHTML = y + '-' + m + '-' + d
    },
    nextYeayCb: function (y, m, d) {
        document.querySelector('#h3Ele').innerHTML = y + '-' + m + '-' + d
    },
    prevMonthCb: function (y, m, d) {
        document.querySelector('#h3Ele').innerHTML = y + '-' + m + '-' + d
    },
    prevYearCb: function (y, m, d) {
        document.querySelector('#h3Ele').innerHTML = y + '-' + m + '-' + d
    }
});
document.querySelector("#calendaricon").onclick = function () {
    document.querySelector(".mask").style.display = "block";
    document.querySelector("#h3Ele").style.display = "inline";
    document.querySelector("#schedule-box").style.display = 'inline';
    document.querySelector("#schedule-box").className = 'animated fadeInUp boxshaw';
    document.querySelector("#h3Ele").className = 'animated fadeInUp boxshaw';
}
document.onclick = function (e) {
    var id = e.srcElement.id;
    if (id != "mask" && id != "calendaricon" && id != "schedule-box" && id != "prevYear" && id != "prevMonth" && id != "nextYear" && id != "nextMonth") {
        document.querySelector(".mask").style.display = "none";
        document.querySelector("#schedule-box").className = 'animated fadeOutDown boxshaw';
        document.querySelector("#h3Ele").style.display = "none";
        document.querySelector("#schedule-box").style.display = "none";
    }
};


