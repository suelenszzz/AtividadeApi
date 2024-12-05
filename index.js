require("dotenv").config();

const db = require("./db");

// constante e recebe o require especificando a biblioteca que vai carregar.
const express = require("express")  ;
//constante chamada app que recebe uma função que inicializa uma aplicação (web api)
const app = express();

//configuração de corpo para que no momento da criação de novos clientes os dados do corpo do post sejam processados pela api
app.use(express.json());

app.delete("/produto/:id",(request, response)=>{
    const id = request.params.id;
    db.removeProduto(id);
    response.sendStatus(204);
});

app.patch("/produto/:id",(request, response)=>{
    const id = request.params.id;
    const dadosproduto = request.body;
    //const idade = request.params.idade;
    db.alteraProduto(id, dadosproduto);
    response.sendStatus(200);
});

app.post("/produto", (request, response)=>{
    const produto = request.body;
    db.insereProduto(produto);
    response.sendStatus(201);
});

app.get("/produto/:id",(request, response)=>{
    const id = request.params.id;
    response.json(db.listaProduto2(id));
});

app.get("/produto",(request, response)=>{
    response.json(db.listaProduto1());
});

// criação da rota ou endpoint principal ou raiz com a função definindo o que será feito.
 app.get("/", (request, response) => {
         response.json({
             message: "Está OK o Response!"
         })
     })

// listen é de escutar. preciso definir qual a porta de escuta. Por boa prática criei o .env 
 //app.listen(process.env.PORT); x
// posso passar a função com 2o parâmetro para testar a subida da aplicação 
app.listen(process.env.PORT, ()=>{
    console.log("App IS RUNNING!") ;   
})
