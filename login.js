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

if(password == "admin" )
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

if (sessionStorage.getItem("username")) 
{
  document.getElementById("welcome").innerHTML =`${sessionStorage.getItem("username")}`;
}