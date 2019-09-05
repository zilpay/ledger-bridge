(function(e){function t(t){for(var r,u,o=t[0],s=t[1],c=t[2],d=0,p=[];d<o.length;d++)u=o[d],Object.prototype.hasOwnProperty.call(a,u)&&a[u]&&p.push(a[u][0]),a[u]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);l&&l(t);while(p.length)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},a={app:0},i=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],s=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var l=s;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1:function(e,t){},"1c0d":function(e,t,n){},2:function(e,t){},2463:function(e,t,n){"use strict";(function(e){n.d(t,"a",function(){return v});n("6b54");var r=n("d225"),a=n("b0b4"),i=n("dabe").encodeTransactionProto,u=n("a051"),o=u.BN,s=u.Long,c=n("443e"),l=(c.compressPublicKey,n("e094")),d=224,p={getVersion:1,getPublickKey:2,getPublicAddress:2,signTxn:4},f=33,h=64,m="zil".length+1+32+6,v=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"w0w";Object(r["a"])(this,t),this.transport=e,e.decorateAppAPIMethods(this,["getVersion","getPublicKey","getPublicAddress","signHash","signTxn"],n)}return Object(a["a"])(t,[{key:"getVersion",value:function(){var e=0,t=0;return this.transport.send(d,p.getVersion,e,t).then(function(e){for(var t="v",n=0;n<3;++n)t+=parseInt("0x"+e[n]),2!==n&&(t+=".");return{version:t}})}},{key:"getPublicKey",value:function(t){var n=0,r=0,a=e.alloc(4);return a.writeInt32LE(t),this.transport.send(d,p.getPublickKey,n,r,a).then(function(e){var t=e.toString("hex").slice(0,2*f);return{publicKey:t}})}},{key:"getPublicAddress",value:function(t){var n=0,r=1,a=e.alloc(4);return a.writeInt32LE(t),this.transport.send(d,p.getPublicAddress,n,r,a).then(function(e){var t=e.slice(f,f+m).toString("utf-8");return{pubAddr:t}})}},{key:"signTxn",value:function(t,n){var r=0,a=0,u=e.alloc(4);u.writeInt32LE(t),n.amount instanceof o||(n.amount=new o(n.amount)),n.gasPrice instanceof o||(n.gasPrice=new o(n.gasPrice)),n.gasLimit instanceof s||(n.gasLimit=s.fromNumber(n.gasLimit));var c=i(n),f=JSON.stringify({"Encoded transaction":c.toString("hex")},null,2);console.log(l.green(f));var m,v=32;c.length>v?(m=c.slice(0,v),c=c.slice(v,void 0)):(m=c,c=e.alloc(0));var g=e.alloc(4);g.writeInt32LE(m.length);var b=e.alloc(4);b.writeInt32LE(c.length);var x=e.concat([u,b,g,m]),y=this.transport;return y.send(d,p.signTxn,r,a,x).then(function t(n){if(c.length>0){var r;c.length>v?(r=c.slice(0,v),c=c.slice(v,void 0)):(r=c,c=e.alloc(0));var a=e.alloc(4);a.writeInt32LE(r.length),b.writeInt32LE(c.length);var i=e.concat([b,a,r]);return y.exchange(i).then(t)}return n}).then(function(e){return{sig:e.toString("hex").slice(0,2*h)}})}}]),t}()}).call(this,n("b639").Buffer)},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container mb-5",attrs:{id:"app"}},[n("h1",{staticClass:"text-warning text-center pt-5"},[e._v("Testing U2F API")]),n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-auto"},[n("GetInfo",{attrs:{form:e.getAddress.form,btnText:e.getAddress.btnText},on:{call:e.getAddressForm}}),n("GetInfo",{attrs:{form:e.getAddress.form,btnText:e.getPublicKey.btnText},on:{call:e.getPublicKeyForm}}),n("Button",{nativeOn:{click:function(t){return e.getVersion(t)}}},[e._v(e._s(e.version))])],1),n("div",{staticClass:"col-lg-12"},[n("h2",{staticClass:"mt-5"},[e._v("Sign Transaction")]),n("Tx",{on:{call:e.sendTxForm}})],1)]),n("b-modal",{ref:e.modal,attrs:{"hide-footer":"",title:""}},[n("tree-view",{staticClass:"p-2",attrs:{data:e.result,options:e.treeViewOptions}})],1)],1)},i=[],u=(n("456d"),n("ac6a"),n("96cf"),n("3b8d")),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Form",{attrs:{type:e.form.type,placeholder:e.form.placeholder,value:e.form.value,lable:e.form.lable},model:{value:e.index,callback:function(t){e.index=t},expression:"index"}},[n("Button",{nativeOn:{click:function(t){return e.onClick(t)}}},[e._v(e._s(e.btnText))])],1)],1)},s=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("button",{staticClass:"btn text-uppercase",class:e.className,attrs:{type:"button"}},[e._t("default")],2)])},l=[],d={name:"Button",props:{className:{type:String,default:"btn-primary"}}},p=d,f=n("2877"),h=Object(f["a"])(p,c,l,!1,null,null,null),m=h.exports,v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"input-group mb-3 p-3"},[n("div",{staticClass:"input-group-prepend"},[n("span",{staticClass:"input-group-text",attrs:{id:e.uuid}},[e._v(e._s(e.lable))])]),"checkbox"===e.type?n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputValue,expression:"inputValue"}],staticClass:"form-control",attrs:{placeholder:e.placeholder,for:e.uuid,type:"checkbox"},domProps:{checked:Array.isArray(e.inputValue)?e._i(e.inputValue,null)>-1:e.inputValue},on:{change:[function(t){var n=e.inputValue,r=t.target,a=!!r.checked;if(Array.isArray(n)){var i=null,u=e._i(n,i);r.checked?u<0&&(e.inputValue=n.concat([i])):u>-1&&(e.inputValue=n.slice(0,u).concat(n.slice(u+1)))}else e.inputValue=a},e.onInput]}}):"radio"===e.type?n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputValue,expression:"inputValue"}],staticClass:"form-control",attrs:{placeholder:e.placeholder,for:e.uuid,type:"radio"},domProps:{checked:e._q(e.inputValue,null)},on:{change:[function(t){e.inputValue=null},e.onInput]}}):n("input",{directives:[{name:"model",rawName:"v-model",value:e.inputValue,expression:"inputValue"}],staticClass:"form-control",attrs:{placeholder:e.placeholder,for:e.uuid,type:e.type},domProps:{value:e.inputValue},on:{change:e.onInput,input:function(t){t.target.composing||(e.inputValue=t.target.value)}}}),e._t("default")],2)},g=[],b=(n("c5f6"),n("1b00")),x=n.n(b),y={name:"Form",props:{type:{type:String,default:"text"},lable:String,placeholder:String,value:String|Number},data:function(){return{uuid:x()(),inputValue:null}},methods:{onInput:function(e){var t=e.target.value;isNaN(t)||(t=Number(t)),"undefined"!==typeof t&&this.$emit("input",t)}},mounted:function(){this.inputValue=this.value}},w=y,O=Object(f["a"])(w,v,g,!1,null,null,null),k=O.exports,P={name:"GetInfo",props:{btnText:String,form:Object},components:{Button:m,Form:k},data:function(){return{index:0}},methods:{onClick:function(){this.$emit("call",this.index)}}},_=P,V=Object(f["a"])(_,o,s,!1,null,null,null),j=V.exports,T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._l(e.forms,function(t){return n("Form",{key:t.uuid,attrs:{type:t.type,placeholder:t.placeholder,value:t.value,lable:t.lable},model:{value:t.value,callback:function(n){e.$set(t,"value",n)},expression:"form.value"}})}),n("tree-view",{staticClass:"p-5",attrs:{data:e.data.value,options:e.treeViewOptions}}),n("Button",{attrs:{className:"btn-primary btn-lg btn-block"},nativeOn:{click:function(t){return e.send(t)}}},[e._v("\n    "+e._s(e.buttonText.value)+"\n  ")])],2)},A=[],L=n("a165"),K={name:"Tx",components:{Form:k,Button:m},data:function(){return{keysParams:Object.keys(L),forms:{index:{type:"number",placeholder:"network version",value:0,lable:"hwIndex:",uuid:x()()},version:{type:"number",placeholder:"network version",value:L.version,lable:"version:",uuid:x()()},nonce:{type:"number",placeholder:"address nonce",value:L.nonce,lable:"nonce:",uuid:x()()},toAddr:{type:"string",placeholder:"change to address",value:L.toAddr,lable:"to address:",uuid:x()()},amount:{type:"string",placeholder:"send amount",value:L.amount,lable:"amount:",uuid:x()()},pubKey:{type:"string",placeholder:"your publickKey",value:L.pubKey,lable:"pubKey:",uuid:x()()},gasPrice:{type:"string",placeholder:"tx gasPrice",value:L.gasPrice,lable:"gasPrice:",uuid:x()()},gasLimit:{type:"string",placeholder:"tx gasLimit",value:L.gasLimit,lable:"gasLimit:",uuid:x()()}},code:{value:L.code},data:{value:JSON.parse(L.data)},buttonText:{value:"send"},treeViewOptions:{maxDepth:4,rootObjectKey:"data",modifiable:!1,link:!1}}},methods:{send:function(){var e=this,t={data:this.data.value,code:this.code.value};Object.keys(this.forms).forEach(function(n){return t[n]=e.forms[n].value}),this.$emit("call",t)}}},S=K,I=(n("ebb2"),Object(f["a"])(S,T,A,!1,null,null,null)),C=I.exports,E=n("2463"),F=n("7fe4"),R=n.n(F),N={data:function(){return{}},methods:{transportU2F:function(){return R.a.create()},LedgerMixinSignTx:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t,n){var r,a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.transportU2F();case 2:return r=e.sent,a=new E["a"](r),e.prev=4,e.next=7,a.signTxn(t,n);case 7:return e.abrupt("return",e.sent);case 10:return e.prev=10,e.t0=e["catch"](4),console.error(e.t0),e.abrupt("return",{error:e.t0});case 14:case"end":return e.stop()}},e,this,[[4,10]])}));function t(t,n){return e.apply(this,arguments)}return t}(),LedgerMixinGetVersion:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.transportU2F();case 2:return t=e.sent,n=new E["a"](t),e.abrupt("return",n.getVersion());case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),LedgerMixinGetAddress:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.transportU2F();case 2:return n=e.sent,r=new E["a"](n),e.abrupt("return",r.getPublicAddress(t));case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),LedgerMixinGetPublicKey:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.transportU2F();case 2:return n=e.sent,r=new E["a"](n),e.abrupt("return",r.getPublicKey(t));case 5:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}},$={name:"app",mixins:[N],components:{GetInfo:j,Button:m,Tx:C},data:function(){return{getAddress:{btnText:"get address",form:{type:"number",placeholder:"choice the index for ledger HDKEY",value:0,lable:"index:"}},getPublicKey:{btnText:"get publicKey"},version:"get version",modal:"result-modal",treeViewOptions:{maxDepth:4,modifiable:!1,link:!1,rootObjectKey:"result"},result:null}},methods:{sendTxForm:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){var n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.index,r={},Object.keys(L).forEach(function(e){return r[e]=t[e]}),e.next=5,this.LedgerMixinSignTx(n,r);case 5:this.result=e.sent,this.$refs[this.modal].show();case 7:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),getAddressForm:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.LedgerMixinGetAddress(t);case 2:this.result=e.sent,this.$refs[this.modal].show();case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),getPublicKeyForm:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.LedgerMixinGetPublicKey(t);case 2:this.result=e.sent,this.$refs[this.modal].show();case 4:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),getVersion:function(){var e=Object(u["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.LedgerMixinGetVersion();case 2:this.result=e.sent,this.$refs[this.modal].show();case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},mounted:function(){}},M=$,B=Object(f["a"])(M,a,i,!1,null,null,null),G=B.exports,U=n("558c"),D=n.n(U),J=n("dbbe"),H=n("e6c7");r["a"].config.productionTip=!1,r["a"].use(J["a"]),r["a"].use(D.a),r["a"].directive("b-modal",H["a"]),new r["a"]({render:function(e){return e(G)}}).$mount("#app")},a165:function(e){e.exports=JSON.parse('{"version":21823489,"toAddr":"0xE8A997e359AC2A1e891dBDf7fc7558623bB0eaD2","nonce":30,"pubKey":"034f734a1dd79cd1b6dce193d243cc1fd5688ce264a02ca82c6cf1d80f2967e9d5","amount":"100000000000000","gasPrice":"1000000000","gasLimit":"9000","code":"","data":"{\\"_tag\\":\\"Roll\\",\\"params\\":[{\\"vname\\":\\"rol\\",\\"type\\":\\"Uint128\\",\\"value\\":\\"51\\"}]}"}')},ebb2:function(e,t,n){"use strict";var r=n("1c0d"),a=n.n(r);a.a}});
//# sourceMappingURL=app.ce4931cf.js.map