export const COURSE = [
  {
    id: 1, title: 'Unit 1 · Script & greetings', subtitle: 'Read your first Sanskrit words',
    skills: [
      { id:'1a', title:'First sounds', description:'अ आ इ ई and simple greetings', exercises:[
        {type:'teach', prompt:'Meet your first Sanskrit word', word:'नमस्ते', translit:'namaste', meaning:'hello / respectful greeting', note:'Tap the blue word whenever you need its meaning.'},
        {type:'choice', prompt:'What does this mean?', tokens:[{t:'नमस्ते',m:'hello / respectful greeting'}], options:['Hello','Water','Book','I'], answer:'Hello'},
        {type:'teach', prompt:'A useful noun', word:'जलम्', translit:'jalam', meaning:'water', note:'Final म् is part of the neuter singular form used here.'},
        {type:'blocks', prompt:'Build “water” in Sanskrit.', blocks:['जलम्','नमस्ते','अहम्'], answer:['जलम्']},
        {type:'listen', prompt:'Listen and choose what you hear.', speech:'नमस्ते', options:['नमस्ते','जलम्','अहम्'], answer:'नमस्ते'}
      ]},
      { id:'1b', title:'I and you', description:'अहम्, त्वम् and अस्मि', exercises:[
        {type:'teach', prompt:'New pronoun', word:'अहम्', translit:'aham', meaning:'I', note:'अहम् is the first person singular pronoun.'},
        {type:'teach', prompt:'New verb', word:'अस्मि', translit:'asmi', meaning:'am', note:'अहम् अस्मि literally gives “I am”.'},
        {type:'blocks', prompt:'Build “I am”.', blocks:['अहम्','अस्मि','त्वम्','अस्ति'], answer:['अहम्','अस्मि']},
        {type:'choice', prompt:'Which word means “I”?', options:['अहम्','त्वम्','सः','सा'], answer:'अहम्'},
        {type:'speak', prompt:'Say this in Sanskrit: “I am.”', answer:'अहम् अस्मि', speech:'अहम् अस्मि', alternatives:['अहं अस्मि']}
      ]},
      { id:'1c', title:'This is…', description:'एतत् and simple identification', exercises:[
        {type:'teach', prompt:'New word', word:'एतत्', translit:'etat', meaning:'this (neuter)', note:'Use it with neuter nouns such as पुस्तकम्.'},
        {type:'teach', prompt:'New word', word:'पुस्तकम्', translit:'pustakam', meaning:'book', note:'पुस्तकम् is a neuter noun.'},
        {type:'blocks', prompt:'Build “This is a book.”', blocks:['एतत्','पुस्तकम्','बालकः','गच्छति'], answer:['एतत्','पुस्तकम्']},
        {type:'type', prompt:'Write “book” in Sanskrit.', answer:'पुस्तकम्', alternatives:['पुस्तकं'], hint:'Use the Sanskrit keyboard below.'},
        {type:'speak', prompt:'Say “This is a book.”', answer:'एतत् पुस्तकम्', speech:'एतत् पुस्तकम्', alternatives:['एतत् पुस्तकं']}
      ]}
    ]
  },
  {
    id: 2, title: 'Unit 2 · People & actions', subtitle: 'Make your first complete sentences',
    skills: [
      {id:'2a',title:'Boy and girl',description:'बालकः, बालिका and agreement',exercises:[
        {type:'teach',prompt:'New noun',word:'बालकः',translit:'bālakaḥ',meaning:'boy',note:'ः is visarga. Here it marks the nominative singular of this masculine noun.'},
        {type:'teach',prompt:'New noun',word:'बालिका',translit:'bālikā',meaning:'girl',note:'This feminine noun ends in long आ.'},
        {type:'choice',prompt:'Which means “girl”?',options:['बालिका','बालकः','पुस्तकम्','जलम्'],answer:'बालिका'},
        {type:'blocks',prompt:'Build “the boy”.',blocks:['बालकः','बालिका','फलम्'],answer:['बालकः']},
        {type:'listen',prompt:'Listen and choose.',speech:'बालिका',options:['बालिका','बालकः','पुस्तकम्'],answer:'बालिका'}
      ]},
      {id:'2b',title:'Reads and goes',description:'पठति and गच्छति',exercises:[
        {type:'teach',prompt:'New verb',word:'पठति',translit:'paṭhati',meaning:'reads',note:'Third person singular: “he/she reads”.'},
        {type:'teach',prompt:'New verb',word:'गच्छति',translit:'gacchati',meaning:'goes',note:'Third person singular: “he/she goes”.'},
        {type:'blocks',prompt:'Build “The boy reads.”',blocks:['बालकः','पठति','गच्छति','बालिका'],answer:['बालकः','पठति']},
        {type:'blocks',prompt:'Build “The girl goes.”',blocks:['बालिका','गच्छति','पठति','बालकः'],answer:['बालिका','गच्छति']},
        {type:'speak',prompt:'Say “The boy reads.”',answer:'बालकः पठति',speech:'बालकः पठति',alternatives:['बालक पठति']}
      ]},
      {id:'2c',title:'Questions',description:'किम् and simple answers',exercises:[
        {type:'teach',prompt:'Question word',word:'किम्',translit:'kim',meaning:'what?',note:'किम् changes form according to gender and case; this is the neuter nominative/accusative singular form.'},
        {type:'blocks',prompt:'Build “What is this?”',blocks:['किम्','एतत्','अहम्','पठति'],answer:['किम्','एतत्']},
        {type:'choice',prompt:'किम् means…',options:['what?','where?','who?','when?'],answer:'what?'},
        {type:'type',prompt:'Write “what?” in Sanskrit.',answer:'किम्',alternatives:['किं'],hint:'Use the Sanskrit keyboard.'}
      ]}
    ]
  },
  {
    id: 3, title: 'Unit 3 · Objects & case', subtitle: 'Understand who does what to whom',
    skills: [
      {id:'3a',title:'The object',description:'Accusative case in real sentences',exercises:[
        {type:'teach',prompt:'New noun',word:'फलम्',translit:'phalam',meaning:'fruit',note:'For this neuter noun the nominative and accusative singular are both फलम्.'},
        {type:'teach',prompt:'New verb',word:'खादति',translit:'khādati',meaning:'eats',note:'Third person singular.'},
        {type:'blocks',prompt:'Build “The boy eats fruit.”',blocks:['बालकः','फलम्','खादति','पठति'],answer:['बालकः','फलम्','खादति']},
        {type:'choice',prompt:'In “बालकः फलम् खादति”, which word is the object?',options:['फलम्','बालकः','खादति'],answer:'फलम्'},
        {type:'speak',prompt:'Say “The boy eats fruit.”',answer:'बालकः फलम् खादति',speech:'बालकः फलम् खादति',alternatives:['बालकः फलं खादति']}
      ]},
      {id:'3b',title:'Masculine objects',description:'बालकः → बालकम्',exercises:[
        {type:'teach',prompt:'Case change',word:'बालकम्',translit:'bālakam',meaning:'boy (as object)',note:'Compare subject बालकः with object बालकम्.'},
        {type:'choice',prompt:'Which form means “boy” when he is the direct object?',options:['बालकम्','बालकः','बालिका','बालकेन'],answer:'बालकम्'},
        {type:'blocks',prompt:'Build “The girl sees the boy.”',blocks:['बालिका','बालकम्','पश्यति','बालकः'],answer:['बालिका','बालकम्','पश्यति']},
        {type:'teach',prompt:'New verb',word:'पश्यति',translit:'paśyati',meaning:'sees',note:'Third person singular.'}
      ]},
      {id:'3c',title:'Sentence order',description:'Flexible order, clear endings',exercises:[
        {type:'choice',prompt:'What mainly tells you that बालकम् is the object?',options:['Its case ending','Its position only','Its length','The punctuation'],answer:'Its case ending'},
        {type:'blocks',prompt:'Build a normal Sanskrit order for “The girl sees the boy.”',blocks:['बालिका','बालकम्','पश्यति'],answer:['बालिका','बालकम्','पश्यति']},
        {type:'listen',prompt:'Listen and choose the meaning.',speech:'बालिका बालकम् पश्यति',options:['The girl sees the boy.','The boy sees the girl.','The girl reads.'],answer:'The girl sees the boy.'}
      ]}
    ]
  },
  {
    id: 4, title: 'Unit 4 · Possession & place', subtitle: 'Say whose thing it is and where things are',
    skills: [
      {id:'4a',title:'My and your',description:'मम and तव',exercises:[
        {type:'teach',prompt:'New word',word:'मम',translit:'mama',meaning:'my / of me',note:'A genitive form meaning “of me”.'},
        {type:'teach',prompt:'New word',word:'तव',translit:'tava',meaning:'your / of you',note:'Singular informal “of you”.'},
        {type:'blocks',prompt:'Build “my book”.',blocks:['मम','पुस्तकम्','तव','जलम्'],answer:['मम','पुस्तकम्']},
        {type:'choice',prompt:'तव means…',options:['your','my','his','our'],answer:'your'}
      ]},
      {id:'4b',title:'In the house',description:'गृहे and locative case',exercises:[
        {type:'teach',prompt:'New noun form',word:'गृहे',translit:'gṛhe',meaning:'in the house',note:'This is the locative singular of गृह.'},
        {type:'teach',prompt:'New verb',word:'अस्ति',translit:'asti',meaning:'is',note:'Third person singular of “to be”.'},
        {type:'blocks',prompt:'Build “The book is in the house.”',blocks:['पुस्तकम्','गृहे','अस्ति','मम'],answer:['पुस्तकम्','गृहे','अस्ति']},
        {type:'speak',prompt:'Say “The book is in the house.”',answer:'पुस्तकम् गृहे अस्ति',speech:'पुस्तकम् गृहे अस्ति',alternatives:['पुस्तकं गृहे अस्ति']}
      ]},
      {id:'4c',title:'Where?',description:'कुत्र and place questions',exercises:[
        {type:'teach',prompt:'Question word',word:'कुत्र',translit:'kutra',meaning:'where?',note:'Use कुत्र to ask where something is.'},
        {type:'blocks',prompt:'Build “Where is the book?”',blocks:['कुत्र','पुस्तकम्','अस्ति','किम्'],answer:['पुस्तकम्','कुत्र','अस्ति']},
        {type:'choice',prompt:'Which word asks “where?”',options:['कुत्र','किम्','मम','तव'],answer:'कुत्र'}
      ]}
    ]
  },
  {
    id: 5, title: 'Unit 5 · Present tense patterns', subtitle: 'Start producing Sanskrit independently',
    skills: [
      {id:'5a',title:'I read, you read',description:'पठामि and पठसि',exercises:[
        {type:'teach',prompt:'First person verb',word:'पठामि',translit:'paṭhāmi',meaning:'I read',note:'The -मि ending marks first person singular.'},
        {type:'teach',prompt:'Second person verb',word:'पठसि',translit:'paṭhasi',meaning:'you read',note:'The -सि ending marks second person singular.'},
        {type:'blocks',prompt:'Build “I read.”',blocks:['अहम्','पठामि','पठसि','पठति'],answer:['अहम्','पठामि']},
        {type:'blocks',prompt:'Build “You read.”',blocks:['त्वम्','पठसि','पठामि','अहम्'],answer:['त्वम्','पठसि']},
        {type:'speak',prompt:'Say “I read.”',answer:'अहम् पठामि',speech:'अहम् पठामि',alternatives:['अहं पठामि']}
      ]},
      {id:'5b',title:'Verb person',description:'Recognise -मि, -सि, -ति',exercises:[
        {type:'choice',prompt:'Which ending normally marks “I” in these present tense forms?',options:['-मि','-सि','-ति','-न्ति'],answer:'-मि'},
        {type:'choice',prompt:'पठसि means…',options:['you read','I read','he/she reads','they read'],answer:'you read'},
        {type:'blocks',prompt:'Match subject and verb: “she reads”.',blocks:['सा','पठति','पठामि','पठसि'],answer:['सा','पठति']}
      ]},
      {id:'5c',title:'Checkpoint',description:'Mixed reading, grammar and speaking',exercises:[
        {type:'choice',prompt:'Translate: “मम पुस्तकम् गृहे अस्ति।”',options:['My book is in the house.','Your book is here.','I read a book.','The boy goes home.'],answer:'My book is in the house.'},
        {type:'blocks',prompt:'Build “You read my book.”',blocks:['त्वम्','मम','पुस्तकम्','पठसि','पठामि'],answer:['त्वम्','मम','पुस्तकम्','पठसि']},
        {type:'type',prompt:'Write “I read” in Sanskrit.',answer:'अहम् पठामि',alternatives:['अहं पठामि'],hint:'Use the keyboard or type with a Devanagari keyboard.'},
        {type:'speak',prompt:'Say “You read.”',answer:'त्वम् पठसि',speech:'त्वम् पठसि',alternatives:['त्वं पठसि']}
      ]}
    ]
  }
];

