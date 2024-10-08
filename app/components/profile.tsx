import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Style from "/public/css/Profile.module.css";

const Profile = () => {
  const [acesso, setAcesso] = useState<string>("");
  const [usuario, setUsuario] = useState<string>("");
  const [ativar, setAtivar] = useState<boolean | null>(false);
  const [btnSolicitacoes, setBtnSolicitacoes] = useState<boolean | null>();
  const [btnCadastro, setBtnCadastro] = useState<boolean|null>();

  const toogleAtivar = () => {
    setAtivar((prevAtivar) => !prevAtivar);
  };

  const menuSolicitacoes = () =>{
    setBtnSolicitacoes((prevSolicitacoes) => !prevSolicitacoes);
  };

  const menuCadastro = () =>{
    setBtnCadastro((prevCadastro) => !prevCadastro)
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = Cookies.get("token");

    const response = await fetch("https://api-e-gestor.vercel.app/api/rota-protegida", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      setUsuario(data.user.empresa);
      setAcesso(data.user.acesso);
    }
  };

  return (
    <>
      <button className={Style.button} onClick={toogleAtivar}>
        <span className={`${Style.linha} ${!ativar ? Style.ativa : ""}`}></span>
        <span className={`${Style.linha} ${!ativar ? Style.ativa : ""}`}></span>
        <span className={`${Style.linha} ${!ativar ? Style.ativa : ""}`}></span>
      </button>
      <section
        className={`${Style.profile_container} ${ativar ? Style.ativa : ""}`}
      >
        <article>
          <figure>
            <img src="/img/icon-img.png" alt="icon" />
            <figcaption>{acesso}</figcaption>
          </figure>
          <div>
            <h1>
              Bem vindo,
            </h1>
            <h2>{usuario}</h2>
          </div>
        </article>
        <nav className={Style.menu}>
          <button className={`${Style.btn_solicitacoes}`} onClick={menuSolicitacoes}>Solicitações</button>
          <ul className={`${Style.lista_solicitacoes} ${btnSolicitacoes ? Style.abrir: ""}`}>
            <li>Admissões</li>
            <li>Demissões</li>
          </ul>
          <button className={Style.btn_cadastro} onClick={menuCadastro}>Cadastros</button>
          <ul className={`${Style.lista_cadastro} ${btnCadastro ? Style.abrir: ""}`}>
            <li>Empresas</li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default Profile;
