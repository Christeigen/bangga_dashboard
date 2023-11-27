import styles, { layout } from '/src/style.js';
import Button from './Button';
import ScrollAnimatedImage from './ScrollAnimatedImage';

export default function Step({ title, paragraph, imgSrc, imgAlt, isSquare }) {
    return (
        <div className='flex flex-col gap-y-4 max-w-[240px]'>
            <div className='w-48 h-48 flex place-self-center'>
                <ScrollAnimatedImage src={imgSrc} alt={imgAlt} />
            </div>
            <h1 className='text-xl text-sky-900 font-bold text-center'>{title}</h1>
            <h1 className='text-sm text-center'>{paragraph}</h1>
        </div>
    );
}