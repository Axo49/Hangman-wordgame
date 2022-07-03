//Login page
function Login() {
	// validates inputs and alerts mistakes
	const username = document.getElementById("UserName").value;
	const password = document.getElementById("Password").value;

if(username == "admin" && password == "admin")
{
  alert("Login succesfully");
  window.location = "game.html";
  return true;

}
else
{
  alert("Login Failed")
  return false;
}

}