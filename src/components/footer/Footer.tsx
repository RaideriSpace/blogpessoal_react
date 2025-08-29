import { GithubLogoIcon, LinkedinLogoIcon, WhatsappLogoIcon } from '@phosphor-icons/react'

function Footer() {

    let data = new Date().getFullYear()

    return (
			<>
				<div className="flex justify-center bg-indigo-900 text-white">
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
			</>
		);
}

export default Footer