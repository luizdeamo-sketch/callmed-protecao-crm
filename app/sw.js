// O CRM da CallMed mudou para o CRM Aliança. Este service worker apaga o que o aplicativo antigo guardou
// no celular e se desliga, para o aparelho abrir a página de aviso com o endereço novo.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((cs) => cs.forEach((c) => c.navigate(c.url)))
  );
});
