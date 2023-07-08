import Image from "next/image";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from 'next/router';

export default function GalleryItem({className}) {
	const router = useRouter();

	const [images, setImages] = useState([])

	useEffect(() => {
		axios({
			method: 'get',
			baseURL: 'https://localhost:8000',
			url: '/kitchen/',
			responseType: 'json',
		})
			.then(({data}) => setImages(data))
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(function () {
				// funkcja do wykonania
			});
	}, [])

	return (
		<>
			{images.map((image, i) => (
						<Image
							index={i}
							onClick={() => router.push(`/cropper/${image}`)}
							data={"hello"}
							key={i}
							src={`http://localhost:8000/${image}`}
							alt={image}
							width={550}
							height={200}
							className={className}
						/>
				)
			)}
		</>
	)
}
