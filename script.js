
toggle = 0
legalSelection = undefined

createBlocks()

var selectedBlock = undefined
var selectedTower = undefined

$('.tower').on('click', blockMove)
$('button').on('click', createBlocks)
$('#reset').on('click', makeInvisible)
$('#inst').on('click', showInstructions)
$('#hide').on('click', hideInstructions)
scrollCloud2()
setTimeout(scrollCloud1, 10000)
setInterval(scrollCloud1, 25000)
setInterval(scrollCloud2, 35000)
$('input').keypress(function(e) {
  if (e.which == 13) {
    createBlocks()
  }
})

// Block Selection
function blockSelect(){
  event.stopPropagation()
  clickedBlock = $(this)
  isLegalSelection()
  if (legalSelection === true) {
    stopHint()
    if (selectedBlock !== undefined) {blockClassReset()}
    selectedBlock = $(this)
    blockClassSelected()
    highlightTowers()
    clickedBlock = undefined
  }
  else {
    clickedBlock.effect('shake', {times: 2, distance: 5}, 200)
    legalSelection = undefined
    clickedBlock = undefined
  }
}

function blockMove(){
  if (selectedBlock !== undefined) {
    selectedTower = $(this)
    isLegalMove()
    if (legalMove === true ) {
      selectedBlock.prependTo(selectedTower)
      countMove()
      highlightTowers()
    }
    else if (selectedBlock.parent().attr('id') !== selectedTower.attr('id')) {
      selectedTower.effect('shake', {times: 2, distance: 5}, 200)}
    }
    isWin()
  }
// Checks if clicked block is on top of tower
function isLegalSelection(){
  clickedID = clickedBlock.attr('id')
  let firstID = clickedBlock.parent().children().eq(0).attr('id')
  if (clickedID === firstID) {
    legalSelection = true
  } else if (clickedID !== firstID) {
    legalSelection = false
  }
}
// Checks if move is legal
function isLegalMove() {
  selectedID = parseInt(selectedBlock.attr('id').slice(1))
    if (selectedTower.children().eq(0).attr('id') === undefined) {
      towerTopID = 1000
    } else {
      towerTopID = parseInt(selectedTower.children().eq(0).attr('id').slice(1))
    }
  if (selectedID < towerTopID) {
    legalMove = true
  } else {
    legalMove = false
  }
}
//Show instructions
function showInstructions() {
  $('#instructions').slideDown()
  $('#inst').attr('style', 'display: none')
  $('#hide').attr('style', 'display: block')
}
//Hide instructions
function hideInstructions() {
  $('#instructions').slideUp()
  $('#hide').attr('style', 'display: none')
  $('#inst').attr('style', 'display: block')

}

// Change block to selected class
function blockClassSelected() {selectedBlock.attr('class', 'selected')}

// Resets block class to default
function blockClassReset() {selectedBlock.attr('class', 'unselected')}


// Resets tower class to default
function towerClassReset() {
  $('.towerOption').attr('class', 'tower')
  $('#rays').children().attr('id', 'invisible')
}
// highlights towers to move block to
function highlightTowers(){
  towerClassReset()
  for (var i = 0; i < 3; i++) {
    if ($('#game').children().eq(i).attr('id') !== selectedBlock.parent().attr('id')
      && possibleTower(i) === true ) {
      // $(`#tower${i+1}`).attr('class', 'towerOption')
      $(`.ray${i+1}`).attr('id', `ray${i+1}`)
    }
  }
}
function possibleTower(i) {
  let selectedID = parseInt(selectedBlock.attr('id').slice(1))
  if ($('#game').children().eq(i).children(0).attr('id') === undefined) {
    towerTopID = 100
  } else {
    towerTopID = parseInt($('#game').children().eq(i).children(0).attr('id').slice(1))
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
  if (toggle !== 0) {stopHint()}
  $('li').remove()
  resetCount()
  selectedBlock = undefined
  towerClassReset()
  numOfBlocks = $('input').val()
  blockLoop()
  bestPossible()
  $('li').on('click', blockSelect)
  clickHint()
}
// Creates blocks
function blockLoop() {
  for (let i = 0; i < numOfBlocks; i++) {
    let blockWidth = 100 - (i + .5)*(80/numOfBlocks)
    let block = `<li class='unselected' id='b${numOfBlocks - i}'style='width: ${blockWidth}%'></li>`
    $('#tower1').prepend(block)
  }
}
//Resets move count
function resetCount() {
  $('#moveCount').text(0)
}
// Tests if user won
function isWin(){
  let towerHeight2 = $('#tower2').children().length - 1
  let towerHeight3 = $('#tower3').children().length - 1
  if (towerHeight2 === parseInt(numOfBlocks) || towerHeight3 === parseInt(numOfBlocks)) {
    $('#win').removeClass('invisible')
    if (moveCount === best) {
      $('#win').find('h3').text('Perfect! Try a higher tower!')
      currentValue = $('input').attr('value')
      $('input').attr('value', `${parseInt(currentValue) + 1}`)
      $('#reset').text('go!')
    } else {
      $('#win').find('h3').text(`Great! You finished in ${moveCount} moves. You can do better!`)
      $('#reset').text('reset')
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
    toggle = setInterval(toggleBlock, 300)
}
//blinks hint block at game start
function toggleBlock() {hintBlock.toggleClass('unselected selected')}
// Stops block from blinking
function stopHint() {
  clearInterval(toggle)
}
// makes win page vanish on game reset
function makeInvisible() {
  $('#win').attr('class', 'invisible')
}
function scrollCloud1() {
  for (let i = 100, offset = 0; i > -50, offset < 200; i -= 1, offset += 1) {
    setTimeout(scroll, 80 * offset)
    function scroll() {
      $('.cloud1').attr('style', `left: ${i}%`)
    }
  }
}
function scrollCloud2() {
  for (let i = 100, offset = 0; i > -50, offset < 200; i -= 1, offset += 1) {
    setTimeout(scroll, 120 * offset)
    function scroll() {
      $('.cloud2').attr('style', `left: ${i}%`)
    }
  }
}
