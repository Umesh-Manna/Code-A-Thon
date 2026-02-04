export async function fetchHurricanes() {
  return [
    {
      id: "atl-01",
      name: "Tropical Storm Alpha",
      intensity: "Tropical Storm",
      track: [
        [14.5, -48.0],
        [15.2, -49.5],
        [16.0, -51.0],
        [17.1, -52.0],
        [18.2, -52.1],
      ],
    },
    {
      id: "pac-02",
      name: "Typhoon Beta",
      intensity: "Category 4",
      track: [
        [10.2, 140.1],
        [11.4, 141.5],
        [12.5, 142.8],
        [13.4, 144.0],
      ],
    },
    {
      id: "ind-03",
      name: "Cyclone Gamma",
      intensity: "Tropical Depression",
      track: [
        [-12.0, 86.0],
        [-13.2, 87.4],
        [-14.5, 88.7],
        [-16.7, 89.5],
      ],
    },
  ];
}
