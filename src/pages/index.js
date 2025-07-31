import Image from 'next/image';
import Blockbuster from '../components/blockbuster';
import Link from 'next/link';
import OptInForm from '../components/form/opt-in-form';
import { useEffect, useState } from 'react';
import scrollDepth from '../utils/scrollDepth';
import portrait from '../../public/survey/portrait.png';
import i00 from '../../public/survey/00.png';
import i01 from '../../public/landing/01.png';
import i02 from '../../public/landing/02.png';
import i03 from '../../public/landing/03.png';
import i04 from '../../public/landing/04.jpeg';
import pic01 from '../../public/profile-pics/01.jpeg';
import pic02 from '../../public/profile-pics/02.jpeg';
import pic03 from '../../public/profile-pics/03.jpeg';
import pic04 from '../../public/profile-pics/04.jpeg';
import pic05 from '../../public/profile-pics/alejandro.png';
import pic06 from '../../public/profile-pics/06.jpeg';
import pic07 from '../../public/profile-pics/07.jpeg';
import pic08 from '../../public/profile-pics/08.jpeg';
import pic09 from '../../public/profile-pics/09.jpeg';
import Faqs from '../components/faqs';
import i08 from '../../public/landing/08.jpg';
import { FormProvider, useForm } from 'react-hook-form';
import { Select } from '../components/form/formAtoms';

const SectionCTA = () => <div className="w-full space-y-4">
  <a href="#storeLocator" target="_blank" className="button-secondary !w-full">Encuentra una tienda física</a>
  <a href="" target="_blank" className="button !w-full">Compra en línea</a>
</div>;

export default function Home() {
  const [lastClick, setLastClick] = useState('');
  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = methods;

  useEffect(() => {
    scrollDepth({
      values: [25, 50, 75, 100],
      callback: (value) => fbq('trackCustom', `Scroll Depth: ${value}`),
    });
  });

  const cta = {
    main: 'No lo pienses, da clic!',
    description: 'Programa la simulación de tu retiro sin compromisos',
  };

  return (
    <>
      {/*------------------------------------------------------------------ */}
      <section
        className="relative flex flex-col min-h-[60rem] md:min-h-[72rem] bg-[url('/survey/00.png')] bg-cover bg-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-1 to-indigo-500 opacity-25"/>

        <div className="container flex-grow flex flex-col items-center justify-center z-20">
          <h1
            className="ft-10 md:w-2/3 mx-auto relative text-white text-center [text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)]">
            El mejor momento para pensar en tu retiro fue ayer… hoy es tu segunda mejor opción
          </h1>
          <p className="ft-2 mt-12 font-medium text-center text-white">Descubre como puedes tener el retiro de tus
            sueños</p>
          <div className="absolute bottom-8 flex flex-col justify-center items-center mt-12">
            <p className="-ft-2 md:text-left text-white mt-auto">Conoce más sobre tu plan de retiro</p>
            <p className="material-icons animate-bounce"><span className="ft-9 text-white">expand_more</span></p>
          </div>
        </div>
      </section>
      {/*------------------------------------------------------------------ */}
      <div className="relative flex flex-col flex-grow bg-gradient-to-t from-blue-50 to-white">
                <Blockbuster
          overhead="Testimonios"
          title="No es solo un colchón...<br/> es descanso real."
          background={i08}
        />
        <section className="container my-20">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            <div className="flex gap-8 p-8 border rounded-xl">
              <div className="flex flex-col justify-center items-center w-1/4">
                <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-4">
                  <Image src={pic01} layout="fill" objectFit="cover"/>
                </div>
                <p className="-ft-2">Luis G.</p>
              </div>
              <div className="-ft-1 w-3/4">
                <p className="flex gap-4"><span
                  className="material-icons text-yellow-300">star star star star star</span>5/5
                </p>
                <p>Pensé que solo necesitaba descansar más. Resultó que mi colchón era el problema. Gracias por ayudarme
                  a
                  descubrirlo.</p>
              </div>
            </div>
            <div className="flex gap-8 p-8 border rounded-xl">
              <div className="flex flex-col justify-center items-center w-1/4">
                <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-4">
                  <Image src={pic06} layout="fill" objectFit="cover" objectPosition="top"/>
                </div>
                <p className="-ft-2">Andrea M.</p>
              </div>
              <div className="-ft-1 w-3/4">
                <p className="flex gap-4"><span
                  className="material-icons text-yellow-300">star star star star star</span>4.5/5
                </p>
                <p>Me iba a ir por uno super caro pero me preguntaron que onda y me ahorraron como $5mil y me mandaron
                  el
                  mejor colchón de la vida.</p>
              </div>
            </div>
            <div className="flex gap-8 p-8 border rounded-xl">
              <div className="flex flex-col justify-center items-center w-1/4">
                <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-4">
                  <Image src={pic02} layout="fill" objectFit="cover"/>
                </div>
                <p className="-ft-2">Alejandro T.</p>
              </div>
              <div className="-ft-1 w-3/4">
                <p className="flex gap-4"><span
                  className="material-icons text-yellow-300">star star star star star</span>5/5
                </p>
                <p>Es la primera vez que siento que me recomendaron algo pensando en mí, no solo por vender.</p>
              </div>
            </div>
          </div>
          <SectionCTA/>
        </section>

        <div id="storeLocator" className="container py-40 border-t">
          <h2 className="mb-12">Encuentra una tienda física</h2>
          <FormProvider {...methods}>
            <form className="flex flex-col flex-grow space-y-8" onSubmit={handleSubmit(() => {})}>
              <Select
                name="tiendas"
                inputOptions={{}}
                options={[
                  {value: '', label: '--- Guadalajara ---', disabled: true},
                  {value: 'valle-real', label: 'Valle Real'},
                  {value: 'mariano-otero', label: 'Mariano Otero'},
                  {value: 'arboledas', label: 'Arboledas'},
                  {value: 'canadas', label: 'Cañadas'},
                  {value: 'lopez-mateos', label: 'López Mateos'},
                  {value: 'estadio', label: 'Estadio'},
                  {value: 'revolucion', label: 'Av. Revolución'},
                  {value: '', label: '--- Tepatitlán ---', disabled: true},
                  {value: 'plaza-arboledas', label: 'Plaza Arboledas'},
                  {value: '', label: '--- Colima ---', disabled: true},
                  {value: 'colima', label: 'Colima'},
                  {value: 'las-lomas', label: 'Jardines de las Lomas'},
                  {value: '', label: '--- Manzanillo ---', disabled: true},
                  {value: 'manzanillo', label: 'Manzanillo'},
                ]}
                placeholder="Selecciona una tienda"
              />
              <button className="w-full">Contactar</button>
            </form>
          </FormProvider>
        </div>

      </div>
    </>
  );
}
