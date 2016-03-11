void(
	(function(){
		/*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */
		!function(t){"use strict";if(t.URL=t.URL||t.webkitURL,t.Blob&&t.URL)try{return void new Blob}catch(e){}var n=t.BlobBuilder||t.WebKitBlobBuilder||t.MozBlobBuilder||function(t){var e=function(t){return Object.prototype.toString.call(t).match(/^\[object\s(.*)\]$/)[1]},n=function(){this.data=[]},o=function(t,e,n){this.data=t,this.size=t.length,this.type=e,this.encoding=n},i=n.prototype,a=o.prototype,r=t.FileReaderSync,c=function(t){this.code=this[this.name=t]},l="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),s=l.length,u=t.URL||t.webkitURL||t,d=u.createObjectURL,f=u.revokeObjectURL,R=u,p=t.btoa,h=t.atob,b=t.ArrayBuffer,g=t.Uint8Array,w=/^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;for(o.fake=a.fake=!0;s--;)c.prototype[l[s]]=s+1;return u.createObjectURL||(R=t.URL=function(t){var e,n=document.createElementNS("http://www.w3.org/1999/xhtml","a");return n.href=t,"origin"in n||("data:"===n.protocol.toLowerCase()?n.origin=null:(e=t.match(w),n.origin=e&&e[1])),n}),R.createObjectURL=function(t){var e,n=t.type;return null===n&&(n="application/octet-stream"),t instanceof o?(e="data:"+n,"base64"===t.encoding?e+";base64,"+t.data:"URI"===t.encoding?e+","+decodeURIComponent(t.data):p?e+";base64,"+p(t.data):e+","+encodeURIComponent(t.data)):d?d.call(u,t):void 0},R.revokeObjectURL=function(t){"data:"!==t.substring(0,5)&&f&&f.call(u,t)},i.append=function(t){var n=this.data;if(g&&(t instanceof b||t instanceof g)){for(var i="",a=new g(t),l=0,s=a.length;s>l;l++)i+=String.fromCharCode(a[l]);n.push(i)}else if("Blob"===e(t)||"File"===e(t)){if(!r)throw new c("NOT_READABLE_ERR");var u=new r;n.push(u.readAsBinaryString(t))}else t instanceof o?"base64"===t.encoding&&h?n.push(h(t.data)):"URI"===t.encoding?n.push(decodeURIComponent(t.data)):"raw"===t.encoding&&n.push(t.data):("string"!=typeof t&&(t+=""),n.push(unescape(encodeURIComponent(t))))},i.getBlob=function(t){return arguments.length||(t=null),new o(this.data.join(""),t,"raw")},i.toString=function(){return"[object BlobBuilder]"},a.slice=function(t,e,n){var i=arguments.length;return 3>i&&(n=null),new o(this.data.slice(t,i>1?e:this.data.length),n,this.encoding)},a.toString=function(){return"[object Blob]"},a.close=function(){this.size=0,delete this.data},n}(t);t.Blob=function(t,e){var o=e?e.type||"":"",i=new n;if(t)for(var a=0,r=t.length;r>a;a++)Uint8Array&&t[a]instanceof Uint8Array?i.append(t[a].buffer):i.append(t[a]);var c=i.getBlob(o);return!c.slice&&c.webkitSlice&&(c.slice=c.webkitSlice),c};var o=Object.getPrototypeOf||function(t){return t.__proto__};t.Blob.prototype=o(new t.Blob)}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content||this);

		/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
		var saveAs=saveAs||function(view){"use strict";if(typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var doc=view.document,get_URL=function(){return view.URL||view.webkitURL||view},save_link=doc.createElementNS("http://www.w3.org/1999/xhtml","a"),can_use_save_link="download"in save_link,click=function(node){var event=new MouseEvent("click");node.dispatchEvent(event)},is_safari=/Version\/[\d\.]+.*Safari/.test(navigator.userAgent),webkit_req_fs=view.webkitRequestFileSystem,req_fs=view.requestFileSystem||webkit_req_fs||view.mozRequestFileSystem,throw_outside=function(ex){(view.setImmediate||view.setTimeout)(function(){throw ex},0)},force_saveable_type="application/octet-stream",fs_min_size=0,arbitrary_revoke_timeout=500,revoke=function(file){var revoker=function(){if(typeof file==="string"){get_URL().revokeObjectURL(file)}else{file.remove()}};if(view.chrome){revoker()}else{setTimeout(revoker,arbitrary_revoke_timeout)}},dispatch=function(filesaver,event_types,event){event_types=[].concat(event_types);var i=event_types.length;while(i--){var listener=filesaver["on"+event_types[i]];if(typeof listener==="function"){try{listener.call(filesaver,event||filesaver)}catch(ex){throw_outside(ex)}}}},auto_bom=function(blob){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)){return new Blob(["\ufeff",blob],{type:blob.type})}return blob},FileSaver=function(blob,name,no_auto_bom){if(!no_auto_bom){blob=auto_bom(blob)}var filesaver=this,type=blob.type,blob_changed=false,object_url,target_view,dispatch_all=function(){dispatch(filesaver,"writestart progress write writeend".split(" "))},fs_error=function(){if(target_view&&is_safari&&typeof FileReader!=="undefined"){var reader=new FileReader;reader.onloadend=function(){var base64Data=reader.result;target_view.location.href="data:attachment/file"+base64Data.slice(base64Data.search(/[,;]/));filesaver.readyState=filesaver.DONE;dispatch_all()};reader.readAsDataURL(blob);filesaver.readyState=filesaver.INIT;return}if(blob_changed||!object_url){object_url=get_URL().createObjectURL(blob)}if(target_view){target_view.location.href=object_url}else{var new_tab=view.open(object_url,"_blank");if(new_tab==undefined&&is_safari){view.location.href=object_url}}filesaver.readyState=filesaver.DONE;dispatch_all();revoke(object_url)},abortable=function(func){return function(){if(filesaver.readyState!==filesaver.DONE){return func.apply(this,arguments)}}},create_if_not_found={create:true,exclusive:false},slice;filesaver.readyState=filesaver.INIT;if(!name){name="download"}if(can_use_save_link){object_url=get_URL().createObjectURL(blob);setTimeout(function(){save_link.href=object_url;save_link.download=name;click(save_link);dispatch_all();revoke(object_url);filesaver.readyState=filesaver.DONE});return}if(view.chrome&&type&&type!==force_saveable_type){slice=blob.slice||blob.webkitSlice;blob=slice.call(blob,0,blob.size,force_saveable_type);blob_changed=true}if(webkit_req_fs&&name!=="download"){name+=".download"}if(type===force_saveable_type||webkit_req_fs){target_view=view}if(!req_fs){fs_error();return}fs_min_size+=blob.size;req_fs(view.TEMPORARY,fs_min_size,abortable(function(fs){fs.root.getDirectory("saved",create_if_not_found,abortable(function(dir){var save=function(){dir.getFile(name,create_if_not_found,abortable(function(file){file.createWriter(abortable(function(writer){writer.onwriteend=function(event){target_view.location.href=file.toURL();filesaver.readyState=filesaver.DONE;dispatch(filesaver,"writeend",event);revoke(file)};writer.onerror=function(){var error=writer.error;if(error.code!==error.ABORT_ERR){fs_error()}};"writestart progress write abort".split(" ").forEach(function(event){writer["on"+event]=filesaver["on"+event]});writer.write(blob);filesaver.abort=function(){writer.abort();filesaver.readyState=filesaver.DONE};filesaver.readyState=filesaver.WRITING}),fs_error)}),fs_error)};dir.getFile(name,{create:false},abortable(function(file){file.remove();save()}),abortable(function(ex){if(ex.code===ex.NOT_FOUND_ERR){save()}else{fs_error()}}))}),fs_error)}),fs_error)},FS_proto=FileSaver.prototype,saveAs=function(blob,name,no_auto_bom){return new FileSaver(blob,name,no_auto_bom)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(blob,name,no_auto_bom){if(!no_auto_bom){blob=auto_bom(blob)}return navigator.msSaveOrOpenBlob(blob,name||"download")}}FS_proto.abort=function(){var filesaver=this;filesaver.readyState=filesaver.DONE;dispatch(filesaver,"abort")};FS_proto.readyState=FS_proto.INIT=0;FS_proto.WRITING=1;FS_proto.DONE=2;FS_proto.error=FS_proto.onwritestart=FS_proto.onprogress=FS_proto.onwrite=FS_proto.onabort=FS_proto.onerror=FS_proto.onwriteend=null;return saveAs}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if(typeof define!=="undefined"&&define!==null&&define.amd!=null){define([],function(){return saveAs})}
		
		if(!Array.prototype.filter){
			Array.prototype.filter = function(fun){
				"use strict";

				if(this == null){
					throw new TypeError();
				}
				var t = Object(this);
				var len = t.length >>> 0;
				if(typeof fun != "function"){
					throw new TypeError();
				}
				var res = [];
				var thisp = arguments[1];
				for(var i = 0; i < len; i++){
					if(i in t){
						var val = t[i];
						if(fun.call(thisp, val, i, t)){
							res.push(val);
						}
					}
				}
				return res;
			};
		}
		function data2blob(data,isBase64){
			var chars="";
			if(isBase64){
				chars=atob(data); 
			}else{
				chars=data;
			}
			var bytes=new Array(chars.length);
			for(var i=0;i<chars.length; i++){
				bytes[i]=chars.charCodeAt(i);
			}
			var blob=new Blob([new Uint8Array(bytes)]);
			return blob;
		}
		function NewFile(name,data){
			var blob = data2blob(data);
			return saveAs(blob, name);
		}
		function Playlist(cid,pos,rets,errStr){
			var url = "/_/playlists/" + encodeURIComponent(cid) + "/media";
			var ret;
			$.get(url)
			.done(function(data){
				try{
					var response = data;
					var responseData;
					if(typeof response === "string"){
						responseData = $.parseJSON(data);
					}else{
						responseData = data;
					}
					if(typeof responseData === "object" && responseData !== null){
						var songs = responseData['data'];
						if(typeof songs === "object" && songs !== null){
							ret = responseData;
						}else{
							ret = "Could not pull this playlist's information (Playlist API response structured differently than expected)";
						}
					}else{
						ret = "Could not pull this playlist's information (Playlist API response is not in JSON format)";
					}
				}catch(err){
					ret = "Could not pull this playlist's information (Error while reading Playlist API response: " + err.message + ")";
				}
			})
			.fail(function(data){
				var err = "Could not pull this playlist's information (GET failed):\n";
				try{
					var errParse = data;
					var append = "";
					for(var key in errParse){
						if(errParse.hasOwnProperty(key)){
							var value = errParse[key];
							append = append + "\n" + String(key) + ": " + String(value);
						}
					}
					if(append === ""){
						append = "\nAn unknown error occurred (no response)";
					}
					err = err + append;
				}catch(e){
					err = err + "\nCouldn't parse error... here's the raw response instead: " + String(data);
				}
				ret = err;
			})
			.always(function(data){
				if(typeof ret !== "object" || ret === null){
					ret = errStr + String(ret);
				}
				rets[pos] = ret;
			});
		}
		$.get("/_/playlists")
		.done(function(data){
			try{
				var response = data;
				var responseData;
				if(typeof response === "string"){
					responseData = $.parseJSON(data);
				}else{
					responseData = data;
				}
				if(typeof responseData === "object" && responseData !== null){
					var playlists = responseData['data'];
					if(typeof playlists === "object" && playlists !== null){
						var len = playlists.length;
						var total = 0;
						var rets = [];
						var names = [];
						for(i = 0; i < len; i++){
							void(
								(function(i){
									var info = playlists[i];
									if(typeof info === "object" && info !== null){
										var pos = total;
										total = total + 1;
										var name = info['name'];
										var id = info['id'];
										if(typeof name === "string"){
											names[pos] = name;
											name = "\"" + name + "\"";
										}else{
											name = "[unknown name]";
											names[pos] = name;
										}
										var errStr = "Error with playlist #" + total + " " + name + ": ";
										if(Number(id) === id){
											Playlist(String(id),pos,rets,errStr);
										}else{
											rets[total] = errStr + "Could not pull this playlist's information (AllPlaylists API response did not provide this playlist's id)";
										}
									}
								}(i))
							);
						}
						function Complete(){
							var ready = rets.filter(function(ret){return ret !== undefined}).length;
							if(ready !== total){
								setTimeout(Complete,0);
							}else{
								for(i = 0; i < total; i++){
									void(
										(function(i){
											var ret = rets[i];
											if(typeof ret === "object" && ret !== null){
												var json_encode = JSON.stringify(ret);
												var name = names[i];
												NewFile(name + ".json",json_encode);
											}else if(typeof ret !== "undefined" && ret !== null){
												alert(ret);
											}else{
												alert("An unexpected error occurred: A playlist handler returned malformed results");
											}
										}(i))
									);
								}
							}
						}
						Complete();
					}else{
						alert("Could not pull your playlist information (AllPlaylists API response structured differently than expected)");
					}
				}else{
					alert("Could not pull your playlist information (AllPlaylists API response is not in JSON format)");
				}
			}catch(err){
				alert("Could not pull your playlist information (Error while reading AllPlaylists API response: " + err.message + ")");
			}
		})
		.fail(function(data){
			var err = "Could not pull your playlist information (GET failed):\n";
			try{
				var errParse = data;
				var append = "";
				for(var key in errParse){
					if(errParse.hasOwnProperty(key)){
						var value = errParse[key];
						append = append + "\n" + String(key) + ": " + String(value);
					}
				}
				if(append === ""){
					append = "\nAn unknown error occurred (no response)";
				}
				err = err + append;
			}catch(e){
				err = err + "\nCouldn't parse error... here's the raw response instead: " + String(data);
			}
			alert(err);
		});
	}())
);
