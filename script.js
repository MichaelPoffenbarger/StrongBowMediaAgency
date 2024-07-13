let canvas;
let ctx;
let flowField;
let flowFieldAnimation;


window.onload = function() {
    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    
    flowField.animate(0);



}   

window.addEventListener('resize', function() {
    this.cancelAnimationFrame(flowFieldAnimation);
    canvas.width = window.innerWidth;
    console.log(canvas.width);
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
});

const mouse = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove', function(e){
    
    mouse.x = e.x;
    mouse.y = e.y;
})

class FlowFieldEffect {
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.lineWidth = 0.3;
        this.#width = width;
        this.#height = height;
        console.log('effect loaded');
        
        this.lastTime = 0;
        this.interval = 1000/60;
        this.timer = 0;
        this.cellSize = 100;
        this.gradient;
        this.#createGradient();
        this.#ctx.strokeStyle = this.gradient;
        this.radius = 2;
        this.vr = 0.01;

    }
    #createGradient() {

        // add vertical gradient effect

        /*
        this.gradient = this.#ctx.createLinearGradient(0, 0, 0, this.#height);
        this.gradient.addColorStop(0.1, "rgba(15, 15, 15, 0.1)");
        this.gradient.addColorStop(0.2, "rgba(15, 15, 15, 0.1)");
        this.gradient.addColorStop(0.4, "rgba(15, 15, 15, 0.1)");
        this.gradient.addColorStop(0.6, "rgba(15, 15, 15, 0.1)");
        this.gradient.addColorStop(0.89, "rgba(60, 60, 60, 0.2)");
        this.gradient.addColorStop(0.98, "rgba(220, 220, 220, 1)");
        */


        this.gradient = this.#ctx.createLinearGradient(0, 0, this.#width, this.#height);
        this.gradient.addColorStop(0.02, "#6adcf0");
        this.gradient.addColorStop(0.11, "rgba(15, 15, 15, 0.1)");
        this.gradient.addColorStop(0.2, "rgba(15, 15, 15, 0.1)");
        this.gradient.addColorStop(0.3, "rgba(15, 15, 15, 0.1)");
        this.gradient.addColorStop(0.4, "rgba(15, 15, 15, 0.1)");
        this.gradient.addColorStop(0.49, "rgba(15, 15, 15, 0.1)");
        this.gradient.addColorStop(0.5, "#6adcf0");
        this.gradient.addColorStop(0.51, "rgba(15, 15, 15, 0.1)");
        this.gradient.addColorStop(0.6, "rgba(15, 15, 15, 0.1)");
        this.gradient.addColorStop(0.89, "rgba(60, 60, 60, 0.2)");
        this.gradient.addColorStop(0.98, "#6adcf0");
    }
    #drawLine(angle, x, y) {
        let positionX = x;
        let positionY = y;
        let dx = mouse.x - positionX;
        let dy = mouse.y - positionY;
        let distance = dx * dx + dy * dy;
        if (distance > 600000) distance = 600000;
        else if (distance < 2000) distance = 2000;

        //draw a circle

        let radius = distance / 10000;
        this.#ctx.beginPath();
        this.#ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.#ctx.stroke();
        
        // draw a curve

        /*
        let length = distance / 10000;
        let controlX = x + Math.cos(angle) * length / 2;
        let controlY = y + Math.sin(angle) * length / 2;
        let endX = x + Math.sin(angle) * length + 100;
        let endY = y + Math.cos(angle) * length + 100;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        this.#ctx.stroke();
        */

        // draw a line

        /*
        let length = distance/10000;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x + Math.cos(angle) * length + 25, y + Math.sin(angle) * length +25);
        this.#ctx.lineTo(x + Math.sin(angle) * length + 100, y + Math.cos(angle) * length + 100);
        this.#ctx.stroke();
        */
    }
    animate(timeStamp) {
        let deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval) {
            
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            this.radius += this.vr;
            if (this.radius > 10 || this.radius < -10) this.vr *= -1;


            for (let y = 0; y < this.#height; y+= this.cellSize) {
                for (let x = 0; x < this.#width; x += this.cellSize) {
                    const angle = (Math.sin(x * 50) + Math.sin(y * 50)) * this.radius;
                    this.#drawLine(angle, x, y);
                }
            }
            

            this.timer = 0;

        } else {
            this.timer += deltaTime;
        }
        
      
       
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}

