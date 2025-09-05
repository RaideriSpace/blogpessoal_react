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
			<div
				className="w-full flex justify-center py-4
            			   bg-indigo-900 text-white">
				<div className="container flex justify-between text-lg mx-8">
					<Link to={"/home"} className="text-2xl font-bold">
						Blog Pessoal{" "}
					</Link>

					<div>
						{isLoginPage || isCadastroPage ? (
							<div className="flex gap-3">
								{isLoginPage ? (
									<>
										<span className="font-bold"> Logar </span>
										<Link to={"/cadastro"} className="hover:font-medium">
											<span> Cadastrar </span>
										</Link>
									</>
								) : (
									<>
										<Link to={"/"} className="hover:font-medium">
											<span> Logar </span>
										</Link>
										<span className="font-bold"> Cadastrar </span>
									</>
								)}
							</div>
						) : (
							<div className="flex gap-3">
								<Link to="/postagens" className="hover:font-medium">
									Postagens
								</Link>
								&nbsp;
								<Link to={"/temas"} className="hover:font-medium">
									Temas
								</Link>
								&nbsp;
								<Link to={"/cadastrartema"} className="hover:font-medium">
									Cadastrar tema
								</Link>
								&nbsp;
								<Link to="/perfil" className="hover:font-medium">
									Perfil
								</Link>
								&nbsp;
								<Link to={"/"} onClick={logout} className="hover:font-medium">
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
