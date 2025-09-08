import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Perfil() {
	const navigate = useNavigate();

	const { usuario } = useContext(AuthContext);

	useEffect(() => {
		if (usuario.token === "") {
			ToastAlerta("Você precisa estar logado!", "erro");
			navigate("/");
		}
	}, [usuario.token]);

	return (
		<div className="flex justify-center mx-4">
			<div className="container mx-auto my-4 rounded-2xl overflow-hidden">
				<img
					className="w-full h-72 object-cover border-b-8"
					src="https://starwalk.space/gallery/images/what-is-space/1920x1080.jpg"
					alt="Capa do Perfil"
				/>

				<img
					className="rounded-full w-56 mx-auto mt-[-8rem] border-8 border-(--tertiary-dark) relative z-10"
					src={usuario.foto}
					alt={`Foto de perfil de ${usuario.nome}`}
				/>

				<div
					className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-(--auxiliary1) text-white text-2xl items-center justify-center">
					<p>
						<span className="font-bold">Nome:</span> {usuario.nome}{" "}
					</p>
					<p>
						<span className="font-bold">Email:</span> {usuario.usuario}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Perfil;