const button = document.getElementById('button1');

button.addEventListener('click', function() {
    // Code to make the form pop up
    
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    formContainer.style.height = '60vh';
    formContainer.style.width = '50vw';
    formContainer.style.position = 'absolute';
    formContainer.style.top = '20%';
    formContainer.style.zIndex = '5';
    formContainer.style.left = '45%';
    formContainer.style.border = '1px solid #6adcf0';
    formContainer.style.background = 'rgba(40, 40, 40, 0.4)';
    formContainer.style.borderRadius = '10px';
    formContainer.style.backdropFilter = 'blur(15px)';

    const form = document.createElement('form');
    form.classList.add('contact-form');
    form.style.height = '100%';
    form.style.width = '100%';


    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    nameLabel.style.fontFamily = 'Black Ops One';
    nameLabel.style.color = '#6adcf0';
    nameLabel.style.fontSize = '1.3rem'
    nameLabel.style.position = 'absolute';
    nameLabel.style.top = '15%';
    nameLabel.style.left = '5%';
   
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('required', true);
    nameInput.style.position = 'absolute';
    nameInput.style.top = '15%';
    nameInput.style.left = '20%';
    nameInput.style.width = '40%';
    nameInput.style.height = '6%';
    nameInput.style.fontFamily = 'Work Sans';
    nameInput.style.fontSize = '1.2rem';
    
    

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    emailLabel.style.position = 'absolute';
    emailLabel.style.top = '30%';
    emailLabel.style.left = '5%';
    emailLabel.style.fontFamily = 'Black Ops One';
    emailLabel.style.color = '#6adcf0';
    emailLabel.style.fontSize = '1.3rem'
    
    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('name', 'email');
    emailInput.setAttribute('required', true);
    emailInput.style.top = '30%'
    emailInput.style.left = '20%'
    emailInput.style.position = 'absolute';
    emailInput.style.fontFamily = 'Work Sans';
    emailInput.style.fontSize = '1.2rem';
    emailInput.style.width = '40%';
    emailInput.style.height = '6%';


    const messageLabel = document.createElement('label');
    messageLabel.textContent = 'Message:';
    messageLabel.style.fontFamily = 'Black Ops One';
    messageLabel.style.color = '#6adcf0';
    messageLabel.style.fontSize = '1.3rem'
    messageLabel.style.position = 'absolute';
    messageLabel.style.top = '55%';
    messageLabel.style.left = '5%';

    const messageTextarea = document.createElement('textarea');
    messageTextarea.setAttribute('name', 'message');
    messageTextarea.setAttribute('required', true);
    messageTextarea.style.position = 'absolute';
    messageTextarea.style.top = '55%';
    messageTextarea.style.left = '20%';
    messageTextarea.style.width = '70%';
    messageTextarea.style.height = '30%';
    messageTextarea.style.fontFamily = 'Work Sans';
    messageTextarea.style.fontSize = '1.2rem';
    messageTextarea.style.backgroundColor = 'lightgray';

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit';
    submitButton.style.height = '50px';
    submitButton.style.width = '100px';
    submitButton.style.bottom = '3%';
    submitButton.style.left = '50%';

    form.append(nameLabel, nameInput, emailLabel, emailInput, messageLabel, messageTextarea, submitButton);
    formContainer.appendChild(form);

    document.body.appendChild(formContainer);
    console.log('form-created');

    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.textContent = 'X';
    closeButton.style.height = '50px';
    closeButton.style.width = '50px';
    closeButton.style.top = '3%';
    closeButton.style.position = 'absolute';
    closeButton.style.left = '93%';

    closeButton.addEventListener('click', function() {
        document.body.removeChild(formContainer);
    });

    form.appendChild(closeButton);
});

const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const image4 = document.getElementById('image4');
const image5 = document.getElementById('image5');
const image6 = document.getElementById('image6');
const image7 = document.getElementById('image7');
const image8 = document.getElementById('image8');
const image9 = document.getElementById('image9');
const image10 = document.getElementById('image10');


