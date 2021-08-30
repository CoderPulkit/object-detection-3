img="";
status="";
object=[];

function preload(){
  img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Object Detecting";
}

function modelLoaded(){
  console.log("Model Loaded");
  status=true;
  object_detector.detect(img,gotResult);
}

function gotResult(error,results){
  if (error){
    console.error(error);
  }
  else{
    console.log(results);
    object=results;
  }
}

function draw(){
    image(img,0,0,640,420);
    //fill("#FF0000");
    //text("Dog",40,75);
    //noFill();
    //stroke('#000000');
    //rect(30,60,450,350);
    
    if(status!=""){
     
      for(i=0;i<object.length;i++){
      document.getElementById("status").innerHTML="Status: Object Detected";
      fill("#FF0000");
      percent=floor(object[i].confidence*100);
      text(object[i].label+"  "+percent+"%",object[i].x+15,object[i].y+15);
      noFill();
      stroke('#000000');
      rect(object[i].x,object[i].y,object[i].width,object[i].height);
      }
    }
}