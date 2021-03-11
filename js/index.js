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


const submitBtn = document.getElementById('submit-btn');
const inputFont = document.querySelectorAll('.font-buttons > input[type=button]');
const inputColor = document.querySelectorAll('.color-buttons > .container > button');
console.log(inputFont)
console.log(inputColor)

const imgs = document.querySelectorAll('.container > button > img');

// *****************************************************
inputFont.forEach(font => {
    font.addEventListener('click', (ev) => {
       
        inputFont.forEach(font => font.classList.remove('active-button'));
        ev.target.classList.add('active-button');
        
        switch(font.id) {
            case 'kumbh-sans':
                settingsContainer.style.fontFamily =  "Kumbh Sans" ,"sans-serif";
            
                break;
            case 'roboto-slab':
                settingsContainer.style.fontFamily = "Roboto Slab", "serif";
           
                break;
            case 'space-mono':
                settingsContainer.style.fontFamily = "Space Mono", "monospace";
       
                break;
            default:
                settingsContainer.style.fontFamily =  'Kumbh Sans' ,'sans-serif';
              
                break;
            }   
    })
})
// **********************************************
imgs.forEach(img => {
    img.addEventListener('click', (ev) => {
        ev.preventDefault();
        imgs.forEach(img => {
            img.classList.remove('active-checkmark')
            img.classList.add('hide-el');
        })
        ev.target.classList.add('active-checkmark');
        ev.target.classList.remove('hide-el');
        
    })
})

inputColor.forEach((color) => {
    color.addEventListener('click', (ev)=> {
        ev.preventDefault();
        switch(color.id) {
            case 'orange':
               submitBtn.style.backgroundColor = '#F87070';
                break;
            case 'light-green':
                submitBtn.style.backgroundColor = '#70F3F8';
                break;
            case 'perpule':
                submitBtn.style.backgroundColor = '#D881F8';
                break;
            default:
                submitBtn.style.backgroundColor = '#F87070';
                break;
        }   
    })
})  



// *************************Apply Button*****************************************


submitBtn.addEventListener('click', (ev) => {
    ev.preventDefault();

    // ***************************************************************************
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
    }) 
    // ***********************************************************************
  
    inputFont.forEach((font) => {
        
        if (font.classList.contains('active-button')) {
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
            
        }
        
    })

    // ***************************************************************************
    
   
    imgs.forEach(img => {
        if (img.classList.contains('active-checkmark')) {
            switch(img.id) {
            
                case 'orange-checked':
                    countDownTimer.circle.style.stroke = '#F87070';
                    navBg.style.backgroundColor = '#F87070';
                    submitBtn.style.backgroundColor = '#F87070';
                
                    break;
                case 'green-checked':
                    countDownTimer.circle.style.stroke = '#70F3F8';
                    navBg.style.backgroundColor = '#70F3F8';
                    submitBtn.style.backgroundColor = '#70F3F8';
                    break;
                case 'purple-checked':
                    countDownTimer.circle.style.stroke = '#D881F8';
                    navBg.style.backgroundColor = '#D881F8';
                    submitBtn.style.backgroundColor = '#D881F8'
                    break;
                default:
                    countDownTimer.circle.style.stroke = '#F87070';
                    navBg.style.backgroundColor = '#F87070';
                    submitBtn.style.backgroundColor = '#F87070';
                    break;
            }   
        }
    })
    
        
    

    settingsContainer.style.opacity = 0;
    settingsContainer.style.visibility = 'hidden'
})









      




