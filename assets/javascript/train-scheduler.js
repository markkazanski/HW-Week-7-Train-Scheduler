// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

/*
Store Train Sched
    Get user input, submit button
    Write to database
    Listen to changes, write to table

Calculate Arrival
    calculate next arrival using first train and freq
    calculate minutes away: next arrival - current time
*/

var config = {
    apiKey: "AIzaSyB7h26M68oOLccwtpunvSubikfT2S_TCSM",
    authDomain: "train-scheduler-1aae5.firebaseapp.com",
    databaseURL: "https://train-scheduler-1aae5.firebaseio.com",
    projectId: "train-scheduler-1aae5",
    storageBucket: "train-scheduler-1aae5.appspot.com",
    messagingSenderId: "279977288764"
  };
  firebase.initializeApp(config);
  // Assign the reference to the database to a variable named 'database'
  //var database = ...
  
  var database = firebase.database();

 /* $("#add-employee-btn").on("click", function(event){ //
    event.preventDefault();
    var nameInput = $("#employee-name-input").val();
    $("table").append(`<tr>
    <td>${nameInput}</td>
    <td></td>
    </tr>`);
*/


 
 

  /*  $("table tbody").append(`<tr>
    <td>${employeeName}</td>
    <td>${role}</td>
    <td>${startDate}</td>
    <td>Months Worked placeholder</td>
    <td>${monthlyRate}</td>
    <td>Total billed placeholder</td>
    </tr>`);*/

  var TrainSchedulerApp = {
    
    initialize: function(){
        this.getInput();
        this.updateTable();
    },
    getInput: function(){
        $('#add-train-btn').on("click", function(event){ //Submit button click
            event.preventDefault();
            var trainName = $('#train-name-input').val().trim(); //local var to functino
            $('#train-name-input').val("");
            var destination = $('#destination-input').val().trim();
            $('#destination-input').val("");
            var firstTrain = $('#first-train').val().trim(); 
            $('#first-train').val("");
            var freq = $('#freq-input').val().trim();
            $('#freq-input').val(""); //assign input to variables
            database.ref().push({ //send variables to DB, push creates new keys
                trainName: trainName,
                destination: destination,
                firstTrain: firstTrain,
                freq: freq,
            });
        });
    },

    updateTable: function(){
        database.ref().on("child_added", function(snapshot, prevChildKey){
            var newTrainName = snapshot.val().trainName;
            var newDestination = snapshot.val().destination;
            var newFirstTrain = snapshot.val().firstTrain;
            var newFreq = snapshot.val().freq;
    
            $("table tbody").append(`<tr>
            <td>${newTrainName}</td>
            <td>${newDestination}</td>
            <td>${newFreq}</td>
            <td></td>
            <td></td>
            </tr>`);
        });
    },

    minutesAway: function(firstTrain, freq){
        var minutes;

        var currentTime = moment();
        var firstTrainMoment = moment(firstTrain);

        return minutes;
    },
  };

  /*Execution*/
  TrainSchedulerApp.initialize();


 