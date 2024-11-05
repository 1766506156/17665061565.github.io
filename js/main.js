// 轮播功能实现
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    
    // 创建轮播指示点
    const dotsContainer = document.querySelector('.slider-dots');
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    function updateSlides() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        
        // 更新指示点
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
    }
    
    // 添加事件监听器
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // 自动轮播
    let slideInterval = setInterval(nextSlide, 3000);
    
    // 鼠标悬停时暂停轮播
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 3000);
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 音乐播放器控制
document.addEventListener('DOMContentLoaded', function() {
    // 音乐列表
    const playlist = [
        {
            title: "轻松钢琴曲",
            url: "https://music.163.com/song/media/outer/url?id=1824020873.mp3"
        },
        {
            title: "温柔的风",
            url: "https://music.163.com/song/media/outer/url?id=1824020874.mp3"
        },
        {
            title: "雨天",
            url: "https://music.163.com/song/media/outer/url?id=1824020875.mp3"
        },
        // 可以继续添加更多音乐
    ];

    let currentSongIndex = 0;
    const audio = document.getElementById('bgMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const prevSongBtn = document.getElementById('prevSongBtn');
    const nextSongBtn = document.getElementById('nextSongBtn');
    const songTitle = document.querySelector('.song-title');
    const playIcon = playPauseBtn.querySelector('i');
    const volumeIcon = muteBtn.querySelector('i');

    // 加载音乐
    function loadSong(index) {
        const song = playlist[index];
        audio.src = song.url;
        songTitle.textContent = `正在播放: ${song.title}`;
        audio.load();
        if (!audio.paused) {
            audio.play();
        }
    }

    // 播放下一首
    function playNextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        if (!audio.paused) {
            audio.play();
        }
    }

    // 播放上一首
    function playPrevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        if (!audio.paused) {
            audio.play();
        }
    }

    // 初始化第一首歌
    loadSong(currentSongIndex);

    // 播放/暂停控制
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            audio.pause();
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    });

    // 静音控制
    muteBtn.addEventListener('click', function() {
        if (audio.muted) {
            audio.muted = false;
            volumeIcon.classList.remove('fa-volume-mute');
            volumeIcon.classList.add('fa-volume-up');
        } else {
            audio.muted = true;
            volumeIcon.classList.remove('fa-volume-up');
            volumeIcon.classList.add('fa-volume-mute');
        }
    });

    // 上一首/下一首控制
    prevSongBtn.addEventListener('click', playPrevSong);
    nextSongBtn.addEventListener('click', playNextSong);

    // 当前歌曲播放结束时自动播放下一首
    audio.addEventListener('ended', playNextSong);

    // 处理音乐加载错误
    audio.addEventListener('error', function() {
        console.log('Music load error, trying next song...');
        playNextSong();
    });

    // 自动播放（需要用户交互）
    document.addEventListener('click', function autoPlay() {
        audio.play().then(() => {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        }).catch(function(error) {
            console.log("Auto-play was prevented");
        });
        document.removeEventListener('click', autoPlay);
    }, { once: true });
});

// 添加滚动动画
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 为所有需要动画的元素添加观察
    document.querySelectorAll('.method-card, .service-card, .case-card, .faq-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}); 