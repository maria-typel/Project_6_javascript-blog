{
  'use strict';
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.list.tags';

  const  generateTitleLinks = function (customSelector = '') {

    const titleList = document.querySelector(optTitleListSelector);       /* [DONE] make a new constant titleList */
    titleList.innerHTML = '';                                             /* [DONE] remove contents of titleList */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);       /* [DONE] find all the articles and save them to variable: articles */
    console.log('optArticleSelector and customSelector are :', optArticleSelector + customSelector );

    let html = '';

    for (let article of articles) {                                       /* [DONE] for each article: */

      const articleId = article.getAttribute('id');                       /* [DONE] get the article id */
      console.log('Found article is :', articleId);

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;   /* [DONE] find the title element and  get the title from the title element */
      console.log('Found article title is :', articleId);

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';   /* [DONE] create HTML of the link */
      console.log('created HTML of the link :', linkHTML);

      html = html + linkHTML;                                             /* [DONE] insert link into html variable */
      console.log('HTML after loop:', html);
    }

    titleList.innerHTML = html;                                           /* [DONE] insert link into titleList */
  };
  generateTitleLinks();

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log(this);
    console.log(event);

    const activeLinks = document.querySelectorAll('.titles a.active');      /*[DONE]remove class 'active' from all article links  */
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');                                 /*[DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);

    const activeArticles = document.querySelectorAll('.post.active');       /* [DONE] remove class 'active' from all articles */
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    const articleSelector = clickedElement.getAttribute('href');            /* [DONE] get 'href' attribute from the clicked link */
    console.log('Clicked element is :', articleSelector);

    const targetArticle = document.querySelector(articleSelector);          /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    console.log('Found article is :', targetArticle);

    targetArticle.classList.add('active');                                 /* [DONE] add class 'active' to the correct article */
    console.log('Added class active to :', clickedElement);
  };

  const addClickListenersToTitles = function(){
    const links = document.querySelectorAll('.titles a');                 /* find all links to titles */
    for (let link of links) {                                             /* START LOOP: for each link */
      link.addEventListener('click', titleClickHandler);                  /* add titleClickHandler as event listener for that link */
    }                                                                     /* END LOOP: for each link */
  };
  addClickListenersToTitles();


  const generateTags = function() {
    let allTags = [];                                                     /* [TagsRightColum] create a new variable allTags with an empty array */
    const articles = document.querySelectorAll(optArticleSelector);       /* [DONE]  find all articles */

    for (let article of articles) {                                       /* [DONE]  START LOOP: for every article: */

      const tagWrapper = article.querySelector(optArticleTagsSelector);   /* [DONE]  find tags wrapper */
      console.log('tag Wrapper is:', tagWrapper);

      const articleTags = article.getAttribute('data-tags');              /* [DONE]  get tags from data-tags attribute */
      console.log('Tag is :', articleTags);

      const articleTagsArray = articleTags.split(' ');                    /* [DONE]  split tags into array */
      console.log('Array is :', articleTagsArray);

      let html = '';                                                      /* [DONE]  make html variable with empty string */

      for (let tag of articleTagsArray){                                  /* [DONE]  START LOOP: for each tag */
        console.log('Single tag is :', tag);

        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';           /* [DONE]  generate HTML of the link */
        console.log('created HTML of the link :', linkHTML);

        html = html + linkHTML;                                            /* [DONE]  add generated code to html variable */

        if(allTags.indexOf(linkHTML) == -1){                               /* [TagsRightColum] check if this link is NOT already in allTags */
          allTags.push(linkHTML);                                          /* [TagsRightColum] add generated code to allTags array */
        }
      }
      tagWrapper.innerHTML = html;                                         /* [DONE]  insert HTML of all the links into the tags wrapper */
      console.log('Tag Wrapper after loop is:', html);
    }

    const tagList = document.querySelector(optTagsListSelector);          /* [TagsRightColum] find list of tags in right column */

    tagList.innerHTML = allTags.join(' ');                                /* [TagsRightColum] add html from allTags to tagList */
  };
  generateTags();

  const tagClickHandler = function (event){
    console.log(event);
    event.preventDefault();                                                                       /* [DONE]  prevent default action for this event */
    const clickedElement = this;                                                                  /* [DONE]  make new constant named "clickedElement" and give it the value of "this" */
    console.log(this);

    const href = clickedElement.getAttribute('href');                                            /* [DONE]  make a new constant "href" and read the attribute "href" of the clicked element */
    console.log('Atribute is : ', href );

    const tag = href.replace('#tag-', '');                                                       /* [DONE] make a new constant "tag" and extract tag from the "href" constant*/
    console.log('Extracted tag is :', tag);

    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');                 /* [DONE] find all tag links with class active */
    for (let activeTagLink of activeTagLinks){
      activeTagLink.classList.remove('active');                                                 /* [DONE remove class active from  all tag links with class active */
    }

    const tagLinksEqualClickedElements = document.querySelectorAll('a[href="' + href + '"]');   /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    for (let tagLinksEqualClickedElement of tagLinksEqualClickedElements){
      tagLinksEqualClickedElement.classList.add('active');                                      /* [DONE] add class active to all tag links with "href" attribute equal to the "href" constant */
    }

    generateTitleLinks('[data-tags~="' + tag + '"]');
    addClickListenersToTitles();                                                              /* execute function "generateTitleLinks" with article selector as argument*/
  };

  const addClickListenersToTags = function(){
    const links = document.querySelectorAll('.post-tags .list a');                            /* [DONE] find all links to tags*/
    for (let link of links) {                                                                 /* [DONE] START LOOP: for each link */
      link.addEventListener('click', tagClickHandler);                                        /* [DONE] add tagClickHandler as event listener for that link */
    }                                                                                         /* [DONE] END LOOP: for each link */
  };
  addClickListenersToTags();


  const generateAuthors = function() {
    const articles = document.querySelectorAll(optArticleSelector);                           /* [DONE]  find all articles */

    for (let article of articles) {                                                           /* [DONE]  START LOOP: for every article: */

      const authorWrapper = article.querySelector(optArticleAuthorSelector);                  /* [DONE]  find author wrapper */
      console.log('author Wrapper is:', authorWrapper);

      const articleAuthors = article.getAttribute('data-author');                              /* [DONE]  get authors from data-author attribute */
      console.log('Author is :', articleAuthors);

      let html = '';                                                                           /* [DONE]  make html variable with empty string */

      const linkHTML = '<li><a href="#author-' + articleAuthors + '"><span>' + articleAuthors + '</span></a></li>';      /* [DONE]  generate HTML of the link */
      console.log('created HTML of the link :', linkHTML);                                                               /* [DONE]  make html variable with empty string */

      html = html + linkHTML;                                                                   /* [DONE]  add generated code to html variable */

      authorWrapper.innerHTML = html;                                                           /* [DONE]  insert HTML of all the links into the author wrapper */
      console.log('Author Wrapper after loop is:', html);
    }
  };
  generateAuthors();

  const authorClickHandler = function (event){
    console.log(event);
    event.preventDefault();                                                                    /* [DONE]  prevent default action for this event */
    const clickedElement = this;                                                               /* [DONE]  make new constant named "clickedElement" and give it the value of "this" */
    console.log(this);

    const href = clickedElement.getAttribute('href');                                          /* [DONE]  make a new constant "href" and read the attribute "href" of the clicked element */
    console.log('Atribute is : ', href );

    const author = href.replace('#author-', '');                                              /* [DONE] make a new constant "author" and extract author from the "href" constant*/
    console.log('Extracted author is :', author);

    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');        /* [DONE] find all tag links with class active */
    for (let activeAuthorLink of activeAuthorLinks){
      activeAuthorLink.classList.remove('active');                                            /* [DONE remove class active from  all tauthor links with class active */
    }

    const authorLinksEqualClickedElements = document.querySelectorAll('a[href="' + href + '"]');   /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    for (let authorLinksEqualClickedElement of authorLinksEqualClickedElements){
      authorLinksEqualClickedElement.classList.add('active');                                  /* [DONE] add class active to all author links with "href" attribute equal to the "href" constant */
    }

    generateTitleLinks('[data-author="' + author + '"]');                                      /* execute function "generateTitleLinks" with article selector as argument*/
    addClickListenersToTitles();
  };

  const addClickListenersToAuthors = function(){
    const links = document.querySelectorAll('.post-author a');                                /* [DONE] find all links to authors */
    for (let link of links) {                                                                 /* [DONE] START LOOP: for each link */
      link.addEventListener('click', authorClickHandler);                                     /* [DONE] add tagClickHandler as event listener for that link */
    }                                                                                         /* [DONE] END LOOP: for each link */
  };
  addClickListenersToAuthors();
}



