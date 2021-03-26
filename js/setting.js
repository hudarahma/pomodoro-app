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

const colorObj = {
    'orange' : '#F87070',
    'light-green': '#70F3F8',
    'perpule' :  '#D881F8',
}

inputColor.forEach((color) => {
    color.addEventListener('click', (ev)=> {
        ev.preventDefault();
        submitBtn.style.backgroundColor = colorObj[color.id];
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
            let selectedColor = colorObj[img.id];
            switch(img.id) {
            
                case 'orange-checked':
                    countDownTimer.circle.style.stroke = colorObj['orange'];
                    navBg.style.backgroundColor = colorObj['orange'];
                    submitBtn.style.backgroundColor =  colorObj['orange'];
                
                    break;
                case 'green-checked':
                    countDownTimer.circle.style.stroke = colorObj['light-green'];
                    navBg.style.backgroundColor = colorObj['light-green'];
                    submitBtn.style.backgroundColor = colorObj['light-green'];
                    break;
                case 'purple-checked':
                    countDownTimer.circle.style.stroke = colorObj['perpule'];
                    navBg.style.backgroundColor = colorObj['perpule'];;
                    submitBtn.style.backgroundColor = colorObj['perpule'];
                    break;
                default:
                    countDownTimer.circle.style.stroke = colorObj['orange'];
                    navBg.style.backgroundColor = colorObj['orange'];
                    submitBtn.style.backgroundColor = colorObj['orange'];
                    break;
            }   
        }
    })
    settingsContainer.style.opacity = 0;
    settingsContainer.style.visibility = 'hidden'
})