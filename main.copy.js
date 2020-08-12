var jQuery = document.createElement('script');
jQuery.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
jQuery.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(jQuery);

const one = new Card("1");
const two = new Card("2");
const three = new Card("3");
const four = new Card("4");

var timing_array = [];

var count = 0;
var nonRandomizedPatterns = []; //initialize empty array for non randomized generated patterns to be stored in
var patterns = []; //initialize empty array for base patterns to be stored in
var shuffeledArray = [];
var doubleShuffeledArray = [];
var tripleShuffeledArray = [];
var won = 0;
var lost = 0;
var superWon = 0;
var superLost = 0;
var totalWon = 0;
var totalLost = 0;
var demo;
var stimuli_count = 0;

var delay_int = 1700;
var time = 0;
var button_lockout = 2000;
var timeIntID = 0;
var independent_click_count = 0;
var test_timeout_count = 0;
//pattern_shown, wins, losses, super_wins, super_losses, face_shown,
var results_array = new Array(301);
for (var i = 0; i < 301; i++) {
    results_array[i] = new Array(7);
}
//Pattern Parameters: toSteal (sun) , notToSteal (rain), roundedTS, roundeNTS, totalFrequncy, pos1, pos2, pos3, pos4
patterns[0] = new Pattern(0.8929, 0.1071, 25, 3, 28, 0, 0, 0, four);
patterns[1] = new Pattern(0.7857, 0.2143, 11, 3, 14, 0, 0, three, 0);
patterns[2] = new Pattern(0.9231, 0.0769, 36, 3, 39, 0, 0, three, four);
patterns[3] = new Pattern(0.1538, 0.8462, 2, 11, 13, 0, two, 0, 0);
patterns[4] = new Pattern(0.8333, 0.1667, 15, 3, 18, 0, two, 0, four);
patterns[5] = new Pattern(0.5000, 0.5000, 5, 5, 10, 0, two, three, 0);
patterns[6] = new Pattern(0.9286, 0.0714, 26, 2, 28, 0, two, three, four);
patterns[7] = new Pattern(0.1071, 0.8929, 3, 25, 28, one, 0, 0, 0);
patterns[8] = new Pattern(0.5000, 0.5000, 5, 5, 10, one, 0, 0, four);
patterns[9] = new Pattern(0.1667, 0.8333, 3, 15, 18, one, 0, three, 0);
patterns[10] = new Pattern(0.5385, 0.4615, 7, 6, 13, one, 0, three, four);
patterns[11] = new Pattern(0.0769, 0.9231, 3, 36, 39, one, two, 0, 0);
patterns[12] = new Pattern(0.4286, 0.5714, 6, 8, 14, one, two, 0, four);
patterns[13] = new Pattern(0.1071, 0.8929, 3, 25, 28, one, two, three, 0);
var stimuli_steal;
var stimuli_steal_alt
var stimuli_weather;
var stimuli_greeables;
var end;
var begin;
function choose_stimuli_set() {

    //text for narrative 0//
    var narrativr_0_text_steal_0 = "Hello and thank you for your participation!";
    var narrativr_0_text_steal_1 = "Today you will be playing a game.";
    var narrativr_0_text_steal_2 = "Your goal is to predict whether a person will STEAL or NOT STEAL on a given day. ";
    var narrativr_0_text_steal_3 = "The information about whether the person will STEAL or NOT STEAL is based on different combinations of these cards:";

    var narrativr_0_text_weather_0 = "Hello and thank you for your participation!";
    var narrativr_0_text_weather_1 = "Today you will be playing a game.";
    var narrativr_0_text_weather_2 = "Your goal is to predict whether there will be RAIN or SUN on a given day. ";
    var narrativr_0_text_weather_3 = "The information about whether there will be RAIN or SUN is based on different combinations of these cards:";

    var narrativr_0_text_greebles_0 = "Hello and thank you for your participation!";
    var narrativr_0_text_greebles_1 = "Today you will be playing a game.";
    var narrativr_0_text_greebles_2 = "Your goal is to predict whether a novel creature will STEAL or NOT STEAL on a given day. ";
    var narrativr_0_text_greebles_3 = "The information about whether the creature will STEAL or NOT STEAL is based on different combinations of these cards:";

//text for narrative 1//
    var narrativr_1_text_steal_0 = " There are a total of 300 days. On each day, you will see:";
    var narrativr_1_text_steal_1 = " Some combination of cards";
    var narrativr_1_text_steal_2 = " A person";
    var narrativr_1_text_steal_3 = " Two buttons: STEAL or NO STEAL";

    var narrativr_1_text_weather_0 = " There are a total of 300 days. On each day, you will see:";
    var narrativr_1_text_weather_1 = " Some combination of cards";
    var narrativr_1_text_weather_2 = " An image of a cloud";
    var narrativr_1_text_weather_3 = " Two buttons: RAIN or SUN";

    var narrativr_1_text_greebles_0 = " There are a total of 300 days. On each day, you will see:";
    var narrativr_1_text_greebles_1 = " Some combination of cards";
    var narrativr_1_text_greebles_2 = " A novel creature";
    var narrativr_1_text_greebles_3 = " Two buttons: STEAL or NO STEAL";

//text for narrative 2//
    var narrativr_2_text_steal_0 = " On each day you are going to see one of four people. These people were randomly selected from a database. ";
    var narrativr_2_text_steal_1 = " Do NOT base your judgment of STEAL or NO STEAL on the person’s face because it does not have any relevant information about what they will do.";
    var narrativr_2_text_steal_2 = " When you make a decision of STEAL or NO STEAL always look at the combination of cards! It is the combination of cards that gives high probability information about whether the person will STEAL or NOT STEAL.” ";

    var narrativr_2_text_weather_0 = " On each day you are going to see one of four images of clouds. These clouds were randomly selected from a database. ";
    var narrativr_2_text_weather_1 = " Do NOT base your judgment of RAIN or SUN on the images of clouds because the image does not have any relevant information about what the weather will be.";
    var narrativr_2_text_weather_2 = " When you make a decision of RAIN or SUN always look at the combination of cards! It is the combination of cards that gives high probability information about whether there will be RAIN or SUN on that day.” ";

    var narrativr_2_text_greebles_0 = " On each day you are going to see one of four novel creatures. These creatures were randomly selected from a database. ";
    var narrativr_2_text_greebles_1 = " Do NOT base your judgment of STEAL or NO STEAL on the novel creature because it does not have any relevant information about what it will do";
    var narrativr_2_text_greebles_2 = " When you make a decision of STEAL or NO STEAL always look at the combination of cards! It is the combination of cards that gives high probability information about whether the creature will STEAL or NOT STEAL. ";

//text for narrative 3//
    var narrativr_3_text_steal_0 = " About probability -- Just because a particular combination of cards has a high probability of indicating whether a person will STEAL or NOT STEAL it does not mean that this combination will always be true. ";
    var narrativr_3_text_steal_1 = " For example: If you saw someone picking a lock on a house, it would be logical to predict that this person intends to STEAL. 9 out of 10 times they are going to STEAL and this is an optimal decision. However, optimal decisions are sometimes not true. Perhaps it was just the homeowner who lost their key.";
    var narrativr_3_text_steal_2 = " This same concept applies to this game. On some days, you will make the optimal choice (indicated by a green check mark or red x) but it will turn out to NOT be accurate (actual outcome: indicated by the words Steal or No STEAL on the left of the image). This is okay! please focus on making optimal choices and do the best you can, even if you feel like you’re guessing.";

    var narrativr_3_text_weather_0 = " About probability -- Just because a particular combination of cards has a high probability of indicating whether there will be SUN or RAIN it does not mean that this combination will always be true.";
    var narrativr_3_text_weather_1 = " For example: If you saw a dark cloud formation appearing in the sky, it would be logical to predict that there will be RAIN. 9 out of 10 times it will RAIN and this is an optimal decision. However, optimal decisions are sometimes not true. Perhaps the dark clouds will clear and instead there will be SUN. ";
    var narrativr_3_text_weather_2 = " This same concept applies to this game. On some days, you will make the optimal choice (indicated by a green check mark or red x) but it will turn out to NOT be accurate (actual outcome: indicated by the words RAIN or SUN on the left of the image). This is okay! please focus on making optimal choices and do the best you can, even if you feel like you’re guessing.";

    var narrativr_3_text_greebles_0 = " About probability -- Just because a particular combination of cards has a high probability of indicating whether a creature will STEAL or NOT STEAL it does not mean that this combination will always be true. ";
    var narrativr_3_text_greebles_1 = " For example: If you saw someone picking a lock on a house, it would be logical to predict that this person intends to STEAL. 9 out of 10 times they are going to STEAL and this is an optimal decision. However, optimal decisions are sometimes not true. Perhaps it was just the homeowner who lost their key. ";
    var narrativr_3_text_greebles_2 = " This same concept applies to this game. On some days, you will make the optimal choice (indicated by a green check mark or red x) but it will turn out to NOT be accurate (actual outcome: indicated by the words Steal or No STEAL on the left of the image). This is okay! please focus on making optimal choices and do the best you can, even if you feel like you’re guessing.";

//text for narrative 4//
    var narrativr_4_text_steal_0 = "To help you get familiar with the game, we will take you through a short simulation.";
    var narrativr_4_text_steal_1 = "You will use your mouse to select one of the two buttons: STEAL or NO STEAL for that day.";
    var narrativr_4_text_steal_2 = "You will have 6 seconds to make your choice.";
    var narrativr_4_text_steal_3 = "Afterwards, you will get feedback.";
    var narrativr_4_text_steal_4 = "If you made the correct choice, you will see a green";
    var narrativr_4_text_steal_5 = "If you made the incorrect choice you will see a red";
    var narrativr_4_text_steal_6 = "Finally, you will notice that to the very right there are two bars that show your progress over time. The green bar indicates correct choices and the red bar indicates incorrect choices.";
    var narrativr_4_text_steal_7 = "In the beginning, it will feel like you are guessing, but don’t get discouraged and please keep going.";

    var narrativr_4_text_weather_0 = "To help you get familiar with the game, we will take you through a short simulation.";
    var narrativr_4_text_weather_1 = "You will use your mouse to select one of the two buttons: RAIN or SUN for that day.";
    var narrativr_4_text_weather_2 = "You will have 6 seconds to make your choice.";
    var narrativr_4_text_weather_3 = "Afterwards, you will get feedback.";
    var narrativr_4_text_weather_4 = "If you made the correct choice, you will see a green";
    var narrativr_4_text_weather_5 = "If you made the incorrect choice you will see a red";
    var narrativr_4_text_weather_6 = "Finally, you will notice that to the very right there are two bars that show your progress over time. The green bar indicates correct choices and the red bar indicates incorrect choices.";
    var narrativr_4_text_weather_7 = "In the beginning, it will feel like you are guessing, but don’t get discouraged and please keep going.";

    var narrativr_4_text_greebles_0 = "To help you get familiar with the game, we will take you through a short simulation.";
    var narrativr_4_text_greebles_1 = "You will use your mouse to select one of the two buttons: STEAL or NO STEAL for that day.";
    var narrativr_4_text_greebles_2 = "You will have 6 seconds to make your choice.";
    var narrativr_4_text_greebles_3 = "Afterwards, you will get feedback.";
    var narrativr_4_text_greebles_4 = "If you made the correct choice, you will see a green";
    var narrativr_4_text_greebles_5 = "If you made the incorrect choice you will see a red";
    var narrativr_4_text_greebles_6 = "Finally, you will notice that to the very right there are two bars that show your progress over time. The green bar indicates correct choices and the red bar indicates incorrect choices.";
    var narrativr_4_text_greebles_7 = "In the beginning, it will feel like you are guessing, but don’t get discouraged and please keep going.";

//text for narrative 5//
    var narrativr_5_text_steal_0 = "Let’s begin with a few practice trials to get you used to the game (10 practice trials)";
    var narrativr_5_text_weather_0 = "Let’s begin with a few practice trials to get you used to the game (10 practice trials)";
    var narrativr_5_text_greebles_0 = "Let’s begin with a few practice trials to get you used to the game (10 practice trials)";

//text for q2 survey

    var question_2_text_steal_0 = "If a person will";
    var question_2_text_steal_1 = "STEAL or NOT STEAL";
    var question_2_text_steal_2 = "If the thief is";
    var question_2_text_steal_3 = "honest or not";

    var question_2_text_weather_0 = "If there will be";
    var question_2_text_weather_1 = "RAIN or SUN";
    var question_2_text_weather_2 = "If the clouds look";
    var question_2_text_weather_3 = "dark or light";

    var question_2_text_greebles_0 = "If a novel creature will";
    var question_2_text_greebles_1 = "STEAL or NOT STEAL";
    var question_2_text_greebles_2 = "If the thief is";
    var question_2_text_greebles_3 = "honest or not";

    var i_q2_steal_greebles = "Incorrect, a combination of cards predicts either STEAL or NO STEAL";
    var i_q2_weather = "Incorrect, a combination of cards predicts either RAIN or SUN";

    var end_question_0_steal = "To what extent did you use information based on people’s faces to predict whether the person will STEAL or NOT STEAL?";
    var end_question_1_steal = "How difficult was it for you to ignore the face and only focus on the combination of cards when making a decision about whether the person will STEAL or NOT STEAL?";
    var end_question_2_steal = "For each of these cards, guess how predictive a card is for whether a person will STEAL or NOT STEAL on a given day (0% Steal/NoSteal - 100% Steal/NoSteal)";
    var end_question_3_steal = "To what extent do you agree with the following statement: If only black people would try hard they would be just as well off as white people";

    var end_question_0_weather = "To what extent did you use information based on images of clouds to predict whether there would be RAIN or SUN on a given day?";
    var end_question_1_weather = "How difficult was it for you to ignore the images of clouds and only focus on the combination of cards when making a decision about whether there will be RAIN or SUN?";
    var end_question_2_weather = "For each of these cards, guess how predictive a card is for whether there will be RAIN or SUN on a given day (0% RAIN/SUN - 100% RAIN/SUN)";
    var end_question_3_weather = "To what extent do you agree with the following statement: If only black people would try hard they would be just as well off as white people?";


    var end_question_0_greebles = "To what extent did you use information based on the creatures' faces to predict whether the they will STEAL or NOT STEAL?";
    var end_question_1_greebles = "How difficult was it for you to ignore the creature and only focus on the combination of cards when making a decision about whether the creature will STEAL or NOT STEAL?";
    var end_question_2_greebles = "For each of these cards, guess how predictive a card is for whether a creature will STEAL or NOT STEAL on a given day (0% Steal/NoSteal - 100% Steal/NoSteal)";
    var end_question_3_greebles = "To what extent do you agree with the following statement: If only black people would try hard they would be just as well off as white people?";


    var narrative_addition_steal_0 = "Lastly, you will notice a second form of feedback on the left side of the image.";
    var narrative_addition_steal_1 = "This feedback tells you what the actual outcome was: STEAL or NO STEAL; independent from your choice.";
    var narrative_addition_steal_2 = "Displayed to the right is a typical example of what you should expect to see after each prediction you make.";
    var narrative_addition_steal_3 = "To the left of the image: What actually happened.";
    var narrative_addition_steal_4 = "To the right of the image: If you made the correct or incorrect choice.";

    var narrative_addition_weather_0 = "Lastly, you will notice a second form of feedback on the left side of the image.";
    var narrative_addition_weather_1 = "This feedback tells you what the actual outcome was: RAIN or SUN; independent from your choice.";
    var narrative_addition_weather_2 = "Displayed to the right is a typical example of what you should expect to see after each prediction you make.";
    var narrative_addition_weather_3 = "To the left of the image: What actually happened.";
    var narrative_addition_weather_4 = "To the right of the image: If you made the correct or incorrect choice.";

    var narrative_addition_greebles_0 = "Lastly, you will notice a second form of feedback on the left side of the image.";
    var narrative_addition_greebles_1 = "This feedback tells you what the actual outcome was: STEAL or NO STEAL; independent from your choice.";
    var narrative_addition_greebles_2 = "Displayed to the right is a typical example of what you should expect to see after each prediction you make.";
    var narrative_addition_greebles_3 = "To the left of the image: What actually happened.";
    var narrative_addition_greebles_4 = "To the right of the image: If you made the correct or incorrect choice.";


    var rand_picker = Math.floor(Math.random() * 2);

    // console.log("random num = " + rand_picker);

    switch (rand_picker) {
        case 0:
            // console.log("in case 0");
            stimuli_steal = true;

            document.getElementById("new_page_text_0").textContent = narrative_addition_steal_0;
            document.getElementById("new_page_text_1").textContent = narrative_addition_steal_1;
            document.getElementById("new_page_text_2").textContent = narrative_addition_steal_2;
            document.getElementById("new_page_text_3").textContent = narrative_addition_steal_3;
            document.getElementById("new_page_text_4").textContent = narrative_addition_steal_4;


            document.getElementById("ref_screen_1").src = "ref_screen_new_s.png";


            document.getElementById("q2_text_0").textContent = question_2_text_steal_0;
            // document.getElementById("survey_sun_rain").innerText = question_2_text_steal_1;

            document.getElementById("q2_text_2").textContent = question_2_text_steal_2;
            // document.getElementById("survey_dark_light").innerText = question_2_text_steal_3;

            document.getElementById("q2_text_0_fix").textContent = question_2_text_steal_1;
            document.getElementById("q2_text_2_fix").textContent = question_2_text_steal_3;

            document.getElementById("q2_i").textContent = i_q2_steal_greebles;

            document.getElementById("n_0_0").textContent = narrativr_0_text_steal_0;
            document.getElementById("n_0_1").textContent = narrativr_0_text_steal_1;
            document.getElementById("n_0_2").textContent = narrativr_0_text_steal_2;
            document.getElementById("n_0_3").textContent = narrativr_0_text_steal_3;

            document.getElementById("n_1_0").textContent = narrativr_1_text_steal_0;
            document.getElementById("n_1_1").textContent = narrativr_1_text_steal_1;
            document.getElementById("n_1_2").textContent = narrativr_1_text_steal_2;
            document.getElementById("n_1_3").textContent = narrativr_1_text_steal_3;

            document.getElementById("n_2_0").textContent = narrativr_2_text_steal_0;
            document.getElementById("n_2_1").textContent = narrativr_2_text_steal_1;
            document.getElementById("n_2_2").textContent = narrativr_2_text_steal_2;

            document.getElementById("n_3_0").textContent = narrativr_3_text_steal_0;
            document.getElementById("n_3_1").textContent = narrativr_3_text_steal_1;
            document.getElementById("n_3_2").textContent = narrativr_3_text_steal_2;

            document.getElementById("n_4_0").textContent = narrativr_4_text_steal_0;
            document.getElementById("n_4_1").textContent = narrativr_4_text_steal_1;
            document.getElementById("n_4_2").textContent = narrativr_4_text_steal_2;
            document.getElementById("n_4_3").textContent = narrativr_4_text_steal_3;
            document.getElementById("n_4_4").textContent = narrativr_4_text_steal_4;
            document.getElementById("n_4_5").textContent = narrativr_4_text_steal_5;
            document.getElementById("n_4_6").textContent = narrativr_4_text_steal_6;
            document.getElementById("n_4_7").textContent = narrativr_4_text_steal_7;


            document.getElementById("end_text_0").textContent = end_question_0_steal;
            document.getElementById("end_text_1").textContent = end_question_1_steal;
            document.getElementById("end_text_2").textContent = end_question_2_steal;
            document.getElementById("end_text_3").textContent = end_question_3_steal;


            break;
        case 1:
            // console.log("in case 1");
            stimuli_weather = true;


            document.getElementById("new_page_text_0").textContent = narrative_addition_weather_0;
            document.getElementById("new_page_text_1").textContent = narrative_addition_weather_1;
            document.getElementById("new_page_text_2").textContent = narrative_addition_weather_2;
            document.getElementById("new_page_text_3").textContent = narrative_addition_weather_3;
            document.getElementById("new_page_text_4").textContent = narrative_addition_weather_4;

            document.getElementById("thumb_down_1").src = "img/sun.png";
            document.getElementById("thumb_up_1").src = "img/rain_cloud.png";


            document.getElementById("pos").value = "SUN";
            document.getElementById("neg").value = "RAIN";
            document.getElementById("pos").innerHTML = "SUN";
            document.getElementById("neg").innerHTML = "RAIN";


            document.getElementById("thumb_up").style.marginLeft = "65%";
            document.getElementById("thumb_down").style.marginLeft = "65%";
            document.getElementById("thumb_up_1").style.marginLeft = "12%";
            document.getElementById("thumb_down_1").style.marginLeft = "12%";


            document.getElementById("ref_screen_1").src = "ref_screen_new_w.png";


            document.getElementById("ref_screen").src = "ref_screen_weather.png";

            document.getElementById("q2_text_0").textContent = question_2_text_weather_0;
            document.getElementById("q2_text_0_fix").textContent = question_2_text_weather_1;
            document.getElementById("q2_text_2_fix").textContent = question_2_text_weather_3;


            // document.getElementById("survey_sun_rain").innerText = question_2_text_weather_1;

            document.getElementById("q2_text_2").textContent = question_2_text_weather_2;

            // document.getElementById("survey_dark_light").innerText = question_2_text_weather_3;

            document.getElementById("q2_i").textContent = i_q2_weather;

            document.getElementById("n_0_0").textContent = narrativr_0_text_weather_0;
            document.getElementById("n_0_1").textContent = narrativr_0_text_weather_1;
            document.getElementById("n_0_2").textContent = narrativr_0_text_weather_2;
            document.getElementById("n_0_3").textContent = narrativr_0_text_weather_3;

            document.getElementById("n_1_0").textContent = narrativr_1_text_weather_0;
            document.getElementById("n_1_1").textContent = narrativr_1_text_weather_1;
            document.getElementById("n_1_2").textContent = narrativr_1_text_weather_2;
            document.getElementById("n_1_3").textContent = narrativr_1_text_weather_3;

            document.getElementById("n_2_0").textContent = narrativr_2_text_weather_0;
            document.getElementById("n_2_1").textContent = narrativr_2_text_weather_1;
            document.getElementById("n_2_2").textContent = narrativr_2_text_weather_2;

            document.getElementById("n_3_0").textContent = narrativr_3_text_weather_0;
            document.getElementById("n_3_1").textContent = narrativr_3_text_weather_1;
            document.getElementById("n_3_2").textContent = narrativr_3_text_weather_2;

            document.getElementById("n_4_0").textContent = narrativr_4_text_weather_0;
            document.getElementById("n_4_1").textContent = narrativr_4_text_weather_1;
            document.getElementById("n_4_2").textContent = narrativr_4_text_weather_2;
            document.getElementById("n_4_3").textContent = narrativr_4_text_weather_3;
            document.getElementById("n_4_4").textContent = narrativr_4_text_weather_4;
            document.getElementById("n_4_5").textContent = narrativr_4_text_weather_5;
            document.getElementById("n_4_6").textContent = narrativr_4_text_weather_6;
            document.getElementById("n_4_7").textContent = narrativr_4_text_weather_7;

            document.getElementById("end_text_0").textContent = end_question_0_weather;
            document.getElementById("end_text_1").textContent = end_question_1_weather;
            document.getElementById("end_text_2").textContent = end_question_2_weather;
            document.getElementById("end_text_3").textContent = end_question_3_weather;
            break;
        case 2:
            // console.log("in case 2");
            stimuli_greeables = true;

            document.getElementById("new_page_text_0").textContent = narrative_addition_greebles_0;
            document.getElementById("new_page_text_1").textContent = narrative_addition_greebles_1;
            document.getElementById("new_page_text_2").textContent = narrative_addition_greebles_2;
            document.getElementById("new_page_text_3").textContent = narrative_addition_greebles_3;
            document.getElementById("new_page_text_4").textContent = narrative_addition_greebles_4;

            // document.getElementById("ref_screen_1").src="ref_screen_new_s.png";
            document.getElementById("ref_screen").src = "ref_screen_greebles.png";
            document.getElementById("ref_screen_1").src = "ref_screen_new_g.png";


            document.getElementById("q2_text_0").textContent = question_2_text_greebles_0;
            // document.getElementById("survey_sun_rain").innerText = question_2_text_greebles_1;

            document.getElementById("q2_text_2").textContent = question_2_text_greebles_2;
            // document.getElementById("survey_dark_light").innerText = question_2_text_greebles_3;

            document.getElementById("q2_text_0_fix").textContent = question_2_text_steal_1;
            document.getElementById("q2_text_2_fix").textContent = question_2_text_steal_3;

            document.getElementById("q2_i").textContent = i_q2_steal_greebles;

            document.getElementById("n_0_0").textContent = narrativr_0_text_greebles_0;
            document.getElementById("n_0_1").textContent = narrativr_0_text_greebles_1;
            document.getElementById("n_0_2").textContent = narrativr_0_text_greebles_2;
            document.getElementById("n_0_3").textContent = narrativr_0_text_greebles_3;

            document.getElementById("n_1_0").textContent = narrativr_1_text_greebles_0;
            document.getElementById("n_1_1").textContent = narrativr_1_text_greebles_1;
            document.getElementById("n_1_2").textContent = narrativr_1_text_greebles_2;
            document.getElementById("n_1_3").textContent = narrativr_1_text_greebles_3;

            document.getElementById("n_2_0").textContent = narrativr_2_text_greebles_0;
            document.getElementById("n_2_1").textContent = narrativr_2_text_greebles_1;
            document.getElementById("n_2_2").textContent = narrativr_2_text_greebles_2;

            document.getElementById("n_3_0").textContent = narrativr_3_text_greebles_0;
            document.getElementById("n_3_1").textContent = narrativr_3_text_greebles_1;
            document.getElementById("n_3_2").textContent = narrativr_3_text_greebles_2;

            document.getElementById("n_4_0").textContent = narrativr_4_text_greebles_0;
            document.getElementById("n_4_1").textContent = narrativr_4_text_greebles_1;
            document.getElementById("n_4_2").textContent = narrativr_4_text_greebles_2;
            document.getElementById("n_4_3").textContent = narrativr_4_text_greebles_3;
            document.getElementById("n_4_4").textContent = narrativr_4_text_greebles_4;
            document.getElementById("n_4_5").textContent = narrativr_4_text_greebles_5;
            document.getElementById("n_4_6").textContent = narrativr_4_text_greebles_6;
            document.getElementById("n_4_7").textContent = narrativr_4_text_greebles_7;

            document.getElementById("end_text_0").textContent = end_question_0_greebles;
            document.getElementById("end_text_1").textContent = end_question_1_greebles;
            document.getElementById("end_text_2").textContent = end_question_2_greebles;
            document.getElementById("end_text_3").textContent = end_question_3_greebles;


            break;


        case 3:
            // console.log("in case 3");
            stimuli_steal_alt = true;


            document.getElementById("ref_screen_1").src = "ref_screen_new_s.png";

            document.getElementById("new_page_text_0").textContent = narrative_addition_steal_0;
            document.getElementById("new_page_text_1").textContent = narrative_addition_steal_1;
            document.getElementById("new_page_text_2").textContent = narrative_addition_steal_2;
            document.getElementById("new_page_text_3").textContent = narrative_addition_steal_3;
            document.getElementById("new_page_text_4").textContent = narrative_addition_steal_4;

            document.getElementById("q2_text_0").textContent = question_2_text_steal_0;
            // document.getElementById("survey_sun_rain").innerText = question_2_text_steal_1;

            document.getElementById("q2_text_2").textContent = question_2_text_steal_2;
            // document.getElementById("survey_dark_light").innerText = question_2_text_steal_3;

            document.getElementById("q2_text_0_fix").textContent = question_2_text_steal_1;
            document.getElementById("q2_text_2_fix").textContent = question_2_text_steal_3;

            document.getElementById("q2_i").textContent = i_q2_steal_greebles;

            document.getElementById("n_0_0").textContent = narrativr_0_text_steal_0;
            document.getElementById("n_0_1").textContent = narrativr_0_text_steal_1;
            document.getElementById("n_0_2").textContent = narrativr_0_text_steal_2;
            document.getElementById("n_0_3").textContent = narrativr_0_text_steal_3;

            document.getElementById("n_1_0").textContent = narrativr_1_text_steal_0;
            document.getElementById("n_1_1").textContent = narrativr_1_text_steal_1;
            document.getElementById("n_1_2").textContent = narrativr_1_text_steal_2;
            document.getElementById("n_1_3").textContent = narrativr_1_text_steal_3;

            document.getElementById("n_2_0").textContent = narrativr_2_text_steal_0;
            document.getElementById("n_2_1").textContent = narrativr_2_text_steal_1;
            document.getElementById("n_2_2").textContent = narrativr_2_text_steal_2;

            document.getElementById("n_3_0").textContent = narrativr_3_text_steal_0;
            document.getElementById("n_3_1").textContent = narrativr_3_text_steal_1;
            document.getElementById("n_3_2").textContent = narrativr_3_text_steal_2;

            document.getElementById("n_4_0").textContent = narrativr_4_text_steal_0;
            document.getElementById("n_4_1").textContent = narrativr_4_text_steal_1;
            document.getElementById("n_4_2").textContent = narrativr_4_text_steal_2;
            document.getElementById("n_4_3").textContent = narrativr_4_text_steal_3;
            document.getElementById("n_4_4").textContent = narrativr_4_text_steal_4;
            document.getElementById("n_4_5").textContent = narrativr_4_text_steal_5;
            document.getElementById("n_4_6").textContent = narrativr_4_text_steal_6;
            document.getElementById("n_4_7").textContent = narrativr_4_text_steal_7;

            document.getElementById("end_text_0").textContent = end_question_0_steal;
            document.getElementById("end_text_1").textContent = end_question_1_steal;
            document.getElementById("end_text_2").textContent = end_question_2_steal;
            document.getElementById("end_text_3").textContent = end_question_3_steal;


            break;

        default:
            stimuli_steal = true;
    }
}
function next_narrative_intro() {
    choose_stimuli_set();
    $("#narrative_intro").hide();
    $("#next_intro").hide();
    document.getElementById("narrative_0_text").style.display = "table";
    $("#narrative_0_text").fadeIn("slow");
    $("#next_0").show();
}
function next_narrative() {
    $("#narrative_0_text").hide();
    $("#next_0").hide();
    document.getElementById("narrative_1_text").style.display = "table";
    $("#narrative_1_text").fadeIn("slow");
    $("#next_1").show();

}
function next_narrative_1() {
    $("#narrative_1_text").hide();
    $("#next_1").hide();
    document.getElementById("narrative_2_text").style.display = "table";
    $("#narrative_2_text").fadeIn("slow");
    $("#next_2").show();
}
function next_narrative_2() {
    $("#narrative_2_text").hide();
    $("#next_2").hide();
    document.getElementById("narrative_3_text").style.display = "table";
    $("#narrative_3_text").fadeIn("slow");
    $("#next_3").show();
}
function next_narrative_3() {
    $("#narrative_3_text").hide();
    $("#next_3").hide();
    document.getElementById("narrative_4_text").style.display = "table";
    $("#narrative_4_text").fadeIn("slow");
    $("#next_4").show();
}
function next_narrative_3_moved() {
    $("#narrative_3_text_moved").hide();
    $("#next_3_moved").hide();
    document.getElementById("narrative_6_text").style.display = "table";
    $("#narrative_6_text").fadeIn("slow");
    $("#next_6").show();
}
function next_narrative_4() {
    demo = false;
    count = 0;
    $("#narrative_4_text").hide();
    $("#next_4").hide();
    document.getElementById("narrative_5_text").style.display = "table";
    $("#narrative_5_text").fadeIn("slow");
    $("#start_demo").show();
}
function next_narrative_survey() {
    demo = false;
    $("#narrative_6_text").hide();
    $("#next_survey").hide();
    document.getElementById("narrative_7_text").style.display = "table";
    $("#narrative_7_text").fadeIn("slow");
    // $("#start_seq").show();
}
function next_narrative_survey_end() {

    if (end_survey_lock_1()) {
        $("#narrative_8_text").hide();
        // $("#next_survey").hide();
        document.getElementById("narrative_9_text").style.display = "table";
        $("#narrative_9_text").fadeIn("slow");
        // $("#start_seq").show();
        ("q1");
        getRadioResults("q2");
    } else {
        alert("Please complete all questions before continuing");
    }


}
function next_narrative_survey_end_1() {
    if (end_survey_lock_2()) {
        $("#narrative_9_text").hide();
        // $("#next_survey").hide();
        document.getElementById("narrative_10_text").style.display = "table";
        $("#narrative_10_text").fadeIn("slow");
        // $("#start_seq").show();
        getTextAreaResults("card_0");
        getTextAreaResults("card_1");
        getTextAreaResults("card_2");
        getTextAreaResults("card_3");
        // save card percentage input here
    } else {
        alert("Please complete all fields before continuing");
    }


}
function next_narrative_start_warning() {
    $("#narrative_7_text").hide();
    $("#next_7").hide();
    document.getElementById("narrative_pre_test_warning_text").style.display = "table";
    $("#narrative_pre_test_warning_text").fadeIn("slow");
    $("#narrative_pre_test_warning_text").show();


}
function next_narrative_demographics() {
    if (end_survey_lock_3()) {
        getRadioResults("q3");
        getRadioResults("q4");
        getRadioResults("strat");
        getTextAreaResults("strategy_ta");
        getTextAreaResults("study_summary_ta");
        $("#narrative_10_text").hide();
        $("#next_10").hide();
        document.getElementById("narrative_11_text").style.display = "table";
        $("#narrative_11_text").fadeIn("slow");
        $("#narrative_11_text").show();
    } else {
        alert("Please complete all fields before continuing");

    }
}
function start_demo() {
    demo = true;
    // sendResults();
    setUp();
    display_start();
    document.getElementById("main_container").style.marginTop = "1%";
    next_pattern_demo();
    timeIntID = setInterval("next_pattern_timout()", 6000);
    // setCookie("cookie",2,3);
    // sendData();

}
function start() {
    begin = Date.now();
    $("#narrative_pre_test_warning_text").hide();
    var elem_0 = document.getElementById("myBar_0");
    elem_0.style.width = 0 + '%';
    var elem_1 = document.getElementById("myBar_2");
    elem_1.style.width = 0 + '%';
    var elem_2 = document.getElementById("myBar_1");
    elem_2.style.width = 0 + '%';
    count = 0;
    independent_click_count = 0;
    demo = false;
    setUp();
    display_start();
    document.getElementById("main_container").style.marginTop = "1%";
    timeIntID = setInterval("next_pattern_timout()", 6000);


    // next_pattern();
}
function display_start() {
    $("#narrative").hide();
    $("#table").hide();
    $("#start").remove();
    $("#thumb_down").hide();
    $("#thumb_up").hide();
    $("#thumb_down_1").hide();
    $("#thumb_up_1").hide();

}
function bad_pred_survey(q_num) {
    switch (q_num) {
        case "q1":
            $("#q1_c").hide();
            $("#q1_i").fadeIn("slow");

            break;
        case "q2":
            $("#q2_c").hide();
            $("#q2_i").fadeIn("slow");

            break;
        default:
//
    }

}
function good_pred_survey(q_num) {
    switch (q_num) {
        case "q1":
            $("#q1_i").hide();
            $("#q1_c").fadeIn("slow");
            $("#next_survey").fadeIn("fast");

            break;
        case "q2":
            $("#q2_i").hide();
            $("#q2_c").fadeIn("slow");
            $("#start_seq").fadeIn("fast");

            break;
        default:
//
    }
}
function end_survey_lock_1() {

    if ($('input[name=q1]:checked').length > 0 && $('input[name=q2]:checked').length > 0) {
        return true;
    } else {
        return false;
    }


}
function end_survey_lock_2() {
    var myInput_0 = document.getElementById("card_0");
    var myInput_1 = document.getElementById("card_1");
    var myInput_2 = document.getElementById("card_2");
    var myInput_3 = document.getElementById("card_3");

    if (myInput_0 && myInput_0.value && myInput_1 && myInput_1.value && myInput_2 && myInput_2.value && myInput_3 && myInput_3.value) {
        return true;
    } else {
        return false;
    }
}
function end_survey_lock_3() {

    var myInput_0 = document.getElementById("strategy_ta");
    var myInput_1 = document.getElementById("study_summary_ta");

    if ($('input[name=strat]:checked').length > 0 && $('input[name=q3]:checked').length > 0 && $('input[name=q4]:checked').length > 0 && myInput_0.value.trim() != '' && myInput_1.value.trim() != '') {
        return true;
    } else {
        return false;
    }
}
function end_survey_lock_4() {
    var myInput_0 = document.getElementById("age_ta");
    var myInput_1 = document.getElementById("location_ta");
    var myInput_2 = document.getElementById("us_duration_ta");
    if (myInput_0.value.trim() != '' && myInput_1.value != '' && myInput_2.value != '' && $('input[name=gender]:checked').length > 0 && $('input[name=ethnicity]:checked').length > 0 && $('input[name=video_games]:checked').length > 0 && $('input[name=education]:checked').length > 0 && $('input[name=origin]:checked').length > 0) {
        return true;
    } else {
        return false;
    }
}
/**
 * Generates the 300 patterns for the test sequence
 * no params
 */
