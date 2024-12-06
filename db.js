const mysql = require("mysql2/promise");


const conexao = mysql.createPool(process.env.CONNECTION_STRING);

async function listaProdutos(){
    const resultado= await conexao.query("SELECT * FROM produto")
    return resultado[0];
}

async function listaProduto(id){
    const resultado = await conexao.query("SELECT * FROM produto WHERE id=?;",[id]);
    return resultado[0];
}

function insereProduto(produto){
    const valores = [produto.nome, produto.quantidade, produto.preco]
    conexao.query("INSERT INTO produto(nome,quantidade,preco) VALUES (?,?);",valores);
  
}

async function alteraProduto(id,dadosproduto){
    const valores = [dadosproduto.nome, dadosproduto.quantidade, id];
    await conexao.query("UPDATE produto SET nome=?,quantidade=?,preco=?, WHERE id=?",valores);

}


async function removeProduto(id){
    const valores = [id];
    await conexao.query("DELETE FROM produto WHERE id=?",valores);
}

//comando para que a função seja acessivel de fora do arquivo db.js
module.exports = {
listaProduto,
listaProdutos,
insereProduto,
alteraProduto,
removeProduto
}