export const PLACEMENT = [
  {unit:1,prompt:'What does “अहम्” mean?',options:['I','you','book','water'],answer:'I'},
  {unit:1,prompt:'Choose the Sanskrit for “This is a book.”',options:['एतत् पुस्तकम्','अहम् अस्मि','बालकः पठति','किम् एतत्'],answer:'एतत् पुस्तकम्'},
  {unit:2,prompt:'Translate “बालिका गच्छति।”',options:['The girl goes.','The boy reads.','The girl reads.','The boy goes.'],answer:'The girl goes.'},
  {unit:2,prompt:'Which means “reads”?',options:['पठति','गच्छति','खादति','अस्ति'],answer:'पठति'},
  {unit:3,prompt:'In “बालकः फलम् खादति”, what grammatical role does फलम् have?',options:['Direct object','Subject','Verb','Possessor'],answer:'Direct object'},
  {unit:3,prompt:'Choose the object form of बालक.',options:['बालकम्','बालकः','बालके','बालकस्य'],answer:'बालकम्'},
  {unit:4,prompt:'What does “मम पुस्तकम्” mean?',options:['my book','your book','in the book','the book reads'],answer:'my book'},
  {unit:4,prompt:'गृहे is best translated here as…',options:['in the house','from the house','of the house','to the house'],answer:'in the house'},
  {unit:5,prompt:'Which form means “I read”?',options:['पठामि','पठसि','पठति','पठन्ति'],answer:'पठामि'},
  {unit:5,prompt:'Which form matches त्वम्?',options:['पठसि','पठामि','पठति','पठन्ति'],answer:'पठसि'}
];

export const DEVANAGARI_KEYS = [
  'अ','आ','इ','ई','उ','ऊ','ऋ','ए','ऐ','ओ','औ','ं','ः','्',
  'क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण',
  'त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह',
  'ा','ि','ी','ु','ू','ृ','े','ै','ो','ौ','।'
];