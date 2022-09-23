/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-925cecd5'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "/_next/build-manifest.json",
    "revision": "e5c98a5453fea41f1b043cb3aa4da5b1"
  }, {
    "url": "/_next/react-loadable-manifest.json",
    "revision": "77fcdfd8a4ef0f7d5f4e774621c436ff"
  }, {
    "url": "/_next/server/middleware-build-manifest.js",
    "revision": "2ee06ed0ea9b3c6997ba1efcfff7cd66"
  }, {
    "url": "/_next/server/middleware-react-loadable-manifest.js",
    "revision": "1b88841335d3a8d772193162ccf75114"
  }, {
    "url": "/_next/static/chunks/amp.js",
    "revision": "8b56bc1a9915e4d8634d2430e683ff95"
  }, {
    "url": "/_next/static/chunks/node_modules_next_dist_pages__app_js.js",
    "revision": "0cb6c1d446b9e13bb26cac842d8e3e70"
  }, {
    "url": "/_next/static/chunks/node_modules_next_dist_pages__error_js.js",
    "revision": "3a4b2b63c58c4074516b2bb7376dd3b7"
  }, {
    "url": "/_next/static/chunks/pages/_app.js",
    "revision": "ee7fb8163cdfc75fb2587038b557e51b"
  }, {
    "url": "/_next/static/chunks/pages/_error.js",
    "revision": "595d01b50025e1a977559b81e30b6981"
  }, {
    "url": "/_next/static/chunks/polyfills.js",
    "revision": "837c0df77fd5009c9e46d446188ecfd0"
  }, {
    "url": "/_next/static/chunks/react-refresh.js",
    "revision": "53ba82e687c80c118486ed55c688ba35"
  }, {
    "url": "/_next/static/chunks/webpack.js",
    "revision": "79b92d203337f8efc918a27515dbb6a6"
  }, {
    "url": "/_next/static/development/_buildManifest.js",
    "revision": "e277c982764c0c0f1d07433247786fe8"
  }, {
    "url": "/_next/static/development/_ssgManifest.js",
    "revision": "abee47769bf307639ace4945f9cfd4ff"
  }, {
    "url": "/_next/static/media/fa-brands-400.86c7e1fa.woff2",
    "revision": "86c7e1fa"
  }, {
    "url": "/_next/static/media/fa-brands-400.f5defc2e.ttf",
    "revision": "f5defc2e"
  }, {
    "url": "/_next/static/media/fa-regular-400.3edb9004.ttf",
    "revision": "3edb9004"
  }, {
    "url": "/_next/static/media/fa-regular-400.e0550912.woff2",
    "revision": "e0550912"
  }, {
    "url": "/_next/static/media/fa-solid-900.64d5644d.woff2",
    "revision": "64d5644d"
  }, {
    "url": "/_next/static/media/fa-solid-900.f418d876.ttf",
    "revision": "f418d876"
  }, {
    "url": "/_next/static/media/fa-v4compatibility.7e7e1dad.ttf",
    "revision": "7e7e1dad"
  }, {
    "url": "/_next/static/media/fa-v4compatibility.9765b558.woff2",
    "revision": "9765b558"
  }], {
    "ignoreURLParametersMatching": [/ts/]
  });
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }

        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
