import { GithubLogoIcon, LinkedinLogoIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import { useContext, type ReactNode } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

    if (usuario.token !== "") {
      component = (
				<div className="flex justify-center bg-(--primary-ex-dark) text-white">
					<div className="container flex flex-col items-center py-4">
						<p className="text-xl font-bold">Blog Pessoal Generation | Copyright: {data}</p>
						<p className="text-lg">Acesse nossas redes sociais</p>
						<div className="flex gap-2">
							<a href="https://www.linkedin.com/in/lucasalvespinheiro" target="_blank">
								<LinkedinLogoIcon size={48} weight="duotone" />
							</a>
							<a href="https://github.com/RaideriSpace" target="_blank">
								<GithubLogoIcon size={48} weight="duotone" />
							</a>
							<a href="https://wa.me/5511989157255" target="_blank">
								<WhatsappLogoIcon size={48} weight="duotone" />
							</a>
						</div>
					</div>
				</div>
			);
    }

    return (
			<>
				{ component }
			</>
		);
}

export default Footer