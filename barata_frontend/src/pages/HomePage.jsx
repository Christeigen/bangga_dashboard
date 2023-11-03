import styles from '/src/style.js';
import {Navbar, Footer, TentangKami, ImgText, TextImg} from '/src/components/shared/company_profile/index.js';
import app from '/src/assets/app.png';
import cs from '/src/assets/cs.png';

export default function HomePage() {
  return (
    
    <div className = "bg-black w-full overflow-hidden">
        <div className = {`bg-cover bg-center h-screen ${styles.paddingX}`}
             style={{ backgroundImage: `url('./src/assets/jumbotron.png')` }}>
            <Navbar color= "white"/>
            <h1 className = "font-poppins text-white text-8xl py-6 text-right font-bold">
                Isi Daya <br/>Ingat Bangga
            </h1>
            <h1 className = "font-poppins text-white text-md py-6 pt-36 tracking-wider text-right">
                Bergabunglah bersama kami dalam mengurangi <br/>jejak karbon Anda, satu pengisian sekaligus
            </h1>
            <a href = '' className = "text-l text-right text-semibold">
                Lihat lebih detail
            </a>

        </div>

        <div className = {`bg-white ${styles.paddingX} ${styles.flexStart}`}>
            <div className = {`${styles.boxWidth}`}>
                <TentangKami /> 
                <ImgText 
                    title="Charging Station"
                    paragraph="Stasiun Pengisian Kendaraan Listrik (EVCS) adalah kunci untuk masa depan yang lebih berkelanjutan. Temukan mengapa EVCS adalah solusi penting dalam mengurangi emisi karbon, menghemat biaya, dan memajukan transportasi berkelanjutan."
                    imgSrc={cs}
                    imgAlt="charging station"
                    showButton={true}
                    isSquare = {true}
                />
                <TextImg 
                    title="Aplikasi"
                    paragraph="Stasiun Pengisian Kendaraan Listrik (EVCS) adalah kunci untuk masa depan yang lebih berkelanjutan. Temukan mengapa EVCS adalah solusi penting dalam mengurangi emisi karbon, menghemat biaya, dan memajukan transportasi berkelanjutan."
                    imgSrc={app}
                    imgAlt="aplikasi"
                    showButton={true}
                    isSquare = {true}
                />
            </div>
        </div>

        <Footer />
    </div>
  );
}
