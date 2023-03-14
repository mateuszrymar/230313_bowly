import { cloneDeep } from "lodash-es";

interface FrameInt {
  frameId: number;
  rolls: number[];
  isStrike: boolean;
  isSpare: boolean;
  pointResult: number;
}

interface PlayerInt {
  name: string;
  result: number | null;
  frames: FrameInt[];
}

// DOM Elements
const tableBody = document.querySelector('.table__body');

console.log(tableBody);


const tableRowTemplate = `
<tr class="table__row-1 table-rows">
  <td><h3 class="row-1__player player">Jim</h3></td>
  <td><h3 class="row-1__score score">1050</h3></td>
  <td class="table-row__frames">
    <ul class="table-row__frames-list">
      <li class="table-row__frame">
        <div class="frame__rolls">
          <span class="roll">8</span>
          <span class="roll">2<div class="spare"></div></span>
        </div>
        <p class="frame__result">16</p>
      </li>
      <li class="table-row__frame">
        <div>
          <span class="roll">10<div class="strike"></div></span>
          <span class="roll"><div class="strike"></div></span>
        </div>
        <p class="frame__result">16</p>
      </li>
      <li class="table-row__frame">
        <div>
          <span class="roll">10<div class="strike"></div></span>
          <span class="roll"><div class="strike"></div></span>
        </div>
        <p class="frame__result">16</p>
      </li>
      <li class="table-row__frame">
        <div>
          <span class="roll">10<div class="strike"></div></span>
          <span class="roll"><div class="strike"></div></span>
        </div>
        <p class="frame__result">16</p>
      </li>
      <li class="table-row__frame">
        <div>
          <span class="roll">10<div class="strike"></div></span>
          <span class="roll"><div class="strike"></div></span>
        </div>
        <p class="frame__result">16</p>
      </li>
      <li class="table-row__frame">
        <div>
          <span class="roll">10<div class="strike"></div></span>
          <span class="roll"><div class="strike"></div></span>
        </div>
        <p class="frame__result">16</p>
      </li>
      <li class="table-row__frame">
        <div>
          <span class="roll">10<div class="strike"></div></span>
          <span class="roll"><div class="strike"></div></span>
        </div>
        <p class="frame__result">16</p>
      </li>
      <li class="table-row__frame">
        <div>
          <span class="roll">10<div class="strike"></div></span>
          <span class="roll"><div class="strike"></div></span>
        </div>
        <p class="frame__result">16</p>
      </li>
      <li class="table-row__frame">
        <div>
          <span class="roll">10<div class="strike"></div></span>
          <span class="roll"><div class="strike"></div></span>
        </div>
        <p class="frame__result">16</p>
      </li>
      <li class="table-row__frame--last table-row__frame">
        <div>
          <span class="roll">8</span>
          <span class="roll">2<div class="spare"></div></span>
          <span class="roll">2</span>
        </div>
        <p class="frame__result">16</p>
      </li>
    </ul>
  </td>
</tr>
`;

const createTableRow = ( playerData: PlayerInt ) => {
  const playerDataCopy = cloneDeep( playerData );
};

const createTableRows = ( playerData: PlayerInt[] ) => {
  const playerDataCopy = cloneDeep( playerData );
  
  playerDataCopy.forEach( player => {
    createTableRow( player );
  });
}

export const displayResults = ( playerData: PlayerInt[] ) => {
  const playerDataCopy = cloneDeep( playerData );
  console.log( 'here we display in the table', playerData );

  createTableRows ( playerDataCopy );
  
  if ( tableBody !== null ) {
    tableBody.innerHTML = tableRowTemplate;
  };

};