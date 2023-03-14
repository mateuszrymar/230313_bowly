import { cloneDeep, isEmpty, sum } from 'lodash-es';

/*
  This module calculates the results in a similar way to how a person would do it:
  DONE 1. We get the player data from index.ts.
  DONE 2. We take player's rolls array.
  DONE 3. We divide the array into frames. - needs to be unit tested.
  DONE 4. We check if all frames are valid.
  DONE 5. We take these frames, and process them into objects, that have following properties:
    - Array with 1 or 2 rolls in the given frame.
    - Number - frame no.;
    - Boolean isStrike;
    - Boolean isSpare;
    - Number of points that this frame got;
    This object should be created in a constructor and have following methods:
    - processFrame() - private method that is called upon construction,
      this method will fill all other properties;
    - checkIfStrike()
    - checkIfSpare()
    - calculatePoints()
  DONE 6. Now we have an array of objects.
  DONE 7. To get the point total, we map through frame points.
  8. We bundle all data together into an object that contains:
    - Player name
    - Player result
    - Frames with individual frame results.
    - Are results valid?
  9. We return data from previous step.
*/

interface PlayerRolls {
  name: string;
  rolls: number[];
};

interface FrameInt {
  frameId: number;
  rolls: number[];
  isStrike: boolean;
  isSpare: boolean;
  pointResult: number;
}

interface PlayerInt {
  name: string;
  result: number;
  frames: FrameInt[];
  isResultValid: boolean;
}

// 

export const isAnyFrameFilled = ( frames :number[][] ) => {
  const framesToCheck = cloneDeep( frames );

  if ( isEmpty( framesToCheck.flat() )) return false;
  else return true;
};

const isLastFrameOverLimit = ( lastFrame: number[] ) => {
  const frameToCheck = cloneDeep( lastFrame );
  let isOverLimit = false;

  if ((frameToCheck[0] !== undefined) && (frameToCheck[0] > 30)) {
    console.log( 'Wrong input: Frame #10 is over 30 points.');
    isOverLimit = true;
  } 

  return isOverLimit;
}

const isFrameOverLimit = ( regularFrames: number[] ) => {
  const frameSums = cloneDeep( regularFrames );
  let isOverLimit = false;

  frameSums.forEach(element => {
    if ( element > 10 ) {
      console.log('Wrong input: one of the frames #1-9 is over 10 points.');
      isOverLimit = true;      
    }
  });

  return isOverLimit;
}

export const isAnyFrameOverPointLimit = ( frames :number[][] ) => {    
  const framesToCheck = cloneDeep( frames );

  // We sum rolls in each frame (without bonus points):
  const frameSums = framesToCheck.map( frame => sum(frame));
  const lastFrame = frameSums.splice(9);

  const isFrameOverPointLimit = isFrameOverLimit( frameSums );  
  const isLastFrameOverPointLimit = isLastFrameOverLimit( lastFrame );
  const isOverLimit: boolean = (isLastFrameOverPointLimit || isFrameOverPointLimit);

  return isOverLimit;
};

export const isAnyFrameTooLong = ( frames :number[][] ) => {
  let isTooLong = false;
  const framesToCheck = cloneDeep( frames );

  for (let i = 0; i < framesToCheck.length; i++) {
    const frame = framesToCheck[i];

    if ( i < 9) {
      // Here we check frames 1-9:
      if (frame.length > 2) isTooLong = true;
    } else {
      // Here we check frame 10:
      if (frame.length > 3) isTooLong = true;
      if (((frame[0] + frame[1]) < 10) && (frame.length > 2)) isTooLong = true;
    }
  }

  return isTooLong;
}

export const validateFrames = ( frames :number[][] ) => {
  const framesToCheck = cloneDeep( frames );

  if ( isAnyFrameFilled( framesToCheck ) === false ) return false
  if ( isAnyFrameOverPointLimit( framesToCheck ) === true ) return false
  if ( isAnyFrameTooLong( framesToCheck ) === true ) return false
  else return true;
};

