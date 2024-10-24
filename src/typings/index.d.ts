type Risk = 'very-high' | 'high' | 'normal' | 'low' | 'very-low'

type Quintile = {
  limit: number
  risk?: Risk
}

type AnalysisMetric = {
  value: number
  risk: Risk
  quintiles: Quintile[]
}

type Analysis = {
  avarage: AnalysisMetric
  fatPercentage: AnalysisMetric
  visceralFatArea: AnalysisMetric
  waistToHeightRatio: AnalysisMetric
}

type Avatar = {
  backPicture: string
  frontPicture: string
  sidePicture: string
}

type Header = {
  contractorName: string
  customerName: string
  customerBirthDate: string
  avvaCreatedAt: string
  userFullName: string
}

type Customer = {
  gender: 'male' | 'female'
  bodyVolume: number
  age: number
  weight: number
  height: number
  bmi: number
}

type AvvaReport = {
  avarageRisk: {
    title: string
    subtitle: string
  }
  visceralFatAreaRisk: {
    title: string
    subtitle: string
    classification: string
  }
  waistToHeightRatioRisk: {
    title: string
    subtitle: string
    classification: string
  }
  fatPercentageRisk: {
    title: string
    subtitle: string
    classification: string
  }
}

type ReportData = {
  header: Header
  customer: Customer
  avatar: Avatar
  analysis: Analysis
  report: AvvaReport
}
