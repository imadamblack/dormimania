import { useState } from 'react';

export default function Faqs() {
  const [faqOpen, setFaqOpen] = useState(0);

  const questions = [
    {
      q: "¿Cómo sé que mi joya será única?",
      a: "Cada diseño es exclusivo y no se replica para ningún otro cliente."
    },
    {
      q: "¿Cómo puedo estar seguro de la autenticidad de los materiales?",
      a: "Todas las piedras y metales tienen certificaciones oficiales de calidad."
    },
    {
      q: "¿Qué pasa si quiero hacer cambios en el diseño?",
      a: "Antes de la fabricación, puedes solicitar ajustes en los renders 3D."
    },
    {
      q: "¿Cuánto tiempo tarda la creación de mi joya?",
      a: "El proceso puede tomar entre 4 y 8 semanas, dependiendo de la complejidad del diseño."
    },
    {
      q: "¿Qué garantías tengo sobre mi compra?",
      a: "Giove ofrece garantía de autenticidad, servicio post-venta y la seguridad de trabajar con expertos."
    }
  ];

  return (
    <section className='py-12'>
      <div className='container'>
        {questions.map((q, i) =>
          <div key={`faq-${i}`} className="w-full shadow-sm mb-2">
            <p
              id={i}
              className="w-full p-4 font-bold bg-white mb-0 cursor-pointer rounded-lg border border-gray-200"
              onClick={(e) => setFaqOpen(e.target.id)}
            >
              <span className="font-bold mr-4 text-brand-1">›</span>{q.q}
            </p>
            <p className={`${faqOpen == i ? 'flex' : 'hidden'} bg-gray-50 p-12`}>
              {q.a}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}