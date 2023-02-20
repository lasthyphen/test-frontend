import { useTheme } from 'common/Providers'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

const home = [
  [
    {
      label: 'Home',
      icon: '/img/icons/menu/home',
      href: '/',
      level: 'home',
    },
    {
      label: 'Quickstart',
      icon: '/img/icons/menu/getting-started',
      href: '/guides/getting-started',
      level: 'gettingstarted',
    },
  ],
  [
    {
      label: 'Public API Server',
      icon: '/img/icons/menu/database',
      href: '/guides/public-api',
      level: 'apii',
    },
    {
      label: 'Postman APIs',
      icon: '/img/icons/menu/auth',
      href: '/guides/postman-api',
      level: 'auth',
    },
    {
      label: 'APIs',
      icon: '/img/icons/menu/functions',
      href: '/guides/node-apis',
      level: 'functions',
    },
    {
      label: 'Nodes',
      icon: '/img/icons/menu/nodes',
      href: '/guides/nodes',
      level: 'nodes',
    },
    {
      label: 'DijetsJS',
      icon: '/img/icons/menu/dijetsjs',
      href: '/guides/dijetsjs',
      level: 'dijetsjs',
    },
  ],
  [
    {
      label: 'DApps',
    },
    {
      label: 'Launch DApps on Dijets',
      icon: '/img/icons/menu/icons-docs',
      href: '/guides/launch-dapps-on-uc',
      level: 'reference_javascript',
    },
    {
      label: 'Developer Toolchains',
      icon: '/img/icons/menu/icons-docs',
      href: '/guides/developer-toolchains',
      level: 'reference_javascript',
    },
    {
      label: 'Non Fungible Tokens (NFTs)',
      icon: '/img/icons/menu/icons-docs',
      href: '/guides/nfts',
      level: 'reference_javascript',
    },
    {
      label: 'NFTs Metadata',
      icon: '/img/icons/menu/icons-docs',
      href: '/guides/nft-metadata',
      level: 'reference_javascript',
    },
  ],
  [
    {
      label: 'Smart Contracts',
    },
    {
      label: 'Overview',
      icon: '/img/icons/menu/icons-docs',
      href: '/guides/smart-contracts',
      level: 'reference_javascript',
    },
    {
      label: 'Creating an ERC-20 Token',
      icon: '/img/icons/menu/icons-docs',
      href: '/guides/erc20-contract',
      level: 'reference_javascript',
    },
    {
      label: 'Add Dijets Network to your DApp',
      icon: '/img/icons/menu/icons-docs',
      href: '/guides/add-dijets-programmatically',
      level: 'reference_javascript',
    },
  ],
  [
    {
      label: 'Specs & Formats',
    },
    {
      label: 'Transaction Format',
      icon: '/img/icons/menu/storage',
      href: '/guides/transaction-format',
      level: 'storage',
    },
    {
      label: 'Cryptographic Primitives',
      icon: '/img/icons/menu/storage',
      href: '/guides/cryptographic-primitives',
      level: 'storage',
    },
    {
      label: 'Serialisation Primitives',
      icon: '/img/icons/menu/storage',
      href: '/guides/serialisation-primitives',
      level: 'storage',
    },
    {
      label: 'Atomic Transactions',
      icon: '/img/icons/menu/storage',
      href: '/guides/atomic-transaction-format',
      level: 'storage',
    },
  ],
  [
    {
      label: 'Enterprise Consortia Chains',
    },
    {
      label: 'ECC Overview',
      icon: '/img/icons/menu/icons-docs',
      href: '/guides/ecc-overview',
      level: 'reference_javascript',
    },
    {
      label: 'ECC Lifecycle',
      icon: '/img/icons/menu/icons-docs',
      href: '/guides/ecc-lifecycle',
      level: 'reference_javascript',
    },
    {
      label: 'Build an ECC',
      icon: '/img/icons/menu/icons-docs',
      href: '/guides/build-ecc',
      level: 'reference_javascript',
    },
    {
      label: 'Deploy an ECC',
      icon: '/img/icons/menu/icons-docs',
      href: '/reference/cli/introduction',
      level: 'reference_javascript',
    },
  ],
]

const NavigationMenuHome = ({ active }) => {
  const router = useRouter()
  const { isDarkMode } = useTheme()

  return (
    <div
      className={[
        'transition-all duration-150 ease-out',
        active ? 'opacity-100 ml-0 delay-150' : 'opacity-0 -ml-8 invisible absolute',
      ].join(' ')}
    >
      <ul className="relative w-full flex flex-col gap-4">
        {home.map((section, sectionIndex) => {
          return (
            <Fragment key={`section-container-${sectionIndex}-border`}>
              {sectionIndex !== 0 && (
                <div
                  className="h-px w-full bg-blackA-300 dark:bg-whiteA-300"
                  key={`section-${sectionIndex}-border`}
                ></div>
              )}
              <div key={`section-${sectionIndex}`}>
                <div className="flex flex-col gap-3">
                  {section.map((link) => {
                    if (!link.href) {
                      return (
                        <span
                          key={link.label}
                          className="font-mont uppercase text-xs text-scale-900"
                        >
                          {link.label}
                        </span>
                      )
                    } else {
                      return (
                        <Link href={link.href} passHref key={link.label}>
                          <a>
                            <li
                              className={[
                                'group flex items-center gap-3',
                                'text-sm transition-all duration-150 text-scale-1200 hover:text-brand-900 hover:cursor-pointer ',
                              ].join(' ')}
                            >
                              <Image
                                alt={link.label}
                                src={`${router.basePath}${
                                  isDarkMode ? link.icon : `${link.icon}-light`
                                }${!link.icon.includes('png') ? '.svg' : ''}`}
                                width={17}
                                height={17}
                                className="w-4 h-4 group-hover:scale-110 ease-out transition-all"
                                />
                                {link.label}
                            </li>
                          </a>
                        </Link>
                      )
                    }
                  })}
                </div>
              </div>
            </Fragment>
          )
        })}
      </ul>
    </div>
  )
}

export default NavigationMenuHome
