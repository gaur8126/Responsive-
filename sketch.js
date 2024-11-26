let capture;
let posenet;
let singlePose = null, skeleton = null;

function setup(){
    createCanvas(800, 500);
    capture = createCapture(VIDEO);
    capture.size(800, 500); 
    capture.hide(); 

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
}

function receivedPoses(poses){
    console.log(poses);
    if (poses.length > 0 && poses[0].pose) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded(){
    console.log('Model has loaded');
}

function draw(){
    image(capture, 0, 0, 800, 500); 
    fill(255, 0, 0);
    
    if (singlePose) {
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y, 15);
        }
        stroke(255,255,255);
        strokeWeight(5);
        for (let j = 0; j < skeleton.length; j++) {
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
        }
    }
}
