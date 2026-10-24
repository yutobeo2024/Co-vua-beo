import * as THREE from 'three';

/**
 * Creates the Pixar 3D Cozy Wooden Living Room & Traditional Vietnamese Courtyard
 * Environment for BeoChess 3D.
 *
 * Designed with authentic Vietnamese village architectural elements:
 * - Handcrafted Wooden Table holding the chessboard at BOARD_SURFACE_Y = 0.775
 * - Properly oriented Pixar Wooden Armchairs facing the table (seats tucked towards table, backrests facing out)
 * - 100% UNOBSTRUCTED central vertical corridor: ZERO horizontal beams or roof slabs across the center
 *   so top-down camera views ("Nhìn từ trên xuống") and zoom-out ("Zoom ra") are 100% CRYSTAL CLEAR with ZERO occlusion!
 * - High open-vaulted ceiling with backface culling (invisible from above/outside)
 * - Traditional side veranda pillars (x = ±4.6m) with carved decorative corner brackets
 * - Terracotta Tiled Porch & Red Brick Courtyard with soft daylight shadows
 * - Round Woven Drying Mats (Nia phơi thóc tròn) & Traditional Bamboo Daybed (Chõng tre)
 * - Swaying Bamboo Groves (Rặng tre) & Colorful Hanging Silk Lanterns on the flanks
 * - High-fidelity 3D Pixar Rooster (Chú gà trống hoạt hình) with sculpted comb, expressive Pixar eyes,
 *   golden hackle collar, rich multi-toned plumage, magnificent arching sickle tail, and scaled feet planted firmly on ground.
 */

