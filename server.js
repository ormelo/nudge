const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();

//console.log(vapidKeys)

//remove `{{  }}` when you are providing keys

webpush.setGCMAPIKey('AAAAOBIJvSY:APA91bGezg-tBmLJ7xKsFCa6EEyCqvibb7KtfubDJEBIuUFmMrM6t06SdIGZ6FIZMu0K57EzAy3HfUjA-yC6brm9rXJqOonEl8mn4F4-lhyY3uuYzx3BJNvlmnhDkdCxP7vlj4RrkS3k');
//Above is obtained from https://console.firebase.google.com/project/push-notification-web-d0beb/settings/cloudmessaging

webpush.setVapidDetails(
  'mailto:sampath.oops@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// This is the same output of calling JSON.stringify on a PushSubscription

// TODO the keys are to be obtained yourself and filled out
const pushSubscription = {
  endpoint: 'https://android.googleapis.com/gcm/send/dqeyAVdBBYg:APA91bE8mq-Nl8I0WDUyLSbXzH-1Y18vXaH_8VM4QBOMcV5n2CXoWbFWqSO9IPpmTNSrGtrdW68_mnUcWwR08ICZXje8x2JeCQlcN1L-EMPzo0U8kLljbA5rCG-L7QEtV5VWiSzqjrJ6',
  keys: {
    auth: '7P2G6yPjWyVySgyvwid9PQ==',
    p256dh: 'BLJaat9FW_NbKBiLIxv8GY2Pvjs-P7pJ7km8Ti8MV7fVj70xIQ3aGWO50d5s7tyP1stNYnXiEmyjmpBM73fh62c='
  }
};

console.log(vapidKeys.publicKey)

webpush.sendNotification(pushSubscription, 'The server remembers!')
.then(function(result){
  console.log(result)
}).catch(function(error){
  console.log('error', error)
})
