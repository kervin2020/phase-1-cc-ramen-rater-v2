const { expect } = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');

// Set up the DOM
const htmlDocPath = path.join(process.cwd(), 'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();
const dom = new JSDOM(htmlDocumentContent);
global.document = dom.window.document;
global.window = dom.window;

// Test data
const testResponseData = [
    {
        "id": 1,
        "name": "Shoyu Ramen",
        "restaurant": "Nonono",
        "image": "./assets/ramen/shoyu.jpg",
        "rating": 7,
        "comment": "Delish. Can't go wrong with a classic!"
    },
    {
        "id": 2,
        "name": "Naruto Ramen",
        "restaurant": "Naruto",
        "image": "./assets/ramen/naruto.jpg",
        "rating": 10,
        "comment": "My absolute fave!"
    },
    {
        "id": 3,
        "name": "Nirvana Shiromaru",
        "restaurant": "Ippudo",
        "image": "./assets/ramen/nirvana.jpg",
        "rating": "7",
        "comment": "Do buy the hype."
    },
    {
        "id": 4,
        "name": "Gyukotsu Ramen",
        "restaurant": "Za-Ya Ramen",
        "image": "./assets/ramen/gyukotsu.jpg",
        "rating": 8,
        "comment": "Good to the last drop."
    },
    {
        "id": 5,
        "name": "Kojiro Red Ramen",
        "restaurant": "Ramen-Ya",
        "image": "./assets/ramen/kojiro.jpg",
        "rating": 6,
        "comment": "Perfect for a cold night."
    }
];

// Mock fetch
global.fetch = (url) => {
    return Promise.resolve({
        ok: true,
        json() {
            return Promise.resolve(testResponseData);
        }
    });
};

// Import the functions to test
const { displayRamens, addSubmitListener, handleClick, main } = require('../src/index');

describe('displayRamens', () => {
    it('should fetch all ramens and display them as <img> inside #ramen-menu', async () => {
        const ramenMenuDiv = document.getElementById('ramen-menu');
        displayRamens();
        await new Promise(resolve => setTimeout(resolve, 0));

        const ramenImages = ramenMenuDiv.querySelectorAll('img');
        const urls = Array.from(ramenImages).map((ramenImg) => ramenImg.src);
        const originalUrls = testResponseData.map((ramen) => ramen.image);

        expect(ramenImages.length).to.equal(testResponseData.length);
        expect(urls).to.deep.equal(originalUrls);
    });
});

describe('handleClick', () => {
    it('should fire on a click on every img inside #ramen-menu', async () => {
        const ramenMenuDiv = document.getElementById('ramen-menu');
        const ramenImages = ramenMenuDiv.querySelectorAll('img');

        ramenImages.forEach((ramenImg) => {
            const ramen = testResponseData.find((ramen) => ramen.image === ramenImg.src);
            ramenImg.addEventListener('click', (event) => {
                handleClick(ramen, event);
            });
        });

        const img = ramenImages[0];
        img.click();

        const detailImg = document.querySelector("#ramen-detail > .detail-image");
        const detailName = document.querySelector("#ramen-detail > .name");
        const detailRestaurant = document.querySelector("#ramen-detail > .restaurant");
        const detailsRating = document.getElementById("rating-display");
        const detailsComment = document.getElementById("comment-display");

        expect(detailName.textContent).to.equal('Shoyu Ramen');
        expect(detailRestaurant.textContent).to.equal('Nonono');
        expect(detailImg.src).to.equal('./assets/ramen/shoyu.jpg');
        expect(detailsRating.textContent).to.equal('7');
        expect(detailsComment.textContent).to.equal("Delish. Can't go wrong with a classic!");
    });
});

describe('addSubmitListener', () => {
    it('should add a new ramen to #ramen-menu', async () => {
        const form = document.getElementById('new-ramen');
        addSubmitListener(form);

        const newRamen = {
            name: 'Test Ramen',
            restaurant: 'Test Restaurant',
            image: './assets/ramen/test.jpg',
            rating: '5',
            comment: 'Test comment'
        };

        const ramenMenuDivBefore = document.querySelectorAll('#ramen-menu img');
        
        // Fill form
        document.getElementById('new-name').value = newRamen.name;
        document.getElementById('new-restaurant').value = newRamen.restaurant;
        document.getElementById('new-image').value = newRamen.image;
        document.getElementById('new-rating').value = newRamen.rating;
        document.getElementById('new-comment').value = newRamen.comment;

        // Submit form
        form.dispatchEvent(new window.Event('submit'));

        const ramenMenuDivAfter = document.querySelectorAll('#ramen-menu img');
        expect(ramenMenuDivAfter.length).to.equal(ramenMenuDivBefore.length + 1);
    });
}); 