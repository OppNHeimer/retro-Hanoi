var selectedBlock = undefined
var selectedTower = undefined
$('li').on('click', blockSelect)
$('div').on('click', blockMove)

function blockSelect(){
  if (selectedBlock !== undefined) {selectedBlock.removeClass('selected')}

  clickedBlock = $(this)
  let clickedID = clickedBlock.attr('id')
  let firstID = clickedBlock.parent().children().eq(0).attr('id')

  if (clickedID === firstID) {
    $(this).attr('class', 'selected')
    selectedBlock = $(this)
  }

}
function blockMove(){
  if (selectedBlock !== undefined) {
    selectedTower = $(this).find('ol')
    selectedBlock.prependTo(selectedTower)
  }
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
