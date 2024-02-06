// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const vaccinationCoverage = props => {
  const dataFormate = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  const {VaccinationCoverageDetails} = props

  return (
    <div className="coverage-container">
      <h1 className="coverage-heading">Vaccination Coverage</h1>
      <BarChart
        width={900}
        height={400}
        data={VaccinationCoverageDetails}
        margin={{top: 5}}
      >
        <XAxis
          dataKey="vaccinationDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
            fontSize: 16,
            fontFamily: 'Roboto',
          }}
        />

        <YAxis
          tickFormatter={dataFormate}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0.6,
            fontSize: 16,
            fontFamily: 'Roboto',
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign: 'center',
            fontSize: 13,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          radius={[10, 10, 0, 0]}
          barSize="20%"
        />

        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          radius={[5, 5, 0, 0]}
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}

export default vaccinationCoverage
