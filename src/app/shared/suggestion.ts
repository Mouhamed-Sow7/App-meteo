export interface Suggestion {
  condition: string; // Exemple : "hot", "cold", "rainy", etc.
  suggestions: string[]; // Liste des conseils liés à la condition
}

export const suggestionsList: Suggestion[] = [
  {
    condition: 'hot',
    suggestions: [
      'Appliquez de la crème solaire',
      'Portez des vêtements légers',
      'Buvez beaucoup d’eau',
    ],
  },
  {
    condition: 'cold',
    suggestions: [
      'Portez un manteau chaud',
      'Portez une écharpe',
      'Restez au chaud',
    ],
  },
  {
    condition: 'rainy',
    suggestions: [
      'Prenez un parapluie',
      'Portez des vêtements imperméables',
      'Faites attention aux routes glissantes',
    ],
  },
  {
    condition: 'mild',
    suggestions: [
      'Profitez du temps agréable',
      'Portez une veste légère si nécessaire',
    ],
  },
];
