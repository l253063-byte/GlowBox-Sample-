/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const NEON = {
  pink:     '#FF006E',
  cyan:     '#00F5FF',
  green:    '#39FF14',
  yellow:   '#FFD700',
  purple:   '#BF00FF',
  orange:   '#FF4500',
  white:    '#FFFFFF',
  offWhite: '#E8E8F0',
  bgDeep:   '#0A0010',
  bgMid:    '#0F0018',
  bgCard:   '#16002A',
  textMuted: 'rgba(232,232,240,0.6)',
};

export const mainServices = [
  { 
    title: 'Canvas Painting', 
    color: NEON.cyan, 
    desc: 'Our classic experience and how it all started. Paint your thoughts on a canvas and make it glow.' 
  },
  { 
    title: 'T-shirts & Hoodies Painting', 
    color: NEON.pink, 
    desc: 'Our latest service: add your personalised touch to wearables you can show off everywhere you go.' 
  },
  { 
    title: 'Pouring Acrylic Painting', 
    color: NEON.green, 
    desc: 'Blend your favourite colours into a beautiful marble/abstract artwork — a phone case or a canvas, your choice.' 
  },
];

export const sideActivities = [
  { 
    title: 'Splatter Wall',       
    color: NEON.orange, 
    desc: 'Throw paint on a huge canvas as a healing experience. Everyone splashes paint before leaving — clearing their palettes and taking out their frustration on the canvas.' 
  },
  { 
    title: 'Hand Printing Wall',  
    color: NEON.cyan, 
    desc: "Like the splatter wall — everyone leaves handprints in their favourite colours, creating one magical collective piece." 
  },
  { 
    title: 'Glow Drinks',         
    color: NEON.green, 
    desc: 'Signature non-alcoholic mocktails in flavours like blueberry, raspberry & passion fruit — invented by the chief from his time bartending in the UK (halal only).' 
  },
];

export const galleryStripItems = [
  { id: 'gallery_svc_01', title: 'CANVAS PAINTING', color: NEON.cyan },
  { id: 'gallery_svc_03', title: 'SPLATTER WALL', color: NEON.pink },
  { id: 'gallery_svc_04', title: 'HAND PRINTING WALL', color: NEON.green },
  { id: 'gallery_svc_05', title: 'FACE PAINTING', color: NEON.pink },
  { id: 'gallery_svc_06', title: 'GLOW DRINKS', color: NEON.green },
  { id: 'gallery_svc_07', title: 'T-SHIRTS & HOODIES', color: NEON.cyan },
  { id: 'gallery_svc_08', title: 'ALL MATERIAL & STENCIL', color: NEON.yellow },
];

export const clientBadges = [
  { name: 'British American Tobacco (BAT)', color: NEON.cyan },
  { name: 'Lahore Grammar School (LGS)', color: NEON.yellow },
  { name: 'International School Lahore (ISL)', color: NEON.pink },
];

export const staticReviews = [
  {
    text: "Thank you so much ✨ We had really fun there, the ambiance, services everything was so good, we will definitely gonna visit here again 💙",
    author: "Fatima & Team",
    borderColor: NEON.pink
  },
  {
    text: "Yess they had so much fun, will definitely bring them again 🫶",
    author: "Zainab K.",
    borderColor: NEON.purple
  },
  {
    text: "Hello! It was a surreal experience, no kidding. I'm glad there's something like this in Lahore. Hats off to Moiz and his team for being excellent hosts. Felt at home instantly. Will definitely visit sometime soon again, IA.",
    author: "Hamza S.",
    borderColor: NEON.cyan
  }
];

export const reviewsCarousel = [
  { name: 'Aisha K.', review: 'An absolutely surreal experience. The ambiance is unlike anything in Lahore.', stars: 5 },
  { name: 'Omar R.',  review: 'Moiz and his team are phenomenal hosts. Felt at home instantly.', stars: 5 },
  { name: 'Fatima L.', review: 'The glow drinks were a game changer. We stayed the full 2 hours!', stars: 5 },
  { name: 'Hassan M.', review: 'Took my corporate team here — best team-building activity we have ever done.', stars: 5 },
  { name: 'Zara T.',  review: 'Therapeutic is the right word. Left feeling so calm and creative.', stars: 5 },
  { name: 'Ali S.',   review: 'Something you have never experienced — and that tagline is 100% true.', stars: 5 },
];

