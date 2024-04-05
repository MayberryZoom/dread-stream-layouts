const transportConnections = nodecg.Replicant('transportConnections', {
    defaultValue: {
        artariaToBurenia: null,
        artariaToCataris: null,
        artariaToDairon: null,
        bureniaToArtaria: null,
        bureniaToDaironLower: null,
        bureniaToDaironUpper: null,
        bureniaToGhavoran: null,
        catarisToArtaria: null,
        catarisToDairon: null,
        daironToArtaria: null,
        daironToBureniaLower: null,
        daironToBureniaUpper: null,
        daironToCataris: null,
        daironToFereniaEast: null,
        daironToFereniaWest: null,
        daironToGhavoran: null,
        elunToGhavoran: null,
        fereniaToDaironEast: null,
        fereniaToDaironWest: null,
        fereniaToGhavoran: null,
        fereniaToHanubia: null,
        ghavoranToBurenia: null,
        ghavoranToDairon: null,
        ghavoranToElun: null,
        ghavoranToFerenia: null,
        ghavoranToHanubia: null,
        hanubiaToFerenia: null,
        hanubiaToGhavoran: null,
        hanubiaToItorash: null,
        itorashToHanubia: null,
    }
});

let canvas = document.getElementById('map-canvas');
let canvasContext = canvas.getContext('2d');

const points = {
    artariaBlue: {
        x: 635,
        y: 824,
        type: 'teleportal'
    },
    artariaRed: {
        x: 688,
        y: 802,
        type: 'teleportal'
    },
    artariaToBurenia: {
        x: 591,
        y: 813,
        type: 'up'
    },
    artariaToCataris: {
        x: 920,
        y: 774,
        type: 'up'
    },
    artariaToDairon: {
        x: 811,
        y: 756,
        type: 'up'
    },
    artariaYellow: {
        x: 804,
        y: 801,
        type: 'teleportal'
    },
    bureniaCyan: {
        x: 138,
        y: 620,
        type: 'teleportal'
    },
    bureniaGreen: {
        x: 178,
        y: 672,
        type: 'teleportal'
    },
    bureniaToArtaria: {
        x: 247,
        y: 747,
        type: 'down'
    },
    bureniaToDaironLower: {
        x: 270,
        y: 690,
        type: 'right'
    },
    bureniaToDaironUpper: {
        x: 270,
        y: 661,
        type: 'right'
    },
    bureniaToGhavoran: {
        x: 178,
        y: 560,
        type: 'up'
    },
    catarisBlue: {
        x: 1356,
        y: 618,
        type: 'teleportal'
    },
    catarisOrange: {
        x: 1164,
        y: 582,
        type: 'teleportal'
    },
    catarisPurple: {
        x: 1195,
        y: 640,
        type: 'teleportal'
    },
    catarisRed: {
        x: 1137,
        y: 613,
        type: 'teleportal'
    },
    catarisToArtaria: {
        x: 1330,
        y: 653,
        type: 'down'
    },
    catarisToDairon: {
        x: 1145,
        y: 557,
        type: 'left'
    },
    daironPurple: {
        x: 657,
        y: 578,
        type: 'teleportal'
    },
    daironToArtaria: {
        x: 775,
        y: 617,
        type: 'down'
    },
    daironToBureniaLower: {
        x: 504,
        y: 640,
        type: 'left'
    },
    daironToBureniaUpper: {
        x: 487,
        y: 598,
        type: 'left'
    },
    daironToCataris: {
        x: 856,
        y: 530,
        type: 'right'
    },
    daironToFereniaEast: {
        x: 753,
        y: 511,
        type: 'up'
    },
    daironToFereniaWest: {
        x: 660,
        y: 504,
        type: 'up'
    },
    daironToGhavoran: {
        x: 517,
        y: 550,
        type: 'up'
    },
    daironYellow: {
        x: 795,
        y: 539,
        type: 'teleportal'
    },
    elunToGhavoran: {
        x: 495,
        y: 433,
        type: 'left'
    },
    fereniaCyan: {
        x: 725,
        y: 397,
        type: 'teleportal'
    },
    fereniaToDaironEast: {
        x: 773,
        y: 469,
        type: 'down'
    },
    fereniaToDaironWest: {
        x: 695,
        y: 469,
        type: 'down'
    },
    fereniaToGhavoran: {
        x: 625,
        y: 367,
        type: 'left'
    },
    fereniaToHanubia: {
        x: 824,
        y: 343,
        type: 'up'
    },
    ghavoranGreen: {
        x: 210,
        y: 357,
        type: 'teleportal'
    },
    ghavoranOrange: {
        x: 183,
        y: 320,
        type: 'teleportal'
    },
    ghavoranToBurenia: {
        x: 90,
        y: 443,
        type: 'down'
    },
    ghavoranToDairon: {
        x: 233,
        y: 432,
        type: 'down'
    },
    ghavoranToElun: {
        x: 255,
        y: 397,
        type: 'right'
    },
    ghavoranToFerenia: {
        x: 293,
        y: 367,
        type: 'right'
    },
    ghavoranToHanubia: {
        x: 304,
        y: 332,
        type: 'right'
    },
    hanubiaToFerenia: {
        x: 808,
        y: 299,
        type: 'down'
    },
    hanubiaToGhavoran: {
        x: 686,
        y: 235,
        type: 'left'
    },
    hanubiaToItorash: {
        x: 853,
        y: 177,
        type: 'up'
    },
    itorashToHanubia: {
        x: 839,
        y: 76,
        type: 'down'
    },
};

