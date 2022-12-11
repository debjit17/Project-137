objectDetector="";
ObjectToLook = "";

var img = "";
objects = [];
status = "";
video = "";

SpS = false;


function preload()
{
}

function setup()
{
    canvas = createCanvas(400, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(400, 380);
    video.hide();
}

function start()
{
    ObjectToLook = document.getElementById("name").value;
    if(ObjectToLook != "" && ObjectToLook != " ")
    {
        objectDetector = ml5.objectDetector("cocossd", modelLoaded);
        document.getElementById('status').innerHTML = "Detecting Objects";
    }
    else
    {
        alert("Please Enter Something To Search For :)");
    }
}

function modelLoaded()
{
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    objects = results;

}

function draw()
{
    image(video, 0, 0, 400, 380);
    x = (windowWidth - width) / 2;
    y = (windowHeight - height) / 2;
    y = y + 100
    x = x + 0
    canvas.position(x, y);

    if(status != "")
    {
        r = random(255);
        b = random(255);
        g = random(255);

        objectDetector.detect(video, gotResult);

        for(var i = 0; i < objects.length; i++)
        {
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(255, 0, 0)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        for(var i = 0; i < objects.length; i++)
        {
            if(objects[i].label == ObjectToLook)
            {
                SpS = true;
                document.getElementById("status").innerHTML = ObjectToLook + " Detected";
                break;
            }
            else if(objects[i].label != ObjectToLook)
            {
                SpS = false;
                document.getElementById("status").innerHTML = ObjectToLook + " Not Detected";
            }
        }

        if(objects.length == 0)
        {
            SpS = false
            document.getElementById("status").innerHTML = ObjectToLook + " Not Detected";
        }

    }
}

function speak(speak)
{   
    var synth = window.speechSynthesis;
    speak_data = speak;
    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
}


setInterval(function()
{
    if(ObjectToLook != "" && ObjectToLook != " ")
    {
        if(SpS == true)
        {
            speak("Object" + ObjectToLook + " has been found");
        }
        else if(SpS = false)
        {
            speak("Object" + ObjectToLook + " has not been found");
        }
    }

}, 5000);
