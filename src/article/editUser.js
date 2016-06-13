var $ = require('node').all;
var tpl = require('./editUser-view');
var XTemplate = require('kg/xtemplate/3.3.3/runtime');
var Node = require('node');
var IO = require('io');
var Auth = require('kg/auth/2.0.6/');
var AuthMsgs = require('kg/auth/2.0.6/plugin/msgs/');
var SP = require('../smartPath/smartPath');
var IMC = require('gallery/imgcrop/2.2/');
//var Uploader = require('kg/uploader/2.0.3/index');
//var ImageUploader = require('kg/uploader/2.0.3/themes/imageUploader/index');
//var UAuth = require('kg/uploader/2.0.3/plugins/auth/auth');
var UrlsInput = require('kg/uploader/2.0.3/plugins/urlsInput/urlsInput');
var ProBars = require('kg/uploader/2.0.3/plugins/proBars/proBars');
var Filedrop = require('kg/uploader/2.0.3/plugins/filedrop/filedrop');
//var ImgCroper = require('kg/uploader/2.0.3/plugins/imgcrop/imgcrop');
var ImgCroper = require('../uploaderPluginImgcrop/index');
//var Preview = require('kg/uploader/2.0.3/plugins/preview/preview');
//var TagConfig = require('kg/uploader/2.0.3/plugins/tagConfig/tagConfig');
module.exports = {
    init: function () {

        var uploadContainer = new Node('<div>').prop({
            id: 'J_Uploader'
        });
        $('article').append(uploadContainer);
        uploadContainer.html(new XTemplate(tpl).render({
            title: 'asd',
            content: 'qwe'
        }));
        var cropContainer = new Node('<div>').prop({
            id: 'J_CropBox'
        });
        $('article').append(cropContainer);
        var imgcrop = new IMC({
            areaEl: cropContainer, //图片的容器
            areaWidth: 500, //不配置默认取容器宽度
            areaHeight: 500, //不配置默认取容器高度
            initialXY: [10, 10], //初始坐标
            initWidth: 200, //初始宽度
            initHeight: 200, //初始高度
            minHeight: 100, //最小高度
            minWidth: 100, //最小宽度
            //previewEl: "#J_PrevBox", //预览容器，不需要的话可以不配置
            touchable: true, //支持touch、pinch
            ratio: true, //固定比例缩放
            resizable: true,//可以缩放
            url: 'http://img01.taobaocdn.com/imgextra/i1/14888019145001501/T1_iIPXl8dXXXXXXXX_!!855984888-0-pix.jpg'
        });
        //imgcrop.render();
        imgcrop.on('enddrag', function () {
            console.log(imgcrop.getCropCoords());
            console.log(imgcrop.getOriginalSize());
        });

        KISSY.use('kg/uploader/2.0.3/index,kg/uploader/2.0.3/themes/imageUploader/index,kg/uploader/6.2.7/themes/imageUploader/style.css', function (S, AliUploader, ImageUploader) {
            var uploader = new AliUploader('#J_UploaderBtn', {
                action: SP.resolvedIOPath('uploadPortrait?_content=json'),
                multiple: false,
                type: ['auto'],
                name: 'Filedata'
                //filter: function (data) {
                //    debugger;
                //}
            });
            uploader.set('filter', function (data) {
                data.success = 1;
                return data;
            })
            uploader.theme(new ImageUploader({queueTarget: '#J_UploaderQueue'}));
            //uploader.plug(new plugins.Auth({
            //    max: 3,
            //    maxSize: 5120
            //}))
            var imgCrop = new ImgCroper({
                initialXY: [10, 10], //初始坐标
                initWidth: 200, //初始宽度
                initHeight: 200, //初始高度
                minHeight: 100, //最小高度
                minWidth: 100, //最小宽度
                //previewEl: "#J_PrevBox", //预览容器，不需要的话可以不配置
                touchable: true, //支持touch、pinch
                ratio: true, //固定比例缩放
                resizable: true//可以缩放
            });
            uploader.plug(new UrlsInput({target: '#J_Urls'}))
                .plug(new ProBars())
                .plug(new Filedrop())
                .plug(imgCrop)
                //.plug(new plugins.Preview())
            ;
            imgCrop.on('drag', function () {
                console.log(imgCrop.getCropCoords());
            });
            uploader.on('error', function (ev) {
                //var index = ev.index, file = ev.file;
                //服务器端返回的结果集
                //var result = ev.result;
                alert('上传失败,错误消息为');
            });
            uploader.on('success', function (ev) {
                var index = ev.index, file = ev.file;
                var id = file.id;
                //服务器端返回的结果集
                //var result = ev.result;
                console.log(id)
                console.log(index)
            });
        })
    }
    //)
    //;
}