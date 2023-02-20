import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

export type FooterHelpCalloutType = 'default' | 'postgres'

const content = {
  default: {
    title: 'Need some help?',
    description: `You can join Dijets Support Space for a live chat with one of the team members. Join us on  [Qowalts](https://redirect.dijets.io/#/#dijets-support:dijets.org).`,
  },
  postgres: {
    title: 'Need some help?',
    description: `You can join Dijets Support Space for a live chat with one of the team members. Join us on  [Qowalts](https://redirect.dijets.io/#/#dijets-support:dijets.org).`,
  },
}

const FooterHelpCallout = ({
  footerHelpType = 'default',
  title,
}: {
  footerHelpType: FooterHelpCalloutType
  title: any
}) => {
  return (
    <div className="mt-32 prose prose--remove-p-margin max-w-none">
      <div
        className="
        min-w-full 
        px-8 py-6 
        bg-scale-300 dark:bg-whiteA-200 
        rounded 
        text-sm text-scale-900
      "
      >
        <h5 className="text-sm text-scale-1100 m-0">{content[footerHelpType].title}</h5>
        <ReactMarkdown>{content[footerHelpType].description}</ReactMarkdown>
      </div>
    </div>
  )
}

export default FooterHelpCallout
