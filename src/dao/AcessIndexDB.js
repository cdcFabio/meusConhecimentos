

const AcessaBanco = (store,versao,nomeBanco) =>{

  return new Promise((resolve,reject) => {

    let requisicao = window.indexedDB.open(nomeBanco,versao)
    let conexao = null;

        requisicao.onupgradeneeded = e => {
            
            conexao = e.target.result;

        if(!conexao.objectStoreNames.contains(store))
            conexao.createObjectStore(store, { autoIncrement: true });
        }

        requisicao.onsuccess = e => {
            if(!conexao){
                conexao = e.target.result;
            }

            let objetoLocal = conexao.transaction(store,'readwrite').objectStore(store)
            resolve(objetoLocal);
        }

        requisicao.onerror = e => {
            console.log(e.target.error);
            reject(e.target.error.name)
        }
    });
}



const Adiciona = (conexao, conteudo) => {

    return new Promise((resolve,reject) => {
    
        let requisicao = conexao.add(conteudo);

        
        requisicao.onsuccess = e => {
            resolve(e.target.result)
        }

        requisicao.onerror = e => {
            console.log(e.target.error);
            reject("Não foi possivel salvar o coneteudo")
        }
       

    })
}

const Carrega = (conexao) => {

    return new Promise((resolve,reject) => {
    
        let cursor = conexao.openCursor();

        let resultados = [];

        cursor.onsuccess = e => {
            
            let atual = e.target.result;

            if(atual){
                let dado = atual.value;
                let idBanco = atual.key;
                resultados.push({...dado,id:idBanco});
                atual.continue();
            } else {
                resolve(resultados)
            }
            
            
            
        }

        cursor.onerror = e => {
            console.log(e.target.error.name);
            reject("Não foi possivel carregar o conteudo")
        }
       

    })
}

const Altera = (conexao, conteudo) => {
   
    return new Promise((resolve,reject) => {

        let requisicao = conexao.put(conteudo,conteudo.id);

        
        requisicao.onsuccess = e => {
            resolve(e.target.result)
        }

        requisicao.onerror = e => {
            console.log(e.target.error);
            reject("Não foi possivel salvar o coneteudo")
        }
    })
}

const Remove = (conexao, id) => {
    return new Promise((resolve,reject) => {

        let requisicao = conexao.delete(id);

        
        requisicao.onsuccess = e => {
            resolve(e.target.result)
        }

        requisicao.onerror = e => {
            console.log(e.target.error);
            reject("Não foi possivel salvar o coneteudo")
        }
    })
}


const dao = { Adiciona, AcessaBanco, Carrega, Altera, Remove}

export default dao