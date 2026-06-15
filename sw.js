// Service worker for Attune Ops push notifications.
self.addEventListener('push', (event) => {
  let data = {}
  try {
    data = event.data ? event.data.json() : {}
  } catch (e) {
    data = { title: 'Attune Ops', body: event.data ? event.data.text() : '' }
  }
  const title = data.title || 'Attune Ops'
  const options = {
    body: data.body || '',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    data: { url: data.url || 'https://attuneapp.io/ops' },
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = (event.notification.data && event.notification.data.url) || 'https://attuneapp.io/ops'
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      for (const w of wins) {
        if (w.url.includes('attuneapp.io') && 'focus' in w) return w.focus()
      }
      if (clients.openWindow) return clients.openWindow(url)
    })
  )
})
