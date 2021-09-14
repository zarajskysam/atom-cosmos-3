const block = document.querySelector('.questions__item'),
      buttons = document.querySelectorAll('.question__item__options__item'),
      rocket = document.querySelector('.rocket'),
      crash = document.querySelector('.crash');


const questions = [{
    question : 'Выберите город Воронеж',
    items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
    answer : 0
    },
    {
    question : 'Выберите город Тула',
    items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
    answer : 3
    },
    {
        question : 'Выберите город Самара',
        items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
        answer : 1
    },
    {
        question : 'Выберите город Москва',
        items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
        answer : 2
    },
    {
        question : '2+2',
        items : ['3', '4', '34', '12'],
        answer : 1
    },
    {
        question : 'Выберите город Тула',
        items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
        answer : 3
        },
        {
            question : 'Выберите город Самара',
            items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
            answer : 1
        },
        {
            question : 'Выберите город Москва',
            items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
            answer : 2
        },
        {
            question : '2+2',
            items : ['3', '4', '34', '12'],
            answer : 1
        },{
            question : 'Выберите город Тула',
            items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
            answer : 3
            },
            {
                question : 'Выберите город Самара',
                items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
                answer : 1
            },
            {
                question : 'Выберите город Москва',
                items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
                answer : 2
            },
            {
                question : '2+2',
                items : ['3', '4', '34', '12'],
                answer : 1
            },{
                question : 'Выберите город Тула',
                items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
                answer : 3
                },
                {
                    question : 'Выберите город Самара',
                    items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
                    answer : 1
                },
                {
                    question : 'Выберите город Москва',
                    items : ['Voronezh', 'Samara', 'Moscow', 'Tula'],
                    answer : 2
                },
                {
                    question : '2+2',
                    items : ['3', '4', '34', '12'],
                    answer : 1
                }   
];

let mistakes = 0; 
let points = 0;
let tour = 0;
let tl = new TimelineMax({ repeat: 1 }).to('.rocket', 0, {y: 0 });


$('.test__block__content__button').click((e) => {
    e.preventDefault();
    $('.game').slideDown();
    newGame();
    
});
$('.game__close__btn').click((e) => {
    $('.game').fadeOut();
});

async function startGame() {
    tl = await new TimelineMax({ repeat: 1 }).to('.rocket', 0, {y: 0, opacity: 1 });
    tl.kill(null);
    rocket.src = 'src/img/game/rockets/1.1.png';
    mistakes = 0;
    points = 0;
    tour = 0;
    await $(block).fadeOut(200);
    block.innerHTML = `<div class="questions__item__text">${questions[0].question}</div>
                            <ul class="questions__item__options">
                                <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[0].items[0]}</div></li>
                                <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[0].items[1]}</div></li>
                                <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[0].items[2]}</div></li>
                                <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[0].items[3]}</div></li>
                            </ul>`;
    await $(block).fadeIn(0);
}

async function newGame() {
    if (tl != 0) {
        await tl.kill(null);
        await gsap.to('.rocket', {
            duration: 0,
            y : 0,
            rotation: 0,
            opacity: 1
        })
        rocket.src = 'src/img/game/rockets/1.1.png';
    }
    mistakes = 0;
    points = 0;
    tour = 0;
    tl = 0;
    block.innerHTML = `<div class="questions__item__text">Кажется, ракета готова к запуску...</div>
                            <div class="questions__start">ПОЕХАЛИ!</div>`;
}

block.addEventListener('click', async (e) => {
    if(e.target.classList.contains('question__item__options__item')){
        if(e.target.getAttribute('data-id') == '1') {
            return;
        }
        e.target.setAttribute('data-id', '1');
        if(e.target.innerHTML == questions[tour].items[questions[tour].answer]){
            e.target.style.backgroundColor = 'green';
            points++;
        } else {
            e.target.style.backgroundColor = 'red';
            mistakes++;
        }
        await gsap.to(block, {
            opacity: 0,
            duration: 0.2,
        })
        await tour++;
        await checkLose();
        await nextQuestion();
        await rocketAnimation();
        await gsap.to(block, {
            opacity: 1,
            duration: 0.2,
        })  
    }
    if(e.target.classList.contains('questions__start')) {
        startGame();
    }
});

function nextQuestion() {
    if ( points >=6 ) {
        block.innerHTML = `<div class="questions__item__text">Ура! Вам удалось запустить ракету. До встречи в космосе!</div>
                            <div class="questions__start">Начать заново</div>`;
    } else if (mistakes >= 6) {
        block.innerHTML = `<div class="questions__item__text">Упс, ракета взорвалась. Кажется, вы плохо подготовились. Попробуйте еще раз!</div>
                            <div class="questions__start">Пройти тест заново</div>`;
    } else {
        block.innerHTML = `<div class="questions__item__text">${questions[tour].question}</div>
        <ul class="questions__item__options">
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[0]}</div></li>
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[1]}</div></li>
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[2]}</div></li>
            <li class="questions__item__options__wrapper"><div class="question__item__options__item">${questions[tour].items[3]}</div></li>
        </ul>`;
    }
    
}



