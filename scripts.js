window.saveDataAcrossSessions = true;
const LEFT_CUTOFF = window.innerWidth / 4;
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4;
const number = document.getElementById('number');
const increase = document.getElementById('i');
const decrease = document.getElementById('d');
function increaseDecreaseResetCount(type) {
    if(type[0] === 'd') {
        number.innerHTML = parseInt(number.innerHTML) - 1;
    } else if(type[0] === 'i') {
        number.innerHTML = parseInt(number.innerHTML) + 1;
    } else {
        number.innerHTML = 0;
    };
};
let leftTime;
let rightTime;
let set = false;
webgazer.begin();
setTimeout(() => {
    webgazer.setGazeListener((data, timestamp) => {
        if(!data) return;
        if(data.x < LEFT_CUTOFF) {
            if(!leftTime) {
                leftTime = Math.floor(timestamp);
                set = false;
                return
            } else if(leftTime + 1500 >= Math.floor(timestamp) && leftTime + 1000 <= Math.floor(timestamp) && !set) {
                set = true;
                decrease.click();
                leftTime = null;
            } else if(leftTime + 1500 < Math.floor(timestamp)) leftTime = null;
        } else if(data.x > RIGHT_CUTOFF) {
            if(!rightTime) {
                rightTime = Math.floor(timestamp);
                set = false;
                return
            } else if(rightTime + 1500 >= Math.floor(timestamp) && rightTime + 1000 <= Math.floor(timestamp) && !set) {
                set = true;
                increase.click();
                rightTime = null;
            } else if(rightTime + 1050 < Math.floor(timestamp)) rightTime = null;
        };
    });
}, 2000);