"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Style from '/public/css/Login.module.css';
import { Poppins } from "next/font/google";
import { DM_Sans } from "next/font/google";

const poppins = Poppins({
  weight:'500',
  subsets:['latin']
});

const ds_sans = DM_Sans({
  weight:'500',
  subsets:['latin']
});

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [erro, setErro] = useState<string>("");
  const [sucess, setSucess] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api-e-gestor.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set("token", data.token);
        setSucess(data.mensagem);
        
        setTimeout(async () => {
          const token = Cookies.get('token');

        const verifyResponse = await fetch("https://api-e-gestor.vercel.app/api/rota-protegida",{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });

        const verifyData = await verifyResponse.json();
        console.log(verifyData)
        if(verifyResponse.ok){
          if(verifyData.user.acesso === "administrador"){
            router.push("/painel-adm");
          }else if(verifyData.user.acesso === "cliente"){
            router.push("/painel-cliente");
          }else{
            setErro("Acesso nao permitido.");
            setTimeout(() => {
              setErro("");
            }, 2500);
          }
        }
        }, 2500);
       
      } else {
        setErro(data.mensagem);
        setTimeout(() => {
          setErro("");
        }, 2500);
      }
    } catch (error) {}
  };

  return (
    <>
      <main className={Style.login_container}>
        <figure>
          <img src="/img/e-Gestor.png" alt="Logo" />
        </figure>
        <section>
          <article>
            <h1 className={poppins.className}>Bem vindo ao  e-Gestor</h1>
            <p className={poppins.className}>Faça login para continuar.</p>
          </article>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className={ds_sans.className}>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className={ds_sans.className}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className={ds_sans.className}>Login</button>
            <article>
            {erro && <span className={`${Style.erro} ${poppins.className}`}>{erro}</span>}
            {sucess && <span className={`${Style.sucess} ${poppins.className}`}>{sucess}</span>}
            </article>
          </form>
        </section>
      </main>
    </>
  );
}
