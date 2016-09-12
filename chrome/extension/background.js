import iconUrl from '../assets/img/stretching.png';
import { has } from 'lodash';
import moment from 'moment';

// constants
const defaultEvery = 45;
const defaultFrom = 9;
const defaultTo = 17;
const periodInMinutes = 1; // mins

// start event loop
chrome.alarms.create('app', {
    periodInMinutes
});

// listen on event loop
chrome.alarms.onAlarm.addListener(function () {
    chrome.storage.local.get(['form', 'to', 'last', 'every'], (result = {}) => {
        if (checkWithin(result) && checkLast(result)) {
            notify();
        }
    });
});

// check if within 'from' and 'to'
function checkWithin(data = {}) {
    const from = data.from ? moment(data.from, 'HH') : moment(defaultFrom, 'HH');
    const to = data.to ? moment(data.to, 'HH') : moment(defaultTo, 'HH');
    return moment().isBetween(from, to);
}

/**
 * check if last reminder is older than user chosen schedule
 * return true if last reminder is too old otherwise return false
 * @param data
 * @returns {boolean}
 */
function checkLast(data = {}) {
    if (!data.last) return true;
    return moment(data.last).add(data.every || defaultEvery, 'm').isBefore();
}

// helpers
function notify() {
    chrome.notifications.create('reminder', {
        type: 'basic',
        iconUrl,
        title: 'Time to stand up.',
        message: 'We want you to live longer!',
        isClickable: true
    }, () => {
        const last = moment().format();
        chrome.storage.local.set({last});
    });
}

chrome.notifications.onClicked.addListener(notificationId => {
    chrome.notifications.clear(notificationId);
    window.open("https://raw.githubusercontent.com/liamqma/stretch-reminder-chome-extension/master/chrome/assets/img/office-stretches.jpg");
});