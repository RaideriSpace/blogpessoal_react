import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";

function Home() {
    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
  
    useEffect(() => {
      if (token === "") {
        alert("Você precisa estar logado!");
        navigate("/");
      }
    }, [token]);

	return (
		<>
			<div className="bg-indigo-900 flex justify-center">
				<div className="container grid grid-cols-2 text-white">
					<div className="flex flex-col gap-4 items-center justify-center py-4">
						<h2 className="text-5xl font-bold">Seja Bem Vinde!</h2>
						<p className="text-xl">Expresse aqui seus pensamentos e opniões</p>

						<div className="flex justify-around gap-4">
							<ModalPostagem />
						</div>
					</div>

					<div className="flex justify-center ">
						<img src="https://i.imgur.com/fyfri1v.png" alt="Imagem Página Home" className="w-2/3" />
					</div>
				</div>
			</div>

			<ListaPostagens />
		</>
	);
}

export default Home;
