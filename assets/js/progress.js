let color = ['#ce0070', '#5a27eb']

$('.progress-bar').style.background = color[parseInt(Math.random()*100/50)];

function progressBar() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  $('.progress-bar').style.width = scrolled + "%";
}

const backupWidth = $('.toc')?.clientWidth;
const backupHeight = $('.toc')?.clientHeight;

    //toc hide and show
$('.toc_btn')?.addEventListener('click', (e) => {
    let toc = $('.toc').style;

    if(toc.width !== `${e.target.clientWidth}px`) {
        toc.height = `${backupHeight}px`; // set first init value explicitly
        toc.width = `${e.target.clientWidth}px`;
        toc.height = `${e.target.clientWidth}px`;
        toc.opacity = '0.7';
        toc.overflowX = 'hidden';
    }
    else {
        toc.opacity = '0.9';
        toc.width = `${backupWidth}px`;
        toc.height = `${backupHeight}px`;
        toc.overflowX = '';
    }
})

window.onscroll = () => progressBar();