export interface MediaItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  category: 'equipment' | 'clinic' | 'patients';
  title: string;
}

export const galleryData: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    src: 'https://picsum.photos/800/600?image=10',
    category: 'clinic',
    title: 'Reception Area',
  },
  {
    id: 2,
    type: 'image',
    src: 'https://picsum.photos/800/600?image=20',
    category: 'clinic',
    title: 'Waiting Room',
  },
  {
    id: 3,
    type: 'image',
    src: 'https://picsum.photos/800/600?image=30',
    category: 'equipment',
    title: 'Treadmill',
  },
  {
    id: 4,
    type: 'video',
    // Using a generic placeholder video
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    category: 'patients',
    title: 'Patient Rehabilitation',
  },
  {
    id: 5,
    type: 'image',
    src: 'https://picsum.photos/800/600?image=40',
    category: 'equipment',
    title: 'Exercise Balls',
  },
  {
    id: 6,
    type: 'image',
    src: 'https://picsum.photos/800/600?image=50',
    category: 'patients',
    title: 'Consultation',
  },
  {
    id: 7,
    type: 'image',
    src: 'https://picsum.photos/800/600?image=60',
    category: 'clinic',
    title: 'Treatment Room',
  },
  {
    id: 8,
    type: 'video',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    category: 'patients',
    title: 'Manual Therapy Session',
  },
   {
    id: 9,
    type: 'image',
    src: 'https://picsum.photos/800/600?image=70',
    category: 'equipment',
    title: 'Resistance Bands',
  },
  {
    id: 10,
    type: 'image',
    src: 'https://picsum.photos/800/600?image=80',
    category: 'clinic',
    title: 'Clinic Exterior',
  },
  {
    id: 11,
    type: 'image',
    src: 'https://picsum.photos/800/600?image=90',
    category: 'patients',
    title: 'Patient Exercising',
  },
  {
    id: 12,
    type: 'video',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'equipment',
    title: 'Equipment Demo',
  },
];
