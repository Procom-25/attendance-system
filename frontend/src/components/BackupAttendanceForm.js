import React, { useState, useEffect } from 'react';
import './BackupAttendanceForm.css';
import { getCompetitionData, updateCompetitionData } from '../data/sampleData';

const BackupAttendanceForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const data = getCompetitionData();
    setSelectedCompetition(data[0]);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTeams = selectedCompetition?.registeredTeams.filter(team =>
    team.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.team_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.member.some(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const handleAttendanceToggle = (team) => {
    const updatedCompetition = {
      ...selectedCompetition,
      registeredTeams: selectedCompetition.registeredTeams.map(t => 
        t.team_code === team.team_code ? { ...t, is_present: !t.is_present } : t
      )
    };
    setSelectedCompetition(updatedCompetition);
    setHasChanges(true);
  };

  const handleSave = () => {
    const allData = getCompetitionData();
    const updatedData = allData.map(comp => 
      comp._id === selectedCompetition._id ? selectedCompetition : comp
    );
    updateCompetitionData(updatedData);
    console.log('Updated Data:', getCompetitionData());
    setHasChanges(false);
    alert('Attendance changes saved successfully!');
  };

  if (!selectedCompetition) return null;

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
                  <p>Members: {team.member.map(m => m.name).join(', ')}</p>
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