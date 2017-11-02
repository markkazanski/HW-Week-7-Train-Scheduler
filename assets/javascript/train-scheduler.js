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
            var destination = $('#destination-input').val().trim();         
            var firstTrain = $('#first-train').val().trim(); 
            var freq = $('#freq-input').val().trim(); //assign input to variables
            
            var re = new RegExp('(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){1}');
            
            if( trainName !== "" && destination !== "" && firstTrain !== "" && freq !== "" ){ //validate
                if( re.test(firstTrain) ){
                    database.ref().push({ //send variables to DB, push creates new keys
                        trainName: trainName,
                        destination: destination,
                        firstTrain: firstTrain,
                        freq: freq,
                    });

                    $('#train-name-input').val("");
                    $('#destination-input').val("");
                    $('#first-train').val("");
                    $('#freq-input').val(""); 
                }else{ 
                    console.log("Time must be HH:mm"); 
                    $("#first-train").addClass("error");
                }
            }else{ console.log("All Fields Required"); }
        });
    },

    updateTable: function(){
        database.ref().on("child_added", function(snapshot, prevChildKey){
            var newTrainName = snapshot.val().trainName;
            var newDestination = snapshot.val().destination;
            var newFirstTrain = snapshot.val().firstTrain;
            var newFreq = snapshot.val().freq;
            var minutesAway = TrainSchedulerApp.minutesAway(newFirstTrain, newFreq); 
            var nextTrain = TrainSchedulerApp.nextTrain(minutesAway);
    
            $("table tbody").append(`<tr>
            <td>${newTrainName}</td>
            <td>${newDestination}</td>
            <td>${newFreq}</td>
            <td>${nextTrain}</td>
            <td>${minutesAway}</td>
            </tr>`);
        });
    },

    minutesAway: function(firstTrain, freq){
        var tFrequency = freq;
        var firstTime = firstTrain;
    
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);
    
        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
    
        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);
    
        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        return tMinutesTillTrain;
    },

    nextTrain: function(tMinutesTillTrain){
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        return moment(nextTrain).format("hh:mm");
    },

  };

  /*Execution*/
  TrainSchedulerApp.initialize();


 