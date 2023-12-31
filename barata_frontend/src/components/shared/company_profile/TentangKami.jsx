import { features } from "/src/constants/index"; 
import styles, {layout} from '/src/style.js';
import Button from './Button'
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, content, index }) => (
  // <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
  <div className={`flex flex-row p-6`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter}`}>
      <img src={icon} alt="star" className="w-[80%] h-[80%] object-contain" />
    </div>
    <div className="flex-1 flex flex-col ml-3 mt-2">
      <h4 className="font-poppins font-semibold text-black text-[20px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

export default function TentangKami({targetUrl}) {
  return (
    <section id  = "keunggulan" className = {layout.section}>
      <div className = {layout.sectionInfo}>
        <h2 className = {styles.heading2_blue}>
          Tentang Kami
        </h2>
        <p className = {`${styles.paragraph} max-w-[470px] mt-5`}>
        BANGGA EVCS (Barata-Airlangga Electric Vehicle Charging Station) merupakan produk hasil pengembangan dari kerjasama antara Fakultas Teknologi Maju dan Multidisiplin (FTMM) Universitas Airlangga dengan PT. Barata Indonesia (Persero) melalui skema Matching Fund 2023.
        </p>
        <Link to={targetUrl}>
          <Button styles="mt-10" /> 
        </Link>
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>


    </section>
  )
}

