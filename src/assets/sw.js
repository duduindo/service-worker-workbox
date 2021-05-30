/* https://developers.google.com/web/tools/workbox/guides/get-started */

import { registerRoute, setCatchHandler } from 'workbox-routing'
import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute, matchPrecache } from 'workbox-precaching'


const __WB_MANIFEST = [
  {
    url: 'index.bundle.js',
    revision: '5',
  },
]

precacheAndRoute(__WB_MANIFEST)

setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document') {
    return matchPrecache('/offline.html')
  }

  return Response.error()
})


//
// HTML (only)
// ======================================================
registerRoute(
  ({ request }) => request.mode === 'navigate',

  new NetworkFirst({
    cacheName: 'pages',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),

      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      })
    ]
  })
)


//
// CSS, JS and Web Worker requests
// ======================================================
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'worker',

  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      })
    ]
  })
)


//
// Images
// ======================================================
registerRoute(
  ({ request }) => request.destination === 'image',

  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),

      // Don't cache more than 50 items, and expire them after 30 days
      new ExpirationPlugin({
        maxEntries: 3,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      })
    ]
  })
)