image1.addEventListener('click', function() {
    // Code to create the popup window
    
    const popupContainer1 = document.createElement('div');
    popupContainer1.classList.add('popup-container');
    popupContainer1.style.height = '80vh';
    popupContainer1.style.width = '80vw';
    popupContainer1.style.position = 'fixed';
    popupContainer1.style.top = '10%';
    popupContainer1.style.left = '10%';
    popupContainer1.style.zIndex = '10';
    popupContainer1.style.border = '1px solid #6adcf0';
    popupContainer1.style.background = 'rgba(40, 40, 40, 0.8)';
    popupContainer1.style.borderRadius = '10px';
    popupContainer1.style.backdropFilter = 'blur(15px)';
    popupContainer1.style.display = 'flex';
    popupContainer1.style.justifyContent = 'center';
    popupContainer1.style.alignItems = 'center';

    const popupTitle1 = document.createElement('label');
    popupTitle1.textContent = 'About Me';
    popupTitle1.style.fontFamily = 'Black Ops One';
    popupTitle1.style.color = '#6adcf0';
    popupTitle1.style.fontSize = '2rem';
    popupTitle1.style.position = 'absolute';
    popupTitle1.style.top = '5%';
    popupTitle1.style.left = '5%';

    popupContainer1.appendChild(popupTitle1);


    const popupImage1 = document.createElement('img');
    popupImage1.setAttribute('src', image1.src);
    popupImage1.style.maxHeight = '90%';
    popupImage1.style.maxWidth = '90%';

    popupContainer1.appendChild(popupImage1);

    document.body.appendChild(popupContainer1);
    console.log('popup-created');

    popupContainer1.addEventListener('click', function() {
        document.body.removeChild(popupContainer1);
    });
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.textContent = 'X';
    closeButton.style.height = '50px';
    closeButton.style.width = '50px';
    closeButton.style.top = '3%';
    closeButton.style.position = 'absolute';
    closeButton.style.left = '93%';

    closeButton.addEventListener('click', function() {
        document.body.removeChild(popupContainer1);
    });

    popupContainer1.appendChild(closeButton);
});


image2.addEventListener('click', function() {   
    // Code to create the popup window
    
    const popupContainer2 = document.createElement('div');
    popupContainer2.classList.add('popup-container');
    popupContainer2.style.height = '80vh';
    popupContainer2.style.width = '80vw';
    popupContainer2.style.position = 'fixed';
    popupContainer2.style.top = '10%';
    popupContainer2.style.left = '10%';
    popupContainer2.style.zIndex = '10';
    popupContainer2.style.border = '1px solid #6adcf0';
    popupContainer2.style.background = 'rgba(40, 40, 40, 0.8)';
    popupContainer2.style.borderRadius = '10px';
    popupContainer2.style.backdropFilter = 'blur(15px)';
    popupContainer2.style.display = 'flex';
    popupContainer2.style.justifyContent = 'center';
    popupContainer2.style.alignItems = 'center';

    const popupTitle2 = document.createElement('label');
    popupTitle2.textContent = 'About Me';
    popupTitle2.style.fontFamily = 'Black Ops One';
    popupTitle2.style.color = '#6adcf0';
    popupTitle2.style.fontSize = '2rem';
    popupTitle2.style.position = 'absolute';
    popupTitle2.style.top = '5%';
    popupTitle2.style.left = '5%';

    popupContainer2.appendChild(popupTitle2);

    const popupImage2 = document.createElement('img');
    popupImage2.setAttribute('src', image2.src);
    popupImage2.style.maxHeight = '90%';
    popupImage2.style.maxWidth = '90%';

    popupContainer2.appendChild(popupImage2);

    document.body.appendChild(popupContainer2);
    console.log('popup-created');

    popupContainer2.addEventListener('click', function() {
        document.body.removeChild(popupContainer2);
    });
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.textContent = 'X';
    closeButton.style.height = '50px';
    closeButton.style.width = '50px';
    closeButton.style.top = '3%';
    closeButton.style.position = 'absolute';
    closeButton.style.left = '93%';

    closeButton.addEventListener('click', function() {
        document.body.removeChild(popupContainer2);
    });

    popupContainer2.appendChild(closeButton);

});

