import React, { useState, useEffect } from 'react';
import './BackupAttendanceForm.css';
import { getTeamsData, updateTeamData } from '../data/Data';

const BackupAttendanceForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const data = getTeamsData();
    setTeams(data);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTeams = teams.filter(team =>
    team.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.team_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.member.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const handleAttendanceToggle = (team) => {
    const updatedTeams = updateTeamData(team.team_code, !team.is_present);
    setTeams(updatedTeams);
    setHasChanges(true);
  };

  const handleSave = () => {
    // In production, this would make an API call
    console.log('Updated Teams:', teams);
    setHasChanges(false);
    alert('Attendance changes saved successfully!');
  };

  return (
    <div className="attendance-container">
      <div className="backup-form-section">
        <img src="/procom25logo.png" alt="Procom 25" className="logo" />
        <h1>BACKUP ATTENDANCE</h1>
        
        <div className="search-section">
          <input
            type="text"
            placeholder="Search by team name, code, or member..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="teams-container">
          <div className="teams-list">
            {filteredTeams.map((team) => (
              <div 
                key={team.team_code}
                className={`team-card ${selectedTeam?.team_code === team.team_code ? 'selected' : ''}`}
                onClick={() => handleTeamSelect(team)}
              >
                <div className="team-info">
                  <h3>{team.team_name}</h3>
                  <p>Code: {team.team_code}</p>
                  <p>Competition: {team.competition_name}</p>
                  <p>Members: {team.member.join(', ')}</p>
                </div>
                <div className="attendance-toggle">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={team.is_present}
                      onChange={() => handleAttendanceToggle(team)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {hasChanges && (
          <div className="save-button-container">
            <button onClick={handleSave} className="save-button">
              SAVE CHANGES
            </button>
          </div>
        )}
      </div>

      <div className="help-button">
        <button className="help-icon">?</button>
      </div>
    </div>
  );
};

export default BackupAttendanceForm; 