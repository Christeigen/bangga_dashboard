import styles, { layout } from '/src/style.js';
import Button from './Button';
import ScrollAnimatedImage from './ScrollAnimatedImage';

export default function ImgText({ title, paragraph, imgSrc, imgAlt, showButton, isSquare}) {
  return (
    <section id="app" className={layout.section}>
      <div className={layout.sectionInfoRight}>
        <h2 className={styles.heading2_blue}>{title}</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>{paragraph}</p>
        {showButton ? <Button styles="mt-10" /> : null}
      </div>

      <div className={`w-${isSquare ? '350' : '500'}px h-[350px] ml-[200px]`}>
        <ScrollAnimatedImage src = {imgSrc} alt = {imgAlt}/>
      </div>
    </section>
  );
}
