 

% Clear tscasca;he workspace
 clear all;

%% initialize subject data input & output

% create input dialog window
prompt = {'Participant ID:','Resume?','Initial run number:','fMRI trigger:'};%prompts an input for participant ID number, Resume = resumes wherever the run left off (if crashes), run number, and trigger
tital = 'Input'; %allows for input in the pop up window
dims = [1 35]; % dimension for the pop up window
definput = {'','0', '1', '1'}; %default set ups. Nothing for participant ID but 0 1 1 for Resume, run numver and trigger, respectively. If the task crashes we want to change the run number so that the participant does not need to repeat an entire run
dialAns = inputdlg(prompt, tital,dims,definput);

% store input information
subID = str2num(dialAns{1}); %converts string inputs to numbers
resume = str2num(dialAns{2}); % 0 for no resume; 1 for resume
iRun = str2num(dialAns{3}); %converts string to numbers for the value of iRun
isfMRI = str2num(dialAns{4}); % 0 for keyboard; 1 for button box

% initialize data output name
c = clock; %Current date and time as date vector. [year month day hour minute seconds] %sets it to the internal time clock of the computer being used. Therefore but it is always original
baseName=[dialAns{1} 'Crime_Prediction' num2str(c(2)) '_' num2str(c(3)) '_' num2str(c(4)) '_' num2str(c(5)) '.csv']; %makes unique filename

% initialize data output
cHeader = {'subID' 'resume' 'iRun' 'isfMRI' 'taskPStart' 'runNum'... %creates columns (and their names) for all of our pertinent output data such as RT, input (i.e., prediction) etc 
    'triggerPTime' 'triggerDTime' 'runStartTime' 'trialNum' 'trialPStart'...
    'patternIdx' 'faceIdx' 'cardPrePTime' 'choicePrePTime' 'choice' ...
    'keyPreSec' 'respTime' 'trialPEnd' 'runPEnd' 'runDEnd' 'runPDur' 'runDDur'};
textHeader = strjoin(cHeader, ','); %creates a csv for each participant
respCell = cell(1,23); %1 row and 23 columns representing ^^ from cHeader
respCell(:) = {'NaN'}; % initialize and use NaN to occupy each column first
fileName = strcat(num2str(baseName)); %this will be the unique file name created in baseName. So, participant ID, Crime_Prediction, etc
fid = fopen(fileName,'a'); % After the csv is created we need to open it so that we have somewhere to store all of our data
fprintf(fid,'%s\n',textHeader); %the %s\n creates a new line for each trial

% store dialog input info
respCell(1:4) = {num2str(subID), num2str(resume), num2str(iRun), num2str(isfMRI)};
respInput = strjoin(respCell, ',');
fprintf(fid,'%s\n',respInput);


%% setup stimuli

% setup screen: 
screens = Screen('Screens');
screenNum = max(screens); %use external monitor if it's connected. Needed for the scanner
Screen('Preference', 'SkipSyncTests', 1) %bypass sync issue that happen on laptop
[window, screenRect]= PsychImaging('OpenWindow', screenNum);
[width, height] = Screen('WindowSize',screenNum); %get dimensions of screen being used
xCenter = screenRect(3)/2; %set dimensions for x axis
yCenter = screenRect(4)/2; %set dimensions for y axis
HideCursor(); %hides cursor

% load card image with a little for loop. 
im = cell(1,4); %im is the vector name for the cards
for n=1:4 %for 1 through 4 images 
  im{n} = imread(sprintf('C%d.png',n)); %imread loads the images of the cards
end %end the for loop always!

% get card image dimensions
[imageHeight, imageWidth, colorChannels] = size(im{1}); %this is necessary for each stimuli that you enter. It is important that all of your stimuli are the same a prior or else you will have to bypass some of the issues that occur with images with different image sizes

% load face image
face = cell(1,4); %face is the name of the vector for the faces
for n=1:4 %for 1 through 4 images 
  face{n} = imread(sprintf('F%d.jpg',n)); %imread loads the images for the faces
