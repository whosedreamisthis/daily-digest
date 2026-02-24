import Image from 'next/image';
import CategoryBar from '@/components/CategoryBar';
const scores = new Array(100).fill(0);
export default function Home() {
	return (
		<>
			<CategoryBar />
			{scores.map((s, i) => {
				return (
					<p key={i}>sssssssssssssssssssssssssssssssssssssssssssi</p>
				);
			})}
		</>
	);
}
