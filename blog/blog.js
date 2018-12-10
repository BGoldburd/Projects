/*global $*/
(function () {
    'use strict';

    var mainPage = $('article');
    var prevNextDiv = $('#prevNext');
    var prev = $('#prev');
    var next = $('#next');
    var homeButton = $('#homeButton');
    var handleNextClick = void 0;
    var handlePrevClick = void 0;

    function getUsers() {
        $.getJSON('https://jsonplaceholder.typicode.com/users', function (json) {
            json.forEach(function (user) {
                var userSection = $('<section class="userSection">\n                                            <div>\n                                                <h2>' + user.name + '</h2>\n                                                <h3>Website: <a href="https://www.google.com"  title="Intentionally Opens Google" target="_blank">' + user.website + '</a></h3>\n                                            </div>\n                                            <div>\n                                                <strong>Company:</strong><br>\n                                                ' + user.company.bs + '<br>\n                                                ' + user.company.catchPhrase + '<br>\n                                                ' + user.company.name + '\n                                            </div>\n                                        </section>').appendTo(mainPage);

                userSection.find('h2').click(function () {
                    showUserBlog(user.id, user.name);
                });
            });
        });
    }

    getUsers();

    function showUserBlog(id, name) {
        mainPage.empty();
        var index = 0;
        $.getJSON('https://jsonplaceholder.typicode.com/posts?userId=' + id, function (json) {

            function display3Posts() {
                mainPage.append('<h2>' + name + '</h2><hr>');
                for (var i = 0; i < 3; i++) {
                    var curIndex = index + i;
                    if (json[curIndex]) {
                        var post = $('<section>\n                                            <!--h2>' + json[curIndex].userId + '</h2-->\n                                            <!--h2>#' + json[curIndex].id + '</h2-->\n                                            <h2>' + json[curIndex].title + '</h2>\n                                            <div>' + json[curIndex].body + '</div>\n                                            <button>show comments</button>\n                                        </section>').appendTo(mainPage);

                        fetchComments(post, json[curIndex].id);
                    }
                }
            }

            display3Posts();

            handleNextClick = function handleNextClick() {
                mainPage.empty();
                prev.show();
                index += 3;
                display3Posts();
                if (!json[index + 3]) {
                    next.hide();
                }
            };

            handlePrevClick = function handlePrevClick() {
                mainPage.empty();
                next.show();
                index -= 3;
                display3Posts();
                if (!json[index - 3]) {
                    prev.hide();
                }
            };

            prevNextDiv.css('display', 'flex');
        });
    }

    function fetchComments(post, id) {
        var postDiv = $('<div class="comments"></div>').appendTo(post);
        var posts = $('<div></div>').appendTo(postDiv);
        $.getJSON('https://jsonplaceholder.typicode.com/comments?postId=' + id, function (comments) {
            comments.forEach(function (comment) {
                posts.append('<section>\n                                <h3>' + comment.name + ' says:</h3>\n                                <p>' + comment.body + '</p>\n                                <h4>Contact Email: ' + comment.email + '</h4>\n                            </section>');
            });
            var addComment = $('<form class="addComment">\n                                    <h3>Write a Comment</h3>        \n                                    <label for="name">Enter Name: <i>(required)</i></label> <input id="name" required/>\n                                    <label for="email">Enter Email: <i>(required)</i></label> <input id="email" type="email" name="email" required/>\n                                    <textarea name="comments" placeholder="Add comment..." required></textarea>\n                                    <button>Submit Comment</button>\n                                </form>').appendTo(postDiv);

            var name = addComment.find('#name');
            var email = addComment.find('#email');
            var newComment = addComment.find('textarea');

            addComment.submit(function (event) {
                event.preventDefault();
                addNewComment(posts, id, name.val(), email.val(), newComment.val());
            });
        });

        var button = post.find('button');

        button.click(function () {
            var commentsSection = post.find('.comments');
            if (commentsSection.css('display') === 'none') {
                commentsSection.slideDown('fast');
                button.text('hide comments');
            } else {
                commentsSection.slideUp('fast');
                button.text('show comments');
            }
        });
    }

    function addNewComment(posts, postId, name, email, body) {
        $.post('https://jsonplaceholder.typicode.com/comments', {
            method: 'POST',
            body: JSON.stringify({
                postId: postId,
                name: name,
                email: email,
                body: body
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }, function (rawJson) {
            let json = JSON.parse(rawJson.body);
            posts.append('<section>\n <h3>' + json.name + ' says:</h3>\n  <p>' + json.body + '</p>\n   <h4>Contact Email: ' + json.email + '</h4>\n                            </section>');
        }, "json");
    }

    homeButton.click(function () {
        mainPage.empty();
        prevNextDiv.hide();
        prev.hide();
        getUsers();
    });

    next.click(function () {
        handleNextClick();
    });

    prev.click(function () {
        handlePrevClick();
    });
})();