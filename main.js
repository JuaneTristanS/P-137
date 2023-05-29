Status = "";
object = [];

function setup() {
    canvas = createCanvas(500, 270);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(500, 270);
    video.hide();
}

function start() {
    od = ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects...";

    o_n = document.getElementById("inp").value;
}

function ModelLoaded() {
    console.log("The model has been initialised");
    Status = true;
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        object = results;
    }
}

function draw() {
    image(video, 0, 0, 500, 270);

    if (Status != "") {
        od.detect(video, gotResults);

        for (i = 0; i < object.length; i++) {

            fill("red");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 10, object[i].y + 10);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if (object[i].label == o_n) {
                video.stop();
                od.detect(gotResults);
                document.getElementById("status").innerHTML = "Object has been found";
                document.getElementById("det").innerHTML = o_n + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(o_n + " has been found ");
                synth.speak(utterThis);
            }

            else {
                document.getElementById("status").innerHTML = "Object has not been found";
                document.getElementById("det").innerHTML = o_n + " is not Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(o_n + " is not found");
                synth.speak(utterThis);
            }
        }
    }
}