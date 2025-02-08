//import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config()
let teamsDataStore = [
  {
    team_name: "Code Warriors",
    team_code: "CW12345",
    is_present: true,
    member: ["Alice Johnson", "Bob Smith"],
    competition_name: "Hackathon 2025"
  },
  {
    team_name: "Bug Smashers",
    team_code: "BS54321",
    is_present: false,
    member: ["Charlie Brown", "Dave Lee"],
    competition_name: "Hackathon 2025"
  },
  {
    team_name: "Neural Ninjas",
    team_code: "NN67890",
    is_present: true,
    member: ["Eve Carter", "Franklin Harris"],
    competition_name: "AI Challenge 2025"
  },
  {
    team_name: "Deep Thinkers",
    team_code: "DT98765",
    is_present: true,
    member: ["Grace Miller", "Henry Adams"],
    competition_name: "AI Challenge 2025"
  },
  {
    team_name: "Algorithm Avengers",
    team_code: "AA45678",
    is_present: false,
    member: ["Isla Roberts", "Jack Thompson"],
    competition_name: "AI Challenge 2025"
  }
];

export const getTeamsData = () => teamsDataStore;

export const updateTeamData = (teamCode, isPresent) => {
  teamsDataStore = teamsDataStore.map(team => 
    team.team_code === teamCode ? { ...team, is_present: isPresent } : team
  );
  return teamsDataStore;
};

// Search teams by name, code, or member name
export const searchTeams = (searchTerm) => {
  return teamsDataStore.filter(team =>
    team.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.team_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.member.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};

// For future API implementation
export const g = async () => {
  // Implementation here
};

export const updateCompetitionData = (newData) => {
  teamsDataStore = newData;
  return teamsDataStore;
}; 