function generateTestSequence() { // generate the 300 test patterns

    for (var i = 0; i < patterns.length; i++) {
        //adding patterns with negative response criteria (they will steal) to nonRandomizedPatterns array
        //this loop iterates based on each pattern's "to steal" frequency and adds one new instance of that pattern object to the nonRandomizedPatterns array with each iteration.
        for (var j = 0; j < patterns[i].tsRounded; j++) {
            // console.log("adding pattern-" + i + " : " + patterns[i].tsRounded);
            var currentPattern = new Pattern(null, null, null, null, null);
            currentPattern = jQuery.extend(true, {}, patterns[i]);
            currentPattern.willSteal = "True";
            nonRandomizedPatterns.push(currentPattern); //pushing instance of the current pattern to the nonRandomizedPatterns array
        }
        //adding patterns with positive response criteria (they will not steal) to nonRandomizedPatterns array
        //this loop iterates based on each pattern's "not to steal" frequency and adds one new instance of that pattern object to the nonRandomizedPatterns array with each iteration.
        for (var k = 0; k < patterns[i].nTSRounded; k++) { //adding patterns with positive response criteria (they will not steal)
            // console.log("adding pattern -" + i + " : " + patterns[i].nTSRounded);
            var currentPatternFalse = new Pattern(null, null, null, null, null);
            currentPatternFalse = jQuery.extend(true, {}, patterns[i]);
            currentPatternFalse.willSteal = "False";
            nonRandomizedPatterns.push(currentPatternFalse);//pushing instance of the current pattern to the nonRandomizedPatterns array
        }
    }
}
/**
 * Shuffels the array
 * @params 'array' is the generated array to be shuffled
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function setUp() {

    generateTestSequence(); //generate all patterns
    shuffeledArray = shuffleArray(nonRandomizedPatterns);
    doubleShuffeledArray = shuffleArray(shuffeledArray);
    tripleShuffeledArray = shuffleArray(doubleShuffeledArray);

    for (var i = 0; i < nonRandomizedPatterns.length; i++) {
        // console.log(tripleShuffeledArray[i]); // print shuffeled array to the console
    }
}
function display_image() {

    if (tripleShuffeledArray[count + 1].cards[0].cardType != null) {
        // console.log("display A");
        // console.log("display count = " + count);
        $("#A").attr("src", "img/" + tripleShuffeledArray[count + 1].cards[0].cardType + ".png");
        $("#A").show();
        // console.log("showing : img/" + tripleShuffeledArray[count + 1].cards[0].cardType + ".png");


    }
    else {
        $("#A").hide();
    }
    if (tripleShuffeledArray[count + 1].cards[1].cardType != null) {
        // console.log("display B");
        // console.log("display count = " + count);

        $("#B").attr("src", "img/" + tripleShuffeledArray[count + 1].cards[1].cardType + ".png");
        $("#B").show();
        // console.log("showing : img/" + tripleShuffeledArray[count + 1].cards[1].cardType + ".png");


    } else {
        $("#B").hide();
    }
    if (tripleShuffeledArray[count + 1].cards[2].cardType != null) {
        // console.log("display C");
        // console.log("display count = " + count);

        $("#C").attr("src", "img/" + tripleShuffeledArray[count + 1].cards[2].cardType + ".png");
        $("#C").show();
        // console.log("showing :  img/" + tripleShuffeledArray[count + 1].cards[2].cardType + ".png");


    } else {
        $("#C").hide();
    }
    if (tripleShuffeledArray[count + 1].cards[3].cardType != null) {
        // console.log("display D");
        // console.log("display count = " + count);

        $("#D").attr("src", "img/" + tripleShuffeledArray[count + 1].cards[3].cardType + ".png");
        $("#D").show();
        // console.log("showing : img/" + tripleShuffeledArray[count + 1].cards[3].cardType + ".png");


    } else {
        $("#D").hide();
    }

    stimuli_count = getRandomInt(1, 4);
    // console.log("DEMO = " + demo)
    // console.log("we are showing face " + stimuli_count + ".jpg");
    if (stimuli_weather && !demo) {
        $("#human_image").attr("src", "img/" + stimuli_count + "_w.png");

    } else if (stimuli_steal && !demo) {
        $("#human_image").attr("src", "img/" + stimuli_count + "a.png");

    } else if (stimuli_steal_alt && !demo) {
        $("#human_image").attr("src", "img/" + stimuli_count + "b.png");

    } else if (demo && stimuli_steal || demo && stimuli_steal_alt) {
        $("#human_image").attr("src", "img/" + "demo_lines.png");

    } else if (demo && stimuli_weather) {
        $("#human_image").attr("src", "img/" + "demo_lines_w.png");
    } else if (demo && stimuli_greeables) {
        $("#human_image").attr("src", "img/" + "greeble_outline.png");
    }
    else {
        $("#human_image").attr("src", "img/" + stimuli_count + "_g.png");
    }


}
/**
 * Returns one random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you one non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function removeCurrentCards() {
    if (count > 0) {
        $("#temp_Pattern0").remove();
        $("#temp_Pattern1").remove();
        $("#temp_Pattern2").remove();
        $("#temp_Pattern3").remove();
    }
}
function next_pattern_timout() {
    document.getElementById("pos").disabled = false;
    document.getElementById("neg").disabled = false;
    clearInterval(timeIntID);
    if (demo == true) {
        timeIntID = setInterval("next_pattern_demo()", 6000);
        next_pattern_demo();
    } else {
        console.log("in the REAL test");
        timeIntID = setInterval("next_pattern()", 6000);
        next_pattern();
    }
}
function next_pattern_demo() {
    console.timeEnd('timerFunction');
    end = Date.now();
    var timeSpent = ((end - begin) - 2000) / 1000;
    console.log("DATE TIME: " + timeSpent);
    timing_array[count] = timeSpent;
    console.log("ARRAY: " + timing_array[count]);
    document.getElementById("pos").disabled = false;
    document.getElementById("neg").disabled = false;
    if (count <= 3) {
        removeCurrentCards();
        display_image();
        count++;
        var elem_0 = document.getElementById("myBar_0");
        var width_0 = count;
        elem_0.style.width = width_0 / 3 + '%';
        var elem_1 = document.getElementById("myBar_2");
        var width_1 = won + superWon;
        elem_1.style.width = width_1 / 1.8 + '%';
        var elem_2 = document.getElementById("myBar_1");
        var width_2 = lost + superLost;
        elem_2.style.width = width_2 / 1.8 + '%'
    } else {
        demo = false;
        count = 0;
        $("#narrative_3_text").hide();
        $("#narrative_2_text").hide();
        $("#narrative_5_text").hide();
        document.getElementById("narrative_3_text_moved").style.display = "table";
        $("#narrative_3_text_moved").show();
        $("#next_3_moved").show();
        $("#start_demo").hide();
        $("#narrative").show();
        display_image();
        clearInterval(timeIntID);
        won = 0;
        lost = 0;
        superWon = 0;
        superLost = 0;
        totalWon = 0;
        totalLost = 0;
    }
    begin = Date.now();
    console.time('timerFunction');
}
function next_pattern() {

    end = Date.now();
    var timeSpent = ((end - begin) - 2000) / 1000;
    console.log("DATE TIME: " + timeSpent);
    timing_array[count] = timeSpent;
    console.log("ARRAY: " + timing_array[count]);
    results_array[count][6] = timing_array[count];
    console.log("RESUTLS: " + results_array[count][6]);
    demo = false;
    document.getElementById("pos").disabled = false;
    document.getElementById("neg").disabled = false;

    var timeoutCount = count - independent_click_count;
    var timeoutCount_attention = count - independent_click_count;

    //adds empty rows if count is behind one.
    if (timeoutCount_attention >= 1) {
        console.log("adding empty rows!");
        results_array[count][0] = "XXXX";
        results_array[count][1] = "X";
        results_array[count][2] = "X";
        results_array[count][3] = "X";
        results_array[count][4] = "X";
        results_array[count][5] = "X";
        results_array[count][6] = "XXXXX";
        results_array[count][7] = "*";
        timeoutCount_attention = count;
    }

    if (timeoutCount_attention == 0 && (count == 0 || count == 1 || count == 2)) {
        results_array[0][0] = "XXXX";
        results_array[0][1] = "X";
        results_array[0][2] = "X";
        results_array[0][3] = "X";
        results_array[0][4] = "X";
        results_array[0][5] = "X";
        results_array[0][6] = "XXXXX";
        results_array[0][7] = "*";
        timeoutCount_attention = count;
    }
    if (timeoutCount > 2) {
        alert("ARE YOU STILL PLAYING? CLICK OK TO CONTINUE.");
        independent_click_count = count;
        test_timeout_count++;
    }
    if (count < 5) {
        if (count > 0) {
            $("#temp_Pattern0").remove();
            $("#temp_Pattern1").remove();
            $("#temp_Pattern2").remove();
            $("#temp_Pattern3").remove();
        }
        display_image();
        var elem_0 = document.getElementById("myBar_0");
        var width_0 = count;
        elem_0.style.width = width_0 / 3 + '%';
        var elem_1 = document.getElementById("myBar_2");
        var width_1 = won + superWon;
        elem_1.style.width = width_1 / 1.8 + '%';
        var elem_2 = document.getElementById("myBar_1");
        var width_2 = lost + superLost;
        elem_2.style.width = width_2 / 1.8 + '%'
        count++;

    } else {
        alert("The game portion is over. Now on to a few last questions and then you will be sent back to MTurk!");
        count = 0;
        document.getElementById("narrative_8_text").style.display = "table";
        document.getElementById("main_container").style.marginTop = "0%";
        $("#narrative_7_text").hide();
        $("#main_container").hide();
        $("#narrative_8_text").show();
        $("#narrative").show();
        clearInterval(timeIntID);
    }
    begin = Date.now();
    console.time('someFunction');
}
function poitive_feedback() {

    //for saving pattern in the csv data
    var current_pattern = "";
    for (var i = 0; i < tripleShuffeledArray[count].cards.length; i++) {
        if (tripleShuffeledArray[count].cards[i].cardType != null) {
            current_pattern += tripleShuffeledArray[count].cards[i].cardType;
        } else {
            current_pattern += "0";
        }
    }

    if (tripleShuffeledArray[count].toSteal >= tripleShuffeledArray[count].notToSteal) {
        // console.log("Statistically they were going to steal, and you chose they were not going to steal, and in this instance did they steal? The answer is : " + tripleShuffeledArray[count].willSteal);
        if (tripleShuffeledArray[count].willSteal == "True") {
            superLost++;
            $("#thumb_down").show().delay(delay_int).fadeOut('fast');
            $("#thumb_up_1").show().delay(delay_int).fadeOut('fast');
            // console.log("You lost");
            results_array[count][0] = current_pattern;
            results_array[count][1] = 0;
            results_array[count][2] = 0;
            results_array[count][3] = 0;
            results_array[count][4] = 1;
            results_array[count][5] = stimuli_count;
            results_array[count][6] = timing_array[count];
            results_array[count][7] = "*";


        } else {
            $("#thumb_down").show().delay(delay_int).fadeOut('fast');
            $("#thumb_down_1").show().delay(delay_int).fadeOut('fast');
            lost++;
            results_array[count][0] = current_pattern;
            results_array[count][1] = 0;
            results_array[count][2] = 1;
            results_array[count][3] = 0;
            results_array[count][4] = 0;
            results_array[count][5] = stimuli_count;
            results_array[count][6] = timing_array[count];
            results_array[count][7] = "*";
        }
    } else {
        // console.log("Statistically they were not going to steal, and you chose they were not going to steal, and in this instance did they steal?  The answer is : " + tripleShuffeledArray[count].willSteal);
        if (tripleShuffeledArray[count].willSteal == "False") {
            superWon++;
            $("#thumb_up").show().delay(delay_int).fadeOut('fast');
            $("#thumb_down_1").show().delay(delay_int).fadeOut('fast');
            results_array[count][0] = current_pattern;
            results_array[count][1] = 0;
            results_array[count][2] = 0;
            results_array[count][3] = 1;
            results_array[count][4] = 0;
            results_array[count][5] = stimuli_count;
            results_array[count][6] = timing_array[count];
            results_array[count][7] = "*";

        } else {
            $("#thumb_up").show().delay(delay_int).fadeOut('fast');
            $("#thumb_up_1").show().delay(delay_int).fadeOut('fast');
            won++;
            results_array[count][0] = current_pattern;
            results_array[count][1] = 1;
            results_array[count][2] = 0;
            results_array[count][3] = 0;
            results_array[count][4] = 0;
            results_array[count][5] = stimuli_count;
            results_array[count][6] = timing_array[count];
            results_array[count][7] = "*";
        }
    }
    totalLost = lost + superLost;
    totalWon = won + superWon;
    display_results();
    if (demo == true) {
        document.getElementById("pos").disabled = true;
        document.getElementById("neg").disabled = true;
        clearInterval(timeIntID);
        setTimeout(next_pattern_timout, button_lockout);
    } else {
        document.getElementById("pos").disabled = true;
        document.getElementById("neg").disabled = true;
        clearInterval(timeIntID);
        setTimeout(next_pattern_timout, button_lockout);
    }
}
function negative_feedback() {

    var current_pattern = "";
    for (var i = 0; i < tripleShuffeledArray[count].cards.length; i++) {
        if (tripleShuffeledArray[count].cards[i].cardType != null) {
            current_pattern += tripleShuffeledArray[count].cards[i].cardType;
            current_pattern;

        } else {
            current_pattern += "0";
        }
    }

    if (tripleShuffeledArray[count].toSteal >= tripleShuffeledArray[count].notToSteal) {
        // console.log("Statistically they were going to steal, and you chose they were going to steal, and in this instance did they steal? The answer is : " + tripleShuffeledArray[count].willSteal);
        if (tripleShuffeledArray[count].willSteal == "True") {
            superWon++;
            $("#thumb_up").show().delay(delay_int).fadeOut('fast');
            $("#thumb_up_1").show().delay(delay_int).fadeOut('fast');
            // console.log("You won");
            results_array[count][0] = current_pattern;
            results_array[count][1] = 0;
            results_array[count][2] = 0;
            results_array[count][3] = 1;
            results_array[count][4] = 0;
            results_array[count][5] = stimuli_count;
            results_array[count][6] = timing_array[count];
            results_array[count][7] = "*";


        } else {
            $("#thumb_up").show().delay(delay_int).fadeOut('fast');
            $("#thumb_down_1").show().delay(delay_int).fadeOut('fast');
            // console.log("You won");
            won++;
            results_array[count][0] = current_pattern;
            results_array[count][1] = 1;
            results_array[count][2] = 0;
            results_array[count][3] = 0;
            results_array[count][4] = 0;
            results_array[count][5] = stimuli_count;
            results_array[count][6] = timing_array[count];
            results_array[count][7] = "*";

        }

    } else {
        // console.log("Statistically they were not going to steal, and you chose they were going to steal, and in this instance did they steal?  The answer is : " + tripleShuffeledArray[count].willSteal);
        if (tripleShuffeledArray[count].willSteal == "False") {
            superLost++;
            $("#thumb_down").show().delay(delay_int).fadeOut('fast');
            $("#thumb_down_1").show().delay(delay_int).fadeOut('fast');
            // console.log("You lost");
            results_array[count][0] = current_pattern;
            results_array[count][1] = 0;
            results_array[count][2] = 0;
            results_array[count][3] = 0;
            results_array[count][4] = 1;
            results_array[count][5] = stimuli_count;
            results_array[count][6] = timing_array[count];
            results_array[count][7] = "*";

        } else {
            $("#thumb_down").show().delay(delay_int).fadeOut('fast');
            $("#thumb_up_1").show().delay(delay_int).fadeOut('fast');
            lost++;
            // console.log("You lost");
            results_array[count][0] = current_pattern;
            results_array[count][1] = 0;
            results_array[count][2] = 1;
            results_array[count][3] = 0;
            results_array[count][4] = 0;
            results_array[count][5] = stimuli_count;
            results_array[count][6] = timing_array[count];
            results_array[count][7] = "*";


        }
    }
    totalLost = lost + superLost;
    totalWon = won + superWon;
    display_results();
    if (demo == true) {
        document.getElementById("pos").disabled = true;
        document.getElementById("neg").disabled = true;
        clearInterval(timeIntID);
        setTimeout(next_pattern_timout, button_lockout);
    } else {
        document.getElementById("pos").disabled = true;
        document.getElementById("neg").disabled = true;
        clearInterval(timeIntID);
        setTimeout(next_pattern_timout, button_lockout);
    }
}
function display_results() {
    // document.getElementById("won").innerHTML = "Win: " + won;
    // document.getElementById("superWon").innerHTML = "Super Win: " + superWon;
    // document.getElementById("lost").innerHTML = "Lose: " + lost;
    // document.getElementById("superLost").innerHTML = "Super Lose: " + superLost;
    // document.getElementById("totalLost").innerHTML = "Total Lost: " + totalLost;
    // document.getElementById("totalWon").innerHTML = "Total Won: " + +totalWon;
    // console.log("Wins: " + won + " Super Wins: " + superWon + " Lost: " + lost + " Super Lost: " + superLost);
}
function sendResults() {

    if (end_survey_lock_4()) {

        getRadioResults("gender");
        getRadioResults("ethnicity");
        getRadioResults("video_games");
        getRadioResults("education");
        getRadioResults("origin");

        getTextAreaResults("age_ta");
        getTextAreaResults("location_ta");
        getTextAreaResults("us_duration_ta");


        var survey_result_combined = q1_response + "*" + q2_response + "*" + q3_card_0 + "*" + q3_card_1 + "*" + q3_card_2 + "*" + q3_card_3 + "*" + q4_response + "*" + q5_response + "*" + q6_response + "*" + q7_response + "*" + q8_response + "*" + q1_d_response + "*" + q2_d_response + "*" + q3_d_response + "*" + q4_d_response + "*" + q5_d_response + "*" + q6_d_response + "*" + q7_d_response + "*" + q8_d_response;
        var enviroment_info_combined;


        if (stimuli_steal) {
            enviroment_info_combined = test_timeout_count + "*" + "stimuli_1"
        } else if (stimuli_steal_alt) {
            enviroment_info_combined = test_timeout_count + "*" + "stimuli_2"
        }
        else if (stimuli_weather) {
            enviroment_info_combined = test_timeout_count + "*" + "stimuli_3"
        } else if (stimuli_greeables) {
            enviroment_info_combined = test_timeout_count + "*" + "stimuli_4"
        }

        window.location.href = "../saveCSV.php?results=" + survey_result_combined + "*" + enviroment_info_combined + "*" + results_array;

    } else {
        alert("Please complete all fields before continuing");

    }

}
function getRadioResults(radio_name) {
    var radio_elements = document.getElementsByName(radio_name);
    for (var i = 0; i < radio_elements.length; i++) {
        if (radio_elements[i].checked) {
            switch (radio_name) {
                case "gender":
                    q2_d_response = radio_elements[i].value;
                    // console.log(q2_d_response);
                    break;
                case "ethnicity":
                    q3_d_response = radio_elements[i].value;
                    // console.log(q3_d_response);
                    break;
                case "video_games":
                    q4_d_response = radio_elements[i].value;
                    // console.log(q4_d_response);
                    break;
                case "education":
                    q5_d_response = radio_elements[i].value;
                    // console.log(q5_d_response);
                    break;
                case "origin":
                    q6_d_response = radio_elements[i].value;
                    // console.log(q6_d_response);
                    break;
                ////////////////////////////////////////////////////////////////////////////
                case "q1":
                    q1_response = radio_elements[i].value;
                    // console.log(q1_response);
                    break;
                case "q2":
                    q2_response = radio_elements[i].value;
                    // console.log(q2_response);
                    break;
                case "q3":
                    q7_response = radio_elements[i].value;
                    // console.log(q7_response);
                    break;
                case "q4":
                    q8_response = radio_elements[i].value;
                    // console.log(q8_response);
                    break;
                case "strat":
                    q4_response = radio_elements[i].value;
                    // console.log(q4_response);
                    break;
                default:
                //
            }
        }
    }
}
function getTextAreaResults(ta_name) {


    switch (ta_name) {
        case "us_duration_ta":
            q8_d_response = document.getElementById(ta_name).value;
            // console.log(q8_d_response);
            break;
        case "location_ta":
            q7_d_response = document.getElementById(ta_name).value;
            // console.log(q7_d_response);
            break;
        case "age_ta":
            q1_d_response = document.getElementById(ta_name).value;
            // console.log(q1_d_response);
            break;
        case "strategy_ta":
            q5_response = document.getElementById(ta_name).value;
            // console.log(q5_response);
            break;
        case "study_summary_ta":
            q6_response = document.getElementById(ta_name).value;
            // console.log(q6_response);
            break;
        case "card_0":
            q3_card_0 = document.getElementById(ta_name).value;
            // console.log(q3_card_0);
            break;
        case "card_1":
            q3_card_1 = document.getElementById(ta_name).value;
            // console.log(q3_card_1);
            break;
        case "card_2":
            q3_card_2 = document.getElementById(ta_name).value;
            // console.log(q3_card_2);
            break;
        case "card_3":
            q3_card_3 = document.getElementById(ta_name).value;
            // console.log(q3_card_3);
            break;

        default:
        //
    }


}
function track_click_num() {
    independent_click_count = count;
}



