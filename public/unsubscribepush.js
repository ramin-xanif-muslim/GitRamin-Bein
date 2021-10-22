
function unsubscribePush() {
    navigator.serviceWorker.ready
    .then(function(registration) {
      //Get subscription
      registration.pushManager.getSubscription()
      .then(function (subscription) {
        //If no `push subscription`, then return
        if(!subscription) {
          alert('Unable to unregister push notification.');
          return;
        }
 
        //Unsubscribes user
        subscription.unsubscribe()
          .then(function () {
            toast('Unsubscribed successfully.');
            console.info('Push notification unsubscribed.');
          })
          .catch(function (error) {
            console.error(error);
          });
      })
      .catch(function (error) {
        console.error('Failed to unsubscribe push notification.');
      });
    })
  }