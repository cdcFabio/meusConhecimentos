import dao from "../dao/AcessIndexDB";


const store = 'materias';
const versao = 3;
const nomeBanco = 'local'

const AdicionaMateria = (materia)=> {
return new Promise((resolve,reject) => {
  dao.AcessaBanco(store,versao,nomeBanco)
                    .then(conexao => dao.Adiciona(conexao,materia))
                    .then(retorno => resolve(retorno))
                    .catch(erro => { 
                       reject(console.log(erro))
                        throw new Error('Erro ao acessar o banco')})

                    })                   
}

const CarregaDoBanco = () => {

   return new Promise((resolve,reject) =>{
        dao.AcessaBanco(store,versao,nomeBanco)
                .then(conexao => dao.Carrega(conexao))
                .then(result => resolve(result))
    })
   
}

const AlteraMateria = (materia) =>{
 return new Promise((resolve,reject) =>{
    dao.AcessaBanco(store,versao,nomeBanco)
                .then(conexao => dao.Altera(conexao,materia))
                .then(retorno => resolve(retorno))
                .catch(erro => { 
                    console.log(erro);
                    throw new Error(`Erro ao acessar o banco ${erro}`)}) 
})

}

const RemoveMateria = (materia) => {
    
     dao.AcessaBanco(store,versao,nomeBanco)
                .then(conexao => dao.Remove(conexao,materia.id))
                .catch(erro => { 
                    console.log(erro);
                    throw new Error('Erro ao acessar o banco')}) 

}

const ExportaDados = ()=> {

    return new Promise((resolve,reject) =>{
        dao.AcessaBanco(store,versao,nomeBanco)
        .then(conexao => dao.Exporta(conexao))
        .then(result => resolve(result))
        .catch(erro => {
            console.log(erro);
             throw new Error('Erro ao acessar o banco')
        })

    })
}

const controle =  {
    AdicionaMateria, 
    CarregaDoBanco,
    AlteraMateria, 
    RemoveMateria,
    ExportaDados
} 

export default controle