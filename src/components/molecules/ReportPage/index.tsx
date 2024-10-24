import tw from "tailwind-styled-components"
import AvvaLogo from '../../../assets/avva-logo.svg?react'
import { FC, PropsWithChildren, useMemo } from "react"
import { useReportState } from '../../../create-store'
import moment from 'moment'

const PageContainer = tw.div`
  flex
  flex-col
  w-[21cm]
  min-w-[21cm]
  max-w-[21cm]
  h-[29.7cm]
  min-h-[29.7cm]
  max-h-[29.7cm]
  m-auto
  shadow-none
  relative
`

interface ReportPageProps {
  pageNumber?: number
  totalPages?: number
}

const ReportPage: FC<ReportPageProps & PropsWithChildren> = (props) => {
  const { children, totalPages, pageNumber } = props
  const header = useReportState(state => state.header)

  const avvaCreatedAtFormatted = useMemo(() => {
    if (header?.avvaCreatedAt) {
      const date = moment(header?.avvaCreatedAt).utc().format('DD/MM/YYYY')
      const hour = moment(header?.avvaCreatedAt).utc().format('HH:mm')
      return `${date} às ${hour}`
    }
    return ''
  }, [header?.avvaCreatedAt])

  return(
    <>
      <PageContainer>
        <div className="header-container h-56 min-h-56 max-h-56">
          <div className="flex items-center justify-between h-24 px-6">
            <div>
              <AvvaLogo className="w-44" />
            </div>
            <div>
              <img className="w-44"
                   src="data:image/png;base64,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"
                   alt="" />
            </div>
          </div>

          <hr className="border-avva-red border-2" />

          <div className="sub-header-content py-4 px-6 flex flex-col space-y-2">
            <div className="title-container">
              <p className="font-bold text-lg">
                { header?.contractorName }
              </p>
            </div>

            <div className="texts-container flex items-center justify-between">
              <div className="left-text">
                <p>
                  Avaliado: <span className="font-medium">{ header?.customerName }</span>
                </p>
                <p>
                  Data de nascimento:&nbsp;
                  <span className="font-medium">
                    { moment(header?.customerBirthDate).utc().format('DD/MM/YYYY') }
                  </span>
                </p>
              </div>
              <div className="right-text">
                <p>
                  Avaliador: <span className="font-medium">{ header?.userFullName }</span>
                </p>
                <p>
                  Data e horário: <span className="font-medium">{ avvaCreatedAtFormatted }</span>
                </p>
              </div>
            </div>

            <hr className="border-1 border-black"/>
          </div>
        </div>

        <div className="page-content h-full max-h-[calc(100%-15.5rem)] px-6 pt-2">
          { children }
        </div>

        <div className="footer-container h-6 bg-avva-red absolute bottom-0 w-[21cm] flex items-center justify-center">
          <p className="text-sm text-center text-white">
            { pageNumber }/{ totalPages }
          </p>
        </div>
      </PageContainer>
    </>
  )
}

export default ReportPage