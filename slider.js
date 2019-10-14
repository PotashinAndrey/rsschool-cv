
function $(elem) {
  return document.getElementById(elem);
}

function slideBlock(numOfBlock) {
  if (numOfBlock > 4) numOfBlock = 1;
  let thisBlock = $('slide' + numOfBlock);
  let nextBlock = numOfBlock === 4 ? $('slide' + 1) : $('slide' + (numOfBlock + 1));

  thisBlock.classList.remove('selected');
  nextBlock.classList.add('selected');

  setTimeout(() => slideBlock(numOfBlock + 1), 5000);
}

slideBlock(1);


