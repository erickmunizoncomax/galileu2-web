import ReportPage from '../../../components/molecules/ReportPage'
import AvvaReportFirstPage from '../../../components/templates/AvvaReportFirstPage'
import AvvaReportSecondPage from '../../../components/templates/AvvaReportSecondPage'
import AvvaReportThirdPage from '../../../components/templates/AvvaReportThirdPage'
import AvvaReportFourthPage from '../../../components/templates/AvvaReportFourthPage'
import AvvaReportFifthPage from '../../../components/templates/AvvaReportFifthPage'
import { Fragment, useMemo } from 'react'
import { useReportState } from '../../../create-store'

const AvvaReportPage = () => {
  const { loadReportDataFromStorage } = useReportState.getState()
  const pages = useMemo(() => {
    return [
      <AvvaReportFirstPage />,
      <AvvaReportSecondPage />,
      <AvvaReportThirdPage />,
      <AvvaReportFourthPage />,
      <AvvaReportFifthPage />
    ]
  }, [])

  useMemo(() => {
    loadReportDataFromStorage()
  }, [])

  return (
    <>
      <div className="print-container w-[21cm] my-0 mx-auto">
        {
          pages.map((page, index, arr) => (
            <Fragment key={index}>
              <ReportPage pageNumber={index + 1}
                          totalPages={arr.length}>
                { page }
              </ReportPage>

              { index !== arr.length - 1 && <div className="page-break-before-always" /> }
            </Fragment>
          ))
        }
      </div>
    </>
  )
}

export default AvvaReportPage