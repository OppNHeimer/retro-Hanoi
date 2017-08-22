createBlocks()
var selectedBlock = undefined
var selectedTower = undefined

$('.tower').on('click', blockMove)
$('button').on('click', createBlocks)

// Block Selection
function blockSelect(){
  clickedBlock = $(this)
  if (isLegalSelection() === true) {
    if (selectedBlock !== undefined) {blockClassReset()}
    selectedBlock = $(this)
    stopHint()
    blockClassSelected()
    highlightTowers()
  }
}
// Change block to selected class
function blockClassSelected() {selectedBlock.attr('class', 'selected')}

// Resets block class to default
function blockClassReset() {selectedBlock.removeClass('selected')}

// Checks if clicked block is on top of tower
function isLegalSelection(){
  let clickedID = clickedBlock.attr('id')
  let firstID = clickedBlock.parent().children().eq(0).attr('id')
  if (clickedID === firstID) {
    return true
  }
}

// Resets tower class to default
function towerClassReset() {$('.towerOption').attr('class', 'tower')}

// highlights towers to move block to
function highlightTowers(){
  towerClassReset()
  for (var i = 0; i < 3; i++) {
    if ($('#game').children().eq(i).attr('id') !== clickedBlock.parent().attr('id')){
      $(`#tower${i+1}`).attr('class', 'towerOption')
    }
  }
}

// Block Movement
function blockMove(){
  if (selectedBlock !== undefined) {
    selectedTower = $(this)
    if (isLegalMove() === true) {
      selectedBlock.prependTo(selectedTower)
      countMove()
      highlightTowers()
    }
  }
  isWin()
}

// Checks if move is legal
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
  moveCount = parseInt($('#moveCount').text())
  $('#moveCount').text(moveCount + 1)
  moveCount = parseInt($('#moveCount').text())
}

// Resets game and creates tower of custom height
function createBlocks() {
  $("li").remove()
  selectedBlock = undefined
  towerClassReset()
  numOfBlocks = $('input').val()
  blockLoop()
  clickHint()
  bestPossible()
  $('li').on('click', blockSelect)
}

// Creates blocks
function blockLoop() {
  for (let i = 0; i < numOfBlocks; i++) {
    let blockWidth = 100 - (i + .5)*(80/numOfBlocks)
    let block = `<li id="b${numOfBlocks - i}"style="width: ${blockWidth}%"></li>`
    $('#tower1').prepend(block)
  }
}

// Tests if user won
function isWin(){
  let towerHeight2 = $("#tower2").children().length - 1
  let towerHeight3 = $("#tower3").children().length - 1
  if (towerHeight2 === parseInt(numOfBlocks) || towerHeight3 === parseInt(numOfBlocks)) {
    if (moveCount === best) {
      alert("Perfect! Try a higher tower!")
    } else {
      alert(`Great, you finished in ${moveCount}moves. You can do better!`)
    }
  }
}

// Calulate the best possible score
function bestPossible() {
  best = 2 ** numOfBlocks - 1
  $('#best').text(best)
}

// Gives user blinking hint
function clickHint() {
    hintBlock = $('#b1')
    select = setInterval(hintClassSelected, 500)
    reset = setInterval(hintClassReset, 1000)
}
function hintClassSelected() {hintBlock.attr('class', 'selected')}
function hintClassReset() {hintBlock.removeClass('selected')}

// Stops block from blinking
function stopHint() {
  clearInterval(select)
  clearInterval(reset)
}