image3.addEventListener('click', function() {
    // Code to create the popup window

    const popupContainer3 = document.createElement('div');
    popupContainer3.classList.add('popup-container');
    popupContainer3.style.height = '80vh';
    popupContainer3.style.width = '80vw';
    popupContainer3.style.position = 'fixed';
    popupContainer3.style.top = '10%';
    popupContainer3.style.left = '10%';
    popupContainer3.style.zIndex = '10';
    popupContainer3.style.border = '1px solid #6adcf0';
    popupContainer3.style.background = 'rgba(40, 40, 40, 0.8)';
    popupContainer3.style.borderRadius = '10px';
    popupContainer3.style.backdropFilter = 'blur(15px)';
    popupContainer3.style.display = 'flex';
    popupContainer3.style.justifyContent = 'center';
    popupContainer3.style.alignItems = 'center';

    const popupTitle3 = document.createElement('label');
    popupTitle3.textContent = 'About Me';
    popupTitle3.style.fontFamily = 'Black Ops One';
    popupTitle3.style.color = '#6adcf0';
    popupTitle3.style.fontSize = '2rem';
    popupTitle3.style.position = 'absolute';
    popupTitle3.style.top = '5%';
    popupTitle3.style.left = '5%';

    popupContainer3.appendChild(popupTitle3);

    const popupImage3 = document.createElement('img');
    popupImage3.setAttribute('src', image3.src);
    popupImage3.style.maxHeight = '90%';
    popupImage3.style.maxWidth = '90%';


    popupContainer3.appendChild(popupImage3);

    document.body.appendChild(popupContainer3);
    console.log('popup-created');

    popupContainer3.addEventListener('click', function() {
        document.body.removeChild(popupContainer3);
    });
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.textContent = 'X';
    closeButton.style.height = '50px';
    closeButton.style.width = '50px';
    closeButton.style.top = '3%';
    closeButton.style.position = 'absolute';
    closeButton.style.left = '93%';

    closeButton.addEventListener('click', function() {
        document.body.removeChild(popupContainer3);
    });

    popupContainer3.appendChild(closeButton);

});

image4.addEventListener('click', function() {
    // Code to create the popup window

    const popupContainer4 = document.createElement('div');
    popupContainer4.classList.add('popup-container');
    popupContainer4.style.height = '80vh';
    popupContainer4.style.width = '80vw';
    popupContainer4.style.position = 'fixed';
    popupContainer4.style.top = '10%';
    popupContainer4.style.left = '10%';
    popupContainer4.style.zIndex = '10';
    popupContainer4.style.border = '1px solid #6adcf0';
    popupContainer4.style.background = 'rgba(40, 40, 40, 0.8)';
    popupContainer4.style.borderRadius = '10px';
    popupContainer4.style.backdropFilter = 'blur(15px)';
    popupContainer4.style.display = 'flex';
    popupContainer4.style.justifyContent = 'center';
    popupContainer4.style.alignItems = 'center';

    const popupTitle4 = document.createElement('label');
    popupTitle4.textContent = 'About Me';
    popupTitle4.style.fontFamily = 'Black Ops One';
    popupTitle4.style.color = '#6adcf0';
    popupTitle4.style.fontSize = '2rem';
    popupTitle4.style.position = 'absolute';
    popupTitle4.style.top = '5%';
    popupTitle4.style.left = '5%';

    popupContainer4.appendChild(popupTitle4);

    const popupImage4 = document.createElement('img');
    popupImage4.setAttribute('src', image4.src);
    popupImage4.style.maxHeight = '90%';
    popupImage4.style.maxWidth = '90%';


    popupContainer4.appendChild(popupImage4);

    document.body.appendChild(popupContainer4);
    console.log('popup-created');

    popupContainer4.addEventListener('click', function() {
        document.body.removeChild(popupContainer4);
    });
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.textContent = 'X';
    closeButton.style.height = '50px';
    closeButton.style.width = '50px';
    closeButton.style.top = '3%';
    closeButton.style.position = 'absolute';
    closeButton.style.left = '93%';

    closeButton.addEventListener('click', function() {
        document.body.removeChild(popupContainer4);
    });

    popupContainer4.appendChild(closeButton);

});