// Procedural Canvas Texture Generators
function createWoodTexture(width = 512, height = 512, baseCol = '#b57940', darkCol = '#7d4a1c', rings = 14) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = baseCol;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = darkCol;
  ctx.lineWidth = 1.6;
  ctx.globalAlpha = 0.32;

  for (let i = 0; i < rings; i++) {
    const yBase = (height / rings) * i;
    ctx.beginPath();
    ctx.moveTo(0, yBase);
    for (let x = 0; x <= width; x += 32) {
      const wobble = Math.sin(x * 0.02 + i) * 6 + Math.cos(x * 0.05 + i * 2) * 3;
      ctx.lineTo(x, yBase + wobble);
    }
    ctx.stroke();
  }

  // Fine wood grain streaks
  ctx.globalAlpha = 0.14;
  for (let j = 0; j < 400; j++) {
    const gx = Math.random() * width;
    const gy = Math.random() * height;
    const glen = 20 + Math.random() * 60;
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx + glen, gy + (Math.random() - 0.5) * 2);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createTerracottaTileTexture(width = 512, height = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Mortar color
  ctx.fillStyle = '#9b8a78';
  ctx.fillRect(0, 0, width, height);

  const cols = 4;
  const rows = 4;
  const tileW = width / cols;
  const tileH = height / rows;
  const gap = 5;

  const tileShades = ['#bf5938', '#cb6240', '#b55030', '#c45e3c', '#d16845'];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const shade = tileShades[(r * 3 + c) % tileShades.length];
      ctx.fillStyle = shade;
      ctx.fillRect(c * tileW + gap, r * tileH + gap, tileW - gap * 2, tileH - gap * 2);

      // Subtle clay surface variation
      ctx.fillStyle = 'rgba(0,0,0,0.06)';
      for (let k = 0; k < 12; k++) {
        ctx.fillRect(
          c * tileW + gap + Math.random() * (tileW - gap * 2 - 8),
          r * tileH + gap + Math.random() * (tileH - gap * 2 - 8),
          4 + Math.random() * 8,
          4 + Math.random() * 8
        );
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createWovenBambooTexture(width = 256, height = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#d9b265';
  ctx.fillRect(0, 0, width, height);

  const step = 16;
  ctx.strokeStyle = '#9e7b39';
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.45;

  for (let i = -width; i < width * 2; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + height, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i, height);
    ctx.lineTo(i + height, 0);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createBohemianRugTexture(width = 512, height = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base rug color: warm woven ecru/terracotta
  ctx.fillStyle = '#b85d43';
  ctx.fillRect(0, 0, width, height);

  // Border strips
  ctx.fillStyle = '#e8d4b4';
  ctx.fillRect(16, 16, width - 32, height - 32);

  ctx.fillStyle = '#3a5a40';
  ctx.fillRect(28, 28, width - 56, height - 56);

  ctx.fillStyle = '#d4a373';
  ctx.fillRect(40, 40, width - 80, height - 80);

  // Center medallion diamond
  ctx.fillStyle = '#b85d43';
  ctx.beginPath();
  ctx.moveTo(width / 2, 60);
  ctx.lineTo(width - 60, height / 2);
  ctx.lineTo(width / 2, height - 60);
  ctx.lineTo(60, height / 2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#faedcd';
  ctx.beginPath();
  ctx.moveTo(width / 2, 90);
  ctx.lineTo(width - 90, height / 2);
  ctx.lineTo(width / 2, height - 90);
  ctx.lineTo(90, height / 2);
  ctx.closePath();
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createPixarRoomEnvironment(scene) {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'PixarRoomEnvironment';

  // Shared Procedural Materials
  const woodFloorTex = createWoodTexture(1024, 1024, '#ba814d', '#784820', 20);
  woodFloorTex.repeat.set(6, 6);
  const woodFloorMat = new THREE.MeshStandardMaterial({
    map: woodFloorTex,
    roughness: 0.42,
    metalness: 0.04
  });

  const tableWoodTex = createWoodTexture(512, 512, '#965a2a', '#542d0f', 16);
  const tableWoodMat = new THREE.MeshStandardMaterial({
    map: tableWoodTex,
    roughness: 0.35,
    metalness: 0.05
  });

  const wallWoodMat = new THREE.MeshStandardMaterial({
    color: 0x8b5329,
    roughness: 0.55,
    metalness: 0.02
  });

  const plasterWallMat = new THREE.MeshStandardMaterial({
    color: 0xf5ecd7,
    roughness: 0.88,
    metalness: 0.0
  });

  const terracottaTex = createTerracottaTileTexture(512, 512);
  terracottaTex.repeat.set(8, 8);
  const terracottaMat = new THREE.MeshStandardMaterial({
    map: terracottaTex,
    roughness: 0.65,
    metalness: 0.02
  });

  const roofTileMat = new THREE.MeshStandardMaterial({
    color: 0xc85635,
    roughness: 0.60,
    metalness: 0.02
  });

  const bambooMat = new THREE.MeshStandardMaterial({
    color: 0x5a9436,
    roughness: 0.38,
    metalness: 0.08
  });

  const bambooLeafMat = new THREE.MeshStandardMaterial({
    color: 0x6bb33b,
    roughness: 0.50,
    metalness: 0.02,
    side: THREE.DoubleSide
  });

  const rugTex = createBohemianRugTexture();
  const rugMat = new THREE.MeshStandardMaterial({
    map: rugTex,
    roughness: 0.90,
    metalness: 0.0
  });

  // ===========================================================================
  // 1. Handcrafted Wooden Table (Holds Chessboard at BOARD_SURFACE_Y = 0.775)
  // ===========================================================================
  const tableGroup = new THREE.Group();
  tableGroup.name = 'WoodenDiningTable';

  // Table Top (Center: X=0, Z=0; top sits at y=0.738, just under the board's 0.775)
  const TABLE_TOP_Y = 0.738;
  const tableTopGeo = new THREE.BoxGeometry(2.35, 0.074, 2.25);
  const tableTopMesh = new THREE.Mesh(tableTopGeo, tableWoodMat);
  tableTopMesh.position.set(0, TABLE_TOP_Y - 0.037, 0);
  tableTopMesh.receiveShadow = true;
  tableTopMesh.castShadow = true;
  tableGroup.add(tableTopMesh);

  // Table Beveled Apron Rim
  const apronGeo = new THREE.BoxGeometry(2.20, 0.08, 2.10);
  const apronMesh = new THREE.Mesh(apronGeo, tableWoodMat);
  apronMesh.position.set(0, TABLE_TOP_Y - 0.09, 0);
  apronMesh.castShadow = true;
  tableGroup.add(apronMesh);

  // 4 Turned Wooden Table Legs
  const legGeo = new THREE.CylinderGeometry(0.065, 0.048, TABLE_TOP_Y - 0.04, 16);
  const legPositions = [
    [-0.98, -0.92],
    [0.98, -0.92],
    [-0.98, 0.92],
    [0.98, 0.92]
  ];
  for (const [lx, lz] of legPositions) {
    const legMesh = new THREE.Mesh(legGeo, tableWoodMat);
    legMesh.position.set(lx, (TABLE_TOP_Y - 0.04) / 2, lz);
    legMesh.castShadow = true;
    tableGroup.add(legMesh);
  }

  // Cross Stretcher Rails between legs
  const railXGeo = new THREE.BoxGeometry(1.96, 0.04, 0.04);
  const railZGeo = new THREE.BoxGeometry(0.04, 0.04, 1.84);
  const railFront = new THREE.Mesh(railXGeo, tableWoodMat);
  railFront.position.set(0, 0.18, 0.92);
  tableGroup.add(railFront);
  const railBack = new THREE.Mesh(railXGeo, tableWoodMat);
  railBack.position.set(0, 0.18, -0.92);
  tableGroup.add(railBack);
  const railLeft = new THREE.Mesh(railZGeo, tableWoodMat);
  railLeft.position.set(-0.98, 0.18, 0);
  tableGroup.add(railLeft);
  const railRight = new THREE.Mesh(railZGeo, tableWoodMat);
  railRight.position.set(0.98, 0.18, 0);
  tableGroup.add(railRight);

  // ===========================================================================
  // Properly Oriented Wooden Chairs Facing the Chessboard
  // ===========================================================================
  const cushionMat = new THREE.MeshStandardMaterial({
    color: 0xfaebd7,
    roughness: 0.85,
    metalness: 0.02
  });

  function createWoodenChair(x, z, rotY) {
    const chairGroup = new THREE.Group();
    chairGroup.position.set(x, 0, z);
    chairGroup.rotation.y = rotY;

    // 1. Wooden Seat Frame
    const seatGeo = new THREE.BoxGeometry(0.58, 0.042, 0.54);
    const seatMesh = new THREE.Mesh(seatGeo, tableWoodMat);
    seatMesh.position.set(0, 0.42, 0);
    seatMesh.castShadow = true;
    chairGroup.add(seatMesh);

    // 2. Soft Padded Linen Cushion (Seat sits comfortably, low profile)
    const cushionGeo = new THREE.BoxGeometry(0.52, 0.035, 0.48);
    const cushionMesh = new THREE.Mesh(cushionGeo, cushionMat);
    cushionMesh.position.set(0, 0.45, 0);
    cushionMesh.castShadow = true;
    chairGroup.add(cushionMesh);

    // 3. 4 Turned Wooden Chair Legs
    const cLegGeo = new THREE.CylinderGeometry(0.026, 0.020, 0.42, 12);
    for (const [cx, cz] of [[-0.23, -0.21], [0.23, -0.21], [-0.23, 0.21], [0.23, 0.21]]) {
      const cLeg = new THREE.Mesh(cLegGeo, tableWoodMat);
      cLeg.position.set(cx, 0.21, cz);
      cLeg.castShadow = true;
      chairGroup.add(cLeg);
    }

    // 4. Backrest at +Z local (REAR of chair, facing away from table)
    // Low, elegant curved top rail that stays below table sightline (y <= 0.76) so it never occludes pieces
    const postGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.36, 12);
    const postL = new THREE.Mesh(postGeo, tableWoodMat);
    postL.position.set(-0.23, 0.42 + 0.18, 0.23);
    postL.castShadow = true;
    chairGroup.add(postL);

    const postR = new THREE.Mesh(postGeo, tableWoodMat);
    postR.position.set(0.23, 0.42 + 0.18, 0.23);
    postR.castShadow = true;
    chairGroup.add(postR);

    // Rounded ergonomic backrest top rail
    const topRailGeo = new THREE.BoxGeometry(0.52, 0.08, 0.032);
    const topRail = new THREE.Mesh(topRailGeo, tableWoodMat);
    topRail.position.set(0, 0.42 + 0.32, 0.23);
    topRail.castShadow = true;
    chairGroup.add(topRail);

    // Vertical carved decorative slats
    for (let s = -1; s <= 1; s++) {
      const slatGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.24, 8);
      const slat = new THREE.Mesh(slatGeo, tableWoodMat);
      slat.position.set(s * 0.11, 0.42 + 0.16, 0.23);
      chairGroup.add(slat);
    }

    return chairGroup;
  }

  // White Player Chair at South (+Z) facing North toward table (-Z direction, rotY = 0)
  tableGroup.add(createWoodenChair(0, 1.58, 0));

  // Black Player Chair at North (-Z) facing South toward table (+Z direction, rotY = Math.PI)
  tableGroup.add(createWoodenChair(0, -1.58, Math.PI));

  // Tabletop Props: Traditional Ceramic Tea Set
  const teaTrayGeo = new THREE.CylinderGeometry(0.22, 0.24, 0.02, 24);
  const teaTrayMat = new THREE.MeshStandardMaterial({ color: 0x4a321f, roughness: 0.4 });
  const teaTray = new THREE.Mesh(teaTrayGeo, teaTrayMat);
  teaTray.position.set(0.88, TABLE_TOP_Y + 0.01, 0.65);
  teaTray.receiveShadow = true;
  tableGroup.add(teaTray);

  const teaPotGeo = new THREE.SphereGeometry(0.065, 16, 16);
  const teaPotMat = new THREE.MeshStandardMaterial({ color: 0x3d7a80, roughness: 0.2, metalness: 0.1 });
  const teaPot = new THREE.Mesh(teaPotGeo, teaPotMat);
  teaPot.position.set(0.88, TABLE_TOP_Y + 0.08, 0.65);
  teaPot.castShadow = true;
  tableGroup.add(teaPot);

  const teaSpoutGeo = new THREE.CylinderGeometry(0.012, 0.02, 0.06, 12);
  const teaSpout = new THREE.Mesh(teaSpoutGeo, teaPotMat);
  teaSpout.position.set(0.93, TABLE_TOP_Y + 0.09, 0.67);
  teaSpout.rotation.z = -Math.PI / 4;
  tableGroup.add(teaSpout);

  for (let i = 0; i < 3; i++) {
    const cupGeo = new THREE.CylinderGeometry(0.025, 0.018, 0.032, 12);
    const cupMat = new THREE.MeshStandardMaterial({ color: 0xedf6f9, roughness: 0.2 });
    const cup = new THREE.Mesh(cupGeo, cupMat);
    const ang = (i / 3) * Math.PI * 2;
    cup.position.set(0.88 + Math.cos(ang) * 0.12, TABLE_TOP_Y + 0.03, 0.65 + Math.sin(ang) * 0.12);
    cup.castShadow = true;
    tableGroup.add(cup);
  }

  rootGroup.add(tableGroup);

  // ===========================================================================
  // 2. Woven Rug beneath the Table
  // ===========================================================================
  const rugGeo = new THREE.PlaneGeometry(3.6, 3.8);
  const rugMesh = new THREE.Mesh(rugGeo, rugMat);
  rugMesh.rotation.x = -Math.PI / 2;
  rugMesh.position.set(0, 0.008, 0);
  rugMesh.receiveShadow = true;
  rootGroup.add(rugMesh);

  // ===========================================================================
  // 3. Cozy Living Room Structure (Floor, Walls, Open High Airspace)
  // CRITICAL ARCHITECTURAL DESIGN:
  // - ZERO horizontal crossbeams or roof slabs over the room or courtyard!
  // - Ceiling placed at high clearance (Y = 6.8m) with BackSide material so
  //   when viewing from top-down or zooming out, the camera sees 100% CLEARLY!
  // ===========================================================================
  const roomGroup = new THREE.Group();
  roomGroup.name = 'RoomStructure';

  const CEILING_Y = 4.5;

  // Interior Wood Plank Floor (from Z = -2.6 to Z = 7.0, X = -6.5 to +6.5)
  const floorGeo = new THREE.PlaneGeometry(13.0, 9.6);
  const floorMesh = new THREE.Mesh(floorGeo, woodFloorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set(0, 0.002, 2.2);
  floorMesh.receiveShadow = true;
  roomGroup.add(floorMesh);

  // South Wall (Back wall behind White player at Z = 7.0)
  const southWallPlasterGeo = new THREE.PlaneGeometry(13.0, CEILING_Y - 1.2);
  const southWallPlaster = new THREE.Mesh(southWallPlasterGeo, plasterWallMat);
  southWallPlaster.rotation.y = Math.PI;
  southWallPlaster.position.set(0, 1.2 + (CEILING_Y - 1.2) / 2, 7.0);
  southWallPlaster.receiveShadow = true;
  roomGroup.add(southWallPlaster);

  const southWainscotGeo = new THREE.BoxGeometry(13.0, 1.2, 0.08);
  const southWainscot = new THREE.Mesh(southWainscotGeo, wallWoodMat);
  southWainscot.position.set(0, 0.6, 6.96);
  southWainscot.receiveShadow = true;
  roomGroup.add(southWainscot);

  // Large Traditional Painting on South Wall (Tranh phong cảnh non nước làng quê)
  const paintingFrameGeo = new THREE.BoxGeometry(3.2, 1.6, 0.06);
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.4 });
  const paintingFrame = new THREE.Mesh(paintingFrameGeo, frameMat);
  paintingFrame.position.set(0, 2.5, 6.92);
  paintingFrame.castShadow = true;
  roomGroup.add(paintingFrame);

  // Painting Canvas
  const artCanvas = document.createElement('canvas');
  artCanvas.width = 512;
  artCanvas.height = 256;
  const artCtx = artCanvas.getContext('2d');
  const skyGrad = artCtx.createLinearGradient(0, 0, 0, 256);
  skyGrad.addColorStop(0, '#fde293');
  skyGrad.addColorStop(0.5, '#f48fb1');
  skyGrad.addColorStop(1, '#81c784');
  artCtx.fillStyle = skyGrad;
  artCtx.fillRect(0, 0, 512, 256);
  artCtx.fillStyle = '#ffb74d';
  artCtx.beginPath();
  artCtx.arc(256, 100, 48, 0, Math.PI * 2);
  artCtx.fill();
  artCtx.fillStyle = '#2e7d32';
  artCtx.beginPath();
  artCtx.moveTo(40, 256);
  artCtx.lineTo(160, 120);
  artCtx.lineTo(280, 256);
  artCtx.fill();
  artCtx.fillStyle = '#1b5e20';
  artCtx.beginPath();
  artCtx.moveTo(220, 256);
  artCtx.lineTo(360, 140);
  artCtx.lineTo(480, 256);
  artCtx.fill();
  const artTex = new THREE.CanvasTexture(artCanvas);
  artTex.colorSpace = THREE.SRGBColorSpace;
  const artMat = new THREE.MeshBasicMaterial({ map: artTex });
  const artMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.08, 1.48), artMat);
  artMesh.rotation.y = Math.PI;
  artMesh.position.set(0, 2.5, 6.88);
  roomGroup.add(artMesh);

  // West Wall (Left side, X = -6.5)
  const westWallGeo = new THREE.PlaneGeometry(9.6, CEILING_Y);
  const westWall = new THREE.Mesh(westWallGeo, plasterWallMat);
  westWall.rotation.y = Math.PI / 2;
  westWall.position.set(-6.5, CEILING_Y / 2, 2.2);
  westWall.receiveShadow = true;
  roomGroup.add(westWall);

  // Wooden Bookshelf on West Wall
  const shelfGeo = new THREE.BoxGeometry(0.48, 2.4, 2.2);
  const shelfMesh = new THREE.Mesh(shelfGeo, tableWoodMat);
  shelfMesh.position.set(-6.2, 1.2, 3.2);
  shelfMesh.castShadow = true;
  shelfMesh.receiveShadow = true;
  roomGroup.add(shelfMesh);

  // Books in the shelf
  const bookColors = [0x9c27b0, 0x2196f3, 0x4caf50, 0xff9800, 0xf44336, 0x795548];
  for (let tier = 0; tier < 3; tier++) {
    const tierY = 0.45 + tier * 0.72;
    for (let bi = 0; bi < 7; bi++) {
      const bGeo = new THREE.BoxGeometry(0.32, 0.24 + (bi % 3) * 0.04, 0.07);
      const bMat = new THREE.MeshStandardMaterial({
        color: bookColors[(tier * 4 + bi) % bookColors.length],
        roughness: 0.6
      });
      const book = new THREE.Mesh(bGeo, bMat);
      book.position.set(-6.2, tierY + 0.12, 2.45 + bi * 0.18);
      roomGroup.add(book);
    }
  }

  // East Wall (Right side, X = 6.5) with Window looking at Bamboo
  const eastWallGeo = new THREE.PlaneGeometry(9.6, CEILING_Y);
  const eastWall = new THREE.Mesh(eastWallGeo, plasterWallMat);
  eastWall.rotation.y = -Math.PI / 2;
  eastWall.position.set(6.5, CEILING_Y / 2, 2.2);
  eastWall.receiveShadow = true;
  roomGroup.add(eastWall);

  // Traditional Carved Lattice Window on East Wall
  const winFrameGeo = new THREE.BoxGeometry(0.08, 1.8, 2.2);
  const winFrame = new THREE.Mesh(winFrameGeo, wallWoodMat);
  winFrame.position.set(6.44, 2.2, 2.8);
  roomGroup.add(winFrame);

  // Soft Warm Wall Lantern Sconces
  function createWallSconce(x, y, z, rotY) {
    const sconceGroup = new THREE.Group();
    sconceGroup.position.set(x, y, z);
    sconceGroup.rotation.y = rotY;

    const baseGeo = new THREE.BoxGeometry(0.06, 0.32, 0.14);
    const baseMesh = new THREE.Mesh(baseGeo, wallWoodMat);
    sconceGroup.add(baseMesh);

    const shadeGeo = new THREE.CylinderGeometry(0.09, 0.07, 0.22, 8);
    const shadeMat = new THREE.MeshStandardMaterial({
      color: 0xfff0c4,
      emissive: 0xffaa33,
      emissiveIntensity: 0.85,
      transparent: true,
      opacity: 0.92,
      roughness: 0.2
    });
    const shadeMesh = new THREE.Mesh(shadeGeo, shadeMat);
    shadeMesh.position.set(0.12, 0.02, 0);
    sconceGroup.add(shadeMesh);

    const sconceLight = new THREE.PointLight(0xffa834, 1.2, 4.5, 1.6);
    sconceLight.position.set(0.14, 0.02, 0);
    sconceGroup.add(sconceLight);

    return sconceGroup;
  }

  roomGroup.add(createWallSconce(-6.44, 2.3, 1.0, 0));
  roomGroup.add(createWallSconce(6.44, 2.3, 1.0, Math.PI));

  // ===========================================================================
  // 4. Open Panoramic Veranda Portal (Hoàn toàn không có dầm ngang chắn ngang giữa)
  // Pushed back to Z = -2.6. Pillars are at far flanks (X = ±4.6m).
  // NO horizontal beam crosses between the pillars — the central 9 meters are
  // 100% OPEN vertically from ground to sky!
  // ===========================================================================
  const doorPortalGroup = new THREE.Group();
  doorPortalGroup.position.set(0, 0, -2.6);

  // Pillars placed on the far flanks at x = ±4.6m
  const pillarGeo = new THREE.CylinderGeometry(0.18, 0.18, CEILING_Y, 16);
  const pillarL = new THREE.Mesh(pillarGeo, wallWoodMat);
  pillarL.position.set(-4.6, CEILING_Y / 2, 0);
  pillarL.castShadow = true;
  doorPortalGroup.add(pillarL);

  const pillarR = new THREE.Mesh(pillarGeo, wallWoodMat);
  pillarR.position.set(4.6, CEILING_Y / 2, 0);
  pillarR.castShadow = true;
  doorPortalGroup.add(pillarR);

  // Stone Plinth Bases for Pillars (Chân tảng đá quả bồng)
  const plinthGeo = new THREE.CylinderGeometry(0.26, 0.28, 0.22, 16);
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x9e988e, roughness: 0.75 });
  const plinthL = new THREE.Mesh(plinthGeo, stoneMat);
  plinthL.position.set(-4.6, 0.11, 0);
  doorPortalGroup.add(plinthL);
  const plinthR = new THREE.Mesh(plinthGeo, stoneMat);
  plinthR.position.set(4.6, 0.11, 0);
  doorPortalGroup.add(plinthR);

  // Traditional Carved Corner Brackets on top of pillars (Con sơn / Kẻ góc hiên)
  // Only extends 0.6m inward from each pillar, keeping center 8.0m totally clear!
  const bracketGeo = new THREE.BoxGeometry(0.65, 0.24, 0.24);
  const bracketL = new THREE.Mesh(bracketGeo, wallWoodMat);
  bracketL.position.set(-4.3, 3.8, 0);
  doorPortalGroup.add(bracketL);

  const bracketR = new THREE.Mesh(bracketGeo, wallWoodMat);
  bracketR.position.set(4.3, 3.8, 0);
  doorPortalGroup.add(bracketR);

  // Open Folding Doors (Cửa bức bàn xếp gọn sát 2 bên vách)
  const doorLeafGeo = new THREE.BoxGeometry(0.55, 3.6, 0.05);
  const leafAngles = [
    { x: -4.3, rot: -0.55 },
    { x: -3.8, rot: -1.05 },
    { x: 3.8, rot: 1.05 },
    { x: 4.3, rot: 0.55 }
  ];
  for (const { x, rot } of leafAngles) {
    const doorLeaf = new THREE.Mesh(doorLeafGeo, wallWoodMat);
    doorLeaf.position.set(x, 1.8, 0.06);
    doorLeaf.rotation.y = rot;
    doorLeaf.castShadow = true;
    doorPortalGroup.add(doorLeaf);
  }

  // Raised Wooden Threshold on Floor (Ngưỡng cửa gỗ thấp sát sàn)
  const thresholdGeo = new THREE.BoxGeometry(9.2, 0.06, 0.18);
  const threshold = new THREE.Mesh(thresholdGeo, wallWoodMat);
  threshold.position.set(0, 0.03, 0);
  doorPortalGroup.add(threshold);

  roomGroup.add(doorPortalGroup);
  rootGroup.add(roomGroup);

  // ===========================================================================
  // 5. Sunny Traditional Vietnamese Courtyard (Sân Hiên, Gạch Đỏ, Tre & Nia)
  // NO horizontal roof beam or slab over the center courtyard area!
  // ===========================================================================
  const courtyardGroup = new THREE.Group();
  courtyardGroup.name = 'CourtyardEnvironment';

  // Porch Terracotta Floor (Sân hiên gạch nung) from Z = -2.6 to Z = -5.0
  const porchFloorGeo = new THREE.PlaneGeometry(13.0, 2.4);
  const porchFloor = new THREE.Mesh(porchFloorGeo, terracottaMat);
  porchFloor.rotation.x = -Math.PI / 2;
  porchFloor.position.set(0, 0.001, -3.8);
  porchFloor.receiveShadow = true;
  courtyardGroup.add(porchFloor);

  // Outer Porch Step down to the courtyard
  const stepGeo = new THREE.BoxGeometry(13.0, 0.12, 0.28);
  const stepMesh = new THREE.Mesh(stepGeo, stoneMat);
  stepMesh.position.set(0, -0.06, -5.0);
  courtyardGroup.add(stepMesh);

  // Decorative Roof Eaves on Left & Right Flanks ONLY (Mái hiên cánh 2 bên, để hở hoàn toàn ở giữa)
  const flankRoofGeo = new THREE.BoxGeometry(2.4, 0.12, 2.0);
  const flankRoofL = new THREE.Mesh(flankRoofGeo, roofTileMat);
  flankRoofL.position.set(-4.8, 4.4, -3.6);
  flankRoofL.rotation.x = 0.15;
  courtyardGroup.add(flankRoofL);

  const flankRoofR = new THREE.Mesh(flankRoofGeo, roofTileMat);
  flankRoofR.position.set(4.8, 4.4, -3.6);
  flankRoofR.rotation.x = 0.15;
  courtyardGroup.add(flankRoofR);

  // Courtyard Brick Ground (Sân gạch đất nung phơi thóc) from Z = -5.0 to Z = -13.0
  const courtBrickGeo = new THREE.PlaneGeometry(16.0, 8.0);
  const courtBrick = new THREE.Mesh(courtBrickGeo, terracottaMat);
  courtBrick.rotation.x = -Math.PI / 2;
  courtBrick.position.set(0, -0.12, -9.0);
  courtBrick.receiveShadow = true;
  courtyardGroup.add(courtBrick);

  // Surrounding Lush Green Grass Lawn (Thảm cỏ xanh làng quê)
  const grassMat = new THREE.MeshStandardMaterial({
    color: 0x6ca33e,
    roughness: 0.85,
    metalness: 0.0
  });
  const lawnGeo = new THREE.PlaneGeometry(42.0, 36.0);
  const lawn = new THREE.Mesh(lawnGeo, grassMat);
  lawn.rotation.x = -Math.PI / 2;
  lawn.position.set(0, -0.15, -18.0);
  lawn.receiveShadow = true;
  courtyardGroup.add(lawn);

  // Winding Dirt Country Path (Đường đất uốn lượn như trong ảnh)
  const dirtMat = new THREE.MeshStandardMaterial({
    color: 0xd4a359,
    roughness: 0.92,
    metalness: 0.0
  });
  const pathGeo = new THREE.PlaneGeometry(2.4, 28.0, 16, 32);
  const posAttr = pathGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const py = posAttr.getY(i);
    const curveOffset = Math.sin(py * 0.18) * 3.2 + Math.cos(py * 0.08) * 1.8;
    posAttr.setX(i, posAttr.getX(i) + curveOffset);
  }
  pathGeo.computeVertexNormals();
  const dirtPath = new THREE.Mesh(pathGeo, dirtMat);
  dirtPath.rotation.x = -Math.PI / 2;
  dirtPath.position.set(4.2, -0.135, -16.0);
  dirtPath.receiveShadow = true;
  courtyardGroup.add(dirtPath);

  // Two Round Woven Bamboo Drying Mats (Nia phơi thóc tròn màu vàng như trong ảnh)
  const dryingMatTex = createWovenBambooTexture(256, 256);
  const dryingMatMaterial = new THREE.MeshStandardMaterial({
    map: dryingMatTex,
    roughness: 0.75,
    metalness: 0.02
  });

  function createDryingMat(x, z, radius = 0.95) {
    const matGroup = new THREE.Group();
    matGroup.position.set(x, -0.11, z);

    // Flat woven bamboo circle
    const circleGeo = new THREE.CircleGeometry(radius, 32);
    const matMesh = new THREE.Mesh(circleGeo, dryingMatMaterial);
    matMesh.rotation.x = -Math.PI / 2;
    matMesh.receiveShadow = true;
    matGroup.add(matMesh);

    // Raised bamboo rim around the drying mat (Viền cạp nia tre)
    const rimGeo = new THREE.TorusGeometry(radius, 0.024, 8, 32);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x9e7a3b, roughness: 0.6 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = -Math.PI / 2;
    rim.position.y = 0.015;
    matGroup.add(rim);

    // Golden scattered rice paddy grain in the middle (Thóc vàng)
    const grainGeo = new THREE.CircleGeometry(radius * 0.82, 24);
    const grainMat = new THREE.MeshStandardMaterial({ color: 0xe8ba4d, roughness: 0.85 });
    const grain = new THREE.Mesh(grainGeo, grainMat);
    grain.rotation.x = -Math.PI / 2;
    grain.position.y = 0.005;
    matGroup.add(grain);

    return matGroup;
  }

  // Mat 1 & Mat 2 on the brick courtyard (as seen in IMG_1189 & IMG_1183)
  courtyardGroup.add(createDryingMat(-2.4, -6.8, 0.92));
  courtyardGroup.add(createDryingMat(1.9, -7.4, 0.98));

  // Traditional Rustic Bamboo Daybed / Table (Chõng tre như trong ảnh)
  const daybedGroup = new THREE.Group();
  daybedGroup.position.set(3.8, -0.12, -5.6);
  daybedGroup.rotation.y = -0.18;

  const daybedTopGeo = new THREE.BoxGeometry(1.6, 0.05, 0.85);
  const daybedTop = new THREE.Mesh(daybedTopGeo, dryingMatMaterial);
  daybedTop.position.set(0, 0.44, 0);
  daybedTop.castShadow = true;
  daybedTop.receiveShadow = true;
  daybedGroup.add(daybedTop);

  const bLegGeo = new THREE.CylinderGeometry(0.04, 0.035, 0.44, 12);
  for (const [bx, bz] of [[-0.72, -0.36], [0.72, -0.36], [-0.72, 0.36], [0.72, 0.36]]) {
    const bLeg = new THREE.Mesh(bLegGeo, bambooMat);
    bLeg.position.set(bx, 0.22, bz);
    bLeg.castShadow = true;
    daybedGroup.add(bLeg);
  }
  courtyardGroup.add(daybedGroup);

  // Distant Village Cottage with Tile Roof (Nhà cổ quê xa xa)
  const cottageGroup = new THREE.Group();
  cottageGroup.position.set(-9.5, -0.14, -13.5);
  cottageGroup.rotation.y = 0.35;

  const cottageWallGeo = new THREE.BoxGeometry(5.2, 2.6, 4.0);
  const cottageWall = new THREE.Mesh(cottageWallGeo, plasterWallMat);
  cottageWall.position.set(0, 1.3, 0);
  cottageWall.castShadow = true;
  cottageGroup.add(cottageWall);

  const cottageRoofGeo = new THREE.ConeGeometry(4.2, 1.8, 4);
  const cottageRoof = new THREE.Mesh(cottageRoofGeo, roofTileMat);
  cottageRoof.position.set(0, 3.4, 0);
  cottageRoof.rotation.y = Math.PI / 4;
  cottageRoof.scale.set(1.1, 1.0, 0.85);
  cottageRoof.castShadow = true;
  cottageGroup.add(cottageRoof);

  courtyardGroup.add(cottageGroup);
  rootGroup.add(courtyardGroup);

  // ===========================================================================
  // 6. Swaying Traditional Lanterns on the Flanks (Đèn Lồng Đung Đưa 2 bên)
  // Positioned on the left and right flanks so they frame the view without
  // ever hanging in front of the chessboard or central sightline!
  // ===========================================================================
  const swayingLanterns = [];

  function createHangingLantern(x, y, z, colorHex = 0xe63946, lightColor = 0xff6b6b) {
    const lanternAnchor = new THREE.Group();
    lanternAnchor.position.set(x, y, z);

    const lanternPivot = new THREE.Group();
    lanternAnchor.add(lanternPivot);

    const stringGeo = new THREE.CylinderGeometry(0.006, 0.006, 0.50, 8);
    const stringMat = new THREE.MeshBasicMaterial({ color: 0x2b2b2b });
    const stringMesh = new THREE.Mesh(stringGeo, stringMat);
    stringMesh.position.set(0, -0.25, 0);
    lanternPivot.add(stringMesh);

    // Lantern Body: Traditional faceted festival lantern
    const bodyGeo = new THREE.SphereGeometry(0.18, 16, 12);
    bodyGeo.scale(1.0, 1.35, 1.0);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: lightColor,
      emissiveIntensity: 0.55,
      roughness: 0.35,
      metalness: 0.1
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.set(0, -0.62, 0);
    bodyMesh.castShadow = true;
    lanternPivot.add(bodyMesh);

    const capGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16);
    const capMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 });
    const topCap = new THREE.Mesh(capGeo, capMat);
    topCap.position.set(0, -0.48, 0);
    lanternPivot.add(topCap);
    const btmCap = new THREE.Mesh(capGeo, capMat);
    btmCap.position.set(0, -0.76, 0);
    lanternPivot.add(btmCap);

    const tasselGeo = new THREE.CylinderGeometry(0.015, 0.035, 0.22, 12);
    const tasselMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.7 });
    const tassel = new THREE.Mesh(tasselGeo, tasselMat);
    tassel.position.set(0, -0.89, 0);
    lanternPivot.add(tassel);

    const lanternLight = new THREE.PointLight(lightColor, 1.4, 6.0, 1.5);
    lanternLight.position.set(0, -0.62, 0);
    lanternPivot.add(lanternLight);

    swayingLanterns.push({
      pivot: lanternPivot,
      speed: 1.4 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      amp: 0.11 + Math.random() * 0.05
    });

    return lanternAnchor;
  }

  // Lanterns hung from side brackets at x = ±4.3m and x = ±3.6m
  rootGroup.add(createHangingLantern(-4.3, 3.6, -2.6, 0x48cae4, 0x00b4d8)); // Cyan-green
  rootGroup.add(createHangingLantern(-3.6, 3.8, -3.2, 0x52b788, 0x74c69d)); // Jade-green
  rootGroup.add(createHangingLantern(3.6, 3.8, -3.2, 0xf77f00, 0xfcbf49));  // Golden-amber
  rootGroup.add(createHangingLantern(4.3, 3.6, -2.6, 0xf72585, 0xff70a6));  // Magenta-pink

  // ===========================================================================
  // 7. Swaying Bamboo Groves (Rặng Tre Xanh Rung Rinh Theo Gió)
  // ===========================================================================
  const swayingBambooGroves = [];

  function createBambooStalk(height = 4.8, radius = 0.055) {
    const stalkGroup = new THREE.Group();

    const nodeCount = Math.floor(height / 0.55);
    const nodeSegHeight = height / nodeCount;

    for (let i = 0; i < nodeCount; i++) {
      const segGeo = new THREE.CylinderGeometry(radius * 0.94, radius, nodeSegHeight * 0.96, 12);
      const segMesh = new THREE.Mesh(segGeo, bambooMat);
      segMesh.position.set(0, (i + 0.5) * nodeSegHeight, 0);
      segMesh.castShadow = true;
      stalkGroup.add(segMesh);

      // Node ring
      const ringGeo = new THREE.TorusGeometry(radius * 1.05, 0.012, 6, 16);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0x95c862, roughness: 0.4 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0, (i + 1) * nodeSegHeight, 0);
      stalkGroup.add(ring);

      // Leaves growing on upper half
      if (i > nodeCount * 0.35) {
        const leafGroup = new THREE.Group();
        leafGroup.position.set(0, (i + 0.9) * nodeSegHeight, 0);
        leafGroup.rotation.y = (i * 1.6);

        for (let l = 0; l < 4; l++) {
          const lGeo = new THREE.PlaneGeometry(0.08, 0.32);
          const leaf = new THREE.Mesh(lGeo, bambooLeafMat);
          leaf.rotation.x = 0.55 + Math.random() * 0.25;
          leaf.rotation.z = (l - 1.5) * 0.35;
          leaf.position.set((l - 1.5) * 0.08, 0.14, 0.05);
          leafGroup.add(leaf);
        }
        stalkGroup.add(leafGroup);
      }
    }

    return stalkGroup;
  }

  function createBambooCluster(cx, cz, stalkCount = 9, spread = 1.2) {
    const cluster = new THREE.Group();
    cluster.position.set(cx, -0.12, cz);

    const stalks = [];
    for (let i = 0; i < stalkCount; i++) {
      const r = Math.random() * spread;
      const th = Math.random() * Math.PI * 2;
      const h = 4.2 + Math.random() * 2.2;
      const stalk = createBambooStalk(h, 0.045 + Math.random() * 0.02);
      stalk.position.set(Math.cos(th) * r, 0, Math.sin(th) * r);
      stalk.rotation.z = (Math.random() - 0.5) * 0.08;
      cluster.add(stalk);
      stalks.push(stalk);
    }

    swayingBambooGroves.push({
      stalks,
      baseSpeed: 1.2 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2
    });

    return cluster;
  }

  rootGroup.add(createBambooCluster(-5.8, -6.5, 12, 1.4));
  rootGroup.add(createBambooCluster(6.4, -7.2, 14, 1.6));
  rootGroup.add(createBambooCluster(-8.2, -11.0, 16, 2.0));
  rootGroup.add(createBambooCluster(8.5, -13.0, 18, 2.2));

  // ===========================================================================
  // 8. High-Fidelity 3D Pixar Rooster Model (Chú Gà Trống Hoạt Hình Pixar)
  // Sculpted with multi-part silhouette hierarchy:
  // - Expressive Disney/Pixar head with ruby-red multi-lobed comb & teardrop wattles
  // - Cute expressive eyes with white sclera, dark iris, and bright specular gleam
  // - Beautiful golden hackle cape cascading around neck and shoulders
  // - Rich iridescent plumaged chest and body (deep copper & emerald green)
  // - Magnificent arching sickle tail feathers with silky iridescent sheen
  // - Detailed scaled yellow legs, spurs, and 4 splayed ground-gripping claws
  // ===========================================================================
  const roosterGroup = new THREE.Group();
  roosterGroup.name = 'PixarRooster';
  // Positioned on the brick courtyard at y = -0.12 (brick level)
  roosterGroup.position.set(-1.2, -0.12, -4.6);
  roosterGroup.scale.setScalar(0.85);

  // Soft contact shadow disc under the rooster
  const roosterShadowGeo = new THREE.CircleGeometry(0.32, 24);
  const roosterShadowMat = new THREE.MeshBasicMaterial({
    color: 0x1b120c,
    transparent: true,
    opacity: 0.45
  });
  const roosterShadow = new THREE.Mesh(roosterShadowGeo, roosterShadowMat);
  roosterShadow.rotation.x = -Math.PI / 2;
  roosterShadow.position.set(0, 0.005, 0);
  roosterGroup.add(roosterShadow);

  // Rooster Upper Body Group (Bobs up and down when walking)
  const roosterBodyUpper = new THREE.Group();
  roosterBodyUpper.position.set(0, 0.38, 0);
  roosterGroup.add(roosterBodyUpper);

  // 1. Plump Sculpted Body (Thân gà mập tròn phong cách Pixar)
  const bodyGeo = new THREE.SphereGeometry(0.24, 20, 16);
  bodyGeo.scale(0.95, 1.15, 1.35);
  const bodyPlumageMat = new THREE.MeshStandardMaterial({
    color: 0x4a2411, // Rich copper-chestnut body
    roughness: 0.42,
    metalness: 0.15
  });
  const bodyMesh = new THREE.Mesh(bodyGeo, bodyPlumageMat);
  bodyMesh.position.set(0, 0, 0);
  bodyMesh.castShadow = true;
  roosterBodyUpper.add(bodyMesh);

  // Glossy Emerald/Teal Breast (Ức gà màu cánh cam óng ánh)
  const breastGeo = new THREE.SphereGeometry(0.20, 16, 14);
  breastGeo.scale(0.88, 1.05, 1.0);
  const breastMat = new THREE.MeshStandardMaterial({
    color: 0x144234, // Metallic dark forest green sheen
    roughness: 0.32,
    metalness: 0.35
  });
  const breastMesh = new THREE.Mesh(breastGeo, breastMat);
  breastMesh.position.set(0, -0.04, 0.16);
  breastMesh.castShadow = true;
  roosterBodyUpper.add(breastMesh);

  // 2. Golden Hackles / Cape Collar (Lông cổ vàng ánh kim đặc trưng)
  const hacklesGeo = new THREE.ConeGeometry(0.21, 0.32, 16, 1, true);
  const hacklesMat = new THREE.MeshStandardMaterial({
    color: 0xe88a17, // Golden amber-saffron
    roughness: 0.38,
    metalness: 0.18,
    side: THREE.DoubleSide
  });
  const hacklesMesh = new THREE.Mesh(hacklesGeo, hacklesMat);
  hacklesMesh.rotation.x = -0.32;
  hacklesMesh.position.set(0, 0.18, 0.14);
  hacklesMesh.castShadow = true;
  roosterBodyUpper.add(hacklesMesh);

  // Upper Neck Column
  const neckGeo = new THREE.CylinderGeometry(0.09, 0.14, 0.22, 14);
  const neckMat = new THREE.MeshStandardMaterial({ color: 0xf7a41d, roughness: 0.36 });
  const neckMesh = new THREE.Mesh(neckGeo, neckMat);
  neckMesh.rotation.x = -0.28;
  neckMesh.position.set(0, 0.28, 0.18);
  neckMesh.castShadow = true;
  roosterBodyUpper.add(neckMesh);

  // 3. Head & Face Group (Pivots for pecking & looking around)
  const headPivotGroup = new THREE.Group();
  headPivotGroup.position.set(0, 0.38, 0.24);
  roosterBodyUpper.add(headPivotGroup);

  // Rounded cute Pixar head
  const headGeo = new THREE.SphereGeometry(0.12, 18, 14);
  const headMat = new THREE.MeshStandardMaterial({ color: 0xfcb001, roughness: 0.35 });
  const headMesh = new THREE.Mesh(headGeo, headMat);
  headMesh.castShadow = true;
  headPivotGroup.add(headMesh);

  // Vibrant Crimson Red Comb with 4 Sculpted Rounded Peaks (Mào cờ đỏ tươi lượn sóng)
  const combGroup = new THREE.Group();
  combGroup.position.set(0, 0.10, -0.02);
  const combMat = new THREE.MeshStandardMaterial({
    color: 0xd90429, // Vibrant crimson
    roughness: 0.28,
    metalness: 0.08
  });
  // 4 connected lobes of the comb
  const combLobes = [
    { y: 0.04, z: -0.09, sy: 0.06, sz: 0.04 },
    { y: 0.07, z: -0.03, sy: 0.09, sz: 0.05 },
    { y: 0.09, z: 0.03,  sy: 0.11, sz: 0.05 },
    { y: 0.06, z: 0.08,  sy: 0.08, sz: 0.04 }
  ];
  for (const lobe of combLobes) {
    const lGeo = new THREE.SphereGeometry(0.038, 12, 10);
    lGeo.scale(0.35, lobe.sy / 0.05, lobe.sz / 0.04);
    const lMesh = new THREE.Mesh(lGeo, combMat);
    lMesh.position.set(0, lobe.y, lobe.z);
    lMesh.castShadow = true;
    combGroup.add(lMesh);
  }
  // Base crest blade connecting lobes
  const combBladeGeo = new THREE.BoxGeometry(0.024, 0.10, 0.22);
  const combBlade = new THREE.Mesh(combBladeGeo, combMat);
  combBlade.position.set(0, 0.02, 0);
  combGroup.add(combBlade);
  headPivotGroup.add(combGroup);

  // Dual Teardrop Red Wattles under chin (Yếm họng đỏ)
  for (const wx of [-0.03, 0.03]) {
    const wattleGeo = new THREE.SphereGeometry(0.042, 10, 10);
    wattleGeo.scale(0.55, 1.45, 0.75);
    const wMesh = new THREE.Mesh(wattleGeo, combMat);
    wMesh.position.set(wx, -0.10, 0.08);
    wMesh.castShadow = true;
    headPivotGroup.add(wMesh);
  }

  // Curved Golden Beak (Mỏ gà cong vàng óng)
  const beakTopGeo = new THREE.ConeGeometry(0.042, 0.13, 10);
  const beakMat = new THREE.MeshStandardMaterial({ color: 0xffb703, roughness: 0.25 });
  const beakTop = new THREE.Mesh(beakTopGeo, beakMat);
  beakTop.rotation.x = Math.PI / 2 + 0.12;
  beakTop.position.set(0, -0.015, 0.17);
  beakTop.scale.set(0.85, 1.0, 0.75);
  beakTop.castShadow = true;
  headPivotGroup.add(beakTop);

  // Expressive Pixar Eyes (Mắt to tròn long lanh có đốm sáng phong cách hoạt hình)
  const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0a0a0a });
  const gleamMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (const side of [-1, 1]) {
    const eyeAnchor = new THREE.Group();
    eyeAnchor.position.set(side * 0.095, 0.03, 0.05);

    // Eye ring
    const eyeRingGeo = new THREE.TorusGeometry(0.032, 0.008, 6, 14);
    const eyeRing = new THREE.Mesh(eyeRingGeo, combMat);
    eyeRing.rotation.y = side * Math.PI / 2;
    eyeAnchor.add(eyeRing);

    // Sclera
    const scleraGeo = new THREE.SphereGeometry(0.03, 12, 10);
    const sclera = new THREE.Mesh(scleraGeo, eyeWhiteMat);
    eyeAnchor.add(sclera);

    // Dark Pupil
    const pupilGeo = new THREE.SphereGeometry(0.018, 10, 8);
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.set(side * 0.015, 0.002, 0.016);
    eyeAnchor.add(pupil);

    // Specular Highlight Glint
    const glintGeo = new THREE.SphereGeometry(0.006, 6, 6);
    const glint = new THREE.Mesh(glintGeo, gleamMat);
    glint.position.set(side * 0.018, 0.010, 0.024);
    eyeAnchor.add(glint);

    headPivotGroup.add(eyeAnchor);
  }

  // 4. Layered Folded Wings (Đôi cánh phong cách Pixar nhiều lớp)
  const wingMat = new THREE.MeshStandardMaterial({
    color: 0x7a3014, // Chestnut brown
    roughness: 0.45
  });
  const wingBarMat = new THREE.MeshStandardMaterial({
    color: 0x1b4965, // Iridescent teal wing bar
    roughness: 0.32,
    metalness: 0.3
  });

  for (const side of [-1, 1]) {
    const wingGroup = new THREE.Group();
    wingGroup.position.set(side * 0.20, 0.02, -0.04);
    wingGroup.rotation.y = side * 0.12;
    wingGroup.rotation.z = side * -0.15;

    // Wing main coverts
    const wMainGeo = new THREE.SphereGeometry(0.18, 14, 10);
    wMainGeo.scale(0.35, 0.95, 1.45);
    const wMain = new THREE.Mesh(wMainGeo, wingMat);
    wMain.castShadow = true;
    wingGroup.add(wMain);

    // Wing iridescent accent strip
    const wBarGeo = new THREE.BoxGeometry(0.06, 0.08, 0.32);
    const wBar = new THREE.Mesh(wBarGeo, wingBarMat);
    wBar.position.set(side * 0.05, -0.04, 0.02);
    wingGroup.add(wBar);

    roosterBodyUpper.add(wingGroup);
  }

  // 5. Magnificent Sweeping Sickle Tail Feathers (Đuôi gà trống cong hình lưỡi liềm óng ánh)
  const tailGroup = new THREE.Group();
  tailGroup.position.set(0, 0.08, -0.26);

  const tailMatTeal = new THREE.MeshStandardMaterial({
    color: 0x0f4c3a, // Emerald teal
    roughness: 0.26,
    metalness: 0.38
  });
  const tailMatBlue = new THREE.MeshStandardMaterial({
    color: 0x162f40, // Midnight sapphire
    roughness: 0.28,
    metalness: 0.35
  });
  const tailMatViolet = new THREE.MeshStandardMaterial({
    color: 0x24142e, // Deep violet
    roughness: 0.30,
    metalness: 0.32
  });
  const tailPalette = [tailMatTeal, tailMatBlue, tailMatViolet, tailMatTeal, tailMatBlue, tailMatTeal];

  // 7 sweeping arched plume curves
  for (let t = 0; t < 7; t++) {
    const lateralX = (t - 3) * 0.032;
    const archHeight = 0.52 + ((t * 3) % 4) * 0.07;
    const dropBack = -0.42 - ((t * 2) % 5) * 0.09;
    const endY = 0.05 + (t % 3) * 0.08;

    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(lateralX * 0.4, 0, 0),
      new THREE.Vector3(lateralX * 0.7, archHeight * 0.95, -0.18),
      new THREE.Vector3(lateralX * 1.1, archHeight * 0.98, dropBack * 0.75),
      new THREE.Vector3(lateralX * 0.9, endY, dropBack)
    );

    const plumeGeo = new THREE.TubeGeometry(curve, 18, 0.024 - t * 0.0018, 8, false);
    const plumeMesh = new THREE.Mesh(plumeGeo, tailPalette[t % tailPalette.length]);
    plumeMesh.castShadow = true;
    tailGroup.add(plumeMesh);
  }

  // Fluffy golden saddle covert tuft at tail root
  const saddleGeo = new THREE.SphereGeometry(0.12, 10, 8);
  saddleGeo.scale(0.8, 0.7, 1.2);
  const saddleMesh = new THREE.Mesh(saddleGeo, hacklesMat);
  saddleMesh.position.set(0, -0.02, 0.06);
  tailGroup.add(saddleMesh);

  roosterBodyUpper.add(tailGroup);

  // 6. Realistic Scaled Yellow Legs, Spurs & Ground-Gripping Claws (Chân vàng có móng bám đất)
  const legScaleMat = new THREE.MeshStandardMaterial({
    color: 0xf4a226, // Saffron yellow
    roughness: 0.48
  });
  const clawMat = new THREE.MeshStandardMaterial({
    color: 0x2b211a, // Dark horn claws
    roughness: 0.35
  });

  function createRoosterLeg(isLeft) {
    const legPivot = new THREE.Group();
    const legX = isLeft ? -0.10 : 0.10;
    legPivot.position.set(legX, 0.38, 0);

    // Thigh / Drumstick (Bắp đùi có lông phủ)
    const thighGeo = new THREE.ConeGeometry(0.075, 0.16, 12);
    const thighMesh = new THREE.Mesh(thighGeo, bodyPlumageMat);
    thighMesh.rotation.x = Math.PI;
    thighMesh.position.set(0, -0.08, 0);
    thighMesh.castShadow = true;
    legPivot.add(thighMesh);

    // Scaled Shank / Tarsus (Ống chân vàng)
    const shankGeo = new THREE.CylinderGeometry(0.018, 0.016, 0.22, 10);
    const shankMesh = new THREE.Mesh(shankGeo, legScaleMat);
    shankMesh.position.set(0, -0.24, 0.01);
    shankMesh.castShadow = true;
    legPivot.add(shankMesh);

    // Sharp Spur on inner leg (Cựa gà nhọn)
    const spurGeo = new THREE.ConeGeometry(0.012, 0.05, 8);
    const spurMesh = new THREE.Mesh(spurGeo, clawMat);
    spurMesh.rotation.z = isLeft ? -Math.PI / 2.8 : Math.PI / 2.8;
    spurMesh.position.set(isLeft ? 0.025 : -0.025, -0.27, -0.02);
    legPivot.add(spurMesh);

    // Foot & 4 Claws firmly on ground (3 forward, 1 rear)
    const footGroup = new THREE.Group();
    footGroup.position.set(0, -0.36, 0.02);

    const toeAngles = [-0.36, 0, 0.36];
    for (const tang of toeAngles) {
      const toeGeo = new THREE.CylinderGeometry(0.011, 0.009, 0.11, 8);
      const toe = new THREE.Mesh(toeGeo, legScaleMat);
      toe.rotation.x = Math.PI / 2;
      toe.rotation.y = tang;
      toe.position.set(Math.sin(tang) * 0.055, 0.005, Math.cos(tang) * 0.055);
      footGroup.add(toe);

      // Curved Claw tip
      const clawGeo = new THREE.ConeGeometry(0.008, 0.03, 6);
      const claw = new THREE.Mesh(clawGeo, clawMat);
      claw.rotation.x = Math.PI / 2 + 0.35;
      claw.rotation.y = tang;
      claw.position.set(Math.sin(tang) * 0.11, 0.003, Math.cos(tang) * 0.11);
      footGroup.add(claw);
    }

    // Rear claw (Móng sau bám đất)
    const rearToeGeo = new THREE.CylinderGeometry(0.010, 0.008, 0.07, 8);
    const rearToe = new THREE.Mesh(rearToeGeo, legScaleMat);
    rearToe.rotation.x = -Math.PI / 2;
    rearToe.position.set(0, 0.005, -0.035);
    footGroup.add(rearToe);

    legPivot.add(footGroup);
    return legPivot;
  }

  const leftLegPivot = createRoosterLeg(true);
  roosterGroup.add(leftLegPivot);

  const rightLegPivot = createRoosterLeg(false);
  roosterGroup.add(rightLegPivot);

  courtyardGroup.add(roosterGroup);

  // Rooster Patrol Waypoints (Walking around courtyard and looking at the players)
  const roosterWaypoints = [
    new THREE.Vector3(-1.4, -0.12, -4.6),
    new THREE.Vector3(-2.2, -0.12, -6.4),
    new THREE.Vector3(-0.4, -0.12, -7.2),
    new THREE.Vector3(1.4, -0.12, -5.8),
    new THREE.Vector3(0.6, -0.12, -4.4)
  ];
  let curWpIdx = 0;
  let wpProgress = 0;
  let isPecking = false;
  let peckTimer = 0;
  let peckPhase = 0;

  // ===========================================================================
  // Per-Frame Environmental Animation Hook
  // ===========================================================================
  function updateEnvironment(dt, elapsedTotal) {
    // 1. Lanterns Pendulum Sway
    for (let i = 0; i < swayingLanterns.length; i++) {
      const l = swayingLanterns[i];
      const angX = Math.sin(elapsedTotal * l.speed + l.phase) * l.amp;
      const angZ = Math.cos(elapsedTotal * (l.speed * 0.8) + l.phase) * (l.amp * 0.7);
      l.pivot.rotation.x = angX;
      l.pivot.rotation.z = angZ;
    }

    // 2. Bamboo Groves Wind Sway
    for (let g = 0; g < swayingBambooGroves.length; g++) {
      const grove = swayingBambooGroves[g];
      const windA = Math.sin(elapsedTotal * grove.baseSpeed + grove.phase) * 0.055;
      const windB = Math.cos(elapsedTotal * (grove.baseSpeed * 0.75) + grove.phase) * 0.045;
      for (let s = 0; s < grove.stalks.length; s++) {
        const stalk = grove.stalks[s];
        stalk.rotation.x = windA + Math.sin(elapsedTotal * 2.2 + s) * 0.012;
        stalk.rotation.z = windB + Math.cos(elapsedTotal * 1.8 + s) * 0.012;
      }
    }

    // 3. Rooster Patrol & Pecking Kinematics
    if (isPecking) {
      peckTimer -= dt;
      peckPhase += dt * 14.0;
      // Snappy, realistic chicken peck (rapid head drop + bob)
      const peckCycle = Math.max(0, Math.sin(peckPhase));
      headPivotGroup.rotation.x = peckCycle * 0.75;
      roosterBodyUpper.rotation.x = peckCycle * 0.18;
      leftLegPivot.rotation.x = 0;
      rightLegPivot.rotation.x = 0;
      tailGroup.rotation.y = Math.sin(elapsedTotal * 6.0) * 0.08;

      if (peckTimer <= 0) {
        isPecking = false;
        headPivotGroup.rotation.x = 0;
        roosterBodyUpper.rotation.x = 0;
      }
    } else {
      const wpStart = roosterWaypoints[curWpIdx];
      const nextWpIdx = (curWpIdx + 1) % roosterWaypoints.length;
      const wpEnd = roosterWaypoints[nextWpIdx];
      const dist = wpStart.distanceTo(wpEnd);

      const walkSpeed = 0.52; // m/s
      wpProgress += (walkSpeed * dt) / dist;

      if (wpProgress >= 1.0) {
        wpProgress = 0;
        curWpIdx = nextWpIdx;
        // 60% chance to stop and peck for grains
        if (Math.random() < 0.60) {
          isPecking = true;
          peckTimer = 1.8 + Math.random() * 1.2;
          peckPhase = 0;
        }
      }

      // Smooth position interpolation
      roosterGroup.position.lerpVectors(wpStart, wpEnd, wpProgress);

      // Facing orientation along path
      const dirX = wpEnd.x - wpStart.x;
      const dirZ = wpEnd.z - wpStart.z;
      const targetAngle = Math.atan2(dirX, dirZ);
      roosterGroup.rotation.y = THREE.MathUtils.lerp(roosterGroup.rotation.y, targetAngle, 0.08);

      // Avian Walking Kinematics: Leg Swing, Avian Head Bob, and Body Bobbing
      const walkFreq = 8.5;
      const legSwing = Math.sin(elapsedTotal * walkFreq) * 0.42;
      leftLegPivot.rotation.x = legSwing;
      rightLegPivot.rotation.x = -legSwing;

      // Realistic chicken head-bob (thrust forward on stride)
      headPivotGroup.position.z = 0.24 + Math.sin(elapsedTotal * walkFreq) * 0.035;
      headPivotGroup.rotation.x = Math.sin(elapsedTotal * walkFreq) * 0.08;

      // Body vertical bobbing
      roosterBodyUpper.position.y = 0.38 + Math.abs(Math.cos(elapsedTotal * walkFreq)) * 0.024;
      tailGroup.rotation.y = Math.sin(elapsedTotal * walkFreq * 0.5) * 0.12;
    }
  }

  scene.add(rootGroup);

  return {
    rootGroup,
    tableGroup,
    updateEnvironment
  };
}
