import { useContext, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();

	const isLoginPage = useMemo(() => location.pathname == "/", [location.pathname]);
	const isCadastroPage = useMemo(() => location.pathname == "/cadastro", [location.pathname]);

	const { handleLogout } = useContext(AuthContext);

	function logout() {
		handleLogout();
		alert("O Usuário foi desconectado com sucesso!");
		navigate("/");
	}

	return (
		<>
			<div
				className="w-full flex justify-center py-4
            			   bg-indigo-900 text-white">
				<div className="container flex justify-between text-lg">
					<Link to={"/home"}>Blog Pessoal </Link>
					<div className="flex gap-4">
						{isLoginPage || isCadastroPage ? (
							<>
								{isLoginPage ? (
									<>
										<span className="font-bold"> Logar </span>
										<Link to={"/cadastro"} className="hover:underline">
											<span> Cadastrar </span>
										</Link>
									</>
								) : (
									<>
										<Link to={"/"} className="hover:underline">
											<span> Logar </span>
										</Link>
										<span className="font-bold"> Cadastrar </span>
									</>
								)}
							</>
						) : (
							<div>
								Postagens &nbsp;
								<Link to={"/temas"} className="hover:underline">
									Temas 
								</Link>
								&nbsp;
								<Link to={"/cadastrartema"} className="hover:underline">
									Cadastrar tema
								</Link>
								&nbsp; Perfil &nbsp;
								<Link to={"/"} onClick={logout} className="hover:underline">
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