image5.addEventListener('click', function() {
    // Code to create the popup window

    const popupContainer5 = document.createElement('div');
    popupContainer5.classList.add('popup-container');
    popupContainer5.style.height = '80vh';
    popupContainer5.style.width = '80vw';
    popupContainer5.style.position = 'fixed';
    popupContainer5.style.top = '10%';
    popupContainer5.style.left = '10%';
    popupContainer5.style.zIndex = '10';
    popupContainer5.style.border = '1px solid #6adcf0';
    popupContainer5.style.background = 'rgba(40, 40, 40, 0.8)';
    popupContainer5.style.borderRadius = '10px';
    popupContainer5.style.backdropFilter = 'blur(15px)';
    popupContainer5.style.display = 'flex';
    popupContainer5.style.justifyContent = 'center';
    popupContainer5.style.alignItems = 'center';

    const popupTitle5 = document.createElement('label');
    popupTitle5.textContent = 'About Me';
    popupTitle5.style.fontFamily = 'Black Ops One';
    popupTitle5.style.color = '#6adcf0';
    popupTitle5.style.fontSize = '2rem';
    popupTitle5.style.position = 'absolute';
    popupTitle5.style.top = '5%';
    popupTitle5.style.left = '5%';

    popupContainer5.appendChild(popupTitle5);

    const popupImage5 = document.createElement('img');
    popupImage5.setAttribute('src', image5.src);
    popupImage5.style.maxHeight = '90%';
    popupImage5.style.maxWidth = '90%';


    popupContainer5.appendChild(popupImage5);

    document.body.appendChild(popupContainer5);
    console.log('popup-created');

    popupContainer5.addEventListener('click', function() {
        document.body.removeChild(popupContainer5);
    });
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.textContent = 'X';
    closeButton.style.height = '50px';
    closeButton.style.width = '50px';
    closeButton.style.top = '3%';
    closeButton.style.position = 'absolute';
    closeButton.style.left = '93%';

    closeButton.addEventListener('click', function() {
        document.body.removeChild(popupContainer5);
    });

    popupContainer5.appendChild(closeButton);

});

image6.addEventListener('click', function() {
    // Code to create the popup window

    const popupContainer6 = document.createElement('div');
    popupContainer6.classList.add('popup-container');
    popupContainer6.style.height = '80vh';
    popupContainer6.style.width = '80vw';
    popupContainer6.style.position = 'fixed';
    popupContainer6.style.top = '10%';
    popupContainer6.style.left = '10%';
    popupContainer6.style.zIndex = '10';
    popupContainer6.style.border = '1px solid #6adcf0';
    popupContainer6.style.background = 'rgba(40, 40, 40, 0.8)';
    popupContainer6.style.borderRadius = '10px';
    popupContainer6.style.backdropFilter = 'blur(15px)';
    popupContainer6.style.display = 'flex';
    popupContainer6.style.justifyContent = 'center';
    popupContainer6.style.alignItems = 'center';

    const popupTitle6 = document.createElement('label');
    popupTitle6.textContent = 'About Me';
    popupTitle6.style.fontFamily = 'Black Ops One';
    popupTitle6.style.color = '#6adcf0';
    popupTitle6.style.fontSize = '2rem';
    popupTitle6.style.position = 'absolute';
    popupTitle6.style.top = '5%';
    popupTitle6.style.left = '5%';

    popupContainer6.appendChild(popupTitle6);

    const popupImage6 = document.createElement('img');
    popupImage6.setAttribute('src', image6.src);
    popupImage6.style.maxHeight = '90%';
    popupImage6.style.maxWidth = '90%';


    popupContainer6.appendChild(popupImage6);

    document.body.appendChild(popupContainer6);
    console.log('popup-created');

    popupContainer6.addEventListener('click', function() {
        document.body.removeChild(popupContainer6);
    });
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.textContent = 'X';
    closeButton.style.height = '50px';
    closeButton.style.width = '50px';
    closeButton.style.top = '3%';
    closeButton.style.position = 'absolute';
    closeButton.style.left = '93%';

    closeButton.addEventListener('click', function() {
        document.body.removeChild(closeButton);
    });

    popupContainer6.appendChild(closeButton);

});

