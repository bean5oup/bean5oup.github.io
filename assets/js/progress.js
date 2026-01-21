let color = ['#ce0070', '#5a27eb']

$('.progress-bar').style.background = color[Math.floor(Math.random() * color.length)];

function progressBar() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    progressEl.style.width = scrolled + "%";
}

function mark() {
    let y = window.scrollY;

    for (let i = 0; i < headingTops.length; i++) {
        if (y <= headingTops[i]) {
            let idx = i - 1;
            curMark?.classList.remove('active');
            curMark = toc_headings[idx];
            curMark?.classList.add('active');
            return;
        }
    }
}

function buildSlugs() {
    const slugCount = {};

    for(let e of $$('.entry-content h1, .entry-content h2:not(.screen_out), .entry-content h3, .entry-content h4')) {
        let aTag = document.createElement('a');
        const baseSlug = encodeURI(
            e.innerText
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-_]/g, '')
                .replace(/\s+/g, '-')
        );

        if (slugCount[baseSlug] === undefined) {
            slugCount[baseSlug] = 0;
        } else {
            slugCount[baseSlug]++;
        }

        const finalSlug =
        slugCount[baseSlug] === 0
            ? baseSlug
            : `${baseSlug}-${slugCount[baseSlug]}`;

        aTag.className = 'h';
        aTag.href = `#${finalSlug}`;
        aTag.innerHTML = `
            <span></span>
        `;
        e.prepend(aTag);
    }
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

let headingTops = [];
const headings = [
    ...$$('.entry-content h1, .entry-content h2:not(.screen_out), .entry-content h3, .comments')
];
const toc_headings = [
    ...$$('.toc a')
];
let curMark;
const progressEl = $('.progress-bar');

const computeHeadingTops = () => {
    headingTops = headings.map(
        h => Math.floor(h.getBoundingClientRect().top + window.scrollY)
    );

    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    headingTops.push(height);
};

(async () => {
    // const observer = new IntersectionObserver
    let initialized = false;

    buildSlugs();

    window.onscroll = () => {
        progressBar();
        if(initialized)
            mark();
    };

    await document.fonts.ready;
    computeHeadingTops();
    initialized = true;
    mark();
    
    let resizeTicking = false;

    window.addEventListener('resize', () => {
        if (!resizeTicking) {
            requestAnimationFrame(() => {
                computeHeadingTops();
                resizeTicking = false;
            });
            resizeTicking = true;
        }
    });
})();

