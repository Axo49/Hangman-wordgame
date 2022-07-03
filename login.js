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
	const username = document.getElementById("UserName").value;
	const password = document.getElementById("Password").value;

if(password == "admin" && username == ([A-Za-z0-9]*$.test(username.value)))
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