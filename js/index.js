class Timer {
    constructor(){
        this.type = "pomodoro";
        this.circle = document.querySelector('#ring > circle')
        this.clock = document.getElementById('time');
        this.actionElement = document.getElementById('action');
        this.timer = 25;
        this.text = `${this.timer <= 9 ? "0" + this.timer : this.timer}`;
        
    }

    // select 
    // 1. get type
    // 2. set timer
    // 3. reset
   

    // setting
    // 1. object

    reset(typ = 'pomodoro') {
        // stop the timer
        // text reset
         // timer reset
        // Action to reset
        this.stop();
        switch (typ) {
            case 'short-break':
                this.timer = 5;
                break;
            case 'long-break':
                this.timer = 15;
                break;
            default:
                this.timer = 25;
                break;
        }
        
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
countDownTimer.reset('pomodoro');  //--->Q: why not working with the Variable Name as the default parameter???

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
console.log(navLinks);

navLinks.forEach((navLink,i) => {
    navLink.addEventListener('click', (ev) => {
        navLinks.forEach(link => {link.classList.remove('active')})
        navBg.style.marginLeft= `calc(calc(100%/3) * ${i})`;
        ev.target.classList.add('active');

        console.log(navLink.id);

        switch (navLink.id) {     
            case 'short-break':
                countDownTimer.reset('short-break');
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