end %end the for loop always!

% load stimuli for the the feedback. Both the actual outcome (i.e., what
% actually occured) as well as if you made the best prediction or not
% (i.e., over 50%) 
endImg = {imread('S.jpg'),imread('NS.jpg'),imread('Incorrect.jpg'),imread('Correct.jpg')};

% convert card stimuli to text presentation
textIm = cell(1,4);
for n = 1:4 
    textIm{n} = Screen('MakeTexture', window,im{n}); %Converts all of the four card images to text presentation
end

%convert card stimuli to text presentation
textFace = cell(1,4); 
for n = 1:4
    textFace{n} = Screen('MakeTexture', window,face{n}); %Converts all of the four face images to text presentation
end

%convert outcome stimuli to text presentation
textEnd = cell(1,4); 
for n = 1:4
    textEnd{n} = Screen('MakeTexture', window,endImg{n}); %Converts all of the four feedback images to text presentation
end

% set positions for 4 cards 
distanceFromCenter = 50; %begin by identifying how far from the center of the screen you want it
imPosY = 500 - imageHeight/2; %for the Y axis, I want 500 - the height of the stimuli so that they are all on the same 
imPos{1} = {1200 - imageWidth - distanceFromCenter,imPosY}; %imPos{1} identifies the first image
imPos{2} = {1200 + distanceFromCenter,imPosY};
imPos{3} = {2300 - imageWidth - distanceFromCenter,imPosY};
imPos{4} = {2300 + distanceFromCenter,imPosY};
imPos{5} = {2500 + distanceFromCenter,imPosY};

% set rectangluar parameters for the 4 cards and reducing their size
imRect = cell(1,4);
for i = 1:n
    imRect{i} = [imPos{i}{1} imPos{i}{2} imPos{i}{1}+imageWidth imPos{i}{2}+imageHeight]./2.5;
end

% set rectangluar parameters for the face stimuli
xoffset = 1200;
yoffset = 750;
faceRect = [xoffset yoffset xoffset+imageWidth yoffset+imageHeight]./2;

%set positions for the feedback stimuli so that the prediction is on the
%left and the correct/incorrect feedback is placed on the right side of the
%screen
endPosY = 1500 - imageHeight/2;
stealPos = {1250 - distanceFromCenter,endPosY}; % steal or no steal
corrPos = {3200 + distanceFromCenter,endPosY}; % correct or not corredct

% set rectangluar parameters for the feedback stimuli
stealRect = [stealPos{1} stealPos{2} stealPos{1}+imageWidth stealPos{2}+imageWidth]./3.5; %the Rect will be called later when drawing 
corrRect = [corrPos{1} corrPos{2} corrPos{1}+imageWidth corrPos{2}+imageWidth]./3.5;


%% set up randomized condition matrix

% start to generate the randomized condition matrix: 
% set a matrix for 14 different card patterns: each row represent 1 set of
% pattern; each index represent a card; 0 means no card; 1 means present
% casrd

pattern = [0 0 0 1; 0 0 1 0 ; 0 0 1 1; 0 1 0 0; 0 1 0 1; 0 1 1 0; 0 1 1 1; 1 0 0 0; 1 0 0 1; 1 0 1 0; 1 0 1 1; 1 1 0 0; 1 1 0 1; 1 1 1 0];

% with a binary outcome, there are 28 different pattern + outcome
% combination; generage a frenquency matrix, each number represent the
% frequency of occurance of each combination
frequency = [17, 2, 7, 2, 24, 2, 2, 7, 10, 2, 3, 3, 17, 2, 2, 17, 3, 3, 2, 10, 5, 4, 2, 24, 4, 5, 2, 17];

%initiate a vector of 200 trials representing the pattern and outcome for
%each trial; occupy with -1 first
trialPattern = zeros(1, 200) - 1;
index = 1;

