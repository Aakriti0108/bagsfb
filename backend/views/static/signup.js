async function signup(e)
{
    try{
    e.preventDefault();
    console.log(e.target.email.value);

    const signupDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }

    console.log(signupDetails);
    const response = await axios.post("http://localhost:3000/user/signup",signupDetails)
   if(response.status === 201){
     window.location.href = "./login.html";
    document.body.innerHTML = `<div style="color:red;">${response}<div>`
   }
   else
   {
    throw new Error ('failed to login')
   }
}
catch(err){
  document.body.innerHTML = `<div style="color:red;">${err}<div>`
}

}