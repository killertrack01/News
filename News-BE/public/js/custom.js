function login(){
   $.ajax({
      url: "http://localhost:3000/admin/login/process",
      type: "POST",
      data: {
         username: $('#username').val(),
         password: $('#password').val()
      }
      .then(data => {
         console.log(data);
      })
      .catch(err => {
         console.log(err);
      })
   });
}