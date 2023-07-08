import {Montserrat} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {wrapper, item} from '../../styles/gallery.module.css'
import Gallery from "@/components/galleryItem/gallery";
import {useSession} from "next-auth/react";

const monserrat = Montserrat({subsets: ['latin']})


export default function Page() {
const {data: session} = useSession();

if(session) {
	return (
		<>
			<main className={`${styles.main} ${monserrat.className}`}>
				<div className={`${wrapper}`}>
					<Gallery className={item}/>
				</div>
			</main>
		</>
	)
}
return (
	<>
		<main className={`${styles.main} ${monserrat.className}`}>
		<h1>jesteś nie zalogowany</h1>
		</main>
	</>
)
}

