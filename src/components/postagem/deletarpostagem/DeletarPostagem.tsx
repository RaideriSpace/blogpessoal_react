import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarPostagem() {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

	const { id } = useParams<{ id: string }>();

	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	async function buscarPorId(id: string) {
		try {
			await buscar(`/postagens/${id}`, setPostagem, {
				headers: {
					Authorization: token,
				},
			});
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			}
		}
	}

	useEffect(() => {
		if (token === "") {
			ToastAlerta("Você precisa estar logado!", "erro");
			navigate("/");
		}
	}, [token]);

	useEffect(() => {
		if (id !== undefined) {
			buscarPorId(id);
		}
	}, [id]);

	async function deletarPostagem() {
		setIsLoading(true);

		try {
			await deletar(`/postagens/${id}`, {
				headers: {
					Authorization: token,
				},
			});

			ToastAlerta("Postagem apagada com sucesso", "success");
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			} else {
				ToastAlerta("Erro ao deletar a postagem.", "erro");
			}
		}

		setIsLoading(false);
		retornar();
	}

	function retornar() {
		navigate("/postagens");
	}

	return (
		<div className="container w-1/3 mx-auto">
			<h1 className="text-white text-4xl text-center my-4 font-bold">Deletar Postagem</h1>

			<p className="text-white text-center font-semibold mb-4">Você tem certeza de que deseja apagar a postagem a seguir?</p>

			<div className="border-none flex flex-col rounded-xl overflow-hidden justify-between bg-(--auxiliary2-ex-light)">
				<header className="py-2 px-6 bg-(--tertiary-light) font-bold text-2xl">Postagem</header>
				<div className="p-4">
					<p className="text-xl h-full">{postagem.titulo}</p>
					<p>{postagem.texto}</p>
				</div>
				<div className="flex">
					<button
						className="w-full text-white bg-(--tertiary) font-bold hover:bg-(--tertiary-dark) flex items-center justify-center py-2 transition-all ease-in"
						onClick={retornar}>
						Não
					</button>
					<button
						className="text-white bg-(--secondary) font-bold hover:bg-(--secondary-dark) w-full flex items-center justify-center transition-all ease-in"
						onClick={deletarPostagem}>
						{isLoading ? <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={35}></img> : <span>Sim</span>}
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeletarPostagem;
