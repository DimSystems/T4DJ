export let Languages = {
  TotalLanguages: ["ENGLISH", "BRAZILIAN", "DUTCH", "FRENCH", "RUSSIAN"],
  LanguageSectionPage: {
    Dutch: {
      TSCREATEDATE: "Transcriptie gemaakt op ", 
      TitleThread: "Thread kanaal in ",
      TitleDM: "Rechtstreekse berichten ",
      TitleDM1: "Onbekende ontvanger",
      TitleVC: "Spraaktekstkanaal voor ",
      TitleCT: "Categorie Kanaal",
      TitleCT1: "Onderwerp",
      TitleCH: "De start van #",
      TitleCH1: "Onbekend kanaal",
      Footer0: "Geëxporteerd",
      Footer1: "bericht",
      Footer2: "Powered by",
      LogsStart0: "Er wordt gewerkt aan het maken van transcripties",
      LogsEnd0: "Succes! Je transcriptie is klaar! Het koste ",
      ExportTimeWord: "genomen "
    }, 
    Brazilian: {
      TSCREATEDATE: "Transcrição criada em " ,
      TitleThread: "Canal de rosca em ",
      TitleDM: "Mensagens diretas",
      TitleDM1: "Destinatário desconhecido",
      TitleVC: "Canal de texto de voz para ",
      TitleCT: "Canal da categoria",
      TitleCT1: "Tópico",
      TitleCH: "Isso é o começo do canal #",
      TitleCH1: "Canal desconhecido",
      Footer0: "Exportado",
      Footer1: "mensagem",
      Footer2: "Desenvolvido por",
      LogsStart0: "A criação da transcrição está em andamento",
      LogsEnd0: "Sucesso! Sua transcrição está pronta! Foi necessário ",
      ExportTimeWord: "Took "
    },
    English: {
      TSCREATEDATE: "Transcript created on " ,
      TitleThread: "Thread channel in ",
      TitleDM: "Direct Messages",
      TitleDM1: "Unknown Recipient",
      TitleVC: "Voice Text Channel for ",
      TitleCT: "Category Channel",
      TitleCT1: "Topic",
      TitleCH: "The start of #",
      TitleCH1: "Unknown Channel",
      Footer0: "Exported",
      Footer1: "message",
      Footer2: "Powered by",
      LogsStart0: "Transcript creation is in progress",
      LogsEnd0: "Success! Your transcript is ready! It took ",
      ExportTimeWord: "Took "
    }, 
    French: {
      TSCREATEDATE: "Transcription créée le ",
      TitleThread: "Chaîne de discussion dans ",
      TitleDM: "Messages directs",
      TitleDM1: "Destinataire inconnu",
      TitleVC: "Chaîne vocale pour ",
      TitleCT: "Chaîne de catégorie",
      TitleCT1: "Sujet",
      TitleCH: "Le début de #",
      TitleCH1: "Chaîne inconnue",
      Footer0: "Exporté",
      Footer1: "message",
      Footer2: "Propulsé par",
      LogsStart0: "La création de la transcription est en cours",
      LogsEnd0: "Succès ! Votre transcription est prête ! Cela a pris ",
      ExportTimeWord: "A pris "
    }
  },
   LanguageSectionEmoji: { 
    Dutch: {
      errorMessage: "[T4DJ | Fout melding] Kan emoji voor transcriptie niet downloaden: "
    }, 
    Brazilian: {
      errorMessage: "[T4DJ | Erro crítico] Falha ao fazer o download do emoji para a transcrição: "
    },
    English: {
      errorMessage: "[T4DJ | Critical Error] Failed to download emoji for transcript: "
    }, 
    French: {
      errorMessage: "[T4DJ | Erreur critique] Échec du téléchargement de l'emoji pour la transcription: "
    }
  }, 
  LanguageSectionReaction: {
    Dutch: {
      errorMessage: "[T4DJ | Fout melding] Kan reactie-emoji voor transcriptie niet downloaden: "
    }, 
    Brazilian: {
      errorMessage: "[T4DJ | Erro crítico] Falha ao fazer o download do emoji de reação para a transcrição: "
    },
    English: {
      errorMessage: "[T4DJ | Critical Error] Failed to download reaction emoji for transcript: "
    }, 
    French: {
      errorMessage: "[T4DJ | Erreur critique] Échec du téléchargement de l'emoji de réaction pour la transcription: "
    }
  },
  LanguageSectionComponent: {
    Dutch: {
      errorMessage: "[T4DJ | Fout melding] Kan component-emoji voor transcriptie niet downloaden: "
    }, 
    Brazilian: {
      errorMessage: "[T4DJ | Erro crítico] Falha ao fazer o download do emoji do componente para transcrição: "
    },
    English: {
      errorMessage: "[T4DJ | Critical Error] Failed to download component emoji for transcript: "
    },
    French: {
      errorMessage: "[T4DJ | Erreur critique] Échec du téléchargement de l'emoji de composant pour la transcription: "
    }
  }, 
  LanguageSectionUtil: {
    Dutch: {
      errorMessage0: "[T4DJ | Fout melding] Kan niet downloaden. Bijlagen voor transcript bekijken: ",
      errorMessage1: "[T4DJ | Fout melding] Kan op code gebaseerde gegevens voor transcript niet downloaden: "
    }, 
    Brazilian: {
      errorMessage0: "[T4DJ | Erro crítico] Falha ao fazer o download de Exibir anexos para transcrição: ",
      errorMessage1: "[T4DJ | Erro Crítico] Falha ao fazer download dos dados baseados em código para a transcrição: "
    },
    English: {
      errorMessage0: "[T4DJ | Critical Error] Failed to download Viewing attachments for transcript: ",
      errorMessage1: "[T4DJ | Critical Error] Failed to download Code Based Data for transcript: "
    },  French: {
      errorMessage0: "[T4DJ | Erreur critique] Échec du téléchargement des pièces jointes pour la transcription: ",
    errorMessage1: "[T4DJ | Erreur critique] Échec du téléchargement des données basées sur le code pour la transcription: "
    }
  },
   LanguageSectionMessage: {
    Dutch: {
      dscmsg1: "Bericht",
      dscmsg2: "Bekijk Thread",
      dscmsg3: "Thread bericht niet opgeslagen.",
      dscmsg4: "Deze <u>interactie</u> is mislukt!"
    }, 
    Brazilian: {
      dscmsg1: "Mensagem",
      dscmsg2: "View Thread",
      dscmsg3: "As mensagens da linha de discussão não foram salvas",
      dscmsg4: "Essa <u>interação</u> não conseguiu responder!"
    },
    English: {
      dscmsg1: "Message",
      dscmsg2: "View Thread",
      dscmsg3: "Thread messages not saved.",
      dscmsg4: "This <u>interaction</u> failed to respond!"
    },  French: {
      dscmsg1: "Message",
dscmsg2: "Voir la discussion",
dscmsg3: "Messages de la discussion non enregistrés.",
dscmsg4: "Cette <u>interaction</u> n'a pas réussi à répondre !"
    }
  },
  LanguageSectionAvatars: {
    Dutch: {
      errorMessage: "[T4DJ | Fout melding] Kan Avatar niet downloaden voor transcriptie:"
    }, 
    Brazilian: {
      errorMessage: "[T4DJ | Erro crítico] Falha ao fazer o download do Avatar para transcrição: "
    },
    English: {
      errorMessage: "[T4DJ | Critical Error] Failed to download Avatar for transcript: "
    },  French: {
      errorMessage: "[T4DJ | Erreur critique] Échec du téléchargement de l'Avatar pour la transcription: "
    }
  },
  LanguageSectionReply: {
    Dutch: {
      dscmsg1: "klik om het commando te zien.",
    dscmsg2: "Klik om bijlage te zien."  
    }, 
    Brazilian: {
      dscmsg1: "Clique para ver o comando.",
      dscmsg2: "Clique para ver o anexo.."
    },
    English: {
      dscmsg1: "Click to see command.",
      dscmsg2: "Click to see attachment."
    },  French: {
      dscmsg1: "Cliquez pour voir la commande.",
dscmsg2: "Cliquez pour voir la pièce jointe."
    }
    
  }, 
  LanguageSectionSysMessages: {
    Dutch: {
      dscmsg1: "pinned",
      dscmsg2: "een bericht",
      dscmsg3: "naar dit kanaal.",
      dscmsg4: "de server geboost",
      dscmsg5: "start een thread:",
      allJoinMessages: [
        "{user} heeft zich zojuist aangesloten bij de server - glhf!",
        "{user} net lid geworden. Iedereen, kijk druk!",
        "{user} is net lid geworden. Kan ik een heal krijgen?",
        "{user} is bij je groep gekomen.",
        "{user} is erbij gekomen. Je moet extra pylonen bouwen",
        "Ermagherd. {user} is hier.",
        "Welkom, {user}. Blijf even en luister",
        "Welkom, {gebruseruiker}. We verwachtten je ( ͡° ͜ʖ ͡°)'",
        "Welkom, {user}. We hopen dat je pizza hebt meegenomen",
        "Welkom {user}. Laat je wapens bij de deur",
        "Een wilde {user} verscheen",
        "Swoooosh. {user} is net geland",
        "Zet je schrap. {user} heeft zich net bij de server gevoegd",
        "{user} is net lid geworden. Verstop je bananen",
        "{user} is net aangekomen. Lijkt OP - nerf alsjeblieft",
        "{user} is zojuist de server binnen gegleden",
        "Een {user} is in de server gespawned",
        "Grote {user} is verschenen",
        "Waar is {user}? In de server!",
        "{user} sprong in de server. Kangoeroe",
        "{user} is net verschenen. Hou mijn bier vast",
        "Uitdager nadert - {user} is verschenen!",
        "Het is een vogel! Het is een vliegtuig! Laat maar, het is gewoon {user}.",
        "Het is een vogel. Prijs de zon. \\\\[T]/",
        "Nooit zal ik een {user} opgeven. Laat {user} nooit in de steek",
        "Ha! {user} heeft zich aangesloten. Je hebt mijn valstrik geactiveerd",
        "Proost, liefje. De {user} is er",
         "Hé, luister. {user} is erbij gekomen",
         "We verwachtten je al",
         "Het is gevaarlijk om alleen te gaan, neem {user} mee!",
         "{user} heeft zich bij de server aangesloten! Het is super effectief!",
         "Proost, liefje. {user} is hier",
         "{user} is hier, zoals de voorspelling voorspelde",
         "{user} is aangekomen. Het feest is voorbij",
         "Klaar speler",
         "{user} is hier om kont te schoppen en kauwgom te kauwen. En de kauwgum is op",
         "Hallo. Bent u op zoek naar {user}?",
       ]
    }, 
    Brazilian: {
      dscmsg1: "fixado",
      dscmsg2: "uma mensagem",
      dscmsg3: "para este canal",
      dscmsg4: "impulsionou o servidor!",
      dscmsg5: "iniciou um tópico:",
      allJoinMessages: [
        '{user} acabou de entrar no servidor - glhf!',
        '{user} acabou de entrar. Todos, pareçam ocupados!',
        '{user} acabou de entrar. Posso receber uma cura?',
        '{user} entrou no seu grupo.',
        '{user} entrou. Você deve construir pilões adicionais.',
        'Ermagherd. {user} está aqui.',
        'Bem-vindo, {user}. Fique um tempo e ouça.',
        'Bem-vindo, {user}. Estávamos esperando por você ( ͡° ͜ʖ ͡°)',
        'Bem-vindo, {user}. Esperamos que você tenha trazido pizza.',
        'Bem-vindo {user}. Deixe suas armas na porta.',
        'Um {user} selvagem apareceu.',
        'Swoooosh. {user} acabou de pousar.',
        'Preparem-se {user} acabou de entrar no servidor.',
        '{user} acabou de entrar. Escondam suas bananas.',
        '{user} acabou de chegar. Parece OP - por favor, faça um nerf.',
        '{user} acabou de escorregar para o servidor.',
        'Um {user} nasceu no servidor.',
        '{user} grande apareceu!',
        "Onde está {user}? No servidor!",
        '{user} saltou para o servidor. Canguru!!',
        '{user} acabou de aparecer. Segurem minha cerveja.',
        'Desafiante se aproximando - {user} apareceu!',
        "É um pássaro! É um avião! Não se preocupe, é apenas {user}.",
        "É {user}! Louvado seja o sol! \\\\[T]/",
        'Nunca vou desistir de {user}. Nunca vou abandonar {user}.',
        'Ha! {user} entrou! Você ativou minha carta armadilha!',
        'Saúde, amor! {user} está aqui!',
        'Ei! Escutem! {user} entrou!',
        "Estávamos esperando por você {user}",
        "É perigoso ir sozinho, leve {user}!",
        "{user} entrou no servidor! É super eficaz!",
        'Saúde, amor! {user} está aqui!',
        '{user} está aqui, como a profecia previu.',
        "{user} chegou. A festa acabou.",
        'Jogador pronto {user}',
        '{user} está aqui para chutar traseiros e mastigar chiclete. E {user} está sem chiclete.',
        "Olá. É {user} que você está procurando?",
      ]
    },
    English: {
      dscmsg1: "pinned",
      dscmsg2: "a message",
      dscmsg3: "to this channel.",
      dscmsg4: "boosted the server!",
      dscmsg5: "started a thread:",
      allJoinMessages: [
        '{user} just joined the server - glhf!',
        '{user} just joined. Everyone, look busy!',
        '{user} just joined. Can I get a heal?',
        '{user} joined your party.',
        '{user} joined. You must construct additional pylons.',
        'Ermagherd. {user} is here.',
        'Welcome, {user}. Stay awhile and listen.',
        'Welcome, {user}. We were expecting you ( ͡° ͜ʖ ͡°)',
        'Welcome, {user}. We hope you brought pizza.',
        'Welcome {user}. Leave your weapons by the door.',
        'A wild {user} appeared.',
        'Swoooosh. {user} just landed.',
        'Brace yourselves {user} just joined the server.',
        '{user} just joined. Hide your bananas.',
        '{user} just arrived. Seems OP - please nerf.',
        '{user} just slid into the server.',
        'A {user} has spawned in the server.',
        'Big {user} showed up!',
        "Where's {user}? In the server!",
        '{user} hopped into the server. Kangaroo!!',
        '{user} just showed up. Hold my beer.',
        'Challenger approaching - {user} has appeared!',
        "It's a bird! It's a plane! Nevermind, it's just {user}.",
        "It's {user}! Praise the sun! \\\\[T]/",
        'Never gonna give {user} up. Never gonna let {user} down.',
        'Ha! {user} has joined! You activated my trap card!',
        'Cheers, love! {user} is here!',
        'Hey! Listen! {user} has joined!',
        "We've been expecting you {user}",
        "It's dangerous to go alone, take {user}!",
        "{user} has joined the server! It's super effective!",
        'Cheers, love! {user} is here!',
        '{user} is here, as the prophecy foretold.',
        "{user} has arrived. Party's over.",
        'Ready player {user}',
        '{user} is here to kick butt and chew bubblegum. And {user} is all out of gum.',
        "Hello. Is it {user} you're looking for?",
      ]
    }, French: {
      dscmsg1: "épinglé",
dscmsg2: "un message",
dscmsg3: "dans ce canal.",
dscmsg4: "a boosté le serveur !",
dscmsg5: "a lancé un fil de discussion :",
allJoinMessages: [
"{user} vient de rejoindre le serveur - glhf !",
"{user} vient de rejoindre. Tout le monde, ayez l'air occupé !",
"{user} vient de rejoindre. Puis-je avoir un soin ?",
"{user} a rejoint votre groupe.",
"{user} a rejoint. Vous devez construire des pylônes supplémentaires.",
"Ermagherd. {user} est là.",
"Bienvenue, {user}. Restez un moment et écoutez.",
"Bienvenue, {user}. Nous vous attendions ( ͡° ͜ʖ ͡°)",
"Bienvenue, {user}. Nous espérons que vous avez apporté de la pizza.",
"Bienvenue {user}. Laissez vos armes à la porte.",
"Un {user} sauvage est apparu.",
"Swoooosh. {user} vient d'atterrir.",
"Tenez-vous prêts, {user} vient de rejoindre le serveur.",
"{user} vient de rejoindre. Cachez vos bananes.",
"{user} vient d'arriver. Semble OP - veuillez rééquilibrer.",
"{user} vient de glisser dans le serveur.",
"Un {user} est apparu dans le serveur.",
"Gros {user} est arrivé !",
"Où est {user} ? Dans le serveur !",
"{user} a sauté dans le serveur. Kangourou !!",
"{user} vient d'arriver. Tenez ma bière.",
"Challenger en approche - {user} est apparu !",
"C'est un oiseau ! C'est un avion ! Peu importe, c'est juste {user}.",
"C'est {user} ! Louez le soleil ! \\[T]/",
"Jamais gonna give {user} up. Jamais gonna let {user} down.",
"Ha ! {user} a rejoint ! Vous avez activé ma carte piège !",
"Cheers, love ! {user} est là !",
"Hé ! Écoutez ! {user} a rejoint !",
"Nous vous attendions {user}",
"C'est dangereux d'y aller seul, emmenez {user} !",
"{user} a rejoint le serveur ! C'est super efficace !",
"Cheers, love ! {user} est là !",
"{user} est là, comme le prédisait la prophétie.",
"{user} est arrivé. La fête est finie.",
"Joueur prêt {user}",
"{user} est là pour botter des derrières et mâcher du chewing-gum. Et {user} n'en a plus.",
"Bonjour. Est-ce {user} que vous cherchez ?",
]
    }
  }
}