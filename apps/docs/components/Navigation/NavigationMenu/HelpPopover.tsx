import {
  Button,
  IconHelpCircle,
  IconMail,
  IconMessageCircle,
  Popover,
  IconBookOpen,
  IconActivity,
} from 'ui'
import { useRouter } from 'next/router'
import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import SVG from 'react-inlinesvg'

interface Props {}

const HelpPopover: FC<Props> = () => {
  const router = useRouter()

  return (
    <Popover
      size="content"
      align="end"
      side="bottom"
      sideOffset={8}
      overlay={
        <div className="my-4 w-96 space-y-4">
          <div className="my-5 space-y-4 px-5">
            <h5 className="text-scale-1200">Buulding a DApp on Dijets?</h5>
            <p className="text-sm text-scale-900">
              For issues with DApp development on Dijets, or any other queries.
            </p>
            <div className="space-x-1">
              <Link passHref href="https://dijets.io">
                <a target="_blank" rel="noreferrer">
                  <Button type="text" size="tiny" icon={<IconActivity />}>
                    Dijets Network Status
                  </Button>
                </a>
              </Link>
            </div>
            <p className="text-sm text-scale-900">
              Expected response time is based on the support space queue on Qowalts.
            </p>
          </div>
          <Popover.Separator />
          <div className="mb-4 space-y-2">
            <div className="mb-4 px-5">
              <h5 className={'mb-2'}>Reach out to Dijets Devs</h5>

              <p className="text-sm text-scale-900">
                For other support, including questions on our client libraries, advice, or best
                practices.
              </p>
            </div>
            <div className="px-5">
              <div
                className="relative space-y-2 overflow-hidden rounded px-5 py-4 pb-12 shadow-md"
                style={{ background: '#404EED' }}
              >
                <a
                  href="https://qowalts.dijets.io"
                  target="_blank"
                  className="dark block cursor-pointer" rel="noreferrer"
                >
                  <Image
                    className="absolute left-0 top-0 opacity-50"
                    src={'/docs/img/discord-bg-small.jpg'}
                    layout="fill"
                    objectFit="cover"
                    alt="discord illustration header"
                  />
                  <Button
                    type="secondary"
                    icon={<SVG src={`/docs/img/qowalts.svg`} className="h-4 w-4" />}
                  >
                    <span style={{ color: '#404EED' }}>Join Qowalts</span>
                  </Button>
                </a>
              </div>
            </div>
            <div className="px-5">
              <div className="relative space-y-2 overflow-hidden rounded px-5 py-4 pb-12 shadow-md">
                <a
                  href="#"
                  target="_blank"
                  className="block cursor-pointer" rel="noreferrer"
                >
                  <Image
                    className="absolute left-0 top-0 opacity-50"
                    src={'/docs/img/github-bg.jpg?v-1'}
                    layout="fill"
                    objectFit="cover"
                    alt="discord illustration header"
                  />
                  <Button type="secondary" icon={<IconMessageCircle />}>
                    Developer Discussions
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <Button
        as="span"
        type="default"
        icon={<IconHelpCircle size={16} strokeWidth={1.5} className="text-scale-900" />}
      >
        Dev Help
      </Button>
    </Popover>
  )
}

export default HelpPopover
