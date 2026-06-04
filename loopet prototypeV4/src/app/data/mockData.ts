export type Species = 'Dog' | 'Cat' | 'Rabbit' | 'Bird' | 'Other';
export type AnimalStatus = 'Available' | 'Quarantine' | 'Medical Hold' | 'Adopted' | 'Transferred' | 'Deceased' | 'Foster';
export type Gender = 'Male' | 'Female' | 'Unknown';

export interface Animal {
  id: string;
  noraId: string;
  name: string;
  species: Species;
  breed: string;
  gender: Gender;
  age: number; // months
  weight: number; // kg
  status: AnimalStatus;
  location: string;
  microchipId?: string;
  intakeDate: string;
  photo: string;
  description: string;
  matchScore?: number;
  kidFriendly: number; // 1-5
  dogFriendly: number;
  catFriendly: number;
  energyLevel: 'Calm' | 'Moderate' | 'Active' | 'Very Active';
  vaccinated: boolean;
  neutered: boolean;
  medicalNotes: string;
  activityLog: ActivityEntry[];
  medicalHistory: MedicalRecord[];
}

export interface ActivityEntry {
  id: string;
  date: string;
  type: 'Walk' | 'Feed' | 'Socialization' | 'Vet Visit' | 'Bath' | 'Training';
  staff: string;
  notes: string;
  duration?: number; // minutes
}

export interface MedicalRecord {
  id: string;
  date: string;
  type: 'Vaccine' | 'Procedure' | 'Checkup' | 'Treatment' | 'Note';
  title: string;
  notes: string;
  vet: string;
  nextDue?: string;
}

export interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  assignee: string;
  type: 'Medical' | 'Intake' | 'Adoption' | 'Admin' | 'Walk';
  completed: boolean;
}

