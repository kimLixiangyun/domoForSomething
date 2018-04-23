//预加载插件，基于JQuery

(function($){

	function Preload(imgs,options){
		this.imgs=typeof imgs==="string"?[imgs]:imgs;
		this.options=$.extend({},Preload.DEFAULT,options);
		this._doPreUnIndex();
	}

	Preload.DEFAULT={
		each:null,
		all:null
	}

	Preload.prototype._doPreUnIndex=function(){
		var imgs=this.imgs;
			options=this.options;
		var count=0,
			len=imgs.length;
		$.each(imgs,function(i,src){
			if(typeof src !=="string") return;
			
			var imgObj=new Image();
			$(imgObj).on("load error",function(){
				options.each && options.each(count);
				
				if(count>=len-1){
					options.all && options.all();
				}

				count++;
			})
			imgObj.src=src;
		})
	}

	$.extend({
		preload:function(ims,opts){
			new Preload(ims,opts);
		}
	});
})(jQuery);