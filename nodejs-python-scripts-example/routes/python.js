var express = require('express');
var router = express.Router();

var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://127.0.0.1:1883');

router.get('/extract_embeddings', function (req, res) {
    //send mqtt message to start python stuff
    client.publish('/python/extract_embeddings', JSON.stringify({
        dataset: "dataset",
        embeddings: "output/embeddings.pickle",
        detector: "face_detection_model",
        embedding_model: "openface_nn4.small2.v1.t7",
    }));
    res.send(200);
});

router.get('/build_face_dataset', function (req, res) {
    //send mqtt message to start python stuff
    client.publish('/python/build_face_dataset', JSON.stringify({
        cascade: "haarcascade_frontalface_default.xml",
        output: "dataset/testoutput"
    }));
    res.send(200);
});

router.get('/recognize_video', function (req, res) {
    //send mqtt message to start python stuff
    client.publish('/python/recognize_video', JSON.stringify({
        le: "output/le.pickle",
        recognizer: "output/recognizer.pickle",
        detector: "face_detection_model",
        embedding_model: "openface_nn4.small2.v1.t7",
    }));
    res.send(200);
});

router.get('/train_model', function (req, res) {
    //send mqtt message to start python stuff
    client.publish('/python/train_model', JSON.stringify({
        embeddings: "output/embeddings.pickle",
        recognizer: "output/recognizer.pickle",
        le: "output/le.pickle",
    }));
    res.send(200);
});

module.exports = router;
