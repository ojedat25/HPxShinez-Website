/** A single detailing service or add-on. */
export type Service = {
  title: string
  price: string
  description: string
  includes?: string[]
  note?: string
}

/** Group of services shown under one heading. */
export type ServiceCategory = {
  id: string
  title: string
  services: Service[]
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'full-packages',
    title: 'Full Packages',
    services: [
      {
        title: 'Like New Detail',
        price: '$150-$250',
        description:
          'Good little clean and nothing too crazy for those daily drivers :)',
        includes: ['Inside simple wash', 'Outside simple wash'],
      },
      {
        title: 'The Showroom Detail',
        price: '$250-$400',
        description:
          "Deep clean inside and out. Best choice if you've never deep cleaned your car before. This will leave your car looking like it came straight out the factory!!",
        includes: ['Deep clean inside', 'Deep clean outside', 'Tire shine'],
      },
    ],
  },
  {
    id: 'exterior',
    title: 'Exterior Services',
    services: [
      {
        title: 'Exterior Wash',
        price: '$100-$180',
        description: 'Wash around the car and a wheel clean.',
        includes: ['Wash around the car', 'Wheel clean'],
      },
      {
        title: 'The HP Shine Wash',
        price: '$180-$350',
        description: 'Deep outside. More effective than a basic wash.',
        includes: ['Wax', 'Glossy finish', '1 tire shine'],
      },
    ],
  },
  {
    id: 'interior',
    title: 'Interior Services',
    services: [
      {
        title: 'Interior Cleaning only',
        price: '$120-$250',
        description: 'Vacuuming, clean upholstery, and a fresh smell.',
        includes: ['Vacuuming', 'Clean upholstery', 'Fresh smell'],
        note: 'Pet hair removal extra $80.',
      },
      {
        title: 'The HP Shine Clean',
        price: '$250-$400',
        description: 'Deep inside.',
        includes: [
          'Vacuuming',
          'Stain removal',
          'Steam cleaner on the inside of the car',
          'Fresh smell',
          'Carpet shampoo',
          'Pet hair removal',
        ],
      },
    ],
  },
  {
    id: 'add-ons',
    title: 'Add-ons',
    services: [
      {
        title: 'Engine Bay cleaning',
        price: '$60-$100',
        description:
          "A cleaning of the area under your vehicle's hood, removing dirt, dust, grease, and grime to leave the engine compartment looking clean and well-maintained.",
      },
      {
        title: 'Tire shine on wheels',
        price: '$15',
        description:
          'Can add to your simple outside wash. Comes included with The Showroom Detail.',
      },
      {
        title: 'Extreme pet hair removal',
        price: '$50',
        description:
          'Any hairs that are tough to remove and take time will be considered "extreme."',
      },
    ],
  },
]
