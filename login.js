//Login page
function openForm() {
    document.getElementById("login").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("login").style.display = "none";
  }

function Login() 
{
	// validates inputs and alerts mistakes
	const username = document.querySelector(".UserName1");
	const password = document.getElementById("Password").value;

if(password == "wordly" )
{
  alert("Login succesfully");
  window.location =("game.html");
  sessionStorage.setItem("username", username.value);
  return false;

}
else
{
  alert("Login Failed");
  return false;
}
}

function logout() 
{   
    window.location =("index.html");
    sessionStorage.clear();
    return false;
}

function show_image(src, width, height, alt) {
  var img = document.createElement("img");
  img.src = src;
  img.width = width;
  img.height = height;
  img.alt = alt;
  document.body.appendChild(img);
}

// function add_pic() {
//   var src = "img/Andy.webp";
//   show_image("img/Andy.webp", 276,110, "deeGorsDog");
// }


if (sessionStorage.getItem("username") == 'Dee Gor' || sessionStorage.getItem("username") == "Andy") 
{
  document.getElementById("playerName").innerHTML =`${sessionStorage.getItem("username")}`;
  document.getElementById("userpic").setAttribute("src", "img/Andy.webp");
} else
{
  document.getElementById("playerName").innerHTML =`${sessionStorage.getItem("username")}`;

}