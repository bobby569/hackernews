"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/hackernews/index.html","1ea4f5b06d0c41fed413fb9e9203da3a"],["/hackernews/static/css/main.242267ed.css","77232d4297b6c0e81edf1646bf4a02b8"],["/hackernews/static/js/main.2c4cde5a.js","c55644170acc8df8fc8038e8f8bc59c2"],["/hackernews/static/media/Roboto-Bold.c0f1e4a4.woff2","c0f1e4a4fdfb8048c72e86aadb2a247d"],["/hackernews/static/media/Roboto-Bold.eed9aab5.woff","eed9aab5449cc9c8430d7d258108f602"],["/hackernews/static/media/Roboto-Light.3c37aa69.woff2","3c37aa69cd77e6a53a067170fa8fe2e9"],["/hackernews/static/media/Roboto-Light.ea36cd9a.woff","ea36cd9a0e9eee97012a67b8a4570d7b"],["/hackernews/static/media/Roboto-Medium.1561b424.woff2","1561b424aaef2f704bbd89155b3ce514"],["/hackernews/static/media/Roboto-Medium.cf4d60bc.woff","cf4d60bc0b1d4b2314085919a00e1724"],["/hackernews/static/media/Roboto-Regular.3cf6adf6.woff","3cf6adf61054c328b1b0ddcd8f9ce24d"],["/hackernews/static/media/Roboto-Regular.5136cbe6.woff2","5136cbe62a63604402f2fedb97f246f8"],["/hackernews/static/media/Roboto-Thin.1f35e6a1.woff2","1f35e6a11d27d2e10d28946d42332dc5"],["/hackernews/static/media/Roboto-Thin.44b78f14.woff","44b78f142603eb69f593ed4002ed7a4a"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),t=urlsToCacheKeys.has(a));var r="/hackernews/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL(r,self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});