export const divideIntoFrames = ( arrayToPartition: number[] ) => {
  let arrayByFrames: number[][] = [];
  let arrayCopy = cloneDeep( arrayToPartition );
  let frameNumber = 1;

  for ( let i=0; i<arrayCopy.length; ) {
    let currentItem = arrayCopy[i];
    let nextItem = arrayCopy[i+1];
    let currentFrame: number[] = [];

    if( frameNumber < 10 ) {
      
      if ((currentFrame.length === 0) && (currentItem === 10)) {        
        // Here we handle strikes:
        arrayByFrames.push( [currentItem] );
        i++;
        frameNumber++;
      } else {     
        // Here we handle spares and regular rolls:
        arrayByFrames.push( [currentItem, nextItem].filter(item => item !== undefined) );        
        i+=2;
        frameNumber++;
      };

    } else {

      let remainder = arrayCopy.slice(i);
      arrayByFrames.push( remainder );
      break;

    };
  };
  
  return arrayByFrames;
};

class Frame {
  frameId: number;
  rolls: number[];
  isStrike: boolean;
  isSpare: boolean;
  pointResult: number;

  constructor( frameArray: number[][], frameIndex: number ) {
    const frameArrayCopy = cloneDeep( frameArray );

    const calculateResult = ( allFrames: number[][], frameId: number, isStrike: boolean, isSpare: boolean ) => {
      const allFramesCopy = cloneDeep( allFrames );
      const directFramePoints = allFramesCopy[ frameId ].reduce((acc, val) => acc + val, 0 );
      // let pointResult = 0;

      // On frames 10, 11, 12 we don't count bonus points for strikes & spares:
      if ( frameId>=9 ) {
        return directFramePoints;
      } else {
        let nextResult = allFramesCopy[ frameId+1 ][0];
        let afterNextResult: number;
        allFramesCopy[ frameId+1 ][1] ? afterNextResult = allFramesCopy[ frameId+1 ][1] : afterNextResult = allFramesCopy[ frameId+2 ][0];

        if ( isStrike ) return directFramePoints + nextResult + afterNextResult;
        else if ( isSpare ) return directFramePoints + nextResult;
        else return directFramePoints;
      };
    };

    this.frameId = frameIndex;
    this.rolls = frameArray[ frameIndex ];
    this.isStrike = (( this.rolls.length === 1 ) && ( this.rolls[0] === 10 ));
    this.isSpare = (( this.rolls.length === 2 ) && (( this.rolls[0] + this.rolls[1] ) === 10 ));
    this.pointResult = calculateResult( frameArrayCopy, frameIndex, this.isStrike, this.isSpare );
  }
}

const processFrames = ( partitionedArray: number[][] ) => {
  const arrayCopy = [...partitionedArray];
  let resultArray: FrameInt[] = [];

  for ( let i=0; i<arrayCopy.length; i++ ) {
    resultArray.push(
      new Frame( arrayCopy, i )
    );
  };

  return resultArray;
}

class Player {

}

const getSinglePlayerResults = ( onePlayerData: PlayerRolls ) => {
  const singlePlayerData = cloneDeep( onePlayerData );
  const playerName = singlePlayerData.name;
  const playerRolls = singlePlayerData.rolls;

  // First, we're dividing rolls into frames:
  const playerFrames = divideIntoFrames( playerRolls );

  // Then we validate frames:
  const areFramesValid = validateFrames( playerFrames );
  console.log(`${playerName} input valid?` ,areFramesValid);

  // If valid, we can evaluate individual frames:
  if (areFramesValid === true) {
    const processed = processFrames( playerFrames );

    console.log(sum(processed.map((frame) => frame.pointResult)));    
  }
  // If invalid, push an empty array:
  else {

  }

};


export const getAllPlayerResults = ( playerData: PlayerRolls[] ) => {
  const allPlayerData = cloneDeep( playerData );
  console.log( 'player data is now in results module:', allPlayerData );

  allPlayerData.forEach( player => {
    getSinglePlayerResults( player );
  });

  return allPlayerData;
};