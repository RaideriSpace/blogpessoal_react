import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ListaPostagens from "../../components/postagem/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Home() {
	const navigate = useNavigate();

	const { usuario } = useContext(AuthContext);
	const token = usuario.token;

	useEffect(() => {
		if (token === "") {
			ToastAlerta("Você precisa estar logado!", "erro");
			navigate("/");
		}
	}, [token]);

	return (
		<>
			<div className="bg-[url(../assets/bg.png)] bg-cover flex justify-center h-[70vh]">
				<div className="flex flex-col gap-4 items-center justify-center py-4 text-white text-shadow-[0_0_15px_rgb(132_231_245_/_0.9)]">
					<h2 className="text-5xl font-bold">Seja Bem Vinde!</h2>
					<p className="text-xl">Expresse aqui seus pensamentos e opniões</p>

					<div className="flex justify-around gap-4">
						<ModalPostagem />
					</div>
				</div>
			</div>
			<ListaPostagens />
		</>
	);
}

export default Home;
