import {Montserrat} from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Test from '../../components/Animation';
import gsap from 'gsap'
import {useEffect, useRef} from "react";
import {wrapper} from "@/styles/gallery.module.css";

const monserrat = Montserrat({subsets: ['latin']})

export default function Page() {
	const animation = useRef(null);

	useEffect(() => {
		const [elements] = animation.current.children;

		const person = elements.getElementById('person');
		const table = elements.getElementById('table');
		const sponge = elements.getElementById('sponge');

		gsap.set([person, table, ...sponge.children], {autoAlpha: 0});
		gsap.set(table, {transformOrigin: '50% 50%'});

		const tl = gsap.timeline({defaults: {ease: 'power3.inOut'}});

		tl.fromTo(person, {x: '+=300'}, {duration: 3, x: '=0', autoAlpha: 1})
			.fromTo(table, {scale: 0}, {scale: 1, duration: 2, autoAlpha: 1})
			.to(sponge.children, {duration: 3, autoAlpha: 1, stagger: 0.3})
	},[]);


	return (
		<>
			<main className={`${styles.main} ${monserrat.className}`}>
				<div className={`${wrapper}`}>
					<div ref={animation}>
						<Test/>
					</div>
				</div>
			</main>
		</>
	);
}
