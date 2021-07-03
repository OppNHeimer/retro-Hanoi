toggle = 0
moveCount = 0

// AS: Variables shouldn't be set to undefined. You can set them to null.
// Better practice would just be like follows:
// AS: Changed to let for consistency

let selectedBlock
let selectedTower

createBlocks()

$('.tower').on('click', blockMove)
$('button').on('click', createBlocks)
$('#reset').on('click', makeInvisible)
$('#inst').on('click', showInstructions)
$('#hide').on('click', hideInstructions)


$('input').keypress(function(e) {
  if (e.which == 13) {
    createBlocks()
  }
})


// AS: You could DRY this up by using anonymous functions to pass parameters to your
// function. You also may want to use the screen width ($( window ).width()) here in order to make this work
// on browsers of all sizes (it seems to end with the cloud halfway off the screen if 
// you make the window smaller)
scrollCloud('.cloud2', 120)
setTimeout(() => {scrollCloud('.cloud1', 80)}, 10000)
setInterval(() => {scrollCloud('.cloud1', 80)}, 25000)
setInterval(() => {scrollCloud('.cloud2', 120)}, 35000)


function scrollCloud(selector, offsetAmt) {
  for (let i = 100, offset = 0; i > -50, offset < 200; i -= 1, offset += 1) {
    setTimeout(() => $(selector).attr('style', `left: ${i}%`), offsetAmt * offset)
  }
}


// AS: This comment is somewhat unnecessary since it is just restating the function
// name -- maybe say something like "Adds effects to the block on selection"

// Block Selection
function blockSelect(){
  // AS: I could be wrong, but it seems like the event.stopPropagation() is unneeded.
  // event.stopPropagation()
  clickedBlock = $(this)

  // Use the return value to check if it is a legal selection rather than setting
  // the global variable
  if (isLegalSelection()) {
    stopHint()
    // This is only called once so it doesn't need to be a function
    if (selectedBlock) selectedBlock.attr('class', 'unselected')
    selectedBlock = $(this)
    selectedBlock.attr('class', 'selected')
    highlightTowers()
  }
  else {
    clickedBlock.effect('shake', {times: 2, distance: 5}, 200)
  }
  clickedBlock = null
}

function blockMove(){
  // AS: if its true this will execute, no need for checking equality
  if (selectedBlock) {
    selectedTower = $(this)
    
    if (isLegalMove()) {
      selectedBlock.prependTo(selectedTower)
      countMove()
      highlightTowers()
    } else if (selectedBlock.parent().attr('id') !== selectedTower.attr('id')) {
      selectedTower.effect('shake', {times: 2, distance: 5}, 200)
    }
  }
  isWin()
}

// Checks if clicked block is on top of tower
function isLegalSelection(){
  clickedID = clickedBlock.attr('id')
  let firstID = clickedBlock.parent().children().eq(0).attr('id')
  if (clickedID === firstID) return true
}

// Checks if move is legal
function isLegalMove() {
  selectedID = parseInt(selectedBlock.attr('id').slice(1))
    if (!selectedTower.children().eq(0).attr('id')) {
      towerTopID = 1000
    } else {
      towerTopID = parseInt(selectedTower.children().eq(0).attr('id').slice(1))
    }
  // AS: you can change that if statement to...
  return selectedID < towerTopID
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
        // AS: remove commented code in production
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

// AS I would have a move count variable in the JS that you increment rather than through JS
// Move Count
function countMove(){
  moveCount ++ 
  $('#moveCount').text(moveCount)
}

// Resets game and creates tower of custom height
function createBlocks() {
  if (toggle !== 0) stopHint()
  $('li').remove()
  resetCount()
  selectedBlock = null
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
    let blockWidth = 100 - (i + .5) * (80/numOfBlocks)
    let block = `<li class='unselected' id='b${numOfBlocks - i}'style='width: ${blockWidth}%'></li>`
    $('#tower1').prepend(block)
  }
}

//Resets move count
function resetCount() {
  moveCount = 0
  $('#moveCount').text(moveCount)
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


