class Timer {
    constructor(){
        this.type = "pomodoro";
        // this.obj = this.default;
        this.circle = document.querySelector('#ring > circle')
        this.clock = document.getElementById('time');
        this.actionElement = document.getElementById('action');
        this.timer = 25;
        this.text = `${this.timer <= 9 ? "0" + this.timer : this.timer}`;

        
    }



    // setting
    // setting(setInput) {
    //     setInput = {
    //         timer : 25,
    //         font: "'Kumbh Sans', 'sans-serif'" ,
    //         colorRing : 'var(--orange)' ,  
    //         colorNav : 'var(--orange)',
    //         colorBtn : 'var(--orange)',
    //     } 
    //     fonts = {
    //         "kumbh sans" : 'Kumbh Sans', 'sans-serif',
    //         "kumbh sans" : 'Kumbh Sans', 'sans-serif',
        
    //         }
    // } 
    
 
    
    


    reset( typ = 'pomodoro') {
        // stop the timer
        // text reset
         // timer reset
        // Action to reset
        
        switch (typ) {
            case 'short-break':
                this.timer = parseInt(document.getElementById('short-rest-input').value);
                break;
            case 'long-break':
                this.timer = parseInt(document.getElementById('long-rest-input').value);
                break;
            case 'pomodoro':
                this.timer =  parseInt(document.getElementById('pomodoro-input').value);
                break;
            default:
                this.timer =  parseInt(document.getElementById('pomodoro-input').value);
                break;
        }
        this.stop();
        // this.timer = time;
        this.text = `${this.timer <= 9 ? "0" + this.timer : this.timer}`;
        this.actionElement.innerText = 'start';
        this.clock.innerText = this.text + ':00';
        this.circle.style.strokeDashoffset = 1024;
       
    }

    start() {

        const format = (timeFormat) =>{
            return `${timeFormat < 10 ? '0'+ timeFormat : timeFormat}`;
        }
        this.clock.innerText = `${this.text}:00`;
        this.circle.style.strokeDashoffset = 1024;


        let time  = this.timer * 60;
        let startTime = time;
        let minutes = 0;
        let seconds = 0;
        time--;

        // timer count by 1 second incr
        this.interval = setInterval(()=> {
            minutes = Math.floor(time / 60); 
            seconds = Math.floor(time % 60);

            let minutesText = format(minutes);
            let secondsText = format(seconds);

            console.log('min:', minutesText);
            console.log('sec:', secondsText);

            this.clock.innerText =`${ minutesText} : ${secondsText}`;
            const percent = ((time % startTime) / startTime) ;
            const offset = percent * 1024;  //circumference --> raduis * 2 * PI --> circumfrence is 1024 , console.log(this.circle.style)--> check all the styles properties;
            
            this.circle.style.strokeDashoffset = offset;
            console.log('percent:', percent);
            // if (--time <= 0) {
            //     this.timer = 0;
            //     clearInterval(this.interval) // clearing the interval needs its own object
            // }
            (--time <=0 ? this.timer = 0 && clearInterval(this.interval): '') 
        }, 1000);
        // change clock text
        // Action text change
        this.actionElement.innerText = 'stop';


    }

    stop(){
        // pause time
        
        clearInterval(this.interval);
        // reset the action
        this.actionElement.innerText = 'start';

    }
}

// -----------------------------
// Timer Functions
// -----------------------------

const countDownTimer = new Timer();
countDownTimer.reset(this.timer); 


function action(str) {
    switch (str.toLowerCase()) {
        case "start":
            countDownTimer.start();
            break;
        default:
            countDownTimer.stop();
            break;
    }
}


// -------------------------------
// Nav functions
// -------------------------------

const navLinks = document.querySelectorAll('nav > ul > li');
const navBg = document.getElementById('bgindicator');
// console.log(navLinks);

navLinks.forEach((navLink,i) => {
    navLink.addEventListener('click', (ev) => {
        navLinks.forEach(link => {link.classList.remove('active')})
        navBg.style.marginLeft= `calc(calc(100%/3) * ${i})`;
        ev.target.classList.add('active');
        

        console.log(navLink.id);

        switch (navLink.id) {     
            case 'short-break':
                countDownTimer.reset('short-break' );
                break;
            case 'long-break':
                countDownTimer.reset('long-break');
                break;
            default:
                countDownTimer.reset('pomodoro');
                break;
        }
    })
   
})


// --------------------------------------------
// Settings
// ------------------------------------------------

// settings container
const settingsContainer = document.getElementById('settings-container');
// console.log(settingsContainer)
// settings button
document.querySelector('#settings > img').addEventListener('click', ev => {
    settingsContainer.style.visibility = 'visible'
    settingsContainer.style.opacity = 1;
});

document.getElementById('formouter').addEventListener('click', () => {

})
// number input up arrow
console.log(document.querySelectorAll('.up-arrow, .down-arrow'));
document.querySelectorAll('.up-arrow, .down-arrow').forEach((arrow) => {
    arrow.addEventListener('click', (ev) => ev.preventDefault());
   
})

// settings close button
document.querySelectorAll('#close, #settings-overlay').forEach(el => 
    el.addEventListener('click', ()=> {
        settingsContainer.style.opacity = 0;
        settingsContainer.style.visibility = 'hidden'
})
);


/**
 * Incr number input --> working with arrows up
 * @param {string} input the id of the number input
 * @returns 
 */
const inc = (input) => {
    document.getElementById(input).stepUp(1);

}

/**
 * dec number input --> working with arrows down
 * @param {string} input the id of the number input
 * @returns 
 */
const dec = (input) => {
 document.getElementById(input).stepDown(1);
}


// get the inputs and declear them
const inputTime =  document.querySelectorAll('.input > .input-number > input');
inputTime.forEach(el => {
    console.log(el.id, 'im the id');
    console.log(parseInt(el.value), 'input');
    switch(el.id) {
        case 'pomodoro-input' :
            countDownTimer.reset('pomodoro');
            break;
        case 'short-rest-input':
            countDownTimer.reset('short-rest' );
            break;
        case 'long-rest-input':
            countDownTimer.reset('long-rest');
            break;
        default :
            countDownTimer.reset('pomodoro');
            break;
    }
    console.log(this.timer, 'this.timer')
        
})


const inputFont = document.querySelectorAll('.font-buttons > input');
inputFont.forEach((font, i) => {
    font.addEventListener('click', ()=>{
        switch(font.id) {
            case 'kumbh-sans':
                document.body.style.fontFamily =  "Kumbh Sans" ,"sans-serif";
                break;
            case 'roboto-slab':
                document.body.style.fontFamily = "Roboto Slab", "serif";
                break;
            case 'space-mono':
                document.body.style.fontFamily = "Space Mono", "monospace";
                break;
            default:
                document.body.style.fontFamily =  'Kumbh Sans' ,'sans-serif';
                break;
        }
    })
})


const inputColor = document.querySelectorAll('.container > input');
inputColor.forEach((color, i) => {
    color.addEventListener('click', ()=>{
      
    })
})

console.log(inputFont);
console.log(inputColor);

// let newObj = {
//     time : inputTime(),

// }

const submitBtn = document.getElementById('submit-btn');
// submitBtn.addEventListener('click', () => {
//     countDownTimer.setting()
// })

// console.log(document.querySelectorAll(" input[type = 'button']"), 'fonts');







      




