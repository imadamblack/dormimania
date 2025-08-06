import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { Select } from '../components/form/formAtoms';
import { FormProvider, useForm } from 'react-hook-form';
import Blockbuster from '../components/blockbuster';
import i02 from '../../public/survey/02.jpg';
import i08 from '../../public/landing/08.jpg';
import pic01 from '../../public/profile-pics/01.jpeg';
import pic02 from '../../public/profile-pics/02.jpeg';
import pic03 from '../../public/profile-pics/03.jpeg';
import pic04 from '../../public/profile-pics/04.jpeg';
import pic05 from '../../public/profile-pics/05.jpg';
import pic06 from '../../public/profile-pics/06.jpg';
import pic07 from '../../public/profile-pics/07.jpeg';
import pic08 from '../../public/profile-pics/08.jpeg';
import pic09 from '../../public/profile-pics/09.jpeg';
import { info } from '../../info';
import { useState } from 'react';

const colchones = [
  {
    name: 'Fresh Gel',
    photos: ['fresh-01.png', 'fresh-02.png', 'fresh-03.png'],
    link: 'https://dormimania.com/collections/lo-mas-vendido/products/fresh-gel',
    description: 'Múltiples capas de espumas de última generación, para proporcionar un balance entre suavidad y firmeza.',
  },
  {
    name: 'Zen',
    photos: ['hibrido-01.webp', 'hibrido-02.webp', 'hibrido-03.webp'],
    link: 'https://dormimania.com/collections/lo-mas-vendido/products/colchon-thera-sleep-zen',
    description: 'Híbrido de resortes independientes, memory gel foam, fibras antimicrobianas.',
  },
  {
    name: 'Luxury Reserve',
    photos: ['imperial-01.jpg', 'imperial-02.jpg', 'imperial-03.jpg'],
    link: '',
    description: 'El más chido de todos, con la más alta tecnología, hasta el dueño de Dormimanía duerme en uno de estos.',
  },
];

