import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch'
import './index.css'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {isLoading: true, teamMatchesData: {}, teamId: ''}

  componentDidMount() {
    this.getTeamMatchesData()
  }

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({teamId: id})

    const formatData = data => ({
      id: data.id,
      umpires: data.umpires,
      result: data.result,
      manOfTheMatch: data.man_of_the_match,
      date: data.date,
      venue: data.venue,
      competingTeam: data.competing_team,
      competingTeamLogo: data.competing_team_logo,
      firstInnings: data.first_innings,
      secondInnings: data.second_innings,
      matchStatus: data.match_status,
    })

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const teamMatchesData = await response.json()
    const formattedTeamsData = {
      teamBannerUrl: teamMatchesData.team_banner_url,
      latestMatchDetails: {
        id: teamMatchesData.latest_match_details.id,
        umpires: teamMatchesData.latest_match_details.umpires,
        result: teamMatchesData.latest_match_details.result,
        manOfTheMatch: teamMatchesData.latest_match_details.man_of_the_match,
        date: teamMatchesData.latest_match_details.date,
        venue: teamMatchesData.latest_match_details.venue,
        competingTeam: teamMatchesData.latest_match_details.competing_team,
        competingTeamLogo:
          teamMatchesData.latest_match_details.competing_team_logo,
        firstInnings: teamMatchesData.latest_match_details.first_innings,
        secondInnings: teamMatchesData.latest_match_details.second_innings,
        matchStatus: teamMatchesData.latest_match_details.match_status,
      },
      recentMatches: teamMatchesData.recent_matches.map(each =>
        formatData(each),
      ),
    }

    this.setState({isLoading: false, teamMatchesData: formattedTeamsData})
  }

  render() {
    const {teamMatchesData, isLoading, teamId} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchesData

    const renderLoader = () => (
      <div data-testid="loader" className="loader-container">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    )

    const renderLatestMatch = () => (
      <div className={`team-matches-container ${teamId.toLowerCase()}`}>
        <img src={teamBannerUrl} alt="team banner" className="banner-image" />
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        <ul className="ul-match-cards">
          {recentMatches.map(each => (
            <MatchCard matchDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
    return <>{isLoading ? renderLoader() : renderLatestMatch()}</>
  }
}

export default TeamMatches
