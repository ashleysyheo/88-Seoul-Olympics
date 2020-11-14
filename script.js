let arenaData;

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

fetch("http://api.are.na/v2/channels/88-seoul-olympics")
    .then(response => response.json())
    .then(data => {
            arenaData = data.contents;

            const header = document.querySelector('.header');
            const currTime = document.createElement('div');
            currTime.className = 'header-time'
            header.appendChild(currTime);

            const time = () => {
                let today = new Date();
                let h = today.getHours();
                let m = today.getMinutes();
                h = checkHour(h);
                m = checkTime(m);
                currTime.innerHTML = h + ":" + m;
                let t = setTimeout(time, 1000);
            }

            function checkTime(i) {
                if (i < 10) {
                    i = "0" + i
                };
                return i;
            }

            const checkHour = hour => {
                if (hour > 12) {
                    hour -= 12
                } else if (hour === 0) {
                    hour = 12
                };
                return hour
            }

            const currDate = document.createElement('div');
            currDate.className = 'header-date'
            header.appendChild(currDate);

            const date = () => {
                let today = new Date();
                let day = weekDay[today.getDay()];
                let m = month[today.getMonth()];
                let date = today.getDate();

                currDate.innerHTML = `${day}, ${m} ${date}`
            }

            time();
            date();

            window.onresize = () => { location.reload(); };

            const title = document.querySelector('.channel-title');
            title.innerHTML = data.title;

            const blockList = document.querySelector('#list-block');

            let content;
            const screenWidth = window.screen.width; 

            if (screenWidth > 600) {
                content = document.querySelector('.index-content')
            } else {
                content = document.querySelector('.block-content')
            }

            const windowLocation = (window.location.pathname).split("/").pop();

            let contentImg;
            let contentDesc;
            let seoul;
            let logo;
            let heading;
            let contentTitle;
            let contentDescription;

            if (content) {
                contentImg = document.createElement('img');
                contentImg.classList.add('content-image');
                content.appendChild(contentImg);

                contentDesc = document.createElement('div');
                contentDesc.classList.add('content-desc', 'content-desc--hor');
                content.appendChild(contentDesc);

                seoul = document.createElement('div');
                seoul.className = 'content-seoul';
                contentDesc.appendChild(seoul);

                logo = document.createElement('img');
                logo.className = 'content-logo';
                seoul.appendChild(logo);

                heading = document.createElement('p');
                heading.className = 'content-heading';
                heading.innerHTML = "'88 Seoul Olympics";
                seoul.appendChild(heading);

                contentTitle = document.createElement('p');
                contentTitle.className = 'content-title';
                contentDesc.appendChild(contentTitle);

                contentDescription = document.createElement('p');
                contentDescription.className = 'content-description';
                contentDesc.appendChild(contentDescription);


                if (screenWidth > 600) {
                    content.classList.add('content--hor');
                    contentImg.classList.add('content-image--hor');
                    contentImg.src = arenaData[0].image.original.url;                
    
                    logo.src = './seoul_logo.png';
    
                    contentTitle.innerHTML = arenaData[0].title; 
    
                    contentDescription.innerHTML = arenaData[0].description;
    
                    content.classList.add('fade-in');
                } else {
                    const params = new URLSearchParams(document.location.search);
                    const blockIdx = params.get('block');

                    const currData = arenaData[blockIdx-1];
                    contentImg.src = currData.image.original.url;                
                    logo.src = '../seoul_logo.png';
                    contentTitle.innerHTML = currData.title; 
                    contentDescription.innerHTML = currData.description;
                    content.classList.add('fade-in');

                    const contentReturn = document.createElement('div');
                    contentReturn.className = 'content-return';
                    content.appendChild(contentReturn);
                    const a = document.createElement('a');
                    a.href = '../';
                    a.innerHTML = '&larr; &nbsp; return'
                    contentReturn.appendChild(a);
                }
            }

            const detail = e => {
                const idx = parseInt(e.target.className.slice(1, 3));

                if (screenWidth <= 600) {
                    let href = window.location.href;
                    const blockUrl = `${href}block.html?block=${idx+1}`;
                    window.location = blockUrl;
                }
    
                const currData = arenaData[idx];

                const blockLists = document.querySelectorAll('.channel-block');
                
                if (screenWidth > 600) {
                    blockLists.forEach(ele => {
                        if (ele.classList.contains('active')) {
                            ele.classList.remove('active');
                        }
                    });

                    const blockClassName = e.target.className.slice(0,3);
                    const block = document.querySelector(`.${blockClassName}`);
                    
                    block.classList.add('active');
                }

                

                let imgHeight;
                let imgWidth;

                contentImg.addEventListener("load", function(){
                    imgHeight = this.naturalHeight;
                    imgWidth = this.naturalWidth;

                    if (imgHeight > imgWidth) {
                        content.classList.remove('content--hor');
                        content.classList.add('content--ver');

                        contentImg.classList.remove('content-image--hor');
                        contentImg.classList.add('content-image--ver');

                        contentDesc.classList.remove('content-desc--hor');
                        contentDesc.classList.add('content-desc--ver');
                    } else {
                        content.classList.remove('content--ver');
                        content.classList.add('content--hor');

                        contentImg.classList.remove('content-image--ver');
                        contentImg.classList.add('content-image--hor');

                        contentDesc.classList.remove('content-desc--ver');
                        contentDesc.classList.add('content-desc--hor');
                    }                    
                });

                contentImg.src = currData.image.original.url;
                contentTitle.innerHTML = currData.title; 
                contentDescription.innerHTML = currData.description;
            }

            if (windowLocation === 'index.html' || windowLocation === '') {    
                for (let i = 0; i < arenaData.length; i++) {
                    const block = document.createElement('div');
                    block.classList.add(`i${i}`, 'channel-block');

                    if (screenWidth > 600 && i == 0) {
                        block.classList.add('active');
                    }
                    block.style.animation = `opacity .5s ease-in ${i / 2}s forwards`;


                    currData = arenaData[i];
                    block.addEventListener("click", detail);

                    const sender = document.createElement('div');
                    sender.classList.add(`i${i}`, 'block-sender');
                    block.append(sender);

                    const logo = document.createElement('img');
                    logo.src = './seoul_logo.png';
                    logo.classList.add(`i${i}`, 'block-sender-logo');
                    sender.append(logo);

                    const senderName = document.createElement('p');
                    senderName.classList.add(`i${i}`, 'block-sender-name');
                    senderName.innerHTML = "'88 Seoul Olympics";
                    sender.append(senderName);

                    const content = document.createElement('div');
                    content.classList.add(`i${i}`, 'block-content');
                    block.append(content);

                    const thumbImage = document.createElement('img');
                    thumbImage.classList.add(`i${i}`, 'block-thumb');
                    thumbImage.src = arenaData[i].image.thumb.url;
                    content.appendChild(thumbImage);

                    const description = document.createElement('div');
                    description.classList.add(`i${i}`, 'block-description');
                    content.appendChild(description);

                    const title = document.createElement('div');
                    title.classList.add(`i${i}`, 'block-description-title');
                    title.innerHTML = arenaData[i].title;
                    description.appendChild(title);

                    const text = document.createElement('div');
                    text.classList.add(`i${i}`, 'block-description-text');
                    text.innerHTML = arenaData[i].description.slice(0, 40) + ' ...';
                    
                    description.appendChild(text);
                    blockList.append(block);
                }

                const countDays = document.querySelector('.day-count');
                const today = new Date();
                const seoulOlympics = new Date('09/17/1988');
                const differenceInTimes = today.getTime() - seoulOlympics.getTime(); 
                const differenceInDays = Math.floor(differenceInTimes / (1000 * 3600 * 24)) + 1; 
                countDays.innerHTML = `+${differenceInDays}`;
            }
            
        })
        .catch(function (error) {
            console.log("error:", error)
        })