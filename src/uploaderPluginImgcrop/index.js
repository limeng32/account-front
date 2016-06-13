KISSY.add('uploaderPluginImgcrop', ['node','base','gallery/imgcrop/2.1/index'],function(S, require, exports, module) {
    var Node = require('node');
    var Base = require('base');
    var ImgCrop = require('gallery/imgcrop/2.1/index');
    var EMPTY = '';
    var $ = Node.all;
    function ImgCropPlugin(config) {
        var self = this;
        ImgCropPlugin.superclass.constructor.call(self, config);
        self.set('config',config);
    }
    S.extend(ImgCropPlugin, Base, {
        pluginInitializer : function(uploader) {
            if(!uploader) return false;
            var self = this;
            var config = self.get('config');
            var crop = new ImgCrop(config);
            self.set('crop',crop);
            uploader.on('success',self._successHandler,self);
            uploader.on('select',self._selectHandler,self);
            crop.on('imgload',function(){
                self.set('isRender',true);
            })
            crop.on('enddrag', function () {console.log(crop.getCropCoords());});
        },
        _successHandler:function(ev){
            var self = this;
            var crop = self.get('crop');
            var file = ev.file;
            var id = file.id;
            var url = ev.result.url;
            crop.set('url',url);
            console.log(id);
            var target = '.J_CropArea';
            var $target = $(target);
            if(!$target.length) return false;
            crop.set('areaEl',target);
            crop.container = $target;
            crop.set('areaWidth',$target.width());
            crop.set('areaHeight',$target.height());
            crop.render();
        },
        _selectHandler:function(ev){
            var self = this;
            var isRender = self.get('isRender');
            var crop = self.get('crop');
            if(!isRender) return false;
            crop.destroy();
        }
    }, {ATTRS : {
        pluginId:{
            value:'imgcrop'
        },
        isRender:{value:false},
        config:{value:{}}
    }});
    return ImgCropPlugin;
});