export const ANIMALS: Animal[] = [
  {
    id: '1',
    noraId: 'PET-2024-0047',
    name: 'Mango',
    species: 'Dog',
    breed: 'Golden Retriever Mix',
    gender: 'Male',
    age: 18,
    weight: 22.5,
    status: 'Available',
    location: 'Dog Block A, Cage 4',
    microchipId: '985112003456781',
    intakeDate: '2024-11-15',
    photo: 'https://images.unsplash.com/photo-1651212508936-dfb6f6ea3d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Mango is a playful, affectionate Golden Retriever mix who loves everyone he meets. He came to us after his previous family relocated. He knows basic commands and is house-trained. He adores long walks and belly rubs.',
    matchScore: 96,
    kidFriendly: 5,
    dogFriendly: 4,
    catFriendly: 3,
    energyLevel: 'Active',
    vaccinated: true,
    neutered: true,
    medicalNotes: 'All vaccines up to date. Neutered. Healthy weight.',
    activityLog: [
      { id: 'a1', date: '2025-05-10', type: 'Walk', staff: 'Sarah K.', notes: '30 min morning walk, well-behaved', duration: 30 },
      { id: 'a2', date: '2025-05-10', type: 'Feed', staff: 'Tom R.', notes: 'Morning feed, ate all food', duration: 10 },
      { id: 'a3', date: '2025-05-09', type: 'Socialization', staff: 'Maria L.', notes: 'Played with volunteers in yard', duration: 45 },
      { id: 'a4', date: '2025-05-08', type: 'Walk', staff: 'Sarah K.', notes: 'Evening walk, met 2 other dogs peacefully', duration: 25 },
    ],
    medicalHistory: [
      { id: 'm1', date: '2024-11-16', type: 'Checkup', title: 'Intake Exam', notes: 'Healthy adult male, BCS 5/9, heart/lungs clear', vet: 'Dr. Patel', nextDue: '2025-05-16' },
      { id: 'm2', date: '2024-11-16', type: 'Vaccine', title: 'DHPP Booster', notes: 'Annual booster administered', vet: 'Dr. Patel', nextDue: '2025-11-16' },
      { id: 'm3', date: '2024-11-16', type: 'Vaccine', title: 'Rabies', notes: '3-year vaccine administered', vet: 'Dr. Patel', nextDue: '2027-11-16' },
      { id: 'm4', date: '2024-12-02', type: 'Treatment', title: 'Flea Treatment', notes: 'Preventative flea treatment applied', vet: 'Dr. Chen', nextDue: '2025-03-02' },
    ]
  },
  {
    id: '2',
    noraId: 'PET-2024-0052',
    name: 'Luna',
    species: 'Cat',
    breed: 'Tabby',
    gender: 'Female',
    age: 36,
    weight: 4.2,
    status: 'Available',
    location: 'Cat Room 1, Unit 7',
    microchipId: '985112003456799',
    intakeDate: '2024-12-01',
    photo: 'https://images.unsplash.com/photo-1775512037298-5c1451397028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Luna is a gentle, independent tabby who enjoys quiet environments. She warms up slowly but once she trusts you, she\'s incredibly loving. Perfect for a calm household.',
    matchScore: 88,
    kidFriendly: 3,
    dogFriendly: 2,
    catFriendly: 4,
    energyLevel: 'Calm',
    vaccinated: true,
    neutered: true,
    medicalNotes: 'All vaccines current. Spayed. Mild tartar noted.',
    activityLog: [
      { id: 'a5', date: '2025-05-10', type: 'Feed', staff: 'Maria L.', notes: 'Morning feed, ate well', duration: 5 },
      { id: 'a6', date: '2025-05-10', type: 'Socialization', staff: 'Tom R.', notes: 'Grooming session, very relaxed', duration: 20 },
      { id: 'a7', date: '2025-05-09', type: 'Socialization', staff: 'Sarah K.', notes: 'Interactive play with wand toy', duration: 15 },
    ],
    medicalHistory: [
      { id: 'm5', date: '2024-12-02', type: 'Checkup', title: 'Intake Exam', notes: 'Healthy adult female cat, mild dental tartar', vet: 'Dr. Chen', nextDue: '2025-06-02' },
      { id: 'm6', date: '2024-12-02', type: 'Vaccine', title: 'FVRCP Booster', notes: 'Annual booster', vet: 'Dr. Chen', nextDue: '2025-12-02' },
      { id: 'm7', date: '2024-12-02', type: 'Vaccine', title: 'Rabies', notes: '1-year vaccine', vet: 'Dr. Chen', nextDue: '2025-12-02' },
    ]
  },
  {
    id: '3',
    noraId: 'PET-2025-0003',
    name: 'Pepper',
    species: 'Dog',
    breed: 'Beagle',
    gender: 'Female',
    age: 12,
    weight: 10.3,
    status: 'Available',
    location: 'Dog Block B, Cage 2',
    microchipId: '985112003456802',
    intakeDate: '2025-01-10',
    photo: 'https://images.unsplash.com/photo-1657162800963-b598e13116f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Pepper is a young, energetic Beagle with an incredible nose! She loves exploring outdoors and would thrive in an active family with a yard. Still learning commands but super motivated by treats.',
    matchScore: 74,
    kidFriendly: 5,
    dogFriendly: 5,
    catFriendly: 2,
    energyLevel: 'Very Active',
    vaccinated: true,
    neutered: false,
    medicalNotes: 'Fully vaccinated. Spay scheduled for May 20, 2025.',
    activityLog: [
      { id: 'a8', date: '2025-05-10', type: 'Walk', staff: 'Tom R.', notes: 'Explored the park trail, great recall practice', duration: 40 },
      { id: 'a9', date: '2025-05-09', type: 'Training', staff: 'Sarah K.', notes: 'Sit/stay practice, 80% success rate', duration: 20 },
    ],
    medicalHistory: [
      { id: 'm8', date: '2025-01-11', type: 'Checkup', title: 'Intake Exam', notes: 'Young healthy female, all clear', vet: 'Dr. Patel' },
      { id: 'm9', date: '2025-01-11', type: 'Vaccine', title: 'DHPP', notes: 'Full series started', vet: 'Dr. Patel', nextDue: '2025-04-11' },
    ]
  },
  {
    id: '4',
    noraId: 'PET-2025-0008',
    name: 'Shadow',
    species: 'Dog',
    breed: 'Black Labrador Mix',
    gender: 'Male',
    age: 48,
    weight: 28.1,
    status: 'Medical Hold',
    location: 'Medical Wing, Unit 3',
    intakeDate: '2025-02-14',
    photo: 'https://images.unsplash.com/photo-1713241931215-aa8d25a9cd56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Shadow is a calm, loyal Lab mix who is currently recovering from a minor surgery. He\'ll be ready for adoption soon! He\'s great with everyone and loves lounging on the couch.',
    matchScore: 82,
    kidFriendly: 5,
    dogFriendly: 4,
    catFriendly: 4,
    energyLevel: 'Moderate',
    vaccinated: true,
    neutered: true,
    medicalNotes: 'Post-op recovery for leg injury. Expected release from medical hold: May 25.',
    activityLog: [
      { id: 'a10', date: '2025-05-10', type: 'Vet Visit', staff: 'Dr. Chen', notes: 'Post-op check, healing well', duration: 30 },
      { id: 'a11', date: '2025-05-09', type: 'Socialization', staff: 'Maria L.', notes: 'Gentle pet session in room', duration: 25 },
    ],
    medicalHistory: [
      { id: 'm10', date: '2025-02-15', type: 'Procedure', title: 'Leg Surgery', notes: 'TPLO surgery for torn CCL', vet: 'Dr. Smith', nextDue: '2025-05-15' },
    ]
  },
  {
    id: '5',
    noraId: 'PET-2025-0012',
    name: 'Snowflake',
    species: 'Cat',
    breed: 'Persian Mix',
    gender: 'Female',
    age: 24,
    weight: 3.8,
    status: 'Available',
    location: 'Cat Room 2, Unit 3',
    microchipId: '985112003456821',
    intakeDate: '2025-02-28',
    photo: 'https://images.unsplash.com/photo-1688989427417-62c95ea90fba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Snowflake is a gorgeous white Persian mix who loves being pampered. She requires daily grooming but rewards you with endless purrs and cuddles. Best in a quiet adult household.',
    matchScore: 91,
    kidFriendly: 2,
    dogFriendly: 1,
    catFriendly: 3,
    energyLevel: 'Calm',
    vaccinated: true,
    neutered: true,
    medicalNotes: 'Requires regular eye cleaning due to brachycephalic features.',
    activityLog: [
      { id: 'a12', date: '2025-05-10', type: 'Bath', staff: 'Sarah K.', notes: 'Full grooming session', duration: 45 },
    ],
    medicalHistory: [
      { id: 'm11', date: '2025-03-01', type: 'Checkup', title: 'Intake + Grooming Exam', notes: 'Coat matted on arrival, now clear', vet: 'Dr. Patel' },
    ]
  },
  {
    id: '6',
    noraId: 'PET-2025-0019',
    name: 'Rocket',
    species: 'Dog',
    breed: 'Border Collie',
    gender: 'Male',
    age: 30,
    weight: 18.5,
    status: 'Available',
    location: 'Dog Block A, Cage 8',
    microchipId: '985112003456834',
    intakeDate: '2025-03-20',
    photo: 'https://images.unsplash.com/photo-1763989979268-c94a5b33a493?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Rocket is a highly intelligent Border Collie who needs a mentally stimulating home. He excels at agility and frisbee. Looking for an active owner who can keep up with his boundless energy!',
    matchScore: 65,
    kidFriendly: 3,
    dogFriendly: 3,
    catFriendly: 2,
    energyLevel: 'Very Active',
    vaccinated: true,
    neutered: true,
    medicalNotes: 'Excellent health. Needs mental stimulation daily.',
    activityLog: [
      { id: 'a13', date: '2025-05-10', type: 'Training', staff: 'Tom R.', notes: 'Agility course training, excellent performance', duration: 60 },
      { id: 'a14', date: '2025-05-10', type: 'Walk', staff: 'Maria L.', notes: 'Long trail run', duration: 50 },
    ],
    medicalHistory: [
      { id: 'm12', date: '2025-03-21', type: 'Checkup', title: 'Intake Exam', notes: 'Perfect health, ideal weight', vet: 'Dr. Chen' },
    ]
  },
  {
    id: '7',
    noraId: 'PET-2025-0025',
    name: 'Biscuit',
    species: 'Rabbit',
    breed: 'Holland Lop',
    gender: 'Male',
    age: 8,
    weight: 1.8,
    status: 'Available',
    location: 'Small Animals Room, Unit 2',
    intakeDate: '2025-04-05',
    photo: 'https://images.unsplash.com/photo-1622349817799-067c32295df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Biscuit is an adorable Holland Lop rabbit who loves being held. He\'s perfect for families wanting a small, gentle pet. He enjoys fresh vegetables and exploring safe indoor spaces.',
    matchScore: 79,
    kidFriendly: 4,
    dogFriendly: 2,
    catFriendly: 2,
    energyLevel: 'Moderate',
    vaccinated: false,
    neutered: false,
    medicalNotes: 'No vaccines required for rabbits in this region. Neuter recommended at 6 months.',
    activityLog: [
      { id: 'a15', date: '2025-05-10', type: 'Socialization', staff: 'Maria L.', notes: 'Free roam time in playpen', duration: 30 },
    ],
    medicalHistory: [
      { id: 'm13', date: '2025-04-06', type: 'Checkup', title: 'Intake Exam', notes: 'Healthy young rabbit, good weight', vet: 'Dr. Patel' },
    ]
  },
  {
    id: '8',
    noraId: 'PET-2025-0031',
    name: 'Cleo',
    species: 'Cat',
    breed: 'Siamese Mix',
    gender: 'Female',
    age: 60,
    weight: 4.5,
    status: 'Quarantine',
    location: 'Quarantine Zone, Unit 1',
    intakeDate: '2025-05-01',
    photo: 'https://images.unsplash.com/photo-1751658363941-a1ff6889c511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Cleo is a chatty, opinionated Siamese mix who arrived recently. She\'s currently completing her quarantine period and will be available soon. Loves conversation and window watching.',
    matchScore: 85,
    kidFriendly: 3,
    dogFriendly: 2,
    catFriendly: 3,
    energyLevel: 'Moderate',
    vaccinated: false,
    neutered: true,
    medicalNotes: 'Quarantine period: May 1-15. Initial health check pending.',
    activityLog: [
      { id: 'a16', date: '2025-05-10', type: 'Feed', staff: 'Tom R.', notes: 'Morning and evening feed', duration: 5 },
    ],
    medicalHistory: [
      { id: 'm14', date: '2025-05-02', type: 'Checkup', title: 'Initial Screen', notes: 'Quarantine protocol initiated', vet: 'Dr. Chen' },
    ]
  },
  {
    id: '9',
    noraId: 'PET-2025-0034',
    name: 'Ziggy',
    species: 'Dog',
    breed: 'Corgi',
    gender: 'Male',
    age: 14,
    weight: 12.0,
    status: 'Available',
    location: 'Dog Block B, Cage 7',
    microchipId: '985112003456890',
    intakeDate: '2025-04-20',
    photo: 'https://images.unsplash.com/photo-1756279350551-aaf0c0bdcddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    description: 'Ziggy is a bubbly Corgi who will steal your heart instantly. He loves playing fetch and has a wonderfully expressive face. He gets along with everyone and is learning to walk well on a leash.',
    matchScore: 93,
    kidFriendly: 5,
    dogFriendly: 5,
    catFriendly: 3,
    energyLevel: 'Active',
    vaccinated: true,
    neutered: false,
    medicalNotes: 'Neuter appointment: June 1, 2025.',
    activityLog: [
      { id: 'a17', date: '2025-05-10', type: 'Walk', staff: 'Sarah K.', notes: 'Morning fetch session at yard', duration: 35 },
      { id: 'a18', date: '2025-05-09', type: 'Socialization', staff: 'Tom R.', notes: 'Meet and greet with potential adopters', duration: 20 },
    ],
    medicalHistory: [
      { id: 'm15', date: '2025-04-21', type: 'Checkup', title: 'Intake Exam', notes: 'Healthy young male, excellent temperament', vet: 'Dr. Patel' },
    ]
  },
];

