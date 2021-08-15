

function update(index,link){
    //seleciona todas as tags que sejam td 
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);
    let lenTds = tds.length-1;
    let linkUpdate = tds[lenTds-1];
    let linkRemove = tds[lenTds];

    let lenInputs = inputs.length; 

    let button = inputs[lenInputs-1];

    linkUpdate.className='hidden';
    linkRemove.className='hidden';
    tds[lenTds-2].className='show';

     //esconde todos os campos de exibição de dados do cadastro
    for(let cont=0;cont<spans.length;cont++){
        if(spans[cont].className=="show"){
            spans[cont].className="hidden";
        } else{
            spans[cont].className="show";
        }
    }
    //mostra os campos de preenchimento para o cadastro
    for(let cont=0;cont<inputs.length;cont++){
        if(inputs[cont].className=="hidden"){
            inputs[cont].className="show";
        }
    }

    //escuta se o botao foi clicado
    button.addEventListener('click',()=>{
        const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
        let data = {id:"",name:"",email:"",address:"",age:"",height:"",vote:""};
        let dataToSend;



        http.open("POST",link,true); //abre uma comunicação com o servidor através de uma requisição POST

        http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados


        //preenche um objeto com o indice da linha da tabela e os valores dos campos input do tipo text
        data.id = index;
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        data.height = inputs[4].value;
        data.vote = inputs[5].value;

        dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON

        http.send(dataToSend);//envia dados para o servidor na forma de JSON

        /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */

        http.onload = ()=>{                
            for(let cont=0;cont<spans.length;cont++){
                if(spans[cont].className=="hidden"){
                    spans[cont].innerHTML = inputs[cont].value;
                    spans[cont].className="show";
                } else{
                    spans[cont].className="hidden";
                }
            }

            //esconde os campos de preenchimento para o cadastro
            for(let cont=0;cont<inputs.length;cont++){
                if(inputs[cont].className=="show"){
                    inputs[cont].className="hidden";
                }
            }

            linkUpdate.className='show';
            linkRemove.className='show';
            tds[lenTds-2].className='hidden';
        }

    http.onreadystatechange = (e)=>{
        if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
            console.log(http.responseText);
        }
    }
    });  

} 

function remove(index,link){
    button.addEventListener('click', () => {
        const http = new XMLHttpRequest();
        let data = {id: ""}
        let dataToSend;

        http.open("POST",link,true);

        http.setRequestHeader('Content-Type','application/json');

        data.id = index;

        dataToSend = JSON.stringify(data);

        http.send(dataToSend);

        window.location.reload();
    }) 
}

