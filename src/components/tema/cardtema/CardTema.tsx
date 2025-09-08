import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

interface CardTemaProps {
	tema: Tema;
}

function CardTema({ tema } : CardTemaProps) {
	return (
		<div className="border-none flex flex-col rounded-2xl overflow-hidden justify-between hover:shadow-2xl">
			<header className="py-2 px-6 bg-(--tertiary) font-bold text-2xl"> Tema </header>
			<p className="p-8 text-3xl bg-(--auxiliary2-ex-light) h-full"> {tema.descricao} </p>

			<div className="flex">
				<Link
					to={`/editartema/${tema.id}`}
					className="w-full text-white bg-(--tertiary) font-bold hover:bg-(--tertiary-dark) flex items-center justify-center py-2 transition-all ease-in">
					<button> Editar </button>
				</Link>

				<Link
					to={`/deletarTema/${tema.id}`}
					className="text-white bg-(--secondary) font-bold hover:bg-(--secondary-dark) w-full flex items-center justify-center transition-all ease-in">
					<button> Deletar </button>
				</Link>
			</div>
		</div>
	);
}

export default CardTema;
