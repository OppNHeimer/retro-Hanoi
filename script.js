var selectedBlock = undefined
var selectedTower = undefined
$('li').on('click', blockSelect)
$('div').on('click', blockMove)

// Block Selection
function blockSelect(){
  clickedBlock = $(this)
  if (isLegalSelection() === true) {
    if (selectedBlock !== undefined) {selectedBlock.removeClass('selected')}
    selectedBlock = $(this)
    selectedBlock.attr('class', 'selected')
  }
}
function isLegalSelection(){
  let clickedID = clickedBlock.attr('id')
  let firstID = clickedBlock.parent().children().eq(0).attr('id')
  if (clickedID === firstID) {
    return true
  }
}

// Block Movement
function blockMove(){
  if (selectedBlock !== undefined) {
    selectedTower = $(this)
    if (isLegalMove() === true) {
      selectedBlock.prependTo(selectedTower)
    }
  }

  countMove()
  isWin()
}


function isLegalMove() {
  let selectedID = selectedBlock.attr('id').slice(1)
  if (selectedTower.children(0).attr('id') === undefined) {
    towerTopID = 100
  } else {
    towerTopID = selectedTower.children(0).attr('id').slice(1)
  }
  if (selectedID < towerTopID) {
    return true
  }

  // console.log(selectedID)
  // console.log(towerTopID)
  // test if selected block can move to tower

}
function countMove(){
// add 1 to tally of moves
}
function isWin(){
// test if all blocks are moved to far right tower
}
