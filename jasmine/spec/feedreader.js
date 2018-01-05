/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

$(function() {
    /* This is the first test suite. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in the application.
    */
    describe('RSS Feeds', function() {
        /* This is the first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has feeds with defined URLs', function() {
           for (let feed of allFeeds) { // loop through each feed object in allFeeds
             // access URL of the feed and make sure it is defined and is not empty (i.e. not falsy)
             expect(feed.url).toBeTruthy();
           }
         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has defined names', function() {
           for (let feed of allFeeds) { // loop through each feed object in allFeeds
             // access name of the feed and make sure it is defined and is not empty (i.e. not falsy)
             expect(feed.name).toBeTruthy();
           }
         });

    });


    /* New test suite */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default. Y
         */
         it('should be hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('should change visibility when menu icon is clicked', function() {
            menuIcon = $('.menu-icon-link');
            menuIcon.trigger('click'); // simulate a click
            expect($('body').hasClass('menu-hidden')).toBe(false); // see if menu-hidden class gets toggled off
            menuIcon.trigger('click'); // simulate another click
            expect($('body').hasClass('menu-hidden')).toBe(true); // see if menu-hidden class gets toggled on
          });
    });

    /* New test suite */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Note: loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
           loadFeed(0, done)// run loadFeed with callback set to done()
         });

         it('there is at least a single .entry element within the .feed container', function() {
           expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });

    /* New test suite */
    describe('New Feed Selection', function() {
        let oldFeed, newFeed;
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Note: loadFeed() is asynchronous.
         */
         beforeEach(function(done) {
           loadFeed(0, function() {
             oldFeed = $('.feed').text();
             loadFeed(1, function() {
               newFeed = $('.feed').text();
               done();
             });
           });
         });

         it('when new feed is loaded, content actually changes', function() {
           expect(oldFeed).not.toBe(newFeed); // see if content changed
         });
     });

}());
