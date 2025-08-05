'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie, getCookie } from 'cookies-next';
import { info } from '../../info';
import StepRenderer from '../components/form/stepRenderer';
import fbEvent from '../services/fbEvents';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../../public/logo.png';
import col from '../../public/survey/colchon.png';
import i00 from '../../public/survey/00.png';
import i01 from '../../public/survey/01.png';
import i02 from '../../public/survey/02.jpg';
import i03 from '../../public/survey/03.jpg';
import i04 from '../../public/survey/04.png';
import portrait from '../../public/survey/portrait.png';
import SavingsChart from '../components/chart';
import pic01 from '../../public/profile-pics/01.jpeg';
import pic06 from '../../public/profile-pics/06.jpg';
import pic02 from '../../public/profile-pics/02.jpeg';

const Intro = () => <motion.div
  key="intro"
  initial={{opacity: 0}}
  animate={{opacity: 1}}
  exit={{opacity: 0}}
  transition={{duration: 0.5}}
  className="bg-[url('/survey/nubes.png')] bg-center bg-cover relative flex-grow flex flex-col items-center justify-center px-4 py-12"
>
  <div className="absolute mx-auto inset-x-0 w-[20rem] h-[10rem] top-[4rem]">
    <Image src={logo} layout="fill" className="object-contain"/>
  </div>

  <div className="container flex flex-col justify-center items-center z-10">
    <div className="relative inset-x-0 w-2/3 pt-[24rem] md:w-[40rem]">
      <Image src={col} layout="fill" className="object-contain object-bottom"/>
    </div>
    <h1 className="ft-11 text-blue-900 font-semibold my-12 text-center">Porque descansar bien lo cambia todo</h1>
    <p className="ft-4 font-medium text-gray-600 text-center">Encuentra el colchón que te deje dormir como se
      debe</p>

    <div className="w-full max-w-[50rem] h-12 p-2 mt-16 mb-4 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{width: '0%'}}
        animate={{width: '100%'}}
        transition={{duration: 3, ease: 'easeInOut'}}
        className="h-full bg-gradient-to-br from-blue-800 to-indigo-500 rounded-2xl"
      />
    </div>
    <p className="-ft-1 flex items-center text-center text-gray-100">
      Cargando el test
      <span
        className="-ft-1 material-symbols-outlined animate-spin ml-4">progress_activity</span>
    </p>
  </div>
</motion.div>;

