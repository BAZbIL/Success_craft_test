'use strict';

// INIT DATA

const params = {
    dom: document.getElementById('calendar'),
    year: null,
    month: null,
    onClickDate: function (date) {

    }
};

let $wrapper = null;

let prevTargetBlock;

// INIT

init();

// CORE

function getDateData(year, month) {

    let ret = [];

    let today;

    let firstDay = new Date(params.year, params.month - 1, 1);

    let firstDayWeekDay = firstDay.getDay() || 7;

    let lastDayOfLastMonth = new Date(params.year, params.month - 1, 0);

    let lastDateOfLastMonth = lastDayOfLastMonth.getDate();

    let preMonthDayCount = firstDayWeekDay - 1;

    let lastDay = new Date(params.year, params.month, 0);

    let lastDate = lastDay.getDate();

    let styleCls = '';

    for (let i = 0; i < 7 * 6; i++) {

        let date = i + 1 - preMonthDayCount;

        let showDate = date;

        let thisMonth = params.month;

        if (date <= 0) {

            thisMonth = params.month - 1;
            showDate = lastDateOfLastMonth + date;
            styleCls = 'gray';


        } else if (date > lastDate) {

            thisMonth = params.month + 1;
            showDate = showDate - lastDate;
            styleCls = 'gray';

        } else {

            today = new Date();

            if (showDate === today.getDate() && thisMonth === today.getMonth() + 1) {

                styleCls = 'normal current';

            } else {

                styleCls = 'normal';

            }


        }

        if (thisMonth === 13) {

            thisMonth = 1;

        }

        if (thisMonth === 0) {

            thisMonth = 12;

        }

        ret.push({
            month: thisMonth,
            date: date,
            showDate: showDate,
            styleCls: styleCls
        });

    }

    return {
        year: year,
        month: month,
        date: ret
    };

}

function generateDom() {

    let dayWords = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    let enMonthsWords = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    let monthData = getDateData(params.year, params.month);

    let html =
        '<div class="wrapper">' +
        '<div class="header">' +
        '<button class="prev-date-btn arrow">&#9664;</button>' +
        '<span class="title">' + enMonthsWords[monthData.month - 1] + ' ' + monthData.year + '</span>' +
        '<button class="next-date-btn arrow">&#9654;</button>' +
        '<button class="now-date-btn">Сегодня</button>' +
        '</div>' +
        '<div class="body">' +
        '<table>' +
        '<thead>' +
        '<tr>' +
        '</tr>' +
        '</thead>' +
        '<tbody>';

    for (let i = 0; i < monthData.date.length; i++) {

        let dayCount = i % 7;

        let viewDate = monthData.date[i].showDate;

        if (i <= 6) {

            viewDate = `${dayWords[dayCount]}, ${monthData.date[i].showDate}`;

        }

        if (i % 7 === 0) {

            html += '<tr>';

        }

        html += '<td class="' + monthData.date[i].styleCls + '" data-date="' + monthData.year + '/' + monthData.month + '/' + monthData.date[i].showDate + '">' + viewDate + '</td>';

        if (i % 7 === 6) {

            html += '</tr>';

        }

    }

    html += '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>';


    return html;

}

function render(direction, params) {

    if (direction === 'prev') {

        params.month--;

        if (params.month === 0) {

            params.month = 12;
            params.year--;

        }

    }

    if (direction === 'next') {

        params.month++;

        if (params.month === 13) {

            params.month = 1;
            params.year++;

        }

    }

    $wrapper.innerHTML = generateDom(params.year, params.month);

}

function initData() {
    params.year = new Date().getFullYear();
    params.month = new Date().getMonth() + 1;
}

function init() {

    let $body = document.querySelector('body');

    $wrapper = params.dom;

    initData();

    render('', params);

    $wrapper.addEventListener('click', function (e) {

        let $target = e.target;

        if ($target.classList.contains('prev-date-btn')) {

            render('prev', params);

        }

        if ($target.classList.contains('next-date-btn')) {

            render('next', params);

        }

        if ($target.classList.contains('now-date-btn')) {

            initData();

            render('', params);

        }

        if ($target.tagName === 'TD') {

            note($target);
            addNote__quick($target);

        }

        if ($target.tagName === 'TD2') {

            note_2($target);
            addNote__quick_2($target);

        }

    }, false);

    $body.addEventListener('click', function (e) {

        console.log(document.getElementById('add-note__quick'));

    }, false);

    $body.addEventListener('click', function (e) {

        console.log(document.getElementById('add-note__quick_2'));

    }, false);

}

function note(node) {
    if (prevTargetBlock) {
        prevTargetBlock.classList.remove('note');
    }
    prevTargetBlock = node;
    prevTargetBlock.classList.add('note');
}

function addNote__quick(node) {

    closeForm();

    node.innerHTML =
        '<form id="add-note__quick">' +
        '<i id="close2" onclick="closeForm()">&times;</i>' +
        '<input type="text"  class="field" placeholder="Событие">' +
        '<input type="text"  class="field" placeholder="День, месяц, год">' +
        '<input type="text"  class="field" placeholder="Участники">' +
        '<input type="text"  class="field op" placeholder="Описание">' +
        '<button type="submit">Готово</button>' +
        '<button type="submit">Удалить</button>' +
        '</form>';

}

function closeForm() {

    let $form = document.getElementById('add-note__quick');

    if ($form) {
        $form.remove()
    }

}


//Add button

function note_2(node_2) {
    if (prevTargetBlock) {
        prevTargetBlock.classList.remove('note_2');
    }
    prevTargetBlock = node_2;
    prevTargetBlock.classList.add('note_2');
}

function addNote__quick_2(node_2) {

    closeForm_2();

    node_2.innerHTML =
    '<form id="add-note__quick_2">' +
    '<i id="close3" onclick="closeForm()">&times;</i>' +
    '<input type="text"  class="field" placeholder="5 марта, 14:00, День рождения">' +
    '<button type="submit">Создать</button>' +
    '</form>'
    ;


}

function closeForm_2() {

    let $form = document.getElementById('add-note__quick_2');

    if ($form) {
        $form.remove()
    }

}
