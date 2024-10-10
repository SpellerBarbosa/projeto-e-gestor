

const servicoCadastro = async (
    empresa:string,
    email:string,
    password:string,
    acesso:string,
    error:string,
    setError:React.Dispatch<React.SetStateAction<any>>,
    setSucess:React.Dispatch<React.SetStateAction<any>>,
    clearFields: () => void,
) =>{
    if(!empresa || !email || !password || !acesso){
        setError("Todos os campos devem ser preenchidos");
        return
    }

    try {
    
        const response = await fetch("https://gestor-api-alpha.vercel.app/cadastrar-empresas",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                empresa:empresa.toLowerCase().trim(),
                email: email.toLowerCase().trim(),
                password: password.toLowerCase().trim(),
                acesso: acesso.toLowerCase().trim()
            })
        });
    
        const data = await response.json();
        
        if(response.ok){
            setSucess(data.mensagem)
            setTimeout(() => {
                setSucess("");
                setError("");
            }, 2500);
        }else{
            setError(data.mensagem)
        }
    
    } catch (error) {
        console.error("Erro ao se conectar ao servidor", error);
        setError("Não foi possivel acessar o servidor.")
    }
}

export default servicoCadastro;