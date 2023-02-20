import Image from 'next/image'
import Link from 'next/link'
import { Button, IconGitHub, IconTwitter } from '~/../../packages/ui'
import footerData from '~/data/footer.json'
import { useTheme } from 'common/Providers'

const Footer = () => {
  const { isDarkMode } = useTheme()
  return (
    <div>
      <hr className="border-scale-400  mt-8"></hr>
      <div className="flex gap-4 items-center mt-6 justify-between">
        <div className="flex flex-col lg:flex-row gap-3 ">
          <span className="text-xs text-scale-900">Dijets Inc. 2023</span>
          <span className="text-xs text-scale-900">—</span>
          {footerData.map((item) => (
            <Link href={item.url} key={item.url}>
              <a className="text-xs text-scale-800 hover:underline">{item.title}</a>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="text"
            as="a"
            // @ts-ignore
            href="https://twitter.com/OfficialDijets"
            target="_blank"
            rel="noreferrer noopener"
          >
            <IconTwitter size={16} />
          </Button>
          <Button
            type="text"
            as="a"
            // @ts-ignore
            href="https://qowalts.dijets.io"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Image
                className="cursor-pointer"
                src={isDarkMode ? '/docs/img/qowalts-icon.svg' : '/docs/img/qowalts-icon.svg'}
                width={22}
                height={20}
                alt="Qowalts Icon"
              />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Footer
