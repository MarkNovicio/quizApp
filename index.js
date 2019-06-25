'use strict';

// global variable that will hold my quiz question
// Title, description, array of answers, 4th property that would be correct
let correctScore =0;
let incorrectScore = 0;
let currentQuestion = 0;
let QUESTIONS = [

    {   questionNumber: 1,
        title: "This type of code is difficult to debug, maintain, read, and scale.",
        options: ["Spaghetti Code","Alvers Code","Source Code", "Type Code"],
        correct: 0
    },

    {   
        questionNumber:2,
        title: "An array named Numbers is populated from 10 to 1, how would you access the #7?",
        options: ["Numbers[7]","Numbers{6]","Number[3]", "Numbers[4]"],
        correct: 3
    },
    
    { 
        questionNumber:3,
        title: `(function(){
                return typeof arguments;
                })();`,
        options: ["Object","Array","Arguments","Undefined"],
        correct: 0
    },

       {   questionNumber: 4,
        title: `  (function(x){
                    delete x;
                    return x;
                  })(1);`,
        options: ["1","Null","Undefined", "Error"],
        correct: 0
    },

       {   questionNumber: 5,
        title: `  var foo = {
                    bar: function() { return this.baz; },
                    baz: 1
                  };
                  (function(){
                    return typeof arguments[0]();
                  })(foo.bar);`,
        options: ["Undefined","Object","Number", "Function"],
        correct: 0
    }

];

$(function(){
  $('a.start_button').click(event=> {
    //console.log("test");
    event.preventDefault();
    $(".start, a.start_button, a.restartQuiz, .next-button" ).hide();
    $(".quiz").show();
    showQuestion();
  });

//listener for the option the user clicks on
  $('.js-quiz-form ul').on('click', '.quiz-choices',  function() {
    const $this = $(this)
    $('.selected').toggleClass('selected');
    let selectedOption= $this.addClass('selected'); 
    //hide incorrect answer
    $('.js-quiz-form p, .js-quiz-form h3').hide();
  });

  //listener for when the SUBMIT ANSWER button is clicked
  $('.js-quiz-form .submit').click(function(event){
    event.preventDefault();
    if($('.quiz-choices.selected').length){
        let guess = $('.quiz .selected').index();
        verifyAnswer(guess);
     //   generateIncorrectAnswer(guess);
    }

    else {
      $('.alert-box').show();
      $('.quiz').addClass('alert-active');
      closePopUpWindow()
    }

  });

    // listener for button of restart quiz
  $('.restartQuiz').click(event =>{
    console.log('restart quiz');
    event.preventDefault();
    restartQuiz();
    $('.response').hide();
    $('.finish-button').hide();
  });

  //listener for next button
  $('.next-button').on('click', function(){
    console.log('works');
    currentQuestion = currentQuestion  + 1
    $('.response').hide();
    $('.next-button').hide();
    
    showQuestion();
  })

  $('.finish-button').on('click', function(){
    showSummery()
  })
    //listener for response of incorrect answer  

});

// function that will varify if answer selected is correct
function verifyAnswer(selectedOption) {
    let question = QUESTIONS[currentQuestion];
    console.log(selectedOption)
    if (selectedOption === question.correct) {
        correctScore++;
        generateCorrectAnswerResponse();
        return
    }

    else {
      incorrectScore++;
      generateIncorrectAnswerResponse();
      return 
    }

    currentQuestion++;
    if (currentQuestion === QUESTIONS.length){
        showSummery();
    }
    else {
        showQuestion();
    }
}

// function to generate list of elements

/*function generateQuizQuestionString(quizList) {
    console.log("Generate quiz list elements");
    const questions = quizList.map((question,index)=>generateQuizFormat(question, index));
    
    return questions.join("");
}
*/

