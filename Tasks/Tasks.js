//transfer data//
$('.drag-item').on('dragstart', function(e) {
    e.originalEvent.dataTransfer.setData('listItem', $(this).index())
    console.log('starting')
})