image7.addEventListener('click', function() {
    // Code to create the popup window

    const popupContainer7 = document.createElement('div');
    popupContainer7.classList.add('popup-container');
    popupContainer7.style.height = '80vh';
    popupContainer7.style.width = '80vw';
    popupContainer7.style.position = 'fixed';
    popupContainer7.style.top = '10%';
    popupContainer7.style.left = '10%';
    popupContainer7.style.zIndex = '10';
    popupContainer7.style.border = '1px solid #6adcf0';
    popupContainer7.style.background = 'rgba(40, 40, 40, 0.8)';
    popupContainer7.style.borderRadius = '10px';
    popupContainer7.style.backdropFilter = 'blur(15px)';
    popupContainer7.style.display = 'flex';
    popupContainer7.style.justifyContent = 'center';
    popupContainer7.style.alignItems = 'center';

    const popupTitle7 = document.createElement('label');
    popupTitle7.textContent = 'About Me';
    popupTitle7.style.fontFamily = 'Black Ops One';
    popupTitle7.style.color = '#6adcf0';
    popupTitle7.style.fontSize = '2rem';
    popupTitle7.style.position = 'absolute';
    popupTitle7.style.top = '5%';
    popupTitle7.style.left = '5%';

    popupContainer7.appendChild(popupTitle7);

    const popupImage7 = document.createElement('img');
    popupImage7.setAttribute('src', image7.src);
    popupImage7.style.maxHeight = '90%';
    popupImage7.style.maxWidth = '90%';


    popupContainer7.appendChild(popupImage7);

    document.body.appendChild(popupContainer7);
    console.log('popup-created');

    popupContainer7.addEventListener('click', function() {
        document.body.removeChild(popupContainer7);
    });
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.textContent = 'X';
    closeButton.style.height = '50px';
    closeButton.style.width = '50px';
    closeButton.style.top = '3%';
    closeButton.style.position = 'absolute';
    closeButton.style.left = '93%';

    closeButton.addEventListener('click', function() {
        document.body.removeChild(popupContainer7);
    });

    popupContainer7.appendChild(closeButton);

});

image8.addEventListener('click', function() {
    // Code to create the popup window

    const popupContainer8 = document.createElement('div');
    popupContainer8.classList.add('popup-container');
    popupContainer8.style.height = '80vh';
    popupContainer8.style.width = '80vw';
    popupContainer8.style.position = 'fixed';
    popupContainer8.style.top = '10%';
    popupContainer8.style.left = '10%';
    popupContainer8.style.zIndex = '10';
    popupContainer8.style.border = '1px solid #6adcf0';
    popupContainer8.style.background = 'rgba(40, 40, 40, 0.8)';
    popupContainer8.style.borderRadius = '10px';
    popupContainer8.style.backdropFilter = 'blur(15px)';
    popupContainer8.style.display = 'flex';
    popupContainer8.style.justifyContent = 'center';
    popupContainer8.style.alignItems = 'center';

    const popupTitle8 = document.createElement('label');
    popupTitle8.textContent = 'About Me';
    popupTitle8.style.fontFamily = 'Black Ops One';
    popupTitle8.style.color = '#6adcf0';
    popupTitle8.style.fontSize = '2rem';
    popupTitle8.style.position = 'absolute';
    popupTitle8.style.top = '5%';
    popupTitle8.style.left = '5%';

    popupContainer8.appendChild(popupTitle8);

    const popupImage8 = document.createElement('img');
    popupImage8.setAttribute('src', image8.src);
    popupImage8.style.maxHeight = '90%';
    popupImage8.style.maxWidth = '90%';


    popupContainer8.appendChild(popupImage8);

    document.body.appendChild(popupContainer8);
    console.log('popup-created');

    popupContainer8.addEventListener('click', function() {
        document.body.removeChild(popupContainer8);
    });
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.textContent = 'X';
    closeButton.style.height = '50px';
    closeButton.style.width = '50px';
    closeButton.style.top = '3%';
    closeButton.style.position = 'absolute';
    closeButton.style.left = '93%';

    closeButton.addEventListener('click', function() {
        document.body.removeChild(popupContainer8);
    });

    popupContainer8.appendChild(closeButton);

});

