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
import i02 from '../../public/survey/02.png';
import i03 from '../../public/survey/03.jpg';
import portrait from '../../public/survey/portrait.png';
import SavingsChart from '../components/chart';

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

const setFormSteps = ({fullName, phone}) => ([
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
      }
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'sleepPattern',
    title: '¿Cómo sueles dormir?',
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
      }
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'feeling',
    title: '¿Eres caluroso o friolento?',
    inputOptions: {required: 'Selecciona una por favor'},
    options: [
      {
        value: 'caluroso',
        label: 'Caluroso',
      },
      {
        value: 'friolento',
        label: 'Friolento',
      }
    ],
    cols: 1,
  },
  {
    type: 'checkpoint',
    name: 'checkpoint-1',
    render: () => (
      <div className={`relative flex-grow`}>
        <p className="ft-6 sans text-center font-bold">El mejor momento para pensar en tu retiro fue ayer, hoy es tu
          segunda mejor opción.</p>
        <div className="relative w-full my-8 pt-[80%] rounded-2xl overflow-hidden">
          <Image src={i01} layout="fill" objectFit="cover"/>
        </div>
        <p className="ft-2 mt-4 text-center mb-12">Comienza a hacer que tu dinero trabaje por ti.</p>
      </div>
    ),
  },
  {
    type: 'checkbox',
    name: 'needs',
    title: '¿Tienes alguna molestia o necesidad en especial?',
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
      }
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
        label: 'No lo sé, solo quiero saber si necesito cambiarlo',
      }
    ],
    cols: 1,
  },
  {
    type: 'checkpoint',
    name: 'checkpoint-2',
    render: () => (
      <div className={`relative flex-grow`}>
        <p className="ft-6 sans text-center font-bold">El mejor momento para pensar en tu retiro fue ayer, hoy es tu
          segunda mejor opción.</p>
        <div className="relative w-full my-8 pt-[80%] rounded-2xl overflow-hidden">
          <Image src={i01} layout="fill" objectFit="cover"/>
        </div>
        <p className="ft-2 mt-4 text-center mb-12">Comienza a hacer que tu dinero trabaje por ti.</p>
      </div>
    ),
  },
  {
    type: 'radio',
    name: 'budget',
    title: '¿Qué tanto estás dispuesto a invertir en dormir mejor?',
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
      }
    ],
    cols: 1,
  },

  {
    type: 'checkpoint',
    name: 'checkpoint-3',
    autoAdvance: true,
    render: () => (
      <div className="container flex flex-col justify-center items-center z-10">
        <p className="ft-4 font-semibold mt-12 text-center">Dame unos segundos</p>
        <h1 className="ft-8 mb-12 text-center md:w-2/3">Estamos analizando tus respuestas</h1>

        <div className="w-full max-w-[50rem] h-12 p-2 mt-20 mb-4 bg-gray-200 rounded-full overflow-hidden">
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
    title: 'Ok, tenemos un par de opciones de diferentes presupuestos para mejorar tu sueño',
    description: 'Compárteme tus datos para darte una asesoría sobre estas opciones.',
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

  const formSteps = setFormSteps({fullName: lead.fullName, phone: lead.phone});

  const lastInputIndex = formSteps.reduce((lastIndex, step, i) => {
    return step.type !== 'checkpoint' ? i : lastIndex;
  }, 0);
  const handleNext = async () => {
    const currentStep = formSteps[formStep];
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

      await router.push('/cotizador');

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
          {showOutro &&
            <div
              className="relative container !px-0 md:pb-0 flex flex-col flex-grow md:flex-grow-0 items-center pointer-events-auto touch-auto">
              <div className="survey-card">
                <div className={`relative flex-grow`}>
                  <p className="ft-6 sans text-center font-bold">Mira {lead.fullName.split(' ')[0]}, esta es una
                    proyección real de tu ahorro:</p>

                  <div
                    className="w-full p-8 my-12 rounded-2xl overflow-hidden bg-gradient-to-br border border-blue-500">
                    <SavingsChart age={watch('edad')} monthly={watch('ahorro')}/>
                    <div className="flex justify-between mt-8">
                      <p className="-ft-1 flex">
                        <span className="material-icons ft-0 mr-4" style={{color: '#999999'}}>timeline</span>
                        Tu ahorro
                      </p>
                      <p className="-ft-1 flex">
                        <span className="material-icons ft-0 mr-4" style={{color: '#4ade80'}}>timeline</span>
                        Tu ahorro final
                      </p>
                    </div>
                  </div>
                  <p className="ft-2 mt-4 text-center mb-12">
                    Soy Luis Castañeda, asesor de Allianz® desde hace más de 8 años y me gustaría poder platicar
                    contigo.
                  </p>
                  <p className="ft-2 mt-4 text-center mb-12">
                    ¿Por qué no agendas una asesoría sin compromisos para solucionar todas tus dudas?
                  </p>
                </div>
                <div
                  className={`fixed p-8 bottom-0 inset-x-0 grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-auto bg-white border-t-2 border-gray-200 z-50`}>
                  <a
                    href="/cotizador"
                    className="button-secondary mt-auto !w-full"
                  >
                    Continuar a mi plan
                  </a>
                  <a
                    href={info.schedulerLink}
                    target="_blank"
                    className="button mt-auto !w-full"
                    onMouseUp={() => router.push('/cotizador')}
                  >
                    Agendar mi asesoría gratuita
                  </a>
                </div>
              </div>
            </div>
          }
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
