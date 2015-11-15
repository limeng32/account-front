var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require('kg/xtemplate/3.3.3/runtime');
var Node = require('node');
var Slide = require('kg/slide/2.0.2/');
module.exports = {
    init: function () {
        var mainDiv = new Node('<div>').prop({id: 'example'});
        $('article').append(mainDiv);
        var slidesDiv = new Node('<div>').prop({id: 'slides'});
        mainDiv.append(slidesDiv);
        var containerDiv = new Node('<div>').addClass('slides_container tab-content');
        slidesDiv.append(containerDiv);
        var imageDiv1 = new Node('<div>').addClass('tab-pannel');
        imageDiv1.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/slide-1.jpg'}));
        var imageDiv2 = new Node('<div>').addClass('tab-pannel');
        imageDiv2.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/slide-2.jpg'}));
        var imageDiv3 = new Node('<div>').addClass('tab-pannel');
        imageDiv3.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/slide-3.jpg'}));
        var imageDiv4 = new Node('<div>').addClass('tab-pannel');
        imageDiv4.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/slide-4.jpg'}));
        var imageDiv5 = new Node('<div>').addClass('tab-pannel');
        imageDiv5.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/slide-5.jpg'}));
        containerDiv.append(imageDiv1).append(imageDiv2).append(imageDiv3).append(imageDiv4).append(imageDiv5);
        var preA = new Node('<a>').prop({
            href: 'javascript:void(0);'
        }).addClass('prev');
        preA.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/arrow-prev.png'}));
        var nextA = new Node('<a>').prop({
            href: 'javascript:void(0);'
        }).addClass('next');
        nextA.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/arrow-next.png'}));
        var paginationUl = new Node('<ul>').addClass('tab-nav pagination')
        paginationUl.append(new Node('<li>').append(new Node('<a>').prop({
            href: 'javascript:void(0);'
        }).html('1'))).append(new Node('<li>').append(new Node('<a>').prop({
            href: 'javascript:void(0);'
        }).html('2'))).append(new Node('<li>').append(new Node('<a>').prop({
            href: 'javascript:void(0);'
        }).html('3'))).append(new Node('<li>').append(new Node('<a>').prop({
            href: 'javascript:void(0);'
        }).html('4'))).append(new Node('<li>').append(new Node('<a>').prop({
            href: 'javascript:void(0);'
        }).html('5')));
        slidesDiv.append(preA).append(nextA).append(paginationUl);
        var frameImg = new Node('<img>').prop({
            id: 'frame',
            src: 'http://jayli.github.io/gallery/yuislide/assets/example-frame.png'
        })
        mainDiv.append(frameImg);
        var C = new Slide('slides', {
            autoSlide: true,
            effect: 'hSlide',
            timeout: 3000,
            speed: 700,
            eventType: 'mouseover',
            triggerDelay: 400,
            selectedClass: 'current',
            carousel: true,
            touchmove: true,
            invisibleStop: true
        });
        preA.on('click', function (e) {
            e.halt();
            C.previous().stop().play();
        })
        nextA.on('click', function (e) {
            e.halt();
            C.next();
        })
        KISSY.all('#slides .tab-pannel').on('click', function () {
            alert(22);
        });
    }
}