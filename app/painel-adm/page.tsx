"use client"
import Profile from "../components/profile";
import Admissoes from "../components/admissoes";
import Demissoes from "../components/demissoes";
import CadastroEmpresas from "../components/cadastroEmpresas";
import Style from '../../public/css/PainelAdm.module.css'
import { useSelector } from "react-redux";

export default function  Painel_adm (){

    const componenteAtivo = useSelector((state: any) => state.menu.componenteAtivo);

    return(
        <main className={Style.main_container}>
            <Profile />
            <section>
                {componenteAtivo === 'admissoes' && <Admissoes />}
                {componenteAtivo === 'demissoes' && <Demissoes />}
                {componenteAtivo === 'cadastroEmpresas' && <CadastroEmpresas />}
            </section>
        </main>
    );
}