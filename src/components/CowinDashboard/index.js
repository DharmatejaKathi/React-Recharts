// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {vaccinationDetails: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(range => ({
          vaccinationDate: range.vaccine_date,
          dose1: range.dose_1,
          dose2: range.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(type => ({
          age: type.age,
          count: type.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(each => ({
          count: each.count,
          gender: each.gender,
        })),
      }
      this.setState({
        vaccinationDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="coverage-heading">Something went wrong</h1>
    </div>
  )

  renderCharts = () => {
    const {vaccinationDetails} = this.state

    return (
      <>
        <VaccinationCoverage
          VaccinationCoverageDetails={vaccinationDetails.last7DaysVaccination}
        />
        <VaccinationByGender
          VaccinationByGenderDetails={vaccinationDetails.vaccinationByGender}
        />
        <VaccinationByAge
          VaccinationByAgesDetails={vaccinationDetails.vaccinationByAge}
        />
      </>
    )
  }

  renderFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderCharts()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="dash-board-container">
        <div className="content-container">
          <div className="header">
            <img
              className="website-img"
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
            />
            <h1 className="heading">Co-Win</h1>
          </div>
          <h1 className="title">CoWin Vaccination in india</h1>
          {this.renderFinalView()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