image9.addEventListener('click', function() {
    // Code to create the popup window

    const popupContainer9 = document.createElement('div');
    popupContainer9.classList.add('popup-container');
    popupContainer9.style.height = '80vh';
    popupContainer9.style.width = '80vw';
    popupContainer9.style.position = 'fixed';
    popupContainer9.style.top = '10%';
    popupContainer9.style.left = '10%';
    popupContainer9.style.zIndex = '10';
    popupContainer9.style.border = '1px solid #6adcf0';
    popupContainer9.style.background = 'rgba(40, 40, 40, 0.8)';
    popupContainer9.style.borderRadius = '10px';
    popupContainer9.style.backdropFilter = 'blur(15px)';
    popupContainer9.style.display = 'flex';
    popupContainer9.style.justifyContent = 'center';
    popupContainer9.style.alignItems = 'center';

    const popupTitle9 = document.createElement('label');
    popupTitle9.textContent = 'About Me';
    popupTitle9.style.fontFamily = 'Black Ops One';
    popupTitle9.style.color = '#6adcf0';
    popupTitle9.style.fontSize = '2rem';
    popupTitle9.style.position = 'absolute';
    popupTitle9.style.top = '5%';
    popupTitle9.style.left = '5%';

    popupContainer9.appendChild(popupTitle9);

    const popupImage9 = document.createElement('img');
    popupImage9.setAttribute('src', image9.src);
    popupImage9.style.maxHeight = '90%';
    popupImage9.style.maxWidth = '90%';


    popupContainer9.appendChild(popupImage9);

    document.body.appendChild(popupContainer9);
    console.log('popup-created');

    popupContainer9.addEventListener('click', function() {
        document.body.removeChild(popupContainer9);
    });
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.textContent = 'X';
    closeButton.style.height = '50px';
    closeButton.style.width = '50px';
    closeButton.style.top = '3%';
    closeButton.style.position = 'absolute';
    closeButton.style.left = '93%';

    closeButton.addEventListener('click', function() {
        document.body.removeChild(popupContainer9);
    });

    popupContainer9.appendChild(closeButton);

});

image10.addEventListener('click', function() {
    // Code to create the popup window

    const popupContainer10 = document.createElement('div');
    popupContainer10.classList.add('popup-container');
    popupContainer10.style.height = '80vh';
    popupContainer10.style.width = '80vw';
    popupContainer10.style.position = 'fixed';
    popupContainer10.style.top = '10%';
    popupContainer10.style.left = '10%';
    popupContainer10.style.zIndex = '10';
    popupContainer10.style.border = '1px solid #6adcf0';
    popupContainer10.style.background = 'rgba(40, 40, 40, 0.8)';
    popupContainer10.style.borderRadius = '10px';
    popupContainer10.style.backdropFilter = 'blur(15px)';
    popupContainer10.style.display = 'flex';
    popupContainer10.style.justifyContent = 'center';
    popupContainer10.style.alignItems = 'center';

    const popupTitle10 = document.createElement('label');
    popupTitle10.textContent = 'About Me';
    popupTitle10.style.fontFamily = 'Black Ops One';
    popupTitle10.style.color = '#6adcf0';
    popupTitle10.style.fontSize = '2rem';
    popupTitle10.style.position = 'absolute';
    popupTitle10.style.top = '5%';
    popupTitle10.style.left = '5%';

    popupContainer10.appendChild(popupTitle10);

    const popupImage10 = document.createElement('img');
    popupImage10.setAttribute('src', image10.src);
    popupImage10.style.maxHeight = '90%';
    popupImage10.style.maxWidth = '90%';


    popupContainer10.appendChild(popupImage10);

    document.body.appendChild(popupContainer10);
    console.log('popup-created');

    popupContainer10.addEventListener('click', function() {
        document.body.removeChild(popupContainer10);
    });
    const closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.textContent = 'X';
    closeButton.style.height = '50px';
    closeButton.style.width = '50px';
    closeButton.style.top = '3%';
    closeButton.style.position = 'absolute';
    closeButton.style.left = '93%';

    closeButton.addEventListener('click', function() {
        document.body.removeChild(popupContainer10);
    });

    popupContainer10.appendChild(closeButton);

});