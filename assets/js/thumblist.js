function postListType(){
    if ( $("body").classList.contains('post-type-thumbnail') ){
        $(".post-header .list-type .thum").classList.add('current');
        // $(".post-header .list-type .thum").addClass("current").siblings().removeClass("current");
    } else {
        $(".post-header .list-type .list").classList.add('current');
        // $(".post-header .list-type .list").addClass("current").siblings().removeClass("current");
    }

    $(".post-header .list-type").addEventListener('click', () => {
        console.log('test');
        if ( $("body").classList.contains('post-type-thumbnail') ){
            $("body").classList.add('post-type-list');
            $("body").classList.remove('post-type-thumbnail');
            $(".post-header .list-type .thum").classList.remove('current');
            $(".post-header .list-type .list").classList.add('current');
        } else {
            $("body").classList.add('post-type-thumbnail');
            $("body").classList.remove('post-type-list');
            $(".post-header .list-type .list").classList.remove('current');
            $(".post-header .list-type .thum").classList.add('current');
        }
    })
}

(async () => {
    postListType();
})();
