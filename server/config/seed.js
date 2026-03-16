const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Alien   = require('../models/Alien');
const Episode = require('../models/Episode');
const Game    = require('../models/Game');

// ── Regular Aliens ────────────────────────────────────────────────────────────
const aliens = [
  { name:'Humungousaur', img:'/images/alien1.png', sliderImg:'/images/slider6.png', type:'Strength', planet:'Terradino', power:95, description:'A giant dinosaur-like alien with immense strength and durability. Standing over 12 feet tall, he can grow to nearly 60 feet. His thick armor-like skin provides natural protection against most attacks.', abilities:['Mega Strength','Size Control','Armored Skin','Ground Slam'], accent:'#ff6600', background:'linear-gradient(160deg,#1a0a04,#4d1a08)', featured:true, series:['Original','Alien Force','Ultimate Alien'], isUltimate:false },
  { name:'Alien X', img:'/images/alien2.png', sliderImg:'/images/alien2.png', type:'Cosmic', planet:'Forge of Creation', power:100, description:'Nearly omnipotent. Can reshape reality itself, but requires consensus from multiple personalities within the host.', abilities:['Reality Warp','Omnipotence','Time Travel','Universe Creation'], accent:'#cc44ff', background:'linear-gradient(160deg,#1a042c,#4a1060)', featured:true, series:['Alien Force','Ultimate Alien'], isUltimate:false },
  { name:'Big Chill', img:'/images/alien3.png', sliderImg:'/images/slider1.png', type:'Ice / Ghost', planet:'Kylmyys', power:82, description:'A moth-like alien with intangibility and ice breath. Big Chill phases through solid objects, making him nearly impossible to trap. He can exhale freezing winds encasing opponents in solid ice.', abilities:['Intangibility','Ice Breath','Flight','Invisibility'], accent:'#4fc3f7', background:'linear-gradient(160deg,#020a1c,#0a1e4d)', featured:true, series:['Alien Force'], isUltimate:false },
  { name:'Rath', img:'/images/alien4.png', sliderImg:'/images/slider3.png', type:'Combat', planet:'Appoplexia', power:91, description:'A tiger-like alien with unmatched ferocity. Rath\'s sharp claws and muscular build make him a fearsome close-combat fighter who relies on brute force and sheer aggression.', abilities:['Claw Strike','Super Strength','Intimidation','Enhanced Agility'], accent:'#ff6600', background:'linear-gradient(160deg,#1a0800,#5c2200)', featured:false, series:['Ultimate Alien','Omniverse'], isUltimate:false },
  { name:'Swampfire', img:'/images/alien5.png', sliderImg:'/images/slider4.png', type:'Plant / Fire', planet:'Methanos', power:88, description:'A methane-based alien with plant powers and the ability to ignite flames. Swampfire can regenerate his body by growing new limbs from plant matter, making him nearly unstoppable in battle.', abilities:['Fire Breath','Vine Control','Regeneration','Flight'], accent:'#00ff88', background:'linear-gradient(160deg,#041a06,#0d3b1f)', featured:true, series:['Alien Force','Ultimate Alien'], isUltimate:false },
  { name:'Echo Echo', img:'/images/alien6.png', sliderImg:'/images/slider2.png', type:'Sonic', planet:'Sonorosia', power:74, description:'A small silicon-based alien capable of creating sonic clones. Echo Echo duplicates himself, overwhelming opponents with numbers, and unleashes powerful sonic screams that shatter obstacles.', abilities:['Duplication','Sonic Scream','Wall of Sound','Echo Chamber'], accent:'#e0e0e0', background:'linear-gradient(160deg,#101010,#303030)', featured:false, series:['Alien Force','Ultimate Alien'], isUltimate:false },
  { name:'Diamondhead', img:'/images/diamondhead.png', sliderImg:'/images/diamondhead.png', type:'Crystal', planet:'Petropia', power:85, description:'A Petrosapien with a body made of extremely hard Taydenite crystals. He can manipulate his body to shoot crystal shards or create protective barriers.', abilities:['Crystal Shards','Crystal Armor','Refraction','Regeneration'], accent:'#88eeff', background:'linear-gradient(160deg,#021a1c,#044a50)', featured:false, series:['Original','Omniverse'], isUltimate:false },
  { name:'Four Arms', img:'/images/fourarms.png', sliderImg:'/images/fourarms.png', type:'Strength', planet:'Khoros', power:89, description:'A Tetramand with four powerful arms, incredible strength, and tough red skin. One of Ben\'s most reliable powerhouses.', abilities:['Quad Strength','Seismic Clap','Durability','Jumping'], accent:'#ff3333', background:'linear-gradient(160deg,#1a0404,#4d0808)', featured:false, series:['Original'], isUltimate:false },
  { name:'XLR8', img:'/images/xlr8.png', sliderImg:'/images/xlr8.png', type:'Speed', planet:'Kinet', power:80, description:'A Kineceleran capable of running at 500 mph. His tail provides balance and he can create tornadoes by running in circles.', abilities:['Supersonic Speed','Tornado Spin','Tail Whip','Wall Running'], accent:'#4488ff', background:'linear-gradient(160deg,#020a1c,#061840)', featured:false, series:['Original'], isUltimate:false },
  { name:'Heatblast', img:'/images/heatblast.png', sliderImg:'/images/heatblast.png', type:'Fire', planet:'Pyros', power:83, description:'A Pyronite composed entirely of fire and magma. Heatblast can project and manipulate fire and is immune to extreme heat.', abilities:['Fire Blasts','Heat Immunity','Flight','Magma Surf'], accent:'#ff6600', background:'linear-gradient(160deg,#1a0800,#4d1400)', featured:false, series:['Original'], isUltimate:false },
  { name:'Wildmutt', img:'/images/wildmutt.png', sliderImg:'/images/wildmutt.png', type:'Feral', planet:'Vulpin', power:77, description:'A Vulpimancer with no eyes or mouth but enhanced senses. Wildmutt uses his powerful gills to detect surroundings and is an incredibly fast and agile predator.', abilities:['Super Smell','Enhanced Speed','Quill Launch','Wall Climbing'], accent:'#ff9933', background:'linear-gradient(160deg,#1a0c00,#3d2000)', featured:false, series:['Original'], isUltimate:false },
  { name:'Ghostfreak', img:'/images/ghostfreak.png', sliderImg:'/images/ghostfreak.png', type:'Ghost', planet:'Anur Phaetos', power:78, description:'An Ectonurite who can phase through solid matter and possess living beings. His tentacles and exposed DNA strand make him terrifying in battle.', abilities:['Intangibility','Possession','Flight','Invisibility'], accent:'#aaaacc', background:'linear-gradient(160deg,#0a0a14,#1a1a2e)', featured:false, series:['Original'], isUltimate:false },
];

