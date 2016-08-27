import iconUrl from '../assets/img/stretching.png';
import { has } from 'lodash';
import moment from 'moment';

// constants
const defaultEvery = 45;
const defaultFrom = 9;
const defaultTo = 17;

// helpers
function notify() {
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl,
        title: 'Time to stand up.',
        message: 'We want you to live longer!',
        isClickable: true
    });
}

/**
 * Get interval from local storage if there is, otherwise use default interval
 */
function startReminder() {
    chrome.storage.local.get('every', function (result) {
        if (has(result, 'every')) {
            setReminderTimer(result.every);
        } else {
            chrome.storage.local.set({every: defaultEvery}, function (result) {
                setReminderTimer(defaultEvery);
            });
        }
    });
}

/**
 * Set reminder timer. If there is a timer set already, it will be canceled and replaced by this alarm
 * @param {number} every
 */
function setReminderTimer(every) {
    chrome.alarms.create('app', {
        periodInMinutes: every
    });
}

// start reminder interval
startReminder();

// listeners
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.every) {
            startReminder();
        }
        sendResponse();
    });

chrome.alarms.onAlarm.addListener(function () {
    chrome.storage.local.get(['form', 'to'], function (result) {
        let from, to;
        if (has(result, 'from')) {
            from = moment(result.from, 'HH');
        } else {
            from = moment(defaultFrom, 'HH');
        }
        if (has(result, 'to')) {
            to = moment(result.to, 'HH');
        } else {
            to = moment(defaultTo, 'HH');
        }
        if (moment().isBetween(from, to)) {
            notify();
        }
    });
});

chrome.notifications.onClicked.addListener(notificationId => {
    chrome.notifications.clear(notificationId);
    window.open("http://www.liamqma.me/notify/office-stretches.jpg");
});