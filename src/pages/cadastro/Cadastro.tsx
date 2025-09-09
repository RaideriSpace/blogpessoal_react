import { useNavigate } from "react-router-dom";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro() {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [confirmarSenha, setConfirmarSenha] = useState<string>("");

	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: "",
		usuario: "",
		senha: "",
		foto: "",
	});

	useEffect(() => {
		if (usuario.id !== 0) {
			retornar();
		}
	}, [usuario]);

	function retornar() {
		navigate("/");
	}

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	}

	function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
		setConfirmarSenha(e.target.value);
	}

	async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
			setIsLoading(true);

			try {
				await cadastrarUsuario(`/usuarios/cadastro`, usuario, setUsuario);
				ToastAlerta("Usuário cadastrado com sucesso!", "success");
			} catch (error) {
				ToastAlerta("Erro ao cadastrar usuário!", "erro");
			}
		} else {
			ToastAlerta("Dados do usuário inconsistentes! Verifique as informações do cadastro.", "erro");
			setUsuario({ ...usuario, senha: "" });
			setConfirmarSenha("");
		}

		setIsLoading(false);
	}

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
				<div className="bg-[url(../assets/bg.png)] bg-cover lg:block w-[100%] h-[100%]"></div>
				<form className="flex justify-center items-center flex-col w-2/3 gap-3" onSubmit={cadastrarNovoUsuario}>
					<h2 className="text-white text-5xl">Cadastrar</h2>
					<div className="flex flex-col w-full text-white">
						<label htmlFor="nome">Nome</label>
						<input
							type="text"
							id="nome"
							name="nome"
							placeholder="Nome"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={usuario.nome}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full text-white">
						<label htmlFor="usuario">Usuario</label>
						<input
							type="email"
							id="usuario"
							name="usuario"
							placeholder="Usuario"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={usuario.usuario}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full  text-white">
						<label htmlFor="foto">Foto</label>
						<input
							type="text"
							id="foto"
							name="foto"
							placeholder="Foto"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={usuario.foto}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full  text-white">
						<label htmlFor="senha">Senha</label>
						<input
							type="password"
							id="senha"
							name="senha"
							placeholder="Senha"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={usuario.senha}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full  text-white">
						<label htmlFor="confirmarSenha">Confirmar Senha</label>
						<input
							type="password"
							id="confirmarSenha"
							name="confirmarSenha"
							placeholder="Confirmar Senha"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={confirmarSenha}
							onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
						/>
					</div>
					<div className="flex justify-around w-full gap-8 mt-4">
						<button
							type="reset"
							className="rounded-xl text-white bg-(--secondary) hover:bg-(--secondary-dark) w-1/2 py-2 transition-all ease-in box-"
							onClick={retornar}>
							Cancelar
						</button>
						<button
							type="submit"
							className="rounded-xl text-white bg-(--tertiary) hover:bg-(--tertiary-dark) hover: w-1/2 py-2 flex justify-center transition-all ease-in">
							{isLoading ? (
								<img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={35}></img>
							) : (
								<span> Cadastrar </span>
							)}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default Cadastro;
