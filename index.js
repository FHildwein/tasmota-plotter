const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require('fs');
const http = require('http');

const PORT = 3000;

var currentTime = '';
var socket1 = ['t1-desk   ', 'http://192.168.178.101/cm?cmnd=status%208', './data/t1-desk.csv', './data/t1-desk-daily.csv', '0'];
var socket2 = ['t2-kitchen', 'http://192.168.178.102/cm?cmnd=status%208', './data/t2-kitchen.csv', './data/t2-kitchen-daily.csv', '0'];
var socket3 = ['t3-room   ', 'http://192.168.178.103/cm?cmnd=status%208', './data/t3-room.csv', './data/t3-room-daily.csv', '0'];
var socket4 = ['t4-attic  ', 'http://192.168.178.104/cm?cmnd=status%208', './data/t4-attic.csv', './data/t4-attic-daily.csv', '0'];

setInterval(main, 20000);

/**
 * Calls the writeDataPoint() function for each socket.
 */
async function main() {
    try {
        await writeDataPoint(socket1);
    } catch (error) {
        console.log('Error when chekcing Socket 1 :: ' + currentTime);
    }
    try {
        await writeDataPoint(socket2);
    } catch (error) {
        console.log('Error when chekcing Socket 2 :: ' + currentTime);
    }
    try {
        await writeDataPoint(socket3);
    } catch (error) {
        console.log('Error when chekcing Socket 3 :: ' + currentTime);
    }
    try {
        await writeDataPoint(socket4);
    } catch (error) {
        console.log('Error when chekcing Socket 4 :: ' + currentTime);
    }
    console.log('----------------');
}

/**
 * Reads and returns the SNS-Status of the Tasmota socket with the given adress.
 * @param {String} adress 
 * @returns Object
 */
async function readData(adress) {
    const res = await fetch(adress);
    const data = await res.json();
    return data;
}

/**
 * Takes a String Array as parameter and calls readData() for the socket-adress specified in the array.
 * Also saves the current time and powerusage of the socket in a file also specified in the array.
 * @param {String Array} socket 
 */
async function writeDataPoint(socket) {
    const data = await readData(socket[1]);

    var power = data.StatusSNS.ENERGY.Power;
    var timeAndDate = data.StatusSNS.Time;

    timeAndDate = timeAndDate.replace('T', '-')

    currentTime = timeAndDate;
    time = timeAndDate.slice(5);
    date = timeAndDate.slice(0, 10);

    if (date != socket[4]) {
        var powerDaily = data.StatusSNS.ENERGY.Yesterday;
        fs.appendFileSync(socket[3], date + ',' + String(powerDaily) + '\n');
        socket[4] = date;
    }

    fs.appendFileSync(socket[2], time + ',' + String(power) + '\n');
    console.log(socket[0] + ' : ' + power);
    return;
}