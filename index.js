const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require('fs');

var currentTime = '';
var socket1 = ['t1-desk   ', 'http://192.168.0.202/cm?cmnd=status%208', './data/t1-desk.csv', '0'];
var socket2 = ['t2-kitchen', 'http://192.168.0.102/cm?cmnd=status%208', './data/t2-kitchen.csv', '0'];
var socket3 = ['t3-room   ', 'http://192.168.0.86/cm?cmnd=status%208', './data/t3-room.csv', '0'];
var socket4 = ['t4-attic  ', 'http://192.168.0.207/cm?cmnd=status%208', './data/t4-attic.csv', '0'];

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
    var time = data.StatusSNS.Time;

    currentTime = time;
    time = time.slice(11);

    power = (power + parseInt(socket[3]) * 3 ) / 4;
    socket[3] = String(power);
    
    fs.appendFileSync(socket[2], time + ',' + String(power) + '\n');
    console.log(socket[0] + ' : ' + power);
    return;
}

//await new Promise(resolve => setTimeout(resolve, 5000));
