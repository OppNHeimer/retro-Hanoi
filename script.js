var selectedBlock = undefined
var selectedTower = undefined
$('li').on('click', blockSelect)
$('div').on('click', blockMove)

function blockSelect(){
  if (selectedBlock !== undefined) {selectedBlock.removeClass('selected')}
  selectedBlock = $(this)
  $(this).attr('class', 'selected')
}
function blockMove(){
  selectedTower = $(this).find('ol')
  console.log(selectedTower)
  selectedBlock.prependTo(selectedTower)
// move selected item to clicked tower
  isIllegal()
  countMove()
  isWin()
}
function isIllegal(){
// test if selected block can move to tower
}
function countMove(){
// add 1 to tally of moves
}
function isWin(){
// test if all blocks are moved to far right tower
}