// ── Ultimate Aliens ──────────────────────────────────────────────────────────
const ultimateAliens = [
  {
    name: 'Ultimate Humungousaur',
    img: '/images/ultimate-humungousaur.png',
    sliderImg: '/images/ultimate-humungousaur.png',
    type: 'Strength',
    planet: 'Terradino',
    power: 99,
    description: 'The evolved form of Humungousaur, with missile launchers on his arms and massively enhanced strength. His armor becomes nearly impenetrable and his size-shifting now comes with devastating firepower.',
    abilities: ['Missile Launchers', 'Mega Strength', 'Impenetrable Armor', 'Size Amplification', 'Ground Shockwave'],
    accent: '#ffaa00',
    background: 'linear-gradient(160deg,#1a0800,#3d1800)',
    featured: true,
    series: ['Ultimate Alien'],
    isUltimate: true,
    baseAlien: 'Humungousaur',
  },
  {
    name: 'Ultimate Big Chill',
    img: '/images/ultimate-bigchill.png',
    sliderImg: '/images/ultimate-bigchill.png',
    type: 'Ice / Ghost',
    planet: 'Kylmyys',
    power: 90,
    description: 'The ultimate evolution of Big Chill with nuclear freeze powers. Instead of ice breath, he exhales absolute-zero plasma flames that freeze anything they touch — even fire itself.',
    abilities: ['Nuclear Ice Flames', 'Intangibility', 'Cryo-Phase', 'Arctic Flight', 'Freeze Immunity'],
    accent: '#00ccff',
    background: 'linear-gradient(160deg,#01101a,#022a40)',
    featured: true,
    series: ['Ultimate Alien'],
    isUltimate: true,
    baseAlien: 'Big Chill',
  },
  {
    name: 'Ultimate Swampfire',
    img: '/images/ultimate-swampfire.png',
    sliderImg: '/images/ultimate-swampfire.png',
    type: 'Plant / Fire',
    planet: 'Methanos',
    power: 94,
    description: 'The ultimate evolution of Swampfire. His body is now encased in a blue-flamed shell of incredible heat. His vine control evolves into massive root storms and his fire burns hot enough to melt titanium.',
    abilities: ['Blue Fire', 'Root Storm', 'Explosive Seeds', 'Rapid Regeneration', 'Heat Core'],
    accent: '#44ff88',
    background: 'linear-gradient(160deg,#001a06,#003d14)',
    featured: true,
    series: ['Ultimate Alien'],
    isUltimate: true,
    baseAlien: 'Swampfire',
  },
  {
    name: 'Ultimate Echo Echo',
    img: '/images/ultimate-echoecho.png',
    sliderImg: '/images/ultimate-echoecho.png',
    type: 'Sonic',
    planet: 'Sonorosia',
    power: 85,
    description: 'The ultimate evolution of Echo Echo. His body is now a metallic blue suit of armor that generates devastating sonic discs. He no longer needs to physically duplicate — his discs do the work.',
    abilities: ['Sonic Discs', 'Ultrasonic Screech', 'Disc Shield', 'Sound Manipulation', 'Metal Form'],
    accent: '#aaddff',
    background: 'linear-gradient(160deg,#050d14,#0a1e2e)',
    featured: false,
    series: ['Ultimate Alien'],
    isUltimate: true,
    baseAlien: 'Echo Echo',
  },
  {
    name: 'Ultimate Cannonbolt',
    img: '/images/ultimate-cannonbolt.png',
    sliderImg: '/images/ultimate-cannonbolt.png',
    type: 'Strength',
    planet: 'Arburia',
    power: 88,
    description: 'The ultimate form of Cannonbolt with spiked armor. He rolls at hyper-sonic speeds and his shell can now absorb energy attacks and re-release them as explosive blasts.',
    abilities: ['Hyper-Spin', 'Energy Absorption', 'Spike Shell', 'Explosive Release', 'Crush Force'],
    accent: '#ffcc00',
    background: 'linear-gradient(160deg,#1a1000,#3d2800)',
    featured: false,
    series: ['Ultimate Alien'],
    isUltimate: true,
    baseAlien: 'Cannonbolt',
  },
  {
    name: 'Ultimate Wildmutt',
    img: '/images/ultimate-wildmutt.png',
    sliderImg: '/images/ultimate-wildmutt.png',
    type: 'Feral',
    planet: 'Vulpin',
    power: 86,
    description: 'The ultimate evolved form of Wildmutt. His quills are now longer and sharper, his senses are beyond measure, and he gains the ability to speak. His ferocity and tracking abilities become virtually supernatural.',
    abilities: ['Super Senses', 'Quill Barrage', 'Feral Rage', 'Enhanced Tracking', 'Battle Speech'],
    accent: '#ff7700',
    background: 'linear-gradient(160deg,#1a0a00,#3d1800)',
    featured: false,
    series: ['Ultimate Alien'],
    isUltimate: true,
    baseAlien: 'Wildmutt',
  },
];

