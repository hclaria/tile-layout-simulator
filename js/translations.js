// Calepinage Pro - Translations (FR/EN/RU/DE)

const TRANSLATIONS = {
    fr: {
        // App title
        appTitle: "Simulateur Calepinage Pro",
        
        // Room section
        roomTitle: "Pièce (en m)",
        roomLength: "Longueur",
        roomWidth: "Largeur",
        
        // Tiles section
        tilesTitle: "Carrelage (en cm)",
        tileLength: "Longueur",
        tileWidth: "Largeur",
        jointBetween: "Joint entre carreaux",
        jointPeripheral: "Joint périphérique (mur)",
        
        // Layout section
        layoutTitle: "Pose & Alignement",
        layoutType: "Type de pose",
        layoutStraight: "Pose Droite (Alignée)",
        layoutOffset50: "Pose Décalée 1/2 (Quinconce)",
        layoutOffset33: "Pose Décalée 1/3 (Escalier)",
        layoutRandom: "Coupe Perdue (Aléatoire)",
        
        startPoint: "Point de départ",
        startCorner: "Départ Coin",
        startCenterTile: "Centrer Carreau",
        startCenterJoint: "Centrer Joint",
        
        rotateTiles: "Pivoter les carreaux",
        
        // Help texts
        helpStraight: "Alignez les joints de tous les carreaux.",
        helpOffset50: "Posez la première ligne, puis décalez la suivante de moitié.",
        helpOffset33: "Décalez chaque rangée d'un tiers.",
        helpRandom: "Méthode économique : la chute de fin de ligne démarre la suivante.",
        helpStartCorner: "Départ depuis le coin.",
        helpStartCenterTile: "Premier carreau centré.",
        helpStartCenterJoint: "Centre de la pièce sur un joint.",
        helpRandomAlign: "En coupe perdue, on part toujours d'un coin.",
        
        // Manual order section
        orderTitle: "Ordre de Pose",
        orderHelp: "Cliquez sur les carreaux pour définir l'ordre.",
        orderUndo: "Annuler",
        orderClear: "Effacer",
        orderConfirmClear: "Tout effacer ?",
        
        // Stats section
        statsTotal: "Carreaux totaux",
        statsCuts: "Quantité Coupes",
        statsWarning: "Attention: {count} coupes problématiques.",
        
        // Visualizer
        viewTitle: "Vue 2D Interactive",
        legendFull: "Entier",
        legendCutOk: "Coupe OK",
        legendProblem: "Problème",
        
        // Tooltip
        tooltipCutDetail: "Détail de la coupe",
        tooltipFullTile: "Carreau Entier",
        tooltipVisibleDims: "Dimensions visibles:",
        tooltipRemainLength: "Reste longueur:",
        tooltipRemainWidth: "Reste largeur:",
        tooltipProblem: "Problème détecté",
        
        // Risk reasons
        riskTooSmall: "Chute restante trop petite (<3cm)",
        riskSliver: "Coupe trop fine en longueur",
        riskGeneric: "Trop petit"
    },
    
    en: {
        // App title
        appTitle: "Tile Layout Simulator Pro",
        
        // Room section
        roomTitle: "Room (in m)",
        roomLength: "Length",
        roomWidth: "Width",
        
        // Tiles section
        tilesTitle: "Tiles (in cm)",
        tileLength: "Length",
        tileWidth: "Width",
        jointBetween: "Joint between tiles",
        jointPeripheral: "Peripheral joint (wall)",
        
        // Layout section
        layoutTitle: "Layout & Alignment",
        layoutType: "Layout type",
        layoutStraight: "Straight Layout (Aligned)",
        layoutOffset50: "1/2 Offset (Staggered)",
        layoutOffset33: "1/3 Offset (Staircase)",
        layoutRandom: "Random Stagger (Lost Cut)",
        
        startPoint: "Starting point",
        startCorner: "Start from Corner",
        startCenterTile: "Center Tile",
        startCenterJoint: "Center Joint",
        
        rotateTiles: "Rotate tiles",
        
        // Help texts
        helpStraight: "Align all tile joints.",
        helpOffset50: "Lay the first row, then offset the next by half.",
        helpOffset33: "Offset each row by one third.",
        helpRandom: "Economical method: the end cut starts the next row.",
        helpStartCorner: "Start from the corner.",
        helpStartCenterTile: "First tile centered.",
        helpStartCenterJoint: "Room center on a joint.",
        helpRandomAlign: "In random stagger, always start from a corner.",
        
        // Manual order section
        orderTitle: "Laying Order",
        orderHelp: "Click on tiles to define the order.",
        orderUndo: "Undo",
        orderClear: "Clear",
        orderConfirmClear: "Clear all?",
        
        // Stats section
        statsTotal: "Total tiles",
        statsCuts: "Number of cuts",
        statsWarning: "Warning: {count} problematic cuts.",
        
        // Visualizer
        viewTitle: "2D Interactive View",
        legendFull: "Full",
        legendCutOk: "Cut OK",
        legendProblem: "Problem",
        
        // Tooltip
        tooltipCutDetail: "Cut detail",
        tooltipFullTile: "Full Tile",
        tooltipVisibleDims: "Visible dimensions:",
        tooltipRemainLength: "Remaining length:",
        tooltipRemainWidth: "Remaining width:",
        tooltipProblem: "Problem detected",
        
        // Risk reasons
        riskTooSmall: "Remaining piece too small (<3cm)",
        riskSliver: "Cut too thin in length",
        riskGeneric: "Too small"
    },
    
    ru: {
        // App title
        appTitle: "Симулятор раскладки плитки Pro",
        
        // Room section
        roomTitle: "Комната (в м)",
        roomLength: "Длина",
        roomWidth: "Ширина",
        
        // Tiles section
        tilesTitle: "Плитка (в см)",
        tileLength: "Длина",
        tileWidth: "Ширина",
        jointBetween: "Шов между плитками",
        jointPeripheral: "Периферийный шов (стена)",
        
        // Layout section
        layoutTitle: "Укладка и выравнивание",
        layoutType: "Тип укладки",
        layoutStraight: "Прямая укладка (выровненная)",
        layoutOffset50: "Смещение 1/2 (шахматная)",
        layoutOffset33: "Смещение 1/3 (лестница)",
        layoutRandom: "Случайное смещение (экономичная)",
        
        startPoint: "Точка начала",
        startCorner: "Начать с угла",
        startCenterTile: "Центрировать плитку",
        startCenterJoint: "Центрировать шов",
        
        rotateTiles: "Повернуть плитку",
        
        // Help texts
        helpStraight: "Выровняйте все швы плитки.",
        helpOffset50: "Уложите первый ряд, затем сместите следующий на половину.",
        helpOffset33: "Смещайте каждый ряд на треть.",
        helpRandom: "Экономичный метод: обрезок в конце ряда начинает следующий.",
        helpStartCorner: "Начало с угла.",
        helpStartCenterTile: "Первая плитка по центру.",
        helpStartCenterJoint: "Центр комнаты на шве.",
        helpRandomAlign: "При случайном смещении всегда начинайте с угла.",
        
        // Manual order section
        orderTitle: "Порядок укладки",
        orderHelp: "Нажмите на плитки, чтобы задать порядок.",
        orderUndo: "Отменить",
        orderClear: "Очистить",
        orderConfirmClear: "Очистить всё?",
        
        // Stats section
        statsTotal: "Всего плиток",
        statsCuts: "Количество резов",
        statsWarning: "Внимание: {count} проблемных резов.",
        
        // Visualizer
        viewTitle: "2D Интерактивный вид",
        legendFull: "Целая",
        legendCutOk: "Рез ОК",
        legendProblem: "Проблема",
        
        // Tooltip
        tooltipCutDetail: "Детали реза",
        tooltipFullTile: "Целая плитка",
        tooltipVisibleDims: "Видимые размеры:",
        tooltipRemainLength: "Остаток длины:",
        tooltipRemainWidth: "Остаток ширины:",
        tooltipProblem: "Обнаружена проблема",
        
        // Risk reasons
        riskTooSmall: "Остаток слишком мал (<3см)",
        riskSliver: "Слишком тонкий рез по длине",
        riskGeneric: "Слишком маленький"
    },
    
    de: {
        // App title
        appTitle: "Fliesenlege-Simulator Pro",
        
        // Room section
        roomTitle: "Raum (in m)",
        roomLength: "Länge",
        roomWidth: "Breite",
        
        // Tiles section
        tilesTitle: "Fliesen (in cm)",
        tileLength: "Länge",
        tileWidth: "Breite",
        jointBetween: "Fuge zwischen Fliesen",
        jointPeripheral: "Randfuge (Wand)",
        
        // Layout section
        layoutTitle: "Verlegung & Ausrichtung",
        layoutType: "Verlegeart",
        layoutStraight: "Gerade Verlegung (Ausgerichtet)",
        layoutOffset50: "1/2 Versatz (Versetzt)",
        layoutOffset33: "1/3 Versatz (Treppe)",
        layoutRandom: "Wilder Verband (Verschnittarm)",
        
        startPoint: "Startpunkt",
        startCorner: "Von der Ecke starten",
        startCenterTile: "Fliese zentrieren",
        startCenterJoint: "Fuge zentrieren",
        
        rotateTiles: "Fliesen drehen",
        
        // Help texts
        helpStraight: "Alle Fliesenfugen ausrichten.",
        helpOffset50: "Erste Reihe verlegen, dann nächste um die Hälfte versetzen.",
        helpOffset33: "Jede Reihe um ein Drittel versetzen.",
        helpRandom: "Wirtschaftliche Methode: Der Abschnitt am Reihenende beginnt die nächste.",
        helpStartCorner: "Start von der Ecke.",
        helpStartCenterTile: "Erste Fliese zentriert.",
        helpStartCenterJoint: "Raummitte auf einer Fuge.",
        helpRandomAlign: "Bei wildem Verband immer von einer Ecke starten.",
        
        // Manual order section
        orderTitle: "Verlegereihenfolge",
        orderHelp: "Klicken Sie auf Fliesen, um die Reihenfolge festzulegen.",
        orderUndo: "Rückgängig",
        orderClear: "Löschen",
        orderConfirmClear: "Alles löschen?",
        
        // Stats section
        statsTotal: "Fliesen gesamt",
        statsCuts: "Anzahl Schnitte",
        statsWarning: "Achtung: {count} problematische Schnitte.",
        
        // Visualizer
        viewTitle: "2D Interaktive Ansicht",
        legendFull: "Ganz",
        legendCutOk: "Schnitt OK",
        legendProblem: "Problem",
        
        // Tooltip
        tooltipCutDetail: "Schnittdetail",
        tooltipFullTile: "Ganze Fliese",
        tooltipVisibleDims: "Sichtbare Maße:",
        tooltipRemainLength: "Rest Länge:",
        tooltipRemainWidth: "Rest Breite:",
        tooltipProblem: "Problem erkannt",
        
        // Risk reasons
        riskTooSmall: "Reststück zu klein (<3cm)",
        riskSliver: "Schnitt zu dünn in der Länge",
        riskGeneric: "Zu klein"
    }
};

// Language options for the selector
const LANGUAGES = [
    { code: 'fr', label: '🇫🇷 Français' },
    { code: 'en', label: '🇬🇧 English' },
    { code: 'ru', label: '🇷🇺 Русский' },
    { code: 'de', label: '🇩🇪 Deutsch' }
];

// Get browser language or saved preference
const getInitialLanguage = () => {
    const saved = localStorage.getItem('calepinage_lang');
    if (saved && TRANSLATIONS[saved]) return saved;
    
    const browserLang = navigator.language.split('-')[0];
    if (TRANSLATIONS[browserLang]) return browserLang;
    
    return 'fr';
};

// Translation hook
const useTranslation = (lang) => {
    const t = (key, params = {}) => {
        const translation = TRANSLATIONS[lang]?.[key] || TRANSLATIONS['fr'][key] || key;
        
        // Replace {param} placeholders
        return Object.entries(params).reduce(
            (str, [key, value]) => str.replace(`{${key}}`, value),
            translation
        );
    };
    
    return { t, lang };
};
