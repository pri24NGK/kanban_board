// http://localhost:3000/static/js/bundle.js
let cacheData = "LaneApp";
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(cacheData)
      .then((cache) => {
        cache.addAll([
            "/static/js/bundle.js",
            "/",
        ]);
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

this.addEventListener("fetch", (event) => {
    if(!navigator.onLine){
        event.respondWith(
            caches
              .match(event.request)
              .then((res) => {
                if(res){

                    return res;
                }
                let req_url=event.request.clone();
                fetch(req_url);
              })
              .catch((err) => {
                console.log(err);
              })
          );
    }
 
});