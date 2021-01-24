var HolidayZombies = {};

HolidayZombies.init = function () {


	HolidayZombies.startUp();

};

HolidayZombies.startUp = function () {
	var canvas,
	    context,
	    skycanvas,
	    skycontext,
	    suncanvas,
	    suncontext,
	    backgroundcanvas,
	    backgroundcontext,
	    foregroundcanvas,
	    foregroundcontext,
	    starcanvas,
	    starcontext,
	    mooncanvas,
	    mooncontext,
	    treecanvas,
	    treecontext,
	    bgmencanvas,
	    bgmencontext,
	    bgmenshadowcanvas,
	    bgmenshadowcontext,
	    flyingheadcanvas,
	    flyingheadcontext,
	    foregroundtreecanvas,
	    foregroundtreecontext,
	    lenscanvas,
	    lenscontext,
	    shadowcontext,
	    shadowcanvas,
	    canvaswidth,
	    canvasheight,
	    snowballs = [],
	    particles = [],
	    gravity = 1,
	    friction = 0.9,
	    currentsuperball = null,
	    superballCharging = false,
	    newZombieCounter = 20,
	    zombiebuffer = 200,
	    greg = new Image(),
	    greg_l = new Image(),
	    roger = new Image(),
	    roger_l = new Image(),
	    karl = new Image(),
	    karl_l = new Image(),
	    steve = new Image(),
	    steve_l = new Image(),
	    tony = new Image(),
	    tony_l = new Image(),
	    frank = new Image(),
	    frank_l = new Image(),
	    midriff_ted = new Image(),
	    base_marty = new Image(),
	    deadheads = [],
	    firedBalls = [],
	    wavecounter = 1,
	    cloud1 = new Image(),
	    blizzardAttackAvailable = false,
	    frameCounter = new FrameRateCounter(),
	    smashSound = document.createElement('audio'),
	    wooshSound = document.createElement('audio'),
	    happymusic = document.createElement('audio'),
	    scarymusic = document.createElement('audio'),
	    currentGameStateFunction = null,
	    shakeCounter = 0,
	    shakeLeft = true,
	    bunnie = {},
	    banner = new Image(),
	    banner2 = new Image(),
	    banner3 = new Image(),
	    snowModels = [],
	    buildButton = new Image(),
	    theSun = new Image(),
	    currentMouseUpHandler = null,
	    currentMouseMoveHandler = null,
	    currentMouseDownHandler = null,
	    currentBGRenderFunction = null,
	    snowmanModels = [],
	    snowmanModelOne = new Image(),
	    snowmanModelTwo = new Image(),
	    snowmanModelThree = new Image(),
	    snowmanModelFour = new Image(),
	    currentSnowModel = null,
	    oldSnowModel = null,
	    snowModelCounter = 1,
	    modelLoopTimer = null,
	    skytile = new Image(),
	    snowtile = new Image(),
	    nightsky = new Image(),
	    moon = new Image(),
	    nightsnow = new Image(),
	    coals = [],
	    ground,
	    meltRate,
	    mountains = new Image(),
	    tree = new Image(),
	    tree2 = new Image(),
	    // GAME_STATE_INTRO = 'intro',
	    leftOne = false,
	    // GAME_STATE_SNOWMAN_BUILDER = 'snowman builder',
	    // GAME_STATE_DARK_TRANSITION = 'dark transition',
	    // GAME_STATE_ZOMBIE_GAME = 'zombie game',
	    // GAME_STATE_BUNNIE_DIES = 'bunnie dies;',
	    // GAME_STATE_CONGRATS = 'congrats',
	    totalAssets = 0,
	    assetsLoaded = 0,

	    zombies,
	    junks,
	    bunnyLeft = new Image(),
	    bunnyRight = new Image(),
	    bunnyCower = new Image(),
	    bunnyDive = new Image(),
	    bunnyUp = new Image(),
	    // armPoints = [],
	    stars = [],
	    activesnowmen = 0,
	    severedarms = [],
	    bgBalls = [],
	    flyingheads = [],
	    trees = [],
	    foregroundtrees = [],
	    birdleft = new Image(),
	    birdright = new Image(),
	    birdframes = 15,
	    birdFrameNum = 0,
	    snowHead = new Image(),
	    snowBody = new Image(),
	    snowRump = new Image(),
	    currentBanner,
	    confirmedKills = 0,
	    groundline = new Image(),
	    daygroundline = new Image(),
	    finalBannerDown = false,
	    BChead = new Image(),
	    gameOn = false,
	    sunIsHigh = false,
	    firstBallFired = false,
	    renderingTooltip = false,
	    globalMouseX = 0,
	    globalMouseY = 0,
	    percent = 0,
	    katy_head = new Image(),
	    katy_body = new Image(),
	    katy_rump = new Image(),
	    afro_head = new Image(),
	    afro_body = new Image(),
	    afro_rump = new Image(),
	    monocle_head = new Image(),
	    monocle_body = new Image(),
	    shadow = new Image(),
	    head_shadow = new Image(),
	    melt_shadow = new Image(),
	    zombiehand,
	    zombiehandlowering = false,
	    bunnyadded = false,
	    canPlaySound = true,
	    soundtrackfunction = function(){},
	    bInt = 0,
	    bMoving = false,
	    bX = -20,
	    bY = 0,
	    animX = 0,
	    animY = 0,
	    bWait = false,
	    bWaitTime = 0,
	    bFocus = 300,
	    bScared = false,
	    bSurrounded = false,
	    bDead = false,
	    bButton = "right", //Direction var.
	    bOuttaHere = false,
	    bActive = true,
	    bBack = false,
	    bBuffer,
	    sinCounter = 40,
	    glowalphs = 0.1,
	    TO = false,
	    sunrayalpha = 0.2,
	    sunrayInc = 50,
	    raylineWidth = 30,
	    otherInc = 0,
	    sunOn = false,
	    sunsininc = 0,
	    flareAlpha = 0,
	    preloadedassets = 0,
	    dots = 10,
	    itemsImage = new Image(),
	    buildFace,
	    fadeThoseBastards = false,
	    fallingBox = null;


      makeSnowMan = makeSnowManFactory(snowballs, ["frank", "roger", "karl", "tony", "steve", "greg"])

	    birdleft.cropX = 0;
	    birdleft.cropY = 0;
	    birdright.cropX = 0;
	    birdright.cropY = 0;

	    function buildFaceMaker () {
	    	var bf = {},
	    	items = [ ],
	    	uicontainer = {},
	    	makeCircle,
	    	ghosts = [],
	    	draggingGhost = false,
	    	themouseX,
	    	themouseY,
	    	junks = [];

	    	uicontainer.img = itemsImage;
	    	uicontainer.width = 199;
	    	uicontainer.height = 466;
	    	uicontainer.x = 0;
	    	uicontainer.y = 0;
	    	uicontainer.alpha = 1;

	    	//fallingBox =

	    	makeCircle = function (x,y,img,rad,width,height,nm) {
	    		var cirkle = {};
	    		cirkle.x = uicontainer.x + x;
	    		cirkle.y = uicontainer.y + y;
	    		cirkle.offSetX = x;
	    		cirkle.offSetY = y;
	    		cirkle.img = new Image();
	    		cirkle.img.src = img;
	    		cirkle.rad = rad;
	    		cirkle.width = width;
	    		cirkle.height = height;
	    		cirkle.name = nm;
	    		cirkle.alpha = 1;
	    		return cirkle;
	    	};

	    	ghostMaker = function (idem) {
	    		var boo = idem;
	    		return boo;
	    	};

	    	bf.destroyInterface = function () {
	    		var j = 0, junkie;
	    		for(j = 0; j < items.length; j += 1) {
	    			junkie = makeSnowball(items[j].x + items[j].rad, items[j].y + items[j].rad, items[j].rad, true);
	    			//junkie.isJunk = true;
	    			junkie.name = items[j].name;
	    			junkie.imgSize = items[j].rad * 2;
	    			junkie.isJunk = true;
	    			snowballs.push(junkie);
	    		}
	    		fallingBox = FallingBox(uicontainer.x,uicontainer.y,uicontainer.width,uicontainer.height, uicontainer.img);
	    		fallingBox.system.dimensions(canvaswidth, canvasheight * 0.8)
	    		items = [];
	    	};

	    	dropGhosts = function () {
	    		var b = 0,
	    		junkie;
	    		for(b = 0; b < ghosts.length; b += 1) {
	    			//junks.push(ghosts[b]);
	    			junkie = makeSnowball(themouseX, themouseY, ghosts[b].rad, true);
	    			//junkie.isJunk = true;
	    			junkie.name = ghosts[b].name;
	    			junkie.imgSize = ghosts[b].rad * 2;
	    			junkie.isJunk = true;
	    			snowballs.push(junkie);
	    		}

	    		ghosts = [];
	    		//junkie = makeSnowball(ghosts.x)
	    		draggingGhost = false;
	    	};

	    	bf.changeSize = function () {
	    		uicontainer.x = canvaswidth * 0.1;
	    		uicontainer.y = canvaswidth * 0.1;
	    		for(i = 0; i < items.length; i+= 1) {
	    			items[i].x = items[i].offSetX  + uicontainer.x ;
	    			items[i].y = items[i].offSetY  + uicontainer.y ;
	    		}
	    	};

	    	multiverse.eventlistener('mousemove', lenscanvas, function (e) {
	    		var e = e || window.event;

	    		themouseY = (e.pageY || e.touches[0].pageX);
	    		themouseX = (e.pageX || e.touches[0].pageY);
	    	});

	    	multiverse.eventlistener('mousedown', lenscanvas, function (e) {
	    		var e = e || window.event, distX, distY, i, item, dist;

	    		if(draggingGhost === false) {

		    		for(i = 0; i < items.length; i += 1) {
		    			item = items[i];

		    			distX = (e.pageX || e.touches[0].pageX) - (item.x + (item.width *0.5));
		    			distY = (e.pageY || e.touches[0].pageY) - (item.y + (item.height *0.5));

		    			dist = Math.sqrt(distX * distX + distY * distY);

		    			if(dist < item.rad) {

		    					ghosts.push(ghostMaker(item));
		    					draggingGhost = true;
		    					items.splice(i,1);
		    			}
		    		}
	    		} else {
	    			//dropGhosts();
	    		}
	    	});

	    	multiverse.eventlistener('mouseup', lenscanvas, function (e) {

	    			if(draggingGhost) {
	    				dropGhosts();
	    			}
	    	});

	    	bf.render = function () {
	    		var i = 0;

	    		if(fallingBox !== null) {
	    			fallingBox.fade();
	    			fallingBox.system.update();
	    			fallingBox.render(context);
	    		} else {
	    			context.save();
	    			context.drawImage(uicontainer.img, uicontainer.x, uicontainer.y);
	    			context.restore();
	    		}
	    		//fallingBox.render(context);

	    		for(i = 0; i < items.length; i+= 1) {
	    			context.save();
	    			context.drawImage(items[i].img, items[i].x, items[i].y );

	    			//context.drawImage(bunnyLeft, animX, animY, 100, 100, bitwise(bX), bitwise(bGround), 100, 100);
	    			context.restore();
	    		}

	    		if(draggingGhost) {
	    			for(i = 0 ; i < ghosts.length; i += 1) {
	    				context.save();
	    				context.globalAlpha = 0.7;
	    				context.drawImage(ghosts[i].img, themouseX - (ghosts[i].width * 0.5), themouseY - (ghosts[i].height * 0.5));
	    				context.restore();
	    			}
	    		}
	    	};


	    	items.push(makeCircle(12,72,'images/scarf.png',60, 141,114, "scarf"));
	    	items.push(makeCircle(50,192,'images/brace.png',47, 95,94, "bracelet"));
	    	items.push(makeCircle(40,318,'images/trapper.png',50, 109,94, "trapper"));

	    	bf.changeSize();

	    	return bf;
	    }




	junks = {
		scarf : {
			name: 'scarf',
			img : (function () { var img = new Image(); img.src = 'images/scarf.png'; return img; }())
		},
		bracelet : {
			name : 'bracelet',
			img : (function () { var img = new Image(); img.src = 'images/brace.png'; return img; }())
		},
		trapper : {
			img : 'trapper',
			img : (function () { var img = new Image(); img.src = 'images/trapper.png'; return img; }())
		}
	};

	zombies = {
		frank : {
			name : "frank",
			img : frank,
			leftimg : frank_l
		},
		greg : {
			name: "greg",
			img: greg,
			leftimg : greg_l
		},
		karl : {
			name: "karl",
			img : karl,
			leftimg : karl_l
		},
		steve: {
			name: "steve",
			img: steve,
			leftimg : steve_l
		},
		tony : {
			name: "tony",
			img: tony,
			leftimg : tony_l
		},
		roger : {
			name: "roger",
			img : roger,
			leftimg : roger_l
		}
	};

	// armPoints = [ { x: 0, y: 10 },
	// 	      { x: 2, y: 4 },
	// 	      { x: 25, y: 0 },
	// 	      { x: 40, y: 4 },
	// 	      { x: 45, y: 8 },
	// 	      { x: 47, y: 9 },
	// 	      { x: 47, y: 8 },
	// 	      { x: 50, y: 6 },
	// 	      { x: 53, y: 7 },
	// 	      { x: 58, y: 3 },
	// 	      { x: 61, y: 2 },
	// 	      { x: 61, y: 3 },
	// 	      { x: 66, y: 7 },
	// 	      { x: 67, y: 6 },
	// 	      { x: 70, y: 7 },
	// 	      { x: 70, y: 8 },
	// 	      { x: 75, y: 6 },
	// 	      { x: 78, y: 7 },
	// 	      { x: 81, y: 7 },
	// 	      { x: 79, y: 8 },
	// 	      { x: 75, y: 7 },
	// 	      { x: 70, y: 11 },
	// 	      { x: 66, y: 10 },
	// 	      { x: 60, y: 6 },
	// 	      { x: 57, y:  6 },
	// 	      { x: 52, y: 10 },
	// 	      { x: 52, y: 12 },
	// 	      { x: 58, y: 16 },
	// 	      { x: 59, y: 16 },
	// 	      { x: 62, y: 19 },
	// 	      { x: 62, y: 21 },
	// 	      { x: 66, y: 30 },
	// 	      { x: 68, y: 33 },
	// 	      { x: 73, y: 34 },
	// 	      { x: 79, y: 39 },
	// 	      { x: 81, y: 40 },
	// 	      { x: 85, y: 44 },
	// 	      { x: 83, y: 42 },
	// 	      { x: 78, y: 42 },
	// 	      { x: 76, y: 39 },
	// 	      { x: 70, y: 35 },
	// 	      { x: 66, y: 35 },
	// 	      { x: 63, y: 32 },
	// 	      { x: 63, y: 29 },
	// 	      { x: 55, y: 18 },
	// 	      { x: 50, y: 15 },
	// 	      { x: 46, y: 15 },
	// 	      { x: 41, y: 10 },
	// 	      { x: 32, y: 5 },
	// 	      { x: 28, y: 6 },
	// 	      { x: 24, y: 4 },
	// 	      { x: 19, y: 6 },
	// 	      { x: 6, y: 7 },
	// 	      { x: 3, y: 11 },
	// 	      { x: 0, y: 10}
	// ];

	function loadEverything() {
		loadManager(snowHead, 'images/snow_head.png');
		loadManager(snowBody, 'images/snow_body.png');
		loadManager(snowRump, 'images/snow_rump.png');
		loadManager( snowmanModelOne, 'images/model_one.png');
		loadManager( snowmanModelTwo, 'images/model_two.png');
		loadManager( snowmanModelThree, 'images/model_three.png');
		loadManager( snowmanModelFour, 'images/model_four.png');
		loadManager( skytile, 'images/bluesky_texture.jpg');
		loadManager( snowtile, 'images/snow_texture.jpg');
		loadManager( mountains, 'images/mountain_range.png');
		loadManager( tree, 'images/day_tree_1.png');
		loadManager( tree2, 'images/day_tree_2.png');
		loadManager( banner,  'images/1.png');
		loadManager( banner2, 'images/2.png' );
		loadManager( banner3, 'images/3.png');
		loadManager( roger, 'images/roger-head.png');
		loadManager( roger_l, 'images/roger-head-l.png');
		loadManager( tony, 'images/tony-head.png');
		loadManager( tony_l, 'images/tony-head-l.png');
		loadManager( greg, 'images/greg-head.png');
		loadManager( greg_l, 'images/greg-head-l.png');
		loadManager( frank, 'images/frank-head.png');
		loadManager( frank_l, 'images/frank-head-l.png');
		loadManager( karl, 'images/karl-head.png');
		loadManager( karl_l, 'images/karl-head-l.png');
		loadManager( steve, 'images/steve-head.png');
		loadManager( steve_l, 'images/steve-head-l.png');
		loadManager( cloud1,  'images/cloud_1.png');
		loadManager( bunnyLeft, 'images/bunnyLeft.png');
		loadManager( bunnyRight, 'images/bunnyRight.png');
		loadManager( bunnyCower, 'images/bunnyCower.png');
		loadManager( midriff_ted, 'images/zombie_midriff_ted.png');
		loadManager( theSun , 'images/sun.png' );
		loadManager( base_marty, 'images/base_marty.png' );
		loadManager( moon, 'images/moon.png');

		loadManager( nightsnow, 'images/night_snow.jpg');

		loadManager( birdright, 'images/birdFlyRight.png' );
		loadManager( groundline, 'images/ground_line.png');
		loadManager( daygroundline, 'images/day_groundline.png' );
		loadManager( bunnyDive, 'images/bunnyDive.png');
		loadManager( bunnyUp, 'images/bunnyUp.png');
		loadManager( BChead , 'images/body_count_head.png');

		loadManager( katy_body, 'images/tiny_katy_body.png' );
		loadManager( katy_head, 'images/tiny_katy_head.png' );
		loadManager( katy_rump, 'images/tiny_katy_rump.png' );
		loadManager( afro_body, 'images/tiny_afro_body.png' );
		loadManager( afro_head, 'images/tiny_afro_head.png' );
		loadManager( afro_rump, 'images/tiny_afro_rump.png' );
		loadManager( monocle_body, 'images/tiny_monocle_body.png' );
		loadManager( monocle_head, 'images/tiny_monocle_head.png ');

		loadManager( itemsImage, 'images/items.png');

	}


	function preloadManager (img, src) {
		img.src = src;
		multiverse.eventlistener('load', img, preloadHandler);
	}


	function preloadHandler (e) {
		preloadedassets += 1;
		if( preloadedassets === 2 ) {
			canvas = document.getElementById('canvas');
			context = canvas.getContext('2d');
			backgroundcanvas = document.getElementById('bg');
			backgroundcontext = backgroundcanvas.getContext('2d');
			canvaswidth = bitwise(window.innerWidth - 1);
			canvasheight = bitwise(window.innerHeight - 1);
			canvas.width = canvaswidth;
			canvas.height = canvasheight;
			backgroundcanvas.width = canvaswidth;
			backgroundcanvas.height = canvasheight;
			loadEverything();
		}

		if( e.currentTarget.nodeName === 'IMG' ) {
			makeDisplayObject(e.currentTarget);
		}
	}

	function loadManager( img , src ) {
		totalAssets += 1;
		img.src = src;
		multiverse.eventlistener('load', img, loadHandler);
	}

	function loadHandler (e) {
		//var percent;
		assetsLoaded += 1;
		percent = assetsLoaded / totalAssets;
		if( assetsLoaded === totalAssets ) {
			allSystemsGo();
		}
		if( e.currentTarget.nodeName === 'IMG' ) {
			makeDisplayObject(e.currentTarget);
		}
		renderPreload(percent);

	}

	function initTrees () {
		var  h = tree.height;

		makeTree(0.1,  h * 0.74, 1, tree2);
		makeTree(0.3,  h * 0.5,  0.6, tree2);
		makeTree(0.17,  h * 0.6, 1, tree2);
		makeTree(0.7, h * 0.5, 0.7, tree );
		makeTree(0.78,  h * 0.5, 1, tree2 );

		makeForegroundTree(0.04,  h * 0.74, 1, tree);
		makeForegroundTree(0.86,  h * 0.7, 1, tree2);
		makeForegroundTree(0.81, h * 0.53, 1, tree);
	}

	function makeTree (xr,yo,scale,img) {
		var tree = {};
		tree.xratio = xr;
		tree.yoffset = yo;
		tree.scale = scale;
		tree.img = img;
		trees.push( tree );
	}

	function makeForegroundTree(xr,yo,scale,img ) {
		var tree = {};
		tree.xratio = xr;
		tree.yoffset = yo;
		tree.scale = scale;
		tree.img = img;
		foregroundtrees.push( tree );
	}



	function allSystemsGo () {
		//set up canvas references
		skycanvas = document.getElementById('sky');
		skycontext = skycanvas.getContext('2d');
		suncanvas = document.getElementById('sun');
		suncontext = suncanvas.getContext('2d');

		foregroundcanvas = document.getElementById('fg');
		foregroundcontext = foregroundcanvas.getContext('2d');
		starcanvas = document.getElementById('stars');
		starcontext = starcanvas.getContext('2d');
		mooncanvas = document.getElementById('moon');
		mooncontext = mooncanvas.getContext('2d');
		treecanvas = document.getElementById('trees');
		treecontext = treecanvas.getContext('2d');
		bgmencanvas = document.getElementById('bgmen');
		bgmencontext = bgmencanvas.getContext('2d');
		flyingheadcanvas = document.getElementById('flyingheads');
		flyingheadcontext = flyingheadcanvas.getContext('2d');
		foregroundtreecanvas = document.getElementById('foregroundtrees');
		foregroundtreecontext = foregroundtreecanvas.getContext('2d');
		shadowcanvas = document.getElementById('shadows');
		shadowcontext = shadowcanvas.getContext('2d');
		bgmenshadowcanvas = document.getElementById('bgmenshadows');
		bgmenshadowcontext = bgmenshadowcanvas.getContext('2d');
		lenscanvas = document.getElementById('lenscanvas');
		lenscontext = lenscanvas.getContext('2d');
		initTrees();
		//set background render function
		currentBGRenderFunction = renderBackground;
		//callresize function to set up size of everything and drawbackground
		//resizeHandler({});
		buildFace = buildFaceMaker();
		resizeHeavyLifting();
		//addEventListeners
		multiverse.eventlistener('resize', window, resizeHandler);
		multiverse.eventlistener('mousedown', lenscanvas, mouseDownRelay);
		multiverse.eventlistener('mousemove', lenscanvas, mouseMoveRelay);
		multiverse.eventlistener('mouseup', document, mouseUpRelay);
		multiverse.eventlistener('touchstart', lenscanvas, mouseDownRelay);
		multiverse.eventlistener('touchmove', lenscanvas, mouseMoveRelay);
		multiverse.eventlistener('touchend', document, mouseUpRelay);

		addSnowModels( snowmanModelOne);
		addSnowModels( snowmanModelTwo);
		addSnowModels( snowmanModelThree);
		addSnowModels( snowmanModelFour );

		currentBanner = banner;
		setUpBanner();
		makeStars();
		initTrees();



		switchGameState( GAME_STATE_INTRO );
		setInterval( rungame, 1000/30 );
	}


	function starthappymusic (e) {
		soundtrackfunction = happyLoop;
		happymusic.addEventListener("ended", soundtrackfunction, false);
		happymusic.play();
	}

	function startscarymusic () {
		happymusic.pause();
		soundtrackfunction = scaryloop;
		scarymusic.addEventListener("ended", soundtrackfunction, false);
		scarymusic.play();
	}

	function happyLoop () {
		happymusic.play();
	}

	function scaryloop () {
		scarymusic.play();
	}

	function makeStars () {
		var b = 0, star;
		for ( b = 0; b < 400; b+= 1) {
			star = {
				x : Math.random() * canvaswidth,
				y : bitwise(Math.random() * (canvaswidth * 0.4)),
				radius : Math.random() * 3,
				alpha : Math.random(),
				twinklecounter : Math.random()
			};
			stars.push( star );
		}
	}

	function addSnowModels (mo) {
		var model = mo;
		makeDisplayObject( model );
		model.place( canvaswidth * 0.5 + 100, model.centerY(), 0);
		snowmanModels.push( model);
		if( snowmanModels.length === 4) {
			snowModelLoop();
			modelLoopTimer = setInterval( snowModelLoop, 3000);
		}
	}

	function addArms (x, y) {
		var left = {}, right = {};
		left.left = -1;
		left.x = x - 20;
		left.y = y;
		left.rotation = 200;
		right.left = 1;
		right.x = x + 20;
		right.y = y;
		right.rotation = 0;
		left.rv = -32 + Math.random() * 10;
		right.rv = 32 + Math.random() * 10;
		left.dx =  - Math.random() * 20;//Math.random() * 100;
		left.dy =  -60 + Math.random() * 20;//Math.random() * 100;
		right.dx =   Math.random() * 20;//Math.random() * 100;
		right.dy =  -60 + Math.random() * 20;//Math.random() * 100;
		left.alpha = 1;
		right.alpha = 1;
		severedarms.push(left,right);
	}

	function switchGameState( newState ) {
		var currentGameState = newState;
		switch ( currentGameState ) {
			case  GAME_STATE_INTRO  :
			setUpIntro();
			currentGameStateFunction = runIntro;
			currentMouseDownHandler = mauzDownIntro;
			currentMouseMoveHandler = mauzMoveIntro;
			currentMouseUpHandler = mauzUpIntro;
			currentBGRenderFunction = renderBackground;
			break;
			case GAME_STATE_SNOWMAN_BUILDER :
			clearInterval( modelLoopTimer);//= setInterval( snowModelLoop, 3000);
			currentGameStateFunction = runSnowmanBuilder;
			currentMouseDownHandler = mauzDownBuilder;
			currentMouseMoveHandler = mauzMoveBuilder;
			currentMouseUpHandler = mauzUpBuilder;
			break;
			case GAME_STATE_DARK_TRANSITION :
			currentGameStateFunction = runDarkTransition;
			break;
			case GAME_STATE_ZOMBIE_GAME :
			currentGameStateFunction  = runZombieGame;
			currentMouseDownHandler = mauzDownGamePlay;
			currentMouseMoveHandler = mauzMoveGamePlay;
			currentMouseUpHandler = mauzUpGamePlay;
			currentBGRenderFunction = renderNightBackground;
			renderForeground();
			gameOn = true;

			setTimeout( bringFinalBanner, 45000);
			break;
			case GAME_STATE_BUNNIE_DIES :
			currentGameStateFunction = runBunnieDies;
			break;
			case GAME_STATE_CONGRATS :
			currentGameStateFunction = runCongrats;
			break;
		}
	}

	function snowModelLoop () {
		//update the old current snowmodel before wiping him from the
		//current variable
		if( currentSnowModel ) { oldSnowModel = currentSnowModel; }
		//update currentSnowModel to next snowman in array
		currentSnowModel = snowmanModels[snowModelCounter];
		currentSnowModel.place( canvaswidth * 0.5 + 10, currentSnowModel.centerY() + 120, 0);
		currentSnowModel.setTarget( currentSnowModel.centerX()  , currentSnowModel.centerY() + 120 );
		currentSnowModel.setAlpha(1);
		if( oldSnowModel) {
			oldSnowModel.setTarget( currentSnowModel.centerX() - 100, currentSnowModel.centerY()+ 120 );
			oldSnowModel.setAlpha(0);
		}
		if(snowModelCounter < snowmanModels.length - 1) {
			snowModelCounter += 1;
		} else {
			snowModelCounter = 0;
		}
	}

	function rungame() {
		context.clearRect(0,0,canvaswidth,canvasheight);
		if( typeof currentGameStateFunction === 'function') {
			currentGameStateFunction();
		}
		//frameCounter.countFrames();
		//multiverse.debug.log('FPS: ' + frameCounter.lastFrameCount );
		//multiverse.debug.log('particles: ' + particles.length);
	}

	function renderPreload (perc) {
		var ptext =  (perc * 100).toFixed(0) + '%', pattern;
		pattern = context.createPattern(nightsky, 'repeat');
		context.save();
		context.fillStyle = pattern;
		context.fillRect(0,0,canvaswidth,canvasheight);
		context.fillStyle = 'rgb(168,183,196)';
		context.font = 'bold 20px Arial';
		context.shadowOffsetX = 2;
		context.shadowOffsetY = 2;
		context.shadowBlur = 1;
		context.shadowColor = '#333';
		context.fillText(ptext, canvaswidth * 0.5, canvasheight * 0.5);
		context.restore();
	}

	function runIntro () {
		var s = 0;
		//updates
		//objects modified with
		//the 'makeDisplayObject function'
		//have their own update functions built in
		for( s = 0; s < snowmanModels.length; s += 1) {
			snowmanModels[s].update();
		}

		updatebirds();
		banner.update();
		//renders
		renderSun();
		renderSnowModels();
		renderBanner();
		renderbirds();


	}

	function transitionOne () {
		var s1, s2, s3;
		setBgMen();
		s1 = makeSnowball( canvaswidth * 0.5 + 140, canvasheight - 50, 100, true);
		s2 = makeSnowball( canvaswidth * 0.5 + -50, canvasheight - 35, 80, true);
		s3 = makeSnowball( canvaswidth * 0.5 - 210, canvasheight - 30, 60, true);
		s1.alpha = 0;
		s2.alpha = 0;
		s3.alpha = 0;
		s1.isFader = true;
		s2.isFader = true;
		s3.isFader = true;
		snowballs.push(s1);
		setTimeout( function() { snowballs.push(s2); }, 600 );
		setTimeout( function() { snowballs.push(s3); }, 1200 );
		nightsky.place(0,0,0);
		nightsnow.place(0,0,0);
		sunIsHigh = true;
		theSun.risenAt( 270 );
		theSun.onComplete( function()
				  {
					theSun.risenAt(390);
					transitionTwo();

				  } );
		currentBanner = banner2;
		bringInstructionBanner();
		soundtrackfunction = happyLoop;
		happymusic.addEventListener("ended", soundtrackfunction, false);
		happymusic.play();
		switchGameState( GAME_STATE_SNOWMAN_BUILDER );
	}

	function transitionTwo () {
		activateBgMen();
		theSun.onComplete( startDarkTransition );
		setUpZombieHand();
		startscarymusic();
		buildFace.destroyInterface();
		fadeThoseBastards = true;
	}

	function startDarkTransition () {
		bunnyadded = true;
		sunIsHigh = false;
		renderStars();
		nightsky.setAlpha(1);
		nightsnow.setAlpha(1);
		moon.setRotes(210);
		moon.risenAt(300);
		moon.onComplete( startZombieGame );
		switchGameState( GAME_STATE_DARK_TRANSITION );
		//buildFace.destroyInterface();
		//fallingBox = FallingBox()
	}

	function runSnowmanBuilder () {
		updateFaders();
		updateSnowmen();
		theSun.rise( canvaswidth * 0.6, canvasheight * 0.6, 1);
		updateParticles();

		banner2.update();
		updatebirds();

		renderBGMen();
		buildFace.render();
		renderSnowmen(); //this function renders all snowballs
		renderParticles();
		renderSun();
		renderBanner();



		renderbirds();
		if(sunIsHigh) {
			radiationVibes();
		}

		if (bunnyadded === true ) {
			bunnyMove();
			bunnyDraw();
		}
	}

	function runDarkTransition () {
		//updates
		//theSun.rise( canvaswidth * .6, canvasheight * .6, .5);
		theSun.rise( canvaswidth * 0.6, canvasheight * 0.6, 1);
		updateFaders();
		updateSnowmen();
		moon.rise( canvaswidth * 0.6, canvasheight * 0.6, 1);

		//moon.ease();
		nightsky.ease();
		nightsnow.ease();
		updateParticles();
		bunnyMove();
		//renders
		renderBGMen();
		buildFace.render();
		renderSnowmen(); //this function renders all snowballs
		renderParticles();
		renderNightSky();
		renderMoon();
		renderSun();
		bunnyDraw();

	}

	function startZombieGame() {
		var s = 0;
		for(s = 0; s < snowballs.length; s += 1){
			snowballs[s].drag = false;
		}
		makeExplosion( zombiehand.offSetX + 4, ground - 23, 90);
		zombiehand.onComplete( function () {
				setTimeout( function() {
					zombiehandlowering = true;
					zombiehand.setTarget( zombiehand.offSetX, ground + 110 );
					setTimeout( function()
						   {
							activesnowmen += makeSnowMan( zombiehand.offSetX , canvasheight + 200, false, snowballs);
						 }, 2200 );
				}, 800);

			} );
		switchGameState( GAME_STATE_ZOMBIE_GAME );
	}

	function runZombieGame () {
		//updates
		updateSnowmen();
		updateParticles();
		createZombies();
		bunnyMove();
		fadeoutdeadheads();
		updateSeveredArms();
		if(zombiehandlowering === false) {
			zombiehand.fastease();
		} else {
			zombiehand.ease();
		}
		//renders
		buildFace.render();
		renderSnowmen(); //this function renders all snowballs
		renderBGMen();
		renderSuperBalls(); //this function renders only the charging of the snowball (when it is being pulled back)
		renderLightningBolt();
		bunnyDraw();
		renderParticles();
		renderBodyCount();

		renderZombieHand();
		if( finalBannerDown ) {
			banner3.update();
			updatebirds();
			renderBanner();
			renderbirds();
		}

		if( renderingTooltip === true ) {
			rendertooltip(globalMouseX, globalMouseY);
		}



	}

	function makeDisplayObject (obj, offX, offY, targX, targY) {

		var offSetX = offX || 0,
			offSetY = offY || 0,
			targetX = targX || 0,
			targetY = targY || 0,
			dx = 0,
			dy = 0,
			alpha = 1,
			targetAlpha = 1,
			cb,
			called = false,
			rts = 160,
			completeRotes;

		obj.update = function () {
			var distA, distX, distY, alphaVelocity;
			distA = (targetAlpha - obj.alpha);
			alphaVelocity = distA * 0.4;
			distX = targetX - obj.offSetX;
			accelX = distX * 0.02;
			distY = targetY - obj.offSetY;
			accelY = distY * 0.02;
			dx += accelX;
			dy += accelY;
			dx *= 0.9;
			dy *= 0.9;
			obj.offSetX += dx;
			obj.offSetY += dy;
			obj.alpha += alphaVelocity;
			if(typeof cb === 'function'){
				if( Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 ){
					if( called === false) {
						called = true;
						cb();
					}

				}
			}
		};

		obj.ease = function () {
			var distA, distX, distY, alphaVelocity;
			distA = (targetAlpha - obj.alpha);
			alphaVelocity = distA * 0.0009;
			distX = targetX - obj.offSetX;
			distY = targetY - obj.offSetY;
			dx = distX * 0.03;
			dy = distY * 0.03;
			dx *= 0.9;
			dy *= 0.9;
			obj.offSetX += dx;
			obj.offSetY += dy;
			obj.alpha += alphaVelocity;
			if(typeof cb === 'function'){
				if( Math.abs(distX) < 1 && Math.abs(distY) < 1 ){
					if( called === false) {
						called = true;
						cb();
					}

				}
			}
		};

		obj.fastease = function () {
			var distA, distX, distY, alphaVelocity;
			distA = (targetAlpha - obj.alpha);
			alphaVelocity = distA * 0.0005;
			distX = targetX - obj.offSetX;
			distY = targetY - obj.offSetY;
			dx = distX * 0.3;
			dy = distY * 0.3;
			dx *= 0.9;
			dy *= 0.9;
			obj.offSetX += dx;
			obj.offSetY += dy;
			obj.alpha += alphaVelocity;

			if(typeof cb === 'function'){
				if( Math.abs(distX) < 1 && Math.abs(distY) < 1 ){
					if( called === false) {
						called = true;
						cb();
					}

				}
			}
		};

		obj.setRotes = function (rs) {
			rts = rs;
		};

		obj.risenAt = function (r) {
			completeRotes = r;
		};

		obj.rotation = function () {
			return rts;
		};

		obj.rise = function (centerX, centerY, speed) {
			var posX, posY;
			posX = centerX + Math.cos( radians( rts )) * 340;
			posY = centerY + Math.sin( radians( rts )) * 340;
			obj.offSetX = posX;
			obj.offSetY = posY;
			if( rts < completeRotes ) {
				rts += speed;
			}

			if(typeof cb === 'function'){
				if( rts >= completeRotes -1 ){
					if( called === false) {
						called = true;
						cb();
					}

				}
			}
		};

		obj.offSetX = offSetX;
		obj.offSetY = offSetY;
		obj.alpha = alpha;

		obj.setTarget = function(x, y) {
			targetX = x;
			targetY = y;
		};

		obj.place = function(x, y, a) {
			targetX = x;
			obj.offSetX = x;
			targetY = y;
			obj.offSetY = y;
			targetAlpha = a;
			obj.alpha = a;
		};

		obj.setAlpha = function(a) {
			targetAlpha = a;
		};

		obj.centerX = function () {
			return (canvaswidth * 0.5) - (this.width * 0.5);
		};

		obj.centerY = function () {
			return (canvasheight * 0.5) - (this.height * 0.5);
		};

		obj.onComplete = function (cback) {
			called = false;
			cb = cback;
		};
	}

	function setUpIntro () {
		setUpBanner();
		setUpSun();
		moon.place( 500, canvaswidth * 0.8 );
	}

	function setUpBanner (e) {
		var offSetX = (canvaswidth * 0.5) - (banner.width * 0.5),
			offSetY = -100,
			targetX = offSetX,
			targetY = (banner.height * 0.5) - 12;
		//makeDisplayObject(banner, offSetX, offSetY, targetX, targetY);
		banner.place( offSetX, offSetY);
		banner.setTarget( targetX, targetY );
	}

	function setUpSun () {
		theSun.place( bitwise( canvaswidth * 0.6), bitwise(canvasheight * 0.9));
	}

	function bringInstructionBanner () {
		var offSetX = (canvaswidth * 0.5) - (banner.width * 0.5),
			offSetY = -100,
			targetX = offSetX,
			targetY = (banner.height * 0.5) - 40;
		//makeDisplayObject(banner, offSetX, offSetY, targetX, targetY);
		banner2.place( offSetX, offSetY);
		banner2.setTarget( targetX, targetY );
		banner2.onComplete( function () { setTimeout( function(){ banner2.setTarget(banner2.offSetX, - 400 ); }, 2200 ); } );

	}

	function bringFinalBanner () {
		finalBannerDown = true;
		currentBanner = banner3;
		banner3.place( banner3.centerX(), -300 );
		banner3.setTarget( banner3.offSetX , banner.height * 0.5 - 40 );
		banner3.onComplete( waitToGetRidofFinalBanner );
	}

	function waitToGetRidofFinalBanner () {
		setTimeout( function()
			   {
				banner3.setTarget( banner3.centerX(), - 300 );
				banner3.onComplete( function () { finalBannerDown = false; });
			   }, 20000);
	}

	function makeExplosion (x, y, sv) {
		var i = 0, p, velo = Math.abs( Math.round(sv) );
		for( i = 0; i < velo * 2 + 3; i += 1) {
			p = {};
			p.x = x;
			p.y = y;
			p.dx = Math.random() * (velo ) -velo*0.5;
			p.dy = Math.random() * (velo ) -velo*0.5;
			p.rad = Math.random() * 3;
			particles.push(p);
		}
	}

	function makeSuperBall (sX,sY) {
		var p = {};
		p.startX = sX;
		p.startY = sY;
		p.endX = sX;
		p.endY = sY;
		currentsuperball = p;
	}

	function fireSuperBall(ball) {
		var sb,
		distX = ball.endX - ball.startX,
		distY = ball.endY - ball.startY,
		maxVelocity = 200,
		currentVelocity = Math.sqrt((distX * distX) + (distY * distY) );
		if( canPlaySound === true ) {
			wooshSound.play();
		}
		if( currentVelocity > maxVelocity) {
			distX = (distX / currentVelocity) * maxVelocity;
			distY = (distY / currentVelocity ) * maxVelocity;
		}
		sb = makeSnowball(ball.endX, ball.endY, 9, true);
		sb.dx = distX * -0.6;
		sb.dy = distY * -0.6;
		sb.mass = 36;
		//sb.corpsehead = false;
		sb.rotationVelocity = 2;
		sb.deathCounter = 0;
		sb.canMakeSound = true;
		//Efe, for tracking of snowballs laterrr.
		sb.shouldBlur = true;
		sb.lastX = sb.x;
		sb.lastY = sb.y;
		sb.isInArray = true;
		snowballs.push(sb);
		firedBalls.push(sb);
	}

	function blizzardAttack () {
		var b = 0, bal;
		for( b = 0 ; b < 2048 ; b += 1) {
			bal = {};
			bal.startX = Math.random() * canvaswidth - (canvaswidth * 0.5);
			bal.startY =  0;
			bal.endX = bal.startX - Math.random() * 200;
			bal.endY = bal.startY - Math.random() * 200;
			/*setTimeout( function () {*/ fireSuperBall(bal); /*} , b ); */
		}
	}


	///***** BG MEN ************* BG MEN * ********************** BG MEN ******************* *//
	function activateBgMen() {
		for( k = 0 ; k < bgBalls.length; k += 1) {
			bgBalls[k].active = true;
			bgBalls[k].rotationVelocity = Math.random() * 8 - 4;
		}
	}

	function setBgMen() {
		makeTinyKaty();
		makeTinyMonocle();
		makeTinyAfro();

	}

	function makeTinyKaty ()  {
		var head, body, rump;
		rump = makeSnowball(canvaswidth * 0.7 , ground - 90, 50, false );
		body = makeSnowball(canvaswidth * 0.7 , ground - 140, 20, false );
		head = makeSnowball(canvaswidth * 0.7  + Math.random() * 8 - 4, ground - 170, 10,  false );
		rump.name = 'katy';
		body.name = 'katy';
		head.name = 'katy';
		rump.alpha = 0;
		body.alpha = 0;
		head.alpha = 0;
		rump.imgSize = rump.radius * 2;
		body.imgSize = body.radius * 4;
		head.imgSize = head.radius * 8;
		rump.bgRump = true;
		body.bgBody = true;
		head.bgHead = true;
		//head.bottom = true;
		bgBalls.push( rump );
		bgBalls.push( body );
		bgBalls.push( head );

	}

	function makeTinyMonocle () {
		var head, body, rump;
		rump = makeSnowball(canvaswidth * 0.7 - 70 , ground - 90, 50, false );
		body = makeSnowball(canvaswidth * 0.7 - 70 + Math.random() * 12 - 6, ground - 120, 20, false );
		head = makeSnowball(canvaswidth * 0.7  - 70 + Math.random() * 4 - 2, ground - 168 , 10,  false );
		rump.name = 'monocle';
		body.name = 'monocle';
		head.name = 'monocle';
		head.rotation = 5;
		rump.imgSize = rump.radius * 2;
		body.imgSize = body.radius * 4;
		head.imgSize = head.radius * 8;
		rump.alpha = 0;
		body.alpha = 0;
		head.alpha = 0;
		rump.bgRump = true;
		body.bgBody = true;
		head.bgHead = true;
		//head.bottom = true;
		setTimeout( function (){
			bgBalls.push( rump );
			bgBalls.push( body );
			bgBalls.push( head );
			}, 400 );
	}

	function makeTinyAfro () {
		var head, body, rump;
		rump = makeSnowball(canvaswidth * 0.7 + 70 , ground - 90, 50, false );
		body = makeSnowball(canvaswidth * 0.7 + 70, ground - 120, 20, false );
		head = makeSnowball(canvaswidth * 0.7 + 70 + Math.random() * 8 - 4, ground - 160, 10,  false );
		rump.name = 'afro';
		body.name = 'afro';
		head.name = 'afro';
		rump.imgSize = rump.radius * 2;
		body.imgSize = body.radius * 4;
		head.imgSize = head.radius * 8;
		rump.bgRump = true;
		body.bgBody = true;
		head.bgHead = true;
		rump.alpha = 0;
		body.alpha = 0;
		head.alpha = 0;
		//head.bottom = true;
		setTimeout( function () {
			bgBalls.push( rump );
			bgBalls.push( body );
			bgBalls.push( head );
		}, 600 );

	}

	function setUpZombieHand () {
		var ofX, ofY;
		ofX = canvaswidth * 0.5 + 100;
		ofY = ground + 100;
		zombiehand = {};
		makeDisplayObject(zombiehand, ofX, ofY, ofX, ground + 10);
		//zombiehand.targetY = 100;
		zombiehand.rotation = 240;
	}

	function updateFaders () {
		var b,
		fdr = {};

		//if(fadeThoseBastards !== true) { return; }
		for(b = snowballs.length-1; b >= 0 ; b-=1) {

			if(snowballs[b].isFader) {
				fdr = snowballs[b];

				if(fadeThoseBastards === false) {
					if(fdr.alpha < 1 && !fdr.isJunk) { fdr.alpha += 0.04; }
				} else {

					//fdr = snowballs[b];
					fdr.alpha -= 0.008;
					//console.log(fdr.alpha);
					if(fdr.alpha < 0) {
						fdr.alpha = 0;
						snowballs.splice(b, 1);
					}
				}


			}
		}
	}

	function updateSnowmen () {
		var totalsnowmen = 0, f = 0, b = 0, h = 1, snowball, snowball2, rotes, chainposX, chainposY, bg, k, bg2, q, bunnyDist, w, fh, fBall;
		 wavecounter += 0.5;
		//EFE
		//For updating array of thrown snowballs only,
		//And storing their current + last position.
		for (f = 0; f < firedBalls.length; f +=1) {
			fBall = firedBalls[f];

			fBall.lastX = fBall.x;
			fBall.lastY = fBall.y;
			fBall.lifeCounter += 1 ;
			if (fBall.lifeCounter > 60) {
				firedBalls.splice(b, 1);
				b = b - 1;
			} else if (fBall.isInArray !== true) {
				firedBalls.splice(b, 1);
				b = b - 1;
			}
		}

		for( k = bgBalls.length - 1; k >= 0; k -= 1 ){
			bg = bgBalls[k];
			if(bg.imgSize > 3) { bg.imgSize -= 0.04; }
			if(bg.radius > 3 ) { bg.radius -= 0.06; }
			if(bg.bottom !== true ) { bg.y += 0.01; }
			if(bg.active === true) {
				//bg.alpha -= 0.002;
				bg.alpha -= 0.01;

				if( bg.bottom !== true) {
					bg.dy += gravity *0.2;
				}
				bg.y += bg.dy ;
				bg.dx *= 0.84 ;
				bg.x += bg.dx;
				bg.rotation += bg.rotationVelocity;
				if(bg.y > ground - bg.radius - 70) {
					bg.y = ground - (bg.radius * 0.5) - 70;
					bg.dy *= -0.5 ;
					bg.dx *= 0.5;
					bg.rotationVelocity *= -0.6;
				} else {
					for ( q = k - 1; q >= 0 ; q -= 1) {
						bg2 = bgBalls[q];
						/*if( billiardCollision (bg, bg2, q) ) {
							//break;
						}*/
					}
				}
				if (bg.alpha <= 0.001) {
					bgBalls.splice(k, 1);
				}

			} else {
				if( bg.alpha < 1) {
					bg.alpha += 0.1;
				}
			}
		}

		firstballs: for(b = snowballs.length-1; b >= 0 ; b-=1) {
		//firstballs: for (b = 0; b < snowballs.length; b += 1) {
			snowball = snowballs[b];
			if(typeof snowball !== 'object') continue

			//if(snowball.alpha < 1 && !snowball.isJunk) { snowball.alpha += 0.04; }
			if(snowball.drag === false) {
				if( snowball.active) {
					snowball.dy += gravity;
					snowball.y += snowball.dy;
					snowball.dx *= 0.97 ;
					snowball.x += snowball.dx;
					snowball.rotation += snowball.rotationVelocity;

					if( Math.sqrt( (snowball.dx * snowball.dx) + (snowball.dy * snowball.dy) ) < 4 ) {
						snowball.lifeCounter += 1;
					} else {
						snowball.lifeCounter = 0;
					}
					if( snowball.lifeCounter > 10 ) {
						if( snowball.radius > 2 ) {
							snowball.radius -= 0.1;
							if(snowball.corpsehead === false && snowball.isJunk !== true) {
								snowball.imgSize -= 0.1;
							}
							snowball.rotationVelocity = 0;
						} else {
							if(!snowball.isJunk) {
								snowballs.splice( b, 1);
								if(snowball.corpsehead === true) {
									deadheads.push( snowball );
								}
							}

						}
					}

					if(snowball.isJunk) {
						snowball.alpha -= 0.006;
						if(snowball.alpha < 0) {
							snowball.alpha = 0;
							snowballs.splice(b, 1);
						}
					}


					if(snowball.y > ground - snowball.radius) {
						snowball.y = ground - snowball.radius;
						snowball.dy *= -0.5 ;
						snowball.dx *= 0.5;
						snowball.rotationVelocity *= -0.6;
						if(snowball.canMakeSound === true ) {
							//snowball.radius += 1;
							snowball.isInArray = false;
							//snowballs.splice(b, 1);
						}
					}

					if( snowball.x - snowball.radius > canvaswidth ) {
						snowballs.splice(b, 1);
					} else if ( snowball.x + snowball.radius < 0 ) {
						snowballs.splice(b, 1);
					}

					if( snowball.untouchable === false ) {
						secondballs: for ( h = b - 1; h >= 0 ; h -= 1) {
							snowball2 = snowballs[h];
							if(snowball2.untouchable === false) {
								billiardCollision (snowball, snowball2, h, b, particles, gameOn, handleBilliardCollision);
							}
						}
					}

					if( snowball.corpsehead === true ) {
						if (snowball.y < -80 ) {
							snowballs.splice(b, 1);
							snowball.y = -300;
							snowball.imgSize *= 0.7;
							flyingheads.push( snowball );
							//break;

						}
					}
					snowball.has_shadow = true;
				} else {
					if( snowball.bg === false) {
						//SNOWBALLS THAT ARE INACTIVE ARE HANDLED HERE
						if( ground - snowball.offsetY > ground - snowball.targetY ) {
							snowball.offsetY  += 3;
							snowball.y = ground - snowball.offsetY;
							snowball.x += Math.random() * 8 - 4;
							snowball.has_shadow = false;
						} else {
							bunnyDist = snowball.x - (bX + 60);
							if( bunnyDist > 1 ) { snowball.isLeft = false; } else {
								snowball.isLeft = true;
							}
							if(snowball.isLeft) {
								snowball.x +=  Math.abs(Math.sin( snowball.rNum)) * 1.2;
							} else {
								snowball.x -=  Math.abs(Math.sin( snowball.rNum)) * 1.2;
							}
							snowball.has_shadow = true;
						}

						snowball.y = ground - snowball.offsetY;

							if(snowball.brother1 !== null) {
								rotes = 270 + Math.sin( snowball.rNum ) * 22;
								chainposX = snowball.x + ( snowball.brother1.offsetY - snowball.offsetY ) * Math.cos( radians(rotes) );
								chainposY = snowball.y + ( snowball.brother1.offsetY - snowball.offsetY ) *  Math.sin( radians(rotes) );
								snowball.brother1.x  = chainposX + Math.random() * 2 - 1;
								snowball.brother1.y = chainposY + Math.random() * 2 - 1;
								snowball.brother1.rotation = 355 + Math.sin( snowball.rNum) * 18;
								snowball.rNum += 0.04;
							}
						if( snowball.x < -snowball.radius * 2) {
							snowballs.splice(b, 1);
						} else if ( snowball.x > canvaswidth + snowball.radius * 2 ) {
							snowballs.splice(b, 1);
						}
						totalsnowmen += 1;
					} else {
						snowball.imgSize -= 0.04;
					}
				} //close 'if inactive'
			}//close drag condition

			if( snowball.corpsehead === true  ) {
				if( snowball.active === true ) {
					if( snowball.wasundead === true ) {
						confirmedKills += 1;
						snowball.wasundead = false;
					}
				}
			}
		}//close snowballs loop

		for( w = flyingheads.length -1; w >= 0 ; w -= 1 ) {
			fh = flyingheads[w];
			fh.rotation += 53;
			fh.dy += 1;
			fh.y += 5;
			if( fh.y > canvasheight) {
				flyingheads.splice( w, 1 );
			}
		}

		//countsnowmen, see if lightning attack should be enabled
		totalsnowmen = Math.round( totalsnowmen / 3) ;
		activesnowmen = totalsnowmen;
		if( totalsnowmen > 4 ){
			blizzardAttackAvailable = true;
		} else {
			blizzardAttackAvailable = false;
		}
	}

	function updateSeveredArms () {
		var i, a;
		for( i = severedarms.length - 1; i >= 0; i -= 1 ) {
			a = severedarms[i];
			a.x += a.dx;
			a.y += a.dy;
			a.dx *= 0.9;
			a.dy += gravity * 2;
			a.rotation += a.rv;

			if( a.y > ground + 40) {
				a.y = ground + 40;
				a.dy *= -0.6;
				a.dx *= 0.1;
				a.rv *= -0.6;
			}

			if( a.dy < 1 && a.dx < 1 ) {
				a.dy = 0;
				a.dx = 0;
				a.alpha -= 0.02;
			}

			if( a.alpha <= 0 ) {
				severedarms.splice(i,1);
			}
		}
	}

	function updateParticles () {
		var j, p;
		for(j = particles.length -1; j >= 0; j -= 1 ) {
			p = particles[j];
			p.x += p.dx;
			p.dy += gravity * 0.2;
			p.y += p.dy;
			if( p.y > canvasheight) {
				particles.splice(j, 1);
			}

			if(p.x < 0) {
				particles.splice(j, 1);
			}
			if(p.x > canvaswidth ) {
				particles.splice(j, 1);
			}
		}
	}

	function fadeoutdeadheads () {
		//update dead heads
		var d = 0, dh;
		for (d = deadheads.length-1; d >= 0; d -= 1) {
			dh  = deadheads[d];
			dh.y = ground - dh.radius;
			//if(dh.alpha > 0.4 ) {
			dh.alpha -= 0.001; //}
			if(dh.alpha < 0){
				deadheads.splice(d, 1);
			}
		}
	}

	function createZombies () {
		var risePos;
		if(activesnowmen < 8 ) {
			if( bX > 0 && bX < canvaswidth ) {
				if(newZombieCounter > zombiebuffer) {
					if( leftOne ) {
						leftOne = false;
						risePos = bX + (200 + Math.random() * 20);
						if ( risePos < canvaswidth - 20) {
							activesnowmen += makeSnowMan( risePos, canvasheight + 200, false, snowballs);
						}
						newZombieCounter = Math.floor(Math.random() * zombiebuffer);
					} else {
						leftOne = true;
						risePos = bX - (200 + Math.random() * 20);
						if( risePos > 20 ) {
							activesnowmen += makeSnowMan( risePos, canvasheight + 200, true, snowballs);
						}
						newZombieCounter = Math.floor(Math.random() * zombiebuffer );
					}
					if(zombiebuffer >= 145) {
						zombiebuffer -= 5;
					}
				}
			} else {
				if(newZombieCounter > zombiebuffer) {
					if( leftOne ) {
						leftOne = false;
						risePos = canvaswidth * 0.5 + (Math.random() * canvaswidth * 0.4);
						if ( risePos < canvaswidth - 20) {
							activesnowmen += makeSnowMan( risePos, canvasheight + 200, false, snowballs);
						}
						newZombieCounter = Math.floor(Math.random() * zombiebuffer);
					} else {
						leftOne = true;
						risePos = canvaswidth * 0.5 - (Math.random() * canvaswidth * 0.4);
						if( risePos > 20 ) {
							activesnowmen += makeSnowMan( risePos, canvasheight + 200, true, snowballs);
						}
						newZombieCounter = Math.floor(Math.random() * zombiebuffer );
					}
					if(zombiebuffer >= 145) {
						zombiebuffer -= 5;
					}
				}
			}
		}
		newZombieCounter+= 1;
	}

  function handleBilliardCollision (power, ball1, ball2, cp, h) {
    const absolutePower = Math.abs(power)
    if ( ball1.canMakeSound  ) {
      ball1.canMakeSound = false;
      if ( canPlaySound === true ) {
        smashSound.play();
        ball1.isInArray = false;
        //snowballs.splice(b, 1);
      }
    }

    if (particles.length < 1000) {
      if (absolutePower > 22){
        makeExplosion(cp.x, cp.y, power * 0.04 );
      }
    }

    if(ball2.hasarms === true) {
      ball2.hasarms = false;
      addArms( ball2.x, ball2.y);
    }

    if( gameOn ) {
      if( ball2.corpsehead === false && absolutePower > 2000 ){
        snowballs.splice(h, 1);
      }

      if(absolutePower > 1000 ) {
        firstBallFired = true;
      }
    }

  }

	function radians (deg) { return (deg * Math.PI) /180; }

	function updateMoon () {
		moon.place(bitwise( canvaswidth * 0.8), bitwise( canvasheight * 0.2 )) ;
	}

	function updateStars () {
		var b, s;
		for( b = 0 ; b < stars.length; b += 1) {
			s  = stars[b];
			s.x = bitwise (Math.random() * canvaswidth );
			s.y = bitwise( Math.random() * (canvasheight * 0.6) );
		}
	}

///BUNNY CODE ********** BUNNY CODE ******** BUNNY CODE ***********
	//BUNNY CODE ********** BUNNY CODE ******** BUNNY CODE ***********
	/////////////////// EFEHAN BUNNY STUFF.
	//Bunny Brain.
	function bunnyDecide() {

		var foundOne = false, enemyLeft = false, enemyRight = false, bDist = 600, absDist = 0, newDist = 0,
			wallTrapped = false, realBx = bX + 50;

		if (bActive === true) {
			function go(direction) {
				bMoving = true;
				bButton = direction;
			}

			//Enemy checking behaviours
			if (bMoving === false) {

				//Iterate through snowballs.
				for (f=0; f<snowballs.length; f+=1) {

					//Only check inactive ones.
					if (snowballs[f].active === false) {
						newDist = realBx - snowballs[f].x;
						absDist = Math.abs(newDist);
						if (absDist < bFocus && absDist < bDist) {
							bDist = absDist;
							foundOne = true;
							bScared = true;

							if (bOuttaHere === false) {

								if (newDist >= 0) {
									//console.log("Scared.")
									if (bX < canvaswidth - 120) {
										go("right");

									}
									else {
										wallTrapped = true;
										go("left");
										//console.log("And wall trapped.")

									}
									enemyLeft = true;

								}
								else if (newDist < 0 ) {
									//console.log("Scared.")

									if (bX > 60) {
											go("left");

									}
									else {
										wallTrapped = true;
										go("right");
										//console.log("And wall trapped.")
									}
									enemyRight = true;
								}
							}

							//End of the buunny.
							if (absDist < 60 && bOuttaHere === false) {
								bOuttaHere = true;
								bMoving = true;
								///console.log("DEAD");
							}
						}
						if (enemyRight === false || enemyLeft === false) {
							bSurrounded = false;
						}

					}
				}

				//Mark the bunny as surrounded.
				if (enemyLeft === true && enemyRight === true) {
					//console.log("Surrounded (enemies)");
					bSurrounded = true;
				}
			}

			if (foundOne === false) {
				bScared = false;
			}
			//On no other input:
			//decide to move.
			if (bMoving === false && bWait === false && bScared === false && bOuttaHere === false){
				if (bX <= 10 || (bX > 11 && bX < (canvaswidth / 2 - 30)) )  {
					go("right");
				}
				else if ( bX > canvaswidth - 5 || (bX < canvaswidth - 5 && bX > (canvaswidth /2 - 30)) ) {
					go("left");
				}
			}


		}
		//Bunny gone.
		else if (bActive === false) {

			//Entry point, v.2
			//console.log ("Finding re-entry!")
			whereX = bX;
			bBuffer = canvaswidth / 6;

			while(absDist < 200) {
				whereX = bitwise( (Math.random() * (canvaswidth - bBuffer)) + bBuffer);
				absDist = Math.abs(whereX - bX);

			}

			bunnyReset();

			bActive = true;
			bOuttaHere = false;
			bBack = true;
			bWait = false;
			bSurrounded = false;
			bScared = false;
			bMoving = true;

			bX = whereX;

		}

	}

	//Animation cycle and sprite x-movement.
	function bunnyMove() {
		bunnyDecide();
		if (bActive === true) {

			bY = ground - 85;

			//THINK BUNNY THINK!!!!!!!
			//Animation cycle
			if (bMoving === true) {

				//if (bBack == false) {
				//Animation, for both Left + Right
				animX = animX + 100;
				bInt +=1;

				if ( animX >= 500) {
					animX = 0;
					animY = animY + 100;
				}
				if (bBack === true) {
					if (bInt === 4) {
						makeExplosion(bX + 60, bY + 80, 15);

					}
					if (bInt > 13) {
						bBack = false;
						bunnyReset();
					}
				}

				if (bOuttaHere === false) {
					if (bInt === 18) {
						bunnyReset();
					}
				}
				if (bOuttaHere === true) {
					if (bInt === 6) {
						makeExplosion(bX + 60, bY + 80, 15);
					}
					if (bInt >= 14) {
						bActive = false;
					}
				}

				if (bSurrounded === true && bInt === 17) {
					bunnyReset();
				}

				//Sprite movement.
				if (bSurrounded === false && bBack === false && bOuttaHere === false) {

					switch (bButton) {
						case "left":
						if (bInt > 2 && bInt < 10) {bX -= 8;}
						break;
						case "right":
						if (bInt > 2 && bInt < 10) {bX += 8;}
						break;
					}
				}

			}

			/*else if( bMoving == false && bBack == false && bSurrounded == false) {
				//bunnyReset();  //Keep bunny unanimated.
			}*/

		}

	}

	//Animation reset/static.
	function bunnyReset() {
		bInt = 0;
		animX = 0;
		animY = 0;
		bMoving = false;
	}

	function bunnyDraw() {
		if (bActive === true) {
			var bGround = ground-85;

			//Draw the running bunny
			if (bSurrounded === false && bOuttaHere === false && bBack === false) {
				if (bButton === "left") {
					context.drawImage(bunnyLeft, animX, animY, 100, 100, bitwise(bX), bitwise(bGround), 100, 100);
				}
				else if (bButton === "right") {
					context.drawImage(bunnyRight, animX, animY, 100, 100, bitwise(bX), bitwise(bGround), 100, 100);
				}
			}

			//Draw the cowering bunny.
			if (bSurrounded === true && bBack === false) {
				if (bOuttaHere === true) {
					context.drawImage(bunnyDive, animX, animY, 100, 100, bitwise(bX), bitwise(bGround), 100, 100);

				}
				else if (bOuttaHere === false) {
					context.drawImage(bunnyCower, animX, animY, 100, 100, bitwise(bX), bitwise(bGround), 100, 100);
				}
			}

			else if (bBack === true && bSurrounded === false) {
				context.drawImage(bunnyUp, animX, animY, 100, 100, bitwise(bX), bitwise(bGround), 100, 100);

			}
		}
	}

	function renderBackground () {
		var skypattern,
			snowpattern,
			mountainheight,
			mountainsize,
			overlap,
			horizon;
		horizon = canvasheight * 0.6;
		point1 = canvasheight * 0.1;

		skypattern = context.createPattern(skytile, 'repeat');
		skycontext.fillStyle = skypattern;
		skycontext.fillRect(0,0,canvaswidth, horizon);
		if(mountains.height + point1 < horizon) {
			mountainheight = horizon - mountains.height;
		} else {
			mountainheight = point1;
		}
		if(point1 + mountains.height > horizon) {
			overlap =  (point1 + mountains.height) - horizon;
			mountainsize = bitwise(mountains.height - (overlap-2) );
		} else {
			mountainsize = bitwise(mountains.height);
		}
		backgroundcontext.drawImage( mountains,
							0,
							0,
							bitwise(mountains.width),
							mountainsize,
							bitwise(canvaswidth * 0.5 - mountains.width * 0.5),
							bitwise(mountainheight),
							bitwise(mountains.width),
							mountainsize );
		snowpattern = context.createPattern(snowtile, 'repeat');
		backgroundcontext.fillStyle = snowpattern;
		backgroundcontext.fillRect( 0, bitwise(horizon), canvaswidth, bitwise(canvasheight *0.4) );

		renderTrees();
	}

	function renderNightBackground () {
		var skypattern,
			snowpattern,
			mountainheight,
			mountainsize,
			overlap,
			horizon = canvasheight * 0.6;

		skycontext.clearRect( 0,0, canvaswidth, canvasheight );
		skypattern = context.createPattern(nightsky, 'repeat');
		skycontext.fillStyle = skypattern;
		skycontext.fillRect(0,0,canvaswidth,horizon);
		if(mountains.height + canvasheight * 0.1 < horizon) {
			mountainheight = canvasheight * 0.6 - mountains.height;
		} else {
			mountainheight = canvasheight * 0.1;
		}
		if(canvasheight * 0.1 + mountains.height > horizon) {
			overlap =  (canvasheight * 0.1 + mountains.height) - horizon;
			mountainsize = bitwise(mountains.height - overlap);
		} else {
			mountainsize = bitwise(mountains.height);
		}
		backgroundcontext.clearRect(0,0, canvaswidth, canvasheight );
		backgroundcontext.drawImage( mountains,
							0,
							0,
							bitwise(mountains.width),
							mountainsize,
							bitwise(canvaswidth * 0.5 - mountains.width * 0.5),
							bitwise(mountainheight),
							bitwise(mountains.width),
							mountainsize );
		snowpattern = context.createPattern(nightsnow, 'repeat');
		backgroundcontext.fillStyle = snowpattern;
		backgroundcontext.fillRect( 0, bitwise(horizon), canvaswidth, bitwise(canvasheight *0.4) );

		updateMoon();
		renderTrees();
		renderMoon();
		renderStars();
		renderForeground();
	}

	function renderNightSky() {
		var nightPattern, nightsnowPattern, horizon = canvasheight * 0.6;
		nightPattern = skycontext.createPattern(nightsky, 'repeat');
		skycontext.globalAlpha = nightsky.alpha;
		skycontext.fillStyle = nightPattern;
		skycontext.fillRect(0, 0,  canvaswidth, bitwise(horizon) );
		skycontext.globalAlpha = 1;

		nightsnowPattern = foregroundcontext.createPattern( nightsnow, 'repeat' );
		backgroundcontext.fillStyle = nightsnowPattern;
		backgroundcontext.globalAlpha = nightsnow.alpha;
		backgroundcontext.fillRect(0, horizon, canvaswidth, canvasheight * 0.4);
		backgroundcontext.globalAlpha = 1;
	}

	function renderTrees () {
		var i, t, fi, ft, horizon = canvasheight * 0.6;
		treecontext.clearRect(0,0, canvaswidth, canvasheight );
		foregroundtreecontext.clearRect(0,0,canvaswidth, canvasheight);
		for( i = 0; i < trees.length; i += 1) {
			t = trees[i];
			treecontext.drawImage(t.img, canvaswidth * t.xratio, horizon - t.yoffset, tree.width * t.scale, tree.height * t.scale );
		}

		for( fi = 0; fi < foregroundtrees.length; fi += 1 ) {
			ft = foregroundtrees[fi];
			foregroundtreecontext.drawImage( ft.img, canvaswidth * ft.xratio, ground - ft.yoffset , tree.width * ft.scale, tree.height * ft.scale);
		}
	}

	function renderForeground () {
		var snowpattern, groundlinepattern;
		snowpattern = foregroundcontext.createPattern(nightsnow, 'repeat');
		foregroundcontext.fillStyle = snowpattern;
		foregroundcontext.fillRect(0,canvasheight*0.82 + 23, canvaswidth, canvasheight *0.18 - 23);

		foregroundcontext.save();
		foregroundcontext.setTransform(1,0,0,1,0,0);
		foregroundcontext.translate( 0, canvasheight * 0.82);
		groundlinepatten = foregroundcontext.createPattern(groundline, 'repeat-x');
		foregroundcontext.fillStyle = groundlinepatten;
		foregroundcontext.fillRect(0 , 0 ,canvaswidth, 24);
		foregroundcontext.restore();
		//foregroundcontext.fillRect(0, canvasheight * 7 - 24, canvaswidth, 24);
	}

	function renderSun () {
		suncontext.clearRect( 0, 0, canvaswidth, canvasheight );
		suncontext.drawImage( theSun, theSun.offSetX - 40, theSun.offSetY - 40);
	}

	function renderMoon () {
		var centerX, centerY;
		centerX = moon.offSetX ;
		centerY = moon.offSetY ;
		mooncontext.clearRect( 0,0, canvaswidth, canvasheight);
		mooncontext.drawImage( moon, bitwise( moon.offSetX - moon.width * 0.5) , bitwise(moon.offSetY  - moon.width * 0.5) );
	}

	function radiationVibes () {
		if( theSun.rotation() < 270 && theSun.rotation() > 200) {
				flareAlpha += 0.006;
		} else if (theSun.rotation() > 270 && theSun.rotation() < 340) {
			if(flareAlpha > 0) {
				flareAlpha -= 0.006;
			}
		}

		lenscontext.clearRect(0,0,canvaswidth, canvasheight );
		lenscontext.fillStyle = 'rgba( 255,253,203,' + flareAlpha + ')';
		lenscontext.fillRect(0, 0, canvaswidth, canvasheight );
	}

	function renderStars () {
		var l = 0, s = {};
		starcontext.clearRect( 0, 0,bitwise(canvaswidth), bitwise(canvasheight));
		for( l = 0; l < stars.length; l += 1){
			s = stars[l];
			starcontext. fillStyle = '#fff';
			starcontext.globalAlpha = s.alpha;
			starcontext.beginPath();
			starcontext.arc( s.x, s.y, s.radius , 0 , Math.PI * 2, false);
			starcontext.fill();
		}
		starcontext.globalAlpha = 1;
	}

	function renderBanner () {
		context.save();
		context.setTransform(1,0,0,1,0,0 );
		context.translate( currentBanner.centerX() , currentBanner.offSetY );
		context.globalAlpha = currentBanner.alpha;
		context.drawImage(currentBanner, 0 , 0, banner.width , banner.height );
		context.restore();
		context.globalAlpha = 1;
	}

	function renderBuildButton () {
		context.save();
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.translate( buildButton.centerX() , canvasheight - buildButton.offSetY );
		context.drawImage(buildButton, 0 , 0, buildButton.width , buildButton.height );
		context.restore();
	}

	function renderSnowModels () {
		var m, mod;
		for (m = 0; m < snowmanModels.length; m+= 1) {
			mod = snowmanModels[m];
			context.globalAlpha = mod.alpha;
			context.drawImage(mod, mod.offSetX, mod.offSetY );
			context.globalAlpha = 1;
		}
	}

	function renderBGMen () {
		var bgBall, img;
		bgmencontext.clearRect( 0,0, canvaswidth, canvasheight);
		bgmenshadowcontext.clearRect( 0,ground-80, canvaswidth, 90 );
		for (b = 0; b < bgBalls.length ; b += 1 ) {

			bgBall = bgBalls[b];
			if(bgBall.name === 'katy') {
				if(bgBall.bgHead === true) {
					img = katy_head;
				} else if (bgBall.bgBody === true ) {
					img = katy_body;
				} else if (bgBall.bgRump === true ) {
					img = katy_rump;
				}
			} else if(bgBall.name === 'monocle') {
				if( bgBall.bgHead === true ) {
					img = monocle_head;
				} else if (bgBall.bgBody === true ){
					img = monocle_body;
				} else if (bgBall.bgRump === true ) {
					img = afro_rump;
				}
			} else if (bgBall.name === 'afro') {
				if (bgBall.bgHead === true ) {
					img = afro_head;
				} else if ( bgBall.bgBody === true) {
					img = afro_body;
				} else if ( bgBall.bgRump === true ) {
					img = afro_rump;
				}
			}

			bgmencontext.save();
			bgmencontext.setTransform(1,0,0,1,0,0);
			bgmencontext.globalAlpha = bgBall.alpha;
			bgmencontext.translate(bgBall.x, bgBall.y);
			bgmencontext.rotate(radians( bgBall.rotation ));
			bgmencontext.drawImage(img, -bitwise(bgBall.imgSize * 0.5), -bitwise(bgBall.imgSize *0.5), bitwise(bgBall.imgSize), bitwise(bgBall.imgSize) );
			bgmencontext.restore();
			bgmencontext.alpha =1;

			bgmenshadowcontext.save();
			bgmenshadowcontext.translate( bgBall.x, ground - 44);
			bgmenshadowcontext.scale(4,1);
			bgmenshadowcontext.beginPath();
			bgmenshadowcontext.fillStyle = 'rgba(50,50,50,.2)';
			bgmenshadowcontext.arc(0,0,bgBall.radius * 0.2, 0, 2 * Math.PI, false);
			bgmenshadowcontext.fill();
			bgmenshadowcontext.restore();
		}
	}



	function renderSnowmen () {
		var d = 0,
		deadball, f = 0,
		snowball,
		headImage,
		deadHeadImage,
		b,
		bgBall,
		halfSize = 0,
		r,
		fh,
		fhImage,
		am,
		k,
		neg_quart = 0,
		half_head = 0,
		half_deadhead = 0,
		shadowheight = 0;



		flyingheadcontext.clearRect(0, 0, canvaswidth, canvasheight *0.6 );
		shadowcontext.clearRect( 0, ground - 50, canvaswidth, 100 );

		flyingheadcontext.globalAlpha = 0.6;

		for( r = 0; r < flyingheads.length; r += 1 ) {
			fh = flyingheads[r];
			flyingheadcontext.save();
			flyingheadcontext.setTransform(1,0,0,1,0,0);
			flyingheadcontext.translate( fh.x, fh.y);
			flyingheadcontext.rotate( radians(fh.rotation) );
			fhImage = zombies[fh.name].img;
			neg_quart =  bitwise(-fh.imgSize * 0.25);
			half_head =  bitwise(fh.imgSize * 0.5);
			flyingheadcontext.drawImage(fhImage, neg_quart , neg_quart, half_head, half_head );
			flyingheadcontext.restore();
		}

		for(f = 0; f < snowballs.length; f += 1) {
			snowball = snowballs[f];
			if( snowball.corpsehead === true) {
				halfSize = bitwise(-snowball.imgSize *0.5);
				if( snowball.has_shadow === true) {
					shadowcontext.save();
					shadowcontext.translate( snowball.x, ground);
					shadowcontext.scale(4,1);
					shadowcontext.beginPath();
					shadowcontext.fillStyle = 'rgba(50,50,50,.2)';
					shadowcontext.arc(0,0,snowball.radius * 0.2, 0, 2 * Math.PI, false);
					shadowcontext.fill();
					shadowcontext.restore();
				}
				//context.fillStyle = '#fff';
				context.save();
				context.setTransform(1,0,0,1,0,0 );
				context.translate( snowball.x, snowball.y );
				context.rotate (radians( snowball.rotation ));
				if(snowball.isLeft) {
					headImage = zombies[snowball.name].leftimg;
					context.drawImage(headImage, halfSize , halfSize, bitwise(snowball.imgSize), bitwise(snowball.imgSize) );
				} else {
					headImage = zombies[snowball.name].img;
					context.drawImage(headImage, halfSize , halfSize, bitwise(snowball.imgSize), bitwise(snowball.imgSize) );
				}
				context.restore();
			 } else if (snowball.corpsebody === true ) {
				if( snowball.has_shadow === true) {
					shadowcontext.save();
					shadowcontext.translate( snowball.x, ground);
					shadowcontext.scale(4,1);
					shadowcontext.beginPath();
					shadowcontext.fillStyle = 'rgba(50,50,50,.2)';
					shadowcontext.arc(0,0,snowball.radius * 0.2, 0, 2 * Math.PI, false);
					shadowcontext.fill();
					shadowcontext.restore();
				}
				context.save();
				context.setTransform(1,0,0,1,0,0 );
				context.translate( snowball.x, snowball.y );
				context.rotate (radians( snowball.rotation + 20 ));
				context.globalAlpha = snowball.alpha;
				context.drawImage(midriff_ted, -56 ,-49);
				context.translate( 40, -19);
				if(snowball.hasarms === true) {
					context.rotate ( radians(-30));
					context.translate( 40, 10);
					drawArm(1);
					context.rotate( radians( 30 ));
					context.translate( -154, 34 );
					drawArm(-1);
				}
				context.globalAlpha = 1;
				context.restore();
			 } else if (snowball.isJunk === true) {

			 	halfSize = bitwise(-snowball.imgSize *0.5);
				if( snowball.has_shadow === true) {
					shadowcontext.save();
					shadowcontext.translate( snowball.x, ground);
					shadowcontext.scale(4,1);
					shadowcontext.beginPath();
					shadowcontext.fillStyle = 'rgba(50,50,50,.2)';
					shadowcontext.arc(0,0,snowball.radius * 0.2, 0, 2 * Math.PI, false);
					shadowcontext.fill();
					shadowcontext.restore();
				}
				//context.fillStyle = '#fff';
				context.save();
				context.setTransform(1,0,0,1,0,0 );
				context.translate( snowball.x, snowball.y );
				context.globalAlpha = snowball.alpha;
				//console.log('junk alpha is ' + snowball.alpha);
				//context.rotate (radians( snowball.rotation ));

				headImage = junks[snowball.name].img;
				context.drawImage(headImage, halfSize , halfSize, bitwise(snowball.imgSize), bitwise(snowball.imgSize) );

				context.restore();

			 }else if (snowball.corpsebase === true ) {
				if( snowball.has_shadow === true ) {
					shadowcontext.save();
					shadowcontext.translate( snowball.x, ground);
					shadowcontext.scale(4,1);
					shadowcontext.beginPath();
					shadowcontext.fillStyle = 'rgba(50,50,50,.2)';
					shadowcontext.arc(0,0,snowball.radius * 0.2, 0, 2 * Math.PI, false);
					shadowcontext.fill();
					shadowcontext.restore();
				}
				context.save();
				context.setTransform(1,0,0,1,0,0);
				context.translate( snowball.x, snowball.y );
				context.globalAlpha = snowball.alpha;
				context.rotate( radians( snowball.rotation + 20 ));
				context.drawImage( base_marty, -snowball.radius, -snowball.radius );
				context.globalAlpha = 1;
			 }  else {

				if( snowball.radius < shadow.height) {
					shadowheight = snowball.radius;
				} else {
					shadowheight = shadow.height; }
					shadowcontext.save();
					shadowcontext.translate( snowball.x, ground);
					shadowcontext.scale(4,1);
					shadowcontext.beginPath();
					shadowcontext.fillStyle = 'rgba(50,50,50,.2)';
					shadowcontext.arc(0,0,snowball.radius * 0.2, 0, 2 * Math.PI, false);
					shadowcontext.fill();
					shadowcontext.restore();
				context.fillStyle = 'rgba( 255, 255, 255,' + snowball.alpha + ')';
				context.beginPath();
				context.arc(snowball.x, snowball.y, snowball.radius, 0, Math.PI * 2 , false );
				context.fill();
			}
			context.restore();
		}

		for ( d = 0; d < deadheads.length; d += 1) {
			deadball = deadheads[d];
			half_deadhead = bitwise(-deadball.imgSize * 0.5);
			context.save();
			context.setTransform(1,0,0,1,0,0 );
			context.translate( deadball.x, deadball.y );
			context.globalAlpha = deadball.alpha;
			context.rotate (radians( deadball.rotation ));
			if(deadball.isLeft) {
				deadHeadImage = zombies[deadball.name].leftimg;
				context.drawImage(deadHeadImage, half_deadhead , half_deadhead, bitwise(deadball.imgSize), bitwise(deadball.imgSize) );
			} else{
				deadHeadImage = zombies[deadball.name].img;
				context.drawImage(deadHeadImage, half_deadhead , half_deadhead, bitwise(deadball.imgSize), bitwise(deadball.imgSize) );
			}
			context.restore();
			context.globalAlpha = 1;
		}

		for( k = 0; k < severedarms.length; k += 1) {
			am = severedarms[k];
			context.save();
			context.setTransform(1,0,0,1,0,0);
			context.translate( am.x - 40, am.y - 20 );
			context.rotate( radians( am.rotation));
			context.globalAlpha = am.alpha;
			drawArm(am.left);
			context.globalAlpha = 1;
			context.restore();
		}

		//bunny shadow
		if( bActive === true && bunnyadded === true) {
			shadowcontext.save();
			shadowcontext.translate( bX+58, ground + 6);
			shadowcontext.scale(5,1);
			shadowcontext.beginPath();
			shadowcontext.fillStyle = 'rgba(50,50,50,.2)';
			shadowcontext.arc(0,0, 6, 0, 2 * Math.PI, false);
			shadowcontext.fill();
			shadowcontext.restore();
		}


	}

	function renderZombieHand () {
		context.save();
		context.setTransform(1,0,0,1,0,0);
		context.translate( zombiehand.offSetX, zombiehand.offSetY );
		context.rotate( radians(zombiehand.rotation) );
		drawArm(1);
		context.restore();
	}

	function drawArm (left) {
		var i = 0, p = {}, offX = 40, offY = 20;
		context.fillStyle = "#928c83";
		context.beginPath();
		context.moveTo( -40 , 10-20 );
		offY *= left;
		for ( i = 0; i < armPoints.length; i+= 1) {
			p = armPoints[i];
			context.lineTo( (p.x -offX ) * left  , p.y-offY * left );
		}
		context.fill();
	}

	function renderSuperBalls () {
		var f, distX, distY, numPoints, totalDist, i=0, dotX, dotY, rote, dX, dY, strokeStyle;
		if ( superballCharging ) {
			distX = currentsuperball.endX - currentsuperball.startX;
			distY = currentsuperball.endY - currentsuperball.startY;

			//The portion divisions of the dotted.
			partX = distX / dots;
			partY = distY / dots;

			context.lineWidth = 9;

			//Set first drawing point.
			dX = currentsuperball.startX;
			dY = currentsuperball.startY;

			for (d=1; d <= dots; d +=1) {
				//Increasing alpha.
				strokeStyle = 'rgba(255,255,255,'+String((dots/d)/100*50)+')';
				context.strokeStyle = String(strokeStyle);

				context.beginPath();
				context.moveTo( dX, dY);
				context.lineTo( dX + (partX*0.6), dY + (partY*0.6) );
				context.stroke();

				//Saves the current drawing point
				dX = currentsuperball.startX + (partX*d);
				dY = currentsuperball.startY + (partY*d);
			}

			context.fillStyle = '#fff';
			context.beginPath();
			context.arc ( currentsuperball.endX, currentsuperball.endY, 9, 0 , Math.PI * 2, false);
			context.fill();
		}
		//Efe "broken man's" motion blur?
		for (f = 0; f < firedBalls.length; f+= 1) {
			//Blur
			context.strokeStyle = '#fff';
			context.lineWidth = 18;
			context.beginPath();
			context.moveTo(firedBalls[f].x, firedBalls[f].y);
			context.lineTo(firedBalls[f].lastX, firedBalls[f].lastY);
			context.stroke();

			//Last Ball (so the end of the streak isn't flat)
			context.fillStyle = '#fff';
			context.beginPath();
			context.arc(firedBalls[f].lastX, firedBalls[f].lastY, firedBalls[f].radius, 0, Math.PI * 2 , false );
			context.fill();
		}
	}

	function renderLightningBolt () {
		context.save();
		context.setTransform(1,0,0,1,0,0);
		context.translate( (canvaswidth * 0.5) - 20 , 0);
		if( blizzardAttackAvailable ) {
			context.fillStyle = '#fff';
			context.lineWidth = 1;
			context.moveTo(40,8);
			context.beginPath();
			context.lineTo(35,20);
			context.lineTo(45,20);
			context.lineTo(35,30);
			context.lineTo(45,30);
			context.lineTo(20,50);
			context.lineTo(30,35);
			context.lineTo(20,35);
			context.lineTo(30,25);
			context.lineTo(20,25);
			context.lineTo(40,8);
			context.fill();
		}
		context.restore();
	}

	function updatebirds () {
		var frameSize = 125, width = 125 * 4;

		birdleft.cropX += frameSize;
		if( birdFrameNum +1 > 15) {
			birdFrameNum = 0;
			birdleft.cropX = 0;
			birdleft.cropY = 0;
		} else if (birdleft.cropX + frameSize > width ){
			birdleft.cropX = 0;
			birdleft.cropY += frameSize;
		}
		birdFrameNum += 1;
	}

	function renderbirds ( ) {
		var blx, bly, brx, bry;
		blx =  currentBanner.centerX() + banner.width - 86;
		bly =  currentBanner.offSetY - 56;
		brx = currentBanner.centerX() - 40;
		bry = currentBanner.offSetY -54;
		context.drawImage( birdleft,  birdleft.cropX, birdleft.cropY, 125, 125 , blx, bly,  125, 125 );
		context.drawImage( birdright, birdleft.cropX, birdleft.cropY, 125, 125, brx, bry , 125, 125 );
	}

	function renderParticles () {
		var l, part;
  		for(l = 0 ; l < particles.length; l += 1) {
		    part = particles[l];
		    context.fillStyle = '#fff';
		    context.beginPath();
  		    context.arc( part.x, part.y , part.rad, 0, Math.PI * 2, false);
  		    context.fill();
  		}
  	}

	function renderBodyCount () {
		if( confirmedKills > 0) {
			context.font = 'bold 30px Arial';
			context.fillStyle = '#fff';
			context.drawImage( BChead , canvaswidth - 160, 10 );
			context.fillText("x " + confirmedKills, canvaswidth - 100, 50);
		}
	}

	function rendertooltip (x,y) {
		context.save();
		context.fillStyle = '#fff';
		context.font = 'bold 20px Arial';
		context.shadowOffsetX = 2;
		context.shadowOffsetY = 2;
		context.shadowBlur = 1;
		context.shadowColor = '#555';
		context.fillText("click and drag to sling snowballs", x + 20, y);
		//context.fillText("protect the bunnie from the zombies", x + 20, y + 20);
		context.restore();
	}

	function mouseDownRelay (e) {
		e = e || window.event;
		multiverse.cancelevent(e);
		currentMouseDownHandler(e);
	}

	function mouseMoveRelay (e) {
  		e = e || window.event;
		multiverse.cancelevent(e);
		currentMouseMoveHandler(e);
  	}
	function mouseUpRelay (e) {
		e = e || window.event;
		multiverse.cancelevent(e);
		currentMouseUpHandler(e);
  	}

	function mauzDownIntro (e) {
		var distX, distY, buttonX, buttonY, m = 0;
		//button distance/collision detection
		distX = (e.pageX || e.touches[0].pageX) - canvas.offsetLeft - (banner.centerX() + banner.width * 0.5);
		distY = (e.pageY || e.touches[0].pageY) - canvas.offsetTop - (banner.offSetY + banner.height * 0.5);
		if( Math.abs(distX ) < banner.width * 0.5 && Math.abs( distY ) < banner.height * 0.5 ) {
			banner.setTarget( banner.offSetX, -600);
			banner.setAlpha(0);
			setTimeout( transitionOne, 1400);
			clearTimeout (modelLoopTimer);
			for(m = 0; m < snowmanModels.length; m += 1) {
				 snowmanModels[m].setAlpha(0);
			}
		} else {
		    foregroundcanvas.style.cursor = 'default';
		}
	}

	function mauzDownBuilder (e) {
		var j = 0, snowball, distX, distY, dist;
		for(j = snowballs.length -1; j >= 0; j -= 1) {
			snowball = snowballs[j];
	 		distX = (e.pageX || e.touches[0].pageX) - canvas.offsetLeft - snowball.x;
			distY = (e.pageY || e.touches[0].pageY)- canvas.offsetTop - snowball.y;
			dist = Math.sqrt(distX * distX + distY * distY );
			if(dist < snowball.radius ) {
				if(snowball.untouchable === false ) {
					snowball.drag = true;
					snowball.mouseOffsetX = distX;
					snowball.mouseOffsetY = distY;
				}
			} else {
				snowball.drag = false;
			}
		}
	}

	function mauzDownGamePlay (e) {
		console.log(e.targetTouches)
		console.log(e.touches)
		var distX, distY, dist, bdistX, bdistY, j = 0, snowball = {}, startingDrag = false;

		for(j = snowballs.length -1; j >= 0; j -= 1) {
			snowball = snowballs[j];
	 		distX = (e.pageX || e.touches[0].pageX)  - canvas.offsetLeft - snowball.x;
			distY = (e.pageY || e.touches[0].pageY) - canvas.offsetTop - snowball.y;
			dist = Math.sqrt(distX * distX + distY * distY );
			if(dist < snowball.radius ) {
				if(snowball.corpsehead === true ) {
					snowball.active = true;
					snowball.drag = true;

					snowball.body1.brother1 = null;

					snowballs.splice(j, 1);
					snowballs.push( snowball );
					snowball.mouseOffsetX = distX;
					snowball.mouseOffsetY = distY;
					startingDrag = true;
					break;
				}
			} else {
				snowball.drag = false;
				startingDrag = false;
			}
		}

		if( blizzardAttackAvailable ) {
			distX = (e.pageX || e.touches[0].pageX) - canvas.offsetLeft - 33 -(canvaswidth *0.5 - 20);
			distY = (e.pageY || e.touches[0].pageY) - canvas.offsetTop - 29;
			dist = Math.sqrt( distX * distX + distY * distY);
			if( dist < 21 ) {
				blizzardAttack();
			}

		} else {

		}

		if( startingDrag === false ) {
			makeSuperBall((e.pageX || e.touches[0].pageX) - canvas.offsetLeft, (e.pageY || e.touches[0].pageY) - canvas.offsetTop);
			superballCharging = true;
		}
	}

	function mauzMoveIntro (e) {
		var distX, distY, buttonX, buttonY;
		//button distance/collision detection
		distX = (e.pageX || e.touches[0].pageX) - canvas.offsetLeft - (banner.centerX() + banner.width * 0.5);
		distY = (e.pageY || e.touches[0].pageY) - canvas.offsetTop - (banner.offSetY + banner.height * 0.5);
		if( Math.abs(distX ) < banner.width * 0.5 && Math.abs( distY ) < banner.height * 0.5 ) {
			lenscanvas.style.cursor = 'pointer';
		} else {
			lenscanvas.style.cursor = 'default';
		}
	}

	function mauzMoveBuilder (e) {
		var i = 0, snowball;
		for (i = snowballs.length-1 ; i >= 0; i -= 1) {
			snowball = snowballs[i];
			if(snowball.drag === true) {
				snowball.oldX = snowball.x;
				snowball.oldY = snowball.y;
				snowball.x = (e.pageX || e.touches[0].pageX) - canvas.offsetLeft - snowball.mouseOffsetX;
				snowball.y = (e.pageY || e.touches[0].pageY) - canvas.offsetTop - snowball.mouseOffsetY;
				snowball.dx = snowball.x - snowball.oldX;
				snowball.dy = snowball.y - snowball.oldY;
			}
		}
		lenscanvas.style.cursor = 'default';
	}

	function mauzMoveGamePlay (e) {
		var mouseX, mouseY, i= 0, snowball;

		globalMouseX = (e.pageX || e.touches[0].pageX) - canvas.offsetLeft;
		globalMouseY = (e.pageY || e.touches[0].pageY) - canvas.offsetTop;

		for (i = snowballs.length-1 ; i >= 0; i -= 1) {
			snowball = snowballs[i];
			if(snowball.drag === true) {
				snowball.oldX = snowball.x;
				snowball.oldY = snowball.y;
				snowball.x =(e.pageX || e.touches[0].pageX)- canvas.offsetLeft - snowball.mouseOffsetX;
				snowball.y = (e.pageY || e.touches[0].pageY)- canvas.offsetTop - snowball.mouseOffsetY;
				snowball.dx = snowball.x - snowball.oldX;
				snowball.dy = snowball.y - snowball.oldY;
			}
		}

		if( superballCharging === true ) {
			currentsuperball.endX = (e.pageX || e.touches[0].pageX)  - canvas.offsetLeft;
			currentsuperball.endY = (e.pageY || e.touches[0].pageY) - canvas.offsetTop;
		}

		if( firstBallFired === false ) {
			renderingTooltip = true;
		} else {
			renderingTooltip = false;
		}
	}

	function mauzUpIntro (e) {}

	function mauzUpBuilder (e) {
		var g = 0, sball;
		for(g = 0; g < snowballs.length; g += 1) {
			sball = snowballs[g];
			sball.drag = false;
		}
	}

	function mauzUpGamePlay (e) {
		var g = 0, sball;
		for(g = 0; g < snowballs.length; g += 1) {
			sball = snowballs[g];
			if(sball.drag === true ) {
				sball.dx *= 4;
				sball.dy *= 4;
			}
			sball.drag = false;
		}

		if(superballCharging === true) {
			superballCharging = false;
			fireSuperBall(currentsuperball);
		}
	}

	function FrameRateCounter () {
		this.lastFrameCount = 0;
		var dateTemp = new Date();
		this.frameLast = dateTemp.getTime();
		delete dateTemp;
		this.frameCtr = 0;
	}

	FrameRateCounter.prototype.countFrames = function () {
		var dateTemp = new Date();
		this.frameCtr += 1;
		if(dateTemp.getTime() >= this.frameLast+1000) {
			this.lastFrameCount = this.frameCtr;
			this.frameLast = dateTemp.getTime();
			this.frameCtr = 0;
		}
		delete dateTemp;
	};


	function resizeHandler (e) {
		if(TO !== false) {
			clearTimeout(TO);
		}
		TO = setTimeout( resizeHeavyLifting, 100 );
		e = e || window.event;
		multiverse.cancelevent(e);
	}

	function resizeHeavyLifting ()  {
		var uagent = navigator.userAgent.toLowerCase(), offsetHeight = 0, iPhone = false;
		if ( uagent.search("iphone") > -1) {
			if( window.innerHeight > window.innerWidth) {
				offsetHeight = 250;
			} else {
				offsetHeight = 50;
			}

			iPhone = true;

		}

		canvaswidth = bitwise(window.innerWidth - 1);
		canvasheight = bitwise(window.innerHeight - 1) + offsetHeight;
		canvas.height = canvasheight;
		canvas.width = canvaswidth;
		ground = bitwise(canvasheight - (canvasheight * 0.2) );
		backgroundcanvas.width = canvaswidth;
		backgroundcanvas.height = canvasheight;
		foregroundcanvas.width = canvaswidth;
		foregroundcanvas.height = canvasheight;
		skycanvas.width = canvaswidth;
		skycanvas.height = canvasheight;
		suncanvas.width = canvaswidth;
		suncanvas.height = canvasheight;
		starcanvas.width = canvaswidth;
		starcanvas.height = canvasheight;
		mooncanvas.width = canvaswidth;
		mooncanvas.height = canvasheight;
		treecanvas.width = canvaswidth;
		treecanvas.height = canvasheight;
		bgmencanvas.height = canvasheight;
		bgmencanvas.width = canvaswidth;
		flyingheadcanvas.width = canvaswidth;
		flyingheadcanvas.height = canvasheight;
		foregroundtreecanvas.width = canvaswidth;
		foregroundtreecanvas.height = canvasheight;
		shadowcanvas.width = canvaswidth;
		shadowcanvas.height = canvasheight;
		bgmenshadowcanvas.width = canvaswidth;
		bgmenshadowcanvas.height = canvasheight;
		lenscanvas.width = canvaswidth;
		lenscanvas.height = canvasheight;

		if(fallingBox !== null) {
			fallingBox.system.dimensions(canvaswidth, canvasheight * 0.9);
		}

		buildFace.changeSize();

		var andlink = document.getElementById('andrew');
		andlink.style.left = canvaswidth *0.5 - 60 +'px';
		updateStars();
		currentBGRenderFunction();

		if(iPhone === true) {
			/*if(document.height < window.outerHeight) {
				document.body.style.height = (window.outerHeight + 50) + 'px';
			}*/
			var sc_w = document.getElementById("sc_watermark");
			var gc_w = document.getElementById("gc_watermark");

			setTimeout( function()
				   {
					window.scrollTo(0,1);
					sc_w.style.bottom = '10px';
					gc_w.style.bottom = '7px';
				   }, 50 );
		}
	}

	function bitwise (x) {
		return (x + .5) | 0;
	}

	preloadManager( nightsky, 'images/night_sky.jpg');
	preloadManager( birdleft, 'images/birdFlyLeft.png' );
	//SOUND STUFF
	//document.body.appendChild(smashSound);
	smashSound.setAttribute('src', 'sounds/punch.wav' );
	wooshSound.setAttribute('src', 'sounds/woosh.wav' );

	happymusic.setAttribute('src', 'sounds/Happy.wav');
	scarymusic.setAttribute('src', 'sounds/Scary.wav');

};

multiverse.eventlistener('load', window, HolidayZombies.init);
