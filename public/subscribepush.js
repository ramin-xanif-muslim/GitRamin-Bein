function subscribePush() {
    //Subscribes user to Push notifications
    registration.pushManager.subscribe({
      userVisibleOnly: true //Set user to see every notification
    })
    .then(function (subscription) {
      toast('Subscribed successfully.');
      console.info('Push notification subscribed.');
      console.log(subscription);
    })
    .catch(function (error) {
      console.error('Push notification subscription error: ', error);
    });
}