// Initialize Firebase
// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

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

    var employeeName = "";
  var role = "";
  var startDate = "";
  var monthlyRate = 0;

 
  $('#add-employee-btn').on("click", function(event){
    event.preventDefault();
    employeeName = $('#employee-name-input').val().trim();
        $('#employee-name-input').val("");
    role = $('#role-input').val().trim();
        $('#role-input').val("");
    startDate = Date.parse($('#start-input').val().trim()); 
    console.log(startDate);
        $('#start-input').val("");
    monthlyRate = $('#rate-input').val().trim();
        $('#rate-input').val("");
    database.ref().push({
        employeeName: employeeName,
        employeeRole: role,
        startDate: startDate,
        monthlyRate: monthlyRate,
    });

  /*  $("table tbody").append(`<tr>
    <td>${employeeName}</td>
    <td>${role}</td>
    <td>${startDate}</td>
    <td>Months Worked placeholder</td>
    <td>${monthlyRate}</td>
    <td>Total billed placeholder</td>
    </tr>`);*/
    database.ref().on("child_added", function(snapshot, prevChildKey){
        var newName = snapshot.val().employeeName;
        var newRole = snapshot.val().employeeRole;
        var newDate = snapshot.val().startDate;
        var newRate = snapshot.val().monthlyRate;
        console.log( snapshot.val().employeeName );

        var convertedDate = moment(newDate);
        var monthsWorked = moment(moment()).diff(convertedDate , "months");
        console.log("months worked: " + monthsWorked);
        var billed = monthsWorked * newRate;

        $("table tbody").append(`<tr>
        <td>${newName}</td>
        <td>${newRole}</td>
        <td>${newDate}</td>
        <td>${monthsWorked}</td>
        <td>${newRate}</td>
        <td>${billed}</td>
        </tr>`);
    });

  });



 