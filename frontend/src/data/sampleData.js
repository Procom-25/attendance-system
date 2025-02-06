let competitionDataStore = [
  {
    "_id": "67a27a48e26ae194dfac849a",
    "title": "Hackathon 2025",
    "registeredTeams": [
      {
        "team_name": "Code Warriors",
        "team_code": "CW12345",
        "is_present": true,
        "member": [
          {
            "name": "Alice Johnson"
          },
          {
            "name": "Bob Smith"
          }
        ]
      },
      {
        "team_name": "Bug Smashers",
        "team_code": "BS54321",
        "is_present": false,
        "member": [
          {
            "name": "Charlie Brown"
          },
          {
            "name": "Dave Lee"
          }
        ]
      }
    ]
  }
];

export const getCompetitionData = () => competitionDataStore;

export const updateCompetitionData = (newData) => {
  competitionDataStore = newData;
  return competitionDataStore;
}; 