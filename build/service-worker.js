/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/android-chrome-192x192.png","316b170cff245c14e2568f7c9bc48158"],["/android-chrome-512x512.png","61ca6e32c344b2e50d0774a13a391e7f"],["/android-icon-144x144.png","7d159a2a5070c4ea805f35021192eeed"],["/android-icon-192x192.png","82257bd2d3c3c9f31e84c6abeae271aa"],["/android-icon-36x36.png","077a895a0a10da2be1420dc9dc5162e8"],["/android-icon-48x48.png","e9b596877c3dba8edfb652263c5d36ab"],["/android-icon-72x72.png","094efd95545564f06d1d9061bde97b19"],["/android-icon-96x96.png","117adf2c36533ccce5fd92df04a6c6b8"],["/apple-icon-114x114.png","550f62c3a510b3bf2fdefaff63a49ee8"],["/apple-icon-120x120.png","9ef2a5defddc619f0f662e90be3a8640"],["/apple-icon-144x144.png","7d159a2a5070c4ea805f35021192eeed"],["/apple-icon-152x152.png","d4c65a424f2bb65201d63f365af08be7"],["/apple-icon-180x180.png","abf866fb8a6b21ab5b4b5d5642975da7"],["/apple-icon-57x57.png","652fb3f4eaf3fe3a8409097388df27b9"],["/apple-icon-60x60.png","e9fffa3eb2f101012ced5ee2bfb53106"],["/apple-icon-72x72.png","094efd95545564f06d1d9061bde97b19"],["/apple-icon-76x76.png","4d0fa9ad6437e75c7dfc64618cc00921"],["/apple-icon-precomposed.png","3ee946c3cc08bc9dc5af25dbf910dea9"],["/apple-icon.png","3ee946c3cc08bc9dc5af25dbf910dea9"],["/apple-touch-icon.png","80aa9ade1b9e526244fa714a5c04416e"],["/camburPinton.png","8a64d832cea28bfcf243974a47aa2446"],["/favicon-16x16.png","10fa55a97ba456f553a1b249a3b415ef"],["/favicon-32x32.png","739b566a2618fe2d601d33653b68b84c"],["/favicon-96x96.png","117adf2c36533ccce5fd92df04a6c6b8"],["/index.html","626b8db1594b60dff72b55e3724252de"],["/ios-appicon-1024-1024.png","f7ff44b9cdff6bf004e9c1b330df9065"],["/ms-icon-144x144.png","7d159a2a5070c4ea805f35021192eeed"],["/ms-icon-150x150.png","5d1c518ebc69696e1cd4faae1a2347ae"],["/ms-icon-310x310.png","8413943f8928473ca003929a541f7b8d"],["/ms-icon-70x70.png","53a1f4ca45127d90308be3435cd2df9b"],["/mstile-150x150.png","a048da8a65fc24025ee06dfe8e71c443"],["/pwacompat.min.js","4b1efe165c2468ae7262a6d0f615a88f"],["/safari-pinned-tab.svg","bc488c955729e1ca90d0609578ad10be"],["/static/css/main.d052651b.css","6bb295dc91aa662403114ed68aa30db4"],["/static/js/main.510466df.js","2271bcdfa29e8dd9c3f6fadda3f9ff5c"],["/static/media/QuesillosArepasQuesos.c1e5b329.png","c1e5b32992e1423db4a13d66f0d579fb"],["/static/media/Roboto-Bold.eed9aab5.woff","eed9aab5449cc9c8430d7d258108f602"],["/static/media/Roboto-Light.ea36cd9a.woff","ea36cd9a0e9eee97012a67b8a4570d7b"],["/static/media/Roboto-Medium.cf4d60bc.woff","cf4d60bc0b1d4b2314085919a00e1724"],["/static/media/Roboto-Regular.3cf6adf6.woff","3cf6adf61054c328b1b0ddcd8f9ce24d"],["/static/media/Roboto-Thin.44b78f14.woff","44b78f142603eb69f593ed4002ed7a4a"],["/static/media/TequeArepasEmpanadasPatacones.7333f941.png","7333f9417f7a789225944d6062510366"],["/static/media/backgroundHomePC.7a53f945.png","7a53f945f2f4bdc14faee96a11bd9415"],["/static/media/botonPideYa.2fba1b05.png","2fba1b05b7b78d2b24e7459564a424c3"],["/static/media/btngoogle.1cdc8fce.svg","1cdc8fce9609d07f0e9d8d0bc4b61f8f"],["/static/media/logotipoHome.2244b6dc.png","2244b6dc49ed56a671ce59a22f38f018"],["/static/media/mercadopago-logo.023f32ef.png","023f32ef34e96b836f80d96f965d60fe"],["/static/media/nosotros.579b0002.png","579b0002be8560b7293fa23a5cce51e1"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["^(?!.*\\/auth\\/google$).*$"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