const areaColors = {
    artaria: '#CDD800',
    burenia: '#469AD6',
    cataris: '#D3481D',
    dairon: '#B047D1',
    elun: '#7A2BCE',
    ferenia: '#2A3ACC',
    ghavoran: '#00C413',
    hanubia: '#D89C22',
    itorash: '#21B26C'
}

pointsKeys = Object.keys(points).filter(x => points[x].type !== 'teleportal');

const horizontalOffset = (type) => {
    if (type !== 'left' && type !== 'right') return 0;
    else return type === 'left' ? -25 : 25;
}

const verticalOffset = (type) => {
    if (type !== 'up' && type !== 'down') return 0;
    else return type === 'up' ? -25 : 25;
}

// always use Itorash/Elun color, otherwise pick pseudo-random color based on the sum of both connections
const getConnectionColor = (point1, point2) => {
    area1 = point1.match(/(\w+?)(?=[A-Z])/)[0];
    if (area1 === 'itorash' || area1 === 'elun') return areaColors[area1];
    else {
        area2 = point2.match(/(\w+?)(?=[A-Z])/)[0];
        if (area2 === 'itorash' || area2 === 'elun') canvasContext.strokeStyle = areaColors[area2];
        else return areaColors[(point1 + point2).split('').reduce((acc, cur) =>  { return acc + cur.charCodeAt(0) }, 0) % 2 === 0 ? area1 : area2];
    }
}

const connectPoints = (point1, point2) => {
    canvasContext.strokeStyle = getConnectionColor(point1, point2);

    // point1 offset
    canvasContext.beginPath();
    canvasContext.moveTo(points[point1].x, points[point1].y);
    canvasContext.lineTo(points[point1].x + horizontalOffset(points[point1].type), points[point1].y + verticalOffset(points[point1].type));
    canvasContext.stroke();

    // connection
    canvasContext.beginPath();
    canvasContext.setLineDash([20, 5]);
    canvasContext.moveTo(points[point1].x + horizontalOffset(points[point1].type), points[point1].y + verticalOffset(points[point1].type));
    canvasContext.lineTo(points[point2].x + horizontalOffset(points[point2].type), points[point2].y + verticalOffset(points[point2].type));
    canvasContext.stroke();

    // point2 offset
    canvasContext.beginPath();
    canvasContext.setLineDash([]);
    canvasContext.moveTo(points[point2].x + horizontalOffset(points[point2].type), points[point2].y + verticalOffset(points[point2].type));
    canvasContext.lineTo(points[point2].x, points[point2].y);
    canvasContext.stroke();
}

canvasContext.lineWidth = 5;

// reduce object to array of pairs
const transportConnectionsToArray = (connections) => Object.keys(connections).reduce((acc, cur) => { if (connections[cur] && !acc.find(x => x.includes(cur))) acc.push([cur, connections[cur]]); return acc; }, []);

const drawConnections = (connections) => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    transportConnectionsToArray(connections).forEach(x => connectPoints(x[0], x[1]));

    document.getElementById('map-img').src = canvas.toDataURL('img/mapWithLines/png');
}

transportConnections.on('change', drawConnections);

// Draw random connections (for testing)
const drawRandomConnections = () => {
    for (let i = pointsKeys.length - 1; i > 0; i -= 2) {
        let point1 = pointsKeys.splice(Math.floor(Math.random() * i), 1)[0];
        let point2 = pointsKeys.splice(Math.floor(Math.random() * (i - 1)), 1)[0];
        connectPoints(point1, point2);
    }
}
