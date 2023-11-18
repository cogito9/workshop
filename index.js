const express = require('express');
const cors = require('cors');
const app = express();
const file = require("fs");
const fileFolder = "register.json";
const maxStudents = 30;
const maxStudentsTest = 5;

app.use(express.urlencoded());
app.use(cors());
const port = process.env.PORT || 8080;

app.get('/', (request, response, next)=>{

    let isDisabled = false;

    if (file.existsSync(fileFolder)) {
        let info = file.readFileSync(fileFolder, 'utf8');
        let jsonInfo = JSON.parse(info);
        isDisabled =  jsonInfo.count < maxStudents?true:false;
      
    }

	response.send(`
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<div class="container">
			<h1 class="text-center mt-3 mb-3">Taller de Matemáticas</h1>
			<div class="card">
				<div class="card-header">Registro</div>
				<div class="card-body">
					<form method="POST" action="/">
						<div class="mb-3">
							<label>Número de Control</label>
							<input type="text" name="numberControl" id="number_control" 
                            class="form-control" 
                            pattern="^[a-zA-Z0-9]{9}$"
                            ${isDisabled ? '' : 'disabled'}
                            required/>
						</div>
						<div class="mb-3">
		                	<label>Email Address</label>
		                	<input type="email" name="email_address" id="email_address" class="form-control"   ${isDisabled ? '' : 'disabled'}/>
		                </div>
		                <div class="mb-3">
		                	<input type="submit" name="submit_button" class="btn btn-primary" value="Add"  ${isDisabled ? '' : 'disabled'}/>
		                </div>
					</form>
				</div>
			</div>
            <div class="mt-5 mb-5" style="display:${isDisabled? 'none': 'block'}">
                <div class="alert alert-warning" role="alert">
                    Cupo máximo lo sentimos, abriremos nuevos talleres muy pronto :) <br>
                    contact: maria.gomez@chapala.tecmm.edu.mx

                </div>
            </div>
		</div>
	`);


});

app.post('/', function(request, response, next){
    try{
        console.log(request.body);
        response.send(`
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
            <div class="container">
                <div class="mt-5 mb-5">
                    <div class="alert alert-success" role="alert">
                        Tu registro se ha hecho correctamente... Gracias 
                    </div>
                </div>
            </div>
    
        
        `);


        if (file.existsSync(fileFolder)) {
            let info = file.readFileSync(fileFolder, 'utf8');
            let jsonInfo = JSON.parse(info);
            jsonInfo.count++;
            jsonInfo.data.push(request.body);
            file.writeFileSync(`${fileFolder}`, JSON.stringify(jsonInfo));
          } else {
            let count = 1;
            let list = [];
            list.push(request.body);
            let initJSON = {
                "count": count,
                "data" : list
            }

            file.writeFileSync(`${fileFolder}`, JSON.stringify(initJSON));

          }

    
        

    }
    catch(err){
        console.log(err);
    }

});



const server = app.listen(port, () =>{
    let port = server.address().port
    console.log(`Server is live in the port ${port}`);
});