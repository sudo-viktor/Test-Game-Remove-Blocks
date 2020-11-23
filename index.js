window.onload = function(e){
    let points = document.querySelector('#point');
    let time = document.querySelector('#time');
    let myBlock;
    let userName;
    let isPaused = true;
    let ratingList = [];
    let ratingItem = [];
    const timeLeft = 60;
    time.value = timeLeft;
    points.value = 0;

    ratingList = JSON.parse(window.localStorage.getItem('ratingList'));
    if(!ratingList) ratingList = [];
    showResult();

    let inter = window.setInterval(() => {
        if(!isPaused){
            time.value--;
            myBlock = document.querySelectorAll('.block');
            myBlock.forEach(block => block.addEventListener('click', removeBlock));
        }
        if(time.value == 0) {
            e.preventDefault();
            isPaused=true;
            time.value = timeLeft;

            alert('Game over');
            userName = prompt(`Your scope: ${points.value}\nEnter your name`);
            $('.result-chd').remove();
            if(userName) addResult();
            clear();
        }
    }, 1000);

    // Действие на кнопку PAUSE
    $('.pause').on('click', (e) => {
        e.preventDefault();
        isPaused = true;
    });
    
    // Действие на кнопку START
    $('.play').on('click', (e) => {
        e.preventDefault();
        isPaused = false;
        userName = null;
        addBlock();
    });
    
    // Действие на кнопку NEW GAME
    $('.new').on('click', (e) => {
        e.preventDefault();
        time.value = timeLeft;
        points.value = 0;
        isPaused = true;
        $('.pause').addClass('active');
        $('.play').removeClass('active');
        clear();
    });
    
    // Действие на все кнопки
    $('.btn').on('click', (e) => {
        e.preventDefault();
        $('.play, .pause').toggleClass('active');
    })

    // Добавление блокв
    const addBlock = () => {
        let maxY = $('.game-field').width() - 80;
        let maxX = $('.game-field').height() - 80;
        let x = Math.floor(Math.random() * (maxX - 1 + 1)) + 1;
        let y = Math.floor(Math.random() * (maxY - 1 + 1)) + 1;
        let color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        let blockDiv = $('<div class="block"></div>');
        blockDiv.css({
            'margin-top': x,
            'margin-left': y,
            'background-color':color
        })
        $('.game-field').append(blockDiv);
    }

   // Удаление блоков по нажатию
    function removeBlock() {
        let random = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        for(let i = 0; i < random; i++){
            addBlock();
        }
        points.value++;
        this.remove();
    }
 
    function clear(){
        $('.block').remove();
        points.value = 0;
    }

    //Сохранение результатов
    function addResult(){
        if(ratingList.length == 10) {
            ratingList.sort((a, b) => b[1] - a[1]);
            ratingList = ratingList.slice(0, 9);
        }

        ratingItem[0] = userName;
        ratingItem[1] = points.value;
        ratingList.push(ratingItem);

        if ((ratingList.length > 0) && ratingList[ratingList.length - 1][1] > points.value) {
            ratingList[ratingList.length - 1][0] = userName;
            ratingList[ratingList.length - 1][1] = points.value;
          }
          if (ratingList.length > 1) {
            ratingList.sort(function(a, b) {
              return b[1] - a[1];
            });
          }
          window.localStorage.setItem('ratingList', JSON.stringify(ratingList));
          showResult();
    }

    //Отображение результатов
    function showResult(){
        for(let i=0; i<ratingList.length; i++) {
            let name = ratingList[i][0];
            let point = ratingList[i][1];
            let pResult = $(`<p class="result-chd">${name}: ${point}</p>`);
            $('.result').append(pResult);
            }
    }
}