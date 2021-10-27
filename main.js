song = "";

function preload()
{
    song = loadSound("music.mp3");
}
scoreRightWrist = 0;
scoreLeftWrist = 0;

rightwristX = 0;
rightwristY = 0;

leftwristX = 0;
leftwristY = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(" scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);


        rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightwristX + "rightWristY = "+ rightwristY);

    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftwristX + "leftWristY = "+ leftwristY);

    }
    
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

   

    if(scoreRightWrist > 0.2)
    { 
        circle(rightwristX, rightwristY,20);

      if(rightwristY > 0 && rightwristY <= 100)
      {
          document.getElementById("speed").innerHTML = "Speed = 0.5";
          song.rate(0.5);
         
          
      }
      else if(rightwristY > 100 && rightwristY <= 200)
      {
        document.getElementById("speed").innerHTML = "Speed = 1";
        song.rate(1);
        
      }
      else if(rightwristY > 200 && rightwristY <= 300)
      {
        document.getElementById("speed").innerHTML = "Speed = 1.5";
        song.rate(1.5);
        
      }
      else if(rightwristY > 300 && rightwristY <= 400)
      {
        document.getElementById("speed").innerHTML = "Speed = 2";
        song.rate(2);
        
      }
      else if(rightwristY > 400)
      {
        document.getElementById("speed").innerHTML = "Speed = 2.5";
        song.rate(2.5);
        
      }
    }

    if(scoreLeftWrist > 0.2)
    {
    circle(leftwristX, leftwristY,20);
    console.log("circle drawen");
    InNumberleftwristY = Number(leftwristY);
    remove_decimals = floor(InNumberleftwristY);
    volume = remove_decimals/500;
    console.log("volume = "+ volume);
    document.getElementById("volume").innerHTML = " Volume = " + volume;
    song.setVolume(volume);
    }
}



function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}