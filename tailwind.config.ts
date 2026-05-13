import { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ESTA É A NOVA SEÇÃO DE ANIMAÇÕES CUSTOMIZADAS
      keyframes: {
        // Surgimento de baixo para cima com opacidade
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Surgimento suave apenas com opacidade
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Pequeno pulso de escala para o CTA
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        // Nome da classe que usaremos -> KeyframeDuraçãoTipoDelay
        fadeUp: 'fadeUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 1s ease-out forwards',
        pulseScale: 'pulseScale 2s infinite',
      },
    },
  },
  plugins: [],
}
export default config