import type { CreateCompletionResponse } from 'openai'
import { FC, useCallback, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SSE } from 'sse.js'
import clippyImageDark from '../../public/img/clippy-dark.png'
import clippyImage from '../../public/img/clippy.png'

import { useTheme } from 'common/Providers'
import Image from 'next/image'
import {
  Button,
  IconAlertCircle,
  IconAlertTriangle,
  IconLoader,
  IconSearch,
  Input,
  Loading,
  Modal,
} from 'ui'
import components from '~/components'

type Props = {
  onClose?: () => void
}

const questions = [
  'How do I get started with Dijets?',
  'How do I run Dijets Node locally?',
  'How do I connect to Dijets Mainnet?',
  'How do I make calls to Dijets Node? ',
  'How do I check a nodes health?',
  'What is an ECC?',
]

function getEdgeFunctionUrl() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '')
  const isPlatform = supabaseUrl?.match(/(supabase\.co)|(supabase\.in)/)

  if (isPlatform) {
    const [schemeAndProjectId, domain, tld] = supabaseUrl.split('.')
    return `${schemeAndProjectId}.functions.${domain}.${tld}`
  } else {
    return `${supabaseUrl}/functions/v1`
  }
}

const edgeFunctionUrl = getEdgeFunctionUrl()

const ClippyModal: FC<Props> = ({ onClose }) => {
  const { isDarkMode } = useTheme()
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResponding, setIsResponding] = useState(false)
  const [hasError, setHasError] = useState(false)

  const cantHelp = answer?.trim() === "Sorry, I don't know how to help with that."
  const status = isLoading
    ? 'DijetsAI is searching...'
    : isResponding
    ? 'DijetsAI is responding...'
    : cantHelp || hasError
    ? 'DijetsAI is still learning'
    : undefined

  const handleConfirm = useCallback(async (query: string) => {
    setHasError(false)
    setAnswer(undefined)
    setIsLoading(true)

    const eventSource = new SSE(`${edgeFunctionUrl}/clippy-search`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify({ query }),
    })

    function handleError<T>(err: T) {
      setIsLoading(false)
      setIsResponding(false)
      setHasError(true)
      console.error(err)
    }

    eventSource.addEventListener('error', handleError)
    eventSource.addEventListener('message', (e) => {
      try {
        setIsLoading(false)

        if (e.data === '[DONE]') {
          setIsResponding(false)
          return
        }

        setIsResponding(true)

        const completionResponse: CreateCompletionResponse = JSON.parse(e.data)
        const [{ text }] = completionResponse.choices

        setAnswer((answer) => {
          return (answer ?? '') + text
        })
      } catch (err) {
        handleError(err)
      }
    })

    eventSource.stream()

    setIsLoading(true)
  }, [])

  function handleResetPrompt() {
    setQuery('')
    setAnswer(undefined)
    setIsResponding(false)
    setHasError(false)
  }

  return (
    <Modal size="xlarge" visible={true} onCancel={onClose} closable={false} hideFooter>
      <div
        className={`mx-auto max-h-[50vh] lg:max-h-[75vh] flex flex-col gap-4 rounded-lg p-4 md:pt-6 md:px-6 pb-2 w-full shadow-2xl overflow-hidden border text-left border-scale-500 bg-scale-100 dark:bg-scale-300 cursor-auto relative min-w-[340px]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Input
            className="w-full"
            size="xlarge"
            autoFocus
            placeholder="Ask me anything about Dijets"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<IconSearch size="small" />}
            onKeyDown={(e) => {
              switch (e.key) {
                case 'Enter':
                  handleConfirm(query)
                  return
                default:
                  return
              }
            }}
          />
          <div className="absolute right-0 top-0 mt-3 mr-4 hidden md:block">
            <Button type="default" size="tiny" onClick={onClose}>
              esc
            </Button>
          </div>
          {!isLoading && answer && (
            <div className="absolute right-0 top-0 mt-3 mr-16 hidden md:block">
              <Button type="text" size="tiny" onClick={handleResetPrompt}>
                Try again
              </Button>
            </div>
          )}
        </div>

        {!isLoading && !answer && !hasError && (
          <div className="">
            <div className="mt-2">
              <h2 className="text-sm text-scale-1100">Not sure where to start?</h2>

              <ul className="text-sm mt-4 text-scale-1100 grid md:flex gap-4 flex-wrap max-w-3xl">
                {questions.map((question) => (
                  <li>
                    <button
                      className="hover:bg-slate-400 hover:dark:bg-slate-400 px-4 py-2 bg-slate-300 dark:bg-slate-200 rounded-lg transition-colors"
                      onClick={() => {
                        setQuery(question)
                        handleConfirm(question)
                      }}
                    >
                      {question}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {answer && (
          <div className="px-4 py-4 rounded-lg overflow-y-auto bg-scale-200">
            {cantHelp ? (
              <p className="flex flex-col gap-4 items-center p-4">
                <div className="grid md:flex items-center gap-2 mt-4 text-center justify-items-center">
                  <IconAlertCircle />
                  <p>Sorry, I do not know the answer to that. I have noted down your query &amp; will ask the Developers
                    to add it to my learning libraries.</p>
                </div>
                <Button size="tiny" type="secondary" onClick={handleResetPrompt}>
                  Try again?
                </Button>
              </p>
            ) : (
              <div className="prose dark:prose-dark">
                <ReactMarkdown
                  linkTarget="_blank"
                  remarkPlugins={[remarkGfm]}
                  transformLinkUri={(href) => {
                    const supabaseUrl = new URL('https://docs-greyhyphen.vercel.app')
                    const linkUrl = new URL(href, 'https://docs-greyhyphen.vercel.app')

                    if (linkUrl.origin === supabaseUrl.origin) {
                      return linkUrl.toString()
                    }

                    return href
                  }}
                  components={components}
                >
                  {answer}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
        {isLoading && (
          <div className="p-6 grid gap-6 mt-4">
            <Loading active>{}</Loading>
            <p className="text-lg text-center">Searching for results</p>
          </div>
        )}
        {hasError && (
          <div className="p-6 flex flex-col items-center gap-6 mt-4">
            <IconAlertTriangle strokeWidth={1.5} size={40} />
            <p className="text-lg text-center">Sorry, looks like DijetsAI is having a hard time!</p>
            <p className="text-sm text-center">Please try again in a bit.</p>
            <Button size="tiny" type="secondary" onClick={handleResetPrompt}>
              Try again?
            </Button>
          </div>
        )}
        <div className="border-t border-scale-600 mt-4 text-scale-1100">
          <div className="flex justify-between items-center py-2 text-xs">
            <div className="flex items-centerp gap-1 pt-3 pb-1">
              <span>Powered by Dijets Method Chain</span>
            </div>
            <div className="flex items-center gap-6 py-1">
              {status ? (
                <span className="bg-scale-400 rounded-lg py-1 px-2 items-center gap-2 hidden md:flex">
                  {(isLoading || isResponding) && <IconLoader size={14} className="animate-spin" />}
                  {status}
                </span>
              ) : (
                <></>
              )}
              <Image
                width={34}
                height={34}
                src={isDarkMode ? clippyImageDark : clippyImage}
                alt="Clippy"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ClippyModal
