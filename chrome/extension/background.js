import iconUrl from '../assets/img/stretching.png';

function notify() {
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl,
        title: 'Time to stand up.',
        message: 'We want you to live longer!',
        isClickable: true
    });
}

chrome.runtime.onMessage.addListener(
    function (request) {
        console.log(request);
    });

chrome.alarms.onAlarm.addListener(function (alarm) {
    notify();
});

notify();

chrome.notifications.onClicked.addListener(notificationId => {
    chrome.notifications.clear(notificationId);
    window.open("http://www.liamqma.me/notify/office-stretches.jpg");
});

chrome.alarms.create('app', {
    periodInMinutes: 45
});