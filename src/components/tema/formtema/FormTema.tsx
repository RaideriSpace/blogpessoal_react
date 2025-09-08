import { useNavigate, useParams } from "react-router-dom";
import type Tema from "../../../models/Tema";
import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTema() {
	const navigate = useNavigate();

	const [tema, setTema] = useState<Tema>({} as Tema);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	const { id } = useParams<{ id: string }>();

	async function buscarPorId(id: string) {
		try {
			await buscar(`/temas/${id}`, setTema, {
				headers: { Authorization: token },
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

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setTema({
			...tema,
			[e.target.name]: e.target.value,
		});
	}

	function retornar() {
		navigate("/temas");
	}

	async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);

		if (id !== undefined) {
			try {
				await atualizar(`/temas`, tema, setTema, { headers: { Authorization: token } });
				ToastAlerta("O tema foi atualizado com sucesso!", "success");
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					ToastAlerta("Erro ao atualizar o tema.", "erro");
				}
			}
		} else {
			try {
				await cadastrar(`/temas`, tema, setTema, { headers: { Authorization: token } });
				ToastAlerta("O tema foi cadastrado com sucesso!", "success");
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					ToastAlerta("Erro ao cadastrar o tema.", "erro");
				}
			}
		}

		setIsLoading(false);
		retornar();
	}

	return (
		<div className="container flex flex-col items-center justify-center mx-auto">
			<h1 className="text-white font-bold text-4xl text-center my-8">{id === undefined ? "Cadastrar Tema" : "Editar Tema"}</h1>

			<form className="text-white w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
				<div className="flex flex-col gap-2">
					<label htmlFor="descricao"> Descrição do Tema </label>
					<input
						type="text"
						placeholder="Descreva aqui seu tema"
						name="descricao"
						className="border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
						value={tema.descricao}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>
				<button
					className="rounded-xl text-white bg-(--tertiary) hover:bg-(--tertiary-dark) hover: w-1/2 py-2 flex justify-center transition-all ease-in font-bold mx-auto"
					type="submit">
					{isLoading ? (
						<img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={35}></img>
					) : (
						<span> {id === undefined ? "Cadastrar" : "Atualizar"} </span>
					)}
				</button>
			</form>
		</div>
	);
}

export default FormTema;
