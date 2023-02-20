import { FC, useState } from 'react'
import { IconXCircle } from '~/../../packages/ui'

interface IOptions {
  name?: string
}

type IOption = any

type OptionsSubComponents = {
  Option: IOption
}

const Options: FC<IOptions> & OptionsSubComponents = (props) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-0">
      <button
        className={[
          'px-5',
          'border-t border-l border-r border-scale-500',
          'text-left text-sm text-scale-1100',
          'hover:bg-scale-300 transition-all',

          'flex items-center gap-2',
          open ? 'w-full py-1.5 rounded-tl-lg rounded-tr-lg' : 'py-1 border-b rounded-full',
        ].join(' ')}
        onClick={() => setOpen(!open)}
      >
        <div className="">
          <div className={[!open ? 'rotate-45' : 'rotate-0'].join(' ')}>
            <IconXCircle size={14} />
          </div>
        </div>
        {`${!open ? `Open` : `Close`} ${props.name ?? 'example usage'}`}
      </button>
      <div
        className={['transition-all opacity-0', open ? 'opacity-100 h-auto' : 'invisible h-0'].join(
          ' '
        )}
      >
        {props.children}
      </div>
    </div>
  )
}

const Option: FC<IOption> = (props) => {
  return (
    <div
      className="
        px-5 py-3 first:border-t border-b border-l border-r
        border-scale-500
        last:rounded-bl-lg last:rounded-br-lg
        flex flex-row
      "
    >
    <span className="text-sm text-scale-1200 font-mono font-medium">
      $
    </span>
      <div className="flex gap-1 items-center">
        <span>
          {props.isOptional ? (
            <div className="text-[10px] px-3 tracking-wide font-mono text-scale-900">Optional</div>
          ) : (
            <div className="text-[10px] bg-amber-300 text-amber-900 px-2 tracking-wide font-mono py-0.25 rounded-full">
            </div>
          )}
        </span>
        <span className="text-scale-900 text-xs">{props.type ?? 'no type'}</span>
      </div>

      {props.description && <p className="text-sm text-scale-1000 m-0">{props.description}</p>}

      {props.children}
    </div>
  )
}

Options.Option = Option

export default Options
