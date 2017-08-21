var selectedBlock = undefined
$('li').on('click', blockSelect)

function blockSelect(){
  if (selectedBlock !== undefined) {selectedBlock.removeClass('selected')}
  selectedBlock = $(this)
  $(this).attr('class', 'selected')
// show block has been selected
// store block as an item to move
}
function blockMove(){
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