%make a for loop; 1-28 each pattern corrosponds to a pattern
%after the for loops the vector should contain 1-28 
%trialPattern = zeros(1,200);
%index = 1;

for i = 1:28 %size(pattern)
    for j = 1:frequency(i)  
        trialPattern(index) = i;  %(0,i)=pattern(i);
        index = index +1;
        %fprintf('one step through frequency')
    end 
    %fprintf('one steo through pattern')
end


%after the four loop you have matrix of outcomes. First column is pattern
%of the cards with 14 different numbers. Second columns represents outcome 1 =
%steal 0 = no steal
%and then trialPattern(randperm(200)
if resume == 0 % randomize pattern if it's a new task
    randomPattern = trialPattern(randperm(200)); %randomize the patterns
    save('keyboardTask_BC','randomPattern') %
    
elseif resume == 1 % load previously randomized pattern if resumed
    load ('keyboardTask_BC','randomPattern');
end
    

% Create matrix called outcome
outcomes = zeros(2, 200) -1;
for i = 1:200
    outcomes(1,i) = ceil(randomPattern(i)/2); %ceil function rounds
    outcomes(2,i) = mod(randomPattern(i),2); %mod (looks for odd or even number)
end


%% initialize response

% set up keyboard when the scanner is not connected 
if isfMRI ==0
    KbName('UnifyKeyNames'); %used for cross-platform compatibility of keynaming
    spaceKey=(KbName('space')); %defines space key
    SKey=(KbName('RIGHTARROW')); %Steal key right arrow
    NSKey=(KbName('LEFTARROW')); %No Steal key leftb arrow
end

% set up datapixx when the scanner is connedcted
if isfMRI ==1
    Datapixx('Open');
    Datapixx('StopAllSchedules');
    Datapixx('RegWrRd');
    Datapixx('EnableDinDebounce');
    theTrigger = 9;
    redKey = 1;
    yellowKey = 2;
    targList = [redKey, yellowKey];
    % set space key for control room access 
    KbName('UnifyKeyNames'); %used for cross-platform compatibility of keynaming
    spaceKey=(KbName('space')); %defines space key
end


%% initialize task

% Task instructions
Screen('TextFont',window, 'Times New Roman');
Screen('TextSize',window, 35);
Screen('TextStyle', window, 0);
DrawFormattedText(window,'In this task, a combination of cards will appear.','center',height/4,[0 0 0]);
DrawFormattedText(window,'Based on these cards you must predict if someone will Steal or Not Steal.','center',height/3,[0 0 0]);
DrawFormattedText(window,'If you think the cards predict Steal, press the "Left Arrow" ','center',height*.45,[0 0 0]);
DrawFormattedText(window,'If you think the cards predict No Steal, press the "Right Arrow" ','center',height*.55,[0 0 0]);
DrawFormattedText(window,'[PRESS THE SPACEBAR TO BEGIN]','center',height*.8,[0 0 0]);
Screen('Flip',window); % flips to instructions

KbQueueCreate; %creates cue using defaults
KbQueueStart;  %starts the cue

spacepressed=0;
while spacepressed==0
    [pressed, firstPress]=KbQueueCheck();
    spacepressed=firstPress(spaceKey);%press spacebar to move to next screen
    if (pressed && spacepressed) %keeps track of key-presses and draws text
        taskPStart=Screen('Flip',window);
    end
end

% record task start time
respCell(5) = {num2str(taskPStart)};
respInput = strjoin(respCell, ',');
fprintf(fid,'%s\n',respInput);

WaitSecs(1); %place the WaitSecs after the spacepress so that they can move forward whenever
KbQueueFlush; %Flushes the buffer

% initialization trial info
nTrials = 4;
iTrial= (iRun-1)*nTrials+1;
nRun = 2;
trialNum = iTrial;

%% task loop

for runNum = iRun:nRun
    %% get trigger or run start time
    DrawFormattedText(window,'Are you ready for the next round?','center','center',[0,0,0]);
    
    if isfMRI == 0
        runStartTime = Screen('Flip', window);
        WaitSecs(2);
        % record run start info.
        respCell([6,9]) = {num2str(runNum), num2str(runStartTime)};
        respInput = strjoin(respCell, ',');
        fprintf(fid,'%s\n',respInput);
        
    end
    
    if isfMRI == 1
        Datapixx('RegWrVideoSync');
        triggerPTime = Screen('Flip', window); %computer time start - stamp
        triggerDTime = Datapixx('GetTime'); %datapixx time start-stamp
    %    [Bpress,Etime,RespTime,TheButtons] = SimpleWFE(500, theTrigger);
        runStartTime = triggerDTime; % trigger start time (datapixx time)
        
        % record run start info.
        respCell(6:9) = {num2str(runNum), num2str(triggerPTime), num2str(triggerDTime), num2str(runStartTime)};
        respInput = strjoin(respCell, ',');
        fprintf(fid,'%s\n',respInput);
    end
    
  

    %% present stimuli and choice

col = []; % initialize empty col for second for loop
mat = []; % initialize empty mat for first for loop
trialsInRun = 40; %40 per run
partAmt = 5; % 5 participants
runs = 5; %  rounds of task
runsByPtp = partAmt * runs; % produce columns for amount of participants and amount of rounds

 for i = 1:(runsByPtp+1) % first loop is empty column ("col"), so + 1
    mat = [mat col];
    col = [];
    for j = 1:trialsInRun
        num = datasample([1.5,3.7,4.1],1);
        col = [col; num];
    end
 end

 jitterStart  = 8;
 jitterM = mat; 


             
    %For the jittering. start run + 6(seconds)*trial -1 + the sum of all
    %the jitter up until that point
 
    for trial = iTrial:nTrials
        
        trialPStart = Screen('Flip',window);
        WaitSecs(jitterStart);
        
        % present card
        patternIdx = outcomes(1,trial);
        cardPattern = pattern(patternIdx,:);
        for i = 1:4
            if cardPattern(i) == 1
                Screen('DrawTexture', window, textIm{i},[],imRect{i});
            end
        end
        % present face
        faceIdx = randi(4);
        Screen('DrawTexture', window, textFace{faceIdx},[],faceRect);
        
        
        % present all visual stimuli
        cardPrePTime=Screen('Flip', runStartTime + jitterStart); 
        WaitSecs(3 + jitterM[trial, (ID1)*Run + 1 + (iRun - 1)][1]; %present for 3 seconds + jitter
        
        
        % present option for prediction of Steal or No Steal
        Screen('TextFont',window, 'Times New Roman');
        Screen('TextSize',window, 50);
        Screen('TextStyle', window, 0);
        DrawFormattedText(window,'Steal',width*.8,height*.9,[0 0 0]);
        DrawFormattedText(window,'No Steal',width*.1,height*.9,[0 0 0]);
        choicePrePTime = Screen('Flip',window, cardPrePTime + jitterM[trial, (ID1)*Run + 1 + (iRun - 1)][1]);
        
        
        %% when scanner is not connected
        
        % check keyboard response:
        if isfMRI == 0
            %initilize response
            keypressed = 0;
            while keypressed==0
                [pressed, firstPress]=KbQueueCheck(); %check to see if a key has been pressed
                Spressed=firstPress(SKey); %for Steal
                NSpressed=firstPress(NSKey); %for No Steal
                if (pressed)
                    keypressed = 1;
                    if (outcomes(2, trial) == 0 && Spressed) %no steal, press steal
                        choice = 'S';
                        keyPreSec = firstPress(SKey);
                        Screen('DrawTexture', window, textEnd{3}, [], corrRect);
                        Screen('DrawTexture', window, textEnd{1}, [], stealRect);
                        
                    elseif  (outcomes(2, trial) == 1 && Spressed) % steal, press steal
                        choice = 'S';
                        keyPreSec = firstPress(SKey);
                        Screen('DrawTexture', window, textEnd{4}, [], corrRect);
                        Screen('DrawTexture', window, textEnd{1}, [], stealRect);
                        
                    elseif (outcomes(2, trial) == 0 && NSpressed) % no steal, press no steal
                        choice = 'NS';
                        keyPreSec=firstPress(NSKey);
                        Screen('DrawTexture', window, textEnd{4}, [], corrRect);
                        Screen('DrawTexture', window, textEnd{2}, [], stealRect);
                        
                    elseif (outcomes(2, trial) == 1 && NSpressed) % steal, press no steal 
                        choice = 'NS';
                        keyPreSec=firstPress(NSKey);
                        Screen('DrawTexture', window, textEnd{3}, [], corrRect);
                        Screen('DrawTexture', window, textEnd{2}, [], stealRect);
                        
                    end
                    respTime = keyPreSec - choicePrePTime;
                end %pressed
            end %while
            
            
        end %isfMRI ==0
        
        
        %% when scanner is connected 
        
        if isfMRI == 1
            [Bpress,keyPreSec,respTime,TheButtons] = SimpleWFE(5, targList);
            if (Bpress)
                if (outcomes(2, trial) == 0 && TheButtons == 2) % no steal press steal(yellow)
                    choice = 'S';
                    Screen('DrawTexture', window, textEnd{3}, [], corrRect);
                    Screen('DrawTexture', window, textEnd{1}, [], stealRect);
                    
                elseif  (outcomes(2, trial) == 1 && TheButtons == 2) % steal press steal(yellow)
                    choice = 'S';
                    Screen('DrawTexture', window, textEnd{4}, [], corrRect);
                    Screen('DrawTexture', window, textEnd{1}, [], stealRect);
                elseif (outcomes(2, trial) == 0 && TheButtons == 1) % no steal press no steal (red)
                    choice = 'NS';
                    Screen('DrawTexture', window, textEnd{4}, [], corrRect);
                    Screen('DrawTexture', window, textEnd{2}, [], stealRect);
                    
                elseif (outcomes(2, trial) == 1 && TheButtons == 1) % steal press no steal (red)
                    choice = 'NS';
                    Screen('DrawTexture', window, textEnd{3}, [], corrRect);
                    Screen('DrawTexture', window, textEnd{2}, [], stealRect);
                    
                end
            end %Bpress
            
        end % if isfMRI ==1
        trialPEnd = Screen('Flip', window, choicePrePTime + jitterM[trial, (ID1)*Run + 1 + (iRun - 1)][1]);
        WaitSecs(2);
        
        % record trial data
        respCell(10:19) = {num2str(trialNum), num2str(trialPStart), num2str(patternIdx), num2str(faceIdx),...
            num2str(cardPrePTime), num2str(choicePrePTime),num2str(choice),num2str(keyPreSec),...
            num2str(respTime),num2str(trialPEnd)};
        respInput = strjoin(respCell, ',');
        fprintf(fid,'%s\n',respInput);
        
        trialNum = trialNum +1;
    end % end trial loop
    
    if isfMRI == 0
        runPEnd = Screen('Flip', window);
        respCell(20) = {num2str(runPEnd)};
        respInput = strjoin(respCell, ',');
        fprintf(fid,'%s\n',respInput);
    end
    
    if isfMRI ==1
        Datapixx('RegWrVideoSync');
        runPEnd = Screen('Flip', window); %computer trigger time
        runDEnd = Datapixx('GetTime'); %datapixx trigger time
        runPDur = runPEnd - triggerPTime;
        runDDur = runDEnd - triggerDTime;
        %record data
        respCell(20:23) = {num2str(runPEnd), num2str(runDEnd), num2str(runPDur), num2str(runDDur)};
        respInput = strjoin(respCell, ',');
        fprintf(fid,'%s\n',respInput);
    end
    
   
    
end % end run loop

%close everything
Datapixx('Close')
fclose(fid); %closes the file that you wrote early on
sca;



