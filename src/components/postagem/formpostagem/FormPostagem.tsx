import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [temas, setTemas] = useState<Tema[]>([]);

	const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });

	const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

	const { usuario, handleLogout } = useContext(AuthContext);
	const token = usuario.token;

	const { id } = useParams<{ id: string }>();

	async function buscarPostagemPorId(id: string) {
		try {
			await buscar(`/postagens/${id}`, setPostagem, {
				headers: { Authorization: token },
			});
		} catch (error: any) {
			if (error.toString().includes("401")) {
				handleLogout();
			}
		}
	}

	async function buscarTemaPorId(id: string) {
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

	async function buscarTemas() {
		try {
			await buscar("/temas", setTemas, {
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
		buscarTemas();

		if (id !== undefined) {
			buscarPostagemPorId(id);
		}
	}, [id]);

	useEffect(() => {
		setPostagem({
			...postagem,
			tema: tema,
		});
	}, [tema]);

	function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setPostagem({
			...postagem,
			[e.target.name]: e.target.value,
			tema: tema,
			usuario: usuario,
		});
	}

	function retornar() {
		navigate("/postagens");
	}

	async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoading(true);

		if (id !== undefined) {
			try {
				await atualizar(`/postagens`, postagem, setPostagem, {
					headers: {
						Authorization: token,
					},
				});

				ToastAlerta("Postagem atualizada com sucesso", "success");
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					ToastAlerta("Erro ao atualizar a Postagem.", "erro");
				}
			}
		} else {
			try {
				await cadastrar(`/postagens`, postagem, setPostagem, {
					headers: {
						Authorization: token,
					},
				});

				ToastAlerta("Postagem cadastrada com sucesso", "success");
			} catch (error: any) {
				if (error.toString().includes("401")) {
					handleLogout();
				} else {
					ToastAlerta("Erro ao cadastrar a Postagem.", "erro");
				}
			}
		}

		setIsLoading(false);
		retornar();
	}

	const carregandoTema = tema.descricao === "";

	return (
		<div className="container flex flex-col items-center bg-(--primary-dark)">
			<h1 className="text-4xl text-center my-8 text-white font-bold">{id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}</h1>

			<form className="flex flex-col w-4/5 gap-4" onSubmit={gerarNovaPostagem}>
				<div className="flex flex-col gap-1 text-white font-bold">
					<label htmlFor="titulo">Título da Postagem</label>
					<input
						type="text"
						placeholder="Titulo"
						name="titulo"
						required
						className="border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
						value={postagem.titulo}
						onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
					/>
				</div>
				<div className="flex flex-col gap-1 text-white font-bold">
					<label htmlFor="texto">Texto da Postagem</label>
					<textarea
						placeholder="Texto da postagem"
						name="texto"
						required
						className="border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
						value={postagem.texto}
						onChange={(e: ChangeEvent<HTMLTextAreaElement>) => atualizarEstado(e)}
					/>
				</div>
				<div className="flex flex-col gap-1 text-white font-bold">
					<p>Tema da Postagem</p>
					<select
						name="tema"
						id="tema"
						className="border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in bg-(--primary-dark)"
						onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>
						<option value="" selected disabled>
							Selecione um Tema
						</option>

						{temas.map((tema) => (
							<>
								<option value={tema.id}>{tema.descricao}</option>
							</>
						))}
					</select>
				</div>
				<button
					type="submit"
					className="rounded-xl text-white bg-(--tertiary) hover:bg-(--tertiary-dark) hover: w-1/2 py-2 flex justify-center transition-all ease-in font-bold mx-auto disabled:bg-(--auxiliary2-ex-dark) disabled:text-(--auxiliary2)"
					disabled={carregandoTema}>
					{isLoading ? (
						<img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={35}></img>
					) : (
						<span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
					)}
				</button>
			</form>
		</div>
	);
}

export default FormPostagem;
