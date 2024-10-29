export type GenderWeights = {
    [key: string]: number;
  };


export const genderWeights: GenderWeights = {
    // Masculine-associated words
    // Pronouns and basic terms
    he: 1, his: 1, him: 1, himself: 1, hes: 1,
    man: 1, boy: 1, male: 1, masculine: 1, manly: 1,
    gentleman: 1, fellow: 1, chap: 1, guy: 1, dude: 1,
    lad: 1, bloke: 1, gent: 1, boys: 1, men: 1,
    
    // Family/Relationship roles - Extended
    father: 1, brother: 1, son: 1, grandfather: 1,
    uncle: 1, nephew: 1, husband: 1, bachelor: 1,
    groom: 1, widower: 1, stepfather: 1, godfather: 1,
    patriarch: 1, grandpa: 1, dad: 1, daddy: 1,
    papa: 1, pop: 1, pops: 1, stepdad: 1,
    stepson: 1, stepbrother: 1, father_in_law: 1,
    brother_in_law: 1, son_in_law: 1, grandson: 1,
    great_grandfather: 1, great_uncle: 1,
    
    // Titles/Honorifics - Extended
    mr: 1, sir: 1, gentlemans: 1, king: 1,
    prince: 1, lord: 1, duke: 1, emperor: 1,
    baron: 1, count: 1, knight: 1, esquire: 1,
    master: 1, his_majesty: 1, his_highness: 1,
    his_excellency: 1, his_honor: 1, sultan: 1,
    raja: 1, kaiser: 1, tsar: 1, viceroy: 1,
    marquis: 1, earl: 1, viscount: 1, archduke: 1,
    
    // Professional - Historical/Traditional
    businessman: 1, chairman: 1, salesman: 1, craftsman: 1,
    foreman: 1, councilman: 1, policeman: 1, fireman: 1,
    mailman: 1, workman: 1, tradesman: 1, serviceman: 1,
    alderman: 1, assemblyman: 1, committeeman: 1,
    congressman: 1, doorman: 1, fisherman: 1,
    handyman: 1, huntsman: 1, journeyman: 1,
    lineman: 1, shipman: 1, spokesman: 1,
    weatherman: 1, woodsman: 1, yeoman: 1,
    
    // Leadership/Authority - Expanded
    manager: 0.5, boss: 0.5, leader: 0.5, executive: 0.5,
    ceo: 0.5, director: 0.5, president: 0.5, chief: 0.5,
    supervisor: 0.5, administrator: 0.5, commander: 0.5,
    chairmans: 1, overlord: 0.5, taskmaster: 0.5,
    overseer: 0.5, superintendent: 0.5, principal: 0.5,
    dean: 0.5, provost: 0.5, chancellor: 0.5,
    magistrate: 0.5, commissioner: 0.5, governor: 0.5,
    
    // STEM/Technical - Extended
    engineer: 0.5, scientist: 0.5, researcher: 0.5,
    programmer: 0.5, developer: 0.5, architect: 0.5,
    analyst: 0.5, technician: 0.5, mathematician: 0.5,
    physicist: 0.5, chemist: 0.5, biologist: 0.5,
    astronomer: 0.5, geologist: 0.5, statistician: 0.5,
    
    // Trades/Manual Labor - Extended
    carpenter: 1, plumber: 1, electrician: 1, blacksmith: 1,
    mason: 1, welder: 1, machinist: 1, mechanic: 1,
    roofer: 1, bricklayer: 1, plasterer: 1, glazier: 1,
    pipefitter: 1, steelworker: 1, miner: 1, logger: 1,
    builder: 1, construction_worker: 1, landscaper: 0.5,
    painter: 0.5, gardener: 0.5, janitor: 0.5,
    
    // Military/Security - Extended
    soldier: 1, warrior: 1, guard: 0.5, captain: 0.5,
    general: 0.5, admiral: 0.5, colonel: 0.5, sergeant: 0.5,
    lieutenant: 0.5, major: 0.5, commanders: 0.5,
    trooper: 0.5, cadet: 0.5, recruit: 0.5,
    infantryman: 1, airman: 1, seaman: 1, marine: 0.5,
    paratrooper: 0.5, ranger: 0.5, sniper: 0.5,
    
    // Sports/Athletics - Extended
    sportsman: 1, athlete: 0.5, player: 0.5, coach: 0.5,
    quarterback: 0.5, pitcher: 0.5, defender: 0.5,
    striker: 0.5, forward: 0.5, linebacker: 0.5,
    wrestler: 0.5, boxer: 0.5, fighter: 0.5,
    champion: 0.5, competitor: 0.5, olympian: 0.5,
    
    // Personality/Character Traits - Extended
    strong: 0.5, brave: 0.5, tough: 0.5, aggressive: 0.5,
    ambitious: 0.5, competitive: 0.5, confident: 0.5,
    rational: 0.5, logical: 0.5, stoic: 0.5, stern: 0.5,
    assertive: 0.5, dominant: 0.5, powerful: 0.5,
    bold: 0.5, courageous: 0.5, daring: 0.5,
    determined: 0.5, disciplined: 0.5, fearless: 0.5,
    fierce: 0.5, focused: 0.5, forceful: 0.5,
    hardheaded: 0.5, heroic: 0.5, independent: 0.5,
    intense: 0.5, macho: 1, mighty: 0.5,
    rebellious: 0.5, resolute: 0.5, self_reliant: 0.5,
    stubborn: 0.5, tenacious: 0.5, unemotional: 0.5,
    
    // Feminine-associated words
    // Pronouns and basic terms
    she: -1, her: -1, hers: -1, herself: -1,
    woman: -1, girl: -1, female: -1, feminine: -1,
    lady: -1, gal: -1, lass: -1, maiden: -1,
    women: -1, girls: -1, ladies: -1, females: -1,
    
    // Family/Relationship roles - Extended
    mother: -1, sister: -1, daughter: -1, grandmother: -1,
    aunt: -1, niece: -1, wife: -1, bride: -1,
    widow: -1, stepmother: -1, godmother: -1,
    matriarch: -1, grandma: -1, mom: -1, mommy: -1,
    mama: -1, stepmom: -1, stepdaughter: -1,
    stepsister: -1, mother_in_law: -1, sister_in_law: -1,
    daughter_in_law: -1, granddaughter: -1,
    great_grandmother: -1, great_aunt: -1,
    
    // Titles/Honorifics - Extended
    mrs: -1, miss: -1, ms: -1, ladys: -1, madam: -1,
    queen: -1, princess: -1, duchess: -1, empress: -1,
    baroness: -1, countess: -1, dame: -1,
    her_majesty: -1, her_highness: -1, her_excellency: -1,
    her_honor: -1, sultana: -1, rani: -1,
    tsarina: -1, marchioness: -1, viscountess: -1,
    archduchess: -1, dowager: -1,
    
    // Professional - Historical/Traditional
    businesswoman: -1, chairwoman: -1, saleswoman: -1,
    waitress: -1, actress: -1, stewardess: -1,
    seamstress: -1, hostess: -1, governess: -1,
    authoress: -1, poetess: -1, comedienne: -1,
    ballerina: -1, majorette: -1, usherette: -1,
    
    // Care/Service Roles - Extended
    nurse: -1, teacher: -0.5, caregiver: -1, nanny: -1,
    babysitter: -0.5, assistant: -0.5, secretary: -1,
    receptionist: -0.5, counselor: -0.5, therapist: -0.5,
    midwife: -1, doula: -1, dietitian: -0.5,
    social_worker: -0.5, librarian: -0.5,
    kindergarten_teacher: -1, daycare_worker: -1,
    
    // Domestic/Household - Extended
    homemaker: -1, housekeeper: -1, maid: -1, cook: -0.5,
    cleaner: -0.5, servant: -0.5, decorator: -0.5,
    housewife: -1, domestic: -1, laundress: -1,
    charwoman: -1, scullery_maid: -1, parlor_maid: -1,
    kitchen_maid: -1, chambermaid: -1,
    
    // Beauty/Fashion/Appearance - Extended
    beautician: -1, hairdresser: -0.5, stylist: -0.5,
    cosmetologist: -1, manicurist: -1, model: -0.5,
    fashionista: -1, designer: -0.5, makeup_artist: -0.5,
    esthetician: -1, fashion_consultant: -0.5,
    personal_shopper: -0.5, beauty_advisor: -1,
    image_consultant: -0.5, wedding_planner: -0.5,
    
    // Arts/Creative - Extended
    dancer: -0.5, singer: -0.5, artist: -0.5, writer: -0.5,
    poet: -0.5, musician: -0.5, performer: -0.5,
    actresss: -1, choreographer: -0.5, curator: -0.5,
    illustrator: -0.5, jewelry_maker: -0.5,
    seamstresss: -1, quilter: -1, weaver: -0.5,
    pottery_maker: -0.5, florist: -0.5,
    
    // Personality/Emotional Traits - Extended
    caring: -0.5, nurturing: -1, loving: -0.5, gentle: -0.5,
    emotional: -0.5, sensitive: -0.5, empathetic: -0.5,
    graceful: -0.5, delicate: -0.5, sweet: -0.5,
    compassionate: -0.5, supportive: -0.5, soft: -0.5,
    affectionate: -0.5, cheerful: -0.5, dainty: -1,
    demure: -1, diplomatic: -0.5, feminines: -1,
    flirtatious: -0.5, gentles: -0.5, gracious: -0.5,
    helpful: -0.5, intuitive: -0.5, kind: -0.5,
    maternal: -1, modest: -0.5, passive: -0.5,
    patient: -0.5, peaceful: -0.5, romantic: -0.5,
    sentimental: -0.5, shy: -0.5, sympathetic: -0.5,
    tender: -0.5, understanding: -0.5, warm: -0.5,
    
    // Activities/Interests - Extended
    shopping: -0.5, cooking: -0.5, cleaning: -0.5,
    sewing: -1, knitting: -1, crafting: -0.5,
    gardening: -0.5, decorating: -0.5, baking: -0.5,
    embroidery: -1, crochet: -1, scrapbooking: -0.5,
    flower_arranging: -0.5, interior_design: -0.5,
    pottery: -0.5, quilting: -1, needlework: -1,
    
    // Appearance/Beauty - Extended
    beautiful: -0.5, pretty: -1, lovely: -0.5,
    elegant: -0.5, attractive: -0.5, charming: -0.5,
    gorgeous: -0.5, fashionable: -0.5, gracefuls: -0.5,
    cute: -0.5, daintys: -1, delicates: -0.5,
    femininess: -1, glamorous: -0.5, petite: -1,
    radiant: -0.5, slender: -0.5, stylish: -0.5,
    
    // Gender-neutral - Extended
    // Basic terms
    they: 0, their: 0, them: 0, themselves: 0,
    person: 0, individual: 0, human: 0, people: 0,
    
    // Professional/Occupational
    professional: 0, employee: 0, worker: 0, staff: 0,
    specialist: 0, consultant: 0, analysts: 0,
    representative: 0, coordinator: 0, associate: 0,
    expert: 0, assistants: 0, clerk: 0, officer: 0,
    administrators: 0, managers: 0, supervisors: 0,
    executives: 0, directors: 0, presidents: 0,
    
    // Academic/Educational
    student: 0, scholar: 0, researchers: 0, academic: 0,
    professor: 0, instructor: 0, educator: 0,
    teachers: 0, learner: 0, pupil: 0, graduate: 0,
    
    // Social/Community
    citizen: 0, resident: 0, neighbor: 0, member: 0,
    volunteer: 0, participant: 0, guest: 0,
    visitor: 0, customer: 0, client: 0, patron: 0,
    
    // Relationship/Family
    spouse: 0, partner: 0, parent: 0, child: 0,
    sibling: 0, relative: 0, friend: 0, colleague: 0,
    companion: 0, associates: 0, peer: 0, ally: 0,
    
    // Character/Personality
    intelligent: 0, creative: 0, skilled: 0, 
  
  };