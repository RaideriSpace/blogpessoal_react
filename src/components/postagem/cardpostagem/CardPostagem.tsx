import { Link } from "react-router-dom";
import type Postagem from "../../../models/Postagem";

interface CardPostagensProps {
	postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagensProps) {
	return (
		<div className="border-none flex flex-col rounded-xl overflow-hidden justify-between bg-(--auxiliary2-ex-light)">
			<div>
				<div className="flex w-full bg-(--tertiary-light) py-2 px-4 items-center gap-4">
					<img src={postagem.usuario?.foto} className="h-12 rounded-full" alt={postagem.usuario?.nome} />
					<h3 className="text-lg font-bold text-center uppercase">{postagem.usuario?.nome}</h3>
				</div>
				<div className="p-4">
					<h4 className="text-lg font-semibold uppercase">{postagem.titulo}</h4>
					<p>{postagem.texto}</p>
					<p>Tema: {postagem.tema?.descricao}</p>
					<p>
						Data:{" "}
						{new Intl.DateTimeFormat("pt-BR", {
							dateStyle: "full",
							timeStyle: "medium",
						}).format(new Date(postagem.data))}
					</p>
				</div>
			</div>
			<div className="flex">
				<Link
					to={`/editarpostagem/${postagem.id}`}
					className="w-full text-white bg-(--tertiary) font-bold hover:bg-(--tertiary-dark) flex items-center justify-center py-2 transition-all ease-in">
					<button>Editar</button>
				</Link>
				<Link
					to={`/deletarpostagem/${postagem.id}`}
					className="text-white bg-(--secondary) font-bold hover:bg-(--secondary-dark) w-full flex items-center justify-center transition-all ease-in">
					<button>Deletar</button>
				</Link>
			</div>
		</div>
	);
}

export default CardPostagem;