// function that will iterate through each question
function showQuestion() {
    //generateQuestionNumber()
    if(currentQuestion < QUESTIONS.length){
    let question = QUESTIONS[currentQuestion];

    $('.js-quiz-form h2').text(`Question ${currentQuestion +1}: ${question.title}`);
    
    $('.js-quiz-form ul').html(''); //clears out any text within the quiz ul elements
    for (let idx=0; idx< question.options.length; idx++) {
      $('.js-quiz-form ul').append(`<div class="quiz-choices"> <input type="radio" name="selection" 
      id="${question.options[idx]}" value="${question.options[idx]}" require=required/> 
      <label for="${question.options[idx]}">${question.options[idx]}</label> </div>`)
    }

    /*    $('.js-quiz-form ul').html(''); //clears out any text within the quiz ul elements
    for (let idx=0; idx< question.options.length; idx++) {
      $('.js-quiz-form ul').append(`<table> <div class="quiz-choices"> <tr><td><input type="radio" name="selection" 
      id="${question.options[idx]}" value="${question.options[idx]}" require=required/></td> 
      <td><label for="${question.options[idx]}">${question.options[idx]}</label></td> </div> </table>`)
    }*/


   // $('.js-quiz-form h3').hide();
    } else {
      showSummery();
    }
    generateQuestionNumber()
}
  

//function that will show a summary of the quiz
function showSummery() {
    $('.quiz').hide();
    $('.summary, a.restartQuiz' ).show();
    $('.summary p').text("You scored " + correctScore + " out of " + QUESTIONS.length +" correct")  
}
  
// function that will provide text if the answer is incorrect 

function generateIncorrectAnswerResponse(){
  $('.response h3').fadeIn(500).text('Incorrect');
  $('.statements').fadeIn(500).text(`The correct answer is ${generateCorrectAnswer()}.`) 
  $('.score').fadeIn(500).text(`SCORE:  ${correctScore} correct | ${incorrectScore} incorrect`)
  
  //create Next start_button
  const $btn =$('<input/>').attr({type:'button', name: 'Dynamic_Next_Button', class: 'next', value: 'Next >>'});
  $('.nextButton').empty();
  $('.nextButton').append($btn);
  $('.response').show();
  generateFinishButton()


 //$btn.addListener
  //next button should not appear at the last question. instead a call to restartQuiz()
}

function generateCorrectAnswerResponse(){
 
  $('.response h3').fadeIn(500).text('Correct!!');
  $('.statements').fadeIn(500).text(`Your score is ${correctScore} correct and ${incorrectScore} incorrect!"`)
 
  //create Next start_button
  $('.response').show();
  generateFinishButton()
}

//function to restartQuiz
function restartQuiz() {
    $('.summary').hide();
    $('.next').hide();
    $('.restartQuiz').hide();
    correctScore =0;
    incorrectScore=0;
    currentQuestion = 0;
    $('.quiz').show();
    showQuestion();
}

function generateQuestionNumber() { //Function to create question number
  
  if (currentQuestion < QUESTIONS.length) {
    let question =QUESTIONS[currentQuestion]
    let questionNumbers = question.questionNumber;
    //console.log('currentQuestion = ' + currentQuestion);
    //console.log('questionNumbers = ' + questionNumbers);
    //console.log('length of array = ' + QUESTIONS.length);
    //console.log(question);
      $('.questionNumber').text(`Question ${questionNumbers} of ${QUESTIONS.length}`);
  } 
  else {
    showSummery();
  }
}

function generateCorrectAnswer() { 
  let question =QUESTIONS[currentQuestion]
  let correctValue = question.correct;
  let correctAnswer = question.options[correctValue];
  return correctAnswer;
  //Function to provide correct answer when an incorrect selection is produced based on the current question.

//iterate through QUESTIONS array and store the value of the correct answer into variable correctAnswer
}

function generateFinishButton() {
  if(currentQuestion < QUESTIONS.length-1){
    $('.next-button').show();
  }
  else {
      $('.next-button').hide();
      $('.finish-button').show();
  }
      //$('.nextButton').replace('Next>>', "Results");
}

function closePopUpWindow() {
  //hide the quiz form
  $('.close-window').click(event=> {
    event.preventDefault();
    $('.alert-box').hide();
    $(".quiz").removeClass('alert-active');
  });
}
