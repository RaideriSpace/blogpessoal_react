import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarTema() {
	const navigate = useNavigate();

	const [tema, setTema] = useState<Tema>({} as Tema);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	const { id } = useParams<{ id: string }>();

	async function buscarPorId(id: string) {
		try {
			await buscar(`/temas/${id}`, setTema, { headers: { " Authorization": token } });
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

	async function deletarTema() {
		setIsLoading(true);

		try {
			await deletar(`/temas/${id}`, {
				headers: {
					Authorization: token,
				},
			});
			ToastAlerta("Tema apagado com sucesso.", "success");
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			} else {
				ToastAlerta("Erro ao deletar o tema.", "erro");
			}
		}

		setIsLoading(false);
		retornar();
	}

	function retornar() {
		navigate("/temas");
	}

	return (
		<div className="container w-1/3 mx-auto">
			<h1 className="text-4xl text-center my-4"> Deletar tema </h1>
			<p className="text-center font-semibold mb-4"> Você tem certeza de que deseja apagar o tema a seguir? </p>
			<div className="border-none flex flex-col rounded-2xl overflow-hidden justify-between">
				<header className="py-2 px-6 bg-(--tertiary) font-bold text-2xl"> Tema </header>
				<p className="p-8 text-3xl bg-(--auxiliary2-ex-light) h-full"> {tema.descricao} </p>
				<div className="flex">
					<button
						className="text-white bg-(--secondary) font-bold hover:bg-(--secondary-dark) w-full flex items-center justify-center transition-all ease-in"
						onClick={retornar}>
						Não
					</button>
					<button
						className="w-full text-white bg-(--tertiary) font-bold hover:bg-(--tertiary-dark) flex items-center justify-center py-2 transition-all ease-in"
						onClick={deletarTema}>
						{isLoading ? <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={35}></img> : <span> Sim </span>}{" "}
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeletarTema;
