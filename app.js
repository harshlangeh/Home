
document.addEventListener("DOMContentLoaded", function() {

    addCollapseToDOM()
    addSliderBodyToDOM()
    fetchNews(0)
    fetchNews(1)
    fetchNews(2)
    updateCarousel()
  })
  
  
  
  let newsType = ["Technology", "Sports", "Travel"]
  
  let url = ["https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/technology.rss",
  "https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/indiansports.rss", 
  "https://api.rss2json.com/v1/api.json?rss_url=https://flipboard.com/topic/travel.rss"]
  

  
  
  

  
  
  // fetching news
  
  async function fetchNews(index){
    try {

      const newsRawApiData = await fetch(url[index]);

      const newsData = await newsRawApiData.json();

      updateCarousel(newsData.items, index)
    } catch (error) {
      console.log(error)
      // return null      
    }
     
  }
  
  
  
  
  
  
  
  
  
  
  
  // console.log("======start")
  
  function addCollapseToDOM() {
    newsType.forEach(function (type, i) {
        let collapseButton = document.createElement("div");
        let collapseId = `collapseExample${i}`;
        let cardBody = `card-body${i}`;
  
        collapseButton.innerHTML = `
            <button class="btn btn-primary collapsed m-3" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
                ${type}
            </button>
            <div class="collapse show" id="${collapseId}">
                <div class="card ${cardBody}">
    
                </div>
            </div>
        `;
  
        if (document.querySelector(`#${collapseId}`)) {
          if (i === 0) {
            collapseElement.classList.add("show");
          } else {
            collapseElement.classList.add("collapse");
          }
        }
  
        document.querySelector("#addNewsData").appendChild(collapseButton);
  
        addSliderBodyToDOM(i)
    });
  }
  
  
  
  
  function addSliderBodyToDOM(index){
  
    // console.log("oooooo",index)
    // const collapseElement = document.querySelector(`#collapseExample${index}`);
    // console.log("Collapse Element:", collapseElement);
    // console.log(`#collapseExample${index}`)
    let sliderBody = document.createElement("div")
    sliderBody.innerHTML = ` <div id="carouselExample${index}" class="carousel slide">
    <div class="carousel-inner">
      
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample${index}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample${index}" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`
  
    if (document.querySelector(`#collapseExample${index}`)) {
      document.querySelector(`#collapseExample${index}`).appendChild(sliderBody)
    } else {
      console.error(`Element #collapseExample${index} not found.`)
    }
  
  }
  
  
  
  
  
  function updateCarousel(data, index) {
    console.log("===========updateCarousel============");
  
    // Generate a unique ID for the carousel based on the index
    const carouselId = `carouselInner${index}`;
  
    // Find or create the carousel-inner element
    let carouselInner = document.getElementById(carouselId);
    if (!carouselInner) {
      carouselInner = document.createElement("div");
      carouselInner.className = "carousel-inner";
      carouselInner.id = carouselId;
      document.querySelector(`#collapseExample${index} .carousel`).appendChild(carouselInner);
    }
  
    data.forEach((news, newsIndex) => {
      let slide = document.createElement("div");
  
      if (newsIndex === 0) {
        slide.classList.add("carousel-item", "active");
      } else {
        slide.classList.add("carousel-item");
      }
  
      slide.innerHTML = `
        <img src="${news.enclosure.link}" class="d-block w-100" alt="${news.title}">
        <div><h1 id="title">${news.title}</h1></div>
        <div>
          <span><h3 id="author">${news.author}</h3></span>
          <span><h6 id="date">${news.pubDate}</h6></span>
        </div>
        <div><p id="description">${news.description}</p></div>
      `;
  
      carouselInner.appendChild(slide);
    });
  }