import {Montserrat} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {wrapper, item} from '../../../styles/gallery.module.css'
import GalleryItem from "@/components/galleryItem/galleryItem";
import Image from "next/image";

const monserrat = Montserrat({subsets: ['latin']})

export default function Gallery() {
	return (
		<>
			<main className={`${styles.main} ${monserrat.className}`}>
				<div className={`${wrapper}`}>
					<GalleryItem className={item} />
				</div>
			</main>
		</>
	)
}

