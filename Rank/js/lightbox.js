'use strict';
var Lightbox = function IDLightbox(elems) {
    this.elems = document.querySelectorAll(elems);
    this.current = -1;
    this.overlay;
    this.container;
    this.galId;
    this.clickHandler = this.clickHandler.bind(this);
    this.destroy = this.destroy.bind(this);
    for (var i = 0; i < this.elems.length; i++) {
        this.elems[i].addEventListener('click', this.clickHandler);
    }
    Lightbox.prototype.index++;
    // let's go!
    this.setupContentArea();
};
Lightbox.prototype.setupContentArea = function () {
    this.overlay = document.createElement('div');
    this.overlay.classList.add('id-lightbox-overlay');

    this.container = document.createElement('div');
    this.container.classList.add('id-lightbox-container');

    this.overlay.innerHTML = '<span class="id-lightbox-close"></span>';

    this.overlay.addEventListener('click', this.destroy);
    this.overlay.querySelector('.id-lightbox-close').addEventListener('click', this.destroy);
};
Lightbox.prototype.clickHandler = function (e) {
    console.log(e.currentTarget.pages)
    var _this = this;
    e.preventDefault();
    this.galId = e.currentTarget.rel;
    this.current = 0;
    e.currentTarget.pages.map(imgUrl => {
        var img = this.setupImage(imgUrl,e.currentTarget.rel);
        img.classList.add('id-lightbox-current');
        if (e.currentTarget.pages.length == 1) {
            img.classList.add('center');
        }
        this.container.appendChild(img);
    })
    this.overlay.appendChild(this.container)
    document.body.appendChild(this.overlay);
    setTimeout(function () {
        _this.container.classList.add('visible');
        _this.overlay.classList.add('visible');
    }, 50);
};
Lightbox.prototype.setupImage = function (imgSrc,link) {
    var img = new Image();
    img.src = imgSrc;
    img.classList.add('id-lightbox-image');
    img.onclick=function () {
    window.open(link);
    }
    return img;
};
Lightbox.prototype.destroy = function (e) {
    e.preventDefault();
    this.overlay.remove();
    this.container.remove();
    this.setupContentArea();
};
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Lightbox;
} else {
    window.IDLightbox = Lightbox;
}
