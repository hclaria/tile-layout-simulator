// Calepinage Pro - Custom Hooks

const { useMemo } = React;

// Main calculation hook for tile layout
const useTileCalculation = (params) => {
    const {
        roomL, roomW, tileL, tileW,
        jointSize, peripheral, pattern,
        alignmentMode, rotation, manualSequence
    } = params;

    return useMemo(() => {
        const rLen = roomL * 100;
        const rWid = roomW * 100;
        // Rotation handling
        const tLen = rotation === 90 ? tileW : tileL;
        const tWid = rotation === 90 ? tileL : tileW;
        
        const joint = jointSize / 10;
        const periph = peripheral / 10;
        
        // Modules
        const modL = tLen + joint;
        const modW = tWid + joint;

        const rX1 = periph;
        const rX2 = rLen - periph;
        const rY1 = periph;
        const rY2 = rWid - periph;
        const visibleRoomW = rX2 - rX1;
        const visibleRoomH = rY2 - rY1;

        let tiles = [];

        // --- BRANCH 1: RANDOM STAGGER (Coupe Perdue) ---
        if (pattern === 'random_stagger') {
            let currentY = rY1;
            let remainderLen = 0; 
            let rowIndex = 0;

            while (currentY < rY2) {
                let currentX = rX1;
                let isFirstInRow = true;
                
                const minChute = Math.max(15, tLen * 0.2); 
                
                if (remainderLen > minChute) {
                    const tileWidth = remainderLen;
                    const tileHeight = tWid;
                    
                    const actualW = Math.min(tileWidth, rX2 - currentX);
                    const actualH = Math.min(tileHeight, rY2 - currentY);
                    
                    const isRisky = actualW < 3 || actualH < 3;
                    const isCut = true;

                    tiles.push({
                        id: `${rowIndex}-0-chute`,
                        gridX: currentX,
                        gridY: currentY,
                        width: tileWidth,
                        height: tileHeight,
                        visibleW: actualW,
                        visibleH: actualH,
                        isRisky: isRisky,
                        riskReason: isRisky ? "riskGeneric" : null,
                        isCut: isCut,
                        percentW: Math.round((actualW / tLen) * 100),
                        percentH: 100,
                        orderIndex: manualSequence[`${rowIndex}-0-chute`] || null
                    });
                    
                    currentX += tileWidth + joint;
                    isFirstInRow = false;
                } else {
                    remainderLen = 0; 
                }

                let colIndex = isFirstInRow ? 0 : 1;

                while (currentX < rX2) {
                    const tileWidth = tLen;
                    const tileHeight = tWid;
                    
                    const endPos = currentX + tileWidth;
                    
                    let actualW = tileWidth;
                    let isLast = false; 

                    if (endPos > rX2) {
                        actualW = rX2 - currentX;
                        isLast = true;
                        remainderLen = tLen - actualW;
                    } else {
                        actualW = tileWidth;
                        if (currentX + actualW + joint > rX2) {
                           remainderLen = 0;
                        }
                    }

                    const actualH = Math.min(tileHeight, rY2 - currentY);
                    
                    const isRisky = actualW < 3 || actualH < 3;
                    const isCut = isLast || actualH < tileHeight;

                    tiles.push({
                        id: `${rowIndex}-${colIndex}`,
                        gridX: currentX,
                        gridY: currentY,
                        width: isLast ? actualW : tileWidth,
                        height: tileHeight,
                        visibleW: actualW,
                        visibleH: actualH,
                        isRisky,
                        riskReason: isRisky ? "riskGeneric" : null,
                        isCut,
                        percentW: Math.round((actualW / tLen) * 100),
                        percentH: Math.round((actualH / tWid) * 100),
                        orderIndex: manualSequence[`${rowIndex}-${colIndex}`] || null
                    });

                    currentX += tileWidth + joint;
                    colIndex++;
                }

                currentY += tWid + joint;
                rowIndex++;
            }

        } 
        // --- BRANCH 2: GRID-BASED LAYOUTS (Straight, 1/2, 1/3) ---
        else {
            let startX = periph;
            let startY = periph;
            const centerX = (rLen / 2);
            const centerY = (rWid / 2);

            if (alignmentMode === 'center_tile') {
                startX = centerX - (tLen / 2);
                startY = centerY - (tWid / 2);
            } else if (alignmentMode === 'center_joint') {
                startX = centerX + (joint / 2);
                startY = centerY + (joint / 2);
            }

            const gridOriginX = startX; 
            const gridOriginY = startY;

            const safetyMargin = 3;
            const numCols = Math.ceil(rLen / modL) + safetyMargin;
            const numRows = Math.ceil(rWid / modW) + safetyMargin;

            for (let row = -numRows; row <= numRows; row++) {
                for (let col = -numCols; col <= numCols; col++) {
                    
                    let offsetX = 0;
                    if (pattern === 'offset_50' && row % 2 !== 0) offsetX = modL * 0.5;
                    if (pattern === 'offset_33') offsetX = modL * (row % 3) * 0.33;
                    
                    const x = gridOriginX + (col * modL) + offsetX;
                    const y = gridOriginY + (row * modW);

                    const tX1 = x; 
                    const tX2 = x + tLen;
                    const tY1 = y; 
                    const tY2 = y + tWid;

                    const interLeft = Math.max(tX1, rX1);
                    const interRight = Math.min(tX2, rX2);
                    const interTop = Math.max(tY1, rY1);
                    const interBottom = Math.min(tY2, rY2);

                    if (interRight > interLeft && interBottom > interTop) {
                        const visibleW = interRight - interLeft;
                        const visibleH = interBottom - interTop;
                        const deltaVisX = interLeft - tX1;
                        const deltaVisY = interTop - tY1;
                        
                        const diffW = tLen - visibleW;
                        const diffH = tWid - visibleH;
                        const tooSmall = visibleW < 3 || visibleH < 3;
                        const sliverCutW = diffW > 0.1 && diffW < 1.5;
                        const sliverCutH = diffH > 0.1 && diffH < 1.5;
                        const isRisky = tooSmall || sliverCutW || sliverCutH;
                        const isCut = visibleW < tLen - 0.1 || visibleH < tWid - 0.1;
                        
                        let riskReason = null;
                        if (tooSmall) riskReason = "riskTooSmall";
                        else if (sliverCutW) riskReason = "riskSliver";
                        
                        const tileId = `${row}-${col}`;
                        const manualNum = manualSequence[tileId];

                        tiles.push({
                            id: tileId,
                            gridX: x,
                            gridY: y,
                            width: tLen, 
                            height: tWid,
                            deltaVisX, 
                            deltaVisY,
                            visibleW,
                            visibleH,
                            isRisky,
                            riskReason,
                            isCut,
                            percentW: Math.round((visibleW / tLen) * 100),
                            percentH: Math.round((visibleH / tWid) * 100),
                            orderIndex: manualNum || null
                        });
                    }
                }
            }
        }
        
        return {
            tiles,
            totalTiles: tiles.length,
            cuts: tiles.filter(t => t.isCut).length,
            riskyCuts: tiles.filter(t => t.isRisky),
            dimsCM: { w: rLen, h: rWid },
            periphCM: periph,
            isRandomMode: pattern === 'random_stagger'
        };
    }, [roomL, roomW, tileL, tileW, jointSize, peripheral, pattern, alignmentMode, rotation, manualSequence]);
};
