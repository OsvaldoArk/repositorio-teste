const roomsWide = 7, roomsHigh = 7, roomSize = 3;
const worldRows = roomsHigh * roomSize;   // 21
const worldCols = roomsWide * roomSize;   // 21

function fromGlobal(gr,gc){
  return { rr: Math.floor(gr/roomSize), rc: Math.floor(gc/roomSize), r: gr%roomSize, c: gc%roomSize };
}

// Define o tipo local da célula dentro de uma sala 3x3
// Portas no centro das bordas: norte (0,1), sul (2,1), oeste (1,0), leste (1,2)
function localDoorType(r,c){
  if (r===0 && c===1) return 'door-n';
  if (r===2 && c===1) return 'door-s';
  if (r===1 && c===0) return 'door-w';
  if (r===1 && c===2) return 'door-e';
  return 'floor';
}

function buildWorldGrid(){
  const grid = document.getElementById('room-grid');
  grid.innerHTML = '';
  for (let gr=0; gr<worldRows; gr++){
    for (let gc=0; gc<worldCols; gc++){
      const { r, c } = fromGlobal(gr,gc);
      const t = localDoorType(r,c);
      const cell = document.createElement('div');
      cell.className = 'cell' + (t.startsWith('door') ? ' door' : '');
      cell.dataset.gr = gr; cell.dataset.gc = gc;
      grid.appendChild(cell);
    }
  }
}

window.addEventListener('DOMContentLoaded', buildWorldGrid);
