import Styles from '../../public/css/CadastroEmpresas.module.css';
import { useState, useEffect } from 'react';
import servicoCadastro from '../service/serviçoCadastro';

const CadastroEmpresas = () => {
  const [error, setError] = useState<string>("");
  const [sucess,setSucess] = useState<string>("");
  const [email, serEmail] = useState<string>("");
  const [empresa,setEmpresa]= useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [acesso, setAcesso] = useState<string>("");

  const clearFields = () =>{
    setEmpresa("")
    serEmail("")
    setPassword("")
    setAcesso("")
  }

  const handlerCadastro = async (e: React.FormEvent) =>{
    e.preventDefault()
    
    await servicoCadastro(empresa, email, password, acesso, error, setError,setSucess, clearFields)
  }

  return (
    <main className={Styles.container_cadastroEmpresas}>
      <article>
        <h1>Cadastro de Empresas</h1>
      </article>
      <form onSubmit={handlerCadastro}>
        <div>
          <label htmlFor="empresa">Empresa:</label>
          <input type="text" id="empresa" value={empresa} onChange={(event)=> setEmpresa(event.target.value) }/>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={(event) => serEmail(event.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(event)=> setPassword(event.target.value)}/>
        </div>
        <select name="acesso" id="acesso" value={acesso} onChange={(event) => setAcesso(event.target.value)}>
          <option value="" disabled>Escolha o tipo do acesso</option>
          <option value="administrador">Administrador</option>
          <option value="cliente">Cliente</option>
        </select>
        <button type="submit">Cadastrar</button>
        {error && <span className={Styles.error}>{error}</span>}
        {sucess && <span className={Styles.sucess}>{sucess}</span>}
      </form>
    </main>
  );
}

export default CadastroEmpresas;
