import styles from '@/styles/Home.module.css';
import gsap from 'gsap'
import {useEffect} from "react";
import {wrapper} from "@/styles/gallery.module.css";
import Image from "next/image";
import Link from "next/link";


export default function Roarr() {

	useEffect(() => {

		const image = document.getElementById('jwBackground');
		const dino = document.getElementById('trex');
		const title = document.getElementById('title');
		const action = document.getElementById('action');

		gsap.set(image, {autoAlpha: 0});
		gsap.set(dino, {autoAlpha: 0});
		gsap.set(title, {autoAlpha: 0});
		gsap.set(action, {autoAlpha: 0});

		// gsap.set(image, {transformOrigin: '50% 50%'});

		const tl = gsap.timeline({defaults: {ease: 'power3.inOut'}});

		tl.fromTo(dino, {x: '+=300', scale: 0}, {duration: 3, scale: 1, rotate: 5, x: '=0', autoAlpha: 1})
			.fromTo(title, {}, {duration: 3, autoAlpha: 1})
			.fromTo(action, {}, {duration: 2, autoAlpha: 1})
			.fromTo(image, {autoAlpha: 1}, {duration: 3, autoAlpha: 0})
	}, []);

	return (
		<>
			<main className={`${styles.main}`}>
				<div className={`${wrapper}`}>
					<Image className={`${styles.jwBackground}`}
						   src={'/images/dino/jw_1800x900-vulcan.webp'}
						   alt="jw-vulcan"
						   id="jw-vulkan"
						   width={1800}
						   height={900}
					/>
					<Image className={`${styles.jwBackground}`}
						   src={'/images/dino/jw_1800x900-back1.webp'}
						   alt="jw-background"
						   id="jwBackground"
						   width={1800}
						   height={900}
					/>
					<Image className={`${styles.dino}`}
						   src={'/images/dino/jw_1800x900-Trex.webp'}
						   id="trex"
						   alt="d1"
						   width={840}
						   height={783}
					/>
					<Image className={`${styles.jwFaunFront}`}
						   src={'/images/dino/jw_1800x900-faunFront.webp'}
						   alt="jw-background2"
						   id="jwBackground2"
						   width={1800}
						   height={900}
					/>
					<Image className={`${styles.jwPterozaur}`}
						   src={'/images/dino/jw_1800x900-pterozaur.webp'}
						   alt="jw-pterozaur"
						   id="jwPterozaur"
						   width={500}
						   height={248}
					/>
					<Image className={`${styles.jwAnimalsFront}`}
						   src={'/images/dino/jw_1800x900-animalsFront.webp'}
						   alt="jw-animalsFront"
						   id="jwanimalsFront"
						   width={1440}
						   height={433}
					/>

					<h1 className={`${styles.dinoTitle}`} id="title">
						Fototapety z Dinozaurami
					</h1>
					<Link href="/roarr/dinosaurs">
						<button className={`${styles.dinoCallToAction}`}
								id="action"
						>Zobacz
						</button>
					</Link>
				</div>
			</main>
		</>
	);
}
