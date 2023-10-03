
const firebaseConfig = {
      apiKey: "AIzaSyD8AAu0XEu5403febMkQa8SN7J9JSaZ19M",
      authDomain: "kwitter-adcfe.firebaseapp.com",
      databaseURL: "https://kwitter-adcfe-default-rtdb.firebaseio.com",
      projectId: "kwitter-adcfe",
      storageBucket: "kwitter-adcfe.appspot.com",
      messagingSenderId: "649501822416",
      appId: "1:649501822416:web:10e291d6d8ff5b2fef3dd5"
    };
    firebase.initializeApp(firebaseConfig);
    user_name=localStorage.getItem("user_name");
    room_name=localStorage.getItem("room_name");
    function send()
    {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value = "";
    }


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4>"+ name +"</h4>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>Curtidas: "+ like +"</button>";

row = name_with_tag + message_with_tag +like_button;
document.getElementById("output").innerHTML += row;

      } });  }); }
getData();

function updateLike(message_id)
{
      console.log("clicou no botão Curtidas - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}


function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
      }
