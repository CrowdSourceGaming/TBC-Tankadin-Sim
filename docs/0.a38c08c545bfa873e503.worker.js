!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,(function(t){return e[t]}).bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="ymuh")}({mNvP:function(e,t){var n;!function(e){!function(t){var n="object"==typeof global?global:"object"==typeof self?self:"object"==typeof this?this:Function("return this;")(),a=r(e);function r(e,t){return function(n,a){"function"!=typeof e[n]&&Object.defineProperty(e,n,{configurable:!0,writable:!0,value:a}),t&&t(n,a)}}void 0===n.Reflect?n.Reflect=e:a=r(n.Reflect,a),function(e){var t=Object.prototype.hasOwnProperty,n="function"==typeof Symbol,a=n&&void 0!==Symbol.toPrimitive?Symbol.toPrimitive:"@@toPrimitive",r=n&&void 0!==Symbol.iterator?Symbol.iterator:"@@iterator",i="function"==typeof Object.create,s={__proto__:[]}instanceof Array,o=!i&&!s,c={create:i?function(){return x(Object.create(null))}:s?function(){return x({__proto__:null})}:function(){return x({})},has:o?function(e,n){return t.call(e,n)}:function(e,t){return t in e},get:o?function(e,n){return t.call(e,n)?e[n]:void 0}:function(e,t){return e[t]}},l=Object.getPrototypeOf(Function),u="object"==typeof process&&process.env&&"true"===process.env.REFLECT_METADATA_USE_MAP_POLYFILL,h=u||"function"!=typeof Map||"function"!=typeof Map.prototype.entries?function(){var e={},t=[],n=function(){function e(e,t,n){this._index=0,this._keys=e,this._values=t,this._selector=n}return e.prototype["@@iterator"]=function(){return this},e.prototype[r]=function(){return this},e.prototype.next=function(){var e=this._index;if(e>=0&&e<this._keys.length){var n=this._selector(this._keys[e],this._values[e]);return e+1>=this._keys.length?(this._index=-1,this._keys=t,this._values=t):this._index++,{value:n,done:!1}}return{value:void 0,done:!0}},e.prototype.throw=function(e){throw this._index>=0&&(this._index=-1,this._keys=t,this._values=t),e},e.prototype.return=function(e){return this._index>=0&&(this._index=-1,this._keys=t,this._values=t),{value:e,done:!0}},e}();return function(){function t(){this._keys=[],this._values=[],this._cacheKey=e,this._cacheIndex=-2}return Object.defineProperty(t.prototype,"size",{get:function(){return this._keys.length},enumerable:!0,configurable:!0}),t.prototype.has=function(e){return this._find(e,!1)>=0},t.prototype.get=function(e){var t=this._find(e,!1);return t>=0?this._values[t]:void 0},t.prototype.set=function(e,t){var n=this._find(e,!0);return this._values[n]=t,this},t.prototype.delete=function(t){var n=this._find(t,!1);if(n>=0){for(var a=this._keys.length,r=n+1;r<a;r++)this._keys[r-1]=this._keys[r],this._values[r-1]=this._values[r];return this._keys.length--,this._values.length--,t===this._cacheKey&&(this._cacheKey=e,this._cacheIndex=-2),!0}return!1},t.prototype.clear=function(){this._keys.length=0,this._values.length=0,this._cacheKey=e,this._cacheIndex=-2},t.prototype.keys=function(){return new n(this._keys,this._values,a)},t.prototype.values=function(){return new n(this._keys,this._values,i)},t.prototype.entries=function(){return new n(this._keys,this._values,s)},t.prototype["@@iterator"]=function(){return this.entries()},t.prototype[r]=function(){return this.entries()},t.prototype._find=function(e,t){return this._cacheKey!==e&&(this._cacheIndex=this._keys.indexOf(this._cacheKey=e)),this._cacheIndex<0&&t&&(this._cacheIndex=this._keys.length,this._keys.push(e),this._values.push(void 0)),this._cacheIndex},t}();function a(e,t){return e}function i(e,t){return t}function s(e,t){return[e,t]}}():Map,d=u||"function"!=typeof Set||"function"!=typeof Set.prototype.entries?function(){function e(){this._map=new h}return Object.defineProperty(e.prototype,"size",{get:function(){return this._map.size},enumerable:!0,configurable:!0}),e.prototype.has=function(e){return this._map.has(e)},e.prototype.add=function(e){return this._map.set(e,e),this},e.prototype.delete=function(e){return this._map.delete(e)},e.prototype.clear=function(){this._map.clear()},e.prototype.keys=function(){return this._map.keys()},e.prototype.values=function(){return this._map.values()},e.prototype.entries=function(){return this._map.entries()},e.prototype["@@iterator"]=function(){return this.keys()},e.prototype[r]=function(){return this.keys()},e}():Set,f=new(u||"function"!=typeof WeakMap?function(){var e=c.create(),n=a();return function(){function e(){this._key=a()}return e.prototype.has=function(e){var t=r(e,!1);return void 0!==t&&c.has(t,this._key)},e.prototype.get=function(e){var t=r(e,!1);return void 0!==t?c.get(t,this._key):void 0},e.prototype.set=function(e,t){return r(e,!0)[this._key]=t,this},e.prototype.delete=function(e){var t=r(e,!1);return void 0!==t&&delete t[this._key]},e.prototype.clear=function(){this._key=a()},e}();function a(){var t;do{t="@@WeakMap@@"+s()}while(c.has(e,t));return e[t]=!0,t}function r(e,a){if(!t.call(e,n)){if(!a)return;Object.defineProperty(e,n,{value:c.create()})}return e[n]}function i(e,t){for(var n=0;n<t;++n)e[n]=255*Math.random()|0;return e}function s(){var e,t=(e=16,"function"==typeof Uint8Array?"undefined"!=typeof crypto?crypto.getRandomValues(new Uint8Array(e)):"undefined"!=typeof msCrypto?msCrypto.getRandomValues(new Uint8Array(e)):i(new Uint8Array(e),e):i(new Array(e),e));t[6]=79&t[6]|64,t[8]=191&t[8]|128;for(var n="",a=0;a<16;++a){var r=t[a];4!==a&&6!==a&&8!==a||(n+="-"),r<16&&(n+="0"),n+=r.toString(16).toLowerCase()}return n}}():WeakMap);function p(e,t,n){var a=f.get(e);if(T(a)){if(!n)return;a=new h,f.set(e,a)}var r=a.get(t);if(T(r)){if(!n)return;r=new h,a.set(t,r)}return r}function m(e,t,n){if(g(e,t,n))return!0;var a=H(t);return!O(a)&&m(e,a,n)}function g(e,t,n){var a=p(t,n,!1);return!T(a)&&!!a.has(e)}function y(e,t,n){if(g(e,t,n))return v(e,t,n);var a=H(t);return O(a)?void 0:y(e,a,n)}function v(e,t,n){var a=p(t,n,!1);if(!T(a))return a.get(e)}function b(e,t,n,a){p(n,a,!0).set(e,t)}function S(e,t){var n=w(e,t),a=H(e);if(null===a)return n;var r=S(a,t);if(r.length<=0)return n;if(n.length<=0)return r;for(var i=new d,s=[],o=0,c=n;o<c.length;o++)i.has(h=c[o])||(i.add(h),s.push(h));for(var l=0,u=r;l<u.length;l++){var h;i.has(h=u[l])||(i.add(h),s.push(h))}return s}function w(e,t){var n=[],a=p(e,t,!1);if(T(a))return n;for(var i=function(e){var t=M(e,r);if(!_(t))throw new TypeError;var n=t.call(e);if(!A(n))throw new TypeError;return n}(a.keys()),s=0;;){var o=j(i);if(!o)return n.length=s,n;var c=o.value;try{n[s]=c}catch(l){try{P(i)}finally{throw l}}s++}}function k(e){if(null===e)return 1;switch(typeof e){case"undefined":return 0;case"boolean":return 2;case"string":return 3;case"symbol":return 4;case"number":return 5;case"object":return null===e?1:6;default:return 6}}function T(e){return void 0===e}function O(e){return null===e}function A(e){return"object"==typeof e?null!==e:"function"==typeof e}function C(e){var t=function(e,t){switch(k(e)){case 0:case 1:case 2:case 3:case 4:case 5:return e}var n=3===t?"string":5===t?"number":"default",r=M(e,a);if(void 0!==r){var i=r.call(e,n);if(A(i))throw new TypeError;return i}return function(e,t){if("string"===t){var n=e.toString;if(_(n)&&!A(r=n.call(e)))return r;if(_(a=e.valueOf)&&!A(r=a.call(e)))return r}else{var a;if(_(a=e.valueOf)&&!A(r=a.call(e)))return r;var r,i=e.toString;if(_(i)&&!A(r=i.call(e)))return r}throw new TypeError}(e,"default"===n?"number":n)}(e,3);return"symbol"==typeof t?t:function(e){return""+e}(t)}function D(e){return Array.isArray?Array.isArray(e):e instanceof Object?e instanceof Array:"[object Array]"===Object.prototype.toString.call(e)}function _(e){return"function"==typeof e}function R(e){return"function"==typeof e}function M(e,t){var n=e[t];if(null!=n){if(!_(n))throw new TypeError;return n}}function j(e){var t=e.next();return!t.done&&t}function P(e){var t=e.return;t&&t.call(e)}function H(e){var t=Object.getPrototypeOf(e);if("function"!=typeof e||e===l)return t;if(t!==l)return t;var n=e.prototype,a=n&&Object.getPrototypeOf(n);if(null==a||a===Object.prototype)return t;var r=a.constructor;return"function"!=typeof r||r===e?t:r}function x(e){return e.__=void 0,delete e.__,e}e("decorate",function(e,t,n,a){if(T(n)){if(!D(e))throw new TypeError;if(!R(t))throw new TypeError;return function(e,t){for(var n=e.length-1;n>=0;--n){var a=(0,e[n])(t);if(!T(a)&&!O(a)){if(!R(a))throw new TypeError;t=a}}return t}(e,t)}if(!D(e))throw new TypeError;if(!A(t))throw new TypeError;if(!A(a)&&!T(a)&&!O(a))throw new TypeError;return O(a)&&(a=void 0),function(e,t,n,a){for(var r=e.length-1;r>=0;--r){var i=(0,e[r])(t,n,a);if(!T(i)&&!O(i)){if(!A(i))throw new TypeError;a=i}}return a}(e,t,n=C(n),a)}),e("metadata",function(e,t){return function(n,a){if(!A(n))throw new TypeError;if(!T(a)&&!function(e){switch(k(e)){case 3:case 4:return!0;default:return!1}}(a))throw new TypeError;b(e,t,n,a)}}),e("defineMetadata",function(e,t,n,a){if(!A(n))throw new TypeError;return T(a)||(a=C(a)),b(e,t,n,a)}),e("hasMetadata",function(e,t,n){if(!A(t))throw new TypeError;return T(n)||(n=C(n)),m(e,t,n)}),e("hasOwnMetadata",function(e,t,n){if(!A(t))throw new TypeError;return T(n)||(n=C(n)),g(e,t,n)}),e("getMetadata",function(e,t,n){if(!A(t))throw new TypeError;return T(n)||(n=C(n)),y(e,t,n)}),e("getOwnMetadata",function(e,t,n){if(!A(t))throw new TypeError;return T(n)||(n=C(n)),v(e,t,n)}),e("getMetadataKeys",function(e,t){if(!A(e))throw new TypeError;return T(t)||(t=C(t)),S(e,t)}),e("getOwnMetadataKeys",function(e,t){if(!A(e))throw new TypeError;return T(t)||(t=C(t)),w(e,t)}),e("deleteMetadata",function(e,t,n){if(!A(t))throw new TypeError;T(n)||(n=C(n));var a=p(t,n,!1);if(T(a))return!1;if(!a.delete(e))return!1;if(a.size>0)return!0;var r=f.get(t);return r.delete(n),r.size>0||f.delete(t),!0})}(a)}()}(n||(n={}))},xggb:function(e,t,n){"use strict";var a=this&&this.__assign||function(){return(a=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},r=this&&this.__spreadArrays||function(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var a=Array(e),r=0;for(t=0;t<n;t++)for(var i=arguments[t],s=0,o=i.length;s<o;s++,r++)a[r]=i[s];return a};Object.defineProperty(t,"__esModule",{value:!0}),t.serialize=t.deserialize=t.Serializable=t.JsonProperty=void 0,n("mNvP");var i,s="api:map:",o=s+"serializable",c="design:type";function l(e){var t=Reflect.getPrototypeOf(e);return t&&t.name?r(l(t),[t.name]):[]}function u(e,t){var n={};return e.forEach(function(e){n=a(a({},n),Reflect.getMetadata(""+s+e,t))}),n}function h(e){return Reflect.hasOwnMetadata(o,e)}function d(e,t,n,a){if(null==e)return t;if(e=e.toLowerCase(),(typeof t).toLowerCase()===e)return t;var r=function(){console.error("Type '"+typeof t+"' is not assignable to type '"+e+"' for property '"+n+"' in '"+a+"'.\n","Received: "+JSON.stringify(t))};switch(e){case i.String:var s=t.toString();return"[object Object]"===s?void r():s;case i.Number:var o=+t;return isNaN(o)?void r():o;case i.Boolean:return void r();case i.Date:return isNaN(Date.parse(t))?void r():new Date(t);default:return t}}!function(e){e.Array="array",e.Boolean="boolean",e.Date="date",e.Number="number",e.Object="object",e.String="string"}(i||(i={})),t.JsonProperty=function(e){return function(t,n,r){if(void 0===n&&t.prototype){var o=Reflect.getMetadata("design:paramtypes",t)[r];n=function(e){var t=e.toString().replace(/(\/\*[\s\S]*?\*\/|\/\/.*$)/gm,"").replace(/[\r\t\n\v\f]/g,"").replace(/( +)/g," "),n=/(?:this\.)([^\n\r\t\f\v;]+)([\s;])/gm,a=new Map,r=/(?:.*(?:constructor|function).*?(?=\())(?:\()(.+?(?=\)))/m.exec(t);if(!r||!r.length)return a;for(var i,s=r[1].replace(/ /g,"").split(","),o=function(){var e=i[1].replace(/ /g,"").split("="),t=s.findIndex(function(t){return t===e[1]});t>-1&&a.set(t,e[0])};i=n.exec(t);)o();return a}(t.prototype.constructor).get(r),t=t.prototype,Reflect.defineMetadata(c,o,t,n)}var l={},u=""+s+t.constructor.name;Reflect.hasMetadata(u,t)&&(l=Reflect.getMetadata(u,t)),l[n]=function(e,t){return t?(n=typeof t===i.String?{name:t,isNameOverridden:!0}:t.name?{name:t.name,isNameOverridden:!0}:t.names&&t.names.length?{names:t.names}:{name:e.toString(),isNameOverridden:!1},a(a({},n),t.predicate?{predicate:t.predicate,beforeSerialize:t.beforeSerialize,afterSerialize:t.afterSerialize,beforeDeserialize:t.beforeDeserialize,afterDeserialize:t.afterDeserialize,isDictionary:!!t.isDictionary}:{type:t.type,beforeSerialize:t.beforeSerialize,afterSerialize:t.afterSerialize,beforeDeserialize:t.beforeDeserialize,afterDeserialize:t.afterDeserialize,isDictionary:!!t.isDictionary})):{name:e.toString(),isDictionary:!1,isNameOverridden:!1};var n}(n,e),Reflect.defineMetadata(u,l,t)}},t.Serializable=function(e){return function(t){var n=l(t);Reflect.defineMetadata(o,{baseClassNames:n,options:e},t)}},t.deserialize=function e(t,n){var r;if([null,void 0].includes(t))return t;if(void 0===n)return d(typeof t,t);var l=new n,f=l.constructor.name,p=null!==(r=Reflect.getMetadata(o,n))&&void 0!==r?r:{},m=p.baseClassNames,g=p.options,y=""+s+f,v=Reflect.hasMetadata(y,l),b={};return v||m&&m.length?(b=Reflect.getMetadata(y,l),m&&m.length&&(b=a(a({},u(m,l)),b)),Object.keys(b).forEach(function(n){var a=function(t,n,a,r,s){var o;if([null,void 0].includes(r))return r;if("names"in a){var l={};a.names.forEach(function(e){return l[e]=r[e]}),o=l}else if("name"in a&&!a.isNameOverridden&&s){var u=s(a.name);o=r[u]}else o=r[a.name];if([null,void 0].includes(o))return o;var f,p=Reflect.getMetadata(c,t,n),m=!!p.name&&p.name.toLowerCase()===i.Array,g=a.isDictionary,y=a.predicate,v=a.beforeDeserialize,b=a.afterDeserialize,S=a.type||p,w=h(S);if(v&&(o=v(o,t)),g){var k={};typeof o!==i.Object?(console.error("Type '"+typeof o+"' is not assignable to type 'Dictionary' for property '"+n+"' in '"+t.constructor.name+"'.\n","Received: "+JSON.stringify(o)),f=void 0):(Object.keys(o).forEach(function(a){w||y?(y&&(S=y(o[a])),k[a]=e(o[a],S)):k[a]=d(typeof o[a],o[a],n,t.constructor.name)}),f=k)}else if(m){var T=[];Array.isArray(o)?(o.forEach(function(a){w||y?(y&&(S=y(a)),T.push(e(a,S))):T.push(d(typeof a,a,n,t.constructor.name))}),f=T):(console.error("Type '"+typeof o+"' is not assignable to type 'Array' for property '"+n+"' in '"+t.constructor.name+"'.\n","Received: "+JSON.stringify(o)),f=void 0)}else w||y?(S=y?y(o):S,f=e(o,S)):f=d(S.name,o,n,t.constructor.name);return b&&(f=b(f,t)),f}(l,n,b[n],t,null==g?void 0:g.formatPropertyNames);void 0!==a&&(l[n]=a)}),l):l},t.serialize=function e(t,n){var r;if(void 0===n&&(n=!0),[void 0,null].includes(t)||typeof t!==i.Object)return t;var l=""+s+t.constructor.name,d=null!==(r=Reflect.getMetadata(o,t.constructor))&&void 0!==r?r:{},f=d.baseClassNames,p=d.options,m=f&&f.length,g=Reflect.hasMetadata(l,t),y={};if(!g&&!m)return t;y=Reflect.getMetadata(l,t),m&&(y=a(a({},u(f,t)),y));var v={},b=Object.keys(t);return Object.keys(y).forEach(function(a){if(b.includes(a)){var r=y[a],s=r.beforeSerialize,o=r.afterSerialize;s&&(t[a]=s(t[a],t));var l=function(t,n,a,r){var s=t[n],o=Reflect.getMetadata(c,t,n),l=!!o.name&&o.name.toLocaleLowerCase()===i.Array,u=a.predicate,d=a.type||o,f=h(d);if(s&&(f||u)){if(l)return s.map(function(t){return e(t,r)});if(a.isDictionary){var p={};return Object.keys(s).forEach(function(t){p[t]=e(s[t],r)}),p}return e(s,r)}return d.name.toLocaleLowerCase()===i.Date&&typeof s===i.Object?s.toISOString():s}(t,a,r,n);if(o&&(l=o(l,t)),r.names)r.names.forEach(function(e){(!n||n&&void 0!==l[e])&&(v[e]=l[e])});else if(!n||n&&void 0!==l)if(!r.isNameOverridden&&(null==p?void 0:p.formatPropertyNames)){var u=p.formatPropertyNames(r.name);v[u]=l}else v[r.name]=l}}),v}},ymuh:function(e,t,n){"use strict";n.r(t);var a=n("xggb"),r=function(e){return e.miss="miss",e.dodge="dodge",e.parry="parry",e.glancing="glancing",e.block="block",e.crit="crit",e.crushing="crushing",e.hit="hit",e}({}),i=function(e){return e.holy="holy",e.shadow="shadow",e.fire="fire",e.arcane="arcane",e.physical="physical",e}({});class s{constructor(){this.internalCD=0,this.magicSchool=i.physical,this.name="Attack",this.onGCD=!1}onHit(e,t,n){let a=1;return e&&e!==r.miss&&e!==r.dodge&&e!==r.parry&&(a=o(t.weaponDamageMin,t.weaponDamageMax,n),e===r.glancing?a*=.65:e===r.crit&&(a*=2)),{damageAmount:Math.round(a),damageType:i.physical,circumstance:this.name,comment:e}}onCast(e,t,n){return!1}onCheck(e,t,n){}}const o=(e,t,n)=>Math.floor(Math.random()*(t-e+1)+e)*(n.armor/(n.armor-22167.5+467.5*n.level));class c{constructor(){this.magicSchool=i.holy,this.name="Avenger's Shield",this.onGCD=!0,this.internalCD=3e4,this.lastCastTime=-999999999,this.castingDuration=1e3,this.damageOnTime=-999999999}onHit(e,t,n,a){}onCast(e,t,n){return!!(e.spec.talents.AvengersShield&&this.lastCastTime+this.internalCD<=n)&&(this.damageOnTime=n+this.castingDuration,!0)}onCheck(e,t,n){if(this.damageOnTime===n){this.lastCastTime=n;const t=Math.max(17-e.spellHit,1);if(100*Math.random()<=t)return{circumstance:this.name,damageAmount:1,damageType:i.holy,comment:"Resist"};const a=494,r=602,s=.1357*e.spellDamage,o={circumstance:this.name,damageAmount:Math.random()*(r-a)+a+s,damageType:i.holy};return 100*Math.random()<=e.spellCrit&&(o.damageAmount=1.5*o.damageAmount,o.comment="CRITICAL"),o}}}class l{constructor(){this.magicSchool=i.holy,this.name="Consecration",this.onGCD=!0,this.internalCD=8e3,this.internalTickCD=1e3,this.duration=8e3,this.lastCastTime=-9999999999,this.lastTickTime=-9999999999}onHit(e,t,n,a){}onCast(e,t,n){return this.lastCastTime+this.internalCD<=n&&(t.debuffs[this.name]={active:!0,expires:n+8e3},this.lastCastTime=n,!0)}onCheck(e,t,n){const a=t.debuffs[this.name];if(a&&a.active&&this.lastTickTime+this.internalTickCD<=n)return this.lastTickTime=n,{damageAmount:(512+e.spellDamage)/8,circumstance:this.name,damageType:i.holy}}}class u{constructor(){this.name="Holy Shield",this.onGCD=!0,this.magicSchool=i.holy,this.internalCD=1e4,this.lastCastTime=-9999999999}onHit(e,t,n,a){}onCast(e,t,n){if(e.spec.talents.holyShield&&this.lastCastTime+this.internalCD<=n){let t=4;return t+=2*e.spec.talents.improvedHolyShield,e.buffs[this.name]={charges:t,expires:n+1e4},this.lastCastTime=n,!0}return!1}onCheck(e,t,n){e.buffs[this.name]&&e.buffs[this.name].expired>=n&&(e.buffs[this.name].charges=0)}onReactive(e,t,n,a){if(e===r.block&&n.buffs[this.name]&&n.buffs[this.name].charges>0)return{damageAmount:155+.05*n.spellDamage*(1+10*n.spec.talents.improvedHolyShield/100),damageType:i.holy,circumstance:this.name}}}class h{constructor(){this.magicSchool=i.holy,this.name="Judgement",this.onGCD=!1,this.internalCD=1e4,this.lastCasted=-999999999,this.doDamage={activate:!1,seal:""}}onHit(e,t,n,a){}onCast(e,t,n){return this.lastCasted+this.internalCD<=n&&(this.internalCD=1e4-1e3*e.spec.talents.impJudgement,e.buffs["Seal of Vengeance"]?(this.lastCasted=n,this.doDamage={activate:!0,seal:"Seal of Vengeance"},!1):!!e.buffs["Seal of Righteousness"]&&(this.lastCasted=n,this.doDamage={activate:!0,seal:"Seal of Righteousness"},!1))}onCheck(e,t,n){if(this.doDamage&&this.doDamage.activate){this.doDamage.activate=!1;const n=Math.max(17-e.spellHit,1);if(100*Math.random()<=n)return{circumstance:this.name,damageAmount:1,damageType:i.holy,comment:"Judgement: Resist"};let a;if("Seal of Vengeance"===this.doDamage.seal)a=this.vengeanceDamage(e,t);else{if("Seal of Righteousness"!==this.doDamage.seal)return;a=this.righteousnessDamage(e)}return 100*Math.random()<=e.spellCrit&&(a.damageAmount=1.5*a.damageAmount,a.comment+=" - CRITICAL"),a}}righteousnessDamage(e){let t=219+.7143*e.spellDamage;return t*=1+.03*e.spec.talents.improvedRighteousFury,{circumstance:this.name,damageAmount:t,damageType:i.holy,comment:"Judgement of Righteousness"}}vengeanceDamage(e,t){const n=t.debuffs["Seal of Vengeance"],a=n&&n.stacks?n.stacks:0;return{circumstance:this.name,damageAmount:120*a+.4286*e.spellDamage,damageType:i.holy,comment:`Judgement of Vengeance: ${a} stacks`}}}class d{constructor(e){this.magicSchool=i.holy,this.name="Retribution Aura",this.onGCD=!0,this.internalCD=0,this.rank=e}onHit(e,t,n,a){throw new Error("Method not implemented.")}onCast(e,t,n){return!1}onCheck(e,t,n){throw new Error("Method not implemented.")}onReactive(e,t,n,a){if([r.hit,r.crit,r.crushing,r.block].includes(e))return{circumstance:this.name,damageAmount:26*(1+.25*this.rank),damageType:i.holy}}}class f{constructor(){this.magicSchool=i.holy,this.name="Seal of Righteousness",this.onGCD=!0,this.internalCD=0}onHit(e,t,n,a){if(t.buffs[this.name]&&!0===t.buffs[this.name].active&&[r.hit,r.crit,r.glancing].includes(e)){let e=2611.668*t.attackSpeed/100*.85+.03*(t.weaponDamageMax+t.weaponDamageMin)/2-1+.092*t.attackSpeed*t.spellDamage;return e*=1+.03*t.spec.talents.improvedRighteousFury,{circumstance:this.name,damageAmount:e,damageType:i.holy}}}onCast(e,t,n){return(!e.buffs[this.name]||!1===e.buffs[this.name].active||e.buffs[this.name].expires-5e3<=n)&&(e.buffs[this.name]={active:!0,expires:n+3e4},!0)}onCheck(e,t,n){const a=e.buffs[this.name];a&&a.active&&a.expires<=n&&(a.active=!1)}}class p{constructor(){this.id=31801,this.lastApply=0,this.magicSchool=i.holy,this.name="Seal of Vengeance",this.onGCD=!0,this.internalCD=0}onHit(e,t,n,a){if(t.buffs[this.name]&&t.buffs[this.name].active&&e&&e!==r.miss&&e!==r.dodge&&e!==r.parry){const e=20/60*t.attackSpeed*100;if(100*Math.random()<=e){if(n.debuffs[this.name]||(n.debuffs[this.name]={stacks:0,lastDamageAppliedTimestamp:-9999999999,expires:-999999999}),n.debuffs[this.name].lastStackAppliedTimestamp=a,5===n.debuffs[this.name].stacks)return{circumstance:"SoV Melee",damageAmount:50+.034*t.spellDamage*5*t.attackSpeed,damageType:this.magicSchool};n.debuffs[this.name].stacks+=1}}}onCast(e,t,n){return(!e.buffs[this.name]||!1===e.buffs[this.name].active||e.buffs[this.name].expires-5e3<=n)&&(e.buffs[this.name]={active:!0,expires:n+3e4},!0)}onCheck(e,t,n){var a;if(e.buffs[this.name]&&e.buffs[this.name].expires<=n&&(e.buffs[this.name].active=!1),t.debuffs[this.name]&&t.debuffs[this.name].lastStackAppliedTimestamp+15e3<=n&&(t.debuffs[this.name].stacks=0),(null===(a=t.debuffs[this.name])||void 0===a?void 0:a.lastDamageAppliedTimestamp)+3e3<=n){const a=t.debuffs[this.name].stacks,r=(150+e.spellDamage*(.034*a))*a/5;return t.debuffs[this.name].lastDamageAppliedTimestamp=n,{circumstance:"SoV Dot",damageAmount:r,damageType:this.magicSchool,comment:`${a} stacks`}}}}function m(e,t,n,a){var r,i=arguments.length,s=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,n):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,a);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(s=(i<3?r(s):i>3?r(t,n,s):r(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s}function g(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}var y=function(e){return e.red="red",e.yellow="yellow",e.green="green",e.blue="blue",e.purple="purple",e.orange="orange",e.meta="meta",e}({});let v=(()=>{let e=class{constructor(e=null,t=0,n="",a={},r=!1){this.name="",this.id=0,this.stats={},this.gemSockets=[],this.gemSocketBonus={},this.set=S.none,this.enchant=null,this.name=n,this.id=t,this._id=t,this.validSlot=e,this.stats=a,this.unique=r}getTotalConfiguredStats(){const e=JSON.parse(JSON.stringify(this.stats));return this.addGemValuesToTotal(e),this.addEnchantValuesToTotal(e),e}addEnchantValuesToTotal(e){this.enchant&&Object.keys(this.enchant.stats).forEach(t=>{e[t]||(e[t]=0),e[t]+=+(this.enchant.stats[t]||0)})}addGemValuesToTotal(e){let t=!0;if(this.gemSockets.forEach(n=>{n.gem?(Object.keys(n.gem.stats).forEach(t=>{var a;e[t]||(e[t]=0),e[t]+=+((null===(a=n.gem)||void 0===a?void 0:a.stats[t])||0)}),k[n.color].includes(n.gem.color)||(t=!1)):t=!1}),t&&Object.keys(this.gemSocketBonus).length>0){const t=Object.keys(this.gemSocketBonus)[0];e[t]||(e[t]=0),e[t]+=+(this.gemSocketBonus[t]||0)}}};return m([Object(a.JsonProperty)(),g("design:type",String)],e.prototype,"name",void 0),m([Object(a.JsonProperty)(),g("design:type",Number)],e.prototype,"id",void 0),m([Object(a.JsonProperty)(),g("design:type",Number)],e.prototype,"_id",void 0),m([Object(a.JsonProperty)(),g("design:type",Object)],e.prototype,"stats",void 0),m([Object(a.JsonProperty)(),g("design:type",Object)],e.prototype,"validSlot",void 0),m([Object(a.JsonProperty)(),g("design:type",Array)],e.prototype,"gemSockets",void 0),m([Object(a.JsonProperty)(),g("design:type",Object)],e.prototype,"gemSocketBonus",void 0),m([Object(a.JsonProperty)(),g("design:type",String)],e.prototype,"set",void 0),m([Object(a.JsonProperty)(),g("design:type",String)],e.prototype,"weaponType",void 0),m([Object(a.JsonProperty)(),g("design:type",Object)],e.prototype,"enchant",void 0),m([Object(a.JsonProperty)(),g("design:type",Boolean)],e.prototype,"unique",void 0),e=m([Object(a.Serializable)(),g("design:paramtypes",[Object,Number,String,Object,Boolean])],e),e})();var b=function(e){return e.yellow="yellow",e.blue="blue",e.red="red",e.meta="meta",e}({}),S=function(e){return e.none="None",e.righteous="Righteous",e.justicar="Justicar",e.crystalforge="Crystalforge",e.lightbringer="Lightbringer",e.felsteel="Felsteel",e.lieutenantCommandersRedoubt="Lieutenant Commander's Redoubt",e.fieldMarshalsAegis="Field Marshal's Aegis",e.doomplateBattlegear="Doomplate Battlegear",e.grandMarshalsAegis="Grand Marshal's Aegis",e.grandMarshalsRedemption="Grand Marshal's Redemption",e.grandMarshalsVindication="Grand Marshal's Vindication",e.warlordsAegis="Warlord's Aegis",e}({}),w=function(e){return e.oneHandedMace="oneHandedMace",e.twoHandedMace="twoHandedMace",e.oneHandedSword="oneHandedSword",e.twoHandedSword="twoHandedSword",e.oneHandedAxe="oneHandedAxe",e.twoHandedAxe="twoHandedAxe",e.polearm="polearm",e}({});const k={[b.blue]:[y.blue,y.purple,y.green],[b.red]:[y.red,y.purple,y.orange],[b.yellow]:[y.yellow,y.green,y.orange],[b.meta]:[y.meta]};var T=function(e){return e.stamina="stamina",e.intellect="intellect",e.strength="strength",e.agility="agility",e.spirit="spirit",e.intellectPercent="intellectPercent",e.armor="armor",e.defenseRating="defenseRating",e.miss="miss",e.dodgeRating="dodgeRating",e.parryRating="parryRating",e.parryValue="parryValue",e.blockRating="blockRating",e.blockValue="blockValue",e.shieldBlockValuePercent="shieldBlockValuePercent",e.defenseValue="defenseValue",e.resilience="resilience",e.meleeHitRating="meleeHitRating",e.meleeHitPercent="meleeHitPercent",e.meleeCritRating="meleeCritRating",e.meleeCritPercent="meleeCritPercent",e.meleeCritDamagePercent="meleeCritDamagePercent",e.expertiseRating="expertiseRating",e.attackRating="attackRating",e.meleeExpertise="meleeExpertise",e.attackPower="attackPower",e.bonusMeleeDamage="bonusMeleeDamage",e.hasteRating="hasteRating",e.armorPenRating="armorPenRating",e.damageMin="damageMin",e.damageMax="damageMax",e.attackSpeed="attackSpeed",e.spellHitRating="spellHitRating",e.spellHitPercent="spellHitPercent",e.spellCritRating="spellCritRating",e.spellDamage="spellDamage",e.spellHaste="spellHaste",e.spellHasteRating="spellHasteRating",e.healing="healing",e.spellPen="spellPen",e.mp5="mp5",e}({}),O=function(e){return e.bloodElf="Blood Elf",e.draeni="Draeni",e.dwarf="Dwarf",e.human="Human",e}({});const A={[O.bloodElf]:{strength:19,agility:22,stamina:22,intellect:23,spirit:19},[O.draeni]:{strength:23,agility:17,stamina:22,intellect:20,spirit:23},[O.dwarf]:{strength:27,agility:16,stamina:23,intellect:19,spirit:20},[O.human]:{strength:22,agility:20,stamina:22,intellect:20,spirit:21}};let C=(()=>{let e=class{constructor(e){this.stats=A[e],this.name=e}};return m([Object(a.JsonProperty)(),g("design:type",Object)],e.prototype,"stats",void 0),m([Object(a.JsonProperty)(),g("design:type",String)],e.prototype,"name",void 0),e=m([Object(a.Serializable)(),g("design:paramtypes",[String])],e),e})(),D=(()=>{let e=class{constructor(e="0000000000000000000000000000000000000000000000000000000000000000"){this.initTalents(e),this.talentString=e}getMultipliers(){return{strength:.02*this.talents.divineStrength,stamina:this.stamMultiplier,intellect:.02*this.talents.divineIntellect,armor:.02*this.talents.toughness,blockValue:.1*this.talents.shieldSpecialization}}getValues(){return{meleeHitPercent:this.talents.precision,spellHitPercent:this.talents.precision,meleeExpertise:this.talents.combatExpertise,defenseValue:4*this.talents.anticipation,parryValue:this.talents.defection}}get holyProtRetCount(){const e=this.talentString.split("");return`${e.slice(0,20).reduce((e,t)=>+e+ +t,0)}/${e.slice(20,42).reduce((e,t)=>+e+ +t,0)}/${e.slice(42,-1).reduce((e,t)=>+e+ +t,0)}`}get stamMultiplier(){return.03*this.talents.sacredDuty+.02*this.talents.combatExpertise}initTalents(e){const t=e.split("");this.talents={divineStrength:+t[0],divineIntellect:+t[1],spiritualFocus:+t[2],improvedSoR:+t[3],healingLight:+t[4],auraMastery:+t[5],improvedLoH:+t[6],unyieldingFaith:+t[7],illumination:+t[8],improvedBoW:+t[9],pureOfHeart:+t[10],divineFavor:+t[11],sanctifiedLight:+t[12],purifyingPower:+t[13],holyPower:+t[14],lightsGrace:+t[15],holyShock:+t[16],blessedLife:+t[17],holyGuidance:+t[18],divineIllumination:+t[19],improvedDevoAura:+t[20],redoubt:+t[21],precision:+t[22],guardiansFavor:+t[23],toughness:+t[24],blessingOfKings:+t[25],improvedRighteousFury:+t[26],shieldSpecialization:+t[27],anticipation:+t[28],stoicism:+t[29],improvedHoJ:+t[30],improvedConcAura:+t[31],spellWarding:+t[32],blessingOfSanctuary:+t[33],reckoning:+t[34],sacredDuty:+t[35],oneHandedSpec:+t[36],improvedHolyShield:+t[37],holyShield:+t[38],ardentDefender:+t[39],combatExpertise:+t[40],AvengersShield:+t[41],improvedBoM:+t[42],benediction:+t[43],impJudgement:+t[44],improvedSoC:+t[45],defection:+t[46],vindication:+t[47],conviction:+t[48],sealOfCommand:+t[49],pursuitOfJustice:+t[50],eyeForAnEye:+t[51],improvedRetAura:+t[52],crusade:+t[53],twoHandedSpec:+t[54],sanctityAura:+t[55],imporovedSanctityAura:+t[56],vengeance:+t[57],sanctifiedJudgement:+t[58],sanctifiedSeals:+t[59],repentance:+t[60],divinePurpose:+t[61],fanaticism:+t[62],crusaderStrike:+t[63]}}};return m([Object(a.JsonProperty)(),g("design:type",Object)],e.prototype,"talents",void 0),m([Object(a.JsonProperty)(),g("design:type",String)],e.prototype,"talentString",void 0),e=m([Object(a.Serializable)(),g("design:paramtypes",[String])],e),e})(),_=(()=>{let e=class{constructor(e=O.human){this.level=70,this.buffs={},this.debuffs={},this.additionalStats={},this.spec=new D,this.gear=this.initGear(),this.baseStats=R,this.race=new C(e)}getStatTotal(e){return this.getStatValue(e)*(1+this.getStatMultiplier(e))}getStatValue(e){return this.sum([this.baseStats[e]||0,this.spec.getValues()[e]||0,this.race.stats[e]||0,this.raceBonuses[e]||0,this.additionalStats[e]||0,this.calculateGearStats(e)])}getStatMultiplier(e){return this.sum([this.spec.getMultipliers()[e]||0])}calculateGearStats(e){let t=0;return Object.keys(this.gear).forEach(n=>{const a=this.gear[n];a&&(t+=a.getTotalConfiguredStats()[e]||0)}),t}sum(e){return e.reduce((e,t)=>e+t,0)}get totalMana(){return 15*this.getStatTotal(T.intellect)}get totalHealth(){return 3237+10*this.getStatTotal(T.stamina)}get expertise(){let e=this.getStatTotal(T.expertiseRating)/15.77;return e+=this.getStatTotal(T.meleeExpertise),e}get hitChance(){let e=this.getStatTotal(T.meleeHitRating)/15.77;return e+=this.getStatTotal(T.meleeHitPercent),e}get attackPower(){let e=0;return e+=2*this.getStatTotal(T.strength),e+=this.getStatTotal(T.attackPower),e}get meleeCrit(){let e=0;return e+=this.getStatTotal(T.meleeCritRating)/22.08,e+=this.getStatTotal(T.agility)/20,e}get haste(){return this.getStatTotal(T.hasteRating)/15.77}get armorPen(){return this.getStatTotal(T.armorPenRating)/5.92}get weaponDamageMin(){const e=this.gear.mainHand;let t=e.stats.damageMin||1;return t+=this.attackPower/(14*(e.stats.attackSpeed||2)),t||1}get weaponDamageMax(){const e=this.gear.mainHand;let t=e.stats.damageMax||10;return t+=this.attackPower/(14*(e.stats.attackSpeed||2)),t||10}get attackSpeed(){var e,t;return(null===(t=null===(e=this.gear.mainHand)||void 0===e?void 0:e.stats)||void 0===t?void 0:t.attackSpeed)||2}get defense(){let e=350+this.getStatTotal(T.defenseRating)/2.37;return e+=this.getStatTotal(T.defenseValue),e}get critReduction(){const e=0+.04*(this.defense-350);return e>5.6?0:e}get armor(){let e=0;return e+=2*this.getStatTotal(T.agility),e+=this.getStatValue(T.armor),e*(1+this.getStatMultiplier(T.armor))}get missChance(){let e=this.getStatTotal(T.defenseRating)/59.25;return e+=this.getStatTotal(T.defenseValue)/(59.25/2.36),5+e}get dodgeChance(){return.7+this.getStatTotal(T.agility)/19.767+this.getStatTotal(T.dodgeRating)/18.92+this.getStatTotal(T.defenseRating)/59.25+this.getStatTotal(T.defenseValue)/(59.25/2.36)}get blockValue(){let e=0;return e+=this.getStatTotal(T.strength)/20,e+=this.getStatValue(T.blockValue),e*(1+this.getStatMultiplier(T.blockValue))}get parry(){const e=this.getStatTotal(T.parryRating)/23.65,t=this.getStatTotal(T.parryValue);return 5+e+this.getStatTotal(T.defenseRating)/59.25+this.getStatTotal(T.defenseValue)/(59.25/2.36)+t}get blockChance(){return 5+this.getStatTotal(T.blockRating)/7.88+this.getStatTotal(T.defenseRating)/59.25+this.getStatTotal(T.defenseValue)/(59.25/2.36)}get mitigationChance(){return this.missChance+this.dodgeChance+this.parry+this.blockChance}get spellCrit(){let e=0;return e+=this.getStatTotal(T.spellCritRating),e+=this.getStatTotal(T.intellect)/54,e}get spellHit(){let e=this.getStatTotal(T.spellHitRating)/12.62;return e+=this.getStatTotal(T.spellHitPercent),e}get spellDamage(){return this.getStatTotal(T.spellDamage)}get attackTable(){return{miss:9-this.hitChance,dodge:6.5-this.expertise/4,parry:14-this.expertise/4,glancing:25,block:0,crit:0+this.meleeCrit,crushing:0,hit:0}}initGear(){return{head:new v,neck:new v,shoulder:new v,back:new v,chest:new v,wrist:new v,hands:new v,waist:new v,legs:new v,feet:new v,fingerOne:new v,fingerTwo:new v,trinketOne:new v,trinketTwo:new v,mainHand:new v,offHand:new v,relic:new v}}get raceBonuses(){const e={};return this.race.name!==O.human||this.gear.mainHand.weaponType!==w.oneHandedMace&&this.gear.mainHand.weaponType!==w.twoHandedMace&&this.gear.mainHand.weaponType!==w.oneHandedSword&&this.gear.mainHand.weaponType!==w.twoHandedSword||(e.meleeExpertise=5),e}};return m([Object(a.JsonProperty)(),g("design:type",D)],e.prototype,"spec",void 0),m([Object(a.JsonProperty)({type:v,isDictionary:!0}),g("design:type",Object)],e.prototype,"gear",void 0),m([Object(a.JsonProperty)(),g("design:type",Object)],e.prototype,"baseStats",void 0),m([Object(a.JsonProperty)(),g("design:type",C)],e.prototype,"race",void 0),m([Object(a.JsonProperty)(),g("design:type",Object)],e.prototype,"buffs",void 0),m([Object(a.JsonProperty)(),g("design:type",Object)],e.prototype,"debuffs",void 0),m([Object(a.JsonProperty)(),g("design:type",Object)],e.prototype,"additionalStats",void 0),e=m([Object(a.Serializable)(),g("design:paramtypes",[String])],e),e})();const R={strength:104,agility:57,stamina:98,intellect:63,spirit:68};class M{constructor(){this.magicSchool=i.physical,this.name="Boss Attack"}onHit(e,t,n){let a=0;return e&&e!==r.miss&&e!==r.dodge&&e!==r.parry&&(a=j(t.minMeleeDamage,t.maxMeleeDamage,n),e===r.block?a-=n.blockValue:e===r.crit?a*=2:e===r.crushing&&(a*=1.5)),{damageAmount:Math.round(a),damageType:i.physical,circumstance:e}}onCast(e,t,n){}onCheck(e,t,n){}}const j=(e,t,n)=>Math.floor(Math.random()*(t-e+1)+e)*(n.armor/(n.armor-22167.5+467.5*n.level));class P{constructor(){this.minMeleeDamage=4715,this.maxMeleeDamage=7508,this.attackSpeed=2,this.armor=7700,this.level=73,this.buffs={},this.debuffs={}}get AttackTable(){return{miss:-.6,dodge:-.6,parry:-.6,glancing:0,block:-.6,crit:5.6,crushing:15,hit:0}}}let H,x,E,V,J,z,N,L,G,B,I=0,F=0;function K(e,t,n,a){for(let r of a.spellPriority)if(L.has(r)){const a=E.playerAbilities.find(e=>e.name===r);if(a.onGCD&&V.value);else{const r=a.onCast(e,t,n);"Avenger's Shield"===a.name&&(N=!0,I=n+1e3),r&&(V={value:!0,timeUpdated:n})}}}function U(e,t,n,a,r,i){if(e&&L.has(t.name)){const s=t.onReactive(e,n,a,i);s&&(Z(a,s),ee(a,s),r.damageDone.push(s))}}function W(e,t,n,a,r,i){if(L.has(t.name)){if(e){const s=t.onHit(e,n,a,i);s&&(Z(n,s),ee(n,s),r.damageDone.push(s))}const s=t.onCheck(n,a,i);s&&(Z(n,s),ee(n,s),r.damageDone.push(s))}}function $(e,t,n,a,r,i){if(e){const i=t.onHit(e,n,a);i&&r.damageTaken.push(i)}const s=t.onCheck(n,a,i);s&&r.damageTaken.push(s)}function q(e,t,n){if(X(e.attackSpeed,n,H.player,"player")){const t=Q(e.attackTable);return H.player=n,t}return!1}function Y(e,t,n){if(X(e.attackSpeed,n,H.creature,"creature")){const a=Q({miss:e.AttackTable[r.miss]+t.missChance,dodge:e.AttackTable[r.dodge]+t.dodgeChance,parry:e.AttackTable[r.parry]+t.parry,glancing:0,block:e.AttackTable[r.block]+t.blockChance+(t.buffs["Holy Shield"]&&t.buffs["Holy Shield"].charges>0?30:0),crit:e.AttackTable[r.crit]-t.critReduction,crushing:e.AttackTable[r.crushing],hit:0});return H.creature=n,a}return!1}function Q(e){let t=100*Math.random();for(let n of Object.keys(e)){const a=e[n];if(t<=a)return r[n];t-=a}return r.hit}function X(e,t,n,a){const r=n+1e3*e<=t;return r&&("player"===a?H.player=t:H.creature=t),r}function Z(e,t){t.damageType===i.holy&&(G.has("Sanctity Aura - 0")?t.damageAmount=1.1*t.damageAmount:G.has("Sanctity Aura - 1")?t.damageAmount=1.11*t.damageAmount:G.has("Sanctity Aura - 2")&&(t.damageAmount=1.12*t.damageAmount),B.has("Misery")&&(t.damageAmount=1.05*t.damageAmount)),e.spec.talents.oneHandedSpec>0&&(t.damageAmount=t.damageAmount*(1+e.spec.talents.oneHandedSpec/100)),e.spec.talents.crusade>0&&(t.damageAmount=t.damageAmount*(1+e.spec.talents.crusade/100)),t.damageAmount=Math.round(t.damageAmount)}function ee(e,t){let n=t.damageAmount,a=.6;const r=e.spec.talents.improvedRighteousFury;r&&r>0&&(1===r&&(a*=1.16),2===r&&(a*=1.33),3===r&&(a*=1.5)),t.damageType===i.holy&&(n*=1+a),"Holy Shield"===t.circumstance&&(n*=1.35),t.threat=n}addEventListener("message",({data:e})=>{L=e.activeAbilities,G=e.buffs,B=e.debuffs,L.forEach(e=>{const t=e.match(/Retribution Aura - (\d)/);t&&t[1]&&(F=+t[1],L.delete(e),L.add("Retribution Aura"))});const t=new Array;for(let n=0;n<250;n++){N=!1,z=new P,J=Object(a.deserialize)(e.character,_),J.additionalStats.spellDamage=0,B.has("Judgement of the Crusader")&&(J.additionalStats.spellDamage+=219),G.has("Wrath of Air Totem")&&(J.additionalStats.spellDamage+=101),H={player:0,creature:0},x={attack:new s,SoV:new p,holyShield:new u,bossAttack:new M,consecration:new l,judgement:new h,as:new c,SoR:new f,retAura:new d(F)},E={playerAbilities:[x.SoR,x.as,x.attack,x.judgement,x.SoV,x.holyShield,x.consecration],bossAbilities:[x.bossAttack],reactiveAbilities:[x.holyShield,x.retAura]},V={value:!1,timeUpdated:0};const r=[],i=e.precast.map(e=>E.playerAbilities.find(t=>t.name===e));i.forEach((e,t)=>{const n=-1500*(i.length-t);L.has(e.name)&&e.onCast(J,z,n)});for(let e=-1500*i.length;e<0;e+=10){const t={damageTaken:[],damageDone:[]};i.forEach(n=>{if(L.has(n.name)){const a=n.onCheck(J,z,e);a&&(Z(J,a),ee(J,a),t.damageDone.push(a))}}),r.push(t)}for(let t=0;t<e.timeToRun;t+=10){t<=I&&(N=!1);const n={damageTaken:[],damageDone:[]};!0===V.value&&V.timeUpdated+1500<=t&&(V.value=!1,V.timeUpdated=t);let a=!1;N||(a=q(J,0,t),K(J,z,t,e)),E.playerAbilities.forEach(e=>{W(a,e,J,z,n,t)});const i=Y(z,J,t);E.bossAbilities.forEach(e=>{$(i,e,z,J,n,t)}),E.reactiveAbilities.forEach(e=>{U(i,e,z,J,n,t)}),r.push(n)}t.push({simResults:r,runNumber:n})}postMessage(t)})}});