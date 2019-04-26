document.getElementById('searchbox').onkeydown=popSearch();

function popSearch() {
    var ev = window.event;
    if (ev.keyCode == 13) {
        window.open('https://m.pixivic.com/popSearch');
    }
}

function dailyRank() {
    window.open('https://m.pixivic.com/dailyRank');
}