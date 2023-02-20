import { FC } from 'react'

type IParamProps = any

const Param: FC<IParamProps> = (paramItem) => {
  return (
    <li className="border-b py-5 flex flex-col gap-3">
      <div className="flex gap-3 items-center">
        <span className="text-sm font-mono text-scale-1200">
          {paramItem.name ?? 'no-name'}
        </span>
        <span>
          {paramItem.isOptional ? (
            <div className="text-[10px] px-3 tracking-wide text-scale-900">Optional</div>
          ) : (
            <div className="text-[10px] border border-amber-700 bg-amber-300 text-amber-900 px-2 tracking-wide font-mono py-0.25 rounded-full">
              REQUIRED
            </div>
          )}
        </span>
        <span className="text-[10px] tracking-wide text-scale-900">{paramItem.type ?? 'no type'}</span>
      </div>
      {paramItem.description && (
        <p className="text-sm text-scale-1000 m-0">{paramItem.description} </p>
      )}
      {paramItem.children}
    </li>
  )
}

export default Param
