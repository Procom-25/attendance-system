import React, { useState, useEffect, useRef } from 'react';
import './BackupAttendanceForm.css';
import { getTeamsData, updateTeamData, getCompetitions } from '../data/Data';

const BackupAttendanceForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const data = getTeamsData();
    setTeams(data);
    setCompetitions(getCompetitions());
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCompetitionSelect = (competition) => {
    setSelectedCompetition(competition);
    setIsDropdownOpen(false);
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = 
      team.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.team_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.member.some(m => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
      team.competition_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompetition = 
      selectedCompetition === '' || team.competition_name === selectedCompetition;

    return matchesSearch && matchesCompetition;
  });

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
          <div className="search-controls">
            <input
              type="text"
              placeholder="Search by team name, code, or member..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <div className="custom-dropdown" ref={dropdownRef}>
              <button 
                className={`dropdown-button ${isDropdownOpen ? 'open' : ''}`}
                onClick={toggleDropdown}
              >
                {selectedCompetition || 'All Competitions'}
              </button>
              <div className={`dropdown-list ${isDropdownOpen ? 'open' : ''}`}>
                <div 
                  className={`dropdown-item ${!selectedCompetition ? 'selected' : ''}`}
                  onClick={() => handleCompetitionSelect('')}
                >
                  All Competitions
                </div>
                {competitions.map(comp => (
                  <div
                    key={comp}
                    className={`dropdown-item ${selectedCompetition === comp ? 'selected' : ''}`}
                    onClick={() => handleCompetitionSelect(comp)}
                  >
                    {comp}
                  </div>
                ))}
              </div>
            </div>
          </div>
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