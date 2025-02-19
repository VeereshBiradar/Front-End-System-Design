//Check if service worker is supported by your browser   //Global scope

if(navigator.serviceWorker) {
    // register the service worker
    //register is an api/function provided by the browser, register api give you a promise
    navigator.serviceWorker.register('./service-worker.js').then(res => {
        console.log("Service worker registered successfully", res)
    })
    .catch(error => {
        console.log("Service worker throws an error while registering", error)
    })
}