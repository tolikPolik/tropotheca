import { Content, ContentType } from '@/types';

export const CONTENT_DB: Record<ContentType, Record<number, Content>> = {
  movies: {
    1: {
      id: 1,
      title: "Интерстеллар",
      originalTitle: "Interstellar",
      year: "2014",
      rating: 8.6,
      ageRating: "12+",
      duration: "2 ч 49 мин",
      durationType: "evening",
      description: "Когда засуха приводит человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину в путешествие, чтобы найти среди звёзд планету, пригодную для проживания людей.",
      director: "Кристофер Нолан",
      writers: "Кристофер Нолан, Джонатан Нолан",
      country: "США, Великобритания",
      genres: ["sci-fi", "drama", "adventure"],
      cast: ["Мэттью МакКонахи", "Энн Хэтэуэй", "Джессика Честейн"],
      poster: "https://upload.wikimedia.org/wikipedia/ru/c/c3/Interstellar_2014.jpg",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259100&hash=4b2d7603a5c70ea4&hd=4"
    },
    2: {
      id: 2,
      title: "Начало",
      originalTitle: "Inception",
      year: "2010",
      rating: 8.7,
      ageRating: "16+",
      duration: "2 ч 28 мин",
      durationType: "evening",
      description: "Кобб — талантливый вор, лучший из лучших в опасном искусстве извлечения: он крадет ценные секреты из глубин подсознания во время сна. Его редкая способность сделала его ценным игроком в мире промышленного шпионажа.",
      director: "Кристофер Нолан",
      writers: "Кристофер Нолан",
      country: "США, Великобритания",
      genres: ["action", "sci-fi", "thriller"],
      cast: ["Леонардо ДиКаприо", "Джозеф Гордон-Левитт", "Эллен Пейдж"],
      poster: "https://upload.wikimedia.org/wikipedia/ru/b/bc/Poster_Inception_film_2010.jpg",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259101&hash=4b2d7603a5c70ea4&hd=4"
    },
    3: {
      id: 3,
      title: "Джентльмены",
      originalTitle: "The Gentlemen",
      year: "2019",
      rating: 8.5,
      ageRating: "18+",
      duration: "1 ч 53 мин",
      durationType: "evening",
      description: "Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской знати.",
      director: "Гай Ричи",
      writers: "Гай Ричи, Айван Аткинсон",
      country: "Великобритания, США",
      genres: ["action", "comedy", "crime"],
      cast: ["Мэттью МакКонахи", "Чарли Ханнэм", "Мишель Докери"],
      poster: "https://upload.wikimedia.org/wikipedia/ru/c/c1/%D0%94%D0%B6%D0%B5%D0%BD%D1%82%D0%BB%D1%8C%D0%BC%D0%B5%D0%BD%D1%8B.jpg",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259102&hash=4b2d7603a5c70ea4&hd=4"
    },
    4: {
      id: 4,
      title: "Форсаж 10",
      originalTitle: "Fast X",
      year: "2023",
      rating: 7.2,
      ageRating: "16+",
      duration: "2 ч 21 мин",
      durationType: "evening",
      description: "Доминик Торетто и его семья должны противостоять опасному врагу, который хочет отомстить за смерть своего отца.",
      director: "Луи Летерье",
      writers: "Джастин Лин, Дэн Мазо",
      country: "США",
      genres: ["action", "thriller", "crime"],
      cast: ["Вин Дизель", "Мишель Родригес", "Джейсон Момоа"],
      poster: "https://upload.wikimedia.org/wikipedia/ru/thumb/c/c4/Fast_X.jpg/960px-Fast_X.jpg",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259103&hash=4b2d7603a5c70ea4&hd=4"
    }
  },
  series: {
    1: {
      id: 1,
      title: "Секреты, которые мы храним",
      originalTitle: "Hemmeligheder vi gemmer",
      year: "2025",
      rating: 6.7,
      ageRating: "18+",
      duration: "8 серий",
      durationType: "marathon",
      description: "В центре сюжета группа исследователей, которые обнаруживают аномалию в самом сердце океана.",
      director: "Пер Флю",
      writers: "Ингеборн Топсё, Ина Брюн, Мадс Тафдруп",
      country: "Дания",
      genres: ["drama", "thriller", "adventure"],
      cast: ["Мария Бах Хансен", "Саймон Сирс", "Даница Чурчич"],
      poster: "https://yandex-images.clstorage.net/tI5ep2147/51eda0GEDIUY/12j6BX3d5l23jHxZWoj_TMJ-nZblJvjJPT8df2K-XJioE0_N4qPiLA9vtXJgUaPe_S-zBFPsGvRcezR0FQhECPaZHyF4qSYJE_0ZvE9Jm9nTG5iSYjXqimvsn90E_U9KyNOPCVfXE4gbSUOilZVyyS57gzCC-fo1PCyQUGZMhu1SvWr0_o63LYRbjKs7zz9cQa3PJmKUKTq4vx48Bz_dukkhbxmV9aVaCypil_Sks0odGgOQ4Il752z-0TKXPYcdIDzqZIxOdG2WinwKWQxcXYMNjdYxJRmr2T9NPUT-f0l44h-LdrRl6JgqUtXU11BYjVjx0GKYOvTMPgAR5f7U3EEs6yVNPpcPx-hsKHtcLI-A3X10QZRa6RndPc13_C1oCxFPOcc0JSvLu5MG5yewuj_akJDBeWoEXF8xghYOVLxRHYg3nl0ED7b6Lyorfv4vUw6d9ON1SRl5nV8_R25dmBoD33mXpaeJ20niZsUUISvN-7CQYKmp1AwdIvP1P2Vf4g94Nb695K70iK-LuByd7AAuHkTgpmq6y-_MvsUfbzhoco6INWenCGmYYCelhWEqjErRk7KpylfMXsHAVF1W70PsiLW9XlUvN6rNKwn_LI3xP710E0c4qfmd70z07k2qyXK82cdGtyu6OtMFp0Wh-h_IQZEziQoEbPyg03e_hy9AHHmE_U_0D-cqbloaPUy8AF_tpaFU-AhK_0-9FKxMmNuxPtsFdhVKSzoRFjTXoIi_SuJysssaZI4eIRCHHwaeQVz6JZ8eJe7GKqx5m_8NnaC8L-ZjV2s5C2wPrhVt_JtLYY1bpITnKAs6oocUhREZjEvR8vF5emVe7UBgRN9Vb1NdeLW83MdP1au9Kwi8XO5C3o32IOSKKlss_Q6nPr66GfFMa2THlzvqe-EnpsbT640aA7JCiOpWfqywIjcNh58T3ZmU3qzHTqU4T9qLPW2t4x_O9FDkmljJ7zxfE",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259072&hash=4b2d7603a5c70ea4&hd=4",
      episodes: [
        { num: 1, title: "Прорыв", duration: "51 мин", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259072&hash=4b2d7603a5c70ea4&hd=4" },
        { num: 2, title: "Глубина", duration: "48 мин", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259073&hash=4b2d7603a5c70ea4&hd=4" }
      ]
    },
    2: {
      id: 2,
      title: "Убей меня, полюби меня",
      originalTitle: "Kill Me, Love Me",
      year: "2024",
      rating: 8.1,
      ageRating: "16+",
      duration: "1 сезон",
      durationType: "marathon",
      description: "Захватывающая история о любви и предательстве.",
      director: "Ли Мин Хо",
      writers: "Ким Су Хён",
      country: "Корея",
      genres: ["romance", "comedy", "action"],
      cast: ["Пак Со Джун", "Хан Со Хи", "Ким Дэ Мён"],
      poster: "https://www.kinomania.ru/sites/default/files/2025-06/7_9.jpg",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259080&hash=4b2d7603a5c70ea4&hd=4",
      episodes: [{ num: 1, title: "Встреча", duration: "60 мин", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259080&hash=4b2d7603a5c70ea4&hd=4" }]
    },
    3: {
      id: 3,
      title: "Лучше звоните Солу",
      originalTitle: "Better Call Saul",
      year: "2015-2022",
      rating: 8.5,
      ageRating: "18+",
      duration: "6 сезонов",
      durationType: "marathon",
      description: "История Сола Гудмана, адвоката, который готов на всё ради своих клиентов.",
      director: "Винс Гиллиган",
      writers: "Питер Гулд",
      country: "США",
      genres: ["drama", "crime", "thriller"],
      cast: ["Боб Оденкерк", "Джонатан Бэнкс", "Риа Сихорн"],
      poster: "https://static.okko.tv/images/v4/4caf88ae-1a0b-4ca9-8a7e-dc805d1ba9be?presetId=4000&amp;width=1200&amp;height=630&amp;scale=1&amp;quality=80",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259081&hash=4b2d7603a5c70ea4&hd=4",
      episodes: [{ num: 1, title: "Пилот", duration: "52 мин", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259081&hash=4b2d7603a5c70ea4&hd=4" }]
    },
    4: {
      id: 4,
      title: "Рыцарь Семи Королевств",
      originalTitle: "The Knight of the Seven Kingdoms",
      year: "2026",
      rating: 8.2,
      ageRating: "16+",
      duration: "8 серий",
      durationType: "marathon",
      description: "Приключения рыцаря в мире фэнтези.",
      director: "Дэвид Бениофф",
      writers: "Д.Б. Уайсс",
      country: "США",
      genres: ["fantasy", "adventure"],
      cast: ["Питер Динклэйдж", "Эмилия Кларк"],
      poster: "https://i.playground.ru/e/vl9Y2Iw_hklMccy2Bjo8-w.jpeg",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259082&hash=4b2d7603a5c70ea4&hd=4",
      episodes: [{ num: 1, title: "Начало пути", duration: "55 мин", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259082&hash=4b2d7603a5c70ea4&hd=4" }]
    }
  },
  anime: {
    1: {
      id: 1,
      title: "Агенты времени",
      originalTitle: "Time Agents",
      year: "2021",
      rating: 8.5,
      ageRating: "12+",
      duration: "24 серии",
      durationType: "marathon",
      description: "Группа агентов путешествует во времени, чтобы исправить ошибки прошлого.",
      director: "Макото Синкай",
      writers: "Макото Синкай",
      country: "Япония",
      genres: ["sci-fi", "action"],
      cast: ["Рюносукэ Камики", "Моне Камисираиси"],
      poster: "https://avatars.mds.yandex.net/get-mpic/1865974/img_id8157762941053562321.jpeg/orig",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259083&hash=4b2d7603a5c70ea4&hd=4"
    },
    2: {
      id: 2,
      title: "Хост-клуб Оранской школы",
      originalTitle: "Ouran High School Host Club",
      year: "2006",
      rating: 8.0,
      ageRating: "12+",
      duration: "26 серий",
      durationType: "marathon",
      description: "Смешная и романтичная история о девушке в элитном хост-клубе.",
      director: "Такуя Игараси",
      country: "Япония",
      genres: ["romance", "comedy"],
      cast: [],
      poster: "https://i.ytimg.com/vi/pRaMz4alqMU/maxresdefault.jpg",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259084&hash=4b2d7603a5c70ea4&hd=4"
    },
    3: {
      id: 3,
      title: "Ковбой Бибоп",
      originalTitle: "Cowboy Bebop",
      year: "1998",
      rating: 8.7,
      ageRating: "16+",
      duration: "26 серий",
      durationType: "marathon",
      description: "Культовое аниме о охотниках за головами в космосе.",
      director: "Синъитиро Ватанабэ",
      country: "Япония",
      genres: ["action", "sci-fi"],
      cast: [],
      poster: "https://i.ytimg.com/vi/sINI3f07t5E/maxresdefault.jpg",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259085&hash=4b2d7603a5c70ea4&hd=4"
    },
    4: {
      id: 4,
      title: "Рыбка Поньо на утёсе",
      originalTitle: "Ponyo",
      year: "2008",
      rating: 8.0,
      ageRating: "0+",
      duration: "Фильм",
      durationType: "evening",
      description: "Прекрасная история о дружбе мальчика и золотой рыбки.",
      director: "Хаяо Миядзаки",
      country: "Япония",
      genres: ["fantasy", "adventure"],
      cast: [],
      poster: "https://ir.ozone.ru/s3/multimedia-0/6832181340.jpg",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259086&hash=4b2d7603a5c70ea4&hd=4"
    }
  },
  cartoon: {
    1: {
      id: 1,
      title: "Неуязвимый",
      originalTitle: "Invincible",
      year: "2021",
      rating: 8.1,
      ageRating: "18+",
      duration: "2 сезона",
      durationType: "marathon",
      description: "Сын самого могущественного супергероя Земли раскрывает правду о своём отце.",
      director: "Роберт Киркман",
      country: "США",
      genres: ["action", "sci-fi"],
      cast: [],
      poster: "https://pic.rtbcdn.ru/video/2026-04-04/3b/f4/3bf4eeec5710856c62b6099bc2b6cef3.jpg",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259087&hash=4b2d7603a5c70ea4&hd=4"
    },
    2: {
      id: 2,
      title: "Головоломка 2",
      originalTitle: "Inside Out 2",
      year: "2024",
      rating: 7.7,
      ageRating: "6+",
      duration: "Фильм",
      durationType: "evening",
      description: "Новые эмоции поселяются в голове у повзрослевшей Райли.",
      director: "Келси Манн",
      country: "США",
      genres: ["comedy", "family"],
      cast: [],
      poster: "http://avatars.mds.yandex.net/get-vthumb/492386/ab26de886e1c239095fc34ed132ccce0/800x450",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259088&hash=4b2d7603a5c70ea4&hd=4"
    },
    3: {
      id: 3,
      title: "Гравити Фолз",
      originalTitle: "Gravity Falls",
      year: "2012-2016",
      rating: 9.0,
      ageRating: "6+",
      duration: "2 сезона",
      durationType: "marathon",
      description: "Двое близнецов проводят лето у дяди в странном городке Гравити Фолз.",
      director: "Алекс Хирш",
      country: "США",
      genres: ["comedy", "adventure"],
      cast: [],
      poster: "https://avatars.mds.yandex.net/i?id=aedaed6f32059de83318d39a53dd0cadf913e22b-4552023-images-thumbs&n=13",
      videoUrl: "https://vkvideo.ru/video_ext.php?oid=-220020068&id=456259089&hash=4b2d7603a5c70ea4&hd=4"
    }
  }
};

export const getContentById = (id: number, type: ContentType): Content | null => {
  const key = type === 'movie' ? 'movies' : type;
  return CONTENT_DB[key as keyof typeof CONTENT_DB]?.[id] || null;
};

export const getRecommendations = (currentId: number, currentType: ContentType, limit = 4): (Content & { type: ContentType })[] => {
  const types: ContentType[] = ['movies', 'series', 'anime', 'cartoon'];
  const recommendations: (Content & { type: ContentType })[] = [];
  
  for (const type of types) {
    const typeKey = type === 'movies' ? 'movies' : type;
    for (const id in CONTENT_DB[typeKey as keyof typeof CONTENT_DB]) {
      if (recommendations.length >= limit) break;
      if (type === currentType && parseInt(id) === currentId) continue;
      const contentType = type === 'movies' ? 'movie' : type as ContentType;
      recommendations.push({ ...CONTENT_DB[typeKey as keyof typeof CONTENT_DB][parseInt(id)], type: contentType });
    }
    if (recommendations.length >= limit) break;
  }
  
  return recommendations;
};