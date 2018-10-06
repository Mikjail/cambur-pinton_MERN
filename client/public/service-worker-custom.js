
self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open('static')
        .then(function(cache){
            console.log('[SERVICE WORKER] Precaching app shell');
            cache.addAll([
                '/',
                '/index.html',
                '/static/js/bundle.js'
            ]);
        })
    );
  });
  
self.addEventListener('activate', function(event) {
console.log('[Service Worker] Activating Service Worker ....', event);
return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    // console.log(process.env.PUBLIC_URL);
    console.log( event.request.url);
    let redirecUrl = `/google/auth'`; 
    console.log(redirecUrl)
    if( event.request.url !==redirecUrl ){
        event.respondWith(
            fetch(event.request).catch(function(){
               caches.match(event.request).then(function(response){
                   if(response){
                       return response;
                   }
                   else{
                       return fetch(event.request)
                       .then(function(re){
                           return caches.open('dynamic')
                           .then(function(cache){
                               cache.put(event.request.url, res.clone());
                               return res;
                           })
                       })
                   }
               })
            })
        );
    }
  
});