const setFormSteps = ({fullName, phone, user}) => ([
  {
    type: 'radio',
    name: 'user',
    title: '¿Para quién es el colchón que buscas?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'personal',
        label: 'Para mi',
      },
      {
        value: 'pareja',
        label: 'Para mi y mi pareja',
      },
      {
        value: 'familiar',
        label: 'Para mi hijo o un familiar',
      },
      {
        value: 'visitas',
        label: 'Para visitas',
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'sleepPattern',
    title: user === 'personal' ? '¿Cómo sueles dormir?' : '¿Cómo suelen dormir?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'boca-arriba',
        label: 'Boca arriba',
      },
      {
        value: 'cambiante',
        label: 'Cambiando de posición',
      },
      {
        value: 'boca-abajo',
        label: 'Boca abajo',
      },
      {
        value: 'lado',
        label: 'De lado',
      },
      {
        value: 'no-sabe',
        label: 'No sé',
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'feeling',
    title: user === 'personal' ? '¿Eres caluroso o friolento?' : '¿Son calurosos o friolentos?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'caluroso',
        label: 'Caluroso',
      },
      {
        value: 'friolento',
        label: 'Friolento',
      },
    ],
    cols: 1,
  },
  {
    type: 'checkpoint',
    name: 'checkpoint-1',
    render: () => (
      <div className={`relative flex-grow`}>
        <p className="ft-6 sans text-center font-bold">Más que un colchón, una solución para dormir bien.</p>
        <div className="relative w-full my-8 pt-[80%] rounded-2xl overflow-hidden">
          <Image src={i02} layout="fill" objectFit="cover"/>
        </div>
        <div className="gap-8 grid grid-cols-1">
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
      </div>
    ),
  },
  {
    type: 'checkbox',
    name: 'needs',
    title: user === 'personal' ? '¿Tienes alguna molestia o necesidad en especial?' : '¿Tienen alguna molestia o necesidad en especial?',
    description: 'Selecciona una o varias',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'dolor',
        label: 'Dolor de cuello o espalda',
      },
      {
        value: 'despierta-facil',
        label: 'Me despierto con facilidad',
      },
      {
        value: 'sudoracion',
        label: 'Sudo mucho al dormir',
      },
      {
        value: 'nada',
        label: 'Ninguna en especial',
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'goal',
    title: '¿Qué esperas mejorar con tu nuevo colchón?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'dormir-mejor',
        label: 'Dormir mejor en general',
      },
      {
        value: 'aliviar-dolor',
        label: 'Dejar de despertar adolorido',
      },
      {
        value: 'profundidad-sueno',
        label: 'Dormir más profundo',
      },
      {
        value: 'no-sabe',
        label: 'No lo sé, solo necesito cambiarlo',
      },
    ],
    cols: 1,
  },
  {
    type: 'checkpoint',
    name: 'checkpoint-1',
    render: () => (
      <div className={`relative flex-grow`}>
        <p className="ft-6 sans text-center font-bold">Esto dicen de nosotros, no solo de nuestros colchones.</p>
        <div className="relative w-full my-8 pt-[80%] rounded-2xl overflow-hidden">
          <Image src={i03} layout="fill" objectFit="cover"/>
        </div>
        <div className="gap-8 grid grid-cols-1">
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
              <p className="-ft-2">Rigoberto</p>
            </div>
            <div className="-ft-1 w-3/4">
              <p className="flex gap-4"><span
                className="material-icons text-yellow-300">star star star star star</span>4.5/5
              </p>
              <p>me gustó mucho y la base le acomodo tan bien que hace de este colchón muy suave y firme.</p>
            </div>
          </div>
          <div className="flex gap-8 p-8 border rounded-xl">
            <div className="flex flex-col justify-center items-center w-1/4">
              <div className="relative w-full pt-[100%] rounded-full overflow-hidden mb-4">
                <Image src={pic02} layout="fill" objectFit="cover"/>
              </div>
              <p className="-ft-2">Andrea</p>
            </div>
            <div className="-ft-1 w-3/4">
              <p className="flex gap-4"><span
                className="material-icons text-yellow-300">star star star star star_half</span>4.5/5
              </p>
              <p>Me iba a ir por uno super caro pero me preguntaron que onda y me ahorraron como $5mil y me mandaron el mejor colchón de la vida.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    type: 'radio',
    name: 'budget',
    title: user === 'personal' ? '¿Qué tanto estás dispuesto a invertir en dormir mejor?' : '¿Qué tanto estás dispuesto a invertir?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: '<4000',
        label: 'Menos de $4,000',
      },
      {
        value: '4000-6000',
        label: 'De $4,000 a $6,000',
      },
      {
        value: '6000-10000',
        label: 'De $6,000 a $10,000',
      },
      {
        value: '>10000',
        label: 'Más de $10,000',
      },
      {
        value: 'no-sabe',
        label: 'No tengo idea',
      },
    ],
    cols: 1,
  },

  {
    type: 'checkpoint',
    name: 'checkpoint-3',
    autoAdvance: true,
    render: () => (
      <div className="container flex flex-col justify-center items-center z-10">
        <div className="relative w-2/3 my-8 pt-[60%] rounded-2xl overflow-hidden">
          <Image src={i04} layout="fill" objectFit="contain"/>
        </div>
        <p className="ft-4 font-semibold mt-12 text-center">No te me duermas</p>
        <h1 className="ft-8 mb-12 text-center md:w-2/3">Estamos analizando tus respuestas</h1>

        <div className="w-full max-w-[50rem] h-12 p-2 mt-8 mb-4 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{width: '0%'}}
            animate={{width: '100%'}}
            transition={{duration: 5, ease: 'easeInOut'}}
            className="h-full bg-gradient-to-br from-blue-800 to-indigo-500 rounded-2xl"
          />
        </div>
        <p className="-ft-1 flex items-center text-center">
          Analizando
          <span
            className="-ft-1 material-symbols-outlined animate-spin ml-4">progress_activity</span>
        </p>
      </div>
    ),
  },
  {
    type: 'opt-in',
    title: 'Ok, tenemos un par de opciones de diferentes presupuestos',
    description: 'Compárteme tu nombre y WhatsApp para darte mostrártelas.',
    fields: [
      {
        type: 'text',
        name: 'fullName',
        title: 'Tu nombre completo',
        inputOptions: {value: fullName, required: 'Cómo te llamas?'},
      },
      {
        type: 'tel',
        name: 'phone',
        title: 'Tu WhatsApp',
        inputOptions: {
          value: phone,
          required: 'Cuál es tu WhatsApp?',
          maxLength: {value: 10, message: 'Tu tel a 10 digitos'},
          minLength: {value: 10, message: 'Tu tel a 10 digitos'},
        },
      },
    ],
  },
]);

