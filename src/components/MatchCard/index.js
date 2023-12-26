import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {result, matchStatus, competingTeamLogo, competingTeam} = matchDetails

  const matchStatusClass = matchStatus === 'Won' ? 'won' : 'lost'

  return (
    <li className="match-card-list-item">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="team-logo"
      />
      <p className="competing-team-recent">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={matchStatusClass}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
