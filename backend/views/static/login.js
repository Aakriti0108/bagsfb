

function login(e)
{
    
    e.preventDefault();
    console.log(e.target.email.value);

    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value
    }
    axios.post('http://localhost:3000/user/login',loginDetails)
    .then(response => {
      console.log
      if(response.status === 200)
     {
       alert(response.data.message);
       window.location.href = "./about.html";
    } 
    else{
      alert("user information is wrong");
      e.target.email.value="";
     e.target.password.value="";
    }
    console.log(loginDetails); 
   
  })
  .catch(err =>{
     console.log(err);
    
    if(err.response.status === 400)
    {
      alert("password is incorrect");
      e.target.password.value="";
    }
    else if(err.response.status === 404)
    {
      alert("user doesn't exist");
      window.location.href = "./signup.html";
    }
    else{
    alert("user information is wrongggggg");
    }
    document.body.innerHTML+=`<div style="color:red;">${err.message}<div>`
  })
}

