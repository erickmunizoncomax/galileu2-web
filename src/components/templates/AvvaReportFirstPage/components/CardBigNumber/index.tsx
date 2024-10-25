import { FC } from 'react'

interface CardBigNumberProps {
  Icon: FC<any>
  label: string
  value?: number
  unit: string
  color: string
}

const CardBigNumber: FC<CardBigNumberProps> = (props) => {
  const { label, unit, value, Icon, color: backgroundColor } = props

  return (
    <>
      <div className="card-big-number-container flex flex-col items-center justify-center w-28 h-24 rounded-lg"
           style={{ backgroundColor }}>
        <div className="icon-container">
          <Icon />
        </div>
        <div className="text-container">
          <p className="leading-none text-center">
            { label }
          </p>
          <p className="leading-none text-center">
            { value } { unit }
          </p>
        </div>
      </div>
    </>
  )
}

export default CardBigNumber