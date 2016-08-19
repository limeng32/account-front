var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require('kg/xtemplate/3.3.3/runtime');
var Node = require('node');
var Slide = require('kg/slide/2.0.2/');
var Cutter = require('kg/cutter/2.0.0/');
var SP = require('core-front/smartPath/smartPath');
var IO = require('io');
var JSONX = require('core-front/jsonx/jsonx');
module.exports = {
    init: function () {
        var mainDiv = new Node('<div>').prop({id: 'example'});
        $('article').append(mainDiv);
        var slidesDiv = new Node('<div>').prop({id: 'slides'});
        mainDiv.append(slidesDiv);
        var containerDiv = new Node('<div>').addClass('slides_container tab-content');
        slidesDiv.append(containerDiv);
        IO.post(SP.resolvedIOPath('getGallery?_content=json'), {}, function (d) {
            d = JSONX.decode(d);
            var paginationUl = new Node('<ul>').addClass('tab-nav pagination');
            for (var i = 0; i < d.pageItems.length; i++) {
                var imageDiv = new Node('<div>').addClass('tab-pannel');
                var cutterDiv = new Node('<div>').addClass('cutter-mojo');
                var contentDiv = new Node('<a>').prop({
                    href: SP.resolvedPath('readStory/' + d.pageItems[i].story.id),
                    target: '_Blank'
                }).append(new Node('<div>').addClass('cutter-content').append(new Node('<p>').html(d.pageItems[i].story.title)).append(new Node('<span>').html(d.pageItems[i].synopsis)));
                cutterDiv.append(new Node('<img>').prop({src: d.pageItems[i].surface})).append(contentDiv);
                imageDiv.append(cutterDiv);
                containerDiv.append(imageDiv);
            }
            var preA = new Node('<a>').prop({
                href: 'javascript:void(0);'
            }).addClass('prev');
            preA.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/arrow-prev.png'}));
            var nextA = new Node('<a>').prop({
                href: 'javascript:void(0);'
            }).addClass('next');
            nextA.append(new Node('<img>').prop({src: 'http://jayli.github.io/gallery/yuislide/assets/arrow-next.png'}));
            slidesDiv.append(preA).append(nextA).append(paginationUl);
            var frameImg = new Node('<img>').prop({
                id: 'frame',
                src: 'http://jayli.github.io/gallery/yuislide/assets/example-frame.png'
            });
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
            });
            nextA.on('click', function (e) {
                e.halt();
                C.next();
            });
            var cutterDivs = KISSY.all('#slides .cutter-mojo');
            var cutterContents = KISSY.all('#slides .cutter-content');
            for (var j = 0; j < d.pageItems.length; j++) {
                var c = new Cutter(cutterDivs[j], {
                    animout_easing: 'easeOut',
                    in_speed: 0.5
                });
            }
            new Cutter(cutterDivs[d.pageItems.length], {
                animout_easing: 'easeOut',
                in_speed: 0.5
            });
            new Cutter(cutterDivs[d.pageItems.length + 1], {
                animout_easing: 'easeOut',
                in_speed: 0.5
            });
            cutterContents.on('mouseover', function (e) {
                C.stop();
            }).on('mouseout', function (e) {
                C.play();
            });
        }, "json");
    }
}