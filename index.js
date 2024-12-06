require("dotenv").config();

const db = require("./db");

const express = require("express")  ;

const app = express();

app.use(express.json());

app.delete("/produto/:id", async (request, response)=>{
    const id = request.params.id;
    db.removeProduto(id);
    response.sendStatus(204);
});

app.patch("/produto/:id", async (request, response)=>{
    const id = request.params.id;
    const dadosproduto = request.body;

    db.alteraProduto(id, dadosproduto);
    response.sendStatus(200);
});

app.post("/produto", async (request, response)=>{
    const produto = request.body;
    await db.insereProduto(produto);
    response.sendStatus(201);
});

app.get("/produto/:id", async (request, response)=>{
    const id = request.params.id;
    const resultado = await db.listaProduto(id);
    response.json(resultado);
});

app.get("/produto", async(request, response)=>{
    response.json(db.listaProdutos());                                  
    response.json(resultado)
});

 app.get("/", (request, response) => {
         response.json({
             message: "Response Funcionando!"
         })
     })

app.listen(process.env.PORT, ()=>{
    console.log("App IS RUNNING!") ;   
})
