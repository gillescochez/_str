(function(){var f=Array.prototype.slice,h=function(i){return new h.init(i)};h.init=function(i){this[0]=i;return this};h.fn=h.init.prototype;function g(k,j){var i,l,m;for(i in j){l=k[i];m=j[i];if(k===m){continue}if(m!==undefined){k[i]=m}}return k}function e(m,l){if(typeof m==="string"){m=m.split(" ")}var j=m.length||0,k=0;for(;k<j;k++){l(k,m[k])}}function b(i){return typeof i==="string"}function a(i){return typeof i==="object"}function d(i){return typeof i==="boolean"}function c(i){if(a(i)){return i.constructor==Array}else{return false}}g(h.fn,{manip:function(){this[0]=this["_"+arguments[0]].apply(this,f.call(arguments,1));return this},end:function(){return this[0]},_eq:function(i){return this[0].substr(i,1)},_low:function(){return this[0].toLowerCase()},_lowFirst:function(){return this[0].charAt(0).toLowerCase()+this[0].substr(1)},_lowFirstAll:function(){return this[0].replace(/^([A-Z])|\s+([A-Z])/g,function(i){return i.toLowerCase()})},_up:function(){return this[0].toUpperCase()},_upFirst:function(){return this[0].charAt(0).toUpperCase()+this[0].substr(1)},_upFirstAll:function(){return this[0].replace(/^([a-z])|\s+([a-z])/g,function(i){return i.toUpperCase()})},_rtrim:function(){return this[0].replace(/[ \\s\u00A0]+$/g,"")},_ltrim:function(){return this[0].replace(/^[ \\s\u00A0]+/g,"")},_trim:function(){return this[0].replace(/^\s+|\s+$/g,"")},_reverse:function(){return this[0].split("").reverse().join("")},_replace:function(o,p,m){var k,n,j,l;if(d(p)){m=p}if(b(o)&&b(p)){if(m){o=new RegExp(o,"gi")}return this[0].replace(o,p)}if(c(o)&&c(p)){for(l=0,j=o.length;l<j;l++){this[0]=this._replace(o[l],p[l],m)}}if(a(o)&&!a(p)){for(k in o){if(m){n=new RegExp(k,"gi")}else{n=k}this[0]=this[0].replace(n,o[k])}}return this[0]},_replaceAll:function(){var i=f.call(arguments);i.push(true);return this._replace.apply(this,i)},_remove:function(i){return this[0].replace(i,"")},_removeAll:function(i){return this._replace(i,"",true)},_append:function(i){return this[0]+i},_prepend:function(i){return i+this[0]}});e("eq low lowFirst lowFirstAll up upFirst upFirstAll rtrim ltrim trim reverse replace replaceAll remove removeAll append prepend",function(j,k){h.fn[k]=function(){var i=f.call(arguments);i.unshift(k);return this.manip.apply(this,i)}});g(h.fn,{_nl2br:function(){return this[0].replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1<br />")},_stripTags:function(k){k=(((k||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g)||[]).join("");var i=/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,j=/<!--[\s\S]*?-->/gi;return this[0].replace(j,"").replace(i,function(m,l){return k.indexOf("<"+l.toLowerCase()+">")>-1?m:""})}});e("nl2br stripTags",function(j,k){h.fn[k]=function(){return this.manip(k)}});window._str=h})();