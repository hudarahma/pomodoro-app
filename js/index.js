

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

