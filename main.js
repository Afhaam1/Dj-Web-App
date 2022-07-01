song = "";
right_wrist_x = "";
right_wrist_y = "";
left_wrist_x = "";
left_wrist_y = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}
function preload(){
    song = loadSound("music.mp3");
}
function draw(){
    image(video, 0, 0, 600, 500);
    stroke("red")
    fill("red")

    if(scoreRightWrist > 0.2){

    circle(right_wrist_x,right_wrist_y,20)

    if(right_wrist_y > 0 && right_wrist_y <= 100){
      document.getElementById("Speed").innerHTML = "speed = 0.5"
      song.rate(0.5);
    }

    else if(right_wrist_y > 100 && right_wrist_y <= 200){
        document.getElementById("Speed").innerHTML = "speed = 1"
        song.rate(1);
      }

    else if(right_wrist_y > 200 && right_wrist_y <= 300){
        document.getElementById("Speed").innerHTML = "speed = 1.5"
        song.rate(1.5);
      }

    else if(right_wrist_y > 300 && right_wrist_y <= 400){
        document.getElementById("Speed").innerHTML = "speed = 2"
        song.rate(2);
    }

    else if(right_wrist_y > 400 && right_wrist_y <= 500){
        document.getElementById("Speed").innerHTML = "speed = 2.5"
        song.rate(2.5);
      }
    }
    circle(left_wrist_x,left_wrist_y,20)
    if(scoreLeftWrist > 0.2){
    LeftWrist_ = Number(left_wrist_y);
    remove_decimal = floor(LeftWrist_);
    remove_decimal_ = remove_decimal/500;
    document.getElementById("volume").innerHTML = "volume =" + remove_decimal_;
    song.setVolume(remove_decimal_) 
    }   
}
function play(){
    song.play();
    song.rate(1);
    song.setVolume(1)
}
function modelLoaded(){
    console.log('PoseNet is initialised')
}
function gotPoses(results){
   if(results.length > 0 ){
   
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score

    console.log(results)
    left_wrist_x = results[0].pose.leftWrist.x
    left_wrist_y = results[0].pose.leftWrist.y
    console.log('left_wrist_x ='+ left_wrist_x + 'left_wrist_y ='+ left_wrist_y);

    right_wrist_x = results[0].pose.rightWrist.x
    right_wrist_y = results[0].pose.rightWrist.y
    console.log('right_wrist_x ='+ right_wrist_x + 'right_wrist_y ='+ right_wrist_y);
   }
}