export const PENDING_TASKS: Task[] = [
  { id: 't1', title: 'Shadow post-op check', priority: 'High', dueDate: '2025-05-11', assignee: 'Dr. Chen', type: 'Medical', completed: false },
  { id: 't2', title: 'Cleo quarantine release check', priority: 'High', dueDate: '2025-05-15', assignee: 'Dr. Patel', type: 'Medical', completed: false },
  { id: 't3', title: 'Pepper spay appointment', priority: 'Medium', dueDate: '2025-05-20', assignee: 'Dr. Smith', type: 'Medical', completed: false },
  { id: 't4', title: 'Mango adoption paperwork review', priority: 'Medium', dueDate: '2025-05-12', assignee: 'Sarah K.', type: 'Adoption', completed: false },
  { id: 't5', title: 'New intake batch - Cat Room 1', priority: 'Low', dueDate: '2025-05-14', assignee: 'Tom R.', type: 'Intake', completed: true },
  { id: 't6', title: 'Monthly adoption stats report', priority: 'Low', dueDate: '2025-05-31', assignee: 'Admin', type: 'Admin', completed: false },
];

export const ADOPTION_STATS = {
  totalAnimals: 34,
  availableAnimals: 18,
  adoptionsThisMonth: 7,
  adoptionsLastMonth: 5,
  averageDaysToAdoption: 21,
  activeApplications: 12,
  pendingHomeChecks: 4,
  speciesBreakdown: { Dog: 18, Cat: 12, Rabbit: 2, Bird: 1, Other: 1 },
  monthlyAdoptions: [
    { month: 'Dec', adoptions: 4 },
    { month: 'Jan', adoptions: 6 },
    { month: 'Feb', adoptions: 5 },
    { month: 'Mar', adoptions: 8 },
    { month: 'Apr', adoptions: 5 },
    { month: 'May', adoptions: 7 },
  ]
};
