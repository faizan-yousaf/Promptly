export const defaultLocale = 'en'
export const locales = ['en', 'es', 'fr'] as const
export type Locale = typeof locales[number]

export const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français'
}

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      pricing: 'Pricing',
      dashboard: 'Dashboard',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out'
    },
    // Landing Page
    landing: {
      hero: {
        title: 'From Idea to Perfect Prompt',
        subtitle: 'Instantly',
        description: 'AI-powered multilingual SaaS for professional prompt generation with advanced reasoning capabilities.',
        cta: {
          primary: 'Try Now',
          secondary: 'Sign Up'
        }
      },
      howItWorks: {
        title: 'How It Works',
        step1: {
          title: 'Describe Your Need',
          description: 'Tell us what you want to achieve'
        },
        step2: {
          title: 'AI Generates',
          description: 'Our AI creates the perfect prompt'
        },
        step3: {
          title: 'Get Results',
          description: 'Copy and use your optimized prompt'
        }
      },
      agentMode: {
        title: 'Agent Mode',
        description: 'Enable advanced multi-step reasoning for complex tasks',
        toggle: 'Try Agent Mode'
      },
      multilingual: {
        title: 'Multilingual Support',
        description: 'Generate prompts in English, Spanish, French, and more'
      }
    },
    // Dashboard
    dashboard: {
      title: 'Dashboard',
      promptInput: {
        placeholder: 'Describe what you need help with...',
        generate: 'Generate',
        clear: 'Clear'
      },
      selectors: {
        model: 'AI Model',
        tone: 'Tone',
        role: 'Role',
        agentMode: 'Agent Mode'
      },
      response: {
        title: 'Generated Response',
        copy: 'Copy',
        download: 'Download',
        regenerate: 'Regenerate'
      }
    },
    // Onboarding
    onboarding: {
      welcome: {
        title: 'Welcome to Promptly',
        description: 'Let\'s set up your profile to provide personalized prompts'
      },
      role: {
        title: 'What describes you best?',
        options: {
          developer: 'Developer',
          marketer: 'Marketer',
          founder: 'Founder',
          freelancer: 'Freelancer',
          legal: 'Legal Professional'
        }
      },
      purpose: {
        title: 'What will you use Promptly for?',
        options: {
          product_dev: 'Product Development',
          legal: 'Legal Documentation',
          technical_specs: 'Technical Specifications',
          marketing: 'Marketing Content'
        }
      },
      complete: {
        title: 'Setup Complete!',
        description: 'You\'re ready to start generating amazing prompts',
        cta: 'Go to Dashboard'
      }
    },
    // Pricing
    pricing: {
      title: 'Pricing',
      subtitle: 'Choose the plan that fits your needs',
      free: {
        title: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for getting started',
        features: [
          'Unlimited prompts',
          'All AI models',
          'Agent mode',
          'Multilingual support',
          'Community support'
        ],
        cta: 'Get Started'
      },
      comingSoon: 'Paid Plans Coming Soon'
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      retry: 'Try Again',
      save: 'Save',
      cancel: 'Cancel',
      continue: 'Continue',
      back: 'Back',
      next: 'Next',
      finish: 'Finish'
    }
  },
  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      pricing: 'Precios',
      dashboard: 'Panel',
      signIn: 'Iniciar Sesión',
      signUp: 'Registrarse',
      signOut: 'Cerrar Sesión'
    },
    // Landing Page
    landing: {
      hero: {
        title: 'De Idea a Prompt Perfecto',
        subtitle: 'Instantáneamente',
        description: 'SaaS multilingüe impulsado por IA para generación profesional de prompts con capacidades de razonamiento avanzado.',
        cta: {
          primary: 'Probar Ahora',
          secondary: 'Registrarse'
        }
      },
      howItWorks: {
        title: 'Cómo Funciona',
        step1: {
          title: 'Describe Tu Necesidad',
          description: 'Dinos qué quieres lograr'
        },
        step2: {
          title: 'IA Genera',
          description: 'Nuestra IA crea el prompt perfecto'
        },
        step3: {
          title: 'Obtén Resultados',
          description: 'Copia y usa tu prompt optimizado'
        }
      },
      agentMode: {
        title: 'Modo Agente',
        description: 'Habilita razonamiento multi-paso avanzado para tareas complejas',
        toggle: 'Probar Modo Agente'
      },
      multilingual: {
        title: 'Soporte Multilingüe',
        description: 'Genera prompts en inglés, español, francés y más'
      }
    },
    // Dashboard
    dashboard: {
      title: 'Panel',
      promptInput: {
        placeholder: 'Describe en qué necesitas ayuda...',
        generate: 'Generar',
        clear: 'Limpiar'
      },
      selectors: {
        model: 'Modelo IA',
        tone: 'Tono',
        role: 'Rol',
        agentMode: 'Modo Agente'
      },
      response: {
        title: 'Respuesta Generada',
        copy: 'Copiar',
        download: 'Descargar',
        regenerate: 'Regenerar'
      }
    },
    // Onboarding
    onboarding: {
      welcome: {
        title: 'Bienvenido a Promptly',
        description: 'Configuremos tu perfil para proporcionar prompts personalizados'
      },
      role: {
        title: '¿Qué te describe mejor?',
        options: {
          developer: 'Desarrollador',
          marketer: 'Especialista en Marketing',
          founder: 'Fundador',
          freelancer: 'Freelancer',
          legal: 'Profesional Legal'
        }
      },
      purpose: {
        title: '¿Para qué usarás Promptly?',
        options: {
          product_dev: 'Desarrollo de Productos',
          legal: 'Documentación Legal',
          technical_specs: 'Especificaciones Técnicas',
          marketing: 'Contenido de Marketing'
        }
      },
      complete: {
        title: '¡Configuración Completa!',
        description: 'Estás listo para comenzar a generar prompts increíbles',
        cta: 'Ir al Panel'
      }
    },
    // Pricing
    pricing: {
      title: 'Precios',
      subtitle: 'Elige el plan que se adapte a tus necesidades',
      free: {
        title: 'Gratis',
        price: '$0',
        period: 'para siempre',
        description: 'Perfecto para comenzar',
        features: [
          'Prompts ilimitados',
          'Todos los modelos IA',
          'Modo agente',
          'Soporte multilingüe',
          'Soporte comunitario'
        ],
        cta: 'Comenzar'
      },
      comingSoon: 'Planes Pagos Próximamente'
    },
    // Common
    common: {
      loading: 'Cargando...',
      error: 'Algo salió mal',
      retry: 'Intentar de Nuevo',
      save: 'Guardar',
      cancel: 'Cancelar',
      continue: 'Continuar',
      back: 'Atrás',
      next: 'Siguiente',
      finish: 'Finalizar'
    }
  },
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      pricing: 'Tarifs',
      dashboard: 'Tableau de Bord',
      signIn: 'Se Connecter',
      signUp: 'S\'inscrire',
      signOut: 'Se Déconnecter'
    },
    // Landing Page
    landing: {
      hero: {
        title: 'De l\'Idée au Prompt Parfait',
        subtitle: 'Instantanément',
        description: 'SaaS multilingue alimenté par IA pour la génération professionnelle de prompts avec des capacités de raisonnement avancées.',
        cta: {
          primary: 'Essayer Maintenant',
          secondary: 'S\'inscrire'
        }
      },
      howItWorks: {
        title: 'Comment Ça Marche',
        step1: {
          title: 'Décrivez Votre Besoin',
          description: 'Dites-nous ce que vous voulez accomplir'
        },
        step2: {
          title: 'L\'IA Génère',
          description: 'Notre IA crée le prompt parfait'
        },
        step3: {
          title: 'Obtenez des Résultats',
          description: 'Copiez et utilisez votre prompt optimisé'
        }
      },
      agentMode: {
        title: 'Mode Agent',
        description: 'Activez le raisonnement multi-étapes avancé pour les tâches complexes',
        toggle: 'Essayer le Mode Agent'
      },
      multilingual: {
        title: 'Support Multilingue',
        description: 'Générez des prompts en anglais, espagnol, français et plus'
      }
    },
    // Dashboard
    dashboard: {
      title: 'Tableau de Bord',
      promptInput: {
        placeholder: 'Décrivez ce dont vous avez besoin...',
        generate: 'Générer',
        clear: 'Effacer'
      },
      selectors: {
        model: 'Modèle IA',
        tone: 'Ton',
        role: 'Rôle',
        agentMode: 'Mode Agent'
      },
      response: {
        title: 'Réponse Générée',
        copy: 'Copier',
        download: 'Télécharger',
        regenerate: 'Régénérer'
      }
    },
    // Onboarding
    onboarding: {
      welcome: {
        title: 'Bienvenue sur Promptly',
        description: 'Configurons votre profil pour fournir des prompts personnalisés'
      },
      role: {
        title: 'Qu\'est-ce qui vous décrit le mieux?',
        options: {
          developer: 'Développeur',
          marketer: 'Spécialiste Marketing',
          founder: 'Fondateur',
          freelancer: 'Freelance',
          legal: 'Professionnel Juridique'
        }
      },
      purpose: {
        title: 'Pour quoi utiliserez-vous Promptly?',
        options: {
          product_dev: 'Développement de Produits',
          legal: 'Documentation Juridique',
          technical_specs: 'Spécifications Techniques',
          marketing: 'Contenu Marketing'
        }
      },
      complete: {
        title: 'Configuration Terminée!',
        description: 'Vous êtes prêt à commencer à générer d\'incroyables prompts',
        cta: 'Aller au Tableau de Bord'
      }
    },
    // Pricing
    pricing: {
      title: 'Tarifs',
      subtitle: 'Choisissez le plan qui correspond à vos besoins',
      free: {
        title: 'Gratuit',
        price: '0€',
        period: 'pour toujours',
        description: 'Parfait pour commencer',
        features: [
          'Prompts illimités',
          'Tous les modèles IA',
          'Mode agent',
          'Support multilingue',
          'Support communautaire'
        ],
        cta: 'Commencer'
      },
      comingSoon: 'Plans Payants Bientôt Disponibles'
    },
    // Common
    common: {
      loading: 'Chargement...',
      error: 'Quelque chose s\'est mal passé',
      retry: 'Réessayer',
      save: 'Sauvegarder',
      cancel: 'Annuler',
      continue: 'Continuer',
      back: 'Retour',
      next: 'Suivant',
      finish: 'Terminer'
    }
  }
}

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.')
  let value: any = translations[locale]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

export function useTranslation(locale: Locale) {
  return {
    t: (key: string) => getTranslation(locale, key),
    locale,
    locales,
    languages
  }
}