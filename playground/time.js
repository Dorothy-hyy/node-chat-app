var moment = require('moment');

// var date = new Date();
// var months = ['Jan','Feb']
// console.log(date.getMonth());

// var date = moment();
// date.add(1, 'years').subtract(9, 'months');
// console.log(date.format('MMM Do YYYY'));

new Date().getTime();
var someTimestamp = moment().valueOf();

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
