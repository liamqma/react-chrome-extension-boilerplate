import iconUrl from '../../app/containers/stretching.png';

chrome.alarms.onAlarm.addListener(function(alarm) {
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl,
        title: 'Time to stand up.',
        message: 'We want you to live longer!',
        isClickable: true
    });
});

chrome.notifications.create('reminder', {
    type: 'basic',
    iconUrl,
    title: 'Time to stand up.',
    message: 'We want you to live longer!',
    isClickable: true
});

chrome.notifications.onClicked.addListener(notificationId => {
    chrome.notifications.clear(notificationId);
    window.open("http://www.liamqma.me/notify/office-stretches.jpg");
});

chrome.alarms.create('app', {
    periodInMinutes: 45
});