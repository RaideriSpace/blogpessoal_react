import { useContext, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();

	const isLoginPage = useMemo(() => location.pathname == "/", [location.pathname]);
	const isCadastroPage = useMemo(() => location.pathname == "/cadastro", [location.pathname]);

	const { handleLogout } = useContext(AuthContext);

	function logout() {
		handleLogout();
		ToastAlerta("O Usuário foi desconectado com sucesso!", "info");
		navigate("/");
	}

	return (
		<>
			<div className="w-full flex justify-center py-4 bg-(--primary-ex-dark) text-white">
				<div className="container flex justify-between text-lg mx-8">
					<Link to={"/home"} className="text-2xl font-bold">
						Blog Pessoal{" "}
					</Link>

					<div>
						{isLoginPage || isCadastroPage ? (
							<div className="flex gap-3">
								{isLoginPage ? (
									<>
										<span className="font-bold text-(--tertiary-ex-light)"> Logar </span>
										<Link to={"/cadastro"} className="hover:text-(--tertiary-light) transition-all ease-in">
											<span> Cadastrar </span>
										</Link>
									</>
								) : (
									<>
										<Link to={"/"} className="hover:text-(--tertiary-light) transition-all ease-in">
											<span> Logar </span>
										</Link>
										<span className="font-bold text-(--tertiary-ex-light)"> Cadastrar </span>
									</>
								)}
							</div>
						) : (
							<div className="flex gap-3">
								<Link to="/postagens" className="hover:text-(--tertiary-light) transition-all ease-in">
									Postagens
								</Link>
								<Link to={"/temas"} className="hover:text-(--tertiary-light) transition-all ease-in">
									Temas
								</Link>
								<Link to={"/cadastrartema"} className="hover:text-(--tertiary-light) transition-all ease-in">
									Cadastrar tema
								</Link>
								<Link to="/perfil" className="hover:text-(--tertiary-light) transition-all ease-in">
									Perfil
								</Link>
								<Link to={"/"} onClick={logout} className="hover:text-(--tertiary-light) transition-all ease-in">
									Sair
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Navbar;
