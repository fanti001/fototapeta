import {Montserrat} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {wrapper, item} from '../../../styles/gallery.module.css'
import Gallery from "@/components/galleryItem/gallery";

const monserrat = Montserrat({subsets: ['latin']})


export default function Page() {
	return (
		<>
			<main className={`${styles.main} ${monserrat.className}`}>
				<div className={`${wrapper}`}>
					<Gallery className={item} />
				</div>
			</main>
		</>
	)
}

