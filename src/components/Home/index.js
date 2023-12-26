import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {teamsData: [], isLoading: true}

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data
    const formattedData = teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))

    this.setState({teamsData: formattedData, isLoading: false})
  }

  render() {
    const {isLoading, teamsData} = this.state

    const renderLoader = () => (
      <div data-testid="loader" className="loader-container">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )

    const renderTeams = () => (
      <ul className="teams-ul-el">
        {teamsData.map(each => (
          <TeamCard teamDetails={each} key={each.id} />
        ))}
      </ul>
    )

    return (
      <div className="app-container">
        <div className="ipl-header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt=" ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-heading">IPL Dashboard</h1>
        </div>

        <div className="teams-container">
          {isLoading ? renderLoader() : renderTeams()}
        </div>
      </div>
    )
  }
}

export default Home
