import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";

function Login() {
	const navigate = useNavigate();

	const { usuario, handleLogin, isLoading } = useContext(AuthContext);

	const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

	useEffect(() => {
		if (usuario.token !== "") {
			navigate("/home");
		}
	}, [usuario]);

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuarioLogin({
			...usuarioLogin,
			[e.target.name]: e.target.value,
		});
	}

	function login(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		handleLogin(usuarioLogin);
	}

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
				<form className="flex justify-center items-center flex-col w-1/2 gap-4" onSubmit={login}>
					<h2 className="text-white text-5xl ">Entrar</h2>
					<div className="flex flex-col w-full text-white">
						<label htmlFor="usuario">Usuário</label>
						<input
							type="text"
							id="usuario"
							name="usuario"
							placeholder="Usuario"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={usuarioLogin.usuario}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<div className="flex flex-col w-full text-white">
						<label htmlFor="senha">Senha</label>
						<input
							type="password"
							id="senha"
							name="senha"
							placeholder="Senha"
							className="border-2 border-(--tertiary-dark) rounded-xl p-2 text-white invalid:border-(--secondary) invalid:text-(--secondary) focus:border-(--primary-ex-light) focus:outline focus:outline-(--primary-ex-light) transition-all ease-in"
							value={usuarioLogin.senha}
							onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
						/>
					</div>
					<button
						type="submit"
						className="rounded bg-(--primary-light) flex justify-center hover:bg-(--primary) transition-all ease-in text-white w-1/2 py-2">
						{isLoading ? <img src="https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif" width={35}></img> : <span>Entrar</span>}
					</button>

					<hr className="border-slate-800 w-full" />

					<p className="text-white">
						Ainda não tem uma conta?{" "}
						<Link to="/cadastro" className="text-(--secondary) hover:text-(--secondary-ex-light) transition-all ease-in">
							Cadastre-se
						</Link>
					</p>
				</form>
				<div className="bg-[url(../src/assets/card.png)] bg-cover lg:block w-[100%] h-[100%]"></div>
			</div>
		</>
	);
}

export default Login;
