var r=require("path"),n=require("fs-extra"),t=/^(.*)\/\*(\?importer=(.+)){0,1}$/;module.exports=function(){return{name:"dir-import",resolveId:function(n,e){return new Promise(function(u,i){return n.match(t)?u(r.join(r.dirname(e),n)+"?importer="+e):u(null)})},load:function(e){for(var u=[],i=arguments.length-1;i-- >0;)u[i]=arguments[i+1];return new Promise(function(u,i){var o,a,c,s,f;return(o=e.match(t))?(c=o[3],n.readdir(a=o[1]).then(function(n){var t=this;try{return s=[],f="",Promise.all(n.filter(function(n){return[".js",".ts",".json",".jsx",".tsx"].includes(r.extname(n))}).map(function(n){return new Promise(function(t,e){var u,i;return u="a"+Math.random().toString(36).substring(7),this.resolveId(r.join(a,n)).then(function(r){try{return(i=r)!==c&&(f+="import { default as "+u+' } from "'+i+'";\n',s.push(u)),t()}catch(r){return e(r)}},e)}.bind(t))})).then(function(r){try{return f+="export default ["+s.join(",")+"];\n",u(f)}catch(r){return i(r)}},i)}catch(r){return i(r)}},i)):u(null)})}}};
//# sourceMappingURL=rollup-plugin-dir-import.js.map
