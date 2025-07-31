import { info } from '../../info';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import SavingsChart from '../components/chart';
import portrait from '../../public/survey/portrait.png';
import { Select } from '../components/form/formAtoms';
import { FormProvider, useForm } from 'react-hook-form';
import Blockbuster from '../components/blockbuster';
import i02 from '../../public/landing/02.png';
import i08 from '../../public/landing/08.jpg';
import pic01 from '../../public/profile-pics/01.jpeg';
import pic06 from '../../public/profile-pics/06.jpeg';
import pic02 from '../../public/profile-pics/02.jpeg';
import pic03 from '../../public/profile-pics/03.jpeg';
import pic04 from '../../public/profile-pics/04.jpeg';
import pic07 from '../../public/profile-pics/07.jpeg';
import pic08 from '../../public/profile-pics/08.jpeg';
import pic05 from '../../public/profile-pics/alejandro.png';
import pic09 from '../../public/profile-pics/09.jpeg';
import Link from 'next/link';

export default function Cotizador({lead}) {
  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = methods;

  const {fullName, edad, ahorro} = lead;
  const firstName = fullName.split(' ')[0];

  const SectionCTA = () => <div className="w-full space-y-4">
    <a href="#storeLocator" target="_blank" className="button-secondary !w-full">Encuentra una tienda física</a>
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

          <div className="w-full mb-8 border border-blue-500 rounded-2xl overflow-hidden">
            <div
              className="absolute rounded-full bg-white/40 shadow w-12 h-12 top-1/3 left-12 z-50 flex items-center justify-center">
              <p className="material-icons text-white">arrow_back</p>
            </div>
            <div
              className="absolute rounded-full bg-white/40 shadow w-12 h-12 top-1/3 right-12 z-50 flex items-center justify-center">
              <p className="material-icons text-white">arrow_forward</p>
            </div>
            <div className="relative max-w-full overflow-x-scroll">
              <div className="w-max space-x-1 flex">
                <div className="relative w-[30rem] pt-[24rem]">
                  <Image src={i02} layout="fill" objectFit="cover"/>
                </div>
                <div className="relative w-[30rem] pt-[24rem]">
                  <Image src={i02} layout="fill" objectFit="cover"/>
                </div>
              </div>
            </div>
            <div className="w-full p-8">
              <div className="grid grid-cols-2">
                <h2 className="ft-3">TheraSleep Fresh Gel</h2>
                <h2 className="ft-3 text-right">$12,949.00</h2>
              </div>

              <hr className="my-4"/>
              <p>Selecciona un tamaño</p>
              <div className="grid grid-cols-4 gap-2 mt-8">
                <a href="" target="_blank" className="button !w-full">Ind</a>
                <a href="" target="_blank" className="button !w-full">Mat</a>
                <a href="" target="_blank" className="button !w-full">Queen</a>
                <a href="" target="_blank" className="button !w-full">King</a>
              </div>
            </div>
          </div>

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
              <p className="-ft-2">Luis G.</p>
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
                <Image src={pic06} layout="fill" objectFit="cover" objectPosition="top"/>
              </div>
              <p className="-ft-2">Andrea M.</p>
            </div>
            <div className="-ft-1 w-3/4">
              <p className="flex gap-4"><span
                className="material-icons text-yellow-300">star star star star star</span>4.5/5
              </p>
              <p>Me iba a ir por uno super caro pero me preguntaron que onda y me ahorraron como $5mil y me mandaron el
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
        destination: '/survey',
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