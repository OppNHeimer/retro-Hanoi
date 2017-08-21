var selectedBlock = undefined
var selectedTower = undefined

$('div').on('click', blockMove)
$('button').on('click', createBlocks)
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
      countMove()
    }
  }
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
}
// Move Count
function countMove(){
  let moveCount = parseInt($('#moveCount').text())
  $('#moveCount').text(moveCount + 1)
}

// Custom number of blocks
function createBlocks() {
  clearBlocks()
  numOfBlocks = $('input').val()
  blockLoop()
  $('li').on('click', blockSelect)
}
function blockLoop() {
  for (let i = 0; i < numOfBlocks; i++) {
    let blockWidth = 100 - i*(100/numOfBlocks)
    let block = `<li id="b${numOfBlocks - i}"style="width: ${blockWidth}%">${numOfBlocks - i}</li>`
    $('#tower1').prepend(block)
  }
}
function clearBlocks() {
  $("li").remove()
}
// WIN
function isWin(){
// test if all blocks are moved to far right tower
}
