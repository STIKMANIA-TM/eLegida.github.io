function initNotifications() {
  if (typeof OneSignal !== 'undefined') {
    OneSignal.push(function () {
      OneSignal.init({ appId: ONESIGNAL_APP_ID, notifyButton: { enable: true } });
    });
  }
}