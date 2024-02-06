// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {VaccinationByAgesDetails} = props

  return (
    <div className="coverage-container">
      <h1 className="coverage-heading">Vaccination by Age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="70%"
          data={VaccinationByAgesDetails}
          innerRadius="0%"
          outerRadius="50%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above-60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 14, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