export const campReasons = [
  { 
    num: '1', 
    color: NEON.cyan, 
    title: 'The Screen-Free Alternative',       
    desc: 'Give your child a break from tablets and YouTube. Replace digital fatigue with glow-in-the-dark creativity that actually grows their brain.' 
  },
  { 
    num: '2', 
    color: NEON.pink, 
    title: 'Future-Proofing for the AI Age',    
    desc: "In the future, machines will do the math — but only humans can be creative. We aren't just teaching your child to paint; we're teaching them to think outside the box." 
  },
  { 
    num: '3', 
    color: NEON.green, 
    title: 'Holistic Growth (Zehni Nashonuma)', 
    desc: "Success isn't just about grades anymore; it's about confidence and emotional intelligence. Our camp ensures your child returns home more focused, more calm, and more creative." 
  },
];

export const campDays = [
  { day: 1,  title: 'Icebreaker with Equipment',   color: NEON.cyan, desc: 'Learn your brushes and strokes. Get your Glowbox paint set.' },
  { day: 2,  title: 'Masking Tape Technique',       color: NEON.pink, desc: 'Primary and secondary colours. Colour mathematics & mixing.' },
  { day: 3,  title: 'Background Painting Tech',     color: NEON.yellow, desc: 'Blending strokes & colour. H.W: Paint a background.' },
  { day: 4,  title: 'Fluid Painting',               color: NEON.green, desc: 'Drying and lacquering tech. H.W: Bring white T-shirt + shoes.' },
  { day: 5,  title: 'Mini Paintings for Parents',   color: NEON.orange, desc: 'Record the art-gifting moments. Frame & display on their bedside.' },
  { day: 6,  title: 'Totebag Painting',             color: NEON.purple, desc: 'Paint your favourite superhero. H.W: Bring 500ml & 1.5L bottles.' },
  { day: 7,  title: 'Sneakers / Shoes Painting',    color: NEON.cyan, desc: 'Self-expression with confidence.' },
  { day: 8,  title: 'T-Shirt Painting',             color: NEON.pink, desc: 'Learning about theme + matching. Paint the theme of your shoes.' },
  { day: 9,  title: 'Recycling Artwork',            color: NEON.yellow, desc: 'Jellyfish making from bottles. H.W: Bring 500ml & 1.5L bottles.' },
  { day: 10, title: 'Hydro-dip Painting',           color: NEON.green, desc: 'Dipping the toy/object. H.W: Bring neon chart papers.' },
  { day: 11, title: 'Group Project @ Glowbox',      color: NEON.orange, desc: 'Photobooth making & painting. Splatter session & hand printing.' },
  { day: 12, title: 'Exhibition Day',               color: NEON.purple, desc: 'Exhibiting artwork for parents. Mini auction + award ceremony.' },
];

export const galleryItems = [
  { id: 'gallery_01', heightClass: 'h-[280px]', title: 'Canvas Artwork', color: NEON.pink, category: 'services' },
  { id: 'gallery_02', heightClass: 'h-[340px]', title: 'Splatter Session', color: NEON.cyan, category: 'sessions' },
  { id: 'gallery_03', heightClass: 'h-[260px]', title: 'Glow Drinks Bar', color: NEON.green, category: 'sessions' },
  { id: 'gallery_04', heightClass: 'h-[320px]', title: 'Hand Printing Wall', color: NEON.yellow, category: 'services' },
  { id: 'gallery_05', heightClass: 'h-[260px]', title: 'T-Shirts & Hoodies', color: NEON.purple, category: 'services' },
  { id: 'gallery_06', heightClass: 'h-[300px]', title: 'Birthday Night', color: NEON.pink, category: 'events' },
  { id: 'gallery_07', heightClass: 'h-[240px]', title: 'Corporate Session', color: NEON.cyan, category: 'events' },
  { id: 'gallery_08', heightClass: 'h-[300px]', title: 'Pouring Acrylic', color: NEON.yellow, category: 'services' },
  { id: 'gallery_09', heightClass: 'h-[260px]', title: 'Face Painting', color: NEON.orange, category: 'services' },
  { id: 'gallery_10', heightClass: 'h-[280px]', title: 'Team Painting', color: NEON.green, category: 'events' },
  { id: 'gallery_11', heightClass: 'h-[320px]', title: 'Hydro-dip Session', color: NEON.purple, category: 'camps' },
  { id: 'gallery_12', heightClass: 'h-[260px]', title: 'Exhibition Day', color: NEON.pink, category: 'camps' },
];
