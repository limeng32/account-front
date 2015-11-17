var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require('kg/xtemplate/3.3.3/runtime');
var Node = require('node');
var Slide = require('kg/slide/2.0.2/');
var Cutter = require('kg/cutter/2.0.0/');
module.exports = {
    init: function () {
        var mainDiv = new Node('<div>').prop({id: 'example'});
        $('article').append(mainDiv);
        var slidesDiv = new Node('<div>').prop({id: 'slides'});
        mainDiv.append(slidesDiv);
        var containerDiv = new Node('<div>').addClass('slides_container tab-content');
        slidesDiv.append(containerDiv);
        var imageDiv1 = new Node('<div>').addClass('tab-pannel');
        var cutterDiv1 = new Node('<div>').addClass('cutter-mojo');
        var contentDiv1 = new Node('<div>').addClass('cutter-content').append(new Node('<p>').html('自举')).append(new Node('<span>').html('一个关于本网站如何诞生的故事'));
        cutterDiv1.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/slide-1.jpg'})).append(contentDiv1);
        imageDiv1.append(cutterDiv1);
        var imageDiv2 = new Node('<div>').addClass('tab-pannel');
        var cutterDiv2 = new Node('<div>').addClass('cutter-mojo');
        var contentDiv2 = new Node('<div>').addClass('cutter-content').append(new Node('<p>').html('项目二')).append(new Node('<span>').html('待补充……'));
        cutterDiv2.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/slide-2.jpg'})).append(contentDiv2);
        imageDiv2.append(cutterDiv2);
        var imageDiv3 = new Node('<div>').addClass('tab-pannel');
        var cutterDiv3 = new Node('<div>').addClass('cutter-mojo');
        var contentDiv3 = new Node('<div>').addClass('cutter-content').append(new Node('<p>').html('项目三')).append(new Node('<span>').html('待补充……'));
        cutterDiv3.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/slide-3.jpg'})).append(contentDiv3);
        imageDiv3.append(cutterDiv3);
        var imageDiv4 = new Node('<div>').addClass('tab-pannel');
        var cutterDiv4 = new Node('<div>').addClass('cutter-mojo');
        var contentDiv4 = new Node('<div>').addClass('cutter-content').append(new Node('<p>').html('项目四')).append(new Node('<span>').html('待补充……'));
        cutterDiv4.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/slide-4.jpg'})).append(contentDiv4);
        imageDiv4.append(cutterDiv4);
        var imageDiv5 = new Node('<div>').addClass('tab-pannel');
        var cutterDiv5 = new Node('<div>').addClass('cutter-mojo');
        var contentDiv5 = new Node('<div>').addClass('cutter-content').append(new Node('<p>').html('项目五')).append(new Node('<span>').html('待补充……'));
        cutterDiv5.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/slide-5.jpg'})).append(contentDiv5);
        imageDiv5.append(cutterDiv5);
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
        var cutterDivs = KISSY.all('#slides .cutter-mojo');
        var cutterContents = KISSY.all('#slides .cutter-content');
        cutterContents.on('mouseover', function (e) {
            C.stop();
        }).on('mouseout', function (e) {
            C.play();
        });
        new Cutter(cutterDivs[1], {
            animout_easing: 'easeOut',
            in_speed: 0.3
        });
        new Cutter(cutterDivs[2], {
            animout_easing: 'easeOut',
            in_speed: 0.3
        });
        new Cutter(cutterDivs[3], {
            animout_easing: 'easeOut',
            in_speed: 0.3
        });
        new Cutter(cutterDivs[4], {
            animout_easing: 'easeOut',
            in_speed: 0.3
        });
        new Cutter(cutterDivs[5], {
            animout_easing: 'easeOut',
            in_speed: 0.3
        });
    }
}