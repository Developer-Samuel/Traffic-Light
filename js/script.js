$(document).ready(function() {
    let segments = {
        '0': ['a', 'b', 'c', 'd', 'e', 'f'],
        '1': ['b', 'c'],
        '2': ['a', 'b', 'd', 'e', 'g'],
        '3': ['a', 'b', 'c', 'd', 'g'],
        '4': ['b', 'c', 'f', 'g'],
        '5': ['a', 'c', 'd', 'f', 'g'],
        '6': ['a', 'c', 'd', 'e', 'f', 'g'],
        '7': ['a', 'b', 'c'],
        '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        '9': ['a', 'b', 'c', 'f', 'g']
    };

    let currentLight = '';

    function setActiveSegments(number) {
        $('.segment').removeClass('active');

        segments[number.toString()].forEach(segment => {
            $('#segment-' + segment).addClass('active');
        });
    }

    function displayNumber(number) {
        setActiveSegments(number);
    }

    function startTrafficLightSequence() {
        $('.light').removeClass('active');
        $('.segment').removeClass('active');

        $('.light.red').addClass('active');
        currentLight = 'red';

        displayCountdown(5, () => {
            $('.light').removeClass('active');
            $('.light.yellow').addClass('active');
            currentLight = 'yellow';

            countDownFrom(3, () => {
                $('.light').removeClass('active');
                $('.light.green').addClass('active');
                currentLight = 'green';

                countDownFrom(5, () => {
                    $('.light').removeClass('active');
                    startTrafficLightSequence();
                });
            });
        });
    }

    function displayCountdown(startNumber, callback) {
        let currentNumber = startNumber;
        let displayInterval = setInterval(() => {
            displayNumber(currentNumber);
            currentNumber--;
            if (currentNumber < 0) {
                clearInterval(displayInterval);
                callback();
            }
        }, 1000);

        displayNumber(startNumber);
    }

    function countDownFrom(seconds, callback) {
        let currentCount = seconds;
        displayNumber(currentCount);
        let countdownInterval = setInterval(() => {
            currentCount--;
            if (currentCount >= 0) {
                displayNumber(currentCount);
            } else {
                clearInterval(countdownInterval);
                callback();
            }
        }, 1000);
    }

    startTrafficLightSequence();

    $('.light').on('change', function() {
        let newLight = $(this).attr('class').split(' ')[1];
        if (newLight !== currentLight) {
            $('.segment').removeClass('active');
            $('.segment.' + newLight).addClass('active');
            currentLight = newLight;
        }
    });
});
