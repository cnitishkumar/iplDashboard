import './index.css'

const LatestMatch = matchDetails => {
  const {latestMatchDetails} = matchDetails
  const {
    firstInnings,
    secondInnings,
    result,
    umpires,
    manOfTheMatch,
    venue,
    competingTeam,
    date,
    competingTeamLogo,
  } = latestMatchDetails

  return (
    <>
      <h1 className="latest-match-heading">Latest Matches</h1>
      <div className="latest-match-container">
        <div className="sub-div-1">
          <div>
            <p className="competing-team-name">{competingTeam}</p>
            <p className="date">{date}</p>
            <p className="venue">{venue}</p>
            <p className="result">{result}</p>
          </div>
          <img
            src={competingTeamLogo}
            className="competing-team-logo"
            alt={`latest match ${competingTeam}`}
          />
        </div>

        <hr className="hr" />
        <div className="sub-div-2">
          <p className="innings">First Innings</p>
          <p className="innings-count">{firstInnings}</p>
          <p className="innings">Second Innings</p>
          <p className="innings-count">{secondInnings}</p>
          <p className="innings-count">Man Of The Match</p>
          <p className="umpires">{manOfTheMatch}</p>
          <p className="umpires">{umpires}</p>
        </div>
      </div>
    </>
  )
}

export default LatestMatch
