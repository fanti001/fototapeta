import styles from '@/styles/Home.module.css';
import {wrapper} from "@/styles/gallery.module.css";
import Image from "next/image";
import Link from "next/link";


export default function Dinosaurs() {

	return (
		<>
			<main className={`${styles.main}`}>
				<div className={`${wrapper}`}>
					<h1>Dinosaurs</h1>
					<Image
						src={'/images/dino/d1.webp'}
						alt={'d1'}
						width={250}
						height={200}
					/>
					<Image
						src={'/images/dino/d2.webp'}
						alt={'d2'}
						width={250}
						height={200}
					/>
					<Image
						src={'/images/dino/d3.webp'}
						alt={'d3'}
						width={250}
						height={200}
					/>
					<Image
						src={'/images/dino/d4.webp'}
						alt={'d4'}
						width={250}
						height={200}
					/>
				</div>
			</main>
		</>
	);
}