export default function Results({lead}) {
  const [tienda, setTienda] = useState('');
  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = methods;

  const {fullName} = lead;
  const firstName = fullName.split(' ')[0];

  const SectionCTA = () => <div className="w-full space-y-4">
    <a href="#storeLocator" className="button-secondary !w-full">Encuentra una tienda física</a>
    <a href="" target="_blank" className="button !w-full">Compra en línea</a>
  </div>;

  return (
    <div className="relative flex flex-col flex-grow bg-gradient-to-t from-blue-50 to-white">
      <div
        className="relative container !px-0 md:pb-0 flex flex-col flex-grow md:flex-grow-0 items-center pointer-events-auto touch-auto">
        <div className="survey-card border-b pb-12">
          <div className="w-full py-12">
            <p className="ft-3"><span className="font-semibold">{firstName}</span>, aquí tienes 3 colchones que seguro
              te ayudan a dormir mejor:
            </p>
          </div>

          {colchones.map((c) =>
            <div className="relative w-full mb-8 border border-blue-500 rounded-2xl overflow-hidden">
              <div
                className="absolute rounded-full bg-white/40 shadow w-12 h-12 top-1/3 left-6 z-50 flex items-center justify-center">
                <span className="material-icons ft-2 text-gray-200 !mb-0">arrow_back</span>
              </div>
              <div
                className="absolute rounded-full bg-white/40 shadow w-12 h-12 top-1/3 right-6 z-50 flex items-center justify-center">
                <span className="material-icons ft-2 text-gray-200 !mb-0">arrow_forward</span>
              </div>
              <div className="relative max-w-full overflow-x-scroll snap-x snap-mandatory">
                <div className="w-max space-x-1 flex">
                  {c.photos.map((p) =>
                    <div className="relative w-[30rem] pt-[24rem] snap-center">
                      <Image src={`/survey/${p}`} layout="fill" objectFit="cover"/>
                    </div>,
                  )}
                </div>
              </div>
              <div className="w-full p-8">
                <div className="grid grid-cols-2">
                  <h2 className="ft-3">TheraSleep {c.name}</h2>
                </div>

                <p>{c.description}</p>

                <hr className="my-4"/>
                {c.link !== ''
                  ? <a href={c.link} target="_blank" className="button ft-2 !w-full">Compra en línea</a>
                  : <a href="#storeLocator" className="button ft-2 !w-full">De venta solo en tienda</a>
                }
                <p
                  className="py-6 ft-1 text-blue-900 font-semibold tracking-wide underline text-center flex">
                  <a href="#storeLocator" className="flex mx-auto">Encuentra una tienda física</a>
                </p>
              </div>
            </div>,
          )}

          <SectionCTA/>

        </div>
      </div>

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
              <p className="-ft-2">Luis</p>
            </div>
            <div className="-ft-1 w-3/4">
              <p className="flex gap-4"><span
                className="material-icons text-yellow-300">star star star star star</span>5/5
              </p>
              <p>Pensé que solo necesitaba descansar más. Resultó que mi colchón era el problema. Gracias por ayudarme a
                descubrirlo.</p>
            </div>
          </div>
          <div className="flex gap-8 p-8 border rounded-xl">
            <div className="flex flex-col justify-center items-center w-1/4">
              <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-4">
                <Image src={pic08} layout="fill" objectFit="cover" objectPosition="top"/>
              </div>
              <p className="-ft-2">Andrea</p>
            </div>
            <div className="-ft-1 w-3/4">
              <p className="flex gap-4"><span
                className="material-icons text-yellow-300">star star star star star_half</span>4.5/5
              </p>
              <p>Me iba a ir por uno super caro pero me preguntaron que onda y me ahorraron como $5mil y me mandaron el
                mejor colchón de la vida.</p>
            </div>
          </div>
          <div className="flex gap-8 p-8 border rounded-xl">
            <div className="flex flex-col justify-center items-center w-1/4">
              <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-4">
                <Image src={pic03} layout="fill" objectFit="cover"/>
              </div>
              <p className="-ft-2">Alejandro</p>
            </div>
            <div className="-ft-1 w-3/4">
              <p className="flex gap-4"><span
                className="material-icons text-yellow-300">star star star star star</span>5/5
              </p>
              <p>Es la primera vez que siento que me recomendaron algo pensando en mí, no solo por vender.</p>
            </div>
          </div>
          <div className="flex gap-8 p-8 border rounded-xl">
            <div className="flex flex-col justify-center items-center w-1/4">
              <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-4">
                <Image src={pic04} layout="fill" objectFit="cover"/>
              </div>
              <p className="-ft-2">Lupita</p>
            </div>
            <div className="-ft-1 w-3/4">
              <p className="flex gap-4"><span
                className="material-icons text-yellow-300">star star star star star</span>5/5
              </p>
              <p>Anoche me dormí en el y está increíble. Muy recomendado.</p>
            </div>
          </div>
          <div className="flex gap-8 p-8 border rounded-xl">
            <div className="flex flex-col justify-center items-center w-1/4">
              <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-4">
                <Image src={pic05} layout="fill" objectFit="cover"/>
              </div>
              <p className="-ft-2">Fernanda</p>
            </div>
            <div className="-ft-1 w-3/4">
              <p className="flex gap-4"><span
                className="material-icons text-yellow-300">star star star star star</span>5/5
              </p>
              <p>Se lo regale a mi hijo y me dice que le encantó.</p>
            </div>
          </div>
          <div className="flex gap-8 p-8 border rounded-xl">
            <div className="flex flex-col justify-center items-center w-1/4">
              <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-4">
                <Image src={pic06} layout="fill" objectFit="cover"/>
              </div>
              <p className="-ft-2">Rigoberto</p>
            </div>
            <div className="-ft-1 w-3/4">
              <p className="flex gap-4"><span
                className="material-icons text-yellow-300">star star star star star_half</span>4.5/5
              </p>
              <p>me gustó mucho y la base le acomodo tan bien que hace de este colchón muy suave y firme.</p>
            </div>
          </div>
          <div className="flex gap-8 p-8 border rounded-xl">
            <div className="flex flex-col justify-center items-center w-1/4">
              <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-4">
                <Image src={pic07} layout="fill" objectFit="cover"/>
              </div>
              <p className="-ft-2">Mariana</p>
            </div>
            <div className="-ft-1 w-3/4">
              <p className="flex gap-4"><span
                className="material-icons text-yellow-300">star star star star star</span>5/5
              </p>
              <p>Me parece muy suave, cómodo y se armó muy rápido 😊.</p>
            </div>
          </div>
          <div className="flex gap-8 p-8 border rounded-xl">
            <div className="flex flex-col justify-center items-center w-1/4">
              <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-4">
                <Image src={pic02} layout="fill" objectFit="cover"/>
              </div>
              <p className="-ft-2">Ernesto</p>
            </div>
            <div className="-ft-1 w-3/4">
              <p className="flex gap-4"><span
                className="material-icons text-yellow-300">star star star star star</span>5/5
              </p>
              <p>Es un colchón más que excelente, recomendable en todos los aspectos, precio calidad y sobre todo ahora
                si sentirás un descanso total.</p>
            </div>
          </div>
          <div className="flex gap-8 p-8 border rounded-xl">
            <div className="flex flex-col justify-center items-center w-1/4">
              <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-4">
                <Image src={pic09} layout="fill" objectFit="cover"/>
              </div>
              <p className="-ft-2">Paula</p>
            </div>
            <div className="-ft-1 w-3/4">
              <p className="flex gap-4"><span
                className="material-icons text-yellow-300">star star star star star_half</span>4.5/5
              </p>
              <p>muy cómodo, se infla y todo normal, mis gatos lo adoran.</p>
            </div>
          </div>
        </div>
        <SectionCTA/>
      </section>

      <Blockbuster
        overhead="Beneficios"
        title="Más que un colchón, una solución para dormir bien"
        background={i02}
      />

      <section className="container my-20">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 rounded-xl border-2 border-brand-1">
            <p className="font-semibold ft-4 text-center">+20 años de experiencia en descanso</p>
          </div>
          <div className="p-6 rounded-xl border-2 border-brand-1">
            <p className="font-semibold ft-4 text-center">Con la mejor selección de colchones</p>
          </div>
          <div className="p-6 rounded-xl border-2 border-brand-1">
            <p className="font-semibold ft-4 text-center">Asesoría del dormir personalizada y cercana</p>
          </div>
          <div className="p-6 rounded-xl border-2 border-brand-1">
            <p className="font-semibold ft-4 text-center">Precios justos en todas las marcas</p>
          </div>
        </div>
      </section>

      <div id="storeLocator" className="container py-40 border-t">
        <h2 className="mb-12">Encuentra una tienda física</h2>
        <FormProvider {...methods}>
          <div
            className="flex flex-col flex-grow space-y-8"
          >
            <Select
              name="tienda"
              onChange={(e) => setTienda(e.target.value)}
              options={[
                {value: '', label: '--- Guadalajara ---', disabled: true},
                {value: 'Valle Real', label: 'Valle Real'},
                {value: 'Mariano Otero', label: 'Mariano Otero'},
                {value: 'Arboledas', label: 'Arboledas'},
                {value: 'Cañadas', label: 'Cañadas'},
                {value: 'Lopez Mateos', label: 'López Mateos'},
                {value: 'Estadio', label: 'Estadio'},
                {value: 'Revolucion', label: 'Av. Revolución'},
                {value: '', label: '--- Tepatitlán ---', disabled: true},
                {value: 'Tepa Arboledas', label: 'Plaza Arboledas'},
                {value: '', label: '--- Colima ---', disabled: true},
                {value: 'Colima', label: 'Colima'},
                {value: 'Las Lomas', label: 'Jardines de las Lomas'},
                {value: '', label: '--- Manzanillo ---', disabled: true},
                {value: 'Manzanillo', label: 'Manzanillo'},
              ]}
              placeholder="Selecciona una tienda"
            />
            <a target="_blank"
               href={`https://wa.me/${info.whatsapp.value}?text=Hola! Me interesa ver un colchón en su tienda ${tienda}`}
               className="button !w-full">Contactar</a>
          </div>
        </FormProvider>
      </div>

    </div>
  );
}

export async function getServerSideProps(ctx) {
  const {req, res} = ctx;
  const leadCookie = getCookie('lead', {req, res}) || '{}';
  const _fbc = getCookie('_fbc') || '';
  const _fbp = getCookie('_fbp') || '';

  const lead = JSON.parse(leadCookie);

  if (!lead || lead === 'null' || Object.keys(lead).length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      lead: {
        fullName: lead.fullName,
        phone: lead.phone,
        whatsapp: lead.whatsapp,
        sheetRow: lead.sheetRow || '',
        _fbc,
        _fbp,
      },
    },
  };
}