export default function Survey({lead, utm}) {
  const [showIntro, setShowIntro] = useState(true);
  const [showOutro, setShowOutro] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [inputError, setInputError] = useState(null);
  const [sending, setSending] = useState(false);

  const methods = useForm({mode: 'all'});
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = methods;
  const router = useRouter();

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [showIntro]);

  useEffect(() => {
    const current = formSteps[formStep];

    if (current.autoAdvance) {
      const timer = setTimeout(() => {
        setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [formStep]);
  useEffect(() => {
    const step = formSteps[formStep];

    if (step?.type === 'checkpoint') {
      fbEvent(step?.name);
      console.log(step?.name);
    }
  }, [formStep]);

  let formSteps = setFormSteps({fullName: lead.fullName, phone: lead.phone});

  const lastInputIndex = formSteps.reduce((lastIndex, step, i) => {
    return step.type !== 'checkpoint' ? i : lastIndex;
  }, 0);
  const handleNext = async () => {
    const currentStep = formSteps[formStep];

    if (currentStep.name === 'user') {
      formSteps = setFormSteps({fullName: lead.fullName, phone: lead.phone, user: watch('user')});
    }

    if (currentStep.type === 'checkpoint') {
      return setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    }

    const valid = await methods.trigger(currentStep.name);
    if (!valid) {
      setInputError(formStep);
      return;
    }

    setInputError(null);
    window.scrollTo(0, 0);
    setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
  };
  const onSubmit = async (data) => {
    setSending(true);
    try {
      data.whatsapp = '521' + data.phone.replace(/^(MX)?\+?(52)?\s?0?1?|\s|\(|\)|-|[a-zA-Z]/g, '');

      const payload = {...lead, ...data, ...utm};

      const res = await fetch(info.surveyWebhook, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fbEvent(
        'Lead',
        {phone: data.phone, externalID: res.id},
      );

      setCookie('lead', {...data, id: res.id});

      await router.push('/results');

    } catch (err) {
      console.error('Error al enviar formulario:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col flex-grow bg-gradient-to-t from-blue-50 to-white">
        <AnimatePresence mode="wait">
          {showIntro && (
            <Intro/>
          )}
          {!showIntro && !showOutro && (
            <motion.div
              key="survey"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.5}}
              className="flex flex-col flex-grow pb-[8rem]"
            >
              <div className="sticky top-0 bg-white mx-auto w-full max-w-[56rem] p-8 z-10">
                <div className="relative bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-4 bg-brand-1`} style={{width: `${((formStep + 1) / formSteps.length) * 100}%`}}/>
                </div>
              </div>
              <div
                className="relative container !px-0 md:pb-0 flex flex-col flex-grow md:flex-grow-0 items-center pointer-events-auto touch-auto">
                <div className="survey-card">
                  <FormProvider {...methods}>
                    <form className="flex flex-col flex-grow" onSubmit={handleSubmit(onSubmit)}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={formStep} // importante para animaciones entre pasos
                          initial={{opacity: 0, x: 100}}
                          animate={{opacity: 1, x: 0}}
                          exit={{opacity: 0, x: -100}}
                          transition={{duration: 0.4, ease: 'easeInOut'}}
                        >
                          <StepRenderer
                            step={formSteps[formStep]}
                            index={formStep}
                            currentStep={formStep}
                            errors={errors}
                            inputError={inputError}
                            errorMessage={errors[formSteps[formStep]?.name]?.message}
                            register={register}
                          />
                        </motion.div>
                      </AnimatePresence>
                      <div
                        className={`fixed p-8 bottom-0 inset-x-0 grid ${formSteps[formStep].type === 'checkpoint' ? 'grid-cols-1' : 'grid-cols-2'} gap-8 w-full mt-auto bg-white border-t-2 border-gray-200 z-50`}>
                        {formSteps[formStep].type !== 'checkpoint' &&
                          <button
                            type="button"
                            onClick={() => setFormStep(formStep - 1)}
                            className="!bg-transparent !text-brand-1 border-none !w-full hover:text-brand-1 disabled:!text-gray-100"
                            disabled={formStep <= 0}
                          >Atrás
                          </button>
                        }
                        <button
                          type="button"
                          disabled={sending}
                          onClick={() => {
                            if (formStep === lastInputIndex) {
                              handleSubmit(onSubmit)();
                            } else {
                              handleNext();
                            }
                          }}
                          className="mt-auto !w-full"
                        >
                          {sending && <span className="animate-spin mr-4">+</span>}
                          {formStep === lastInputIndex ? 'Continuar' : 'Siguiente'}
                        </button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const {req, res} = ctx;
  const leadCookie = getCookie('lead', {req, res}) || '{}';
  const leadUtmCookie = getCookie('lead_utm', {req, res}) || '{}';
  const _fbc = getCookie('_fbc', {req, res}) || '';
  const _fbp = getCookie('_fbp', {req, res}) || '';

  const lead = JSON.parse(leadCookie);
  const leadUtm = JSON.parse(leadUtmCookie);

  if (!lead || lead === 'null' || Object.keys(lead).length === 0) {
    return {
      props: {
        lead: {
          fullName: '',
          phone: '',
          whatsapp: '',
          sheetRow: '',
          _fbc,
          _fbp,
        },
        utm: leadUtm,
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
      utm: leadUtm,
    },
  };
}
