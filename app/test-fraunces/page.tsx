'use client'

import { Fraunces, Cormorant, Playfair_Display, Libre_Baskerville, Crimson_Pro } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
})

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-libre',
  display: 'swap',
  weight: ['400', '700'],
})

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export default function FrauncesTest() {
  const testText = "Judicial Frentes"
  const testSentences = [
    "Recuperação de Crédito com Eficiência",
    "Diligências Judiciais em Todo o País",
    "Soluções Jurídicas Personalizadas",
    "Arrestos e Execuções Eficazes"
  ]

  const features = [
    { label: 'Default (sem features)', settings: 'normal' },
    { label: 'ss01', settings: '"ss01"' },
    { label: 'ss02', settings: '"ss02"' },
    { label: 'ss03', settings: '"ss03"' },
    { label: 'ss04', settings: '"ss04"' },
    { label: 'cv01', settings: '"cv01"' },
    { label: 'cv02', settings: '"cv02"' },
    { label: 'cv03', settings: '"cv03"' },
    { label: 'cv04', settings: '"cv04"' },
    { label: 'calt off', settings: '"calt" 0' },
  ]

  const wonkValues = [0, 1] // WONK axis test
  const softValues = [0, 100] // SOFT axis test

  const fonts = [
    { name: 'Fraunces', className: 'font-fraunces', weight: 400, family: fraunces.style.fontFamily, isCurrent: true },
    { name: 'Cormorant', className: 'font-cormorant', weight: 700, family: cormorant.style.fontFamily },
    { name: 'Playfair Display', className: 'font-playfair', weight: 700, family: playfair.style.fontFamily },
    { name: 'Libre Baskerville', className: 'font-libre', weight: 700, family: libreBaskerville.style.fontFamily },
    { name: 'Crimson Pro', className: 'font-crimson', weight: 700, family: crimsonPro.style.fontFamily },
  ]

  return (
    <div className="min-h-screen bg-[color:var(--color-bone)] p-8 md:p-12">
      <style jsx global>{`
        .font-fraunces { font-family: ${fraunces.style.fontFamily}; }
        .font-cormorant { font-family: ${cormorant.style.fontFamily}; }
        .font-playfair { font-family: ${playfair.style.fontFamily}; }
        .font-libre { font-family: ${libreBaskerville.style.fontFamily}; }
        .font-crimson { font-family: ${crimsonPro.style.fontFamily}; }
      `}</style>

      <div className="max-w-7xl mx-auto space-y-20">

        {/* Hero Comparison - All Fonts */}
        <section>
          <h1 className="text-3xl font-bold mb-12 font-sans text-[color:var(--color-navy)]">
            Comparação de Fontes Display — "J" e "F"
          </h1>

          {/* Grid of all fonts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {fonts.map((font) => (
              <div key={font.name} className="space-y-6">
                <div className={`bg-white rounded-lg p-8 shadow-sm ${font.isCurrent ? 'border-2 border-[color:var(--color-danger)]' : 'border-2 border-[color:var(--color-gold)]'}`}>
                  <p className="text-xs font-sans text-[color:var(--color-gold-dim)] mb-4 uppercase tracking-wider">
                    {font.name} {font.isCurrent && '(Atual)'}
                  </p>
                  <h2
                    className={`${font.className} text-4xl lg:text-5xl leading-tight text-[color:var(--color-navy)] mb-6`}
                    style={{ fontWeight: font.weight }}
                  >
                    {testText}
                  </h2>
                  <div className="flex gap-6 justify-center pt-4 border-t">
                    <span
                      className={`${font.className} text-6xl text-[color:var(--color-navy)]`}
                      style={{ fontWeight: font.weight }}
                    >
                      J
                    </span>
                    <span
                      className={`${font.className} text-6xl text-[color:var(--color-navy)]`}
                      style={{ fontWeight: font.weight }}
                    >
                      F
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Real Context Examples */}
          <div className="space-y-12">
            <h3 className="text-2xl font-sans font-semibold text-[color:var(--color-navy)] mb-6">
              Em contexto real — Frases do site
            </h3>

            {testSentences.map((sentence, idx) => (
              <div key={idx} className="space-y-4">
                <p className="text-sm font-sans font-medium text-[color:var(--color-gold-dim)] uppercase tracking-wider">
                  Exemplo {idx + 1}
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fonts.map((font) => (
                    <div
                      key={`${sentence}-${font.name}`}
                      className={`bg-white rounded-lg p-6 shadow-sm ${font.isCurrent ? 'border border-[color:var(--color-danger)]' : 'border border-[color:var(--color-stone)]'}`}
                    >
                      <p
                        className={`${font.className} text-2xl md:text-3xl leading-tight text-[color:var(--color-navy)]`}
                        style={{ fontWeight: font.weight }}
                      >
                        {sentence}
                      </p>
                      <p className="text-xs font-sans text-[color:var(--color-stone-dark)] mt-3">{font.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Alphabet Comparison - All Fonts */}
        <section>
          <h2 className="text-2xl font-sans font-bold mb-8 text-[color:var(--color-navy)]">
            Alfabeto completo
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fonts.map((font) => (
              <div
                key={`alphabet-${font.name}`}
                className={`bg-white rounded-lg p-8 shadow-sm ${font.isCurrent ? 'border border-[color:var(--color-danger)]' : 'border border-[color:var(--color-stone)]'}`}
              >
                <p className="text-xs font-sans text-[color:var(--color-gold-dim)] mb-4 uppercase tracking-wider">
                  {font.name} {font.isCurrent && '(Atual)'}
                </p>
                <p
                  className={`${font.className} text-2xl text-[color:var(--color-navy)] leading-relaxed`}
                  style={{ fontWeight: font.weight }}
                >
                  ABCDEFGHIJKLM<br/>
                  NOPQRSTUVWXYZ<br/>
                  abcdefghijklm<br/>
                  nopqrstuvwxyz<br/>
                  0123456789
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
