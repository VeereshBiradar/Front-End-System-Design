const CACHE_NAME = 'service-worker/v1';

const CACHE_FILE = [
    './index.html',
    './style.css',
    './script.js'
]

//install will happen while page load
self.addEventListener('install', (e)=> {
    //install event will for the below code to comeplete
    e.waituntill(
        caches.open(CACHE_NAME).then(cache=> {
            cache.addAll(CACHE_FILE);
        })
    )
});


self.addEventListener('activate', (e)=> {
    //clean up the useless cache
    e.waitUntil(
        caches.keys().then((keyList)=> {
            return Promise.all(
                keyList.map((key)=> {
                    if(key !== CACHE_NAME) {
                        return caches.delete(key)
                    }
                })
            )
        })
    )
})



self.addEventListener('fetch', (e)=> {

    e.respondWith(
        fetch(e.request)
        .then((res)=> {
            //update my cache
            const cloneData = res.clone();
            caches.open(CACHE_NAME).then((cache)=>{
                cache.put(e.request, cloneData);
            });
            console.log("returning from the network")
            return res;
        })
        .catch(()=> {
            console.log("returning from the cache")
            return caches.match(e.request).then((file)=> file)
        })
    )
})