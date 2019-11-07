const Questions = [{
        question: 'Which snake is believed to have caused the most human deaths?',
        answers: ['Black Mamba', 'Saw Scaled Viper', 'Australian Cobra', 'Western Taipan'],
        correct: 'Saw Scaled Viper'
    },
    {
        question: 'A full grown anaconda can weigh up to which of these amounts?',
        answers: ['230lb', '120lb', '80lb', '>500lb'],
        correct: '>500lb'
    },
    {
        question: 'Which of these snakes is aborial?',
        answers: ['Bush Python', 'Aanaconda', 'Australian Cobra', 'Hognose Racer'],
        correct: 'Bush Python'
    },
    {
        question: 'How often do snakes shed their skin?',
        answers: ['2-4 times/week', '2-4 times/month', '2-4 times/year', '2-4 times/life'],
        correct: '2-4 times/life'
    },

    {
        question: 'Which of these snakes is not venomous?',
        answers: ['Black Mamba', 'Water Moccasin', 'Emerald Tree Boa', 'King Cobra'],
        correct: 'Emerald Tree Boa'
    }
]
let question = 0;
let score = 0;

function updateTotals() {
    $('.questionnum').html(`<span class = 'questionnum'>${question}</span>`)
    $('.scorenum').html(`<span class = 'scorenum'>${score}</span>`)
}

function generateQuestion(i) {
    let x = Questions[question].answers
    let y = x.map(b => `<label><input type="radio" class='answerInput' name="rad" value="${b}" checked='undefined'>${b}</label>`).join('')
    return `
        <h3>${Questions[i].question}</h3>
        <form class = 'choiceForm'>${y}</form>
        <div class="buttonContainer">
        <button type="button" class='conbutton button'>submit</button>
        </div>`
}

function generateResponse(i, qnum) {
    if (i == true) {
        return `<section class = 'feedbackCorrect'>
                <h3>Thats right! Your current total is ${score} / ${question}</h3>
                <div class="buttonContainer">
                <button type="button" class='feed'>next</button>
                </div>
                </section>`
    } else {
        return `<section class = 'feedbackWrong'>
                <h3>Not quite! Your current total is  ${score} / ${question}</h1>
                <p>The correct answer was actually ${Questions[qnum].correct}</p>
                <div class="buttonContainer">
                <button type="button" class='feed'>next</button>
                </div>
                </section>`
    }
}



function startTheQuiz() {
    $('.mainContainer').on('click', '.startbutton', function (e) {
        $('.startPage').hide();
        $('.questionPage').show()
        $('.questionPage').html(generateQuestion(question))

    })
}

function handleAnswerSubmit() {
    $('.mainContainer').on('click', '.conbutton', function (e) {
        event.preventDefault();
        let i = question;
        x = ($('input[name="rad"]:checked').val())
        if(question < Questions.length){ 
            if (x == Questions[i].correct) {
                question = question + 1;
                score = score + 1;
                updateTotals()
                $('.feedbackPage').show()
                $('.questionPage').hide()
                $('.feedbackPage').html(generateResponse(true, i))
               
            } else {
                question = question + 1;
                updateTotals();
                $('.feedbackPage').show()
                $('.questionPage').hide()
                $('.feedbackPage').html(generateResponse(false, i))
               
            }
        }else{return endPage()}
    });
}

function generateNext() {
    $('.mainContainer').on('click', '.feed', function (event) {
        let i = question

        $('.feedbackPage').hide()
        $('.questionPage').show()
        if (question != Questions.length) {
            event.preventDefault()
            $('.mainContainer').find('.questionPage').html(generateQuestion(i));

        } else {
            return endPage()
        }

    })
}

function endPage() {
        $('.startPage').hide()
        $('.questionPage').hide()
        $('.feedbackPage').show()
        $('.feedbackPage').html(`<section class = 'feedbackEnd'>
                                    <h3>Nice Work on finishing! You scored ${score} of a possible ${question}</h3>
                                    <img src="https://i0.wp.com/metro.co.uk/wp-content/uploads/2019/02/sei_53642572-abaa-e1550926276856.jpg?quality=90&strip=all&zoom=1&resize=644%2C539&ssl=1" alt="Steve Irwin throwing a thumbs up">
                                    
                                        <button type="button" class='retryButton button'>retry</button>   
                                </section>`)
    
}

function retry(){
    $('.mainContainer').on('click','.retryButton',function(e){
        score = 0;
        question = 0;
        updateTotals();
        $('.feedbackEnd').hide();
        $('.startPage').show();
    })
}






function hold() {
    $(startTheQuiz);
    $(handleAnswerSubmit);
    $(generateNext);
    $(retry);
}

$(hold);