async function rocketAnimation() {
    if (points == 1 && !lose()) {
        if (tl != 0) {
            tl.kill(null);
        }
        setTimeout(() => {
            tl = new TimelineMax({ repeat: -1 })
            .to('.rocket', 0.3, {y: 0 })
            .to('.rocket', 0.3, {y: -25 })
            .to('.rocket', 0.3, {y: 0 })
        }, 200);
    } else if (points == 2 && !lose()) {
        await tl.kill(null);
        await gsap.to('.rocket', {
            duration: 0,
            y : 0,
        })
        setTimeout(() => {
            tl = new TimelineMax({ repeat: -1 })
            .to('.rocket', 0.3, {y: 0 })
            .to('.rocket', 0.3, {y: -50 })
            .to('.rocket', 0.3, {y: 0 })
        }, 200);
    } else if (points == 3 && !lose()) {
        await tl.kill(null);
        await gsap.to('.rocket', {
            duration: 0,
            y : 0,
        })
        setTimeout(() => {
            tl = new TimelineMax({ repeat: -1 })
            .to('.rocket', 0.3, {y: 0 })
            .to('.rocket', 0.3, {y: -75 })
            .to('.rocket', 0.3, {y: 0 })
        }, 200);
    } else if (points == 4 && !lose()) {
        await tl.kill(null);
        await gsap.to('.rocket', {
            duration: 0,
            y : 0,
        })
        setTimeout(() => {
            tl = new TimelineMax({ repeat: -1 })
            .to('.rocket', 0.3, {y: 0 })
            .to('.rocket', 0.3, {y: -100 })
            .to('.rocket', 0.3, {y: 0 })
        }, 200);
    } else if (points == 5 && !lose()) {
        await tl.kill(null);
        await gsap.to('.rocket', {
            duration: 0,
            y : 0,
        })
        setTimeout(() => {
            tl = new TimelineMax({ repeat: -1 })
            .to('.rocket', 0.3, {y: 0 })
            .to('.rocket', 0.3, {y: -125 })
            .to('.rocket', 0.3, {y: 0 })
        }, 200);
    } else if (lose()) {
        if(tl != 0) {
            await tl.kill(null);
        }
        await gsap.to('.rocket', {
            duration: 0,
            y : 0,
        });
        setTimeout(() => {
            tl = new TimelineMax({ repeat: 0 })
                .to(rocket, 0 , {opacity: 0})
                .to(crash, 0, {opacity: 1})
                .to('.crash__left', 0.7, {y: 1000, x: 100, rotation: 145})
                .to('.crash__right', 0.7, {y: 1000, x: -50,rotation: 30})
                .to('.crash__center', 0.7, {y: 1000, x:70, rotation: 45})
        }, 500)        
    } else if (points >=6) {
        if(tl != 0) {
            tl.clear();
        }
        await gsap.to('.rocket', {
            duration: 0,
            y : 0,
        });
        setTimeout(() => {
            tl = new TimelineMax({ repeat: 0 })
            .to('.rocket', 1, {y: -1000 })
        }, 200);
    }
}

function lose() {
    if (mistakes >= 6) {
        return true;
    } else {
        return false;
    }
}

async function checkLose() {
    if (mistakes == 1) {
        rocket.src = 'src/img/game/rockets/1.1.png';
        await setTimeout(()=> {
            rocket.src = 'src/img/game/rockets/1.2.png';
        }, 500);
    } else if (mistakes == 2) {
        rocket.src = 'src/img/game/rockets/2.1.png';
        await setTimeout(()=> {
            rocket.src = 'src/img/game/rockets/2.2.png';
        }, 500);
    } else if (mistakes == 3) {
        rocket.src = 'src/img/game/rockets/3.1.png';
        await setTimeout(()=> {
            rocket.src = 'src/img/game/rockets/3.2.png';
        }, 500);
    } else if (mistakes == 4) {
        rocket.src = 'src/img/game/rockets/4.1.png';
        await setTimeout(()=> {
            rocket.src = 'src/img/game/rockets/4.2.png';
        }, 500);
    } else if (mistakes == 5) {
        rocket.src = 'src/img/game/rockets/5.1.png';
        await setTimeout(()=> {
            rocket.src = 'src/img/game/rockets/5.2.png';
        }, 500);
    }
};
