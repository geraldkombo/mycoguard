import { publicPages } from '../../content/publicContent'

export const publicNavItems = publicPages.filter((page) => page.path !== '/privacy')

export const relatedLinks: Record<string, { href: string; label: string }[]> = {
  '/about-aflatoxin': [
    { href: '/one-health', label: 'See the One Health framing' },
    { href: '/how-it-works', label: 'See how the product works' },
    { href: '/faq', label: 'Read the FAQ' },
  ],
  '/one-health': [
    { href: '/for-cooperatives', label: 'Why cooperatives matter' },
    { href: '/for-extension-teams', label: 'Why extension teams matter' },
    { href: '/app', label: 'Open the app workspace' },
  ],
  '/how-it-works': [
    { href: '/app', label: 'Open the app workspace' },
    { href: '/faq', label: 'Read the FAQ' },
    { href: '/for-extension-teams', label: 'See extension team use cases' },
  ],
  '/for-cooperatives': [
    { href: '/app', label: 'See the app structure' },
    { href: '/faq', label: 'Read the FAQ' },
  ],
  '/for-extension-teams': [
    { href: '/app', label: 'See the app structure' },
    { href: '/faq', label: 'Read the FAQ' },
  ],
  '/faq': [
    { href: '/', label: 'Go to the homepage' },
    { href: '/how-it-works', label: 'See how the product works' },
    { href: '/app', label: 'Open the app workspace' },
  ],
  '/privacy': [
    { href: '/', label: 'Go to the homepage' },
    { href: '/faq', label: 'Read the FAQ' },
  ],
}
