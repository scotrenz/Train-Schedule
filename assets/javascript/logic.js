  var config = {
      apiKey: "AIzaSyD7-D4syQr4ADo72QGRs2b-LLLBdWBjxWk",
      authDomain: "employees-84ba2.firebaseapp.com",
      databaseURL: "https://employees-84ba2.firebaseio.com",
      projectId: "employees-84ba2",
      storageBucket: "employees-84ba2.appspot.com",
      messagingSenderId: "718837005950"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name;
  var destination;
  var firstArrival;
  var frequency;


  $("#submit").on("click", function(event) {
      event.preventDefault();

      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstArrival = $("#first-arrival-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      database.ref().push({
          name: name,
          destination: destination,
          firstArrival: firstArrival,
          frequency: frequency,
      });
  });

  var name;
  var destination;
  var firstArrival;
  var frequency;
  var diffTime;
  var minutesTillTrain;
  var nextTrain;
  var d;
  var e;
  database.ref().on("child_added", function(childSnapshot) {
      //console.log(moment(childSnapshot.val().firstArrival, "HH:mm"));
      name = childSnapshot.val().name

      destination = childSnapshot.val().destination

      firstArrival = moment(childSnapshot.val().firstArrival, "HHmm");
      console.log(firstArrival)

      frequency = childSnapshot.val().frequency
      console.log(frequency)

      diffTime = Math.abs(moment(firstArrival).diff(moment(), "minutes"));
      console.log(diffTime)

      var minutesTillTrain = frequency - (diffTime % frequency);
      console.log(minutesTillTrain)

      var nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm");
      console.log(nextTrain)


      var row = $("<tr>");
      var a = $("<td>").html(childSnapshot.val().name);
      var b = $("<td>").html(childSnapshot.val().destination);
      var c = $("<td>").html(frequency);
      d = $("<td>").html(nextTrain);
      e = $("<td>").html(minutesTillTrain);


      row.append(a);
      row.append(b);
      row.append(c);
      row.append(d);
      row.append(e);
      $("#table-content").append(row);

  });

  function updateTimes() {
      diffTime = Math.abs(moment(firstArrival).diff(moment(), "minutes"));
      console.log(diffTime)

      var minutesTillTrain = frequency - (diffTime % frequency);
      console.log(minutesTillTrain)

      var nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm");
      console.log(nextTrain)

      d = $("<td>").html(nextTrain);
      e = $("<td>").html(minutesTillTrain);
  }
  setInterval(function() {
      //updateTimes()
  }, 3000);