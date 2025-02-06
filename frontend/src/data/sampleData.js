let competitionDataStore = [
  {
    _id: "67a27a48e26ae194dfac849a",
    title: "Hackathon 2025",
    registeredTeams: [
      {
        team_name: "Code Warriors",
        team_code: "CW12345",
        is_present: true,
        member: [
          {
            name: "Alice Johnson",
          },
          {
            name: "Bob Smith",
          },
        ],
      },
      {
        team_name: "Bug Smashers",
        team_code: "BS54321",
        is_present: false,
        member: [
          {
            name: "Charlie Brown",
          },
          {
            name: "Dave Lee",
          },
        ],
      },
    ],
  },
  {
    _id: "67b38b59f37bf205efbd950b",
    title: "AI Challenge 2025",
    registeredTeams: [
      {
        team_name: "Neural Ninjas",
        team_code: "NN67890",
        is_present: true,
        member: [
          {
            name: "Eve Carter",
          },
          {
            name: "Franklin Harris",
          },
        ],
      },
      {
        team_name: "Deep Thinkers",
        team_code: "DT98765",
        is_present: true,
        member: [
          {
            name: "Grace Miller",
          },
          {
            name: "Henry Adams",
          },
        ],
      },
      {
        team_name: "Algorithm Avengers",
        team_code: "AA45678",
        is_present: false,
        member: [
          {
            name: "Isla Roberts",
          },
          {
            name: "Jack Thompson",
          },
        ],
      },
    ],
  },
];

export const getCompetitionData = () => competitionDataStore;

export const updateCompetitionData = (newData) => {
  competitionDataStore = newData;
  return competitionDataStore;
}; 