const episodes = [
  { seriesTitle:'Ben 10 (Original)', seriesNumber:1, year:'2005–2008', totalEpisodes:52, color:'#00ff88', badge:'Classic', description:'The origin story. 10-year-old Ben finds the Omnitrix on a camping trip and gains the power to transform into 10 alien heroes.', highlights:['And Then There Were 10','The Krakken','Ghostfreaked Out','Ben 10 vs. Negative 10'] },
  { seriesTitle:'Alien Force', seriesNumber:2, year:'2008–2010', totalEpisodes:46, color:'#4fc3f7', badge:'Fan Fav', description:'Five years later. A teenage Ben reforms the team to fight a Highbreed invasion threatening all life on Earth.', highlights:['Ben 10 Returns','Plumbers Helpers','War of the Worlds','The Final Battle'] },
  { seriesTitle:'Ultimate Alien', seriesNumber:3, year:'2010–2012', totalEpisodes:52, color:'#cc44ff', badge:'Epic', description:'Ben\'s secret identity is exposed to the world. The Ultimatrix allows him to evolve his aliens to their ultimate forms.', highlights:['Fame','Ultimate Aggregor','The Ultimate Enemy','Ben 10,000 Returns'] },
  { seriesTitle:'Omniverse', seriesNumber:4, year:'2012–2014', totalEpisodes:80, color:'#ff6600', badge:'Finale', description:'Ben teams up with new partner Rook Blonko while facing villains from across the multiverse.', highlights:['The More Things Change','Showdown','Weapon XI','A New Dawn'] },
];

const games = [
  { title:'Protector of Earth', platform:'PS2 / Wii / PSP', year:2007, rating:4.2, color:'#00ff88', tag:'Action', description:'Battle through iconic environments as Ben\'s most powerful alien forms. A classic action-adventure that launched Ben 10 gaming.', thumb:'/images/alien1.png' },
  { title:'Alien Force', platform:'Nintendo DS', year:2008, rating:4.0, color:'#4fc3f7', tag:'RPG', description:'An RPG-style adventure featuring Ben, Gwen, and Kevin battling the Highbreed threat across alien worlds.', thumb:'/images/alien3.png' },
  { title:'Cosmic Destruction', platform:'PS3 / Xbox 360 / Wii', year:2010, rating:4.5, color:'#cc44ff', tag:'3D Action', description:'Travel the globe and transform into ultimate aliens to battle powerful enemies threatening to destroy the Earth.', thumb:'/images/alien5.png' },
  { title:'Omniverse 2', platform:'3DS / Wii U', year:2014, rating:3.8, color:'#ff6600', tag:'Beat Em Up', description:'Team up with Rook and fight through Undertown to stop Khyber and Dr. Psychobos from unleashing chaos.', thumb:'/images/alien4.png' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Alien.deleteMany({});
    await Episode.deleteMany({});
    await Game.deleteMany({});

    await Alien.insertMany([...aliens, ...ultimateAliens]);
    await Episode.insertMany(episodes);
    await Game.insertMany(games);

    console.log('✅ Database seeded successfully!');
    console.log(`   → ${aliens.length} regular aliens`);
    console.log(`   → ${ultimateAliens.length} ultimate aliens`);
    console.log(`   → ${episodes.length} episode series`);
    console.log(`   → ${games.length} games`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
