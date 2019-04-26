;(function () {
    'use strict';

    function WaterFull(ele, opts) {
        this.ele = this._selector(ele);
        this.conWidth = this.ele.offsetWidth;
        this.defaults = {
            urlField: 'url',
            widthField: 'width',
            heightField: 'height'
        };
        this.opts = this._extend({}, this.defaults, opts);
        this._init();
    }

    WaterFull.prototype = {

        _init: function () {
            var listNode = document.createElement('div');
            listNode.id = 'wf-container';
            listNode.style.width = '100%';
            listNode.style.position = 'relative';
            listNode.style.overflow = 'hidden';
            this.$listNode = listNode;
            this.ele.appendChild(listNode);
        },

        create: function (dataArr) {
            var str = '';
            if (!dataArr.length) {
                var info = document.getElementById('info');
                info.innerHTML = '(￣ˇ￣)俺也是有底线的';
                if (num == 0)
                    document.getElementById("wf-container").style.minHeight = '10px'
                return;
            }
            str = this.createSecond(dataArr);
            this.$listNode.innerHTML += str;
            this.secondeReflows();
            let clickers = new IDLightbox('.image');
            flag = false;
        },

        createSecond: function (dataArr) {
            var url;
            var _this = this,
                result = dataArr.map(function (item, index) {
                    url = item.meta_single_page.original_image_url;
                    if (url == undefined)
                        url = item.meta_pages[0].image_urls.original;
                    url = 'https://bigimg.pixivic.com/get/' + url;
                    var height = _this._countRate(item.width, item.height) * 47 + '%';
                    return '<a href="' + url + '" alt ="\'"  class="image"  rel="https://www.pixiv.net/member_illust.php?mode=medium&illust_id='+item.id+'"><div class="wf-item wf-item-2" style="padding-bottom: ' + height + ';background-image: url(' + 'https://img.pixivic.com/get/' + item.image_urls.large.replace('_webp', '') + ');"></div></a>';
                });
            return result.join('');
        },

        secondeReflows: function () {
            var container = document.getElementById('wf-container'),
                itemList = Array.prototype.slice.call(document.getElementsByClassName('wf-item-2')),
                marginVal = this.conWidth * 0.02,
                columnHeightArr = [];

            itemList.forEach(function (item, index) {
                if (index < 2) {
                    columnHeightArr[index] = item.offsetHeight + marginVal;
                } else {
                    var minHeight = Math.min.apply(null, columnHeightArr),
                        minHeightIndex = columnHeightArr.indexOf(minHeight);

                    item.style.position = 'absolute';
                    item.style.top = minHeight + 'px';

                    if (minHeightIndex !== 0) {
                        item.style.left = '49%';
                    }

                    columnHeightArr[minHeightIndex] += item.offsetHeight + marginVal;
                }
            });

            container.style.minHeight = Math.max.apply(null, columnHeightArr) + 'px';
        },


        _countRate: function (width, height) {
            return height / width;
        },

        _extend: function () {
            var args = Array.prototype.slice.call(arguments),
                len = args.length,
                obj = null, i;

            for (i = 0; i < len; i++) {
                if (typeof(args[i]) !== 'object') {
                    break;
                }
                if (i !== 0) {
                    for (var o in args[i]) {
                        if (args[i].hasOwnProperty(o)) obj[o] = args[i][o];
                    }
                } else {
                    obj = args[0];
                }
            }

            return obj;
        },

        _selector: function (ele) {
            if (!ele) {
                return;
            }
            return document.querySelector(ele);
        }
    }

    window.WaterFull = WaterFull;

})();

//waterfull AMD Export

if (typeof module !== 'undefined') {
    module.exports = window.WaterFull;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.WaterFull;
    });
}